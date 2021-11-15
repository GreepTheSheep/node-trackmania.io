export = BaseClient;
/**
 * The Base Client
 */
declare class BaseClient {
    /**
     * @param {defaultOptions} options The options to use.
     */
    constructor(options?: defaultOptions);
    /**
     * The options of the client.
     * @type {defaultOptions}
     * @readonly
     */
    readonly options: defaultOptions;
    /**
     * Get the ratelimits details on trackmania.io.
     * @type {ClientRatelimit}
     */
    ratelimit: ClientRatelimit;
    /**
     * Do an API request
     * @param {string} url The URL to request
     * @param {string} method The HTTP method to use (Default: GET)
     * @param {Object} data The data to send
     * @returns {Promise<Object>} A promise that resolves to the API response
     * @private
     */
    private _apiReq;
    /**
     * Sets a User Agent for your project.
     * Required if you run a important project.
     * @param {string} useragent The User Agent to set to.
     * @returns {boolean}
     */
    setUserAgent(useragent: string): boolean;
    /**
     * Sets an API Key.
     * Required if you run a important project. It will triple the rate limit.
     * @param {string} key The full API key. It must contains "yourname:theactualsecretkey"
     * @returns {boolean}
     */
    setAPIKey(key: string): boolean;
}
import defaultOptions = require("../util/defaultOptions");
/**
 * The ratelimit details of the client.
 */
declare class ClientRatelimit {
    constructor(baseClient: any);
    /**
     * The base client.
     * @type {BaseClient}
     */
    baseClient: BaseClient;
    /**
     * The total number of requests you can make on trackmania.io API.
     * If null, it means you haven't actually done a request
     * @type {?number}
     */
    ratelimit: number | null;
    /**
     * The number of requests you can make before the ratelimit resets.
     * If null, it means you haven't actually done a request
     * @type {?number}
     */
    remaining: number | null;
    /**
     * The date when the ratelimit resets.
     * If null, it means you haven't actually done a request
     * @type {?Date}
     */
    reset: Date | null;
}
