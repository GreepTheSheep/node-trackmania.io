require('dotenv').config();
const assert = require('assert'),
    TMIO = require('../'),
    tmioClient = new TMIO.Client({dev: true});

describe("Maps", function(){
    this.timeout(15*1000);

    it("Map Info", async function(){
        const map = await tmioClient.maps.get('1jEeZQTADlb9wIY2YzCjZ5Lpmxh');
        const author = await map.author();
        const exchange = await map.exchange();

        assert.equal(author.login, "Jtmn3kBnSSadky_mLNhp_A");
        assert.equal(map.medalTimes.author, 11216);
        assert.equal(map.medalTimes.gold, 12000);
        assert.equal(map.medalTimes.silver, 14000);
        assert.equal(map.medalTimes.bronze, 17000);

        assert.equal(exchange.id, 41427);
    });
});