const EventEmitter = require('events');
const APIRequest = require('../rest/APIRequest');
const Util = require('../util/Util');
const defaultOptions = require('../util/defaultOptions'); 

/**
 * The Base Client
 */
class BaseClient extends EventEmitter {
    /**
     * @param {defaultOptions} options The options to use.
     */
    constructor(options = {}) {
        super();

        /** 
         * The options of the client.
         * @type {defaultOptions}
         * @readonly
         */
        this.options = Util.mergeDefault(new defaultOptions(this), options);

        /** 
         * Get the ratelimits details on trackmania.io.
         * @type {ClientRatelimit} 
         */
        this.ratelimit = new ClientRatelimit(this);
    }

    /**
     * Do an API request
     * @param {string} url The URL to request
     * @param {string} method The HTTP method to use (Default: GET)
     * @param {Object} data The data to send
     * @returns {Promise<Object>} A promise that resolves to the API response
     * @private
     */
    async _apiReq(url, method = 'GET', body = null){
        const request = new APIRequest(this);

        return await request.do(url, method, body);
    }

    /**
     * Sets a User Agent for your project.
     * Required if you run a important project.
     * @param {string} useragent The User Agent to set to.
     * @returns {Boolean}
     */
    setUserAgent(useragent){
        this.options.api.useragent = useragent;

        if (this.options.api.useragent == useragent) return true;
        else return false;
    }

    /**
     * Sets an API Key.
     * Required if you run a important project. It will triple the rate limit.
     * @param {string} key The full API key. It must contains "yourname:theactualsecretkey"
     * @returns {Boolean}
     */
    setAPIKey(key){
        this.options.api.key = key;

        if (this.options.api.key == key) return true;
        else return false;
    }

}

/**
 * The ratelimit details of the client.
 */
class ClientRatelimit {
    constructor(baseClient){
        /**
         * The base client.
         * @type {BaseClient}
         */
        this.baseClient = baseClient;

        /**
         * The total number of requests you can make on trackmania.io API.
         * If null, it means you haven't actually done a request
         * @type {?number}
         */
        this.ratelimit = null;

        /**
         * The number of requests you can make before the ratelimit resets.
         * If null, it means you haven't actually done a request
         * @type {?number}
         */
        this.remaining = null;

        /**
         * The date when the ratelimit resets.
         * If null, it means you haven't actually done a request
         * @type {?Date}
         */
        this.reset = null;
    }
}

module.exports = BaseClient;