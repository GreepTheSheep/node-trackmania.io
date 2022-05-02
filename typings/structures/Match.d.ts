export = Match;
/**
 * The match
 */
declare class Match {
    constructor(client: any, data: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The data
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The match ID
     * @type {number}
     */
    get id(): number;
    /**
     * The match live ID
     * @type {string}
     */
    get liveId(): string;
    /**
     * The match name
     * @type {string}
     */
    get name(): string;
    /**
     * The match type
     * @type {?MatchmakingGroup}
     */
    get type(): string;
    /**
     * The match group
     * @type {string}
     * @private
     */
    private get group();
    /**
     * The match start date
     * @type {Date}
     */
    get startDate(): Date;
    /**
     * The match end date
     * @type {Date}
     */
    get endDate(): Date;
    /**
     * The match score direction
     * @type {string}
     * @private
     */
    private get scoreDirection();
    /**
     * The match participant type
     * @type {string}
     * @private
     */
    private get participantType();
    /**
     * The match script settings
     * NOTE: Array is empty (api update?)
     * @type {Array<MatchScriptSetting>}
     * @private
     */
    private get scriptSettings();
    /**
     * The match maps
     * NOTE: Array is empty (api update?)
     * @type {Array<MatchMap>}
     * @private
     */
    private get maps();
    /**
     * The match server id
     * @type {number}
     */
    get serverId(): number;
    /**
     * The match join link
     * @type {string}
     */
    get joinLink(): string;
    /**
     * The match status
     * @type {MatchStatus}
     */
    get status(): string;
    /**
     * The match players
     * @type {Array<MatchPlayer>}
     */
    get players(): MatchPlayer[];
    /**
     * The match teams (if match is completed)
     * @type {?Array<MatchTeam>}
     */
    get teams(): MatchTeam[];
}
import Client = require("../client/Client");
/**
 * The player in the match
 */
declare class MatchPlayer {
    constructor(match: any, data: any);
    /**
     * The match
     * @type {Match}
     */
    match: Match;
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The data
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The player name
     * @type {string}
     */
    get name(): string;
    /**
     * The player id
     * @type {string}
     */
    get id(): string;
    /**
     * The player rank in the match
     * @type {number}
     */
    get rank(): number;
    /**
     * The player score in the match
     * @type {number}
     */
    get score(): number;
    /**
     * The team index where the player is in the match
     * @type {number}
     */
    get teamIndex(): number;
    /**
     * The team where the player is (if the match is completed)
     * @type {?MatchTeam}
     */
    get team(): MatchTeam;
    /**
     * Whether the player is MVP (in a 3v3 match)
     * @type {boolean}
     */
    get isMVP(): boolean;
    /**
     * The matchmaking points of the player before the match
     * @type {number}
     */
    get mmPointsBefore(): number;
    /**
     * The matchmaking points of the player after the match
     * @type {number}
     */
    get mmPointsAfter(): number;
    /**
     * The matchmaking points of the player gained in the match
     * @type {number}
     */
    get mmPointsGained(): number;
    /**
     * The player object
     * @type {Player}
     */
    player(): Promise<import("./Player")>;
}
/**
 * The team in the match
 */
declare class MatchTeam {
    constructor(match: any, data: any);
    /**
     * The match
     * @type {Match}
     */
    match: Match;
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The data
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The team Index
     * @type {number}
     */
    get index(): number;
    /**
     * The team score
     * @type {number}
     */
    get score(): number;
    /**
     * The team name
     * @type {?string | TeamName}
     */
    get name(): string;
    /**
     * The team image (if the match is Royal)
     * @type {?string}
     */
    get image(): string;
}
