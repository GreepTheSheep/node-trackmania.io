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

    /**
     * The map manager
     * @returns {MapManager}
     */
    get maps(){
        if (!this._MapManager){
            const MapManager = require('../managers/MapManager');
            /** @private */
            this._MapManager = new MapManager(this);
        }
        return this._MapManager;
    }

    /**
     * The club manager
     * @returns {ClubManager}
     */
    get clubs(){
        if (!this._ClubManager){
            const ClubManager = require('../managers/ClubManager');
            /** @private */
            this._ClubManager = new ClubManager(this);
        }
        return this._ClubManager;
    }

}

module.exports = Client;