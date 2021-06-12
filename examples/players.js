const Trackmania = require('../')

const players = new Trackmania.Players()

function run(){
    try{
        // should throw errors here
        players.player('kjhfjshfkdjf').then(data=>{
            console.log('data', data)
        }).catch(err=>{
            console.error(err)
        })

        players.searchPlayer('fezfzefze').then(p=>{
            if (p.length < 1) console.error('nobody found')
        })

        // should throw real result here
        players.searchPlayer('greep').then(p=>{
            if (p.length < 1) return console.error('nobody found')
            console.log('results', p)

            players.player(p[0].accountid).then(data=>{
                console.log('data', data)
            }).catch(err=>{
                console.error(err)
            })

            players.playerTrophies(p[0].accountid).then(data=>{
                console.log('last trophies gains', data[0])
            }).catch(err=>{
                console.error(err)
            })

            players.playerMatches(p[0].accountid, "3v3").then(data=>{
                console.log('last match in 3v3 mode', data[0])
            }).catch(err=>{
                console.error(err)
            })

            players.playerMatches(p[0].accountid, "Royal").then(data=>{
                console.log('last match in Royal mode', data[0])
            }).catch(err=>{
                console.error(err)
            })
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()