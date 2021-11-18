export = TOTDManager;
/**
 * Represents a manager for TOTDs.
 */
declare class TOTDManager {
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
     * Calculate the number of months between today and the month and year
     * @param {Date} date The date
     * @private
     */
    private _calculateMonths;
    /**
     * Fetches a TOTD with it's day and returns its data
     * @param {Date} date The date
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the map from cache or not
     * @returns {Promise<TOTD>} The map
     * @example
     * // Gets the TOTD of today
     * client.totd.get(new Date()).then(totd => {
     *     console.log(totd.map.name);
     * });
     */
    get(date: Date, cache?: boolean): Promise<TOTD>;
    /**
     * Fetches a TOTD and returns its data
     * @param {Date} date The date
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the map or not
     * @returns {TOTD} The map
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import TOTD = require("../structures/TOTD");
