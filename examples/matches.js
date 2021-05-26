const Trackmania = require('../')

const matches = new Trackmania.Matches({listener:false})

matches.on('new-match', match =>{
    console.log(match)
})
matches.on('debug', msg =>{
    console.log(msg)
})

function run(){
    try{
        matches.match("LID-MTCH-vzap1bpi0ifshtu").then(match=>{
            console.log('match', match)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()