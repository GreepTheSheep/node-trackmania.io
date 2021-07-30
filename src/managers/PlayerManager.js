const Player = require('../structures/Player');
const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
class PlayerManager {
    constructor(client){
        this.client = client;

        /**
         * Intiializes the cache
         * @private
         */
        this.cache = new CacheManager(this.client);
    }

    /**
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @param {Boolean} cache Whether to cache the player or not
     * @returns {Promise<Player>} The player
     */
    async fetch(accountid, cache = this.client.options.cache.enabled){
        const player = this.client.options.api.paths.tmio.tabs.player;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${accountid}`);
        if (cache) {
            res._cachedTimestamp = Date.now();
            this.cache._add(res.accountid, res);
        }
        return new Player(this.client, res);
    }

    /**
     * Gets a player from cache
     * @param {String} accountid The account ID or its tm.io vanity name
     * @returns {Player} The player
     */
    get(accountid){
        const res = this.cache._get(accountid);
        if (!res) {
            throw new Error(`Player ${accountid} not found in cache`);
        } else return new Player(this.client, res);
    }
}

module.exports = PlayerManager;