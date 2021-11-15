export = ClubManager;
/**
 * Represents a manager for clubs.
 */
declare class ClubManager {
    /**
     * @param {Client} client The client.
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
     * Gets all the popular clubs
     * @param {number} page The page number
     * @param {Boolean} cache Whether to cache the clubs or not
     * @returns {Promise<Array<Club>>} The clubs
     */
    popularClubs(page?: number, cache?: boolean): Promise<Array<Club>>;
    /**
     * Fetches a Trackmania Club and returns its data
     * @param {number} id The Club Id
     * @param {Boolean} cache Whether to get the club from cache or not
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
     * @param {Boolean} cache Whether to cache the club or not
     * @returns {Club} The club
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import Club = require("../structures/Club");
