const Player = require('../structures/Player');
const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const {PlayerGroup} = require('../util/Constants'); // eslint-disable-line no-unused-vars

/**
 * Represents a manager for players.
 */
class PlayerManager {
    /**
     * @param {Client} client The client.
     */
    constructor(client){
        /**
         * The client instance
         * @type {Client}
         * @readonly
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager} 
         * @private
         */
        this._cache = new CacheManager(this.client, this, Player);
    }

    /**
     * Searches for a player by its name
     * @param {String} query The query to search for
     * @returns {Promise<Array<PlayerSearchResult>>} The results
     * @example
     * // Search for a player
     * client.players.search('greep').then(results => {
     *    client.players.get(results[0].id).then(player => {
     *       console.log('The tag of this player is', player.tag);
     *   });
     * });
     */
    async search(query){
        const players = this.client.options.api.paths.tmio.tabs.players,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${players}/find?search=${query}`);

        let results = [];
        for (var i = 0; i < res.length; i++) {
            results.push(new PlayerSearchResult(this.client, res[i].player));
        }
        return results;
    }

    /**
     * Get all players from a group
     * @param {PlayerGroup} groupName The group name
     * @returns {?Promise<Array<PlayerSearchResult>>} The results
     */
    async group(groupName){
        const players = this.client.options.api.paths.tmio.tabs.players,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${players}/group/${groupName}`);

        if (res.error) {
            throw new Error(res.error);
        }

        let results = [];
        for (var i = 0; i < res.length; i++) {
            results.push(new PlayerSearchResult(this.client, res[i].player));
        }
        return results;
    }

    /**
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @param {Boolean} cache Whether to get the player from cache or not
     * @returns {Promise<Player>} The player
     * @example
     * // Get a player 
     * client.players.get('26d9a7de-4067-4926-9d93-2fe62cd869fc').then(player => {
     *     console.log(player.name);
     * });
     */
    async get(accountid, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(accountid)) {
            return this._cache.get(accountid);
        } else {
            return await this._fetch(accountid, cache);
        }
    }
        
    /**
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @param {Boolean} cache Whether to cache the player or not
     * @returns {Player} The player
     * @private
     */
    async _fetch(accountid, cache = this.client.options.cache.enabled){
        const player = this.client.options.api.paths.tmio.tabs.player,
            cotd = this.client.options.api.paths.tmio.tabs.cotd,
            matches = this.client.options.api.paths.tmio.tabs.matches,
            trophies = this.client.options.api.paths.tmio.tabs.trophies;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${accountid}`);
        res["cotd"] = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${res["accountid"]}/${cotd}/0`);

        // Get all matchmakings
        for (var i = 0; i < res["matchmaking"].length; i++) {
            const mmTypeId = res["matchmaking"][i].info.typeid,
                mmData = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${res["accountid"]}/${matches}/${mmTypeId}/0`);
            res.matchmaking.find(m=>m.info.typeid == mmTypeId).info.history = mmData.matches;
        }

        // Get trophy history
        const trophyHist = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${res["accountid"]}/${trophies}/0`);
        res.trophies.history = trophyHist.gains;
        
        const thePlayer = new Player(this.client, res);
        if (cache) {
            res._cachedTimestamp = Date.now();
            
            this._cache.set(res.accountid, thePlayer);

            // Adds also the player by its vanity name in the cache
            if (res.meta && (res.meta.vanity && res.meta.vanity != "")){
                this._cache.set(res.meta.vanity, thePlayer);
            }
        }
        return thePlayer;
    }
}

/**
 * The result of a player search. It is completely different from the {@link Player} object.
 */
class PlayerSearchResult {
    /**
     * @param {Client} client The client instance.
     * @param {Object} data The data.
     */
    constructor(client, data){
        /**
         * The client instance
         * @type {Client}
         */
        this.client = client;

        /**
         * The player's account ID
         * @type {String}
         */
        this.id = data.id;

        /**
         * The player's display name
         * @type {String}
         */
        this.name = data.name;

        /**
         * The player's club tag (if any)
         * @type {?String}
         */
        this.tag = data.tag ? data.tag : null;
    }
}

module.exports = PlayerManager;