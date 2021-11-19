export = CacheManager;
/**
 * The Cache Manager is responsible for managing the cache.
 * @extends {Map}
 * @private
 */
declare class CacheManager {
    constructor(client: any, from: any, to: any);
    /**
     * The class that instantiated this manager.
     * @type {*}
     * @readonly
     */
    readonly from: any;
    /**
     * The class this manager will operate on.
     * @type {*}
     * @readonly
     */
    readonly to: any;
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The time to live for the cache in miliseconds.
     * @type {number}
     * @private
     */
    private _ttl;
    /**
     * Resets the cache based on the ttl.
     * @private
     * @type {void}
     */
    private _reset;
}
import Client = require("../client/Client");
