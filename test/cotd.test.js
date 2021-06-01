const { doesNotMatch } = require('assert');
var assert = require('assert');
var Trackmania = require('../')
const cotd = new Trackmania.COTD({listener:false})

describe('Cup Of The Day', function() {
    this.timeout(10*1000)

    it('Latest COTDs', async function() {
        var theCOTD = await cotd.latestCOTDs()
        assert.strictEqual(typeof theCOTD, 'object', 'It returns an ' + typeof theCOTD + ' insead of an object')
    });

    it('Latest COTD info', async function() {
        var theCOTD = await cotd.latestCOTD()
        assert.strictEqual(typeof theCOTD, 'object', 'It returns an ' + typeof theCOTD + ' insead of an object')
    });

    it('Latest COTD Challenge Info', async function() {
        var theCOTD = await cotd.latestCOTDChallenge()
        assert.strictEqual(typeof theCOTD, 'object', 'It returns an ' + typeof theCOTD + ' insead of an object')
    });

    it('Latest COTD Challenge Results', async function() {
        var theCOTD = await cotd.latestCOTDChallengeResults()
        assert.strictEqual(typeof theCOTD, 'object', 'It returns an ' + typeof theCOTD + ' insead of an object')
    });

    it('Latest COTD Results', async function() {
        var theCOTD = await cotd.latestCOTDResults()
        if (theCOTD == undefined) done();
        assert.strictEqual(typeof theCOTD, 'object', 'It returns an ' + typeof theCOTD + ' insead of an object')
    });

    it('COTD Info', async function() {
        var theCOTD = await cotd.COTD(398)
        assert.strictEqual(typeof theCOTD, 'object', 'It returns an ' + typeof theCOTD + ' insead of an object')
        assert.strictEqual(theCOTD.liveid, "LID-COMP-tbxazgv2ot34qtp", "The Live ID is not correct")
        assert.strictEqual(theCOTD.rounds[0].matches.length, 32, "The matches number is not correct")
        assert.strictEqual(theCOTD.leaderboardid, 1320, "The leaderboard ID is not correct")
    });

    it('COTD Challenge Info', async function() {
        var theCOTD = await cotd.COTDChallenge(398)
        assert.strictEqual(typeof theCOTD, 'object', 'It returns an ' + typeof theCOTD + ' insead of an object')
        assert.strictEqual(theCOTD.maps[0].filename, "Viridi Gramina.Map.Gbx", "The filename is not correct")
        assert.strictEqual(theCOTD.maps[0].mapUid, "OigEg1_WXbL6KNbtRg40kC2qra2", "The map UID is not correct")
        assert.strictEqual(theCOTD.maps[0].exchangeid, 27738, "The TMX ID is not correct")
    });

    it('COTD Challenge Results', async function() {
        var theCOTD = await cotd.COTDChallengeResults(398, 2)
        assert.strictEqual(typeof theCOTD, 'object', 'It returns an ' + typeof theCOTD + ' insead of an object')
        assert.strictEqual(theCOTD[0].accountid, "a90404b4-7217-4f78-8891-135da2b442b2", "The account ID of Ice-TM is not correct")
        assert.strictEqual(theCOTD[0].score, 46018, "The score of Ice-TM is not correct")
        assert.strictEqual(theCOTD[0].position, 31, "The position of Ice-TM is not correct")
    });

    it('Player COTD Results', async function() {
        var theCOTD = await cotd.playerResults('26d9a7de-4067-4926-9d93-2fe62cd869fc')
        assert.strictEqual(typeof theCOTD, 'object', 'It returns an ' + typeof theCOTD + ' insead of an object')
    });
});