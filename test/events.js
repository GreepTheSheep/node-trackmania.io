const Trackmania = require('../')

const competitions = new Trackmania.Events()

function run(){
    try{
        competitions.competition().then(competitions=>{
            console.log('competitions', competitions)
        })
        competitions.searchCompetitions('OGL').then(competitions=>{
            console.log('search',competitions)
        })
        competitions.competition(191).then(competition=>{
            console.log('ogl',competition)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()