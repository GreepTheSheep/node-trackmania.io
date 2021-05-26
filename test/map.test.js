var assert = require('assert');
var Trackmania = require('../')

describe('Maps', function() {
    this.timeout(10*1000)

    it('Map info', async function() {
        var map = await Trackmania.map("Qj4WKBMN9BeZ1cSnMHj8ilhVMN9")
        assert.strictEqual(typeof map, 'object', 'It returns an ' + typeof map + ' insead of an object')
        assert.strictEqual(map.name, "Grip City", "The name is invalid")
        assert.strictEqual(map.author, "81a06c80-9604-482d-af29-7046d91c31ba", "The author is invalid")
    });

    it('Map leaderboard', async function() {
        var map = await Trackmania.leaderboard("Qj4WKBMN9BeZ1cSnMHj8ilhVMN9")
        var map2 = await Trackmania.leaderboard("Qj4WKBMN9BeZ1cSnMHj8ilhVMN9", map[map.length - 1].time)
        assert.strictEqual(typeof map, 'object', 'Page 1 - It returns an ' + typeof map + ' insead of an object')
        assert.strictEqual(typeof map2, 'object', 'Page 2 - It returns an ' + typeof map2 + ' insead of an object')
    });
});