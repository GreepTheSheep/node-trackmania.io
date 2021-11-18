export = NewsManager;
/**
 * Represents a in-game news manager.
 */
declare class NewsManager {
    constructor(client: any);
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
     * Get the in-game news list
     * @param {number} page The page number
     * @param {Boolean} [cache=this.client.options.cache.enabled] Whether to cache the news or not
     * @returns {Promise<Array<Splashscreen>>}
     */
    list(page?: number, cache?: boolean): Promise<Array<Splashscreen>>;
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
    get(newsId: number, cache?: boolean): Promise<Splashscreen>;
    /**
     * Fetches a splashscreen and returns its data
     * @param {number} newsId The splashscreen ID
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the news or not
     * @returns {Promise<Splashscreen>} The splashscreen
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import Splashscreen = require("../structures/Splashscreen");
