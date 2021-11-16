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

/**
 * Instantiates a new client.
 * @extends {BaseClient}
 */
class Client extends BaseClient {
    /**
     * @param {defaultOptions} [options={}] The options to use
     */
    constructor(options){
        super(options);

        /**
         * The player manager
         * @type {PlayerManager}
         */
        this.players = new PlayerManager(this);

        /**
         * The map manager
         * @type {MapManager}
         */
        this.maps = new MapManager(this);

        /**
         * The TOTD manager
         * @type {TOTDManager}
         */
        this.totd = new TOTDManager(this);

        /**
         * The COTD manager
         * @type {COTDManager}
         */
        this.cotd = new COTDManager(this);

        /**
         * The club manager
         * @type {ClubManager}
         */
        this.clubs = new ClubManager(this);

        /**
         * The campaign manager
         * @type {CampaignManager}
         */
        this.campaigns = new CampaignManager(this);

        /**
         * The room manager
         * @type {RoomManager}
         */
        this.rooms = new RoomManager(this);

        /**
         * The TM events manager
         * @type {EventManager}
         */
        this.events = new EventManager(this);
    }
}

module.exports = Client;