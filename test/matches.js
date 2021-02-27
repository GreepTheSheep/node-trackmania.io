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
            console.log('all latest', list)
            matches.match(list[0].lid).then(match=>{
                console.log('latest info', match)
            })
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()