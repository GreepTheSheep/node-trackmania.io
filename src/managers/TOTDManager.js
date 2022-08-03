const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const TOTD = require('../structures/TOTD');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a manager for TOTDs.
 */
class TOTDManager{
    constructor(client){
        /**
         * The client instance.
         * @type {Client}
         * @readonly
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        this._cache = new CacheManager(this.client, this, TOTD);
    }

    /**
     * Calculate the number of months between today and the month and year
     * @param {Date} date The date
     * @private
     */
    _calculateMonths(date){
        const today = new Date();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();
        const months = (date.getFullYear() - todayYear) * 12;
        return (months + date.getMonth() - todayMonth) * -1;
    }

    /**
     * Fetches a TOTD with it's day and returns its data
     * @param {Date} date The date
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the map from cache or not
     * @returns {Promise<TOTD>} The map
     * @example
     * // Gets the TOTD of today
     * client.totd.get(new Date()).then(totd => {
     *     console.log(totd.map.name);
     * });
     */
    async get(date, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(date.getMonth()+"_"+date.getFullYear())) {
            let month = this._cache.get(date.getMonth()+"_"+date.getFullYear()),
                dayMap = month.days.find(map => map.monthday == date.getDate());

            if (!dayMap) dayMap = month.days.find(map => map.monthday == date.getDate()-1);
            if (!dayMap) throw "Track of the day not found, it is the right date?";

            return new TOTD(this.client, dayMap);
        } else {
            return await this._fetch(date, cache);
        }
    }

    /**
     * Fetches a TOTD and returns its data
     * @param {Date} date The date
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the map or not
     * @returns {TOTD} The map
     * @private
     */
    async _fetch(date, cache = this.client.options.cache.enabled){
        const totd = this.client.options.api.paths.tmio.tabs.totd;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${totd}/${this._calculateMonths(date)}`);

        if (res.year != date.getFullYear() && res.month != date.getMonth()+1) {
            throw "Invalid date";
        }

        if (cache) {
            res._cachedTimestamp = Date.now();

            this._cache.set(date.getMonth()+"_"+date.getFullYear(), res);
        }

        //get the map of the day in the month on the res
        let dayMap = res.days.find(map => map.monthday == date.getDate());

        if (!dayMap) dayMap = res.days.find(map => map.monthday == date.getDate()-1);

        if (!dayMap) throw "Track of the day not found, it is the right date?";

        dayMap.month = res.month;
        dayMap.year = res.year;

        return new TOTD(this.client, dayMap);
    }
}

module.exports = TOTDManager;