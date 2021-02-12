const Trackmania = require('../')

const cotd = new Trackmania.COTD({listener:false})

cotd.on('cotd-results', (matchNumber, results) =>{
    console.log("COTD Match " + matchNumber, results)
})
cotd.on('debug', msg =>{
    console.log(msg)
})

function run(){
    try{
        cotd.latestCOTDs().then(t=>{
            console.log(t)
        })
        cotd.latestCOTD().then(t=>{
            console.log(t)
        })
        cotd.latestCOTDResults().then(t=>{
            console.log(t)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()