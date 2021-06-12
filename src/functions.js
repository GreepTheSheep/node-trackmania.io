const fetch = require('node-fetch')
const url = require('./httpOptions')

var cwd = process.cwd()
var cwf = require.main.filename
cwf = cwf.substring(cwf.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1)
cwd = cwd.substring(cwd.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1)
var UA;
if (cwd == 'node-trackmania.io') UA = '[TESTING BUILD] ' + url.useragent
else UA = cwd + ' (' + cwf + ') - using ' + url.useragent

const headers = {
    method : 'GET',
    headers : new fetch.Headers({
        "Accept"       : "application/json",
        "Content-Type" : "application/json",
        "User-Agent"   : UA
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
function getPlayerTrophies(player, page = 0){
    return fetch(`${url.protocol}://${url.host}/${url.api}/${url.tabs.player}/${player}/${url.tabs.trophies}/${page}`, headers).then(r=>r.json())
}
function getPlayerMatches(player, matchTypeId, page = 0){
    return fetch(`${url.protocol}://${url.host}/${url.api}/${url.tabs.player}/${player}/${url.tabs.matches}/${matchTypeId}/${page}`, headers).then(r=>r.json())
}

function searchPlayer(player){
    return fetch(`${url.protocol}://${url.host}/${url.api}/${url.tabs.players}/find?search=${player.replace(' ', '%20')}`, headers).then(r=>r.json())
}

function playersGroup(group){
    return fetch(`${url.protocol}://${url.host}/${url.api}/${url.tabs.players}/group/${group}`, headers).then(r=>r.json())
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
            getPlayerMatches,
            searchPlayer,
            playersGroup,
            playerCOTD
        }
    },
    stripFormatting
}