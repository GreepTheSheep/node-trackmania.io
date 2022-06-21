const Player = require('../structures/Player');
const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const {PlayerGroup, MMTypes, MatchmakingGroup} = require('../util/Constants'); // eslint-disable-line no-unused-vars
const MatchmakingDivision = require('../structures/MatchmakingDivision');

/**
 * Represents a manager for players.
 */
class PlayerManager {
    constructor(client){
        /**
         * The client instance
         * @type {Client}
         * @readonly
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        this._cache = new CacheManager(this.client, this, Player);
    }

    /**
     * Returns the login of an account ID
     * @param {string} accountID The account ID
     * @returns {string}
     */
    toLogin(accountID){
        var chars = accountID.replace(/-/g, '');

        var bytes = '';
        for (var i = 0; i < chars.length; i += 2) {
            var hex = chars.substr(i, 2);
            var dec = parseInt(hex, 16);
            var byte = String.fromCharCode(dec);
            bytes += byte;
        }

        return btoa(bytes)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }

    /**
     * Returns the Account ID of a login
     * @param {string} login The login of the player
     * @returns {?string}
     */
    toAccountId(login){
        if (login.length != 22) return null;

        var bytes = atob(login
            .replace(/-/g, '+')
            .replace(/_/g, '/')
        );

        var ret = '';
        for (var i = 0; i < bytes.length; i++) {
            if (i == 4 || i == 6 || i == 8 || i == 10) {
                ret += '-';
            }
            ret += bytes.charCodeAt(i).toString(16);
        }
        return ret;
    }

    /**
     * Searches for a player by its name
     * @param {string} query The query to search for
     * @returns {Promise<Array<PlayerSearchResult>>} The results
     * @example
     * // Search for a player
     * client.players.search('greep').then(results => {
     *    client.players.get(results[0].id).then(player => {
     *       console.log('The tag of this player is', player.tag);
     *   });
     * });
     */
    async search(query){
        const players = this.client.options.api.paths.tmio.tabs.players,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${players}/find?search=${query}`);

        let results = [];
        for (var i = 0; i < res.length; i++) {
            results.push(new PlayerSearchResult(this.client, res[i].player));
        }
        return results;
    }

    /**
     * Get all players from a group
     * @param {PlayerGroup} groupName The group name
     * @returns {?Promise<Array<PlayerSearchResult>>} The results
     */
    async group(groupName){
        const players = this.client.options.api.paths.tmio.tabs.players,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${players}/group/${groupName}`);

        if (res.error) {
            throw res.error;
        }

        let results = [];
        for (var i = 0; i < res.length; i++) {
            results.push(new PlayerSearchResult(this.client, res[i].player));
        }
        return results;
    }

    /**
     * Get the trophy leaderboard
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<PlayerTopTrophy>>} The players' top trophies
     * @example
     * Client.players.topTrophies().then(top => {
     *    console.log("The number 1 player is " + top[0].player.name + " with " + top[0].score + " trophies");
     * });
     */
    async topTrophies(page = 0){
        const top = this.client.options.api.paths.tmio.tabs.topTrophies,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${top}/${page}`);

        if (res.error) throw res.error;

        const topsArray = res.ranks.map(playerTop=> new PlayerTopTrophy(this.client, playerTop));
        return topsArray;
    }

    /**
     * Gets the matchmaking leaderboard
     * @param {MatchmakingGroup} group The matchmaking group
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<PlayerTopMatchmaking>>} The players' top matchmaking
     */
    async topMatchmaking(group, page = 0){
        const top = this.client.options.api.paths.tmio.tabs.topMatchmaking,
            typeId = typeof group == "string" ? MMTypes[group] : group,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${top}/${typeId}/${page}`);

        if (res.error) throw res.error;

        const topsArray = res.ranks.map(playerTop=> new PlayerTopMatchmaking(this.client, typeId, playerTop));
        return topsArray;
    }

    /**
     * Fetches a player and returns its data
     * @param {string} accountId The account ID or its tm.io vanity name
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the player from cache or not
     * @returns {Promise<Player>} The player
     * @example
     * // Get a player
     * client.players.get('26d9a7de-4067-4926-9d93-2fe62cd869fc').then(player => {
     *     console.log(player.name);
     * });
     */
    async get(accountId, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(accountId)) {
            return this._cache.get(accountId);
        } else {
            return await this._fetch(accountId, cache);
        }
    }

    /**
     * Fetches a player and returns its data
     * @param {string} accountId The account ID or its tm.io vanity name
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the player or not
     * @returns {Player} The player
     * @private
     */
    async _fetch(accountId, cache = this.client.options.cache.enabled){
        const player = this.client.options.api.paths.tmio.tabs.player,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${accountId}`);

        const thePlayer = new Player(this.client, res);
        if (cache) {
            res._cachedTimestamp = Date.now();

            this._cache.set(res.accountid, thePlayer);

            // Adds also the player by its vanity name in the cache
            if (res.meta && (res.meta.vanity && res.meta.vanity != "")){
                this._cache.set(res.meta.vanity, thePlayer);
            }
        }
        return thePlayer;
    }
}

/**
 * Represents a player top trophy
 */
class PlayerTopTrophy {
    constructor(client, data){
        /**
         * The client instance
         * @type {Client}
         */
        this.client = client;

        /**
         * The player
         * @type {PlayerSearchResult}
         */
        this.player = new PlayerSearchResult(this.client, data.player);

        /**
         * The rank
         * @type {number}
         */
        this.rank = data.rank;

        /**
         * The score (number of trophies)
         * @type {number}
         */
        this.score = data.score;
    }
}

/**
 * The player top matchmaking
 */
class PlayerTopMatchmaking{
    constructor(client, typeId, data){
        /**
         * The client instance
         * @type {Client}
         */
        this.client = client;

        /**
         * The player
         * @type {PlayerSearchResult}
         */
        this.player = new PlayerSearchResult(this.client, data.player);

        /**
         * The rank
         * @type {number}
         */
        this.rank = data.rank;

        /**
         * The score
         * @type {number}
         */
        this.score = data.score;

        /**
         * The matchmaking division of the player
         * @type {MatchmakingDivision}
         */
        this.division = new MatchmakingDivision(client, typeId, data.division);
    }
}

/**
 * The result of a player search. It is completely different from the {@link Player} object.
 */
class PlayerSearchResult {
    constructor(client, data){
        /**
         * The client instance
         * @type {Client}
         */
        this.client = client;

        /**
         * The player's account ID
         * @type {string}
         */
        this.id = data.id;

        /**
         * The player's display name
         * @type {string}
         */
        this.name = data.name;

        /**
         * The player's club tag (if any)
         * @type {?string}
         */
        this.tag = data.tag ? data.tag : null;
    }

    /**
     * Return to the Player Object
     * @returns {Promise<Player>}
     */
    async player(){
        return await this.client.players.get(this.id);
    }
}

module.exports = PlayerManager;