require('dotenv').config();
const assert = require('assert'),
    TMIO = require('../'),
    tmioClient = new TMIO.Client({dev: true});

describe("Clubs", function(){
    this.timeout(15*1000);

    it("Search clubs", async function(){
        const results = await tmioClient.clubs.search("Openplanet");
        assert.equal(results.length > 0, true);
        assert.equal(results.some(c=>c.id == 9), true);
    });

    it("Club Info", async function(){
        const club = await tmioClient.clubs.get(23500),
            creator = await club.creator();
        
        assert.equal(creator.id, "26d9a7de-4067-4926-9d93-2fe62cd869fc");
        assert.equal(club.createdAt.getTime(), 1614627947000);
    });

    it("Club Members", async function(){
        const club = await tmioClient.clubs.get(54),
            members = await club.fetchMembers();

        assert.equal(members.length > 0, true);
        assert.equal(members[0].isCreator, true);
    });
});