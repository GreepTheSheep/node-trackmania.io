export = APIRequest;
declare class APIRequest {
    constructor(client: any);
    /** @type {Client} */
    client: Client;
    UA: any;
    key: any;
    do(url: any, method?: string, body?: any): any;
    url: any;
    options: {
        headers: any;
        method: string;
        body: any;
    };
}
import Client = require("../client/Client");
