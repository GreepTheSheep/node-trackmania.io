export = NewsManager;
declare class NewsManager {
    constructor(client: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The cache manager
     * @type {CacheManager}
     * @private
     */
    private _cache;
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
    get(newsId: number, cache?: boolean): Promise<News>;
    /**
     * Fetches a splashscreen and returns its data
     * @param {Number} newsId The splashscreen ID
     * @param {Boolean} cache Whether to cache the news or not
     * @returns {News} The splashscreen
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import News = require("../structures/News");
