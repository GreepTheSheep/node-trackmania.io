const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * Represents a news item.
 */
class Splashscreen {
    constructor(client, data) {
        /**
         * The client object of the news page
         * @type {Client}
         */
        this.client = client;

        /**
         * The data of the news page
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The news item's id
     * @type {number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The news item's headline
     * @type {string}
     */
    get headline() {
        return this._data.headline;
    }

    /**
     * The news item's text content
     * @type {string}
     */
    get body() {
        return this._data.body;
    }

    /**
     * The link to the news item on trackmania.com
     * @type {string}
     */
    get link() {
        return this._data.link;
    }

    /**
     * The news item's accompanying media file as a link
     * @type {string}
     */
    get media() {
        return this._data.media;
    }

    /**
     * The news item's time of publishing
     * @type {Date}
     */
    get time() {
        return new Date(this._data.time * 1000);
    }
}

module.exports = Splashscreen;
