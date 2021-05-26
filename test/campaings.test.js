var assert = require('assert');
var Trackmania = require('../')
const campaigns = new Trackmania.Campaigns({listener:false})

describe('Campaigns', function() {
    this.timeout(10*1000)

    it('Popular campaigns', async function() {
        var campaign = await campaigns.campaigns()
        assert.strictEqual(typeof campaign, 'object', 'It returns an ' + typeof campaign + ' insead of an object')
    });

    it('Latest campaigns', async function() {
        var campaign = await campaigns.latestCampaigns()
        assert.strictEqual(typeof campaign, 'object', 'It returns an ' + typeof campaign + ' insead of an object')
    });

    it('Club campaign', async function() {
        var campaign = await campaigns.campaign(10,25)
        assert.strictEqual(typeof campaign, 'object', 'It returns an ' + typeof campaign + ' insead of an object')
        assert.strictEqual(campaign.name, "MrLag's Collection", "This campaign is not MrLag's Collection, it's " + campaign.name)
        assert.strictEqual(campaign.leaderboarduid, "NLS-mKwyfRyFgiEMJk7Z4d4J7M4VGQ0rRgSOgrk", "This campaign has a different leaderboard ID")
    });

    it('Official campaign', async function() {
        var campaign = await campaigns.officialCampaign(8449)
        assert.strictEqual(typeof campaign, 'object', 'It returns an ' + typeof campaign + ' insead of an object')
        assert.strictEqual(campaign.name, "Spring 2021", "This campaign is not Spring 2021, it's " + campaign.name)
        assert.strictEqual(campaign.playlist.length, 25, "This campaign has " + campaign.playlist.length + " maps on it")
        assert.strictEqual(campaign.leaderboarduid, "3399c5d2-5baf-45c6-9977-1bd2da745c32", "This campaign has a different leaderboard ID")
    });

    it('Search campaigns', async function() {
        var campaign = await campaigns.searchCampaigns('Tona')
        assert.strictEqual(typeof campaign, 'object', 'It returns an ' + typeof campaign + ' insead of an object')
    });
});