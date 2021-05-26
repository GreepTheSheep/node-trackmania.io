var assert = require('assert');
var Trackmania = require('../')
const news = new Trackmania.News({listener:false})

describe('News', function() {
    this.timeout(10*1000)

    it('News list', async function() {
        var newsList = await news.news()
        assert.strictEqual(typeof newsList, 'object', 'It returns an ' + typeof newsList + ' insead of an object')
    });
});