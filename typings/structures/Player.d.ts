export = Player;
/**
 * Represents a player in Trackmania.
 */
declare class Player {
    constructor(client: any, data: any);
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
     * @type {string}
     */
    get id(): string;
    /**
     * The display name of the player
     * @type {string}
     */
    get name(): string;
    /**
     * The timestamps of the player's first login
     * @type {Date}
     * @readonly
     * @private
     */
    private readonly get timestamp();
    /**
     * The club tag of the player (non-formatted)
     * @type {string}
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
     * @type {Array<Object>}
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
     * @param {number} [page=0] The page number.
     * @returns {Promise<PlayerCOTD>}
     */
    cotd(page?: number): Promise<PlayerCOTD>;
    /**
     * The player's matchmaking data
     * @param {MatchmakingGroup} [type="3v3"] The type of matchmaking data to return
     * @returns {PlayerMatchmaking}
     */
    matchmaking(type?: MatchmakingGroup): PlayerMatchmaking;
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The points of the player
     * @type {number}
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
     * @param {number} [number=1] The trophy number, from 1 (bronze 1) to 9 (gold 3)
     * @returns {number}
     * @example
     * // Get number of trophy 5 (aka silver 2 trophy)
     * player.trophies.trophy(5);
     */
    trophy(number?: number): number;
    /**
     * The number of trophies the player has
     * @type {Array<number>}
     */
    get trophies(): number[];
    /**
     * The last 25 trophies gains of the player
     * @param {number} [page=0] The page number.
     * @type {Array<PlayerTrophyHistory>}
     */
    history(page?: number): Promise<PlayerTrophyHistory[]>;
}
/**
 * Represents a player's metadata
 */
declare class PlayerMeta {
    constructor(player: any);
    /**
     * The player object
     * @type {Player}
     */
    player: Player;
    /**
     * The vanity name of the player, if the player has one, otherwise null
     * @type {string}
     */
    get vanity(): string;
    /**
     * The youtube link of the player, if the player has one, otherwise null
     * @type {string}
     */
    get youtube(): string;
    /**
     * The twitter link of the player, if the player has one, otherwise null
     * @type {string}
     */
    get twitter(): string;
    /**
     * The twitch channel link of the player, if the player has one, otherwise null
     * @type {string}
     */
    get twitch(): string;
    /**
     * The display URL of the player
     * @type {string}
     */
    get displayURL(): string;
    /**
     * Whether the player is in the TMGL group
     * @type {boolean}
     */
    get inTMGL(): boolean;
    /**
     * Whether the player is in the TMWC21 group
     * @type {boolean}
     */
    get inTMWC21(): boolean;
    /**
     * Whether the player is in the Nadeo company
     * @type {boolean}
     */
    get inNadeo(): boolean;
    /**
     * Whether the player is in the Openplanet & Trackmania.io team
     * @type {boolean}
     */
    get inTMIOTeam(): boolean;
    /**
     * Whether the player is a Openplanet & Trackmania.io sponsor
     * @type {boolean}
     */
    get isSponsor(): boolean;
    /**
     * If the player is a sponsor, this returns the sponsor's level
     * @type {?number}
     */
    get sponsorLevel(): number;
}
/**
 * Represents a player's COTD object
 */
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The number of COTDs played
     * @type {number}
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
import { MatchmakingGroup } from "../util/Constants";
/**
 * Represents a player's stats in matchmaking
 */
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
     * @type {string}
     */
    get type(): string;
    /**
     * The type ID of the matchmaking
     * @type {number}
     */
    get typeId(): number;
    /**
     * The rank of the player on this matchmaking
     * @type {number}
     */
    get rank(): number;
    /**
     * The MMR rank of the player on this matchmaking (score)
     * @type {number}
     */
    get score(): number;
    /**
     * The progression of the player on this matchmaking (can be number of wins for Royal, or score for 3v3)
     * @type {number}
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
     * @param {number} [page=0] The page number to get
     * @type {Promise<Array<PlayerMatchmakingMatchResult>>}
     */
    history(page?: number): Promise<PlayerMatchmakingMatchResult[]>;
}
/**
 * Represents a player's echelon
 */
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
     * @type {number}
     */
    number: number;
    /**
     * The name of the echelon
     * @type {string}
     */
    get name(): string;
    /**
     * The image URL of the echelon
     * @type {string}
     */
    get image(): string;
}
/**
 * Represents the history of a player's trophies
 */
declare class PlayerTrophyHistory {
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The number of trophies the player has
     * @param {number} [number=1] The trophy number, from 1 (bronze 1) to 9 (gold 3)
     * @returns {number}
     * @example
     * // Get number of trophy 5 (aka silver 2 trophy) on the latest gain
     * player.trophies.history[0].trophy(5);
     */
    trophy(number?: number): number;
    /**
     * The number of trophies the player has
     * @type {Array<number>}
     */
    get trophies(): number[];
    /**
     * The date of the gain
     * @type {Date}
     */
    get date(): Date;
    /**
     * The rank of the player
     * @type {number}
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
     * @type {number}
     */
    get totalWins(): number;
    /**
     * The total COTD wins in any divison
     * @type {number}
     */
    get totalDivWins(): number;
    /**
     * Average rank, float between 0 and 1
     * @type {number}
     */
    get averageRank(): number;
    /**
     * Average div rank (in any division), float between 0 and 1
     * @type {number}
     */
    get averageDivRank(): number;
    /**
     * Average division
     * @type {number}
     */
    get averageDiv(): number;
    /**
     * The win streak in division 1
     * @type {number}
     */
    get winStreak(): number;
    /**
     * The win streak in any division
     * @type {number}
     */
    get divWinStreak(): number;
}
/**
 * Represents a player's COTD result
 */
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The ID of the COTD
     * @type {number}
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
     * @type {string}
     */
    get name(): string;
    /**
     * The division of the COTD
     * @type {number}
     */
    get division(): number;
    /**
     * The overall rank on the COTD
     * @type {number}
     */
    get rank(): number;
    /**
     * The division rank on the COTD
     * @type {number}
     */
    get divisionRank(): number;
    /**
     * The score of the COTD
     * @type {number}
     */
    get score(): number;
    /**
     * The total number of players of the COTD
     * @type {number}
     */
    get totalPlayers(): number;
}
/**
 * Represents a player's matchmaking match result
 */
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The player has win the match
     * @type {boolean}
     */
    get win(): boolean;
    /**
     * The player has leaved the match
     * @type {boolean}
     */
    get leave(): boolean;
    /**
     * The player is the most valuable player in the match
     * @type {boolean}
     */
    get mvp(): boolean;
    /**
     * The match LiveID
     * @type {string}
     */
    get liveId(): string;
    /**
     * The start date of the match
     * @type {Date}
     */
    get startDate(): Date;
    /**
     * The score of the player after this match
     * @type {number}
     */
    get afterScore(): number;
}
/**
 * Represents the type of an achievement
 */
declare class PlayerTrophyAchievementType {
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
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * Gets the type of the achievement
     * @type {string}
     */
    get type(): string;
    /**
     * Gets the ID of the achievement
     * @type {string}
     */
    get id(): string;
    /**
     * Gets the solo ranking achievement type (if the type is SoloRanking)
     * @type {?string}
     */
    get soloRankingType(): string;
    /**
     * Gets the solo ranking season ID (if the type is SoloRanking)
     * @type {?string}
     */
    get soloRankingSeasonId(): string;
    /**
     * Gets the competition id (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionId(): string;
    /**
     * Gets the competition name (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionName(): string;
    /**
     * Gets the competition stage (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionStage(): string;
    /**
     * Gets the competition stage step (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionStageStep(): string;
    /**
     * Gets the competition type (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionType(): string;
    /**
     * Gets the Solo Medal type (if the type is SoloMedal)
     * @type {?string}
     */
    get soloMedalType(): string;
    /**
     * Gets the solo medal level (if the type is SoloMedal)
     * @type {?number}
     */
    get soloMedalLevel(): number;
    /**
     * Gets the server ID of the Live Match (if the type is LiveMatch)
     * @type {?string}
     */
    get liveMatchServerId(): string;
    /**
     * Gets the game mode of the Live Match (if the type is LiveMatch)
     * @type {?string}
     */
    get liveMatchGameMode(): string;
    /**
     * Gets the duration of the Live Match in seconds (if the type is LiveMatch)
     * @type {?number}
     */
    get liveMatchDuration(): number;
    /**
     * Gets the rank of the Live Match (if the type is LiveMatch)
     * @type {?number}
     */
    get liveMatchRank(): number;
    /**
     * Gets the trophy rank of the Live Match (if the type is LiveMatch)
     * @type {?number}
     */
    get liveMatchTrophyRank(): number;
}
import TMMap = require("../structures/TMMap");
/**
 * Represents a player's COTD stats best stats
 */
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
    * @type {Object}
    * @private
    */
    private _data;
    /**
     * The best rank
     * @type {number}
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
     * @type {number}
     */
    get divRank(): number;
    /**
     * The best division
     * @type {number}
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
     * @type {number}
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
     * @type {number}
     */
    get divisionOfRankInDivision(): number;
}
