const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')
var moment = require('moment-timezone');
moment.tz.setDefault("CET");

class TOTD extends EventEmitter {
    constructor(options = {
        listener: false
    }){
        super()

        if (options.listener) this._listener()
    }

    /**
     * Gets the Track Of The Day list for this month 
     * @param {number} monthBefore Defaults to 0, Number of months ago this one
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The Track Of The Day list for this month 
     */
    async totd(monthBefore = 0, format = true){
        var totd = await f.getData.page(url.tabs.totd, monthBefore)

        if (!format) return totd.days
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
        this.emit('debug', 'Listener started, awaiting new TOTD every 2 seconds')
        var checked = false

        setInterval(async ()=>{
            this.emit('debug', 'Listener checking...')
            if (moment.tz("CET").hour() == 19 && moment.tz("CET").minute() == 1){
                if (checked == false){
                    var totd2 = await this.totd()
                    totd2.reverse()
                    this.emit('debug', 'Sending TOTD')
                    this.emit('new-totd', totd2[0])
                    checked = true
                } else {
                    this.emit('debug', 'Already checked')
                }
            } else {
                this.emit('debug', 'Not 19h CET, cancelling check')
                checked = false
            }
        }, 10000)
    }
}

module.exports = TOTD