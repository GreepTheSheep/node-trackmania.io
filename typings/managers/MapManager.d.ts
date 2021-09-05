export = MapManager;
declare class MapManager {
    constructor(client: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The cache manager
     * @type {CacheManager}
     * @private
     */
    private _cache;
    /**
     * Fetches a Trackmania map and returns its data
     * @param {String} mapUid The map UID
     * @param {Boolean} cache Whether to get the map from cache or not
     * @returns {Promise<TMMap>} The map
     * @example
     * client.maps.get('z28QXoFnpODEGgg8MOederEVl3j').then(map => {
     *     console.log(map.name);
     * });
     */
    get(mapUid: string, cache?: boolean): Promise<TMMap>;
    /**
     * Fetches a map and returns its data
     * @param {String} mapUid The map UID
     * @param {Boolean} cache Whether to cache the map or not
     * @returns {TMMap} The map
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import TMMap = require("../structures/TMMap");
