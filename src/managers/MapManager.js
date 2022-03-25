const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const TMMap = require('../structures/TMMap');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a map manager.
 */
class MapManager{
    constructor(client){
        /**
         * The client instance.
         * @type {Client}
         * @readonly
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        this._cache = new CacheManager(this.client, this, TMMap);
    }

    /**
     * Fetches a Trackmania map and returns its data
     * @param {string} mapUid The map UID
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the map from cache or not
     * @returns {Promise<TMMap>} The map
     * @example
     * client.maps.get('z28QXoFnpODEGgg8MOederEVl3j').then(map => {
     *     console.log(map.name);
     * });
     */
    async get(mapUid, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(mapUid)) {
            return this._cache.get(mapUid);
        } else {
            return await this._fetch(mapUid, cache);
        }
    }

    /**
     * Fetches a map and returns its data
     * @param {string} mapUid The map UID
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the map or not
     * @returns {TMMap} The map
     * @private
     */
    async _fetch(mapUid, cache = this.client.options.cache.enabled){
        const map = this.client.options.api.paths.tmio.tabs.map;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${map}/${mapUid}`);

        // Get map leaderboard
        try {
            const leaderboard = this.client.options.api.paths.tmio.tabs.leaderboard,
                leaderboardRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${leaderboard}/${map}/${mapUid}?offset=0&length=100`);
            res["leaderboard"] = leaderboardRes;
        } catch (e) {
            this.client.emit('error', e);
        }

        const theMap = new TMMap(this.client, res);
        if (cache) {
            res._cachedTimestamp = Date.now();

            this._cache.set(res.mapUid, theMap);
        }
        return theMap;
    }
}

module.exports = MapManager;