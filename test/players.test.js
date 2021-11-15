require('dotenv').config();
const assert = require('assert'),
    TMIO = require('../'),
    Client = new TMIO.Client();

Client.setAPIKey(process.env.TMIO_API);

describe("Players", function(){
    this.timeout(15*1000);

    describe("Player info", function(){
        it("Greep", async function(){
            const player = await Client.players.get("greep");
            assert.equal(player.id, "26d9a7de-4067-4926-9d93-2fe62cd869fc", "Wrong account ID");
            assert.equal(player.zone[0].name, "Yonne");
        });
    });
});