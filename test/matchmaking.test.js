var assert = require('assert');
var Trackmania = require('../')
const mm = new Trackmania.Matchmaking({listener:false})

describe('Matchmaking', function() {
    this.timeout(10*1000)

    it('Ranking list', async function() {
        var ranks = await mm.ranking()
        assert.strictEqual(typeof ranks, 'object', 'It returns an ' + typeof ranks + ' insead of an object')
    });
});