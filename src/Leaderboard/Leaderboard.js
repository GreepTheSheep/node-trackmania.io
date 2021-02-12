const f = require('../functions')
const url = require('../httpOptions')

/**
 * Gets the leaderboard
 * @param {string} mapId The Map ID
 * @returns {array} The list of tops
 */
async function leaderboard(mapId){
    var leaderboard = await f.getData.page(url.tabs.leaderboard, 'map/' + mapId)

    leaderboard.tops.forEach(e=>{
        Object.entries(e).forEach(entry => {
            const [key, value] = entry;

            if (key == 'url') e[key] = `${url.protocol}://${url.host}${value}`
            else e[key] = value
        });
    })
    return leaderboard.tops
}

module.exports = leaderboard