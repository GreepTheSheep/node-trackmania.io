const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('../structures/TMMap');

class TOTD {
    constructor(client, data){
        /**
         * The client objet
         * @type {Client}
         */
        this.client = client;

        /**
         * The data
         * @private
         */
        this._data = data;
    }

    /**
     * The map
     * @returns {TMMap}
     */
    get map(){
        return new TMMap(this.client, this._data.map);
    }

    /**
     * The campaign ID
     * @returns {Number}
     */
    get campaignId(){
        return this._data.campaignid;
    }

    /**
     * The week day
     * @returns {Number}
     */
    get weekDay(){
        return this._data.weekday;
    }

    /**
     * The month day
     * @returns {Number}
     */
    get monthDay(){
        return this._data.monthday;
    }

    /**
     * The leaderboard ID
     * @returns {String}
     */
    get leaderboardId(){
        return this._data.leaderboardid;
    }
}

module.exports = TOTD;