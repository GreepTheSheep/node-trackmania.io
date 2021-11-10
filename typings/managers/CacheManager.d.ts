export = CacheManager;
declare class CacheManager {
    /**
     * Creates a new CacheManager instance.
     * @param {Client} client The client instance.
     * @param {*} from The class that instants this manager.
     */
    constructor(client: Client, from: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The class that instantiated this manager.
     * @type {*}
     */
    from: any;
    /**
     * The time to live for the cache in miliseconds.
     * @type {number}
     * @private
     */
    private _ttl;
    /**
     * Resets the cache based on the ttl.
     * @private
     */
    private _reset;
}
import Client = require("../client/Client");
