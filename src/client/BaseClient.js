const EventEmitter = require('events');
const APIRequest = require('../rest/APIRequest');
const Util = require('../util/Util');
const defaultOptions = require('../util/defaultOptions'); 

/**
 * The Base Client
 * @extends {EventEmitter}
 */
class BaseClient extends EventEmitter {
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
     * @param {string} [method="GET"] The HTTP method to use
     * @param {?Object} [body=null] The data to send
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
     * @param {string} [useragent=this.options.api.useragent] The User Agent to set to.
     * @returns {void}
     */
    setUserAgent(useragent = this.options.api.useragent){
        this.options.api.useragent = useragent;
    }

    /**
     * Sets an API Key.
     * Required if you run a important project. It will triple the rate limit.
     * 
     * <warn>This should be kept private at all times.</warn>
     * @param {string} [key=this.options.api.key] The full API key. It must contains "yourname:theactualsecretkey"
     * @returns {void}
     */
    setAPIKey(key = this.options.api.key){
        this.options.api.key = key;
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