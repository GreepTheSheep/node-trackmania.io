const Trackmania = require('../')

const news = new Trackmania.News({listener:false})

news.on('new-news', news =>{
    console.log(news)
})
news.on('debug', msg =>{
    console.log(msg)
})

function run(){
    try{
        news.news().then(news=>{
            console.log(news)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()