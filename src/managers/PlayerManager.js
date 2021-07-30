const Player = require('../structures/Player');
const ReqUtil = require('../util/ReqUtil');

class PlayerManager {
    constructor(client){
        this.client = client;
    }

    /**
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @returns {Player} The player
     */
    async fetch(accountid){
        var player = this.client.options.api.paths.tmio.tabs.player;
        var res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${accountid}`);
        return new Player(this.client, res);
    }
}

module.exports = PlayerManager;