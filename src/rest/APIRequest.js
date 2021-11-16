const fetch = require('node-fetch');
const pkg = require('../../package.json');
const ReqUtil = require('../util/ReqUtil');
const BaseClient = require('../client/BaseClient'); // eslint-disable-line no-unused-vars

/**
 * APIRequest class
 * @private
 */
class APIRequest {
    /**
     * @param {BaseClient} client The client object
     */
    constructor(client) {
        /**
         * The client that created this request 
         * @type {BaseClient}
         * @readonly
         */
        this.client = client;

        // Creating UA string
        let cwd = process.cwd();
        let cwf = require.main.filename;
        cwf = cwf.substring(cwf.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);
        cwd = cwd.substring(cwd.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);
        /**
         * The User-Agent string which is used for the requests
         * @type {string}
         */
        this.UA = this.client.options.api.useragent;
        /**
         * The API key for the requests on trackmania.io
         * @type {string}
         */
        this.key = this.client.options.api.key;
        if (this.UA != null || !cwd.includes(pkg.name)) {
            if (this.UA == null) this.UA = cwd + ' (' + cwf + ')' ;
            else this.UA += ' (' + cwf + ')';

            this.UA += ' - using';
        } else this.UA = '[TESTING BUILD]';
        this.UA += ' node-' + pkg.name + ' ' + pkg.version;
    }

    /**
     * Makes a request to the API
     * @param {string} url The URL
     * @param {string} [method="GET"] The method
     * @param {Object} [body=null] The body
     * @returns {Promise<Object>} The response
     */
    do(url, method = 'GET', body = null) {
        this.url = url;
        // Creating options
        const headers = new fetch.Headers({
            "Accept"       : "application/json",
            "Content-Type" : "application/json",
            "User-Agent"   : this.UA 
        });
        if (this.url.startsWith(new ReqUtil(this.client).tmioAPIURL) && this.key) headers.append('X-API-Key', this.key);
        this.options = {
            headers,
            method,
            body            
        };
        if (this.client.options.dev) console.log("API Request:", this.url, this.options);
        return fetch(this.url, this.options)
            .then(async response => {
                // Save the rate limit details
                if (this.url.startsWith(new ReqUtil(this.client).tmioAPIURL)){
                    this.client.ratelimit = {
                        ratelimit: Number(response.headers.raw()['x-ratelimit-limit'][0]),
                        remaining: Number(response.headers.raw()['x-ratelimit-remaining'][0]),
                        reset: new Date(Number(response.headers.raw()['x-ratelimit-reset'][0]) * 1000)
                    };
                }
                if (response.status >= 200 && response.status < 300) {
                    return await response.json();
                } else {
                    if (response.status == 500) {
                        const json = await response.json();
                        throw new Error(json.error);
                    } else throw new Error(response.statusText);
                }
            })
            .catch(error => {
                if (this.client.options.dev) error = error + " ("+this.url+")";
                throw new Error(error);
            });
    }
}

module.exports = APIRequest;