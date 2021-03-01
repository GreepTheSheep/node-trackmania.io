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
     * @param {boolean} page Defaults to 0, The page of the list
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of clubs
     */
    async matches(page = 0, format = true){
        var matches = await f.getData.page(url.tabs.matches, page)

        if (!format) return matches.matches
        else {
            var matches_tmp = []
            matches.matches.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                matches_tmp.push(e)
            })
            return matches_tmp
        }
    }

    /**
     * Get a match
     * @param {boolean} matchID The Match Identifier
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of clubs
     */
    async match(matchID,format = true){
        var match = await f.getData.page(url.tabs.match, matchID)

        if (!format) return match
        else {
            var e = {}
            Object.entries(match).forEach(entry => {
                const [key, value] = entry;

                if (key == 'name') e[key] = f.stripFormatting(value)
                else e[key] = value
            });
            return e
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