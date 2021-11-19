export = EventManager;
/**
 * Represents a manager for in-game events.
 */
declare class EventManager {
    constructor(client: any);
    /**
     * The client instance.
     * @type {Client}
     * @readonly
     */
    readonly client: Client;
    /**
     * The cache manager
     * @type {CacheManager}
     * @private
     */
    private _cache;
    /**
     * List all available events by creation date
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<EventSearchResult>>} The events
     */
    listEvents(page?: number): Promise<Array<EventSearchResult>>;
    /**
     * Searches for an event by name
     * @param {string} query The query
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<EventSearchResult>>} The events
     */
    search(query: string, page?: number): Promise<Array<EventSearchResult>>;
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
    get(eventId: number, cache?: boolean): Promise<TMEvent>;
    /**
     * Fetches a event and returns its data
     * @param {number} eventId The event id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the map or not
     * @returns {Event} The event
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
/**
 * The result of a campaign search. It is completely different from the {@link TMEvent} object.
 */
declare class EventSearchResult {
    constructor(client: any, data: any);
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /**
     * The event's ID
     * @type {number}
     */
    id: number;
    /**
     * The event's competiton ID
     * @type {number}
     */
    compId: number;
    /**
     * The event's Club ID
     * @type {number}
     */
    clubId: number;
    /**
     * The event's name
     * @type {string}
     */
    name: string;
    /**
     * The event's creation date
     * @type {Date}
     */
    date: Date;
    /**
     * Return to the TMEvent Object
     * @returns {Promise<TMEvent>}
     */
    event(): Promise<TMEvent>;
}
import TMEvent = require("../structures/TMEvent");
