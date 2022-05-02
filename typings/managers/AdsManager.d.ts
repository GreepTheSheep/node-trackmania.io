export = AdsManager;
/**
 * Represents a in-game ads manager (also called Maniapub).
 */
declare class AdsManager {
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
     * Get the in-game Maniapub list
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the ads or not
     * @returns {Promise<Array<Ad>>}
     */
    list(cache?: boolean): Promise<Array<Ad>>;
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
    get(adUid: string, cache?: boolean): Promise<Ad>;
    /**
     * Fetches a maniapub and returns its data
     * @param {number} adUid The ad ID
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the news or not
     * @returns {Promise<Splashscreen>} The splashscreen
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import Ad = require("../structures/Ad");
