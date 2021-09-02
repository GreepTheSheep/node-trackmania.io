export = News;
declare class News {
    constructor(client: any, data: any);
    /**
     * The client object of the news page
     * @type {Client}
     */
    client: any;
    /**
     * The data of the news page
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The news item's id
     * @type {number}
     */
    get id(): number;
    /**
     * The news item's headline
     * @type {string}
     */
    get headline(): string;
    /**
     * The news item's text content
     * @type {string}
     */
    get body(): string;
    /**
     * The link to the news item on trackmania.com
     * @type {string}
     */
    get link(): string;
    /**
     * The news item's accompanying media file as a link
     * @type {string}
     */
    get media(): string;
    /**
     * The news item's time of publishing
     * @type {Date}
     */
    get time(): Date;
}
