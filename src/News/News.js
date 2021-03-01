const f = require('../functions')
const url = require('../httpOptions')
const EventEmitter = require('events')

class News extends EventEmitter {
    constructor(options = {
        listener: true
    }){
        super()

        if (options.listener) this._listener()
    }

    /**
     * Gets the latest news
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of news
     */
    async news(format = true){
        var news = await f.getData.simple(url.tabs.news)

        if (!format) return news.splashscreens
        else {
            var news_tmp = []
            news.splashscreens.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'headline' || key == 'body') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                news_tmp.push(e)
            })
            return news_tmp
        }
    }

    /**
     * Enables the listener module
     * @private
     */
    async _listener(){
        this.emit('debug', 'Listener started, awaiting new news every 2 minutes')
        var news1 = await this.news()

        setInterval(async ()=>{
            this.emit('debug', 'Listener checking...')
            var news2 = await this.news()
            if (news1.length != news2.length){
                if (news2.length == news1.length + 1) this.emit('new-news', news2[0])
            }
            else if (news1.length != 0 || news2.length != 0){
                if (news1[0].id != news2[0].id) this.emit('new-news', news2[0])
            } 
            news1 = news2
        }, 2* 60 * 1000)
    }
}

module.exports = News