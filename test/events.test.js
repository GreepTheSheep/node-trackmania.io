require('dotenv').config();
const assert = require('assert'),
    TMIO = require('../'),
    tmioClient = new TMIO.Client({dev: true});

describe("Events", function(){
    this.timeout(15*1000);

    it("Competition info", async function(){
        const comp = await tmioClient.events.get(1165);

        assert.equal(comp.name, "TMGL Fall 2021");
        assert.equal(comp.liveId, "LID-COMP-2ess1ztbj42pefb");
    });
});