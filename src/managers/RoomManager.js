const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Room = require('../structures/Room');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a manager for rooms.
 */
class RoomManager{
    constructor(client){
        /**
         * The client instance.
         * @type {Client}
         * @readonly
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager} 
         * @private
         */
        this._cache = new CacheManager(this.client, this, Room);
    }

    /**
     * Get the popular Club rooms (by number of players connected)
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<RoomSearchResult>>} The rooms
     */
    async popularRooms(page = 0){
        const rooms = this.client.options.api.paths.tmio.tabs.rooms,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${rooms}/${page}`),
            roomList = res.rooms.map(room=> new RoomSearchResult(this.client, room));
        return roomList;
    }

    /**
     * Searches for a room
     * @param {string} query The query to search for
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<RoomSearchResult>>} The rooms
     */
    async search(query, page = 0){
        const rooms = this.client.options.api.paths.tmio.tabs.rooms,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${rooms}/${page}?search=${query}`),
            roomList = res.rooms.map(room=> new RoomSearchResult(this.client, room));
        return roomList;
    }

    /**
     * Fetches a Trackmania room (server) and returns its data
     * @param {number} clubId The club Id that the room belongs to
     * @param {number} id The room Id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the room from cache or not
     * @returns {Promise<Room>} The room
     * @example 
     * client.rooms.get(338, 1180).then(room => {
     *     console.log(room.name);
     * });
     */
    async get(clubId, id, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(id)) {
            return this._cache.get(id);
        } else {
            return await this._fetch(clubId, id, cache);
        }
    }
        
    /**
     * Fetches a room and returns its data
     * @param {number} clubId The club Id that the room belongs to
     * @param {string} id The room Id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the room or not
     * @returns {Campaign} The room
     * @private
     */
    async _fetch(clubId, id, cache = this.client.options.cache.enabled){

        const room = this.client.options.api.paths.tmio.tabs.room,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${room}/${clubId}/${id}`),
            theRoom = new Room(this.client, res);
        if (cache) {
            res._cachedTimestamp = Date.now();
            
            this._cache.set(res.id, theRoom);
        }
        return theRoom;
    }
}

/**
 * The result of a campaign search. It is completely different from the {@link Room} object.
 */
class RoomSearchResult {
    constructor(client, data){
        /**
         * The client instance
         * @type {Client}
         */
        this.client = client;

        /**
         * The room's ID
         * @type {number}
         */
        this.id = data.id;

        /**
         * The room's Club ID
         * @type {number}
         */
        this.clubId = data.clubid;

        /**
         * The room's name
         * @type {string}
         */
        this.name = data.name;

        /**
         * Whether the room is hosted by Nadeo
         * @type {boolean}
         */
        this.nadeoHosted = data.nadeo;

        /**
         * The player count
         * @type {number}
         */
        this.playerCount = data.playercount;

        /**
         * The max player count
         * @type {number}
         */
        this.maxPlayerCount = data.playermax;
    }

    /**
     * Return to the Room Object
     * @returns {Promise<Room>}
     */
    async room(){
        return await this.client.rooms.get(this.clubId, this.id);
    }
}

module.exports = RoomManager;