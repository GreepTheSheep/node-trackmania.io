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


        var rankNames = [
            {
                "name": "Unranked",
                "abbr": "U",
                "before": 1000
            },
            {
                "name": "Beginner I",
                "abbr": "BI",
                "before": 1250
            },
            {
                "name": "Beginner II",
                "abbr": "BII",
                "before": 1500
            },
            {
                "name": "Beginner III",
                "abbr": "BIII",
                "before": 2000
            },
            {
                "name": "Challenger I",
                "abbr": "CI",
                "before": 2250
            },
            {
                "name": "Challenger II",
                "abbr": "CII",
                "before": 2500
            },
            {
                "name": "Challenger III",
                "abbr": "CIII",
                "before": 3000
            },
            {
                "name": "Master I",
                "abbr": "MI",
                "before": 3500
            },
            {
                "name": "Master II",
                "abbr": "MII",
                "before": 4000
            },
            {
                "name": "Master III",
                "abbr": "MIII",
                "before": 5000
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

        return player
    }

    /**
     * Gets the last trophies gains of a player
     * @param {string} accountid The account ID or the Trackmania.io Vanity URL
     * @returns {array} The lastest trophies of the player
     */
    async playerTrophies(accountid){
        var player = await f.getData.player.getPlayerTrophies(accountid)
        if (player.error) throw player.error
        return player.gains
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