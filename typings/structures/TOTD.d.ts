export = TOTD;
/**
 * Represents a Track Of The Day (TOTD).
 */
declare class TOTD {
    constructor(client: any, data: any);
    /**
     * The client objet
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
     * The map
     * @returns {Promise<TMMap>}
     * @example
     * Client.totd.get(date).then(async totd=>{
     *  const map = await totd.map();
     *  console.log(map.name);
     * })
     */
    map(): Promise<TMMap>;
    /**
     * The campaign ID
     * @type {number}
     */
    get campaignId(): number;
    /**
     * The week day
     * @type {number}
     */
    get weekDay(): number;
    /**
     * The month day
     * @type {number}
     */
    get monthDay(): number;
    /**
     * The month
     * @type {number}
     */
    get month(): number;
    /**
     * The year
     * @type {number}
     */
    get year(): number;
    /**
     * The leaderboard ID
     * @type {string}
     */
    get leaderboardId(): string;
}
import Client = require("../client/Client");
import TMMap = require("../structures/TMMap");
