var assert = require('assert');
var Trackmania = require('../')
const competitions = new Trackmania.Events()

describe('Competitions', function() {
    this.timeout(10*1000)

    it('Competitions list', async function() {
        var competition = await competitions.competition()
        assert.strictEqual(typeof competition, 'object', 'It returns an ' + typeof competition + ' insead of an object')
    });

    it('Search competition', async function() {
        var competition = await competitions.searchCompetitions('OGL')
        assert.strictEqual(typeof competition, 'object', 'It returns an ' + typeof competition + ' insead of an object')
    });

    it('Competition info', async function() {
        var competition = await competitions.competition(191)
        assert.strictEqual(typeof competition, 'object', 'It returns an ' + typeof competition + ' insead of an object')
        assert.strictEqual(competition.liveid, "LID-COMP-gk4lm0rk0jomlut", "The Live ID is incorrect")
        assert.strictEqual(competition.name, "OGL Winter 2021", "The Name is incorrect")
        assert.strictEqual(competition.rounds.length, 6, "The rounds length is incorrect")
        assert.strictEqual(competition.leaderboardid, 769, "The leaderboard ID is incorrect")
    });
});