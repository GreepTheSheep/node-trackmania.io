export = COTD;
/**
 * Represents a COTD event.
 */
declare class COTD {
    constructor(client: any, data: any);
    /**
     * The client instance
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
     * The event associated on this COTD
     * @returns {Promise<TMEvent>}
     */
    getEvent(): Promise<TMEvent>;
    /**
     * The COTD identifier
     * @type {number}
     */
    get id(): number;
    /**
     * The COTD name
     * @type {string}
     */
    get name(): string;
    /**
     * The number of players in this COTD
     * @type {number}
     */
    get playerCount(): number;
    /**
     * The start date of this COTD
     * @type {Date}
     */
    get startDate(): Date;
    /**
     * The end date of this COTD
     * @type {Date}
     */
    get endDate(): Date;
}
import Client = require("../client/Client");
import TMEvent = require("./TMEvent");
