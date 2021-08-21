const Player = require('./Player'); // eslint-disable-line no-unused-vars
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMmap = require('./TMmap'); // eslint-disable-line no-unused-vars
const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('../managers/CacheManager');

class TMEvent {
    constructor(client, data) {
        /** The client instance
         * @type {Client}
         */
        this.client = client;

        /** @private */
        this._data = data;
    }

    /**
     * The event's ID.
     * @type {Number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The number of players in the event.
     * @type {Number}
     */
    get size() {
        return this._data.numplayers;
    }

    /**
     * The event's Live ID.
     * @type {String}
     */
    get liveId() {
        return this._data.liveid;
    }

    /**
     * The creator of the event.
     * @returns {Promise<Player>}
     */
    async creator() {
        return this.client.players.get(this._data.creatorplayer.id);
    }

    /**
     * The event's name.
     * @type {String}
     */
    get name() {
        return this._data.name;
    }

    /**
     * The event's description.
     * @type {String}
     */
    get description() {
        return this._data.description;
    }

    /**
     * The event's registration start date.
     * @type {Date}
     */
    get registrationStart() {
        return new Date(this._data.registrationstart * 1000);
    }

    /**
     * The event's registration end date.
     * @type {Date}
     */
    get registrationEnd() {
        return new Date(this._data.registrationend * 1000);
    }

    /**
     * The event's start date.
     * @type {Date}
     */
    get start() {
        return new Date(this._data.startdate * 1000);
    }

    /**
     * The event's end date.
     * @type {Date}
     */
    get end() {
        return new Date(this._data.enddate * 1000);
    }

    /**
     * The event's leaderboard id.
     * @type {Number}
     */
    get leaderboardId() {
        return this._data.leaderboardid;
    }

    /**
     * The event's manialink (if any).
     * @type {?String}
     */
    get manialink() {
        if (this._data.manialink == "") return null;
        return this._data.manialink;
    }

    /**
     * The event's rules URL (if any).
     * @type {?String}
     */
    get rulesUrl() {
        if (this._data.rulesurl == "") return null;
        return this._data.rulesurl;
    }

    /**
     * The event's stream URL (if any).
     * @type {?String}
     */
    get stream() {
        if (this._data.streamurl == "") return null;
        return this._data.streamurl;
    }

    /**
     * The event's website (if any).
     * @type {?String}
     */
    get website() {
        if (this._data.websiteurl == "") return null;
        return this._data.websiteurl;
    }

    /**
     * The event's logo URL.
     * @type {String}
     */
    get logo() {
        return new ReqUtil(this.client).tmioURL + this._data.logourl;
    }

    /**
     * The event's vertical banner URL.
     * @type {String}
     */
    get vertical() {
        return new ReqUtil(this.client).tmioURL + this._data.verticalurl;
    }

    /**
     * The event's rounds.
     * @type {Array<TMEventRound>}
     */
    get rounds() {
        const arr = [];
        for (let i = 0; i < this._data.rounds.length; i++) {
            arr.push(new TMEventRound(this, this._data.rounds[i]));
        }
        return arr;
    }
}

class TMEventRound {
    constructor(event, data) {
        /**
         * The event instance
         * @type {TMEvent}
         */
        this.event = event;

        /**
         * The client instance
         * @type {Client}
         */
        this.client = event.client;

        /** @private */
        this._data = data;

        /** @private */
        this._challengesCache = new CacheManager(this.client, TMEventChallenge);
    }

    /**
     * The round's ID.
     * @type {Number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The round's name.
     * @type {String}
     */
    get name() {
        return this._data.name;
    }

    /**
     * The round's status.
     * @type {String}
     */
    get status() {
        return this._data.status;
    }

    /**
     * The round's matches.
     * @type {Array<TMEventRoundMatch>}
     */
    get matches() {
        const arr = [];
        for (let i = 0; i < this._data.matches.length; i++) {
            arr.push(new TMEventRoundMatch(this, this._data.matches[i]));
        }
        return arr;
    }

    /**
     * The round's challenges.
     * @param {Boolean} cache Wether to get the challenges from the cache or not.
     * @returns {Promise<Array<TMEventChallenge>>}
     */
    async challenges(cache = this.client.options.cache.enabled) {
        const arr = [];
        for (let i = 0; i < this._data.challenges.length; i++) {
            if (cache && this._challengesCache.has(this._data.challenges[i].id)) {
                arr.push(this._challengesCache.get(this._data.challenges[i].id));
            } else {
                arr.push(await this._fetchChallenge(i, cache));
            }
        }
        return arr;
    }

    /**
     * Fetches the round's challenges.
     * @param {Number} index The index of the challenge to fetch.
     * @param {Boolean} cache Wether to cache the challenges or not.
     * @returns {Promise<Array<TMEventChallenge>>}
     * @private
    */
    async _fetchChallenge(index, cache = this.client.options.cache.enabled) {
        const comp = this.client.options.api.paths.tmio.tabs.comp,
            challenge = this.client.options.api.paths.tmio.tabs.challenge;

        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${comp}/${this.event.id}/${challenge}/${this._data.challenges[index].id}`);
        const theChallenge = new TMEventChallenge(this, res);
        
        if (cache) {
            res._cachedTimestamp = Date.now();
            
            this._challengesCache.set(this._data.challenges[index].id, theChallenge);
        }
        return theChallenge;
    }
}

class TMEventRoundMatch {
    constructor(round, data) {
        /**
         * The round instance
         * @type {TMEventRound}
         */
        this.round = round;

        /**
         * The event instance
         * @type {TMEvent}
         */
        this.event = round.event;

        /**
         * The client instance
         * @type {Client}
         */
        this.client = round.client;

        /** @private */
        this._data = data;

        /** @private */
        this._resultsCache = new CacheManager(this.client, TMEventRoundMatchResult);
    }

    /**
     * The match's ID.
     * @type {Number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The match's name.
     * @type {String}
     */
    get name() {
        return this._data.name;
    }

    /**
     * Whether the match is completed.
     * @type {Boolean}
     */
    get isCompleted() {
        return this._data.completed;
    }

    /**
     * The match's results.
     * @param {Number} page The page number.
     * @param {Boolean} cache Whether to cache the results.
     * @returns {Promise<Array<TMEventRoundMatchResult>>}
     */
    async getResults(page = 0, cache = this.client.options.cache.enabled) {
        if (cache && this._resultsCache.has(this.id+"_"+page)) {
            return this._resultsCache.get(this.id+"_"+page);
        } else {
            return await this._fetchResults(page, cache);
        }
    }

    /**
     * Fetches the match's results.
     * @param {Number} page The page number.
     * @param {Boolean} cache Whether to cache the results.
     * @returns {Promise<Array<TMEventRoundMatchResult>>}
     * @private
     */
    async _fetchResults(page = 0, cache = this.client.options.cache.enabled) {
        const comp = this.client.options.api.paths.tmio.tabs.comp,
            match = this.client.options.api.paths.tmio.tabs.match;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${comp}/${this.event.id}/${match}/${this.id}/${page}`);

        const arr = [];
        for (let i = 0; i < res.results.length; i++) {
            const results = new TMEventRoundMatchResult(this, res.results[i]);
            arr.push(results);
        }
        if (cache) {
            res._cachedTimestamp = Date.now();
            
            this._resultsCache.set(this.id+"_"+page, arr);
        }
        return arr;
    }
}

class TMEventRoundMatchResult {
    constructor(match, data) {
        /**
         * The match instance
         * @type {TMEventRoundMatch}
         */
        this.match = match;

        /**
         * The event instance
         * @type {TMEvent}
         */
        this.event = match.event;

        /**
         * The client instance
         * @type {Client}
         */
        this.client = match.client;

        /** @private */
        this._data = data;
    }

    /**
     * The player that got the result.
     * @returns {Promise<Player>}
     */
    async player() {
        return this.client.players.get(this._data.player.id);
    }

    /**
     * The position of the player.
     * @returns {Number}
     */
    get position() {
        return this._data.position;
    }

    /**
     * The score of the player.
     * @returns {Number}
     */
    get score() {
        return this._data.score;
    }
}

class TMEventChallenge {
    constructor(round, data) {
        /**
         * The round instance
         * @type {TMEventRound}
         */
        this.round = round;

        /**
         * The event instance
         * @type {TMEvent}
         */
        this.event = round.event;

        /**
         * The client instance
         * @type {Client}
         */
        this.client = round.client;

        /** @private */
        this._data = data;

        /** @private */
        this._resultsCache = new CacheManager(this.client, TMEventChallengeResult);
    }

    /**
     * The challenge's ID.
     * @type {Number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The challenge's name.
     * @type {String}
     */
    get name() {
        return this._data.name;
    }

    /**
     * The challenge's status.
     * @type {String}
     */
    get status() {
        return this._data.status;
    }

    /**
     * The challenge's rooms number.
     * @type {Number}
     */
    get rooms() {
        return this._data.servers;
    }

    /**
     * The challenge's maps.
     * @returns {Promise<Array<TMmap>>}
     */
    async getMaps() {
        const maps = [];
        for (let i = 0; i < this._data.maps.length; i++) {
            const map = await this.client.maps.get(this._data.maps[i].mapUid);
            maps.push(map);
        }
        return maps;
    }

    /**
     * The challenge's admins.
     * @returns {Promise<Array<Player>>}
     */
    async getAdmins() {
        const admins = [];
        for (let i = 0; i < this._data.admins.length; i++) {
            const admin = await this.client.players.get(this._data.admins[i].accountid);
            admins.push(admin);
        }
        return admins;
    }

    /**
     * The challenge's results.
     * @param {Number} page The page number.
     * @param {Boolean} cache Whether to get the results from cache.
     * @returns {Promise<Array<TMEventChallengeResult>>}
    */
    async getResults(page = 0 , cache = this.client.options.cache.enabled) {
        if (cache && this._resultsCache.has(this.id+"_"+page)) {
            return this._resultsCache.get(this.id+"_"+page);
        } else {
            return await this._fetchResults(page, cache);
        }
    }

    /**
     * Fetches the match's results.
     * @param {Number} page The page number.
     * @param {Boolean} cache Whether to cache the results.
     * @returns {Promise<Array<TMEventChallengeResult>>}
     * @private
     */
    async _fetchResults(page = 0, cache = this.client.options.cache.enabled) {
        const comp = this.client.options.api.paths.tmio.tabs.comp,
            challenge = this.client.options.api.paths.tmio.tabs.challenge;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${comp}/${this.event.id}/${challenge}/${this.id}/${page}`);

        const arr = [];
        for (let i = 0; i < res.results.length; i++) {
            const results = new TMEventChallengeResult(this, res.results[i]);
            arr.push(results);
        }
        if (cache) {
            res._cachedTimestamp = Date.now();
            
            this._resultsCache.set(this.id+"_"+page, arr);
        }
        return arr;
    }
}

class TMEventChallengeResult {
    constructor(challenge, data) {
        /**
         * The challenge instance
         * @type {TMEventChallenge}
         */
        this.challenge = challenge;
        
        /**
         * The event instance
         * @type {TMEvent}
         */
        this.event = challenge.event;

        /**
         * The client instance
         * @type {Client}
         */
        this.client = challenge.client;

        /** @private */
        this._data = data;
    }

    /**
     * The player.
     * @returns {Promise<Player>}
     */
    async player() {
        return this.client.players.get(this._data.player.id);
    }

    /**
     * The position of the player.
     * @returns {Number}
     */
    get position() {
        return this._data.position;
    }

    /**
     * The score of the player.
     * @returns {Number}
     */
    get score() {
        return this._data.score;
    }
}

module.exports = TMEvent;