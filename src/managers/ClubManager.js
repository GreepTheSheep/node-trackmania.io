const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Club = require('../structures/Club');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a manager for clubs.
 */
class ClubManager{
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
        this._cache = new CacheManager(this.client, this, Club);
    }

    /**
     * Gets all the popular clubs
     * @param {number} [page=0] The page number
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the clubs or not
     * @returns {Promise<Array<Club>>} The clubs
     */
    async popularClubs(page = 0, cache = this.client.options.cache.enabled){
        const clubs = this.client.options.api.paths.tmio.tabs.clubs,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${clubs}/${page}?sort=popularity`),
            clubsList = res.clubs.map(club => new Club(this.client, club));
        if (cache) {
            for (const club of clubsList) {
                club._cachedTimestamp = Date.now();
                this._cache.set(club.id, club);
            }
        }
        return clubsList;
    }

    /**
     * Searches for a club
     * @param {string} query Search query
     * @param {number} [page=0] The page number 
     * @returns {Promise<Array<Club>>}
     */
    async search(query, page = 0){
        const clubs = this.client.options.api.paths.tmio.tabs.clubs,
            searchRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${clubs}/${page}?search=${query}`);

        let arr = [];
        for (const club of searchRes.clubs) {
            arr.push(new Club(this.client, club));
        }
        return arr;
    }

    /**
     * Fetches a Trackmania Club and returns its data
     * @param {number} id The Club Id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the club from cache or not
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
     * @param {string} id The Club Id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the club or not
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