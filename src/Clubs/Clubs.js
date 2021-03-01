const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')

class Clubs extends EventEmitter {
    constructor(options = {
        listener: false
    }){
        super()

        if (options.listener) this._listener()
    }

    /**
     * Gets the populars clubs
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of clubs
     */
    async clubs(format = true){
        var clubs = await f.getData.simple(url.tabs.clubs)

        if (!format) return clubs.clubs
        else {
            var clubs_tmp = []
            clubs.clubs.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name' || key == 'description') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                clubs_tmp.push(e)
            })
            return clubs_tmp
        }
    }

    /**
     * Gets the latest clubs
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of clubs
     */
    async latestClubs(format = true){
        var clubs = await f.getData.page(url.tabs.clubs, '0?sort=date')

        if (!format) return clubs.clubs
        else {
            var clubs_tmp = []
            clubs.clubs.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name' || key == 'description') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                clubs_tmp.push(e)
            })
            return clubs_tmp
        }
    }

    /**
     * Search a club
     * @param {string} search The club to search
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of clubs
     */
    async searchClubs(search, format = true){
        var clubs = await f.getData.page(url.tabs.clubs, '0?search=' + search.replace(' ', "%20"))

        if (!format) return clubs.clubs
        else {
            var clubs_tmp = []
            clubs.clubs.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                clubs_tmp.push(e)
            })
            return clubs_tmp
        }
    }

    /**
     * Gets the club info
     * @param {number} clubId The Club ID
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {object} The list of maps of this campaign
     */
    async club(clubId, format = true){
        var club = await f.getData.page(url.tabs.club, clubId)

        var members = await f.getData.page(url.tabs.club, clubId + '/members/0')

        club.members = members

        if (!format) return club
        else {
            club.name = f.stripFormatting(club.name)
            club.description = f.stripFormatting(club.description)
            return club
        }
    }
    
    /**
     * Enables the listener module
     * @private
     */
    async _listener(){
        this.emit('debug', 'Listener started, awaiting new clubs every 30 seconds')
        var clubs1 = await this.latestClubs()

        setInterval(async ()=>{
            this.emit('debug', 'Listener checking...')
            var clubs2 = await this.latestClubs()
            if (clubs1.clubs[0].id != clubs2.clubs[0].id) this.emit('new-club', clubs2.clubs[0])
            clubs1 = clubs2
        }, 30000)
    }
}

module.exports = Clubs