export = Campaign;
/**
 * The Campaign class represents a campaign.
 */
declare class Campaign {
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
     * The club that owns the campaign. (if it's not an official campaign)
     * @returns {?Promise<Club>}
     */
    club(): Promise<Club> | null;
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
     * Get the top 10 players of the campaign
     * @returns {Promise<Array<CampaignLeaderboard>>}
     */
    leaderboard(): Promise<Array<CampaignLeaderboard>>;
    /**
     * The media images of the campaign, if this is an official campaign.
     * @type {?CampaignMedia}
     */
    get media(): CampaignMedia;
}
import Client = require("../client/Client");
import Club = require("./Club");
import TMMap = require("./TMMap");
/**
 * The leaderboard of a campaign
 */
declare class CampaignLeaderboard {
    constructor(campaign: any, data: any);
    /**
     * The campaign
     * @type {Campaign}
     */
    campaign: Campaign;
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
     * Fetches the player
     * @returns {Promise<Player>}
     */
    player(): Promise<Player>;
    /**
     * The player name
     * @type {string}
     */
    get playerName(): string;
    /**
     * The position
     * @type {number}
     */
    get position(): number;
    /**
     * The number of points
     * @type {number}
     */
    get points(): number;
}
/**
 * The media images of an official campaign.
 */
declare class CampaignMedia {
    constructor(client: any, data: any);
    /**
     * The client object of the campaign.
     * @type {Client}
     */
    client: Client;
    /**
     * The decal image URL of the campaign.
     * @type {string}
     */
    decal: string;
    /**
     * The button background image URL of the campaign.
     * @type {string}
     */
    buttonBackground: string;
    /**
     * The button foreground image URL of the campaign.
     * @type {string}
     */
    buttonForeground: string;
    /**
     * The live button background image URL of the campaign.
     * @type {string}
     */
    liveButtonBackground: string;
    /**
     * The live button foreground image URL of the campaign.
     * @type {string}
     */
    liveButtonForeground: string;
    /**
     * The popup background image URL of the campaign.
     * @type {string}
     */
    popupBackground: string;
    /**
     * The popup foreground image URL of the campaign.
     * @type {string}
     */
    popup: string;
}
import Player = require("./Player");
