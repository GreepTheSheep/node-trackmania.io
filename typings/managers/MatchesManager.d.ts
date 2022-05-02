export = MatchesManager;
/**
 * Represents the matches manager (3v3 or Royal matches).
 */
declare class MatchesManager {
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
     * Get a list of the matches
     * @param {MatchmakingGroup} [group='3v3'] The group to get the matches from
     * @param {number} [page=0] The page to get
     * @param {Boolean} [cache=this.client.options.cache.enabled] Whether to cache the matches or not
     * @returns {Promise<Array<MatchResult>>}
     */
    list(group?: MatchmakingGroup, page?: number, cache?: boolean): Promise<Array<MatchResult>>;
    /**
     * Fetches a Trackmania Match and returns its data.
     * @param {string} liveID The live ID of the match (should start with 'LID-MTCH')
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the news from cache or not
     * @returns {Promise<Match>} The Match
     */
    get(liveID: string, cache?: boolean): Promise<Match>;
    /**
     * Fetches a Match and returns its data
     * @param {string} liveID Thelive ID of the match (should start with 'LID-MTCH')
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the news or not
     * @returns {Promise<Match>} The splashscreen
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import { MatchmakingGroup } from "../util/Constants";
/**
 * The result of a Match from the list. It is completely different from the {@link Match} object.
 */
declare class MatchResult {
    constructor(client: any, data: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The match ID
     * @type {number}
     */
    id: number;
    /**
     * The match Live ID
     * @type {string}
     */
    liveID: string;
    /**
     * The match start date
     * @type {Date}
     */
    startDate: Date;
    /**
     * The status of the match
     * @type {MatchStatus}
     */
    status: MatchStatus;
    /**
     * Get the match
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the match or not
     */
    match(cache?: boolean): Promise<Match>;
}
import Match = require("../structures/Match");
import { MatchStatus } from "../util/Constants";
