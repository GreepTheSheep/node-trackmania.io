require('dotenv').config();
const assert = require('assert'),
    TMIO = require('../'),
    tmioClient = new TMIO.Client({dev: true});

describe("Players", function(){
    this.timeout(15*1000);

    describe("Player info", function(){
        it("Greep", async function(){
            const player = await tmioClient.players.get("greep");
            assert.equal(player.id, "26d9a7de-4067-4926-9d93-2fe62cd869fc", "Wrong account ID");
            assert.equal(player.meta.inNadeo, false);
            assert.equal(player.meta.inTMIOTeam, false);
        });

        it("Hylis", async function(){
            const player = await tmioClient.players.get("hylis");
            assert.equal(player.id, "2232c721-f215-4036-b28b-772eee46632c", "Wrong account ID");
            assert.equal(player.meta.inNadeo, true);
            assert.equal(player.meta.inTMIOTeam, false);
        });

        it("Miss", async function(){
            const player = await tmioClient.players.get("miss");
            assert.equal(player.id, "7398eeb6-9b4e-44b8-a7a1-a2149955ac70", "Wrong account ID");
            assert.equal(player.meta.inNadeo, false);
            assert.equal(player.meta.inTMIOTeam, true);
        });

        it("Gwen", async function(){
            const player = await tmioClient.players.get("gwen");
            assert.equal(player.id, "dba55c7e-d5cd-40c0-a5e7-8e793fd295eb", "Wrong account ID");
            assert.equal(player.meta.inTMGL, true);
            assert.equal(player.meta.inTMIOTeam, false);
        })
    });

    describe("Player search", function(){
        it("Test 1", async function(){
            const results = await tmioClient.players.search("usefiujnskxdfhousdhfjefojsd");
            assert.equal(results.length, 0);
        });

        it("Test 2", async function(){
            const results = await tmioClient.players.search("greep");
            assert.equal(results.length > 0, true);
            assert.equal(results[0].id, "26d9a7de-4067-4926-9d93-2fe62cd869fc");
        });
    });

    describe("Player groups", function(){
        it("Nadeo", async function(){
            const group = await tmioClient.players.group("nadeo");
            assert.equal(group.some(p=>p.id == "2232c721-f215-4036-b28b-772eee46632c"), true, "Hylis not found");
            assert.equal(group.some(p=>p.id == "a76653e1-998a-4c53-8a91-0a396e15bfb5"), true, "Darrek not found");
        });

        it("Team", async function(){
            const group = await tmioClient.players.group("team");
            assert.equal(group.some(p=>p.id == "7398eeb6-9b4e-44b8-a7a1-a2149955ac70"), true, "Miss not found");
            assert.equal(group.some(p=>p.id == "5b4d42f4-c2de-407d-b367-cbff3fe817bc"), true, "tooInfinite not found");
        });
    });
});