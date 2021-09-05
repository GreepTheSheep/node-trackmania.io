export = TMEvent;
declare class TMEvent {
    constructor(client: any, data: any);
    /** The client instance
     * @type {Client}
     */
    client: Client;
    /** @private */
    private _data;
    /**
     * The event's ID.
     * @type {Number}
     */
    get id(): number;
    /**
     * The number of players in the event.
     * @type {Number}
     */
    get size(): number;
    /**
     * The event's Live ID.
     * @type {String}
     */
    get liveId(): string;
    /**
     * The creator of the event.
     * @returns {Promise<Player>}
     */
    creator(): Promise<Player>;
    /**
     * The event's name.
     * @type {String}
     */
    get name(): string;
    /**
     * The event's description.
     * @type {String}
     */
    get description(): string;
    /**
     * The event's registration start date.
     * @type {Date}
     */
    get registrationStart(): Date;
    /**
     * The event's registration end date.
     * @type {Date}
     */
    get registrationEnd(): Date;
    /**
     * The event's start date.
     * @type {Date}
     */
    get start(): Date;
    /**
     * The event's end date.
     * @type {Date}
     */
    get end(): Date;
    /**
     * The event's leaderboard id.
     * @type {Number}
     */
    get leaderboardId(): number;
    /**
     * The event's manialink (if any).
     * @type {?String}
     */
    get manialink(): string;
    /**
     * The event's rules URL (if any).
     * @type {?String}
     */
    get rulesUrl(): string;
    /**
     * The event's stream URL (if any).
     * @type {?String}
     */
    get stream(): string;
    /**
     * The event's website (if any).
     * @type {?String}
     */
    get website(): string;
    /**
     * The event's logo URL.
     * @type {String}
     */
    get logo(): string;
    /**
     * The event's vertical banner URL.
     * @type {String}
     */
    get vertical(): string;
    /**
     * The event's rounds.
     * @type {Array<TMEventRound>}
     */
    get rounds(): TMEventRound[];
}
import Client = require("../client/Client");
import Player = require("./Player");
declare class TMEventRound {
    constructor(event: any, data: any);
    /**
     * The event instance
     * @type {TMEvent}
     */
    event: TMEvent;
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /** @private */
    private _data;
    /** @private */
    private _challengesCache;
    /**
     * The round's ID.
     * @type {Number}
     */
    get id(): number;
    /**
     * The round's name.
     * @type {String}
     */
    get name(): string;
    /**
     * The round's status.
     * @type {String}
     */
    get status(): string;
    /**
     * The round's matches.
     * @type {Array<TMEventRoundMatch>}
     */
    get matches(): TMEventRoundMatch[];
    /**
     * The round's challenges.
     * @param {Boolean} cache Wether to get the challenges from the cache or not.
     * @returns {Promise<Array<TMEventChallenge>>}
     */
    challenges(cache?: boolean): Promise<Array<TMEventChallenge>>;
    /**
     * Fetches the round's challenges.
     * @param {Number} index The index of the challenge to fetch.
     * @param {Boolean} cache Wether to cache the challenges or not.
     * @returns {Promise<Array<TMEventChallenge>>}
     * @private
    */
    private _fetchChallenge;
}
declare class TMEventRoundMatch {
    constructor(round: any, data: any);
    /**
     * The round instance
     * @type {TMEventRound}
     */
    round: TMEventRound;
    /**
     * The event instance
     * @type {TMEvent}
     */
    event: TMEvent;
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /** @private */
    private _data;
    /** @private */
    private _resultsCache;
    /**
     * The match's ID.
     * @type {Number}
     */
    get id(): number;
    /**
     * The match's name.
     * @type {String}
     */
    get name(): string;
    /**
     * Whether the match is completed.
     * @type {Boolean}
     */
    get isCompleted(): boolean;
    /**
     * The match's results.
     * @param {Number} page The page number.
     * @param {Boolean} cache Whether to cache the results.
     * @returns {Promise<Array<TMEventRoundMatchResult>>}
     */
    getResults(page?: number, cache?: boolean): Promise<Array<TMEventRoundMatchResult>>;
    /**
     * Fetches the match's results.
     * @param {Number} page The page number.
     * @param {Boolean} cache Whether to cache the results.
     * @returns {Promise<Array<TMEventRoundMatchResult>>}
     * @private
     */
    private _fetchResults;
}
declare class TMEventChallenge {
    constructor(round: any, data: any);
    /**
     * The round instance
     * @type {TMEventRound}
     */
    round: TMEventRound;
    /**
     * The event instance
     * @type {TMEvent}
     */
    event: TMEvent;
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /** @private */
    private _data;
    /** @private */
    private _resultsCache;
    /**
     * The challenge's ID.
     * @type {Number}
     */
    get id(): number;
    /**
     * The challenge's name.
     * @type {String}
     */
    get name(): string;
    /**
     * The challenge's status.
     * @type {String}
     */
    get status(): string;
    /**
     * The challenge's rooms number.
     * @type {Number}
     */
    get rooms(): number;
    /**
     * The challenge's maps.
     * @returns {Promise<Array<TMMap>>}
     */
    getMaps(): Promise<Array<TMMap>>;
    /**
     * The challenge's admins.
     * @returns {Promise<Array<Player>>}
     */
    getAdmins(): Promise<Array<Player>>;
    /**
     * The challenge's results.
     * @param {Number} page The page number.
     * @param {Boolean} cache Whether to get the results from cache.
     * @returns {Promise<Array<TMEventChallengeResult>>}
    */
    getResults(page?: number, cache?: boolean): Promise<Array<TMEventChallengeResult>>;
    /**
     * Fetches the match's results.
     * @param {Number} page The page number.
     * @param {Boolean} cache Whether to cache the results.
     * @returns {Promise<Array<TMEventChallengeResult>>}
     * @private
     */
    private _fetchResults;
}
declare class TMEventRoundMatchResult {
    constructor(match: any, data: any);
    /**
     * The match instance
     * @type {TMEventRoundMatch}
     */
    match: TMEventRoundMatch;
    /**
     * The event instance
     * @type {TMEvent}
     */
    event: TMEvent;
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /** @private */
    private _data;
    /**
     * The player that got the result.
     * @returns {Promise<Player>}
     */
    player(): Promise<Player>;
    /**
     * The position of the player.
     * @returns {Number}
     */
    get position(): number;
    /**
     * The score of the player.
     * @returns {Number}
     */
    get score(): number;
}
import TMMap = require("./TMMap");
declare class TMEventChallengeResult {
    constructor(challenge: any, data: any);
    /**
     * The challenge instance
     * @type {TMEventChallenge}
     */
    challenge: TMEventChallenge;
    /**
     * The event instance
     * @type {TMEvent}
     */
    event: TMEvent;
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /** @private */
    private _data;
    /**
     * The player.
     * @returns {Promise<Player>}
     */
    player(): Promise<Player>;
    /**
     * The position of the player.
     * @returns {Number}
     */
    get position(): number;
    /**
     * The score of the player.
     * @returns {Number}
     */
    get score(): number;
}
