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
     * The cache manager
     * @type {CacheManager}
     * @private
     */
    private _cache;
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
import TMEvent = require("../structures/TMEvent");
import Client = require("../client/Client");
