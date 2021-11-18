const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('./TMMap'); // eslint-disable-line no-unused-vars
const Club = require('./Club'); // eslint-disable-line no-unused-vars
const {RoomRegion} = require('../util/Constants'); // eslint-disable-line no-unused-vars

/**
 * Represents a room.
 */
class Room {
    constructor(client, data) {
        /**
         * The client that instantiated this room
         * @type {Client}
         */
        this.client = client;

        /**
         * The data of the room
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The ID of the room
     * @type {number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The club that this room belongs to
     * @returns {Promise<Club>}
     */
    async club() {
        return this.client.clubs.get(this._data.clubid);
    }

    /**
     * The name of the room
     * @type {string}
     */
    get name() {
        return this._data.name;
    }

    /**
     * Whether this room is hosted on the cloud (Nadeo)
     * @type {boolean}
     */
    get isCloud() {
        return this._data.nadeo;
    }

    /**
     * The login of the room (if it's not a cloud room)
     * @type {?string}
     */
    get login() {
        if (!this.isCloud) return this._data.login;
        else return null;
    }

    /**
     * The number of players in the room
     * @type {number}
     */
    get playerCount() {
        return this._data.playercount;
    }

    /**
     * The maximum number of players in the room
     * @type {number}
     */
    get maxPlayersCount() {
        return this._data.playermax;
    }

    /**
     * The region of the room (if it's on a cloud room)
     * @type {RoomRegion}
     */
    get region() {
        if (this.isCloud) return this._data.region;
        else return null;
    }

    /**
     * The script name that currently runs in the room
     * @type {string}
     */
    get script() {
        return this._data.script;
    }

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
    get scriptSettings() {
        var array = [];
        Object.entries(this._data.scriptSettings).forEach(([res]) => {
            let [key, value] = res;

            if (value.type == 'text') {
                value = String(value.value);
            } else if (value.type == 'integer') {
                value = Number(value.value);
            } else if (value.type == 'boolean') {
                value = Boolean(value.value);
            }

            array.push({
                key,
                value
            });
        });

        return array;
    }

    /**
     * The image URL of the room
     * @type {string}
     */
    get imageUrl() {
        return this._data.mediaurl;
    }

    /**
     * The maps on the room
     * @returns {Promise<Array<TMMap>>}
     * @example
     * Client.rooms.get(228, 82160).then(async room => {
     *   const maps = await room.maps();
     *   maps.forEach(map => console.log(map.name));
     * });
     */
    async maps() {
        const array = [];
        for (let i = 0; i < this._data.maps.length; i++) {
            let map = await this.client.maps.get(this._data.maps[i].mapUid);
            array.push(map);
        }
        return array;
    }
}

module.exports = Room;