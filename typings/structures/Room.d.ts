export = Room;
/**
 * Represents a room.
 */
declare class Room {
    /**
     * @param {Client} client The client.
     * @param {Object} data
     */
    constructor(client: Client, data: any);
    /**
     * The client that instantiated this room
     * @type {Client}
     */
    client: Client;
    /**
     * The data of the room
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The ID of the room
     * @type {number}
     */
    get id(): number;
    /**
     * The club that this room belongs to
     * @returns {Promise<Club>}
     */
    club(): Promise<Club>;
    /**
     * The name of the room
     * @type {String}
     */
    get name(): string;
    /**
     * Whether this room is hosted on the cloud (Nadeo)
     * @type {Boolean}
     */
    get isCloud(): boolean;
    /**
     * The login of the room (if it's not a cloud room)
     * @type {String}
     */
    get login(): string;
    /**
     * The number of players in the room
     * @type {Number}
     */
    get playerCount(): number;
    /**
     * The maximum number of players in the room
     * @type {Number}
     */
    get maxPlayersCount(): number;
    /**
     * The region of the room (if it's on a cloud room)
     * @type {String}
     */
    get region(): string;
    /**
     * The script name that currently runs in the room
     * @type {String}
     */
    get script(): string;
    /**
     * The script settings on the room
     * @type {Array<Object<string, string|number|boolean>>} x must be "key" and "value"
     * @example [{
     * key: 'S_DecoImageUrl_Checkpoint',
     * value: 'https://trackmania-prod-nls-file-store-s3.cdn.ubi.com/club/decal/5f62400600952.png?updateTimestamp=1600274438.png'
     * }]
     */
    get scriptSettings(): {
        [x: string]: string | number | boolean;
    }[];
    /**
     * The image URL of the room
     * @type {String}
     */
    get imageUrl(): string;
    /**
     * The maps on the room
     * @returns {Promise<Array<TMMap>>}
     * @example
     * Client.rooms.get(228, 82160).then(async room => {
     *   const maps = await room.maps();
     *   maps.forEach(map => console.log(map.name));
     * });
     */
    maps(): Promise<Array<TMMap>>;
}
import Client = require("../client/Client");
import Club = require("./Club");
import TMMap = require("./TMMap");
