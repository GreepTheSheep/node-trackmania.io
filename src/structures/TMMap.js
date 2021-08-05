class TMMap {
    /**
     * Represents a map on Trackmania.
     */
    constructor(client, data) {
    
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The map data.
         * @private
         */
        this._data = data;
    }

    /**
     * The map name.
     * @type {string}
     */
    get name() {
        return this._data.name;
    }

    /**
     * The map id.
     * @type {string}
     */
    get id() {
        return this._data.mapId;
    }

    /**
     * The map uid.
     * @type {string}
     */
    get uid() {
        return this._data.mapUid;
    }

    /**
     * The map author.
     * @returns {Promise<Player>}
     * @example
     * map.author.then(author => {
     *    console.log(`The map author is ${author.name}`);
     * });
     */
    get author() {
        return this.client.players.get(this._data.author);
    }

    /**
     * The map submitter.
     * @returns {Promise<Player>}
     */
    get submitter() {
        return this.client.players.get(this._data.submitter);
    }

    /**
     * The map medal times.
     * @returns {Object<string, number>} string: medal name, number: time in miliseconds
     */
    get medalTimes() {
        return {
            author: this._data.authorScore,
            gold: this._data.goldScore,
            silver: this._data.silverScore,
            bronze: this._data.bronzeScore
        };
    }

    /**
     * The environment for this map.
     * @type {string}
     */
    get environment() {
        return this._data.environment;
    }

    /**
     * The map file name.
     * @type {string}
     */
    get fileName() {
        return this._data.filename;
    }

    /**
     * The map uploaded date.
     * @type {Date}
     */
    get uploaded() {
        return new Date(this._data.timestamp);
    }

    /**
     * The map URL.
     * @type {string}
     */
    get url() {
        return this._data.fileUrl;
    }

    /**
     * The map thumbnail.
     * @type {string}
     */
    get thumbnail() {
        return this._data.thumbnailUrl;
    }

    /**
     * The map exchange id, if the map is on trackmania.exchange, else null.
     * @type {?string}
     */
    get exchangeId() {
        if (this._data.exchangeId == 0) return null;
        else return this._data.exchangeid;
    }

    /**
     * The map informations on trackmania.exchange.
     * @returns {?TMExchangeMap}
     */
    get exchange() { 
        if (this.exchangeId == null) return null;
        else {
            if (!this._TMExchange || this._TMExchange.id !== this.exchangeId) {
                this._TMExchange = new TMExchangeMap(this, this._data.exchange);
            } 
            return this._TMExchange;
        }
    }
}

class TMExchangeMap {
    constructor(map, data) {
        /**
         * The map instance.
         * @type {TMMap}
         */
        this.map = map;

        /**
         * The map data.
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The map exchange id.
     * @type {Number}
     */
    get id() {
        return this._data.TrackID;
    }

    /**
     * The map name.
     * @type {string}
     */
    get name() {
        return this._data.Name;
    }

    /**
     * The map author.
     * @type {string}
     */
    get author() {
        return this._data.Username;
    }

    /**
     * The map description.
     * @type {string}
     */
    get description() {
        return this._data.Comments;
    }

    /**
     * The map length.
     * @type {string}
     */
    get length() {
        return this._data.LengthName;
    }

    /**
     * The map difficulty.
     * @type {string}
     */
    get difficulty() {
        return this._data.DifficultyName;
    }

    /**
     * The map upload date.
     * @type {Date}
     */
    get uploaded() {
        return new Date(this._data.UploadedAt);
    }

    /**
     * The map last update date.
     * @type {Date}
     */
    get updated() {
        return new Date(this._data.UpdatedAt);
    }

    /**
     * The map award count.
     * @type {number}
     */
    get awards() {
        return this._data.AwardCount;
    }

    /**
     * The map download link.
     * @type {string}
     */
    get download() {
        const tmx = this.map.client.options.api.paths.tmx;
        return `${tmx.protocol}://${tmx.host}/${tmx.tabs.mapsDownload}/${this.id}`;
    }
}

module.exports = TMMap;