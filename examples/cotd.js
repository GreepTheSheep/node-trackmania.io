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
            console.log('list of latest COTDs', t)
        })

        cotd.latestCOTD().then(t=>{
            console.log('information on the latest COTD', t)
        })

        cotd.latestCOTDChallenge().then(t=>{
            console.log('information of the seeding of latest COTD', t)
        })

        cotd.latestCOTDChallengeResults().then(t=>{
            console.log('results of the seeding of latest COTD', t)
        })

        cotd.latestCOTDResults().then(t=>{
            console.log('results of the latest COTD', t)
        })

        cotd.COTD(398).then(t=>{
            console.log('information on the COTD with the id 398', t)
        })

        cotd.COTDChallenge(398).then(t=>{
            console.log('information on the seeding of the COTD id 398', t)
        })

        cotd.COTDChallengeResults(398).then(t=>{
            console.log('results of the seeding on the COTD 398', t)
        })

        cotd.playerResults('26d9a7de-4067-4926-9d93-2fe62cd869fc').then(t=>{
            console.log('information of a player on all COTDs', t)
        })

        cotd.averageRanks("last").then(t=>{
            console.log(t)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()