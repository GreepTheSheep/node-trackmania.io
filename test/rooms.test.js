var assert = require('assert');
var Trackmania = require('../')
const rooms = new Trackmania.Rooms({listener:false})

describe('Rooms', function() {
    this.timeout(10*1000)

    it('Popular rooms', async function() {
        var room = await rooms.rooms()
        assert.strictEqual(typeof room, 'object', 'It returns an ' + typeof room + ' insead of an object')
    });

    it('Latest rooms', async function() {
        var room = await rooms.latestRooms()
        assert.strictEqual(typeof room, 'object', 'It returns an ' + typeof room + ' insead of an object')
    });

    describe('Club rooms', function(){
        it('Test 1 - Dedicated', async function() {
            var room = await rooms.room(41,766)
            assert.strictEqual(typeof room, 'object', 'It returns an ' + typeof room + ' insead of an object')
            assert.strictEqual(room.name, "Evo Fullspeed Beg", "This room is not Evo Fullspeed Beg, it's " + room.name)
            assert.strictEqual(room.nadeo, false, "This room has an invalid Nadeo hosting")
            assert.strictEqual(room.login, "evofsb", "This room has an invalid login")
        });

        it('Test 2 - Nadeo hosted', async function() {
            var room = await rooms.room(514,96949)
            assert.strictEqual(typeof room, 'object', 'It returns an ' + typeof room + ' insead of an object')
            assert.strictEqual(room.name, "RPG Adventures", "This room is not RPG Adventures, it's " + room.name)
            assert.strictEqual(room.nadeo, true, "This room has an invalid Nadeo hosting")
            assert.strictEqual(room.login, "", "This room has an invalid login")
            assert.strictEqual(room.region, "eu-west", "This room has an invalid region")
        });
    })

    it('Search rooms', async function() {
        var room = await rooms.searchRooms('tech')
        assert.strictEqual(typeof room, 'object', 'It returns an ' + typeof room + ' insead of an object')
    });
});