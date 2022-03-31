export = COTDManager;
/**
 * Represents a COTD Manager.
 */
declare class COTDManager {
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
     * Get the COTD leaderboard by category
     * @param {COTDLeaderboardSortGroup} [sort="wins"] The leaderboard sorting
     * @param {boolean} [includeReruns=false] Whether to include reruns when sorting or not
     * @param {number} [page=0] The page number
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the list from cache or not
     * @returns {Promise<Array<COTDLeaderboard>>}
     */
    leaderboard(sort?: COTDLeaderboardSortGroup, includeReruns?: boolean, page?: number, cache?: boolean): Promise<Array<COTDLeaderboard>>;
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
import { COTDLeaderboardSortGroup } from "../util/Constants";
/**
 * Represents a position in the COTD Leaderboard
 */
declare class COTDLeaderboard {
    constructor(client: any, data: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The data of the COTD leaderboard.
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The player's name
     * @type {string}
     */
    get playerName(): string;
    /**
     * The player's club tag
     * @type {string}
     */
    get playerTag(): string;
    /**
     * The player's account ID
     * @type {string}
     */
    get playerId(): string;
    /**
     * The player
     * @returns {Promise<Player>}
     */
    player(): Promise<Player>;
    /**
     * The position of the player in the selected category
     * @type {number}
     */
    get position(): number;
    /**
     * The amount of COTD the player has played
     * @type {number}
     */
    get played(): number;
    /**
     * The amount of COTD reruns the player has played
     * @type {number}
     */
    get rerunsPlayed(): number;
    /**
     * The amount of COTD the player has won
     * @type {number}
     */
    get wins(): number;
    /**
     * The amount of COTD reruns the player has won
     * @type {number}
     */
    get rerunsWins(): number;
    /**
     * The amount of win streak the player has
     * @type {number}
     */
    get winStreak(): number;
    /**
     * The amount of win streak the player has (reruns included)
     * @type {number}
     */
    get winStreakWithReruns(): number;
}
import COTD = require("../structures/COTD");
import Player = require("../structures/Player");
