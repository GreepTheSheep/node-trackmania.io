const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Club = require('../structures/Club');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

class ClubManager{
    constructor(client){
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager} 
         * @private
         */
        this._cache = new CacheManager(client, Club);
    }

    /**
     * Fetches a Trackmania Club and returns its data
     * @param {Number} id The Club Id
     * @param {Boolean} cache Whether to get the club from cache or not
     * @returns {Promise<Club>} The Club
     * @example 
     * client.clubs.get(54).then(club => {
     *     console.log(club.name);
     * });
     */
    async get(id, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(id)) {
            return this._cache.get(id);
        } else {
            return await this._fetch(id, cache);
        }
    }
        
    /**
     * Fetches a map and returns its data
     * @param {String} id The Club Id
     * @param {Boolean} cache Whether to cache the club or not
     * @returns {Club} The club
     * @private
     */
    async _fetch(id, cache = this.client.options.cache.enabled){
        const club = this.client.options.api.paths.tmio.tabs.club;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${club}/${id}`);

        const theClub = new Club(this.client, res);
        if (cache) {
            res._cachedTimestamp = Date.now();
            
            this._cache.set(res.id, theClub);
        }
        return theClub;
    }
}

module.exports = ClubManager;