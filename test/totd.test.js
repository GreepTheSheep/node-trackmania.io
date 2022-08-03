require('dotenv').config();
const assert = require('assert'),
    {DateTime} = require('luxon'),
    TMIO = require('../'),
    tmioClient = new TMIO.Client({dev: true});

describe("TOTD", function(){
    this.timeout(15*1000);

    it("TOTD info - Plinko - 2021-04-01", async function(){
        const date = new Date(new Date().setFullYear(2021, 3, 1)),
            totd = await tmioClient.totd.get(date),
            map = await totd.map(),
            author = await map.author();

        assert.equal(totd.leaderboardId, "bf597bc1-a8c9-4dfa-9ae9-40a3a5e4a0bf");
        assert.equal(totd.campaignId, 8383);
        assert.equal(map.uid, "17B5XtQBJ_nukdrylfT7Pj1q1C1");
        assert.equal(map.exchangeId, 23641);
        assert.equal(author.id, "62c59cd2-4981-43cc-a6d2-7feaf96ceeb1");
    });

    it("TOTD dates", async function(){
        const date = DateTime.local().setZone("Europe/Paris"),
            totd = await tmioClient.totd.get(date.toJSDate());

        assert.equal(totd.month, date.month);
        assert.equal(totd.year, date.year);
    });
});