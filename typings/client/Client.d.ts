export = Client;
declare class Client extends BaseClient {
    /** Initialises a new Client
     * @param {defaultOptions} options
     */
    constructor(options: defaultOptions);
    /**
     * The player manager
     * @returns {PlayerManager}
     */
    players: PlayerManager;
    /**
     * The map manager
     * @returns {MapManager}
     */
    maps: MapManager;
    /**
     * The TOTD manager
     * @returns {TOTDManager}
     */
    totd: TOTDManager;
    /**
     * The COTD manager
     * @returns {COTDManager}
     */
    cotd: COTDManager;
    /**
     * The club manager
     * @returns {ClubManager}
     */
    clubs: ClubManager;
    /**
     * The campaign manager
     * @returns {CampaignManager}
     */
    campaigns: CampaignManager;
    /**
     * The room manager
     * @returns {RoomManager}
     */
    rooms: RoomManager;
    /**
     * The TM events manager
     * @returns {EventManager}
     */
    events: EventManager;
}
import BaseClient = require("./BaseClient");
import PlayerManager = require("../managers/PlayerManager");
import MapManager = require("../managers/MapManager");
import TOTDManager = require("../managers/TOTDManager");
import COTDManager = require("../managers/COTDManager");
import ClubManager = require("../managers/ClubManager");
import CampaignManager = require("../managers/CampaignManager");
import RoomManager = require("../managers/RoomManager");
import EventManager = require("../managers/EventManager");
import defaultOptions = require("../util/defaultOptions");
