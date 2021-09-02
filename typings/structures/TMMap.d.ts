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
    client: any;
    /**
     * The map data.
     * @private
     */
    private _data;
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
     * The map medal times.
     * @returns {Object<string, number>} string: medal name, number: time in miliseconds
     */
    get medalTimes(): {
        [x: string]: number;
    };
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
     * @returns {?TMExchangeMap}
     */
    get exchange(): TMExchangeMap;
    /** @private */
    private _TMExchange;
    /**
     * The map karma.
     * @returns {?TMMapKarma}
     */
    get karma(): TMMapKarma;
    /** @private */
    private _TMMapKarma;
}
import Player = require("./Player");
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
    client: any;
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
declare class TMMapKarma {
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
    client: any;
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
