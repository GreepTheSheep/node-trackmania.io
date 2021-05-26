var assert = require('assert');
var Trackmania = require('../')
const matches = new Trackmania.Matches({listener:false})

describe('Matches', function() {
    this.timeout(10*1000)

    it('Matches list', async function() {
        var match = await matches.matches()
        assert.strictEqual(typeof match, 'object', 'It returns an ' + typeof match + ' insead of an object')
    });

    it('Match info', async function() {
        var match = await matches.match("LID-MTCH-dqy33e0shqrjfro")
        assert.strictEqual(typeof match, 'object', 'It returns an ' + typeof match + ' insead of an object')
        assert.strictEqual(match.group, "matchmaking", "The group is incorrect")
    });
});