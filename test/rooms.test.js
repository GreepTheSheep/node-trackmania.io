require('dotenv').config();
const assert = require('assert'),
    TMIO = require('../'),
    tmioClient = new TMIO.Client({dev: true});

describe("Rooms", function(){
    this.timeout(15*1000);

    it("Dedicated", async function(){
        const room = await tmioClient.rooms.get(41, 769);

        assert.equal(room.isCloud, false);
        assert.equal(room.region, null);
        assert.equal(room.login, "evoiceb");
    });

    it("Hosted Room", async function(){
        const room = await tmioClient.rooms.get(15, 1476);

        assert.equal(room.isCloud, true);
        assert.equal(room.region, "eu-west");
        assert.equal(room.login, null);
    });
});