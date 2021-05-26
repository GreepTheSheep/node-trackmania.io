var assert = require('assert');
var Trackmania = require('../')
const clubs = new Trackmania.Clubs({listener:false})

describe('Clubs', function() {
    this.timeout(10*1000)

    it('Popular clubs', async function() {
        var club = await clubs.clubs()
        assert.strictEqual(typeof club, 'object', 'It returns an ' + typeof club + ' insead of an object')
    });

    it('Latest clubs', async function() {
        var club = await clubs.latestClubs()
        assert.strictEqual(typeof club, 'object', 'It returns an ' + typeof club + ' insead of an object')
    });

    it('Search clubs', async function() {
        var club = await clubs.searchClubs('Yannex')
        assert.strictEqual(typeof club, 'object', 'It returns an ' + typeof club + ' insead of an object')
    });

    it('Club Info', async function() {
        var club = await clubs.club(54)
        assert.strictEqual(typeof club, 'object', 'It returns an ' + typeof club + ' insead of an object')
        assert.strictEqual(club.name, "ZeratoR", "This club is not ZeratoR, it's " + club.name)
        assert.strictEqual(club.tag, "ZT.", "This club tag is not ZT., it's " + club.tag)
    });
});