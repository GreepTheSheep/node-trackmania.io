const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('../structures/TMMap'); // eslint-disable-line no-unused-vars

/**
 * Represents a Track Of The Day (TOTD).
 */
class TOTD {
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
     * @returns {Promise<TMMap>}
     * @example
     * Client.totd.get(date).then(async totd=>{
     *  const map = await totd.map();
     *  console.log(map.name);
     * })
     */
    async map(){
        return this.client.maps.get(this._data.map.mapUid);
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
     * The month
     * @type {number}
     */
    get month(){
        return this._data.month;
    }

    /**
     * The year
     * @type {number}
     */
    get year(){
        return this._data.year;
    }

    /**
     * The leaderboard ID
     * @type {string}
     */
    get leaderboardId(){
        return this._data.leaderboarduid;
    }
}

module.exports = TOTD;