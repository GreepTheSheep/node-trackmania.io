export = BaseClient;
declare class BaseClient {
    constructor(options?: {});
    /** @type {defaultOptions} */
    options: defaultOptions;
    /**
     * Get the ratelimits details on trackmania.io. If the data returns null, it means you haven't actually done a request
     * @type {Object}
     */
    ratelimit: any;
    /**
     * Do an API request
     * @param {String} url The URL to request
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
