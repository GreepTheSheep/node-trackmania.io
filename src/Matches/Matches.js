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
     * ENDED - Gets the latest matches
     * @throws Reason for the end
     * @deprecated
     */
    // eslint-disable-next-line no-unused-vars
    async matches(page = 0, format = true){
        throw "When the Spring 2021 campaign released on 2021-04-01, Nadeo disabled their matches list API. This means that for the time being we can't show a list of matches here."
    }

    /**
     * Get a match
     * @param {boolean} matchID The Match Identifier
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The match info
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