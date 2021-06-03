var assert = require('assert');
var Trackmania = require('../')
const matches = new Trackmania.Matches({listener:false})

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

describe('Matches', async function() {
    this.timeout(10*1000)

    var matchesList = await matches.matches()

    it('Matches list', async function() {
        assert.strictEqual(typeof matchesList, 'object', 'It returns an ' + typeof matchesList + ' insead of an object')
    });

    it('Match info', async function() {
        var match = await matches.match(randomItem(matchesList).lid)
        assert.strictEqual(typeof match, 'object', 'It returns an ' + typeof match + ' insead of an object')
        assert.strictEqual(match.group, "matchmaking", "The group is incorrect")
    });
});