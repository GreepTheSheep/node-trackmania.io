var assert = require('assert');
var Trackmania = require('../')
const players = new Trackmania.Players()

describe('Players', function() {
    this.timeout(10*1000)

    describe('Player Info', function(){
        it('Test 1 - Greep', async function() {
            var player = await players.player('greep')
            assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
            assert.strictEqual(player.accountid, "26d9a7de-4067-4926-9d93-2fe62cd869fc", "The account ID is invalid")
            assert.strictEqual(player.meta.team, false, "The meta is invalid")
            assert.strictEqual(player.meta.tmgl, false, "The meta is invalid")
            assert.strictEqual(player.meta.nadeo, false, "The meta is invalid")
        });
    
        it('Test 2 - Miss', async function() {
            var player = await players.player('miss')
            assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
            assert.strictEqual(player.accountid, "7398eeb6-9b4e-44b8-a7a1-a2149955ac70", "The account ID is invalid")
            assert.strictEqual(player.meta.team, true, "The meta is invalid")
            assert.strictEqual(player.meta.tmgl, false, "The meta is invalid")
            assert.strictEqual(player.meta.nadeo, false, "The meta is invalid")
        });
    
        it('Test 3 - Gwen', async function() {
            var player = await players.player('gwen')
            assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
            assert.strictEqual(player.accountid, "dba55c7e-d5cd-40c0-a5e7-8e793fd295eb", "The account ID is invalid")
            assert.strictEqual(player.meta.team, false, "The meta is invalid")
            assert.strictEqual(player.meta.tmgl, true, "The meta is invalid")
            assert.strictEqual(player.meta.nadeo, false, "The meta is invalid")
        });
    
        it('Test 4 - Hylis', async function() {
            var player = await players.player('hylis')
            assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
            assert.strictEqual(player.accountid, "2232c721-f215-4036-b28b-772eee46632c", "The account ID is invalid")
            assert.strictEqual(player.meta.team, false, "The meta is invalid")
            assert.strictEqual(player.meta.tmgl, false, "The meta is invalid")
            assert.strictEqual(player.meta.nadeo, true, "The meta is invalid")
        });
    });

    describe('Player search', function(){
        it('Test 1', async function() {
            var player = await players.searchPlayer('hkgjgfhdgrtfjygj')
            assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
            assert.strictEqual(player.length, 0, "The result length is invalid")
        });

        it('Test 2', async function() {
            var player = await players.searchPlayer('greep')
            assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
            assert.strictEqual(player.length >= 1, true, "The result length is invalid")
        });
    });

    describe('Player groups', function(){
        it('Test 1 - Nadeo', async function() {
            var player = await players.getGroupPlayers("Nadeo")
            assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
            assert.strictEqual(player.length, 21, "The result length is invalid")
        });

        it('Test 2 - Openplanet Team', async function() {
            var player = await players.getGroupPlayers("team")
            assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
            assert.strictEqual(player.length, 4, "The result length is invalid")
        });
    });

    it('Player trophies', async function() {
        var player = await players.playerTrophies("26d9a7de-4067-4926-9d93-2fe62cd869fc")
        assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
    });

    it('Player matches', async function() {
        var player = await players.playerMatches("26d9a7de-4067-4926-9d93-2fe62cd869fc")
        assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
    });

    it('Player COTD Results', async function() {
        var player = await players.COTDResults("26d9a7de-4067-4926-9d93-2fe62cd869fc")
        assert.strictEqual(typeof player, 'object', 'It returns an ' + typeof player + ' insead of an object')
    });
});