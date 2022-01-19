const {DateTime} = require('luxon');
const BaseClient = require('./BaseClient');

const defaultOptions = require('../util/defaultOptions'); // eslint-disable-line no-unused-vars
const TOTD = require('../structures/TOTD'); // eslint-disable-line no-unused-vars

// Managers
const PlayerManager = require('../managers/PlayerManager');
const MapManager = require('../managers/MapManager');
const TOTDManager = require('../managers/TOTDManager');
const COTDManager = require('../managers/COTDManager');
const ClubManager = require('../managers/ClubManager');
const CampaignManager = require('../managers/CampaignManager');
const RoomManager = require('../managers/RoomManager');
const EventManager = require('../managers/EventManager');
const NewsManager = require('../managers/NewsManager');
const AdsManager = require('../managers/AdsManager');
const MatchesManager = require('../managers/MatchesManager');

/**
 * Instantiates a new client. This is the entry point.
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

        /**
         * The matches manager
         * @type {MatchesManager}
         */
        this.matches = new MatchesManager(this);

        /**
         * The news manager
         * @type {NewsManager}
         */
        this.news = new NewsManager(this);

        /**
         * The Maniapub manager
         * @type {AdsManager}
         */
        this.ads = new AdsManager(this);


        // Will initialize the TOTD event, witch calls an event for a new TOTD every day at 19h Europe/Paris timezone
        let newTotdChecked = false;
        setInterval(async ()=>{
            const date = DateTime.local().setZone("Europe/Paris");
            if (date.hour === 19 && date.minute === 1 && !newTotdChecked){
                let totd = await this.totd.get(date.toJSDate());
                /**
                 * Emitted when a new Track Of The Day is out on Trackmania.io.
                 * <info>This event is mostly emitted one minute after the release (at 19h01 CE(S)T)</info>
                 * @event Client#totd
                 * @param {TOTD} totd The Track of The Day
                 */
                this.emit('totd', totd);

                // this prevent emitting this event a second time in the same day
                newTotdChecked = true;
            } else {
                if (date.hour !== 19 && date.minute !== 1 && newTotdChecked) newTotdChecked = false;
            }
        }, 10000);
    }

    /**
     * Format the string and remove the TM style code on it.
     * @param {string} str string to format
     * @returns {string}
     */
    formatTMText(str){
        let res, resStr;

        // Iterate through the string and check if there are $t,

        // First remplace all $T by $t and $Z by $z (for the regex)
        resStr = str.replace(/\$T/g, '$t').replace(/\$Z/g, '$z');
        
        
        // If there is a $t, it will be replaced by the text in uppercase until the $z or the end of the string
        while ((res = resStr.match(/\$t(.)*(\$z)|\$t(.)*$/g)) !== null) {
            for (let i = 0; i < res.length; i++) {
                resStr = resStr.replace(res[i], res[i].toUpperCase());
            }
        }

        // Check if there are two dollar signs in a row, returns one dollar sign
        resStr = resStr.replace(/\$\$/gi, '$');

        // Then remove all TM codes
        return resStr.replace(/\$[<>wnoisgtz]|\$[hl]\[(.)+\]|\$[hl]|\$[0-9a-fA-F]{3}/gi, '');
    }
}

module.exports = Client;

/**
 * Emitted for general debugging information.
 * @event Client#debug
 * @param {string} instance The instance name where the debug is triggered
 * @param {string} info The debug information
 */

/**
 * Emitted when there is an error when fetching external data (Trackmania.exchange for example).
 * @event Client#error
 * @param {string} error The error
 */