const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')
const Players = require('../Players/players')
const moment = require('moment-timezone')
const wait = require('util').promisify(setTimeout);

class COTD extends EventEmitter {
    constructor(options = {
        listener: false
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
     * @param {number} page The page number, starts from 0 (25 items / page). Defaults to 0
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The information about this COTD
     */
    async latestCOTDResults(match = 1, page = 0, format = true){
        if (match < 1) match = 1
        var lastCOTD = await this.latestCOTD()
        if (lastCOTD.rounds[0].matches.length < 1) return {
            "error": "No currently matches"
        }
        var results = await f.getData.page(url.tabs.comp, lastCOTD.id+`/match/${lastCOTD.rounds[0].matches[match-1].id}/${page}`)

        if (!format) return results.results
        else {
            results.results.forEach(e=>{
                Object.entries(e.player).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'tag') e.player[key] = f.stripFormatting(value)
                    else e.player[key] = value
                });
            })
            return results.results
        }
    }

    /**
     * Gets a specific COTD info
     * @param {number} id The COTD Identifier
     * @returns {object} The information about this COTD
     */
     async COTD(id){
        var info = await f.getData.page(url.tabs.comp, id)

        return info
    }

    /**
     * Gets a specific COTD results info
     * @param {number} id The COTD Identifier
     * @param {number} match The match number. Defaults to 1
     * @param {number} page The page number, starts from 0 (25 items / page). Defaults to 0
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The information about this COTD
     */
     async COTDResults(id, match = 1, page = 0, format = true){
        if (match < 1) match = 1
        var COTD = await this.COTD(id)
        if (COTD.rounds[0].matches.length < 1) return {
            "error": "No currently matches"
        }
        var results = await f.getData.page(url.tabs.comp, id+`/match/${COTD.rounds[0].matches[match-1].id}/${page}`)

        if (!format) return results.results
        else {
            results.results.forEach(e=>{
                Object.entries(e.player).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'tag') e.player[key] = f.stripFormatting(value)
                    else e.player[key] = value
                });
            })
            return results.results
        }
    }

    /**
     * Gets a specific COTD Challenge (seeding) info (for results, refer to COTDChallengeResults)
     * @param {number} id The COTD Identifier
     * @returns {object} The information about this COTD
     */
     async COTDChallenge(id){
        var COTD = await this.COTD(id)
        var info = await f.getData.page(url.tabs.comp, id+`/challenge/${COTD.rounds[0].challenges[0].id}`)

        return info
    }

    /**
     * Gets a specific COTD Challenge (seeding) results info
     * @param {number} id The COTD Identifier
     * @param {number} page The page number, starts from 0 (25 items / page). Defaults to 0
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The information about this COTD
     */
     async COTDChallengeResults(id, page = 0, format = true){
        var COTD = await this.COTD(id)
        var results = await f.getData.page(url.tabs.comp, id+`/challenge/${COTD.rounds[0].challenges[0].id}/${page}`)

        if (!format) return results.results
        else {
            results.results.forEach(e=>{
                Object.entries(e.player).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'tag') e.player[key] = f.stripFormatting(value)
                    else e.player[key] = value
                });
            })
            return results.results
        }
    }

    /**
     * Gets the latest COTD Challenge (seeding) info (for results, refer to latestCOTDChallengeResults)
     * @returns {object} The information about this COTD
     */
     async latestCOTDChallenge(){
        var latestCOTD = await this.latestCOTD()
        var info = await f.getData.page(url.tabs.comp, latestCOTD.id+`/challenge/${latestCOTD.rounds[0].challenges[0].id}`)

        return info
    }

    /**
     * Gets the latest COTD Challenge (seeding) results info
     * @param {number} page The page number, starts from 0 (25 items / page). Defaults to 0
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The results about this COTD Challenge
     */
     async latestCOTDChallengeResults(page = 0, format = true){
        var latestCOTD = await this.latestCOTD()
        var results = await f.getData.page(url.tabs.comp, latestCOTD.id+`/challenge/${latestCOTD.rounds[0].challenges[0].id}/${page}`)

        if (!format) return results.results
        else {
            var i = 0
            results.results.forEach(e=>{
                Object.entries(e.player).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'tag') results.results[i].player[key] = f.stripFormatting(value)
                    else results.results[i].player[key] = value
                });
                i++
            })
            return results.results
        }
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
     * Gets the average ranking of players, sorted by best or last
     * @param {string} sort "best" or "last". Defaults to "best"
     * @param {string} top Ranked from 10 to 10. Example having the first "10", or from 11 to "20" etc... Defaults to "10"
     * @returns {array} An array of tops of Players, and with their average
     */
     async averageRanks(sort = "best", top = "10"){
        var results = await f.getData.player.averageCOTD()

        results = results[sort]
        if (!results) throw 'No data, check your syntax in "sort" field.'
        
        results = results[top]
        if (!results) throw 'No data, check your syntax in "top" field.'

        return results
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