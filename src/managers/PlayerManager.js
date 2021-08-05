const Player = require('../structures/Player');
const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
class PlayerManager {
    constructor(client){
        this.client = client;

        /** @private */
        this._cache = new CacheManager(client, Player);
    }

    /**
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @param {Boolean} cache Whether to get the player from cache or not
     * @returns {Promise<Player>} The player
     * @example
     * // Get a player 
     * client.players.get('greep').then(player => {
     *     console.log(player.displayname);
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
        const player = this.client.options.api.paths.tmio.tabs.player;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${accountid}`);
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

module.exports = PlayerManager;