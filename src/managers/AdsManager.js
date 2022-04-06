const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Ad = require('../structures/Ad');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a in-game ads manager (also called Maniapub).
 */
class AdsManager{
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
        this._cache = new CacheManager(this.client, this, Ad);
    }

    /**
     * Get the in-game Maniapub list
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the ads or not
     * @returns {Promise<Array<Ad>>}
     */
    async list(cache = this.client.options.cache.enabled){
        const ads = this.client.options.api.paths.tmio.tabs.ads;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${ads}`);
        const array = [];
        if (res.ads.length > 0) { // check all news from the page 0
            for (let i = 0; i < res.ads.length; i++) {
                let ad = new Ad(this.client, res.ads[i]);
                if (cache) {
                    res.ads[i]._cachedTimestamp = Date.now();
                    this._cache.set(res.id, ad);
                }
                array.push(ad);
            }
        }
        return array;
    }

    /**
     * Fetches a Trackmania Maniapub and returns its data.
     * @param {string} adUid The Ad UID
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the news from cache or not
     * @returns {Promise<Ad>} The Maniapub
     * @example
     * client.ads.get("fcc22a11-0d59-4fef-b102-0bf5a2df7221").then(ad => {
     *     console.log(ad.name);
     * });
     */
    async get(adUid, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(adUid)) {
            return this._cache.get(adUid);
        } else {
            return await this._fetch(adUid, cache);
        }
    }

    /**
     * Fetches a maniapub and returns its data
     * @param {number} adUid The ad ID
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the news or not
     * @returns {Promise<Splashscreen>} The splashscreen
     * @private
     */
    async _fetch(adUid, cache = this.client.options.cache.enabled){
        const ads = this.client.options.api.paths.tmio.tabs.ads;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${ads}`);

        if (cache) {
            if (res.ads.length > 0) {
                for (let i = 0; i < res.ads.length; i++) {
                    res.ads[i]._cachedTimestamp = Date.now();

                    this._cache.set(res.ads[i].uid, new Ad(this.client, res.ads[i]));
                }
            }
            if (this._cache.has(adUid)) return this._cache.get(adUid);
            else return null;
        } else {
            if (res.ads.length > 0) { // check all news from the page 0
                for (let i = 0; i < res.ads.length; i++) {
                    if (res.ads[i].uid === adUid) {
                        return new Ad(this.client, res.ads[i]);
                    }
                }
            }
            // If we reach this point, the ad was not found
            return null;
        }
    }
}

module.exports = AdsManager;