export = PlayerManager;
/**
 * Represents a manager for players.
 */
declare class PlayerManager {
    /**
     * @param {Client} client The client.
     */
    constructor(client: Client);
    /**
     * The client instance
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
     * Searches for a player by its name
     * @param {String} query The query to search for
     * @returns {Promise<Array<PlayerSearchResult>>} The results
     * @example
     * // Search for a player
     * client.players.search('greep').then(results => {
     *    client.players.get(results[0].id).then(player => {
     *       console.log('The tag of this player is', player.tag);
     *   });
     * });
     */
    search(query: string): Promise<Array<PlayerSearchResult>>;
    /**
     * Get all players from a group
     * @param {PlayerGroup} groupName The group name
     * @returns {?Promise<Array<PlayerSearchResult>>} The results
     */
    group(groupName: PlayerGroup): Promise<Array<PlayerSearchResult>> | null;
    /**
     * Get the trophy leaderboard
     * @param {Number} page The page number
     * @returns {Promise<Array<PlayerTopTrophy>>} The players' top trophies
     * @example
     * Client.players.topTrophies().then(top => {
     *    console.log("The number 1 player is " + top[0].player.name + " with " + top[0].score + " trophies");
     * });
     */
    topTrophies(page?: number): Promise<Array<PlayerTopTrophy>>;
    /**
     * Gets the matchmaking leaderboard
     * @param {MatchmakingGroup} group The matchmaking group
     * @param {Number} page The page number
     * @returns
     */
    topMatchmaking(group: MatchmakingGroup, page?: number): Promise<any>;
    /**
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @param {Boolean} cache Whether to get the player from cache or not
     * @returns {Promise<Player>} The player
     * @example
     * // Get a player
     * client.players.get('26d9a7de-4067-4926-9d93-2fe62cd869fc').then(player => {
     *     console.log(player.name);
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
/**
 * The result of a player search. It is completely different from the {@link Player} object.
 */
declare class PlayerSearchResult {
    /**
     * @param {Client} client The client instance.
     * @param {Object} data The data.
     */
    constructor(client: Client, data: any);
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /**
     * The player's account ID
     * @type {String}
     */
    id: string;
    /**
     * The player's display name
     * @type {String}
     */
    name: string;
    /**
     * The player's club tag (if any)
     * @type {?String}
     */
    tag: string | null;
}
import { PlayerGroup } from "../util/Constants";
/**
 * Represents a player top trophy
 */
declare class PlayerTopTrophy {
    /**
     * @param {Client} client The client instance
     * @param {Object} data The data
     */
    constructor(client: Client, data: any);
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /**
     * The player
     * @type {PlayerSearchResult}
     */
    player: PlayerSearchResult;
    /**
     * The rank
     * @type {Number}
     */
    rank: number;
    /**
     * The score (number of trophies)
     * @type {Number}
     */
    score: number;
}
import { MatchmakingGroup } from "../util/Constants";
import Player = require("../structures/Player");
