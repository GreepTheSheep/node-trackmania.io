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
    UA: string;
    key: string;
    do(url: any, method?: string, body?: any): any;
    url: any;
    options: {
        headers: any;
        method: string;
        body: any;
    };
}
import BaseClient = require("../client/BaseClient");
