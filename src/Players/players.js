const f = require('../functions')
const url = require('../httpOptions')

class Players {
    /**
     * Gets the data of a player
     * @param {string} accountid The account ID or the Trackmania.io Vanity URL
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {object} The stats of the player
     */
    async player(accountid, format = true){
        var player = await f.getData.player.getPlayer(accountid)
        if (player.error) throw player.error

        if (player.meta && (player.meta.vanity && player.meta.vanity != "")){
            player['url'] = `${url.protocol}://${url.host}/#/${url.tabs.player}/${player.meta.vanity}`
        } else {
            player['url'] = `${url.protocol}://${url.host}/#/${url.tabs.player}/${player.accountid}`
        }

        if (player.trophies.echelon){
            var echelonNames = require('../_appendix_datas/echelonNames')
            echelonNames.reverse()
            echelonNames.forEach(echelon=>{
                if (player.trophies.echelon == echelon.echelon) player.trophies.echelon = echelon
            })
        }

        if (player.matchmaking.length > 0){
            var rankNames = require('../_appendix_datas/rankNames')

            if (player.matchmaking.some(m=>m.info.typename == '3v3')){
                // 3v3
                player.matchmaking.find(m=>m.info.typename == '3v3').info['place'] = player.matchmaking.find(m=>m.info.typename == '3v3').info['rank']
                for (let i = 0; i < rankNames['3v3'].length; i++) {
                    if (
                        player.matchmaking.find(m=>m.info.typename == '3v3').info.score >= rankNames['3v3'][i].startPts
                        && player.matchmaking.find(m=>m.info.typename == '3v3').info.score < rankNames['3v3'][i].endPts
                    )
                    player.matchmaking.find(m=>m.info.typename == '3v3').info['rank'] = rankNames['3v3'][i]
                }
            }

            if (player.matchmaking.some(m=>m.info.typename == 'Royal')){
                // Royal
                player.matchmaking.find(m=>m.info.typename == 'Royal').info['place'] = player.matchmaking.find(m=>m.info.typename == 'Royal').info['rank']
                for (let i = 0; i < rankNames.Royal.length; i++) {
                    if (
                        player.matchmaking.find(m=>m.info.typename == 'Royal').info.progression >= rankNames.Royal[i].startPts
                        && player.matchmaking.find(m=>m.info.typename == 'Royal').info.progression < rankNames.Royal[i].endPts
                    )
                    player.matchmaking.find(m=>m.info.typename == 'Royal').info['rank'] = rankNames.Royal[i]
                }
            }
        }

        if (format){
            Object.entries(player).forEach(entry => {
                const [key, value] = entry;

                if (key == 'clubtag') player[key] = f.stripFormatting(value)
                else player[key] = value
            });
        }

        return player
    }

    /**
     * Gets the last trophies gains of a player
     * @param {string} accountid The account ID or the Trackmania.io Vanity URL
     * @param {number} page The page number (defaults to 0), displays 25 items / page
     * @returns {array} The lastest trophies of the player
     */
    async playerTrophies(accountid, page = 0){
        var player = await f.getData.player.getPlayerTrophies(accountid, page)
        if (player.error) throw player.error
        return player.gains
    }

    /**
     * Gets the last matches infos of a player (MatchMaking)
     * @param {string} accountid The account ID or the Trackmania.io Vanity URL
     * @param {string} matchType The match Type, select between "3v3" or "Royal". Defaults to "3v3"
     * @param {number} page The page number (defaults to 0), displays 25 items / page
     * @returns {array} The lastest matches of the player
     */
     async playerMatches(accountid, matchType = "3v3", page = 0){
        var matchTypeID;
        if (matchType == "3v3") matchTypeID = 2;
        else if (matchType == "Royal") matchTypeID = 3; 
        var player = await f.getData.player.getPlayerMatches(accountid, matchTypeID, page)
        if (player.error) throw player.error
        return player.matches
    }

    /**
     * Search the players
     * @param {string} name The display name of the player
     * @returns {array} The possible results
     */
    async searchPlayer(name){
        return await f.getData.player.searchPlayer(name)
    }

    /**
     * Gets the players in a group
     * @param {string} group The group name: "Nadeo", "TMGL", (trackmania.io "Sponsor", "Team")
     * @returns {array} The possible results
     */
    async getGroupPlayers(group){
        return await f.getData.player.playersGroup(group.toLowerCase())
    }

    /**
     * Gets the last trophies gains of a player
     * @param {string} accountid The account ID
     * @returns {array} The lastest COTD results of this player
     */
    async COTDResults(accountId){
        var results = await f.getData.player.playerCOTD(accountId)
        if (!results) throw 'Invalid account ID.'

        return results.results.cotd.reverse()
    }
}

module.exports = Players