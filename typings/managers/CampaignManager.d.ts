export = CampaignManager;
declare class CampaignManager {
    constructor(client: any);
    /**
     * The client instance.
     * @type {Client}
     */
    client: Client;
    /**
     * The cache manager
     * @type {CacheManager}
     * @private
     */
    private _cache;
    /**
     * Fetches a Trackmania campaign and returns its data
     * @param {Number} clubId The club Id that the campaign belongs to (If it's an official campaign, set it to 0)
     * @param {Number} id The campaign Id
     * @param {Boolean} cache Whether to get the campaign from cache or not
     * @returns {Promise<Campaign>} The campaign
     * @example
     * client.campaigns.get(54, 10621).then(campaign => {
     *     console.log(campaign.name);
     * });
     */
    get(clubId: number, id: number, cache?: boolean): Promise<Campaign>;
    /**
     * Fetches a campaign and returns its data
     * @param {Number} clubId The club Id that the campaign belongs to
     * @param {String} id The campaign Id
     * @param {Boolean} cache Whether to cache the campaign or not
     * @returns {Campaign} The campaign
     * @private
     */
    private _fetch;
}
import Client = require("../client/Client");
import Campaign = require("../structures/Campaign");
