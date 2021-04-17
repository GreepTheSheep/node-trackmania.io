const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')

class Campaigns extends EventEmitter {
    constructor(options = {
        listener: false
    }){
        super()

        if (options.listener) this._listener()
    }

    /**
     * Gets the populars campaigns
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {object} The list of campaigns
     */
    async campaigns(format = true){
        var campaigns = await f.getData.simple(url.tabs.campaigns)

        if (!format) return campaigns.campaigns
        else {
            var cpns_tmp = []
            campaigns.campaigns.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                cpns_tmp.push(e)
            })
            campaigns.campaigns = cpns_tmp
            return campaigns
        }
    }

    /**
     * Gets the latest campaigns
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {object} The list of campaigns
     */
    async latestCampaigns(format = true){
        var campaigns = await f.getData.page(url.tabs.campaigns, '0?sort=date')

        if (!format) return campaigns.campaigns
        else {
            var cpns_tmp = []
            campaigns.campaigns.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                cpns_tmp.push(e)
            })
            campaigns.campaigns = cpns_tmp
            return campaigns
        }
    }

    /**
     * Search a campaign
     * @param {string} search The campaign to search
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {object} The list of campaigns
     */
    async searchCampaigns(search, format = true){
        var campaigns = await f.getData.page(url.tabs.campaigns, '0?search=' + search.replace(' ', "%20"))

        if (!format) return campaigns.campaigns
        else {
            var cpns_tmp = []
            campaigns.campaigns.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                cpns_tmp.push(e)
            })
            campaigns.campaigns = cpns_tmp
            return campaigns
        }
    }

    /**
     * Gets the campaign
     * @param {number} clubId The Club ID
     * @param {number} campaignId The Campaign ID
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {object} The list of maps of this campaign
     */
    async campaign(clubId, campaignId, format = true){
        var campaigns = await f.getData.page(url.tabs.campaign, `${clubId}/${campaignId}`)

        if (!format) return campaigns
        else {
            var cpns_tmp = []
            campaigns.name = f.stripFormatting(campaigns.name)
            campaigns.playlist.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                cpns_tmp.push(e)
            })
            campaigns.playlist = cpns_tmp
            return campaigns
        }
    }

    /**
     * Gets the leaderboard of a campaign
     * @param {object} campaign The Campaign from campaign()
     * @returns {object} The list of maps of this campaign
     */
     async leaderboard(campaign){
        return await f.getData.page(url.tabs.leaderboard, campaign.leaderboarduid)
    }

    /**
     * Enables the listener module
     * @private
     */
    async _listener(){
        this.emit('debug', 'Listener started, awaiting new campaigns every 30 seconds')
        var cpns1 = await this.latestCampaigns()

        setInterval(async ()=>{
            this.emit('debug', 'Listener checking...')
            var cpns2 = await this.latestCampaigns()
            if (cpns1.campaigns[0].id != cpns2.campaigns[0].id) this.emit('new-campaign', cpns2.campaigns[0])
            cpns1 = cpns2
        }, 30000)
    }
}

module.exports = Campaigns