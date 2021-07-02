const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')

class Matches extends EventEmitter {
    constructor(options = {
        listener: false
    }){
        super()

        if (options.listener) this._listener()
    }

    /**
     * Gets the latest matches
     * @param {string} matchType The match Type, select between "3v3" or "Royal". Defaults to "3v3"
     * @param {number} page The page number. Defaults to 0
     * @returns {array} The list of matches
     */
    async matches(matchType = "3v3", page = 0){
        var matchTypeID;
        if (matchType == "3v3") matchTypeID = 2;
        else if (matchType == "Royal") matchTypeID = 3; 
        var matches = await f.getData.page(url.tabs.matches, `${matchTypeID}/${page}`)

        return matches.matches
    }

    /**
     * Get a match
     * @param {boolean} matchID The Match Identifier
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The match info
     */
    async match(matchID,format = true){
        var match = await f.getData.page(url.tabs.match, matchID)

        if (match.name.includes('royal')){
            const teamNames = require('../_appendix_datas/royalTeamNames')
            match.players.forEach(player=>{
                var teamName = teamNames.find(t=>t.teamId == player.team)
                if (!teamName) return
                player.team = teamName
            })
            match.teams.forEach(team=>{
                var teamName = teamNames.find(t=>t.teamId == team.index)
                if (!teamName) return
                team.name = teamName.name
                team.img = teamName.img
            })
        }

        if (!format) return match
        else {
            Object.entries(match).forEach(entry => {
                const [key, value] = entry;

                if (key == 'name') match[key] = f.stripFormatting(value)
                else match[key] = value
            });

            var i = 0
            match.players.forEach(p=>{
                Object.entries(p.player).forEach(entry => {
                    const [key, value] = entry;
    
                    if (key == 'tag') match.players[i].player[key] = f.stripFormatting(value)
                    else match.players[i].player[key] = value
                });
                i++
            })

            return match
        }
    }
    
    /**
     * Enables the listener module
     * @private
     */
    async _listener(){
        this.emit('debug', 'Listener started, awaiting new matches every 30 seconds')
        var matches1 = await this.matches()

        setInterval(async ()=>{
            this.emit('debug', 'Listener checking...')
            var matches2 = await this.matches()
            if (matches1[0].id != matches2[0].id) this.emit('new-match', matches2[0])
            matches1 = matches2
        }, 30000)
    }
}

module.exports = Matches