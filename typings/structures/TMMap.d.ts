export = TMMap;
/**
 * Represents a map on Trackmania.
 */
declare class TMMap {
    constructor(client: any, data: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The map data.
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The map medal times.
     * @type {TMMapMedalTimes}
     */
    medalTimes: TMMapMedalTimes;
    /**
     * The map cached leaderboard data. You should use the leaderboardLoadMore() the first time to load the leaderboard.
     * @type {Array<TMMapLeaderboard>}
     */
    leaderboard: Array<TMMapLeaderboard>;
    /**
     * The map name.
     * @type {string}
     */
    get name(): string;
    /**
     * The map id.
     * @type {string}
     */
    get id(): string;
    /**
     * The map unique id.
     * @type {string}
     */
    get uid(): string;
    /**
     * The map Storage Object ID.
     * @type {string}
     */
    get storageId(): string;
    /**
     * The map author's name.
     * @type {string}
     */
    get authorName(): string;
    /**
     * The map author.
     * @returns {Promise<Player>}
     * @example
     * Client.maps.get('z28QXoFnpODEGgg8MOederEVl3j').then(async map => {
     *     const author = await map.author();
     *     console.log(`The map author is ${author.name}`);
     * });
     */
    author(): Promise<Player>;
    /**
     * The map submitter's name.
     * @type {string}
     */
    get submitterName(): string;
    /**
     * The map submitter.
     * @returns {Promise<Player>}
     */
    submitter(): Promise<Player>;
    /**
     * The environment for this map.
     * @type {string}
     */
    get environment(): string;
    /**
     * The map file name.
     * @type {string}
     */
    get fileName(): string;
    /**
     * The map uploaded date.
     * @type {Date}
     */
    get uploaded(): Date;
    /**
     * The map URL.
     * @type {string}
     */
    get url(): string;
    /**
     * The map thumbnail (from Nadeo services, direct download).
     * @type {string}
     */
    get thumbnail(): string;
    /**
     * The map thumbnail (cached from trackmania.io, can show).
     * @type {string}
     */
    get thumbnailCached(): string;
    /**
     * The map exchange id, if the map is on trackmania.exchange, else null.
     * @type {?string}
     */
    get exchangeId(): string;
    /**
     * The map informations on trackmania.exchange.
     * @returns {Promise<?TMExchangeMap>}
     */
    exchange(): Promise<TMExchangeMap | null>;
    /**
     * Load more results in the leaderboard.
     * @param {number} [nbOfResults=100] The number of results to load. (max 100)
     * @returns {Promise<?Array<TMMapLeaderboard>>}
     */
    leaderboardLoadMore(nbOfResults?: number): Promise<Array<TMMapLeaderboard> | null>;
    /**
     * Get a leaderboard in a specific position. Must be between 1 and 10000.
     * @param {number} position The position of the leaderboard.
     * @returns {Promise<?TMMapLeaderboard>}
     */
    leaderboardGet(position: number): Promise<TMMapLeaderboard | null>;
    /**
     * Subscribe to the map WR updates.
     * <info>When a new WR is set, the event {@link TMMap#e-wr} will be fired</info>
     * @returns {Promise<void>}
     * @example
     * Client.maps.get('z28QXoFnpODEGgg8MOederEVl3j').then(map => {
     *    map.subWR();
     *    map.on('wr', (old, new) => {
     *      console.log(`New WR for ${map.name} is ${new.playerName} (${new.time})`);
     *   });
     * });
     */
    subWR(): Promise<void>;
}
import Client = require("../client/Client");
/**
 * Represents the medals times on a map.
 */
declare class TMMapMedalTimes {
    constructor(map: any);
    /**
     * The map object.
     * @type {TMMap}
     */
    map: TMMap;
    /**
     * The map author time.
     * @type {number}
     */
    author: number;
    /**
     * The map gold time.
     * @type {number}
     */
    gold: number;
    /**
     * The map silver time.
     * @type {number}
     */
    silver: number;
    /**
     * The map bronze time.
     * @type {number}
     */
    bronze: number;
}
/**
 * Represents the map leaderboard.
 */
declare class TMMapLeaderboard {
    constructor(map: any, data: any);
    /**
     * The map Instance
     * @type {TMMap}
     */
    map: TMMap;
    /**
     * The Client instance
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
     * The player that got this leaderboard
     * @returns {Promise<Player>}
     */
    player(): Promise<Player>;
    /**
     * The player name on this leaderboard
     * @type {string}
     */
    get playerName(): string;
    /**
     * The player club tag on this leaderboard
     * @type {string}
     */
    get playerClubTag(): string;
    /**
     * The position of the player on this leaderboard
     * @type {number}
     */
    get position(): number;
    /**
     * The time in milliseconds of the player
     * @type {number}
     */
    get time(): number;
    /**
     * The date when the player get this leaderboard
     * @type {Date}
     */
    get date(): Date;
    /**
     * The ghost URL
     * @type {string}
     */
    get ghost(): string;
}
import Player = require("./Player");
/**
 * Represents the map details from Trackmania.exchange.
 */
declare class TMExchangeMap {
    constructor(map: any, data: any);
    /**
     * The map instance.
     * @type {TMMap}
     */
    map: TMMap;
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The map data.
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The map exchange id.
     * @type {number}
     */
    get id(): number;
    /**
     * The map name.
     * @type {string}
     */
    get name(): string;
    /**
     * The map author.
     * @type {string}
     */
    get author(): string;
    /**
     * The map description.
     * @type {string}
     */
    get description(): string;
    /**
     * The map length.
     * @type {string}
     */
    get length(): string;
    /**
     * The map difficulty.
     * @type {string}
     */
    get difficulty(): string;
    /**
     * The map upload date.
     * @type {Date}
     */
    get uploaded(): Date;
    /**
     * The map last update date.
     * @type {Date}
     */
    get updated(): Date;
    /**
     * The map award count.
     * @type {number}
     */
    get awards(): number;
    /**
     * The map download link.
     * @type {string}
     */
    get download(): string;
}
