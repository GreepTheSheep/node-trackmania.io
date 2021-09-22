export = Player;
declare class Player {
    constructor(client: any, data: any);
    /**
     * The client object of the player
     * @type {Client}
     */
    client: Client;
    /** @private */
    private _data;
    /**
     * Constructs an array of the zone of the player
     * @returns {Array<Object>}
     * @private
     */
    private _constructZoneArray;
    /**
     * The account ID of the player
     * @returns {String}
     */
    get id(): string;
    /**
     * The display name of the player
     * @returns {String}
     */
    get name(): string;
    /**
     * The timestamps of the player's first login
     * @returns {Date}
     * @private can be used but keep it private
     */
    private get timestamp();
    /**
     * The club tag of the player (non-formatted)
     * @returns {String}
     */
    get clubTag(): string;
    /**
     * The last change of the player's club tag
     * @returns {Date}
     */
    get lastClubTagChange(): Date;
    /**
     * The player's zone data with the ranking of the player in the zone
     * @returns {Array<Object>} An array from the player's region name to World
     * @example
     * // Generate a string of the player's zone data
     * const string = player.zone.map(p=>p.name).join(', ');
     */
    get zone(): any[];
    /**
     * The player's trophy data
     * @returns {PlayerTrophies}
     */
    get trophies(): PlayerTrophies;
    /** @private */
    private _PlayerTrophies;
    /**
     * The player's meta data
     * @returns {PlayerMeta}
     */
    get meta(): PlayerMeta;
    /** @private */
    private _PlayerMeta;
    /**
     * The player's matchmaking data
     * @param {String | number} type The type of matchmaking data to return ('3v3' / 'Royal') (defaults to '3v3')
     * @returns {PlayerMatchmaking}
     */
    matchmaking(type?: string | number): PlayerMatchmaking;
    /** @private */
    private _PlayerMatchmaking;
}
import Client = require("../client/Client");
declare class PlayerTrophies {
    constructor(player: any);
    /**
     * The player object
     * @type {Player}
     */
    player: Player;
    /**
     * The points of the player
     * @returns {Number}
     */
    get points(): number;
    /**
     * The last time the player got a trophy
     * @returns {Date}
     */
    get lastChange(): Date;
    /**
     * The echelon level of the player
     * @returns {PlayerEchelon}
     */
    get echelon(): PlayerEchelon;
    /** @private */
    private _PlayerEchelon;
    /**
     * The number of trophies the player has
     * @param {Number} number The trophy number, from 1 (bronze 1) to 9 (gold 3)
     * @returns {Number}
     * @example
     * // Get number of trophy 5 (aka silver 2 trophy)
     * player.trophies.trophy(5);
     */
    trophy(number?: number): number;
    /**
     * The number of trophies the player has
     * @returns {Array<Number>}
     */
    get trophies(): number[];
}
declare class PlayerMeta {
    constructor(player: any);
    /**
     * The player object
     * @type {Player}
     */
    player: Player;
    /**
     * The vanity name of the player, if the player has one, otherwise null
     * @returns {String}
     */
    get vanity(): string;
    /**
     * The youtube link of the player, if the player has one, otherwise null
     * @returns {String}
     */
    get youtube(): string;
    /**
     * The twitter link of the player, if the player has one, otherwise null
     * @returns {String}
     */
    get twitter(): string;
    /**
     * The twitch channel link of the player, if the player has one, otherwise null
     * @returns {String}
     */
    get twitch(): string;
    /**
     * The display URL of the player
     * @returns {String}
     */
    get displayURL(): string;
}
declare class PlayerMatchmaking {
    constructor(player: any, type: any);
    /**
     * The player object
     * @type {Player}
     */
    player: Player;
    /**
     * The client object
     * @type {Client}
     */
    client: Client;
    /**
     * The raw data of the player's matchmaking data based on the type
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The type name of the matchmaking
     * @returns {String}
     */
    get type(): string;
    /**
     * The type ID of the matchmaking
     * @returns {Number}
     */
    get typeId(): number;
    /**
     * The rank of the player on this matchmaking
     * @returns {Number}
     */
    get rank(): number;
    /**
     * The MMR rank of the player on this matchmaking (score)
     * @returns {Number}
     */
    get score(): number;
    /**
     * The progression of the player on this matchmaking (can be number of wins for Royal, or score for 3v3)
     * @returns {Number}
     */
    get progression(): number;
    /**
     * The division of the player on this matchmaking
     * @returns {MatchmakingDivision}
     */
    get division(): import("./MatchmakingDivision");
    /** @private */
    private _MatchmakingDivision;
}
declare class PlayerEchelon {
    constructor(player: any);
    /**
     * The player object
     * @type {Player}
     */
    player: Player;
    /**
     * The client object of the player
     * @type {Client}
     */
    client: Client;
    /**
     * The echelon number
     * @type {Number}
     */
    number: number;
    /**
     * The name of the echelon
     * @returns {String}
     */
    get name(): string;
    /**
     * The image URL of the echelon
     * @returns {String}
     */
    get image(): string;
}
