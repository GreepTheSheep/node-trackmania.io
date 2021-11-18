const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Splashscreen = require('../structures/Splashscreen');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a in-game news manager.
 */
class NewsManager{
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
        this._cache = new CacheManager(this.client, this, Splashscreen);
    }

    /**
     * Get the in-game news list
     * @param {number} page The page number
     * @param {Boolean} [cache=this.client.options.cache.enabled] Whether to cache the news or not
     * @returns {Promise<Array<Splashscreen>>}
     */
    async list(page = 0, cache = this.client.options.cache.enabled){
        const news = this.client.options.api.paths.tmio.tabs.news;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${news}/${page}`);
        const array = [];
        if (res.splashscreens.length > 0) { // check all news from the page 0
            for (let i = 0; i < res.splashscreens.length; i++) {
                let splashscreen = new Splashscreen(this.client, res.splashscreens[i]);
                if (cache) {
                    res.splashscreens[i]._cachedTimestamp = Date.now();
                    this._cache.set(res.id, splashscreen);
                } 
                array.push(splashscreen);
            }
        }
        return array;
    }

    /**
     * Fetches a Trackmania splashscreen and returns its data.
     * @param {number} newsId The splashscreen ID
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the news from cache or not
     * @returns {Promise<Splashscreen>} The splashscreen
     * @example 
     * client.news.get(143).then(news => {
     *     console.log(news.title);
     * });
     */
    async get(newsId, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(newsId)) {
            return this._cache.get(newsId);
        } else {
            return await this._fetch(newsId, cache);
        }
    }
        
    /**
     * Fetches a splashscreen and returns its data
     * @param {number} newsId The splashscreen ID
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the news or not
     * @returns {Promise<Splashscreen>} The splashscreen
     * @private
     */
    async _fetch(newsId, cache = this.client.options.cache.enabled){
        const news = this.client.options.api.paths.tmio.tabs.news;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${news}/0`);

        if (cache) {
            // Get page_max from response, if set to 1, then there is only one page
            // else we need to fetch all pages given by page_max
            // and cache all splashscreens
            if (res.splashscreens.length > 0) {
                for (let i = 0; i < res.splashscreens.length; i++) {
                    res.splashscreens[i]._cachedTimestamp = Date.now();
                    
                    this._cache.set(res.id, new Splashscreen(this.client, res.splashscreens[i]));
                }
            }
            if (res.page_max > 1) {
                for (let i = 1; i < res.page_max; i++) {
                    const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${news}/${i}`);

                    if (res.splashscreens.length > 0) {
                        for (let i = 0; i < res.splashscreens.length; i++) {
                            res.splashscreens[i]._cachedTimestamp = Date.now();
                            
                            this._cache.set(res.id, new Splashscreen(this.client, res.splashscreens[i]));
                        }
                    }
                }
            }
            if (this._cache.has(newsId)) return this._cache.get(newsId);
            else return null; 
        } else {
            if (res.splashscreens.length > 0) { // check all news from the page 0
                for (let i = 0; i < res.splashscreens.length; i++) {
                    if (res.splashscreens[i].id === newsId) {
                        return new Splashscreen(this.client, res.splashscreens[i]);
                    }
                }
            }
            if (res.page_max > 1) { // check all news from the pages 1 to page_max
                for (let i = 1; i < res.page_max; i++) {
                    const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${news}/${i}`);

                    if (res.splashscreens.length > 0) {
                        for (let i = 0; i < res.splashscreens.length; i++) {
                            if (res.splashscreens[i].id === newsId) {
                                return new Splashscreen(this.client, res.splashscreens[i]);
                            }
                        }
                    }
                }
            }
            // If we reach this point, the news was not found
            return null; 
        }
    }
}

module.exports = NewsManager;