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
        mm.ranking().then(list=>{
            console.log('ranking', list)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()