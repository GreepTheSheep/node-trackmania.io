export = NewsManager;
/**
 * Represents a in-game news manager.
 */
declare class NewsManager {
    /**
     * @param {Client} client The client
     */
    constructor(client: Client);
    /**
     * The client instance.
     * @type {Client}
     * @readonly
     */
    readonly client: Client;
    /**
     * The cache manager
     * @type {CacheManager}
     * @private
     */
    private _cache;
    /**
     * Fetches a Trackmania splashscreen and returns its data.
     * @param {number} newsId The splashscreen ID
     * @param {boolean} cache Whether to get the news from cache or not
     * @returns {Promise<News>} The splashscreen
     * @example
     * client.news.get(143).then(news => {
     *     console.log(news.title);
     * });
     */
    get(newsId: number, cache?: boolean): Promise<News>;
    /**
     * Fetches a splashscreen and returns its data
     * @param {number} newsId The splashscreen ID
     * @param {boolean} cache Whether to cache the news or not
     * @returns {News} The splashscreen
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import News = require("../structures/News");
