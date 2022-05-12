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
     * The leaderboard of the campaign
     * @type {Array<CampaignLeaderboard>}
     */
    leaderboard: Array<CampaignLeaderboard>;
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
     * Get the number of maps in the campaign.
     * @type {number}
     */
    get mapCount(): number;
    /**
     * Get a specific map of the campaign.
     * @param {number} index The index of the map.
     * @returns {Promise<TMMap>}
     */
    map(index: number): Promise<TMMap>;
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
     * Load more results in the leaderboard.
     * @param {number} [nbOfResults=100] The number of results to load. (max 100)
     * @returns {Promise<?Array<CampaignLeaderboard>>}
     */
    leaderboardLoadMore(nbOfResults?: number): Promise<Array<CampaignLeaderboard> | null>;
    /**
     * The media images of the campaign, if this is an official campaign.
     * @type {?CampaignMedia}
     */
    get media(): CampaignMedia;
    /**
     * Whether the campaign is tracked.
     * @type {boolean}
     */
    get isTracked(): boolean;
    /**
     * Gets the campaign activity.
     * <info>{@link Campaign#isTracked} must be true.</info>
     * @returns {Promise<Array<CampaignRecordActivity>>}
     */
    activity(page?: number): Promise<Array<CampaignRecordActivity>>;
    /**
     * Subscribe to the campaign WR updates.
     * <info>{@link Campaign#isTracked} must be true.</info>
     * <info>When a new WR is set, the event {@link Campaign#e-wr} will be fired</info>
     * @returns {Promise<void>}
     * @example
     * Client.campaigns.currentSeason().then(campaign => {
     *    campaign.subWR();
     *    campaign.on('wr', (map, record) => {
     *      console.log(`New WR on ${campaign.name} in ${map.name} is ${record.playerName} (${record.time})`);
     *   });
     * });
     */
    subWR(): Promise<void>;
}
import Client = require("../client/Client");
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
import Club = require("./Club");
import TMMap = require("./TMMap");
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
/**
 * The WR activity of a campaign
 */
declare class CampaignRecordActivity {
    constructor(campaign: any, data: any);
    /**
     * The Campaign
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
     * The ID of the activity
     * @type {number}
     */
    get id(): number;
    /**
     * The leaderboard UID of the campaign
     * @type {string}
     */
    get leaderboardId(): string;
    /**
     * The map of the activity
     * @returns {Promise<TMMap>}
     */
    map(): Promise<TMMap>;
    /**
     * The map name
     * @type {string}
     */
    get mapName(): string;
    /**
     * The map author
     * @returns {Promise<Player>}
     */
    mapAuthor(): Promise<Player>;
    /**
     * The map author name
     * @type {string}
     */
    get mapAuthorName(): string;
    /**
     * The player who set the record
     * @returns {Promise<Player>}
     */
    player(): Promise<Player>;
    /**
     * The player name who set the record
     * @type {string}
     */
    get playerName(): string;
    /**
     * The date of the record
     * @type {Date}
     */
    get date(): Date;
    /**
     * The time of the record
     * @type {number}
     */
    get time(): number;
    /**
     * The difference between the record and the previous one
     * @type {number}
     */
    get difference(): number;
}
import Player = require("./Player");
