const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')

class COTD extends EventEmitter {
    constructor(options = {
        listener: true
    }){
        super()

        if (options.listener) this._listener()
    }

    /**
     * Gets the latest COTDs
     * @returns {array} The list of recent COTDS
     */
    async latestCOTDs(){
        var rooms = await f.getData.simple(url.tabs.cotd)

        return rooms.competitions
    }

    /**
     * Gets the latest COTD info
     * @returns {array} The information about this COTD
     */
    async latestCOTD(){
        var COTDs = await this.latestCOTDs()
        var room = await f.getData.page(url.tabs.comp, COTDs[0].id)

        return room
    }

    /**
     * Gets the latest COTD info
     * @param {number} match The match number. Defaults to 1
     * @returns {array} The information about this COTD
     */
    async latestCOTDResults(match = 1){
        var lastCOTD = await this.latestCOTD()
        var COTDs = await this.latestCOTDs()
        var results = await f.getData.page(url.tabs.comp, COTDs[0].id+`/results/${lastCOTD.rounds[0].matches[match-1].id}/0`)

        return results.results
    }

    /**
     * Enables the listener module
     * @private
     */
    async _listener(){
        this.emit('debug', 'Listener started, awaiting new results every 60 seconds')
        var cotdCheck1 = await this.latestCOTD()

        setInterval(async ()=>{
            this.emit('debug', 'Results checking...')
            var cotdCheck2 = await this.latestCOTD()
            if (cotdCheck2.rounds.status == "COMPLETED" && cotdCheck1.id != cotdCheck2.id){
                var i = 0
                cotdCheck2.rounds.matches.forEach(async ()=>{
                    var results = await this.latestCOTDResults(i)
                    this.emit('cotd-results', i+1, results)
                    i++
                })
                cotdCheck1 = cotdCheck2
            } else {
                this.emit('debug', 'No new results')
            }
        }, 60000)
    }
}

module.exports = COTD