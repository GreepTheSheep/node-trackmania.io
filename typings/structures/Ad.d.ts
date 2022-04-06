export = Ad;
/**
 * The Maniapub
 */
declare class Ad {
    constructor(client: any, data: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The data
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The Ad UID
     * @type {string}
     */
    get uid(): string;
    /**
     * The name of the Ad
     * @type {string}
     */
    get name(): string;
    /**
     * The type of the Ad
     * @type {AdType}
     */
    get type(): string;
    /**
     * The URL linked with this ad
     * @type {string}
     */
    get url(): string;
    /**
     * The 2x3 image URL of this ad (shown on the vertical screen)
     * @type {string}
     */
    get verticalImage(): string;
    /**
     * The 16x9 image URL of this ad (shown on the big screen)
     * @type {string}
     */
    get image(): string;
    /**
     * The 64x10 image URL of this ad (shown on Start, CPs and Finish)
     * @type {string}
     */
    get cpImage(): string;
    /**
     * The media of this ad (mostly the vertical image)
     * @type {string}
     */
    get media(): string;
    /**
     * The display format of this screen (2x3 vertical image by default)
     * @type {string}
     */
    get displayFormat(): string;
}
import Client = require("../client/Client");
