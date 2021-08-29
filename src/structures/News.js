class NewsItem {
    constructor(page, data) {
        /**
         * The news object this news item belongs to
         * @type {News}
         */
        this.news = page;

        /**
         * The data of the news item
         * @type {Object}
         * @private
         */
        this._data = data;

        /**
         * The client of the parent news object
         * @type {Object}
         * @private
         */
        this._client = this.news.client;
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

// TODO: is this a NewsPage? can you request multiple pages?
class News {
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
     * The news page's number
     * @type {number}
     */
    get pageNumber() {
        return this._data.page;
    }

    /**
     * The number of available news pages
     * @type {number}
     */
    get pageLimit() {
        return this._data.page_max;
    }

    // TODO: does this make sense? if there's more than one news item, does it show up in this array?
    // or do you have to request the next page, and the splashscreens array is only ever 1 element long?
    /**
     * The available news items
     * @type {Array<NewsItem>}
     */
    get newsItems() {
        const arr = [];
        for (let i = 0; i < this._data.splashscreens; i++) {
            arr.push(new NewsItem(this, this._data.splashscreens[i]));
        }
        return arr;
    }
}

module.exports = News;
