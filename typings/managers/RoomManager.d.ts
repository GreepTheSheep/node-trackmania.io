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
     * @param {number} clubId The club Id that the room belongs to
     * @param {number} id The room Id
     * @param {boolean} cache Whether to get the room from cache or not
     * @returns {Promise<Room>} The room
     * @example
     * client.rooms.get(338, 1180).then(room => {
     *     console.log(room.name);
     * });
     */
    get(clubId: number, id: number, cache?: boolean): Promise<Room>;
    /**
     * Fetches a room and returns its data
     * @param {number} clubId The club Id that the room belongs to
     * @param {string} id The room Id
     * @param {boolean} cache Whether to cache the room or not
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
     * @type {number}
     */
    id: number;
    /**
     * The room's Club ID
     * @type {number}
     */
    clubId: number;
    /**
     * The room's name
     * @type {string}
     */
    name: string;
    /**
     * Whether the room is hosted by Nadeo
     * @type {boolean}
     */
    nadeo: boolean;
    /**
     * The player count
     * @type {number}
     */
    playerCount: number;
    /**
     * The max player count
     * @type {number}
     */
    maxPlayerCount: number;
}
import Room = require("../structures/Room");
