export = Client;
/**
 * Instantiates a new client. This is the entry point.
 * @extends {BaseClient}
 */
declare class Client extends BaseClient {
    /**
     * @param {defaultOptions} [options={}] The options to use
     */
    constructor(options?: defaultOptions);
    /**
     * The player manager
     * @type {PlayerManager}
     */
    players: PlayerManager;
    /**
     * The map manager
     * @type {MapManager}
     */
    maps: MapManager;
    /**
     * The TOTD manager
     * @type {TOTDManager}
     */
    totd: TOTDManager;
    /**
     * The COTD manager
     * @type {COTDManager}
     */
    cotd: COTDManager;
    /**
     * The club manager
     * @type {ClubManager}
     */
    clubs: ClubManager;
    /**
     * The campaign manager
     * @type {CampaignManager}
     */
    campaigns: CampaignManager;
    /**
     * The room manager
     * @type {RoomManager}
     */
    rooms: RoomManager;
    /**
     * The TM events manager
     * @type {EventManager}
     */
    events: EventManager;
    /**
     * Format the string and remove the TM style code on it.
     * @param {string} str string to format
     * @returns {string}
     */
    formatTMText(str: string): string;
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