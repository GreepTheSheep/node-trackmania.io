const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Room = require('../structures/Room');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a manager for rooms.
 */
class RoomManager{
    /**
     * @param {Client} client The client.
     */
    constructor(client){
        /**
         * The client instance.
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * The cache manager
         * @type {CacheManager} 
         * @private
         */
        this._cache = new CacheManager(this, Room);
    }

    /**
     * Fetches a Trackmania room (server) and returns its data
     * @param {Number} clubId The club Id that the room belongs to
     * @param {Number} id The room Id
     * @param {Boolean} cache Whether to get the room from cache or not
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
     * @param {Number} clubId The club Id that the room belongs to
     * @param {String} id The room Id
     * @param {Boolean} cache Whether to cache the room or not
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

module.exports = RoomManager;