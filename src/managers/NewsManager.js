const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const News = require('../structures/News');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

class NewsManager{
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
        this._cache = new CacheManager(client, News);
    }

    /**
     * Fetches a Trackmania splashscreen and returns its data.
     * @param {Number} newsId The splashscreen ID
     * @param {Boolean} cache Whether to get the news from cache or not
     * @returns {Promise<News>} The splashscreen
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
     * @param {Number} newsId The splashscreen ID
     * @param {Boolean} cache Whether to cache the news or not
     * @returns {News} The splashscreen
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
                    
                    this._cache.set(res.id, new News(this.client, res.splashscreens[i]));
                }
            }
            if (res.page_max > 1) {
                for (let i = 1; i < res.page_max; i++) {
                    const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${news}/${i}`);

                    if (res.splashscreens.length > 0) {
                        for (let i = 0; i < res.splashscreens.length; i++) {
                            res.splashscreens[i]._cachedTimestamp = Date.now();
                            
                            this._cache.set(res.id, new News(this.client, res.splashscreens[i]));
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
                        return new News(this.client, res.splashscreens[i]);
                    }
                }
            }
            if (res.page_max > 1) { // check all news from the pages 1 to page_max
                for (let i = 1; i < res.page_max; i++) {
                    const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${news}/${i}`);

                    if (res.splashscreens.length > 0) {
                        for (let i = 0; i < res.splashscreens.length; i++) {
                            if (res.splashscreens[i].id === newsId) {
                                return new News(this.client, res.splashscreens[i]);
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