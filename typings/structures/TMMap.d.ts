export = TMMap;
declare class TMMap {
    /**
     * Represents a map on Trackmania.
     */
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
     * The map uid.
     * @type {string}
     */
    get uid(): string;
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
     * The map thumbnail.
     * @type {string}
     */
    get thumbnail(): string;
    /**
     * The map exchange id, if the map is on trackmania.exchange, else null.
     * @type {?string}
     */
    get exchangeId(): string;
    /**
     * The map informations on trackmania.exchange.
     * @type {?TMExchangeMap}
     */
    get exchange(): TMExchangeMap;
    /**
     * @type {TMExchangeMap}
     * @private
     * */
    private _TMExchange;
    /**
     * The map karma.
     * @type {?TMMapKarma}
     */
    get karma(): TMMapKarma;
    /**
     * @type {TMMapKarma}
     * @private
     */
    private _TMMapKarma;
    /**
     * The map leaderboard.
     * @type {?Array<TMMapLeaderboard>}
     */
    get leaderboard(): TMMapLeaderboard[];
    /**
     * Load more in the leaderboard
     * @returns {?Promise<Array<TMMapLeaderboard>>}
     */
    leaderboardLoadMore(): Promise<Array<TMMapLeaderboard>> | null;
}
import Client = require("../client/Client");
/**
 * Represents the medals times on a map.
 */
declare class TMMapMedalTimes {
    /**
     * @param {TMMap} map The map.
     */
    constructor(map: TMMap);
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
import Player = require("./Player");
/**
 * Represents the map details from Trackmania.exchange.
 */
declare class TMExchangeMap {
    /**
     * @param {TMMap} map The map
     * @param {Object} data
     */
    constructor(map: TMMap, data: any);
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
     * @type {Number}
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
/**
 * Represents the Map Voting stats.
 */
declare class TMMapKarma {
    /**
     * @param {TMMap} map The map.
     * @param {Object} data
     */
    constructor(map: TMMap, data: any);
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
     * The map Uid.
     * @type {string}
     */
    get uid(): string;
    /**
     * The number of votes.
     * @type {number}
     */
    get votes(): number;
    /**
     * The average vote (between 0 and 100).
     * @type {number}
     */
    get average(): number;
    /**
     * The last vote date.
     * @type {Date}
     */
    get lastVoteDate(): Date;
}
/**
 * Represents the map leaderboard.
 */
declare class TMMapLeaderboard {
    /**
     * @param {TMMap} map The map.
     * @param {Object} data
     */
    constructor(map: TMMap, data: any);
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
     * @returns {Player}
     */
    player(): Player;
    /**
     * The position of the player on this leaderboard
     * @type {Number}
     */
    get position(): number;
    /**
     * The time in milliseconds of the player
     * @type {Number}
     */
    get time(): number;
    /**
     * The date when the player get this leaderboard
     * @type {Date}
     */
    get date(): Date;
    /**
     * The ghost URL
     * @type {String}
     */
    get ghost(): string;
}
