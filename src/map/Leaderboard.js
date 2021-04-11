const f = require('../functions')
const url = require('../httpOptions')

/**
 * Gets the leaderboard
 * @param {string} mapUid The Map UID
 * @param {number} from Displays the top 15 from the time in milliseconds. Takes the top 1 to 15 if nothing
 * @returns {array} The list of tops
 */
async function leaderboard(mapUid, from = 0){
    var leaderboard = await f.getData.page(url.tabs.leaderboard, 'map/' + mapUid + '?from=' + from)

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