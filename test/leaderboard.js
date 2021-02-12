const Trackmania = require('../')


function run(){
    try{
        Trackmania.leaderboard("Qj4WKBMN9BeZ1cSnMHj8ilhVMN9").then(leaderboard=>{
            console.log(leaderboard)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()