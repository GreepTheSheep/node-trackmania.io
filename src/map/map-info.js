const f = require('../functions')
const url = require('../httpOptions')

/**
 * Gets the map info
 * @param {string} mapUid The Map UID
 * @param {boolean} format Defaults to true, removes chat formatting codes
 * @returns {array} The map info
 */
async function map(mapUid, format = true){
    var map = await f.getData.page(url.tabs.map, mapUid)

    if (format){
        Object.entries(map).forEach(entry => {
            const [key, value] = entry;
    
            if (key == 'name') map[key] = f.stripFormatting(value)
            else map[key] = value
        });
        
        Object.entries(map.authorplayer).forEach(entry => {
            const [key, value] = entry;

            if (key == 'tag') map.authorplayer[key] = f.stripFormatting(value)
            else map.authorplayer[key] = value
        });

        Object.entries(map.submitterplayer).forEach(entry => {
            const [key, value] = entry;

            if (key == 'tag') map.submitterplayer[key] = f.stripFormatting(value)
            else map.submitterplayer[key] = value
        });
    }

    if (map.exchangeid != 0){
        delete map.exchangeid
        var tmxMap = await f.getData.TMXMapInfo(mapUid)
        map["exchange"] = tmxMap[0];
    }

    return map
}

module.exports = map