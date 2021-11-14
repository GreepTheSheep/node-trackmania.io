export = EventManager;
/**
 * Represents a manager for in-game events.
 */
declare class EventManager {
    /**
     * @param {Client} client The client.
     */
    constructor(client: Client);
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
     * List all available events
     * @param {Number} page The page number
     * @returns {Promise<Array<EventSearchResult>>} The events
     */
    listEvents(page?: number): Promise<Array<EventSearchResult>>;
    /**
     * Searches for an event by name
     * @param {string} query The query
     * @param {number} page The page number
     * @returns {Promise<Array<EventSearchResult>>} The events
     */
    search(query: string, page?: number): Promise<Array<EventSearchResult>>;
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
    get(eventId: number, cache?: boolean): Promise<TMEvent>;
    /**
     * Fetches a event and returns its data
     * @param {Number} eventId The event id
     * @param {Boolean} cache Whether to cache the map or not
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
    /**
     * @param {Client} client The client instance.
     * @param {Object} data The data.
     */
    constructor(client: Client, data: any);
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /**
     * The event's ID
     * @type {Number}
     */
    id: number;
    /**
     * The event's competiton ID
     * @type {Number}
     */
    compId: number;
    /**
     * The event's Club ID
     * @type {Number}
     */
    clubId: number;
    /**
     * The event's name
     * @type {String}
     */
    name: string;
    /**
     * The event's creation date
     * @type {Date}
     */
    date: Date;
}
import TMEvent = require("../structures/TMEvent");