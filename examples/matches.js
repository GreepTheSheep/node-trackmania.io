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
        matches.matches().then(list=>{
            console.log('Matches list', list)
        })
        
        matches.match("LID-MTCH-dqy33e0shqrjfro").then(match=>{
            console.log('match', match)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()