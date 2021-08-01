const BaseClient = require('./BaseClient');

class Client extends BaseClient {
    constructor(options){
        super(options);
    }

    get players(){
        if (!this.PlayerManager){
            const PlayerManager = require('../managers/PlayerManager');
            this.PlayerManager = new PlayerManager(this);
        }
        return this.PlayerManager;
    }

}

module.exports = Client;