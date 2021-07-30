const BaseClient = require('./BaseClient');

class Client extends BaseClient {
    constructor(options){
        super(options);
    }

    get players(){
        const PlayerManager = require('../managers/PlayerManager');
        return new PlayerManager(this);
    }

}

module.exports = Client;