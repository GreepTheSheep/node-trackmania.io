const Player = require('../structures/Player');
const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
class PlayerManager {
    constructor(client){
        this.client = client;

        this.cache = new CacheManager(client, Player);
    }

    /**
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @param {Boolean} cache Whether to get the player from cache or not
     * @returns {Promise<Player>} The player
     * @example
     * // Get a player
     * client.players.get('26d9a7de-4067-4926-9d93-2fe62cd869fc').then(player => {
     * console.log(player.displayname);
     * });
     */
    async get(accountid, cache = this.client.options.cache.enabled){
        if (cache) {
            if (this.cache.has(accountid)) {
                return this.cache.get(accountid);
            } else {
                return await this._fetch(accountid);
            }
        } else {
            return await this._fetch(accountid);
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
        const player = this.client.options.api.paths.tmio.tabs.player;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${accountid}`);
        if (cache) {
            res._cachedTimestamp = Date.now();
            this.cache.set(res.accountid, new Player(this.client, res));
            return this.cache.get(res.accountid);
        } else {
            return new Player(this.client, res);
        }
    }
}

module.exports = PlayerManager;