const Trackmania = require('../')

const totd = new Trackmania.TOTD({listener:false})

totd.on('new-totd', news =>{
    console.log(news)
})
totd.on('debug', msg =>{
    console.log(msg)
})

function run(){
    try{
        totd.totd().then(t=>{
            console.log('List of TOTD for this actual month', t)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()