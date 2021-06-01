const f = require('../functions')
const url = require('../httpOptions')

class Players {
    /**
     * Gets the data of a player
     * @param {string} accountid The account ID or the Trackmania.io Vanity URL
     * @returns {object} The stats of the player
     */
    async player(accountid){
        var player = await f.getData.player.getPlayer(accountid)
        if (player.error) throw player.error

        if (player.meta && player.meta.vanity != ""){
            player['url'] = `${url.protocol}://${url.host}/#/${url.tabs.player}/${player.meta.vanity}`
        } else {
            player['url'] = `${url.protocol}://${url.host}/#/${url.tabs.player}/${player.accountid}`
        }

        if (player.trophies.echelon){
            var echelonNames = [
                {
                    name: 'Bronze 1',
                    echelon: 1
                },
                {
                    name: 'Bronze 2',
                    echelon: 2
                },
                {
                    name: 'Bronze 3',
                    echelon: 3
                },
                {
                    name: 'Silver 1',
                    echelon: 4
                },
                {
                    name: 'Silver 2',
                    echelon: 5
                },
                {
                    name: 'Silver 3',
                    echelon: 6
                },
                {
                    name: 'Gold 1',
                    echelon: 7
                },
                {
                    name: 'Gold 2',
                    echelon: 8
                },
                {
                    name: 'Gold 3',
                    echelon: 9
                }
            ]
            echelonNames.reverse()
            echelonNames.forEach(echelon=>{
                if (player.trophies.echelon == echelon.echelon) player.trophies.echelonName = echelon.name
            })
        }

        if (player.matchmaking.length > 0){
            var rankNames = [
                {
                    "name": "Bronze 1",
                    "abbr": "B1",
                    "before": 300
                },
                {
                    "name": "Bronze 2",
                    "abbr": "B2",
                    "before": 600
                },
                {
                    "name": "Bronze 3",
                    "abbr": "B3",
                    "before": 1000
                },
                {
                    "name": "Silver 1",
                    "abbr": "S1",
                    "before": 1300
                },
                {
                    "name": "Silver 2",
                    "abbr": "S2",
                    "before": 1600
                },
                {
                    "name": "Silver 3",
                    "abbr": "S3",
                    "before": 2000
                },
                {
                    "name": "Gold 1",
                    "abbr": "G1",
                    "before": 2300
                },
                {
                    "name": "Gold 2",
                    "abbr": "G2",
                    "before": 2600
                },
                {
                    "name": "Gold 3",
                    "abbr": "G3",
                    "before": 3000
                },
                {
                    "name": "Master 1",
                    "abbr": "M1",
                    "before": 3300
                },
                {
                    "name": "Master 2",
                    "abbr": "M2",
                    "before": 3600
                },
                {
                    "name": "Master 3",
                    "abbr": "M3",
                    "before": 4000
                },
                {
                    "name": "Trackmaster",
                    "abbr": "TM",
                    "before": Infinity
                }
            ]
            rankNames.reverse()
            player.matchmaking.find(m=>m.info.typename == '3v3').info['place'] = player.matchmaking.find(m=>m.info.typename == '3v3').info['rank']
            rankNames.forEach(rank=>{
                if (player.matchmaking.find(m=>m.info.typename == '3v3').info.score < rank.before) player.matchmaking.find(m=>m.info.typename == '3v3').info['rank'] = rank
            })
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
     * @param {number} page The page number (defaults to 0), displays 25 items / page
     * @returns {array} The lastest matches of the player
     */
     async playerMatches(accountid, page = 0){
        var player = await f.getData.player.getPlayerMatches(accountid, page)
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