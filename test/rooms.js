const Trackmania = require('../')

const rooms = new Trackmania.Rooms({listener:false})

rooms.on('new-room', room =>{
    console.log(room)
})
rooms.on('debug', msg =>{
    console.log(msg)
})

function run(){
    try{
        rooms.rooms().then(rooms=>{
            console.log('popular', rooms)
        })
        rooms.latestRooms().then(rooms=>{
            console.log('latest', rooms)
        })
        rooms.searchRooms('tech').then(rooms=>{
            console.log('search',rooms)
        })
        rooms.room(97, 283).then(room=>{
            console.log('tona',room)
        })
    } catch (e){
        console.error(e)
        process.exit(1)
    }
}
run()