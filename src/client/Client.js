const BaseClient = require('./BaseClient');

const defaultOptions = require('../util/defaultOptions'); // eslint-disable-line no-unused-vars

// Managers
const PlayerManager = require('../managers/PlayerManager');
const MapManager = require('../managers/MapManager');
const ClubManager = require('../managers/ClubManager');
const CampaignManager = require('../managers/CampaignManager');
const RoomManager = require('../managers/RoomManager');
const EventManager = require('../managers/EventManager');

class Client extends BaseClient {
    /** Initialises a new Client
     * @param {defaultOptions} options
     */
    constructor(options){
        super(options);
    }

    /**
     * The player manager
     * @returns {PlayerManager}
     */
    get players(){
        if (!this._PlayerManager){
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
            /** @private */
            this._ClubManager = new ClubManager(this);
        }
        return this._ClubManager;
    }

    /**
     * The campaign manager
     * @returns {CampaignManager}
     */
    get campaigns(){
        if (!this._CampaignManager){
            /** @private */
            this._CampaignManager = new CampaignManager(this);
        }
        return this._CampaignManager;
    }

    /**
     * The room manager
     * @returns {RoomManager}
     */
    get rooms(){
        if (!this._RoomManager){
            /** @private */
            this._RoomManager = new RoomManager(this);
        }
        return this._RoomManager;
    }

    /**
     * The TM events manager
     * @returns {EventManager}
     */
    get events(){
        if (!this._EventManager){
            /** @private */
            this._EventManager = new EventManager(this);
        }
        return this._EventManager;
    }

}

module.exports = Client;