const Player = require('./Player'); // eslint-disable-line no-unused-vars
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('./TMMap'); // eslint-disable-line no-unused-vars
const Club = require('./Club'); // eslint-disable-line no-unused-vars

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
     * The club that owns the campaign.
     * @returns {Promise<Club>}
     */
    async club() {
        if (this.isOfficial) {
            throw new Error("This campaign is an official campaign. It does not have a club.");
        } else return this.client.clubs.get(this._data.clubid);
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
     * @type {Object<string, string>}
     */
    get media() {
        if (this.isOfficial) {
            const ReqUtil = require('../util/ReqUtil'),
                tmioURL = new ReqUtil(this.client).tmioURL;
            return {
                decal: tmioURL + this._data.mediae.decal,
                buttonbackground: tmioURL + this._data.mediae.buttonbackground,
                buttonforeground: tmioURL + this._data.mediae.buttonforeground,
                livebuttonbackground: tmioURL + this._data.mediae.livebuttonbackground,
                livebuttonforeground: tmioURL + this._data.mediae.livebuttonforeground,
                popupbackground: this._data.mediae.popupbackground,
                popup: this._data.mediae.popup
            };
        } else throw new Error("This campaign is not an official campaign.");
    }
}

module.exports = Campaign;