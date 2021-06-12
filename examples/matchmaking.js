const Trackmania = require('../')

const mm = new Trackmania.Matchmaking({listener:false})

mm.on('new-first', match =>{
    console.log(match)
})
mm.on('debug', msg =>{
    console.log(msg)
})

function run(){
    try{
        mm.ranking("3v3").then(list=>{
            console.log('ranking 3v3', list)
        })

        mm.ranking("Royal").then(list=>{
            console.log('ranking Royal', list)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()