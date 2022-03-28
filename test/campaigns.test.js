require('dotenv').config();
const assert = require('assert'),
    TMIO = require('../'),
    tmioClient = new TMIO.Client({dev: true});

describe("Campaigns", function(){
    this.timeout(15*1000);

    describe("Official campaign", function(){

        it("Current season is official", async function(){
            const currentSeason = await tmioClient.campaigns.currentSeason();

            assert.equal(currentSeason.isOfficial, true);
        });

        it("Fall 2020", async function(){
            const campaigns = await tmioClient.campaigns.officialCampaigns();
            const campaign = await campaigns.find(c=>c.id == 4791).getCampaign();

            assert.equal(campaigns.find(c=>c.id == 4791).mapCount, 25);
            assert.equal(campaign.isOfficial, true);
        });
    });

    it("Club campaign", async function(){
        const campaign = await tmioClient.campaigns.get(10, 25);

        assert.equal(campaign.isOfficial, false);
    });
});