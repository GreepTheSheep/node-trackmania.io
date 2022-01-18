const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const {MMTypes, MatchmakingGroup, MatchStatus} = require('../util/Constants'); // eslint-disable-line no-unused-vars
const Match = require('../structures/Match');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents the matches manager (3v3 or Royal matches).
 */
class MatchesManager{
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
        this._cache = new CacheManager(this.client, this, Match);
    }

    /**
     * Get a list of the matches
     * @param {MatchmakingGroup} [group='3v3'] The group to get the matches from
     * @param {number} [page=0] The page to get
     * @param {Boolean} [cache=this.client.options.cache.enabled] Whether to cache the matches or not
     * @returns {Promise<Array<MatchResult>>}
     */
    async list(group = 2, page = 0, cache = this.client.options.cache.enabled){
        if (typeof group == 'string') group = MMTypes[group];
        const matches = this.client.options.api.paths.tmio.tabs.matches;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${matches}/${group}/${page}`);
        const array = [];
        if (res.matches.length > 0) {
            for (let i = 0; i < res.matches.length; i++) {
                let match = new MatchResult(this.client, res.matches[i]);
                if (cache) {
                    res.matches[i]._cachedTimestamp = Date.now();
                    this._cache.set(res.id, match);
                }
                array.push(match);
            }
        }
        return array;
    }

    /**
     * Fetches a Trackmania Match and returns its data.
     * @param {string} liveID The live ID of the match (should start with 'LID-MTCH')
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the news from cache or not
     * @returns {Promise<Match>} The Match
     */
    async get(liveID, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(liveID)) {
            return this._cache.get(liveID);
        } else {
            return await this._fetch(liveID, cache);
        }
    }

    /**
     * Fetches a Match and returns its data
     * @param {string} liveID Thelive ID of the match (should start with 'LID-MTCH')
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the news or not
     * @returns {Promise<Match>} The splashscreen
     * @private
     */
    async _fetch(liveID, cache = this.client.options.cache.enabled){
        if (!liveID.startsWith("LID-MTCH")) throw "The live ID must start with 'LID-MTCH'";
        const match = this.client.options.api.paths.tmio.tabs.match;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${match}/${liveID}`);

        const theMatch = new Match(this.client, res);
        if (cache) {
            res._cachedTimestamp = Date.now();
            this._cache.set(res.lid, theMatch);
        }
        return theMatch;
    }
}

/**
 * The result of a Match from the list. It is completely different from the {@link Match} object.
 */
class MatchResult {
    constructor(client, data){
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The match ID
         * @type {number}
         */
        this.id = data.id;

        /**
         * The match Live ID
         * @type {string}
         */
        this.liveID = data.lid;

        /**
         * The match start date
         * @type {Date}
         */
        this.startDate = new Date(data.starttime);

        /**
         * The status of the match
         * @type {MatchStatus}
         */
        this.status = data.status;
    }

    /**
     * Get the match
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the match or not
     */
    async match(cache = this.client.options.cache.enabled){
        return this.client.matches.get(this.liveID, cache);
    }
}

module.exports = MatchesManager;