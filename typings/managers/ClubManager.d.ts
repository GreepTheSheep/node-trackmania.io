export = ClubManager;
/**
 * Represents a manager for clubs.
 */
declare class ClubManager {
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
     * Gets all the popular clubs
     * @param {number} [page=0] The page number
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the clubs or not
     * @returns {Promise<Array<Club>>} The clubs
     */
    popularClubs(page?: number, cache?: boolean): Promise<Array<Club>>;
    /**
     * Searches for a club
     * @param {string} query Search query
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<Club>>}
     */
    search(query: string, page?: number): Promise<Array<Club>>;
    /**
     * Fetches a Trackmania Club and returns its data
     * @param {number} id The Club Id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the club from cache or not
     * @returns {Promise<Club>} The Club
     * @example
     * client.clubs.get(54).then(club => {
     *     console.log(club.name);
     * });
     */
    get(id: number, cache?: boolean): Promise<Club>;
    /**
     * Fetches a map and returns its data
     * @param {string} id The Club Id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the club or not
     * @returns {Club} The club
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import Club = require("../structures/Club");
