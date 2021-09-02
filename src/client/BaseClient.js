const EventEmitter = require('events');
const APIRequest = require('../rest/APIRequest');
const Util = require('../util/Util');
const Options = require('../util/Options');
const defaultOptions = require('../util/defaultOptions'); // eslint-disable-line no-unused-vars

class BaseClient extends EventEmitter {
    constructor(options = {}) {
        super();

        /** @type {defaultOptions} */
        this.options = Util.mergeDefault(Options.createDefault(), options);

        /** 
         * Get the ratelimits details on trackmania.io. If the data returns null, it means you haven't actually done a request
         * @type {Object} 
         */
        this.ratelimit = {
            ratelimit: null,
            remaining: null,
            reset: null
        };
    }

    /**
     * Do an API request
     * @param {String} url The URL to request
     * @returns {Promise<Object>} A promise that resolves to the API response
     * @private
     */
    async _apiReq(url){
        const request = new APIRequest(this);

        return await request.do(url);
    }

    /**
     * Sets a User Agent for your project.
     * Required if you run a important project.
     * @param {String} useragent The User Agent to set to.
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
     * @param {String} key The full API key. It must contains "yourname:theactualsecretkey"
     * @returns {Boolean}
     */
    setAPIKey(key){
        this.options.api.key = key;

        if (this.options.api.key == key) return true;
        else return false;
    }

}

module.exports = BaseClient;