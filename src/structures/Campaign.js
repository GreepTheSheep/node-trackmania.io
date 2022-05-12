const Player = require('./Player'); // eslint-disable-line no-unused-vars
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('./TMMap'); // eslint-disable-line no-unused-vars
const Club = require('./Club'); // eslint-disable-line no-unused-vars
const ReqUtil = require('../util/ReqUtil');
const EventEmitter = require('events');

/**
 * The Campaign class represents a campaign.
 */
class Campaign extends EventEmitter {
    constructor(client, data) {
        super();
        /**
         * The client object of the campaign.
         * @type {Client}
         */
        this.client = client;

        /**
         * The data object
         * @type {Object}
         * @private
         */
        this._data = data;

        /**
         * The leaderboard of the campaign
         * @type {Array<CampaignLeaderboard>}
         */
        this.leaderboard = [];
    }

    /**
     * The id of the campaign.
     * @type {number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The name of the campaign.
     * @type {string}
     */
    get name() {
        return this._data.name;
    }

    /**
     * Whether the campaign is official.
     * @type {boolean}
     */
    get isOfficial() {
        return this._data.clubid === 0;
    }

    /**
     * The image URL of the campaign. If this is an official campaign, the decal image URL is returned.
     * @type {string}
     */
    get image() {
        if (this.isOfficial) {
            const ReqUtil = require('../util/ReqUtil');
            return new ReqUtil(this.client).tmioURL + this._data.mediae.decal;
        } else return this._data.media;
    }

    /**
     * The creation date of the campaign.
     * @type {Date}
     */
    get createdAt() {
        return new Date(this._data.creationtime*1000);
    }

    /**
     * The last update date of the campaign.
     * @type {Date}
     */
    get updatedAt() {
        return new Date(this._data.lastupdatetime*1000);
    }

    /**
     * The club that owns the campaign. (if it's not an official campaign)
     * @returns {?Promise<Club>}
     */
    async club() {
        if (this.isOfficial) return null;
        else return this.client.clubs.get(this._data.clubid);
    }

    /**
     * The leaderboard id of the campaign.
     * @type {string}
     */
    get leaderboardId() {
        return this._data.leaderboarduid;
    }

    /**
     * Get the number of maps in the campaign.
     * @type {number}
     */
    get mapCount() {
        return this._data.playlist.length;
    }

    /**
     * Get a specific map of the campaign.
     * @param {number} index The index of the map.
     * @returns {Promise<TMMap>}
     */
    async map(index) {
        return await this.client.maps.get(this._data.playlist[index].mapUid);
    }

    /**
     * The list of maps in the campaign.
     * @returns {Promise<Array<TMMap>>}
     * @example
     * Client.campaigns.get(0, 11612).then(async campaign => {
     *   const maps = await campaign.maps();
     *   maps.forEach(map => console.log(map.name));
     * });
     */
    async maps() {
        const array = [];
        for (let i = 0; i < this._data.playlist.length; i++) {
            let map = await this.client.maps.get(this._data.playlist[i].mapUid);
            array.push(map);
        }
        return array;
    }

    /**
     * Load more results in the leaderboard.
     * @param {number} [nbOfResults=100] The number of results to load. (max 100)
     * @returns {Promise<?Array<CampaignLeaderboard>>}
     */
    async leaderboardLoadMore(nbOfResults = 100) {
        if (nbOfResults > 100) nbOfResults = 100;
        if (nbOfResults < 1) nbOfResults = 1;
        const leaderboard = this.client.options.api.paths.tmio.tabs.leaderboard,
            params = new URLSearchParams();
        params.append('offset', this.leaderboard.length);
        params.append('length', nbOfResults);
        const leaderboardRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${leaderboard}/${this.leaderboardId}?${params.toString()}`);
        if (leaderboardRes.tops != null){
            for (let i = 0; i < leaderboardRes.tops.length; i++) {
                this.leaderboard.push(new CampaignLeaderboard(this, leaderboardRes.tops[i]));
            }
        }
        return this.leaderboard;
    }

    /**
     * The media images of the campaign, if this is an official campaign.
     * @type {?CampaignMedia}
     */
    get media() {
        if (this.isOfficial) {
            return new CampaignMedia(this.client, this._data.mediae);
        } else return null;
    }

    /**
     * Whether the campaign is tracked.
     * @type {boolean}
     */
    get isTracked() {
        return this._data.tracked;
    }

    /**
     * Gets the campaign activity.
     * <info>{@link Campaign#isTracked} must be true.</info>
     * @returns {Promise<Array<CampaignRecordActivity>>}
     */
    async activity(page = 0) {
        if (!this.isTracked) throw 'Campaign is not tracked.';
        const activity = this.client.options.api.paths.tmio.tabs.activity,
            leaderboard = this.client.options.api.paths.tmio.tabs.leaderboard,
            activityRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${leaderboard}/${activity}/${this.leaderboardId}/${page}`);

        return activityRes.map(activity => new CampaignRecordActivity(this, activity));
    }

    /**
     * Subscribe to the campaign WR updates.
     * <info>{@link Campaign#isTracked} must be true.</info>
     * <info>When a new WR is set, the event {@link Campaign#e-wr} will be fired</info>
     * @returns {Promise<void>}
     * @example
     * Client.campaigns.currentSeason().then(campaign => {
     *    campaign.subWR();
     *    campaign.on('wr', (map, record) => {
     *      console.log(`New WR on ${campaign.name} in ${map.name} is ${record.playerName} (${record.time})`);
     *   });
     * });
     */
    async subWR() {
        if (!this.isTracked) throw 'The campaign is not tracked';
        let actualWR = await this.activity();
        setInterval(async ()=>{
            let newWR = await this.activity();
            if (actualWR[0].id != newWR[0].id) {
                let map = await newWR[0].map();
                /**
                 * Emitted when a new WR is set.
                 * <info>This event is emitted only if the method {@link Campaign#subWR} is called</info>
                 * @event Campaign#wr
                 * @param {TMMap} map The map where the new WR is set.
                 * @param {CampaignRecordActivity} newWR The new WR.
                 */
                this.emit('wr', map, newWR);
                actualWR = newWR;
            }
        }, this.client.options.cache.ttl * 60 * 1000);
    }
}

/**
 * The media images of an official campaign.
 */
class CampaignMedia {
    constructor(client, data) {
        const ReqUtil = require('../util/ReqUtil'),
            tmioURL = new ReqUtil(client).tmioURL;

        /**
         * The client object of the campaign.
         * @type {Client}
         */
        this.client = client;

        /**
         * The decal image URL of the campaign.
         * @type {string}
         */
        this.decal = tmioURL + data.decal;

        /**
         * The button background image URL of the campaign.
         * @type {string}
         */
        this.buttonBackground = tmioURL + data.buttonbackground;

        /**
         * The button foreground image URL of the campaign.
         * @type {string}
         */
        this.buttonForeground = tmioURL + data.buttonforeground;

        /**
         * The live button background image URL of the campaign.
         * @type {string}
         */
        this.liveButtonBackground = tmioURL + data.livebuttonbackground;

        /**
         * The live button foreground image URL of the campaign.
         * @type {string}
         */
        this.liveButtonForeground = tmioURL + data.livebuttonforeground;

        /**
         * The popup background image URL of the campaign.
         * @type {string}
         */
        this.popupBackground = data.popupbackground;

        /**
         * The popup foreground image URL of the campaign.
         * @type {string}
         */
        this.popup = data.popup;
    }
}

/**
 * The leaderboard of a campaign
 */
class CampaignLeaderboard{
    constructor(campaign, data){
        /**
         * The campaign
         * @type {Campaign}
         */
        this.campaign = campaign;

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = this.campaign.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * Fetches the player
     * @returns {Promise<Player>}
     */
    async player(){
        let player = await this.client.players.get(this._data.player.id);
        return player;
    }

    /**
     * The player name
     * @type {string}
     */
    get playerName(){
        return this._data.player.name;
    }

    /**
     * The position
     * @type {number}
     */
    get position(){
        return this._data.position;
    }

    /**
     * The number of points
     * @type {number}
     */
    get points(){
        return this._data.points;
    }
}

/**
 * The WR activity of a campaign
 */
class CampaignRecordActivity{
    constructor(campaign, data){
        /**
         * The Campaign
         * @type {Campaign}
         */
        this.campaign = campaign;

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = this.campaign.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The ID of the activity
     * @type {number}
     */
    get id(){
        return this._data.id;
    }

    /**
     * The leaderboard UID of the campaign
     * @type {string}
     */
    get leaderboardId(){
        return this._data.group;
    }

    /**
     * The map of the activity
     * @returns {Promise<TMMap>}
     */
    async map(){
        return await this.client.maps.get(this._data.map.mapUid);
    }

    /**
     * The map name
     * @type {string}
     */
    get mapName(){
        return this._data.map.name;
    }

    /**
     * The map author
     * @returns {Promise<Player>}
     */
    async mapAuthor(){
        return await this.client.players.get(this._data.map.author);
    }

    /**
     * The map author name
     * @type {string}
     */
    get mapAuthorName(){
        return this._data.map.authorplayer.name;
    }

    /**
     * The player who set the record
     * @returns {Promise<Player>}
     */
    async player(){
        return await this.client.players.get(this._data.player.id);
    }

    /**
     * The player name who set the record
     * @type {string}
     */
    get playerName(){
        return this._data.player.name;
    }

    /**
     * The date of the record
     * @type {Date}
     */
    get date(){
        return new Date(this._data.drivenat);
    }

    /**
     * The time of the record
     * @type {number}
     */
    get time(){
        return this._data.time;
    }

    /**
     * The difference between the record and the previous one
     * @type {number}
     */
    get difference(){
        return this._data.timediff;
    }
}

module.exports = Campaign;