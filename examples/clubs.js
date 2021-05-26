const Trackmania = require('../')

const clubs = new Trackmania.Clubs({listener:false})

clubs.on('new-club', club =>{
    console.log(club)
})
clubs.on('debug', msg =>{
    console.log(msg)
})

function run(){
    try{
        clubs.clubs().then(clubs=>{
            console.log('popular', clubs)
        })
        clubs.latestClubs().then(clubs=>{
            console.log('latest', clubs)
        })
        clubs.searchClubs('Yannex').then(clubs=>{
            console.log('search',clubs)
        })
        clubs.club(54).then(club=>{
            console.log('zrt',club)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()