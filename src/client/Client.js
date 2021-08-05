const BaseClient = require('./BaseClient');

class Client extends BaseClient {
    constructor(options){
        super(options);
    }

    /**
     * The player manager
     * @returns {PlayerManager}
     */
    get players(){
        if (!this._PlayerManager){
            const PlayerManager = require('../managers/PlayerManager');
            /** @private */
            this._PlayerManager = new PlayerManager(this);
        }
        return this._PlayerManager;
    }
    }

}

module.exports = Client;