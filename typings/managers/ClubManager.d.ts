export = ClubManager;
declare class ClubManager {
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
     * Fetches a Trackmania Club and returns its data
     * @param {Number} id The Club Id
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
     * @param {String} id The Club Id
     * @param {Boolean} cache Whether to cache the club or not
     * @returns {Club} The club
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import Club = require("../structures/Club");
