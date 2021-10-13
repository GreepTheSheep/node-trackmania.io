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
     * @readonly
     * @private can be used but keep it private
     */
    private readonly get timestamp();
    /**
     * The club tag of the player (non-formatted)
     * @returns {String}
     */
    get clubTag(): string;
    /**
     * The last change of the player's club tag
     * @returns {Date}
     * @readonly
     */
    readonly get lastClubTagChange(): Date;
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
     * The player's COTD Data
     * @returns {PlayerCOTD}
     */
    get cotd(): PlayerCOTD;
    /** @private */
    private _cotd;
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
    constructor(player: any, data: any);
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
     * The data
     * @private
     */
    private _data;
    /**
     * The points of the player
     * @returns {Number}
     */
    get points(): number;
    /**
     * The last time the player got a trophy
     * @returns {Date}
     * @readonly
     */
    readonly get lastChange(): Date;
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
declare class PlayerCOTD {
    constructor(player: any, data: any);
    /**
     * The Player object
     * @type {Player}
     */
    player: Player;
    /**
     * The client object
     * @type {Client}
     */
    client: Client;
    /**
     * The data
     * @private
     */
    private _data;
    /**
     * The number of COTDs played
     * @returns {Number}
     */
    get count(): number;
    /**
     * The Player COTD stats
     * @type {PlayerCOTDStats}
     */
    get stats(): PlayerCOTDStats;
    /** @private */
    private _stats;
    /**
     * Get the 25 recents COTD results
     * @returns {Array<PlayerCOTDResult>}
     */
    get recentResults(): PlayerCOTDResult[];
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
    /**
     * The history of recent matches on this matchmaking
     * @returns {Array<PlayerMatchmakingMatchResult>}
     */
    get history(): PlayerMatchmakingMatchResult[];
}
declare class PlayerEchelon {
    constructor(player: any, data: any);
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
declare class PlayerCOTDStats {
    constructor(player: any, data: any);
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
     * The data
     * @private
     */
    private _data;
    /**
     * The best stats in the primary COTD
     * @type {PlayerCOTDStatsBest}
     */
    get bestPrimary(): PlayerCOTDStatsBest;
    /** @private */
    private _bestprimary;
    /**
     * The best stats in all COTDs (including reruns)
     * @type {PlayerCOTDStatsBest}
     */
    get bestOverall(): PlayerCOTDStatsBest;
    /** @private */
    private _bestoverall;
    /**
     * The total COTD wins in division 1
     * @returns {Number}
     */
    get totalWins(): number;
    /**
     * The total COTD wins in any divison
     * @returns {Number}
     */
    get totalDivWins(): number;
    /**
     * Average rank, float between 0 and 1
     * @returns {Number}
     */
    get averageRank(): number;
    /**
     * Average div rank (in any division), float between 0 and 1
     * @returns {Number}
     */
    get averageDivRank(): number;
    /**
     * Average division
     * @returns {Number}
     */
    get averageDiv(): number;
    /**
     * The win streak in division 1
     * @returns {Number}
     */
    get winStreak(): number;
    /**
     * The win streak in any division
     * @returns {Number}
     */
    get divWinStreak(): number;
}
declare class PlayerCOTDResult {
    constructor(player: any, data: any);
    /**
     * The Player object
     * @type {Player}
     */
    player: Player;
    /**
     * The client object
     * @type {Client}
     */
    client: Client;
    /**
     * The data
     * @private
     */
    private _data;
    /**
     * The ID of the COTD
     * @returns {Number}
     */
    get id(): number;
    /**
     * The date of the COTD
     * @returns {Date}
     * @readonly
     */
    readonly get date(): Date;
    /**
     * The name of the COTD
     * @returns {String}
     */
    get name(): string;
    /**
     * The division of the COTD
     * @returns {Number}
     */
    get division(): number;
    /**
     * The overall rank on the COTD
     * @returns {Number}
     */
    get rank(): number;
    /**
     * The division rank on the COTD
     * @returns {Number}
     */
    get divisionRank(): number;
    /**
     * The score of the COTD
     * @returns {Number}
     */
    get score(): number;
    /**
     * The total number of players of the COTD
     * @returns {Number}
     */
    get totalPlayers(): number;
}
declare class PlayerMatchmakingMatchResult {
    constructor(player: any, data: any);
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
     * The data
     * @private
     */
    private _data;
    /**
     * The player has win the match
     * @returns {Boolean}
     */
    get win(): boolean;
    /**
     * The player has leaved the match
     * @returns {Boolean}
     */
    get leave(): boolean;
    /**
     * The player is the most valuable player in the match
     * @returns {Boolean}
     */
    get mvp(): boolean;
    /**
     * The match LiveID
     * @returns {String}
     */
    get liveId(): string;
    /**
     * The start date of the match
     * @returns {Date}
     */
    get startDate(): Date;
    /**
     * The score of the player after this match
     * @returns {Number}
     */
    get afterScore(): number;
}
declare class PlayerCOTDStatsBest {
    constructor(PlayerCOTDStats: any, data: any);
    /**
    * The PlayerCOTDStats object
    * @type {PlayerCOTDStats}
    */
    stats: PlayerCOTDStats;
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
    * The data
    * @private
    */
    private _data;
    /**
     * The best rank
     * @returns {Number}
     */
    get rank(): number;
    /**
     * The best rank date
     * @returns {Date}
     * @readonly
     */
    readonly get rankDate(): Date;
    /**
     * The best div rank
     * @returns {Number}
     */
    get divRank(): number;
    /**
     * The best division
     * @returns {Number}
     */
    get division(): number;
    /**
     * The best divison date
     * @returns {Date}
     * @readonly
     */
    readonly get divisionDate(): Date;
    /**
     * The best rank in a division
     * @returns {Number}
     */
    get rankInDivision(): number;
    /**
     * The best rank in a division date
     * @returns {Date}
     * @readonly
     */
    readonly get rankInDivisionDate(): Date;
    /**
     * The division who got the best rank in a division
     * @returns {Number}
     */
    get divisionOfRankInDivision(): number;
}
