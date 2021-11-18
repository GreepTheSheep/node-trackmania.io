const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMEvent = require('./TMEvent'); // eslint-disable-line no-unused-vars

/**
 * Represents a COTD event.
 */
class COTD {
    constructor(client, data){
        /**
         * The client instance
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
     * The event associated on this COTD
     * @returns {Promise<TMEvent>}
     */
    async getEvent(){
        return this.client.events.get(this._data.id);
    }

    /**
     * The COTD identifier
     * @type {number}
     */
    get id(){
        return this._data.id;
    }

    /**
     * The COTD name
     * @type {string}
     */
    get name(){
        return this._data.name;
    }

    /**
     * The number of players in this COTD
     * @type {number}
     */
    get playerCount(){
        return this._data.players;
    }

    /**
     * The start date of this COTD
     * @type {Date}
     */
    get startDate(){
        return new Date(this._data.starttime * 1000);
    }

    /**
     * The end date of this COTD
     * @type {Date}
     */
    get endDate(){
        return new Date(this._data.endtime * 1000);
    }
}
module.exports = COTD;