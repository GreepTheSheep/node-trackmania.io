var assert = require('assert');
var Trackmania = require('../')
const mm = new Trackmania.Matchmaking({listener:false})

describe('Matchmaking', function() {
    this.timeout(10*1000)

    it('Ranking list - 3v3', async function() {
        var ranks = await mm.ranking("3v3")
        assert.strictEqual(typeof ranks, 'object', 'It returns an ' + typeof ranks + ' insead of an object')
    });

    it('Ranking list - Royal', async function() {
        var ranks = await mm.ranking("Royal")
        assert.strictEqual(typeof ranks, 'object', 'It returns an ' + typeof ranks + ' insead of an object')
    });

    it('Ranking list - Trophies', async function() {
        var ranks = await mm.trophiesRanking()
        assert.strictEqual(typeof ranks, 'object', 'It returns an ' + typeof ranks + ' insead of an object')
    });
});