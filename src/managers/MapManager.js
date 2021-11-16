const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const TMMap = require('../structures/TMMap');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a map manager.
 */
class MapManager{
    /**
     * @param {Client} client The client
     */
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

        // Check if the map exists on tmx
        if (res.exchangeid !== 0) {
            const tmxurl = this.client.options.api.paths.tmx,
                tmxres = await this.client._apiReq(`${tmxurl.protocol}://${tmxurl.host}/${tmxurl.api}/${tmxurl.tabs.mapInfo}/${res.exchangeid}`);
            res['exchange'] = tmxres[0];
        }

        // Get map votes thanks to RoboTec's Voting API
        const mapVotes = this.client.options.api.paths.mapVoting.tabs.getVotes;
        const votes = await this.client._apiReq(`${new ReqUtil(this.client).votingAPIURL}/${mapVotes}?map=${mapUid}`);
        res['karma'] = votes;

        // Get map leaderboard
        const leaderboard = this.client.options.api.paths.tmio.tabs.leaderboard;
        const leaderboardRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${leaderboard}/${map}/${mapUid}`);
        res["leaderboard"] = leaderboardRes;

        const theMap = new TMMap(this.client, res);
        if (cache) {
            res._cachedTimestamp = Date.now();
            
            this._cache.set(res.mapUid, theMap);
        }
        return theMap;
    }
}

module.exports = MapManager;