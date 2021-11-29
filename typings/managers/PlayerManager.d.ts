export = PlayerManager;
/**
 * Represents a manager for players.
 */
declare class PlayerManager {
    constructor(client: any);
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
     * Returns the login of an account ID
     * @param {string} accountID The account ID
     * @returns {string}
     */
    toLogin(accountID: string): string;
    /**
     * Returns the Account ID of a login
     * @param {string} login The login of the player
     * @returns {?string}
     */
    toAccountId(login: string): string | null;
    /**
     * Searches for a player by its name
     * @param {string} query The query to search for
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
     * @param {number} [page=0] The page number
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
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<PlayerTopMatchmaking>>} The players' top matchmaking
     */
    topMatchmaking(group: MatchmakingGroup, page?: number): Promise<Array<PlayerTopMatchmaking>>;
    /**
     * Fetches a player and returns its data
     * @param {string} accountId The account ID or its tm.io vanity name
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the player from cache or not
     * @returns {Promise<Player>} The player
     * @example
     * // Get a player
     * client.players.get('26d9a7de-4067-4926-9d93-2fe62cd869fc').then(player => {
     *     console.log(player.name);
     * });
     */
    get(accountId: string, cache?: boolean): Promise<Player>;
    /**
     * Fetches a player and returns its data
     * @param {string} accountId The account ID or its tm.io vanity name
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the player or not
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
    constructor(client: any, data: any);
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /**
     * The player's account ID
     * @type {string}
     */
    id: string;
    /**
     * The player's display name
     * @type {string}
     */
    name: string;
    /**
     * The player's club tag (if any)
     * @type {?string}
     */
    tag: string | null;
    /**
     * Return to the Player Object
     * @returns {Promise<Player>}
     */
    player(): Promise<Player>;
}
import { PlayerGroup } from "../util/Constants";
/**
 * Represents a player top trophy
 */
declare class PlayerTopTrophy {
    constructor(client: any, data: any);
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
     * @type {number}
     */
    rank: number;
    /**
     * The score (number of trophies)
     * @type {number}
     */
    score: number;
}
import { MatchmakingGroup } from "../util/Constants";
/**
 * The player top matchmaking
 */
declare class PlayerTopMatchmaking {
    constructor(client: any, typeId: any, data: any);
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
     * @type {number}
     */
    rank: number;
    /**
     * The score
     * @type {number}
     */
    score: number;
    /**
     * The matchmaking division of the player
     * @type {MatchmakingDivision}
     */
    division: MatchmakingDivision;
}
import Player = require("../structures/Player");
import MatchmakingDivision = require("../structures/MatchmakingDivision");
