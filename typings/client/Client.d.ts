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
    get players(): PlayerManager;
    /** @private */
    private _PlayerManager;
    /**
     * The map manager
     * @returns {MapManager}
     */
    get maps(): MapManager;
    /** @private */
    private _MapManager;
    /**
     * The TOTD manager
     * @returns {TOTDManager}
     */
    get totd(): TOTDManager;
    /** @private */
    private _TOTDManager;
    /**
     * The club manager
     * @returns {ClubManager}
     */
    get clubs(): ClubManager;
    /** @private */
    private _ClubManager;
    /**
     * The campaign manager
     * @returns {CampaignManager}
     */
    get campaigns(): CampaignManager;
    /** @private */
    private _CampaignManager;
    /**
     * The room manager
     * @returns {RoomManager}
     */
    get rooms(): RoomManager;
    /** @private */
    private _RoomManager;
    /**
     * The TM events manager
     * @returns {EventManager}
     */
    get events(): EventManager;
    /** @private */
    private _EventManager;
}
import BaseClient = require("./BaseClient");
import PlayerManager = require("../managers/PlayerManager");
import MapManager = require("../managers/MapManager");
import TOTDManager = require("../managers/TOTDManager");
import ClubManager = require("../managers/ClubManager");
import CampaignManager = require("../managers/CampaignManager");
import RoomManager = require("../managers/RoomManager");
import EventManager = require("../managers/EventManager");
import defaultOptions = require("../util/defaultOptions");
