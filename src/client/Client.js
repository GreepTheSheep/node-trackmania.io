const BaseClient = require('./BaseClient');

const defaultOptions = require('../util/defaultOptions'); // eslint-disable-line no-unused-vars

// Managers
const PlayerManager = require('../managers/PlayerManager');
const MapManager = require('../managers/MapManager');
const TOTDManager = require('../managers/TOTDManager');
const COTDManager = require('../managers/COTDManager');
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

        /**
         * The player manager
         * @returns {PlayerManager}
         */
        this.players = new PlayerManager(this);

        /**
         * The map manager
         * @returns {MapManager}
         */
        this.maps = new MapManager(this);

        /**
         * The TOTD manager
         * @returns {TOTDManager}
         */
        this.totd = new TOTDManager(this);

        /**
         * The COTD manager
         * @returns {COTDManager}
         */
        this.cotd = new COTDManager(this);

        /**
         * The club manager
         * @returns {ClubManager}
         */
        this.clubs = new ClubManager(this);

        /**
         * The campaign manager
         * @returns {CampaignManager}
         */
        this.campaigns = new CampaignManager(this);

        /**
         * The room manager
         * @returns {RoomManager}
         */
        this.rooms = new RoomManager(this);

        /**
         * The TM events manager
         * @returns {EventManager}
         */
        this.events = new EventManager(this);
    }
}

module.exports = Client;