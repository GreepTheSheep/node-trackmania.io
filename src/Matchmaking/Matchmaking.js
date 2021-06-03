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
     * @param {number} page The page number. Defaults to 0
     * @returns {array} The list of ranks
     */
    async ranking(page = 0){
        var json = await f.getData.page(url.tabs.matchmaking, page)

        json.ranks.forEach(rankJson => {
            var rankNames = require('../rankNames')
            for (let i = 0; i < rankNames.length; i++) {
                if (
                    rankJson.score >= rankNames[i].startPts
                    && rankJson.score < rankNames[i].endPts
                )
                rankJson.division['rank'] = rankNames[i]
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