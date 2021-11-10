export = MapManager;
/**
 * Represents a map manager.
 */
declare class MapManager {
    /**
     * @param {Client} client The client
     */
    constructor(client: Client);
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
import TMMap = require("../structures/TMMap");
import Client = require("../client/Client");
