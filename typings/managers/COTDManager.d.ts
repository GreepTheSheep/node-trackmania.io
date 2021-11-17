export = COTDManager;
/**
 * Represents a COTD Manager.
 */
declare class COTDManager {
    /**
     * @param {Client} client The client.
     */
    constructor(client: Client);
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
     * Fetches the latest COTDs and returns its data
     * @param {number} [page=0] The page, each page contains 12 items
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the list from cache or not
     * @returns {Promise<Array<COTD>>} The COTD list
     * @example
     * client.cotd.get().then(event => {
     *     console.log(event.name);
     * });
     */
    get(page?: number, cache?: boolean): Promise<Array<COTD>>;
    /**
     * Fetches a COTD and returns its data
     * @param {number} [page=0] The page
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the list or not
     * @returns {Promise<Array<COTD>>} The COTD list
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import COTD = require("../structures/COTD");
