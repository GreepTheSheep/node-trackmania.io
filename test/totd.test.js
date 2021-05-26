var assert = require('assert');
var Trackmania = require('../')
const TOTD = new Trackmania.TOTD({listener:false})

describe('Track Of The Day', function() {
    this.timeout(10*1000)

    it('TOTD List', async function() {
        var theTOTD = await TOTD.totd()
        assert.strictEqual(typeof theTOTD, 'object', 'It returns an ' + typeof theTOTD + ' insead of an object')
    });
});