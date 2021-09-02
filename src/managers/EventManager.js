const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const TMEvent = require('../structures/TMEvent');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

class EventManager{
    constructor(client){
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager} 
         * @private
         */
        this._cache = new CacheManager(client, TMEvent);
    }

    /**
     * Fetches a Trackmania event and returns its data
     * @param {Number} eventId The event id
     * @param {Boolean} cache Whether to get the map from cache or not
     * @returns {Promise<TMEvent>} The event
     * @example 
     * client.events.get(706).then(event => {
     *     console.log(event.name);
     * });
     */
    async get(eventId, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(eventId)) {
            return this._cache.get(eventId);
        } else {
            return await this._fetch(eventId, cache);
        }
    }
        
    /**
     * Fetches a event and returns its data
     * @param {Number} eventId The event id
     * @param {Boolean} cache Whether to cache the map or not
     * @returns {Event} The event
     * @private
     */
    async _fetch(eventId, cache = this.client.options.cache.enabled){
        const comp = this.client.options.api.paths.tmio.tabs.comp;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${comp}/${eventId}`);

        const theEvent = new TMEvent(this.client, res);
        if (cache) {
            res._cachedTimestamp = Date.now();
            
            this._cache.set(res.id, theEvent);
        }
        return theEvent;
    }
}

module.exports = EventManager;