const Trackmania = require('../')


function run(){
    try{
        Trackmania.map("Qj4WKBMN9BeZ1cSnMHj8ilhVMN9").then(leaderboard=>{
            console.log(leaderboard)
        })
        Trackmania.leaderboard("Qj4WKBMN9BeZ1cSnMHj8ilhVMN9").then(leaderboard=>{
            console.log(leaderboard)

            // If you want a second page, take the last time in the array (hint: array.length - 1 returns the last), then add it to another request
            Trackmania.leaderboard("Qj4WKBMN9BeZ1cSnMHj8ilhVMN9", leaderboard[leaderboard.length - 1].time).then(leaderboard=>{
                console.log(leaderboard)
            
                // etc, etc...
            })
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()