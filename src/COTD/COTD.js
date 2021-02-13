const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')
const Players = require('../Players/players')
const moment = require('moment-timezone')
const wait = require('util').promisify(setTimeout);

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
        if (match < 1) match = 1
        var lastCOTD = await this.latestCOTD()
        var COTDs = await this.latestCOTDs()
        var results = await f.getData.page(url.tabs.comp, COTDs[0].id+`/results/${lastCOTD.rounds[0].matches[match-1].id}/0`)

        return results.results
    }

    /**
     * Gets the last trophies gains of a player
     * @param {string} accountid The account ID
     * @returns {array} The lastest COTD results of this player
     */
    async playerResults(accountid){
        var players = new Players()
        return await players.COTDResults(accountid)
    }

    /**
     * Enables the listener module
     * @private
     */
    async _listener(){
        this.emit('debug', 'Listener started, awaiting new results every 60 seconds')
        var cotdCheck1 = await this.latestCOTD()
        var hour = new Date().getHours();

        setInterval(async ()=>{
            this.emit('debug', 'Results checking...')
            var hour2 = new Date().getHours();
            var checked = false
            if (hour != hour2){
                if (new Date(moment.tz(new Date(), "CET").format()).getHours() == 19){
                    if (!checked){
                        var cotdCheck2 = await this.latestCOTD()
                        if (cotdCheck1.id != cotdCheck2.id){
                            if (cotdCheck2.rounds.status != "COMPLETED"){
                                this.recheckCOTD()
                            }
                            cotdCheck1 = cotdCheck2
                            checked = true
                        } else {
                            this.emit('debug', 'No new results')
                        }
                    } else {
                        this.emit('debug', 'Already checked')
                    }
                } else {
                    this.emit('debug', 'Not 19h CET, cancelling check')
                    checked = false
                }
                hour = hour2
            }
        }, 60000)
    }

    /** @private */
    async recheckCOTD(){
        var cotdCheck2 = await this.latestCOTD()
        var i = 0
        cotdCheck2.rounds.matches.forEach(async c=>{
            if (c.completed){
                var results = await this.latestCOTDResults(i)
                this.emit('cotd-results', i+1, results)
            } else {
                await wait(60000)
                this.recheckCOTD()
            }
            i++
        })
    }
}

module.exports = COTD