const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const COTD = require('../structures/COTD');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const Player = require('../structures/Player'); // eslint-disable-line no-unused-vars
const { COTDLeaderboardSortGroup } = require('../util/Constants'); // eslint-disable-line no-unused-vars

/**
 * Represents a COTD Manager.
 */
class COTDManager{
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
        this._cache = new CacheManager(this.client, this, COTD);
    }

    /**
     * Get the COTD leaderboard by category
     * @param {COTDLeaderboardSortGroup} [sort="wins"] The leaderboard sorting
     * @param {boolean} [includeReruns=false] Whether to include reruns when sorting or not
     * @param {number} [page=0] The page number
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the list from cache or not
     * @returns {Promise<Array<COTDLeaderboard>>}
     */
    async leaderboard(sort = "wins", includeReruns = false, page = 0, cache = this.client.options.cache.enabled) {
        const cacheKey = `leaderboard_${sort}${includeReruns ? 'reruns' : ''}_${page}`;
        if (cache && this._cache.has(cacheKey)) {
            return this._cache.get(cacheKey);
        } else {
            const cotd = this.client.options.api.paths.tmio.tabs.cotd,
                players = this.client.options.api.paths.tmio.tabs.players,
                res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${cotd}/${players}/${page}/${sort}${includeReruns ? 'reruns' : ''}`);

            let results = [];
            for (var i = 0; i < res.players.length; i++) {
                results.push(new COTDLeaderboard(this.client, res.players[i]));
            }
            if (cache) this._cache.set(cacheKey, results);
            return results;
        }
    }

    /**
     * Fetches the latest COTDs and returns its data
     * @param {number} [page=0] The page, each page contains 12 items
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the list from cache or not
     * @returns {Promise<Array<COTD>>} The COTD list
     * @example
     * client.cotd.get().then(event => {
     *     console.log(event.name);
     * });
     */
    async get(page = 0, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(page)) {
            return this._cache.get(page);
        } else {
            return await this._fetch(page, cache);
        }
    }

    /**
     * Fetches a COTD and returns its data
     * @param {number} [page=0] The page
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the list or not
     * @returns {Promise<Array<COTD>>} The COTD list
     * @private
     */
    async _fetch(page = 0, cache = this.client.options.cache.enabled){
        const cotd = this.client.options.api.paths.tmio.tabs.cotd;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${cotd}/${page}`);

        let arr = [];
        res["competitions"].forEach(cotd => {
            if (cache) cotd._cachedTimestamp = Date.now();
            arr.push(new COTD(this.client, cotd));
        });
        if (cache) this._cache.set(page, arr);
        return arr;
    }
}

/**
 * Represents a position in the COTD Leaderboard
 */
class COTDLeaderboard {
    constructor(client, data) {
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The data of the COTD leaderboard.
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The player's name
     * @type {string}
     */
    get playerName() {
        return this._data.player.name;
    }

    /**
     * The player's club tag
     * @type {string}
     */
    get playerTag() {
        return this._data.player.tag;
    }

    /**
     * The player's account ID
     * @type {string}
     */
    get playerId() {
        return this._data.player.id;
    }

    /**
     * The player
     * @returns {Promise<Player>}
     */
    async player() {
        return await this.client.players.get(this.playerId);
    }

    /**
     * The position of the player in the selected category
     * @type {number}
     */
    get position() {
        return this._data.position;
    }

    /**
     * The amount of COTD the player has played
     * @type {number}
     */
    get played() {
        return this._data.totalplayed;
    }

    /**
     * The amount of COTD reruns the player has played
     * @type {number}
     */
    get rerunsPlayed() {
        return this._data.totalplayedreruns;
    }

    /**
     * The amount of COTD the player has won
     * @type {number}
     */
    get wins() {
        return this._data.wins;
    }

    /**
     * The amount of COTD reruns the player has won
     * @type {number}
     */
    get rerunsWins() {
        return this._data.winsreruns;
    }

    /**
     * The amount of win streak the player has
     * @type {number}
     */
    get winStreak() {
        return this._data.winstreak;
    }

    /**
     * The amount of win streak the player has (reruns included)
     * @type {number}
     */
    get winStreakWithReruns() {
        return this._data.winstreakreruns;
    }
}

module.exports = COTDManager;