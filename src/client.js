const BaseClient = require('./client/BaseClient');

class Client extends BaseClient {
    constructor(options){
        super(options);
    }

    get players(){
        const PlayerManager = require('./managers/PlayerManager');
        return new PlayerManager(this);
    }

}

module.exports = Client;