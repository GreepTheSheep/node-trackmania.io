export = RoomManager;
/**
 * Represents a manager for rooms.
 */
declare class RoomManager {
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
     * Get the popular Club rooms (by number of players connected)
     * @param {number} page The page number
     * @returns {Promise<Array<RoomSearchResult>>} The rooms
     */
    popularRooms(page?: number): Promise<Array<RoomSearchResult>>;
    /**
     * Searches for a room
     * @param {string} query The query to search for
     * @param {number} page The page number
     * @returns {Promise<Array<RoomSearchResult>>} The rooms
     */
    search(query: string, page?: number): Promise<Array<RoomSearchResult>>;
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
/**
 * The result of a campaign search. It is completely different from the {@link Room} object.
 */
declare class RoomSearchResult {
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
     * The room's ID
     * @type {Number}
     */
    id: number;
    /**
     * The room's Club ID
     * @type {Number}
     */
    clubId: number;
    /**
     * The room's name
     * @type {String}
     */
    name: string;
    /**
     * Whether the room is hosted by Nadeo
     * @type {boolean}
     */
    nadeo: boolean;
    /**
     * The player count
     * @type {Number}
     */
    playerCount: number;
    /**
     * The max player count
     * @type {Number}
     */
    maxPlayerCount: number;
}
import Room = require("../structures/Room");
