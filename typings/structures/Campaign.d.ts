export = Campaign;
/**
 * The Campaign class represents a campaign.
 */
declare class Campaign {
    /**
     * @param {Clienr} client The client.
     * @param {Object} data
     */
    constructor(client: any, data: any);
    /**
     * The client object of the campaign.
     * @type {Client}
     */
    client: Client;
    /**
     * The data object
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The id of the campaign.
     * @type {number}
     */
    get id(): number;
    /**
     * The name of the campaign.
     * @type {string}
     */
    get name(): string;
    /**
     * Whether the campaign is official.
     * @type {boolean}
     */
    get isOfficial(): boolean;
    /**
     * The image URL of the campaign. If this is an official campaign, the decal image URL is returned.
     * @type {string}
     */
    get image(): string;
    /**
     * The creation date of the campaign.
     * @type {Date}
     */
    get createdAt(): Date;
    /**
     * The last update date of the campaign.
     * @type {Date}
     */
    get updatedAt(): Date;
    /**
     * The club that owns the campaign.
     * @returns {Promise<Club>}
     */
    club(): Promise<Club>;
    /**
     * The leaderboard id of the campaign.
     * @type {string}
     */
    get leaderboardId(): string;
    /**
     * The list of maps in the campaign.
     * @returns {Promise<Array<TMMap>>}
     * @example
     * Client.campaigns.get(0, 11612).then(async campaign => {
     *   const maps = await campaign.maps();
     *   maps.forEach(map => console.log(map.name));
     * });
     */
    maps(): Promise<Array<TMMap>>;
    /**
     * The media images of the campaign, if this is an official campaign.
     * @type {Object<string, string>}
     */
    get media(): {
        [x: string]: string;
    };
}
import Client = require("../client/Client");
import Club = require("./Club");
import TMMap = require("./TMMap");
