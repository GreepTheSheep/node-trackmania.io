const f = require('../functions')
const url = require('../httpOptions')

/**
 * Gets the map info
 * @param {string} mapUid The Map UID
 * @returns {array} The map info
 */
async function map(mapUid){
    var map = await f.getData.page(url.tabs.map, mapUid)

    Object.entries(map).forEach(entry => {
        const [key, value] = entry;

        if (key == 'name') map[key] = f.stripFormatting(value)
        else map[key] = value
    });

    return map
}

module.exports = map