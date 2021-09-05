export = BaseClient;
declare class BaseClient {
    constructor(options?: {});
    /** @type {defaultOptions} */
    options: defaultOptions;
    /**
     * Get the ratelimits details on trackmania.io.
     * @type {ClientRatelimit}
     */
    get ratelimit(): ClientRatelimit;
    /** @private */
    private _Ratelimit;
    /**
     * Do an API request
     * @param {String} url The URL to request
     * @param {String} method The HTTP method to use (Default: GET)
     * @param {Object} data The data to send
     * @returns {Promise<Object>} A promise that resolves to the API response
     * @private
     */
    private _apiReq;
    /**
     * Sets a User Agent for your project.
     * Required if you run a important project.
     * @param {String} useragent The User Agent to set to.
     * @returns {Boolean}
     */
    setUserAgent(useragent: string): boolean;
    /**
     * Sets an API Key.
     * Required if you run a important project. It will triple the rate limit.
     * @param {String} key The full API key. It must contains "yourname:theactualsecretkey"
     * @returns {Boolean}
     */
    setAPIKey(key: string): boolean;
}
import defaultOptions = require("../util/defaultOptions");
declare class ClientRatelimit {
    /**
     * The total number of requests you can make on trackmania.io API. If null, it means you haven't actually done a request
     * @type {Number}
     */
    ratelimit: number;
    /**
     * The number of requests you can make before the ratelimit resets. If null, it means you haven't actually done a request
     * @type {Number}
     */
    remaining: number;
    /**
     * The date when the ratelimit resets. If null, it means you haven't actually done a request
     * @type {Date}
     */
    reset: Date;
}
