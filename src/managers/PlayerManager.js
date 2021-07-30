const Player = require('../structures/Player');
const ReqUtil = require('../util/ReqUtil');
class PlayerManager {
    constructor(client){
        this.client = client;

        this.cache = new Map();
    }

    /**
     * Fetches a player and returns its data
     * @param {String} accountid The account ID or its tm.io vanity name
     * @param {Boolean} cache Whether to cache the player or not
     * @returns {Player} The player
     */
    async fetch(accountid, cache = this.client.options.cache){
        const player = this.client.options.api.paths.tmio.tabs.player;
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${accountid}`);
        if (cache) this.cache = this.cache.set(res.accountid, res);
        return new Player(this.client, res);
    }
}

module.exports = PlayerManager;