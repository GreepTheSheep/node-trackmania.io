const ReqUtil = require('../util/ReqUtil');
const CacheManager = require('./CacheManager');
const Campaign = require('../structures/Campaign');
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars


/**
 * Represents a manager for campaigns.
 */
class CampaignManager{
    constructor(client){
        /**
         * The client instance.
         * @type {Client}
         * @readonly
         */
        this.client = client;

        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        this._cache = new CacheManager(this.client, this, Campaign);
    }

    /**
     * Get the current official campaign
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to use from the cache or not
     * @returns {Promise<Campaign>} The campaign
     */
    async currentSeason(cache = this.client.options.cache.enabled){
        const campaigns = this.client.options.api.paths.tmio.tabs.campaigns,
            searchRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${campaigns}/0`),
            campaignId = searchRes.campaigns[0].id;

        if (cache && this._cache.has(campaignId)){
            return this._cache.get(campaignId);
        } else {
            return await this._fetch(0, campaignId, cache);
        }
    }

    /**
     * Get all official campaigns from recent to old
     * @returns {Promise<Array<CampaignSearchResult>>} The campaigns
     */
    async officialCampaigns(){
        const campaigns = this.client.options.api.paths.tmio.tabs.campaigns,
            searchRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${campaigns}/0`);

        let arr = [];
        for (const campaign of searchRes.campaigns) {
            if (campaign.clubid != 0) break;

            arr.push(new CampaignSearchResult(this.client, campaign));
        }
        return arr;
    }

    /**
     * Get all popular campaigns (official excluded) (50 items / page)
     * @param {number} [page=0] The page number
     * @returns {Promise<Array<CampaignSearchResult>>} The campaigns
     */
    async popularCampaigns(page = 0){
        const campaigns = this.client.options.api.paths.tmio.tabs.campaigns,
            searchRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${campaigns}/${page}`);

        let arr = [];
        for (const campaign of searchRes.campaigns) {
            if (campaign.clubid == 0) continue;

            arr.push(new CampaignSearchResult(this.client, campaign));
        }
        return arr;
    }

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
    async search(query, page = 0){
        const campaigns = this.client.options.api.paths.tmio.tabs.campaigns,
            searchRes = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${campaigns}/${page}?search=${query}`);

        let arr = [];
        for (const campaign of searchRes.campaigns) {
            arr.push(new CampaignSearchResult(this.client, campaign));
        }
        return arr;
    }

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
    async get(clubId, id, cache = this.client.options.cache.enabled){
        if (cache && this._cache.has(id)) {
            return this._cache.get(id);
        } else {
            return await this._fetch(clubId, id, cache);
        }
    }

    /**
     * Fetches a campaign and returns its data
     * @param {number} clubId The club Id that the campaign belongs to
     * @param {string} id The campaign Id
     * @param {boolean} [cache=this.client.options.cache.enabled] Whether to cache the campaign or not
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

/**
 * The result of a campaign search. It is completely different from the {@link Campaign} object.
 */
class CampaignSearchResult {
    constructor(client, data){
        /**
         * The client instance
         * @type {Client}
         */
        this.client = client;

        /**
         * The campaign's ID
         * @type {number}
         */
        this.id = data.id;

        /**
         * The campaign's Club ID
         * @type {number}
         */
        this.clubId = data.clubid;

        /**
         * The campaign's name
         * @type {string}
         */
        this.name = data.name;

        /**
         * The campaign's creation date
         * @type {Date}
         */
        this.date = new Date(data.timestamp * 1000);

        /**
         * The campaign's map count
         * @type {number}
         */
        this.mapCount = data.mapcount;
    }

    /**
     * Return to the Campaign Object
     * @returns {Promise<Campaign>}
     */
    async getCampaign(){
        const campaign = await this.client.campaigns.get(this.clubId, this.id);
        return campaign;
    }
}

module.exports = CampaignManager;