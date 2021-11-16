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

        it("Hylis", async function(){
            const player = await Client.players.get("hylis");
            assert.equal(player.id, "2232c721-f215-4036-b28b-772eee46632c", "Wrong account ID");
        });

        it("Miss", async function(){
            const player = await Client.players.get("miss");
            assert.equal(player.id, "7398eeb6-9b4e-44b8-a7a1-a2149955ac70", "Wrong account ID");
        });
    });
});