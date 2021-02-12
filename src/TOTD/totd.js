const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')
var moment = require('moment-timezone');
moment.tz.setDefault("CET");

class TOTD extends EventEmitter {
    constructor(options = {
        listener: true
    }){
        super()

        if (options.listener) this._listener()
    }

    /**
     * Gets the Track Of The Day list for this month 
     * @param {number} monthBefore Defaults to 0, Number of months ago this one
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {object} The Track Of The Day list for this month 
     */
    async totd(monthBefore = 0, format = true){
        var totd = await f.getData.page(url.tabs.totd, monthBefore)

        if (!format) return totd
        else {
            var totd_tmp = []
            totd.days.forEach(e=>{
                Object.entries(e.map).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e.map[key] = f.stripFormatting(value)
                    else e.map[key] = value
                });
                totd_tmp.push(e)
            })
            return totd_tmp
        }
    }

    /**
     * Enables the listener module
     * @private
     */
    async _listener(){
        this.emit('debug', 'Listener started, awaiting new TOTD every 10 seconds')
        var totd1 = await this.totd()
        var hour = new Date().getHours();

        setInterval(async ()=>{
            this.emit('debug', 'Listener checking...')
            var hour2 = new Date().getHours();
            if (hour != hour2){
                if (new Date(moment.tz(new Date(), "CET").format()).getHours() == 19){
                    var totd2 = await this.totd()
                    if (totd1.days.length != totd2.days.length){
                        this.emit('new-totd', totd2.days[0])
                    }
                    else if (totd1.days[0].map.mapId != totd2.days[0].map.mapId) this.emit('new-totd', totd2[0])
                    totd1 = totd2
                } else {
                    this.emit('debug', 'Not 19h CET, cancelling check')
                }
                hour = hour2
            } else {
                this.emit('debug', 'Same hour, cancelling check')
            }
        }, 1000)
    }
}

module.exports = TOTD