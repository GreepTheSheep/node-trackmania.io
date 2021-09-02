export = PlayerManager;
declare class PlayerManager {
    constructor(client: any);
    /** The client instance
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
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @param {Boolean} cache Whether to get the player from cache or not
     * @returns {Promise<Player>} The player
     * @example
     * // Get a player
     * client.players.get('greep').then(player => {
     *     console.log(player.displayname);
     * });
     */
    get(accountid: string, cache?: boolean): Promise<Player>;
    /**
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @param {Boolean} cache Whether to cache the player or not
     * @returns {Player} The player
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import Player = require("../structures/Player");
