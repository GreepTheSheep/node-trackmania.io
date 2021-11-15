const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('../structures/TMMap');

/**
 * Represents a Track Of The Day (TOTD).
 */
class TOTD {
    /**
     * @param {Client} client The client.
     * @param {Object} data 
     */
    constructor(client, data){
        /**
         * The client objet
         * @type {Client}
         */
        this.client = client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The map
     * @type {TMMap}
     */
    get map(){
        return new TMMap(this.client, this._data.map);
    }

    /**
     * The campaign ID
     * @type {number}
     */
    get campaignId(){
        return this._data.campaignid;
    }

    /**
     * The week day
     * @type {number}
     */
    get weekDay(){
        return this._data.weekday;
    }

    /**
     * The month day
     * @type {number}
     */
    get monthDay(){
        return this._data.monthday;
    }

    /**
     * The leaderboard ID
     * @type {string}
     */
    get leaderboardId(){
        return this._data.leaderboardid;
    }
}

module.exports = TOTD;