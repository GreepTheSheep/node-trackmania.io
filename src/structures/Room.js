const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('./TMMap'); // eslint-disable-line no-unused-vars
const Club = require('./Club'); // eslint-disable-line no-unused-vars

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
     * @type {String}
     */
    get name() {
        return this._data.name;
    }

    /**
     * Whether this room is hosted on the cloud (Nadeo)
     * @type {Boolean}
     */
    get isCloud() {
        return this._data.nadeo;
    }

    /**
     * The login of the room (if it's not a cloud room)
     * @type {String}
     */
    get login() {
        if (!this.isCloud) {
            return this._data.login;
        } else throw new Error('This room is not hosted on the cloud. It has no login.');
    }

    /**
     * The number of players in the room
     * @type {Number}
     */
    get playerCount() {
        return this._data.playercount;
    }

    /**
     * The maximum number of players in the room
     * @type {Number}
     */
    get maxPlayersCount() {
        return this._data.playermax;
    }

    /**
     * The region of the room (if it's on a cloud room)
     * @type {String}
     */
    get region() {
        if (this.isCloud) {
            return this._data.region;
        } else throw new Error('This room is not hosted on the cloud. It has no region.');
    }

    /**
     * The script name that currently runs in the room
     * @type {String}
     */
    get script() {
        return this._data.script;
    }

    /**
     * The script settings on the room
     * @returns {Array<Object<string, string|number|boolean>>} x must be "key" and "value"
     * @example [{
     * key: 'S_DecoImageUrl_Checkpoint',
     * value: 'https://trackmania-prod-nls-file-store-s3.cdn.ubi.com/club/decal/5f62400600952.png?updateTimestamp=1600274438.png'
     * }]
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
     * @type {String}
     */
    get imageUrl() {
        return this._data.mediaurl;
    }

    /**
     * The maps on the room
     * @returns {Promise<Array<TMMap>>}
     */
    async maps() {
        const array = [];
        this._data.maps.forEach((map) => {
            this.client.maps.get(map.id).then((map) => {
                array.push(map);
            });
        });
        return array;
    }
}

module.exports = Room;