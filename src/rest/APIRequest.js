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
        let cwd = process.cwd(),
            cwf;

        cwd = cwd.substring(cwd.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);

        // Gets the current file name where the script starts
        // If require.main is undefined, that means it executes that in the CLI
        if (require.main){
            cwf = require.main.filename;
            cwf = cwf.substring(cwf.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);
        }
        else cwf = "Node.js cli";

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
        /**
         * Emitted before every API request.
         * This event can emit several times for the same request, e.g. when hitting a rate limit.
         * <info>This is an informational event that is emitted quite frequently,
         * it is highly recommended to check `request.url` to filter the data.</info>
         * @event Client#apiRequest
         * @param {APIRequest} request The request that is about to be sent
        */
        this.client.emit('apiRequest', this);
        return fetch(this.url, this.options)
            .then(async response => {
                /**
                 * Emitted after every API request has received a response.
                 * This event does not necessarily correlate to completion of the request, e.g. when hitting a rate limit.
                 * <info>This is an informational event that is emitted quite frequently,
                 * it is highly recommended to check `request.url` to filter the data.</info>
                 * @event Client#apiResponse
                 * @param {APIRequest} request The request that triggered this response
                 * @param {Response} response The response received from the API
                 */
                this.client.emit('apiResponse', this, response);

                if (response.ok) {
                    // Save the rate limit details
                    if (this.url.startsWith(new ReqUtil(this.client).tmioAPIURL)){
                        this.client.ratelimit = {
                            ratelimit: Number(response.headers.raw()['x-ratelimit-limit'][0]),
                            remaining: Number(response.headers.raw()['x-ratelimit-remaining'][0]),
                            reset: new Date(Number(response.headers.raw()['x-ratelimit-reset'][0]) * 1000)
                        };
                    }

                    return await response.json();
                } else {
                    const json = await response.json();
                    if (json) {
                        if (json.error) throw json.error;
                        else throw json;
                    } else throw response.statusText;
                }
            })
            .catch(error => {
                if (this.client.options.dev) error = error + " ("+this.url+")";
                throw error;
            });
    }
}

module.exports = APIRequest;