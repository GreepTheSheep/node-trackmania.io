const ReqUtil = require('../util/ReqUtil');
const Player = require('./Player'); // eslint-disable-line no-unused-vars
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const EventEmitter = require('events');

/**
 * Represents a map on Trackmania.
 */
class TMMap extends EventEmitter {
    constructor(client, data) {
        super();
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

        /**
         * The map cached leaderboard data. You should use the leaderboardLoadMore() the first time to load the leaderboard.
         * @type {Array<TMMapLeaderboard>}
         */
        this.leaderboard = [];

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
     * @type {string}
     */
    get storageId() {
        return this.thumbnail.replace(/^[a-z:/.]*\/([^]*)\.[a-z]*$$/gi, '$1');
    }

    /**
     * The map author's name.
     * @type {string}
     */
    get authorName() {
        return this._data.authorplayer.name;
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
     * The map submitter's name.
     * @type {string}
     */
    get submitterName() {
        return this._data.submitterplayer.name;
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
     * @returns {Promise<?TMExchangeMap>}
     */
    async exchange() {
        return new Promise((resolve, reject) => {
            if (!this.exchangeId) return resolve(null);
            const tmxurl = this.client.options.api.paths.tmx;
            if (!this._data.exchange) {
                this.client._apiReq(`${tmxurl.protocol}://${tmxurl.host}/${tmxurl.api}/${tmxurl.tabs.mapInfo}/${this.exchangeId}`).then(data => {
                    this._data.exchange = data[0];
                    return resolve(new TMExchangeMap(this.client, data[0]));
                }).catch(err => {
                    return reject(err);
                });
            } else {
                return resolve(new TMExchangeMap(this.client, this._data.exchange));
            }
        });
    }

    /**
     * Load more results in the leaderboard.
     * @param {number} [nbOfResults=100] The number of results to load. (max 100)
     * @returns {Promise<?Array<TMMapLeaderboard>>}
     */
    async leaderboardLoadMore(nbOfResults = 100) {
        if (nbOfResults > 100) nbOfResults = 100;
        if (nbOfResults < 1) nbOfResults = 1;
        const leaderboard = this.client.options.api.paths.tmio.tabs.leaderboard,
            map = this.client.options.api.paths.tmio.tabs.map,
            params = new URLSearchParams();
        params.append('offset', this.leaderboard.length);
        params.append('length', nbOfResults);
        const leaderboardRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${leaderboard}/${map}/${this.uid}?${params.toString()}`);
        if (leaderboardRes.tops != null){
            for (let i = 0; i < leaderboardRes.tops.length; i++) {
                this.leaderboard.push(new TMMapLeaderboard(this, leaderboardRes.tops[i]));
            }
        }
        return this.leaderboard;
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
            leaderboardRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${leaderboard}/${map}/${this.uid}?offset=${position}&length=1`);
        if (!leaderboardRes.tops) return null;
        return new TMMapLeaderboard(this, leaderboardRes.tops[0]);
    }

    /**
     * Subscribe to the map WR updates.
     * <info>When a new WR is set, the event {@link TMMap#e-wr} will be fired</info>
     * @returns {Promise<void>}
     * @example
     * Client.maps.get('z28QXoFnpODEGgg8MOederEVl3j').then(map => {
     *    map.subWR();
     *    map.on('wr', (old, new) => {
     *      console.log(`New WR for ${map.name} is ${new.playerName} (${new.time})`);
     *   });
     * });
     */
    async subWR() {
        let actualWR = await this.leaderboardGet(1);
        setInterval(async ()=>{
            let newWR = await this.leaderboardGet(1);
            if (actualWR.time != newWR.time) {
                /**
                 * Emitted when a new WR is set.
                 * <info>This event is emitted only if the method {@link TMMap#subWR} is called</info>
                 * @event TMMap#wr
                 * @param {TMMapLeaderboard} oldWR The old WR.
                 * @param {TMMapLeaderboard} newWR The new WR.
                 */
                this.emit('wr', actualWR, newWR);
                actualWR = newWR;
            }
        }, this.client.options.cache.ttl * 60 * 1000);
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
     * The player name on this leaderboard
     * @type {string}
     */
    get playerName(){
        return this._data.player.name;
    }

    /**
     * The player club tag on this leaderboard
     * @type {string}
     */
    get playerClubTag(){
        return this._data.player.tag;
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