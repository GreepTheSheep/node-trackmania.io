const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const TMEvent = require('../structures/TMEvent');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars


/**
 * Represents a manager for in-game events.
 */
class EventManager{
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
        this._cache = new CacheManager(this.client, this, TMEvent);
    }
    
    /**
     * List all available events by creation date
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<EventSearchResult>>} The events
     */
    async listEvents(page = 0){
        const events = this.client.options.api.paths.tmio.tabs.events,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${events}/${page}`),
            eventList = res.competitions.map(event=> new EventSearchResult(this.client, event));
        return eventList;
    }

    /**
     * Searches for an event by name
     * @param {string} query The query
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<EventSearchResult>>} The events
     */
    async search(query, page = 0){
        const events = this.client.options.api.paths.tmio.tabs.events,
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${events}/${page}?search=${query}`),
            eventList = res.competitions.map(event=> new EventSearchResult(this.client, event));
        return eventList;
    }

    /**
     * Fetches a Trackmania event and returns its data
     * @param {number} eventId The event id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the map from cache or not
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
     * @param {number} eventId The event id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the map or not
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

/**
 * The result of a campaign search. It is completely different from the {@link TMEvent} object.
 */
class EventSearchResult {
    constructor(client, data){
        /**
         * The client instance
         * @type {Client}
         */
        this.client = client;

        /**
         * The event's ID
         * @type {number}
         */
        this.id = data.id;

        /**
         * The event's competiton ID
         * @type {number}
         */
        this.compId = data.id;

        /**
         * The event's Club ID
         * @type {number}
         */
        this.clubId = data.clubid;

        /**
         * The event's name
         * @type {string}
         */
        this.name = data.name;

        /**
         * The event's creation date
         * @type {Date}
         */
        this.date = new Date(data.timestamp * 1000);
    }

    /**
     * Return to the TMEvent Object
     * @returns {Promise<TMEvent>}
     */
    async event(){
        return await this.client.events.get(this.id);
    }
}

module.exports = EventManager;