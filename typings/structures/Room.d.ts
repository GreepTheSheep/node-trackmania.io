export = Room;
/**
 * Represents a room.
 */
declare class Room {
    constructor(client: any, data: any);
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
     * @type {string}
     */
    get name(): string;
    /**
     * Whether this room is hosted on the cloud (Nadeo)
     * @type {boolean}
     */
    get isCloud(): boolean;
    /**
     * The login of the room (if it's not a cloud room)
     * @type {?string}
     */
    get login(): string;
    /**
     * The number of players in the room
     * @type {number}
     */
    get playerCount(): number;
    /**
     * The maximum number of players in the room
     * @type {number}
     */
    get maxPlayersCount(): number;
    /**
     * The region of the room (if it's on a cloud room)
     * @type {RoomRegion}
     */
    get region(): string;
    /**
     * The script name that currently runs in the room
     * @type {string}
     */
    get script(): string;
    /**
     * The script settings on the room.
     * <info> Example of result:
     *
     * [{
     *
     * key: 'S_DecoImageUrl_Checkpoint',
     *
     * value: 'https://trackmania-prod-nls-file-store-s3.cdn.ubi.com/club/decal/5f62400600952.png?updateTimestamp=1600274438.png'
     *
     * }]
     *
     * </info>
     * @type {Array<Object<string, string|number|boolean>>} x must be "key" and "value"
     */
    get scriptSettings(): {
        [x: string]: string | number | boolean;
    }[];
    /**
     * The image URL of the room
     * @type {string}
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
