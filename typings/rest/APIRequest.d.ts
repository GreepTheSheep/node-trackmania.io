export = APIRequest;
/**
 * APIRequest class
 * @private
 */
declare class APIRequest {
    /**
     * @param {BaseClient} client The client object
     */
    constructor(client: BaseClient);
    /**
     * The client that created this request
     * @type {BaseClient}
     * @readonly
     */
    readonly client: BaseClient;
    /**
     * The User-Agent string which is used for the requests
     * @type {string}
     */
    UA: string;
    /**
     * The API key for the requests on trackmania.io
     * @type {string}
     */
    key: string;
    /**
     * Makes a request to the API
     * @param {string} url The URL
     * @param {string} [method="GET"] The method
     * @param {Object} [body=null] The body
     * @returns {Promise<Object>} The response
     */
    do(url: string, method?: string, body?: any): Promise<any>;
    url: string;
    options: {
        headers: any;
        method: string;
        body: any;
    };
}
import BaseClient = require("../client/BaseClient");
