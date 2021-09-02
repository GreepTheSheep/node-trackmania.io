export = RoomManager;
declare class RoomManager {
    constructor(client: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The cache manager
     * @type {CacheManager}
     * @private
     */
    private _cache;
    /**
     * Fetches a Trackmania room (server) and returns its data
     * @param {Number} clubId The club Id that the room belongs to
     * @param {Number} id The room Id
     * @param {Boolean} cache Whether to get the room from cache or not
     * @returns {Promise<Room>} The room
     * @example
     * client.rooms.get(338, 1180).then(room => {
     *     console.log(room.name);
     * });
     */
    get(clubId: number, id: number, cache?: boolean): Promise<Room>;
    /**
     * Fetches a room and returns its data
     * @param {Number} clubId The club Id that the room belongs to
     * @param {String} id The room Id
     * @param {Boolean} cache Whether to cache the room or not
     * @returns {Campaign} The room
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import Room = require("../structures/Room");
