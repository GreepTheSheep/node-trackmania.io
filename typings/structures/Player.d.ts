export = Player;
/**
 * Represents a player in Trackmania.
 */
declare class Player {
    /**
     * @param {Client} client The client.
     * @param {Object} data
     */
    constructor(client: Client, data: any);
    /**
     * The client object of the player
     * @type {Client}
     */
    client: Client;
    /**
     * The data of the player
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * Constructs an array of the zone of the player
     * @returns {Array<Object>}
     * @private
     */
    private _constructZoneArray;
    /**
     * The account ID of the player
     * @type {String}
     */
    get id(): string;
    /**
     * The display name of the player
     * @type {String}
     */
    get name(): string;
    /**
     * The timestamps of the player's first login
     * @type {Date}
     * @readonly
     * @private can be used but keep it private
     */
    private readonly get timestamp();
    /**
     * The club tag of the player (non-formatted)
     * @type {String}
     */
    get clubTag(): string;
    /**
     * The last change of the player's club tag
     * @type {Date}
     * @readonly
     */
    readonly get lastClubTagChange(): Date;
    /**
     * The player's zone data with the ranking of the player in the zone
     * @type {Array<Object>} An array from the player's region name to World
     * @example
     * // Generate a string of the player's zone data
     * const string = player.zone.map(p=>p.name).join(', ');
     */
    get zone(): any[];
    /**
     * The player's trophy data
     * @type {PlayerTrophies}
     */
    get trophies(): PlayerTrophies;
    /**
     * The player's trophy data
     * @type {PlayerTrophies}
     * @private
     */
    private _PlayerTrophies;
    /**
     * The player's meta data
     * @type {PlayerMeta}
     */
    get meta(): PlayerMeta;
    /**
     * The player's meta data
     * @type {PlayerMeta}
     * @private
     */
    private _PlayerMeta;
    /**
     * The player's COTD Data
     * @type {PlayerCOTD}
     */
    get cotd(): PlayerCOTD;
    /**
     * The player's COTD Data
     * @type {PlayerCOTD}
     * @private
     */
    private _cotd;
    /**
     * The player's matchmaking data
     * @param {String | number} type The type of matchmaking data to return ('3v3' / 'Royal') (defaults to '3v3')
     * @type {PlayerMatchmaking}
     */
    matchmaking(type?: string | number): PlayerMatchmaking;
    /**
     * The player's matchmaking data
     * @type {PlayerMatchmaking}
     * @private
     */
    private _PlayerMatchmaking;
}
import Client = require("../client/Client");
/**
 * Represents the trophies of a player
 */
declare class PlayerTrophies {
    /**
     * @param {Player} player The player
     * @param {Object} data
     */
    constructor(player: Player, data: any);
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The points of the player
     * @type {Number}
     */
    get points(): number;
    /**
     * The last time the player got a trophy
     * @type {Date}
     * @readonly
     */
    readonly get lastChange(): Date;
    /**
     * The echelon level of the player
     * @type {PlayerEchelon}
     */
    get echelon(): PlayerEchelon;
    /**
     * The player's echelon data
     * @type {PlayerEchelon}
     * @private
     */
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
     * @type {Array<Number>}
     */
    get trophies(): number[];
    /**
     * The last 25 trophies gains of the player
     * @type {Array<PlayerTrophyHistory>}
     */
    get history(): PlayerTrophyHistory[];
}
/**
 * Represents a player's metadata
 */
declare class PlayerMeta {
    /**
     * @param {Player} player The player.
     */
    constructor(player: Player);
    /**
     * The player object
     * @type {Player}
     */
    player: Player;
    /**
     * The vanity name of the player, if the player has one, otherwise null
     * @type {String}
     */
    get vanity(): string;
    /**
     * The youtube link of the player, if the player has one, otherwise null
     * @type {String}
     */
    get youtube(): string;
    /**
     * The twitter link of the player, if the player has one, otherwise null
     * @type {String}
     */
    get twitter(): string;
    /**
     * The twitch channel link of the player, if the player has one, otherwise null
     * @type {String}
     */
    get twitch(): string;
    /**
     * The display URL of the player
     * @type {String}
     */
    get displayURL(): string;
}
/**
 * Represents a player's COTD object
 */
declare class PlayerCOTD {
    /**
     * @param {Player} player The player.
     * @param {Object} data
     */
    constructor(player: Player, data: any);
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The number of COTDs played
     * @type {Number}
     */
    get count(): number;
    /**
     * The Player COTD stats
     * @type {PlayerCOTDStats}
     */
    get stats(): PlayerCOTDStats;
    /**
     * The Player COTD stats
     * @type {PlayerCOTDStats}
     * @private
     */
    private _stats;
    /**
     * Get the 25 recents COTD results
     * @type {Array<PlayerCOTDResult>}
     */
    get recentResults(): PlayerCOTDResult[];
}
/**
 * Represents a player's stats in matchmaking
 */
declare class PlayerMatchmaking {
    /**
     * @param {Player} player The player.
     * @param {string|number} type The type of matchmaking. (3v3 or Royal)
     */
    constructor(player: Player, type: string | number);
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
     * @type {String}
     */
    get type(): string;
    /**
     * The type ID of the matchmaking
     * @type {Number}
     */
    get typeId(): number;
    /**
     * The rank of the player on this matchmaking
     * @type {Number}
     */
    get rank(): number;
    /**
     * The MMR rank of the player on this matchmaking (score)
     * @type {Number}
     */
    get score(): number;
    /**
     * The progression of the player on this matchmaking (can be number of wins for Royal, or score for 3v3)
     * @type {Number}
     */
    get progression(): number;
    /**
     * The division of the player on this matchmaking
     * @type {MatchmakingDivision}
     */
    get division(): import("./MatchmakingDivision");
    /**
     * The division of the player on this matchmaking
     * @type {MatchmakingDivision}
     * @private
     */
    private _MatchmakingDivision;
    /**
     * The history of recent matches on this matchmaking
     * @type {Array<PlayerMatchmakingMatchResult>}
     */
    get history(): PlayerMatchmakingMatchResult[];
}
/**
 * Represents a player's echelon
 */
declare class PlayerEchelon {
    /**
     * @param {Player} player The player.
     * @param {Object} data
     */
    constructor(player: Player, data: any);
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
     * @type {String}
     */
    get name(): string;
    /**
     * The image URL of the echelon
     * @type {String}
     */
    get image(): string;
}
/**
 * Represents the history of a player's trophies
 */
declare class PlayerTrophyHistory {
    /**
     * @param {Player} player The player.
     * @param {Object} data
     */
    constructor(player: Player, data: any);
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The number of trophies the player has
     * @param {Number} number The trophy number, from 1 (bronze 1) to 9 (gold 3)
     * @returns {Number}
     * @example
     * // Get number of trophy 5 (aka silver 2 trophy) on the latest gain
     * player.trophies.history[0].trophy(5);
     */
    trophy(number?: number): number;
    /**
     * The number of trophies the player has
     * @type {Array<Number>}
     */
    get trophies(): number[];
    /**
     * The date of the gain
     * @type {Date}
     */
    get date(): Date;
    /**
     * The rank of the player
     * @type {Number}
     */
    get rank(): number;
    /**
     * The types of the achievement
     * @type {PlayerTrophyAchievementType}
     */
    get type(): PlayerTrophyAchievementType;
    /**
     * The achievement type object
     * @type {PlayerTrophyAchievementType}
     * @private
     */
    private _achievement;
    /**
     * The map where the achievement was earned (if any)
     * @returns {Promise<TMMap>|null}
     */
    map(): Promise<TMMap> | null;
}
/**
 * Represents a player's COTD stats
 */
declare class PlayerCOTDStats {
    /**
     * @param {Player} player The player.
     * @param {Object} data
     */
    constructor(player: Player, data: any);
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The best stats in the primary COTD
     * @type {PlayerCOTDStatsBest}
     */
    get bestPrimary(): PlayerCOTDStatsBest;
    /**
     * The best stats in the primary COTD
     * @type {PlayerCOTDStatsBest}
     * @private
     */
    private _bestprimary;
    /**
     * The best stats in all COTDs (including reruns)
     * @type {PlayerCOTDStatsBest}
     */
    get bestOverall(): PlayerCOTDStatsBest;
    /**
     * The best stats in all COTDs (including reruns)
     * @type {PlayerCOTDStatsBest}
     * @private
     */
    private _bestoverall;
    /**
     * The total COTD wins in division 1
     * @type {Number}
     */
    get totalWins(): number;
    /**
     * The total COTD wins in any divison
     * @type {Number}
     */
    get totalDivWins(): number;
    /**
     * Average rank, float between 0 and 1
     * @type {Number}
     */
    get averageRank(): number;
    /**
     * Average div rank (in any division), float between 0 and 1
     * @type {Number}
     */
    get averageDivRank(): number;
    /**
     * Average division
     * @type {Number}
     */
    get averageDiv(): number;
    /**
     * The win streak in division 1
     * @type {Number}
     */
    get winStreak(): number;
    /**
     * The win streak in any division
     * @type {Number}
     */
    get divWinStreak(): number;
}
/**
 * Represents a player's COTD result
 */
declare class PlayerCOTDResult {
    /**
     * @param {Player} player The player
     * @param {Object} data
     */
    constructor(player: Player, data: any);
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The ID of the COTD
     * @type {Number}
     */
    get id(): number;
    /**
     * The date of the COTD
     * @type {Date}
     * @readonly
     */
    readonly get date(): Date;
    /**
     * The name of the COTD
     * @type {String}
     */
    get name(): string;
    /**
     * The division of the COTD
     * @type {Number}
     */
    get division(): number;
    /**
     * The overall rank on the COTD
     * @type {Number}
     */
    get rank(): number;
    /**
     * The division rank on the COTD
     * @type {Number}
     */
    get divisionRank(): number;
    /**
     * The score of the COTD
     * @type {Number}
     */
    get score(): number;
    /**
     * The total number of players of the COTD
     * @type {Number}
     */
    get totalPlayers(): number;
}
/**
 * Represents a player's matchmaking match result
 */
declare class PlayerMatchmakingMatchResult {
    /**
     * @param {Player} player The player.
     * @param {Object} data
     */
    constructor(player: Player, data: any);
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The player has win the match
     * @type {Boolean}
     */
    get win(): boolean;
    /**
     * The player has leaved the match
     * @type {Boolean}
     */
    get leave(): boolean;
    /**
     * The player is the most valuable player in the match
     * @type {Boolean}
     */
    get mvp(): boolean;
    /**
     * The match LiveID
     * @type {String}
     */
    get liveId(): string;
    /**
     * The start date of the match
     * @type {Date}
     */
    get startDate(): Date;
    /**
     * The score of the player after this match
     * @type {Number}
     */
    get afterScore(): number;
}
/**
 * Represents the type of an achievement
 */
declare class PlayerTrophyAchievementType {
    /**
     * @param {Player} player
     * @param {Object} data
     */
    constructor(player: Player, data: any);
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * Gets the type of the achievement
     * @type {String}
     */
    get type(): string;
    /**
     * Gets the ID of the achievement
     * @type {String}
     */
    get id(): string;
    /**
     * Gets the solo ranking achievement type (if the type is SoloRanking)
     * @type {String|null}
     */
    get soloRankingType(): string;
    /**
     * Gets the solo ranking season ID (if the type is SoloRanking)
     * @type {String|null}
     */
    get soloRankingSeasonId(): string;
    /**
     * Gets the competition id (if the type is CompetitionRanking)
     * @type {String|null}
     */
    get competitionId(): string;
    /**
     * Gets the competition name (if the type is CompetitionRanking)
     * @type {String|null}
     */
    get competitionName(): string;
    /**
     * Gets the competition stage (if the type is CompetitionRanking)
     * @type {String|null}
     */
    get competitionStage(): string;
    /**
     * Gets the competition stage step (if the type is CompetitionRanking)
     * @type {String|null}
     */
    get competitionStageStep(): string;
    /**
     * Gets the competition type (if the type is CompetitionRanking)
     * @type {String|null}
     */
    get competitionType(): string;
    /**
     * Gets the Solo Medal type (if the type is SoloMedal)
     * @type {String|null}
     */
    get soloMedalType(): string;
    /**
     * Gets the solo medal level (if the type is SoloMedal)
     * @type {Number|null}
     */
    get soloMedalLevel(): number;
    /**
     * Gets the server ID of the Live Match (if the type is LiveMatch)
     * @type {String|null}
     */
    get liveMatchServerId(): string;
    /**
     * Gets the game mode of the Live Match (if the type is LiveMatch)
     * @type {String|null}
     */
    get liveMatchGameMode(): string;
    /**
     * Gets the duration of the Live Match in seconds (if the type is LiveMatch)
     * @type {Number|null}
     */
    get liveMatchDuration(): number;
    /**
     * Gets the rank of the Live Match (if the type is LiveMatch)
     * @type {Number|null}
     */
    get liveMatchRank(): number;
    /**
     * Gets the trophy rank of the Live Match (if the type is LiveMatch)
     * @type {Number|null}
     */
    get liveMatchTrophyRank(): number;
}
import TMMap = require("../structures/TMMap");
/**
 * Represents a player's COTD stats best stats
 */
declare class PlayerCOTDStatsBest {
    /**
     * @param {PlayerCOTDStats} PlayerCOTDStats The player's COTD stats
     * @param {Object} data
     */
    constructor(PlayerCOTDStats: PlayerCOTDStats, data: any);
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
    * @type {Object}
    * @private
    */
    private _data;
    /**
     * The best rank
     * @type {Number}
     */
    get rank(): number;
    /**
     * The best rank date
     * @type {Date}
     * @readonly
     */
    readonly get rankDate(): Date;
    /**
     * The best div rank
     * @type {Number}
     */
    get divRank(): number;
    /**
     * The best division
     * @type {Number}
     */
    get division(): number;
    /**
     * The best divison date
     * @type {Date}
     * @readonly
     */
    readonly get divisionDate(): Date;
    /**
     * The best rank in a division
     * @type {Number}
     */
    get rankInDivision(): number;
    /**
     * The best rank in a division date
     * @type {Date}
     * @readonly
     */
    readonly get rankInDivisionDate(): Date;
    /**
     * The division who got the best rank in a division
     * @type {Number}
     */
    get divisionOfRankInDivision(): number;
}
