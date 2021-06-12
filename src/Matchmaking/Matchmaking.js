const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')

class Matchmaking extends EventEmitter {
    constructor(options = {
        listener: false
    }){
        super()

        if (options.listener) this._listener()
    }

    /**
     * Gets the tops ranking om Matchmaking
     * @param {string} matchType The match Type, select between "3v3" or "Royal". Defaults to "3v3"
     * @param {number} page The page number. Defaults to 0
     * @returns {array} The list of ranks
     */
    async ranking(matchType = "3v3", page = 0){
        var matchTypeID;
        if (matchType == "3v3") matchTypeID = 2;
        else if (matchType == "Royal") matchTypeID = 3; 
        var json = await f.getData.page(url.tabs.matchmaking, matchTypeID+'/'+page)

        json.ranks.forEach(rankJson => {
            var rankNames = require('../rankNames')
            if (matchType == "3v3"){
                for (let i = 0; i < rankNames['3v3'].length; i++) {
                    if (
                        rankJson.score >= rankNames['3v3'][i].startPts
                        && rankJson.score < rankNames['3v3'][i].endPts
                    )
                    rankJson.division['rank'] = rankNames['3v3'][i]
                }
            } else if (matchType == "Royal"){
                for (let i = 0; i < rankNames.Royal.length; i++) {
                    if (
                        rankJson.progression >= rankNames.Royal[i].startPts
                        && rankJson.progression < rankNames.Royal[i].endPts
                    )
                    rankJson.division['rank'] = rankNames.Royal[i]
                }
            }
        });

        return json
    }
    
    /**
     * Enables the listener module
     * @private
     */
    async _listener(){
        this.emit('debug', 'Listener started, awaiting new top 1 every 2 minutes')
        var matches1 = await this.ranking()

        setInterval(async ()=>{
            this.emit('debug', 'Listener checking...')
            var matches2 = await this.ranking()
            if (matches1.ranks[0].accountid != matches2.ranks[0].accountid) this.emit('new-first', matches2.ranks[0])
            matches1 = matches2
        }, 2*60*1000)
    }
}

module.exports = Matchmaking