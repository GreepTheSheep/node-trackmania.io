const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')

class Rooms extends EventEmitter {
    constructor(options = {
        listener: true
    }){
        super()

        if (options.listener) this._listener()
    }

    /**
     * Gets the populars campaigns
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of rooms
     */
    async rooms(format = true){
        var rooms = await f.getData.simple(url.tabs.rooms)

        if (!format) return rooms.rooms
        else {
            var cpns_tmp = []
            rooms.rooms.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                cpns_tmp.push(e)
            })
            return cpns_tmp
        }
    }

    /**
     * Gets the latest rooms
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of rooms
     */
    async latestRooms(format = true){
        var rooms = await f.getData.page(url.tabs.rooms, '0?sort=date')

        if (!format) return rooms.rooms
        else {
            var cpns_tmp = []
            rooms.rooms.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                cpns_tmp.push(e)
            })
            return cpns_tmp
        }
    }

    /**
     * Search a room
     * @param {string} search The campaign to search
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of rooms
     */
    async searchRooms(search, format = true){
        var rooms = await f.getData.page(url.tabs.rooms, '0?search=' + search.replace(' ', "%20"))

        if (!format) return rooms.rooms
        else {
            var cpns_tmp = []
            rooms.rooms.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                cpns_tmp.push(e)
            })
            return cpns_tmp
        }
    }

    /**
     * Gets the campaign
     * @param {number} clubId The Club ID
     * @param {number} roomId The room ID
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {object} The list of maps of this room and other data
     */
    async room(clubId, roomId, format = true){
        var room = await f.getData.page(url.tabs.room, `${clubId}/${roomId}`)

        if (!format) return room
        else {
            var cpns_tmp = []
            room.name = f.stripFormatting(room.name)
            room.maps.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                cpns_tmp.push(e)
            })
            room.maps = cpns_tmp
            return room
        }
    }

    /**
     * Enables the listener module
     * @private
     */
    async _listener(){
        this.emit('debug', 'Listener started, awaiting new rooms every 30 seconds')
        var cpns1 = await this.latestRooms()

        setInterval(async ()=>{
            this.emit('debug', 'Listener checking...')
            var cpns2 = await this.latestRooms()
            if (cpns1[0].id != cpns2[0].id) this.emit('new-room', cpns2[0])
            cpns1 = cpns2
        }, 30000)
    }
}

module.exports = Rooms