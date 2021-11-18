const Player = require('./Player'); // eslint-disable-line no-unused-vars
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('./TMMap'); // eslint-disable-line no-unused-vars
const Club = require('./Club'); // eslint-disable-line no-unused-vars

/**
 * The Campaign class represents a campaign.
 */
class Campaign {
    constructor(client, data) {
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
        return this._data.leaderboardid;
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
     * The media images of the campaign, if this is an official campaign.
     * @type {?CampaignMedia}
     */
    get media() {
        if (this.isOfficial) {
            return new CampaignMedia(this.client, this._data.mediae);
        } else return null;
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

module.exports = Campaign;