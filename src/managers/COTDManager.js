const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const COTD = require('../structures/COTD');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars


/**
 * Represents a COTD Manager.
 */
class COTDManager{
    constructor(client){
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager} 
         * @private
         */
        this._cache = new CacheManager(this.client, this, COTD);
    }

    /**
     * Fetches the latest COTDs and returns its data
     * @param {number} [page=0] The page, each page contains 12 items
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the list from cache or not
     * @returns {Promise<Array<COTD>>} The COTD list
     * @example 
     * client.cotd.get().then(event => {
     *     console.log(event.name);
     * });
     */
    async get(page = 0, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(page)) {
            return this._cache.get(page);
        } else {
            return await this._fetch(page, cache);
        }
    }
        
    /**
     * Fetches a COTD and returns its data
     * @param {number} [page=0] The page
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the list or not
     * @returns {Promise<Array<COTD>>} The COTD list
     * @private
     */
    async _fetch(page = 0, cache = this.client.options.cache.enabled){
        const cotd = this.client.options.api.paths.tmio.tabs.cotd;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${cotd}/${page}`);

        let arr = [];
        res["competitions"].forEach(cotd => {
            if (cache) cotd._cachedTimestamp = Date.now();
            arr.push(new COTD(this.client, cotd));
        });
        if (cache) this._cache.set(page, arr);
        return arr;
    }
}

module.exports = COTDManager;