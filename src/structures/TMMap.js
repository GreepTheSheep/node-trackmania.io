const ReqUtil = require('../util/ReqUtil');
const Player = require('./Player'); // eslint-disable-line no-unused-vars
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a map on Trackmania.
 */
class TMMap {
    constructor(client, data) {
    
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The map data.
         * @type {Object}
         * @private
         */
        this._data = data;

        /**
         * The map medal times.
         * @type {TMMapMedalTimes} 
         */
        this.medalTimes = new TMMapMedalTimes(this);

        
        // Check if the exchange data is already fetched
        if (!this._data.exchange){
            const tmxurl = this.client.options.api.paths.tmx;
            this.client._apiReq(`${tmxurl.protocol}://${tmxurl.host}/${tmxurl.api}/${tmxurl.tabs.mapInfo}/${this.exchangeId}`).then(data => {
                this._data.exchange = data[0];
            });
        }
    }

    /**
     * The map name.
     * @type {string}
     */
    get name() {
        return this._data.name;
    }

    /**
     * The map id.
     * @type {string}
     */
    get id() {
        return this._data.mapId;
    }

    /**
     * The map unique id.
     * @type {string}
     */
    get uid() {
        return this._data.mapUid;
    }

    /**
     * The map Storage Object ID.
     * @returns {string}
     */
    get storageId() {
        return this.thumbnail.replace(/^[a-z:/.]*([^]*)\.[a-z]*$/gi, '$1');
    }

    /**
     * The map author.
     * @returns {Promise<Player>}
     * @example
     * Client.maps.get('z28QXoFnpODEGgg8MOederEVl3j').then(async map => {
     *     const author = await map.author();
     *     console.log(`The map author is ${author.name}`);
     * });
     */
    async author() {
        return this.client.players.get(this._data.author);
    }

    /**
     * The map submitter.
     * @returns {Promise<Player>}
     */
    async submitter() {
        return this.client.players.get(this._data.submitter);
    }

    /**
     * The environment for this map.
     * @type {string}
     */
    get environment() {
        return this._data.environment;
    }

    /**
     * The map file name.
     * @type {string}
     */
    get fileName() {
        return this._data.filename;
    }

    /**
     * The map uploaded date.
     * @type {Date}
     */
    get uploaded() {
        return new Date(this._data.timestamp);
    }

    /**
     * The map URL.
     * @type {string}
     */
    get url() {
        return this._data.fileUrl;
    }

    /**
     * The map thumbnail (from Nadeo services, direct download).
     * @type {string}
     */
    get thumbnail() {
        return this._data.thumbnailUrl;
    }

    /**
     * The map thumbnail (cached from trackmania.io, can show).
     * @type {string}
     */
    get thumbnailCached() {
        return `${new ReqUtil(this.client).tmioAPIURL}/download/jpg/${this.storageId}`;
    }

    /**
     * The map exchange id, if the map is on trackmania.exchange, else null.
     * @type {?string}
     */
    get exchangeId() {
        if (this._data.exchangeId == 0) return null;
        else return this._data.exchangeid;
    }

    /**
     * The map informations on trackmania.exchange.
     * @type {?TMExchangeMap}
     */
    get exchange() { 
        if (this.exchangeId == null) return null;
        else {
            if (this._data.exchange) {
                if (!this._TMExchange || this._TMExchange.id !== this.exchangeId) {
                    /** 
                     * @type {TMExchangeMap}
                     * @private
                     * */
                    this._TMExchange = new TMExchangeMap(this, this._data.exchange);
                } 
                return this._TMExchange;
            } else throw "No exchange data found for this map";
        }
    }

    /**
     * The map karma.
     * @type {?TMMapKarma}
     */
    get karma() {
        if (this._data.karma) {
            if (!this._TMMapKarma || this._TMMapKarma.id !== this.id) {
                /**
                 * @type {TMMapKarma} 
                 * @private
                 */
                this._TMMapKarma = new TMMapKarma(this, this._data.karma);
            }
            return this._TMMapKarma;
        } else return null;
    }

    /**
     * The map leaderboard.
     * @type {?Array<TMMapLeaderboard>}
     */
    get leaderboard() {
        if (this._data.leaderboard && this._data.leaderboard.tops.length >= 1) {
            const arr = [];
            for (let i = 0; i < this._data.leaderboard.tops.length; i++) {
                arr.push(new TMMapLeaderboard(this, this._data.leaderboard.tops[i]));
            }
            return arr;
        } else return null;
    }

    /**
     * Load 100 more results in the leaderboard.
     * @returns {Promise<?Array<TMMapLeaderboard>>}
     */
    async leaderboardLoadMore(){
        if (this._data.leaderboard && this._data.leaderboard.tops.length >= 1) {

            const leaderboard = this.client.options.api.paths.tmio.tabs.leaderboard,
                map = this.client.options.api.paths.tmio.tabs.map;
            const leaderboardRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${leaderboard}/${map}/${this.uid}?offset=${this._data.leaderboard.tops.length}&length=100`);
            if (leaderboardRes.tops != null){
                for (let i = 0; i < leaderboardRes.tops.length; i++){
                    this._data.leaderboard.tops.push(leaderboardRes.tops[i]);
                }
            }
            const arr = [];
            for (let i = 0; i < this._data.leaderboard.tops.length; i++) {
                arr.push(new TMMapLeaderboard(this, this._data.leaderboard.tops[i]));
            }
            return arr;
        } else return null;
    }

    /**
     * Get a leaderboard in a specific position. Must be between 1 and 10000.
     * @param {number} position The position of the leaderboard.
     * @returns {Promise<?TMMapLeaderboard>}
     */
    async leaderboardGet(position){
        if (position < 1 || position > 10000) throw "Position must be between 1 and 10000";
        position--;
        const leaderboard = this.client.options.api.paths.tmio.tabs.leaderboard,
            map = this.client.options.api.paths.tmio.tabs.map,
            leaderboardRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${leaderboard}/${map}/${this.uid}?offset=${position}&length=1}`);
        if (!leaderboardRes.tops) return null;
        return new TMMapLeaderboard(this, leaderboardRes.tops[0]);
    }
}

/**
 * Represents the medals times on a map.
 */
class TMMapMedalTimes {
    constructor(map) {
        /**
         * The map object.
         * @type {TMMap}
         */
        this.map = map;

        /**
         * The map author time.
         * @type {number}
         */
        this.author = map._data.authorScore;

        /**
         * The map gold time.
         * @type {number}
         */
        this.gold = map._data.goldScore;

        /**
         * The map silver time.
         * @type {number}
         */
        this.silver = map._data.silverScore;

        /**
         * The map bronze time.
         * @type {number}
         */
        this.bronze = map._data.bronzeScore;
    }
}

/**
 * Represents the map details from Trackmania.exchange.
 */
class TMExchangeMap {
    constructor(map, data) {
        /**
         * The map instance.
         * @type {TMMap}
         */
        this.map = map;

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = map.client;

        /**
         * The map data.
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The map exchange id.
     * @type {number}
     */
    get id() {
        return this._data.TrackID;
    }

    /**
     * The map name.
     * @type {string}
     */
    get name() {
        return this._data.Name;
    }

    /**
     * The map author.
     * @type {string}
     */
    get author() {
        return this._data.Username;
    }

    /**
     * The map description.
     * @type {string}
     */
    get description() {
        return this._data.Comments;
    }

    /**
     * The map length.
     * @type {string}
     */
    get length() {
        return this._data.LengthName;
    }

    /**
     * The map difficulty.
     * @type {string}
     */
    get difficulty() {
        return this._data.DifficultyName;
    }

    /**
     * The map upload date.
     * @type {Date}
     */
    get uploaded() {
        return new Date(this._data.UploadedAt);
    }

    /**
     * The map last update date.
     * @type {Date}
     */
    get updated() {
        return new Date(this._data.UpdatedAt);
    }

    /**
     * The map award count.
     * @type {number}
     */
    get awards() {
        return this._data.AwardCount;
    }

    /**
     * The map download link.
     * @type {string}
     */
    get download() {
        const tmx = this.map.client.options.api.paths.tmx;
        return `${tmx.protocol}://${tmx.host}/${tmx.tabs.mapsDownload}/${this.id}`;
    }
}

/**
 * Represents the Map Voting stats.
 */
class TMMapKarma {
    constructor(map, data) {
        /**
         * The map instance.
         * @type {TMMap}
         */
        this.map = map;

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = map.client;

        /**
         * The map data.
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The map Uid.
     * @type {string}
     */
    get uid() {
        return this._data.mapUid;
    }

    /**
     * The number of votes.
     * @type {number}
     */
    get votes() {
        return this._data.votes;
    }

    /**
     * The average vote (between 0 and 100).
     * @type {number}
     */
    get average() {
        return this._data.average;
    }

    /**
     * The last vote date.
     * @type {Date}
     */
    get lastVoteDate() {
        return new Date(this._data.lastVoteDate);
    }
}

/**
 * Represents the map leaderboard.
 */
class TMMapLeaderboard {
    constructor(map, data) {
        /**
         * The map Instance
         * @type {TMMap}
         */
        this.map = map;

        /**
         * The Client instance
         * @type {Client}
         */
        this.client = map.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The player that got this leaderboard
     * @returns {Promise<Player>}
     */
    async player(){
        return this.client.players.get(this._data.player.id);
    }

    /**
     * The position of the player on this leaderboard
     * @type {number}
     */
    get position(){
        return this._data.position;
    }

    /**
     * The time in milliseconds of the player
     * @type {number}
     */
    get time(){
        return this._data.time;
    }

    /**
     * The date when the player get this leaderboard
     * @type {Date}
     */
    get date() {
        return new Date(this._data.timestamp);
    }

    /**
     * The ghost URL
     * @type {string}
     */
    get ghost(){
        return `${new ReqUtil(this.client).tmioURL}${this._data.url}`;
    }
}

module.exports = TMMap;