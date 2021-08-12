const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Campaign = require('../structures/Campaign');

class CampaignManager{
    constructor(client){
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager} 
         * @private
         */
        this._cache = new CacheManager(client, Campaign);
    }

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
    async get(clubId = 0, id, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(id)) {
            return this._cache.get(id);
        } else {
            return await this._fetch(clubId, id, cache);
        }
    }
        
    /**
     * Fetches a campaign and returns its data
     * @param {Number} clubId The club Id that the campaign belongs to
     * @param {String} id The campaign Id
     * @param {Boolean} cache Whether to cache the campaign or not
     * @returns {Campaign} The campaign
     * @private
     */
    async _fetch(clubId, id, cache = this.client.options.cache.enabled){
        let campaign, res;
        if (clubId == 0) {
            // Official campaign
            campaign = this.client.options.api.paths.tmio.tabs.officialCampaign;
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${campaign}/${id}`);
        } else {
            // Club campaign
            campaign = this.client.options.api.paths.tmio.tabs.campaign;
            res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${campaign}/${clubId}/${id}`);
        }

        const theCampaign = new Campaign(this.client, res);
        if (cache) {
            res._cachedTimestamp = Date.now();
            
            this._cache.set(res.id, theCampaign);
        }
        return theCampaign;
    }
}

module.exports = CampaignManager;