const Trackmania = require('../')

const campaigns = new Trackmania.Campaigns({listener:false})

campaigns.on('new-news', news =>{
    console.log(news)
})
campaigns.on('debug', msg =>{
    console.log(msg)
})

function run(){
    try{
        campaigns.campaigns().then(campaigns=>{
            console.log('popular', campaigns)
        })
        campaigns.latestCampaigns().then(campaigns=>{
            console.log('latest', campaigns)
        })
        campaigns.searchCampaigns('tmgl FALL 2020').then(campaigns=>{
            console.log('search',campaigns)
        })
        campaigns.campaign(383, 3037).then(campaigns=>{
            console.log('tmgl',campaigns)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()