export = CampaignManager;
/**
 * Represents a manager for campaigns.
 */
declare class CampaignManager {
    constructor(client: any);
    /**
     * The client instance.
     * @type {Client}
     * @readonly
     */
    readonly client: Client;
    /**
     * The cache manager
     * @type {CacheManager}
     * @private
     */
    private _cache;
    /**
     * Get the current official campaign
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to use from the cache or not
     * @returns {Promise<Campaign>} The campaign
     */
    currentSeason(cache?: boolean): Promise<Campaign>;
    /**
     * Get all official campaigns from recent to old
     * @returns {Promise<Array<CampaignSearchResult>>} The campaigns
     */
    officialCampaigns(): Promise<Array<CampaignSearchResult>>;
    /**
     * Get all popular campaigns (official excluded) (50 items / page)
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<CampaignSearchResult>>} The campaigns
     */
    popularCampaigns(page?: number): Promise<Array<CampaignSearchResult>>;
    /**
     * Searches for a campaign
     * @param {string} query The query
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<CampaignSearchResult>>} The campaigns
     * @example
     * client.campaigns.search('htimh').then(campaigns => {
     *    campaigns[0].getCampaign().then(async campaign => {
     *       const maps = await campaign.maps();
     *       maps.forEach(map => console.log(map.name));
     *   });
     * });
     */
    search(query: string, page?: number): Promise<Array<CampaignSearchResult>>;
    /**
     * Fetches a Trackmania campaign and returns its data
     * @param {number} clubId The club Id that the campaign belongs to (If it's an official campaign, set it to 0)
     * @param {number} id The campaign Id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to get the campaign from cache or not
     * @returns {Promise<Campaign>} The campaign
     * @example
     * client.campaigns.get(54, 10621).then(campaign => {
     *     console.log(campaign.name);
     * });
     */
    get(clubId: number, id: number, cache?: boolean): Promise<Campaign>;
    /**
     * Fetches a campaign and returns its data
     * @param {number} clubId The club Id that the campaign belongs to
     * @param {string} id The campaign Id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the campaign or not
     * @returns {Campaign} The campaign
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import Campaign = require("../structures/Campaign");
/**
 * The result of a campaign search. It is completely different from the {@link Campaign} object.
 */
declare class CampaignSearchResult {
    constructor(client: any, data: any);
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /**
     * The campaign's ID
     * @type {number}
     */
    id: number;
    /**
     * The campaign's Club ID
     * @type {number}
     */
    clubId: number;
    /**
     * The campaign's name
     * @type {string}
     */
    name: string;
    /**
     * The campaign's creation date
     * @type {Date}
     */
    date: Date;
    /**
     * The campaign's map count
     * @type {number}
     */
    mapCount: number;
    /**
     * Return to the Campaign Object
     * @returns {Promise<Campaign>}
     */
    getCampaign(): Promise<Campaign>;
}
