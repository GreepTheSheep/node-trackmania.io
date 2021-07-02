const f = require('../functions')
const url = require('../httpOptions')

/**
 * Gets the leaderboard
 * @param {string} mapUid The Map UID
 * @param {number} from Displays the top 15 from the time in milliseconds. Takes the top 1 to 15 if nothing
 * @param {boolean} format Defaults to true, removes chat formatting codes
 * @returns {array} The list of tops
 */
async function leaderboard(mapUid, from = 0, format = true){
    var leaderboard = await f.getData.page(url.tabs.leaderboard, 'map/' + mapUid + '?from=' + from)

    var i = 0
    leaderboard.tops.forEach(e=>{
        Object.entries(e).forEach(entry => {
            const [key, value] = entry;

            if (key == 'url') leaderboard.tops[i][key] = `${url.protocol}://${url.host}${value}`
            else leaderboard.tops[i][key] = value
        });
        
        if (format){
            Object.entries(e.player).forEach(entry => {
                const [key, value] = entry;
    
                if (key == 'tag') leaderboard.tops[i].player[key] = f.stripFormatting(value)
                else leaderboard.tops[i].player[key] = value
            });
        }
       i++
    })
    return leaderboard.tops
}

module.exports = leaderboard