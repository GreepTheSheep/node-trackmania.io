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
        matches.matches("3v3").then(list=>{
            console.log('Matches list 3v3', list)
        })

        matches.matches("Royal").then(list=>{
            console.log('Matches list Royal', list)
        })
        
        matches.match("LID-MTCH-42wizskjl3kpirc").then(match=>{
            console.log('match', match)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()