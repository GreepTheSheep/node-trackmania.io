const fetch = require('node-fetch')
const url = require('./httpOptions')

const headers = {
    method : 'GET',
    headers : new fetch.Headers({
        "Accept"       : "application/json",
        "Content-Type" : "application/json",
        "User-Agent"   : url.useragent
    })
}

function getDataSimple(tab){
    return fetch(`${url.protocol}://${url.host}/${url.api}/${tab}/0`, headers).then(r=>r.json())
}
function getDataSimplePage(tab, page){
    return fetch(`${url.protocol}://${url.host}/${url.api}/${tab}/${page}`, headers).then(r=>r.json())
}
function getPlayer(player){
    return fetch(`${url.protocol}://${url.host}/${url.api}/${url.tabs.player}/${player}`, headers).then(r=>r.json())
}
function getPlayerTrophies(player){
    return fetch(`${url.protocol}://${url.host}/${url.api}/${url.tabs.player}/${player}/${url.tabs.trophies}/0`, headers).then(r=>r.json())
}

function searchPlayer(player){
    return fetch(`${url.tmstats.protocol}://${url.tmstats.host}/${url.tmstats.api}/${url.tmstats.tabs.searchPlayer}/${player.replace(' ', '%20')}`, headers).then(r=>r.json())
}

function playerCOTD(player){
    return fetch(`${url.tmstats.protocol}://${url.tmstats.host}/${url.tmstats.api}/${url.tmstats.tabs.player}/${player}`, headers).then(r=>r.json())
}

// Thanks to @dassschaf and Solux#5809 for this tool
function stripFormatting(string) {
    // eslint-disable-next-line no-useless-escape
    return string.replace(/\$[nmwoszi]|\$[hl]\[[a-zA-Z0-9/?#!&\.\\\-_=@$'()+,;:]*\]|\$[0-f]{3}/gi, '');
}


module.exports = {
    getData: {
        simple: getDataSimple,
        page: getDataSimplePage,
        player: {
            getPlayer,
            getPlayerTrophies,
            searchPlayer,
            playerCOTD
        }
    },
    stripFormatting
}