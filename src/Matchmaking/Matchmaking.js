const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')

class Matchmaking extends EventEmitter {
    constructor(options = {
        listener: false,
        listenerMatchType: "3v3"
    }){
        super()

        if (options.listener) this._listener(options.listenerMatchType)
    }

    /**
     * Gets the tops ranking om Matchmaking
     * @param {string} matchType The match Type, select between "3v3" or "Royal". Defaults to "3v3"
     * @param {number} page The page number. Defaults to 0
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of ranks
     */
    async ranking(matchType = "3v3", page = 0, format = true){
        var matchTypeID;
        if (matchType == "3v3") matchTypeID = 2;
        else if (matchType == "Royal") matchTypeID = 3; 
        var json = await f.getData.page(url.tabs.matchmaking, matchTypeID+'/'+page)

        json.ranks.forEach(rankJson => {
            var rankNames = require('../_appendix_datas/rankNames')
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

        if (format){
            var i = 0;
            json.ranks.forEach(r=>{
                Object.entries(r.player).forEach(entry => {
                    const [key, value] = entry;
    
                    if (key == 'tag') json.ranks[i].player[key] = f.stripFormatting(value)
                    else json.ranks[i].player[key] = value
                });
                i++
            })
        } 

        return json
    }
    
    /**
     * Gets the tops trophies ranking
     * @param {number} page The page number. Defaults to 0
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of ranks
     */
    async trophiesRanking(page = 0, format = true){
        var json = await f.getData.page(url.tabs.topTrophies, page)

        if (format){
            var i = 0;
            json.ranks.forEach(r=>{
                Object.entries(r.player).forEach(entry => {
                    const [key, value] = entry;
    
                    if (key == 'tag') json.ranks[i].player[key] = f.stripFormatting(value)
                    else json.ranks[i].player[key] = value
                });
                i++
            })
        }

        return json
    }

    /**
     * Enables the listener module
     * @private
     */
    async _listener(listenerType){
        this.emit('debug', 'Listener started, awaiting new top 1 every 2 minutes')
        var matches1 = await this.ranking(listenerType)

        setInterval(async ()=>{
            this.emit('debug', 'Listener checking...')
            var matches2 = await this.ranking(listenerType)
            if (matches1.ranks[0].accountid != matches2.ranks[0].accountid) this.emit('new-first', matches2.ranks[0])
            matches1 = matches2
        }, 2*60*1000)
    }
}

module.exports = Matchmaking