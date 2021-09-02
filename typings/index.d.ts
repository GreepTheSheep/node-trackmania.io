declare module "util/ReqUtil" {
    export = ReqUtil;
    /**
     * Util for API requests
     * @private
     */
    class ReqUtil {
        constructor(client: any);
        client: any;
        get tmioAPIURL(): string;
        get tmioURL(): string;
        get tmxAPIURL(): string;
        get votingAPIURL(): string;
    }
}
declare module "rest/APIRequest" {
    export = APIRequest;
    class APIRequest {
        constructor(client: any);
        /** @type {Client} */
        client: Client;
        UA: any;
        key: any;
        do(url: any, method?: string, body?: any): any;
        url: any;
        options: {
            headers: any;
            method: string;
            body: any;
        };
    }
    import Client = require("client/Client");
}
declare module "util/Util" {
    export = Util;
    class Util {
        /**
         * Sets default properties on an object that aren't already specified.
         * @param {Object} def Default properties
         * @param {Object} given Object to assign defaults to
         * @returns {Object}
         * @private
       */
        private static mergeDefault;
        /**
         * Format the string and remove the TM style code on it.
         * @param {String} str String to format
         * @returns {String}
         */
        static formatTMText(str: string): string;
    }
}
declare module "util/defaultOptions" {
    export = defaultOptions;
    class defaultOptions {
        api: defaultOptionsAPI;
        cache: defaultOptionsCache;
        dev: boolean;
    }
    class defaultOptionsAPI {
        paths: defaultOptionsAPIPaths;
        useragent: any;
        key: any;
    }
    class defaultOptionsCache {
        enabled: boolean;
        ttl: number;
        leaderboardttl: number;
        roomttl: number;
    }
    class defaultOptionsAPIPaths {
        tmio: defaultOptionsAPIPathsTMIO;
        tmx: defaultOptionsAPIPathsTMX;
        mapVoting: defaultOptionsAPIPathsMapVoting;
    }
    class defaultOptionsAPIPathsTMIO {
        protocol: string;
        host: string;
        api: string;
        tabs: defaultOptionsAPIPathsTMIOTabs;
    }
    class defaultOptionsAPIPathsTMX {
        protocol: string;
        host: string;
        api: string;
        tabs: defaultOptionsAPIPathsTMXTabs;
    }
    class defaultOptionsAPIPathsMapVoting {
        protocol: string;
        host: string;
        tabs: defaultOptionsAPIPathsMapVotingTabs;
    }
    class defaultOptionsAPIPathsTMIOTabs {
        totd: string;
        cotd: string;
        comp: string;
        news: string;
        campaigns: string;
        campaign: string;
        officialCampaign: string;
        rooms: string;
        room: string;
        clubs: string;
        club: string;
        members: string;
        activities: string;
        events: string;
        player: string;
        players: string;
        trophies: string;
        topTrophies: string;
        leaderboard: string;
        map: string;
        matches: string;
        matchmaking: string;
        match: string;
        challenge: string;
    }
    class defaultOptionsAPIPathsTMXTabs {
        mapInfo: string;
        mapsDownload: string;
    }
    class defaultOptionsAPIPathsMapVotingTabs {
        getPlayerVote: string;
        getVotes: string;
        mostPlayerVoted: string;
        mostVotedMaps: string;
    }
}
declare module "util/Options" {
    export = Options;
    class Options {
        /**
         * Creates default options for the client
         * @returns {defaultOptions}
         * @private
         */
        private static createDefault;
    }
}
declare module "client/BaseClient" {
    export = BaseClient;
    class BaseClient {
        constructor(options?: {});
        /** @type {defaultOptions} */
        options: defaultOptions;
        /**
         * Get the ratelimits details on trackmania.io. If the data returns null, it means you haven't actually done a request
         * @type {Object}
         */
        ratelimit: any;
        /**
         * Do an API request
         * @param {String} url The URL to request
         * @returns {Promise<Object>} A promise that resolves to the API response
         * @private
         */
        private _apiReq;
        /**
         * Sets a User Agent for your project.
         * Required if you run a important project.
         * @param {String} useragent The User Agent to set to.
         * @returns {Boolean}
         */
        setUserAgent(useragent: string): boolean;
        /**
         * Sets an API Key.
         * Required if you run a important project. It will triple the rate limit.
         * @param {String} key The full API key. It must contains "yourname:theactualsecretkey"
         * @returns {Boolean}
         */
        setAPIKey(key: string): boolean;
    }
    import defaultOptions = require("util/defaultOptions");
}
declare module "structures/MatchmakingDivision" {
    export = MatchmakingDivision;
    class MatchmakingDivision {
        constructor(client: any, division: any);
        /**
         * The client instance
         * @type {Client}
         */
        client: any;
        /**
         * The division
         * @type {number}
         */
        id: number;
        /**
         * The name of the division
         * @type {string}
         */
        get name(): string;
        /**
         * The minimum points to the division
         * @type {number}
         */
        get minPoints(): number;
        /**
         * The maximum points to the division
         * @type {number}
         */
        get maxPoints(): number;
        /**
         * The minimum number of wins to the division
         * @type {number}
         */
        get minWins(): number;
        /**
         * The maximum number of wins to the division
         * @type {number}
         */
        get maxWins(): number;
    }
}
declare module "structures/Player" {
    export = Player;
    class Player {
        constructor(client: any, data: any);
        /**
         * The client object of the player
         * @type {Client}
         */
        client: any;
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
    class PlayerTrophies {
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
         * @returns {Number}
         */
        get echelon(): number;
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
    class PlayerMeta {
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
    class PlayerMatchmaking {
        constructor(player: any, type: any);
        /**
         * The player object
         * @type {Player}
         */
        player: Player;
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
        get division(): import("structures/MatchmakingDivision");
        /** @private */
        private _MatchmakingDivision;
    }
}
declare module "managers/CacheManager" {
    export = CacheManager;
    class CacheManager {
        /**
         * Creates a new CacheManager instance.
         * @param {Client} client The client instance.
         * @param {*} from The class that instants this manager.
         */
        constructor(client: Client, from: any);
        /**
         * The client instance.
         * @type {Client}
         */
        client: Client;
        /**
         * The class that instantiated this manager.
         * @type {*}
         */
        from: any;
        /**
         * The time to live for the cache in miliseconds.
         * @private
         */
        private _ttl;
        /**
         * Resets the cache based on the ttl.
         * @private
         */
        private _reset;
    }
    import Client = require("client/Client");
}
declare module "managers/PlayerManager" {
    export = PlayerManager;
    class PlayerManager {
        constructor(client: any);
        /** The client instance
         * @type {Client}
         */
        client: Client;
        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        private _cache;
        /**
         * Fetches a player and returns its data
         * @param {String} accountid The account ID or its tm.io vanity name
         * @param {Boolean} cache Whether to get the player from cache or not
         * @returns {Promise<Player>} The player
         * @example
         * // Get a player
         * client.players.get('greep').then(player => {
         *     console.log(player.displayname);
         * });
         */
        get(accountid: string, cache?: boolean): Promise<Player>;
        /**
         * Fetches a player and returns its data
         * @param {String} accountid The account ID or its tm.io vanity name
         * @param {Boolean} cache Whether to cache the player or not
         * @returns {Player} The player
         * @private
         */
        private _fetch;
    }
    import Client = require("client/Client");
    import Player = require("structures/Player");
}
declare module "structures/TMMap" {
    export = TMMap;
    class TMMap {
        /**
         * Represents a map on Trackmania.
         */
        constructor(client: any, data: any);
        /**
         * The client instance.
         * @type {Client}
         */
        client: any;
        /**
         * The map data.
         * @private
         */
        private _data;
        /**
         * The map name.
         * @type {string}
         */
        get name(): string;
        /**
         * The map id.
         * @type {string}
         */
        get id(): string;
        /**
         * The map uid.
         * @type {string}
         */
        get uid(): string;
        /**
         * The map author.
         * @returns {Promise<Player>}
         * @example
         * Client.maps.get('z28QXoFnpODEGgg8MOederEVl3j').then(async map => {
         *     const author = await map.author();
         *     console.log(`The map author is ${author.name}`);
         * });
         */
        author(): Promise<Player>;
        /**
         * The map submitter.
         * @returns {Promise<Player>}
         */
        submitter(): Promise<Player>;
        /**
         * The map medal times.
         * @returns {Object<string, number>} string: medal name, number: time in miliseconds
         */
        get medalTimes(): {
            [x: string]: number;
        };
        /**
         * The environment for this map.
         * @type {string}
         */
        get environment(): string;
        /**
         * The map file name.
         * @type {string}
         */
        get fileName(): string;
        /**
         * The map uploaded date.
         * @type {Date}
         */
        get uploaded(): Date;
        /**
         * The map URL.
         * @type {string}
         */
        get url(): string;
        /**
         * The map thumbnail.
         * @type {string}
         */
        get thumbnail(): string;
        /**
         * The map exchange id, if the map is on trackmania.exchange, else null.
         * @type {?string}
         */
        get exchangeId(): string;
        /**
         * The map informations on trackmania.exchange.
         * @returns {?TMExchangeMap}
         */
        get exchange(): TMExchangeMap;
        /** @private */
        private _TMExchange;
        /**
         * The map karma.
         * @returns {?TMMapKarma}
         */
        get karma(): TMMapKarma;
        /** @private */
        private _TMMapKarma;
    }
    import Player = require("structures/Player");
    class TMExchangeMap {
        constructor(map: any, data: any);
        /**
         * The map instance.
         * @type {TMMap}
         */
        map: TMMap;
        /**
         * The client instance.
         * @type {Client}
         */
        client: any;
        /**
         * The map data.
         * @type {Object}
         * @private
         */
        private _data;
        /**
         * The map exchange id.
         * @type {Number}
         */
        get id(): number;
        /**
         * The map name.
         * @type {string}
         */
        get name(): string;
        /**
         * The map author.
         * @type {string}
         */
        get author(): string;
        /**
         * The map description.
         * @type {string}
         */
        get description(): string;
        /**
         * The map length.
         * @type {string}
         */
        get length(): string;
        /**
         * The map difficulty.
         * @type {string}
         */
        get difficulty(): string;
        /**
         * The map upload date.
         * @type {Date}
         */
        get uploaded(): Date;
        /**
         * The map last update date.
         * @type {Date}
         */
        get updated(): Date;
        /**
         * The map award count.
         * @type {number}
         */
        get awards(): number;
        /**
         * The map download link.
         * @type {string}
         */
        get download(): string;
    }
    class TMMapKarma {
        constructor(map: any, data: any);
        /**
         * The map instance.
         * @type {TMMap}
         */
        map: TMMap;
        /**
         * The client instance.
         * @type {Client}
         */
        client: any;
        /**
         * The map data.
         * @type {Object}
         * @private
         */
        private _data;
        /**
         * The map Uid.
         * @type {string}
         */
        get uid(): string;
        /**
         * The number of votes.
         * @type {number}
         */
        get votes(): number;
        /**
         * The average vote (between 0 and 100).
         * @type {number}
         */
        get average(): number;
        /**
         * The last vote date.
         * @type {Date}
         */
        get lastVoteDate(): Date;
    }
}
declare module "managers/MapManager" {
    export = MapManager;
    class MapManager {
        constructor(client: any);
        /**
         * The client instance.
         * @type {Client}
         */
        client: Client;
        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        private _cache;
        /**
         * Fetches a Trackmania map and returns its data
         * @param {String} mapUid The map UID
         * @param {Boolean} cache Whether to get the map from cache or not
         * @returns {Promise<TMMap>} The map
         * @example
         * client.maps.get('z28QXoFnpODEGgg8MOederEVl3j').then(map => {
         *     console.log(map.name);
         * });
         */
        get(mapUid: string, cache?: boolean): Promise<TMMap>;
        /**
         * Fetches a map and returns its data
         * @param {String} mapUid The map UID
         * @param {Boolean} cache Whether to cache the map or not
         * @returns {Player} The map
         * @private
         */
        private _fetch;
    }
    import Client = require("client/Client");
    import TMMap = require("structures/TMMap");
}
declare module "structures/Campaign" {
    export = Campaign;
    class Campaign {
        constructor(client: any, data: any);
        /**
         * The client object of the campaign.
         * @type {Client}
         */
        client: Client;
        /**
         * The data object
         * @type {Object}
         * @private
         */
        private _data;
        /**
         * The id of the campaign.
         * @type {number}
         */
        get id(): number;
        /**
         * The name of the campaign.
         * @type {string}
         */
        get name(): string;
        /**
         * Whether the campaign is official.
         * @type {boolean}
         */
        get isOfficial(): boolean;
        /**
         * The image URL of the campaign. If this is an official campaign, the decal image URL is returned.
         * @type {string}
         */
        get image(): string;
        /**
         * The creation date of the campaign.
         * @type {Date}
         */
        get createdAt(): Date;
        /**
         * The last update date of the campaign.
         * @type {Date}
         */
        get updatedAt(): Date;
        /**
         * The club that owns the campaign.
         * @returns {Promise<Club>}
         */
        club(): Promise<Club>;
        /**
         * The leaderboard id of the campaign.
         * @type {string}
         */
        get leaderboardId(): string;
        /**
         * The list of maps in the campaign.
         * @returns {Promise<Array<TMMap>>}
         * @example
         * Client.campaigns.get(0, 11612).then(async campaign => {
         *   const maps = await campaign.maps();
         *   maps.forEach(map => console.log(map.name));
         * });
         */
        maps(): Promise<Array<TMMap>>;
        /**
         * The media images of the campaign, if this is an official campaign.
         * @type {Object<string, string>}
         */
        get media(): {
            [x: string]: string;
        };
    }
    import Client = require("client/Client");
    import Club = require("structures/Club");
    import TMMap = require("structures/TMMap");
}
declare module "structures/Club" {
    export = Club;
    class Club {
        constructor(client: any, data: any);
        /**
         * The client object of the club
         * @type {Client}
         */
        client: Client;
        /**
         * The data of the club
         * @type {Object}
         * @private
         */
        private _data;
        /**
         * The Club ID
         * @type {number}
         */
        get id(): number;
        /**
         * The Club name
         * @type {string}
         */
        get name(): string;
        /**
         * The Club tag
         * @type {string}
         */
        get tag(): string;
        /**
         * The Club description
         * @type {string}
         */
        get description(): string;
        /**
         * The Club logo URL
         * @type {string}
         */
        get logo(): string;
        /**
         * The Club decal URL
         * @type {string}
         */
        get decal(): string;
        /**
         * The Club background URL
         * @type {string}
         */
        get background(): string;
        /**
         * The club vertical background URL
         * @type {string}
         */
        get vertical(): string;
        /**
         * The club screens URL. Imares are in DDS format, except the sponsor 4x1 that may be in PNG.
         * @type {Object<string, string>}
         */
        get screens(): {
            [x: string]: string;
        };
        /**
         * The club creation date
         * @type {Date}
         */
        get createdAt(): Date;
        /**
         * The club popularity level
         * @type {number}
         */
        get popularity(): number;
        /**
         * The club state (public/private)
         * @type {string}
         */
        get state(): string;
        /**
         * Whether the club is featured
         * @type {boolean}
         */
        get featured(): boolean;
        /**
         * The club member count
         * @type {number}
         */
        get memberCount(): number;
        /**
         * The club creator player
         * @returns {Promise<Player>}
         * @example
         * Client.clubs.get(54).then(async club => {
         *     const creator = await club.creator;
         *     console.log(creator.name);
         * });
         */
        creator(): Promise<Player>;
        /**
         * The club members (Members are sorted by role and club interaction time.)
         * @param {number} page The page number (default: 0)
         * @param {boolean} cache Whether to cache the result (default: true)
         * @returns {Promise<Array<ClubMember>>}
         */
        fetchMembers(page?: number, cache?: boolean): Promise<Array<ClubMember>>;
        /**
         * The cache manager for members
         * @type {CacheManager}
         * @private
         */
        private _membersCache;
        /**
         * The club activities
         * @param {number} page The page number (default: 0
         * @param {boolean} cache Whether to cache the result (default: true)
         * @returns {Promise<Array<ClubActivity>>}
         */
        fetchActivities(page?: number, cache?: boolean): Promise<Array<ClubActivity>>;
        /**
         * The cache manager for members
         * @type {CacheManager}
         * @private
         */
        private _activitiesCache;
    }
    import Client = require("client/Client");
    import Player = require("structures/Player");
    class ClubMember {
        constructor(club: any, data: any);
        /**
         * The club object
         * @type {Club}
         */
        club: Club;
        /**
         * The data of the club
         * @type {Object}
         * @private
         */
        private _data;
        /**
         * The member
         * @returns {Promise<Player>}
         */
        member(): Promise<Player>;
        /**
         * The join date on the club
         * @type {Date}
         */
        get joinDate(): Date;
        /**
         * The member role
         * @type {string}
         */
        get role(): string;
        /**
         * Whether the member is a club creator
         * @type {boolean}
         */
        get isCreator(): boolean;
        /**
         * Whether the member is a club admin
         * @type {boolean}
         */
        get isAdmin(): boolean;
        /**
         * Whether the member is a vip
         * @type {boolean}
         */
        get isVip(): boolean;
    }
    class ClubActivity {
        constructor(club: any, data: any);
        /**
         * The club object
         * @type {Club}
         */
        club: Club;
        /**
         * The data of the club
         * @type {Object}
         * @private
         */
        private _data;
        /**
         * The activity id
         * @type {number}
         */
        get id(): number;
        /**
         * The activity name
         * @type {string}
         */
        get name(): string;
        /**
         * The activity type
         * @type {string}
         */
        get type(): string;
        /**
         * Whether the activity is a public activity
         * @type {boolean}
         */
        get isPublic(): boolean;
        /**
         * The activity image URL
         * @type {string}
         */
        get media(): string;
        /**
         * Whether the activity is password protected
         * @type {boolean}
         */
        get isPasswordProtected(): boolean;
        /**
         * The activity external id
         * @type {number}
         */
        get externalId(): number;
        /**
         * If the activity is a campaign, returns the campaign object of the activity
         * @returns {Promise<Campaign>}
         */
        campaign(): Promise<Campaign>;
        /**
         * If the activity is a room, returns the room object of the activity
         * @returns {Promise<Room>}
         */
        room(): Promise<any>;
    }
    import Campaign = require("structures/Campaign");
}
declare module "managers/ClubManager" {
    export = ClubManager;
    class ClubManager {
        constructor(client: any);
        /**
         * The client instance.
         * @type {Client}
         */
        client: Client;
        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        private _cache;
        /**
         * Fetches a Trackmania Club and returns its data
         * @param {Number} id The Club Id
         * @param {Boolean} cache Whether to get the club from cache or not
         * @returns {Promise<Club>} The Club
         * @example
         * client.clubs.get(54).then(club => {
         *     console.log(club.name);
         * });
         */
        get(id: number, cache?: boolean): Promise<Club>;
        /**
         * Fetches a map and returns its data
         * @param {String} id The Club Id
         * @param {Boolean} cache Whether to cache the club or not
         * @returns {Club} The club
         * @private
         */
        private _fetch;
    }
    import Client = require("client/Client");
    import Club = require("structures/Club");
}
declare module "managers/CampaignManager" {
    export = CampaignManager;
    class CampaignManager {
        constructor(client: any);
        /**
         * The client instance.
         * @type {Client}
         */
        client: Client;
        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        private _cache;
        /**
         * Fetches a Trackmania campaign and returns its data
         * @param {Number} clubId The club Id that the campaign belongs to (If it's an official campaign, set it to 0)
         * @param {Number} id The campaign Id
         * @param {Boolean} cache Whether to get the campaign from cache or not
         * @returns {Promise<Campaign>} The campaign
         * @example
         * client.campaigns.get(54, 10621).then(campaign => {
         *     console.log(campaign.name);
         * });
         */
        get(clubId: number, id: number, cache?: boolean): Promise<Campaign>;
        /**
         * Fetches a campaign and returns its data
         * @param {Number} clubId The club Id that the campaign belongs to
         * @param {String} id The campaign Id
         * @param {Boolean} cache Whether to cache the campaign or not
         * @returns {Campaign} The campaign
         * @private
         */
        private _fetch;
    }
    import Client = require("client/Client");
    import Campaign = require("structures/Campaign");
}
declare module "structures/Room" {
    export = Room;
    class Room {
        constructor(client: any, data: any);
        /**
         * The client that instantiated this room
         * @type {Client}
         */
        client: Client;
        /**
         * The data of the room
         * @type {Object}
         * @private
         */
        private _data;
        /**
         * The ID of the room
         * @type {number}
         */
        get id(): number;
        /**
         * The club that this room belongs to
         * @returns {Promise<Club>}
         */
        club(): Promise<Club>;
        /**
         * The name of the room
         * @type {String}
         */
        get name(): string;
        /**
         * Whether this room is hosted on the cloud (Nadeo)
         * @type {Boolean}
         */
        get isCloud(): boolean;
        /**
         * The login of the room (if it's not a cloud room)
         * @type {String}
         */
        get login(): string;
        /**
         * The number of players in the room
         * @type {Number}
         */
        get playerCount(): number;
        /**
         * The maximum number of players in the room
         * @type {Number}
         */
        get maxPlayersCount(): number;
        /**
         * The region of the room (if it's on a cloud room)
         * @type {String}
         */
        get region(): string;
        /**
         * The script name that currently runs in the room
         * @type {String}
         */
        get script(): string;
        /**
         * The script settings on the room
         * @returns {Array<Object<string, string|number|boolean>>} x must be "key" and "value"
         * @example [{
         * key: 'S_DecoImageUrl_Checkpoint',
         * value: 'https://trackmania-prod-nls-file-store-s3.cdn.ubi.com/club/decal/5f62400600952.png?updateTimestamp=1600274438.png'
         * }]
         */
        get scriptSettings(): {
            [x: string]: string | number | boolean;
        }[];
        /**
         * The image URL of the room
         * @type {String}
         */
        get imageUrl(): string;
        /**
         * The maps on the room
         * @returns {Promise<Array<TMMap>>}
         * @example
         * Client.rooms.get(228, 82160).then(async room => {
         *   const maps = await room.maps();
         *   maps.forEach(map => console.log(map.name));
         * });
         */
        maps(): Promise<Array<TMMap>>;
    }
    import Client = require("client/Client");
    import Club = require("structures/Club");
    import TMMap = require("structures/TMMap");
}
declare module "managers/RoomManager" {
    export = RoomManager;
    class RoomManager {
        constructor(client: any);
        /**
         * The client instance.
         * @type {Client}
         */
        client: Client;
        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        private _cache;
        /**
         * Fetches a Trackmania room (server) and returns its data
         * @param {Number} clubId The club Id that the room belongs to
         * @param {Number} id The room Id
         * @param {Boolean} cache Whether to get the room from cache or not
         * @returns {Promise<Room>} The room
         * @example
         * client.rooms.get(338, 1180).then(room => {
         *     console.log(room.name);
         * });
         */
        get(clubId: number, id: number, cache?: boolean): Promise<Room>;
        /**
         * Fetches a room and returns its data
         * @param {Number} clubId The club Id that the room belongs to
         * @param {String} id The room Id
         * @param {Boolean} cache Whether to cache the room or not
         * @returns {Campaign} The room
         * @private
         */
        private _fetch;
    }
    import Client = require("client/Client");
    import Room = require("structures/Room");
}
declare module "structures/TMEvent" {
    export = TMEvent;
    class TMEvent {
        constructor(client: any, data: any);
        /** The client instance
         * @type {Client}
         */
        client: Client;
        /** @private */
        private _data;
        /**
         * The event's ID.
         * @type {Number}
         */
        get id(): number;
        /**
         * The number of players in the event.
         * @type {Number}
         */
        get size(): number;
        /**
         * The event's Live ID.
         * @type {String}
         */
        get liveId(): string;
        /**
         * The creator of the event.
         * @returns {Promise<Player>}
         */
        creator(): Promise<Player>;
        /**
         * The event's name.
         * @type {String}
         */
        get name(): string;
        /**
         * The event's description.
         * @type {String}
         */
        get description(): string;
        /**
         * The event's registration start date.
         * @type {Date}
         */
        get registrationStart(): Date;
        /**
         * The event's registration end date.
         * @type {Date}
         */
        get registrationEnd(): Date;
        /**
         * The event's start date.
         * @type {Date}
         */
        get start(): Date;
        /**
         * The event's end date.
         * @type {Date}
         */
        get end(): Date;
        /**
         * The event's leaderboard id.
         * @type {Number}
         */
        get leaderboardId(): number;
        /**
         * The event's manialink (if any).
         * @type {?String}
         */
        get manialink(): string;
        /**
         * The event's rules URL (if any).
         * @type {?String}
         */
        get rulesUrl(): string;
        /**
         * The event's stream URL (if any).
         * @type {?String}
         */
        get stream(): string;
        /**
         * The event's website (if any).
         * @type {?String}
         */
        get website(): string;
        /**
         * The event's logo URL.
         * @type {String}
         */
        get logo(): string;
        /**
         * The event's vertical banner URL.
         * @type {String}
         */
        get vertical(): string;
        /**
         * The event's rounds.
         * @type {Array<TMEventRound>}
         */
        get rounds(): TMEventRound[];
    }
    import Client = require("client/Client");
    import Player = require("structures/Player");
    class TMEventRound {
        constructor(event: any, data: any);
        /**
         * The event instance
         * @type {TMEvent}
         */
        event: TMEvent;
        /**
         * The client instance
         * @type {Client}
         */
        client: Client;
        /** @private */
        private _data;
        /** @private */
        private _challengesCache;
        /**
         * The round's ID.
         * @type {Number}
         */
        get id(): number;
        /**
         * The round's name.
         * @type {String}
         */
        get name(): string;
        /**
         * The round's status.
         * @type {String}
         */
        get status(): string;
        /**
         * The round's matches.
         * @type {Array<TMEventRoundMatch>}
         */
        get matches(): TMEventRoundMatch[];
        /**
         * The round's challenges.
         * @param {Boolean} cache Wether to get the challenges from the cache or not.
         * @returns {Promise<Array<TMEventChallenge>>}
         */
        challenges(cache?: boolean): Promise<Array<TMEventChallenge>>;
        /**
         * Fetches the round's challenges.
         * @param {Number} index The index of the challenge to fetch.
         * @param {Boolean} cache Wether to cache the challenges or not.
         * @returns {Promise<Array<TMEventChallenge>>}
         * @private
        */
        private _fetchChallenge;
    }
    class TMEventRoundMatch {
        constructor(round: any, data: any);
        /**
         * The round instance
         * @type {TMEventRound}
         */
        round: TMEventRound;
        /**
         * The event instance
         * @type {TMEvent}
         */
        event: TMEvent;
        /**
         * The client instance
         * @type {Client}
         */
        client: Client;
        /** @private */
        private _data;
        /** @private */
        private _resultsCache;
        /**
         * The match's ID.
         * @type {Number}
         */
        get id(): number;
        /**
         * The match's name.
         * @type {String}
         */
        get name(): string;
        /**
         * Whether the match is completed.
         * @type {Boolean}
         */
        get isCompleted(): boolean;
        /**
         * The match's results.
         * @param {Number} page The page number.
         * @param {Boolean} cache Whether to cache the results.
         * @returns {Promise<Array<TMEventRoundMatchResult>>}
         */
        getResults(page?: number, cache?: boolean): Promise<Array<TMEventRoundMatchResult>>;
        /**
         * Fetches the match's results.
         * @param {Number} page The page number.
         * @param {Boolean} cache Whether to cache the results.
         * @returns {Promise<Array<TMEventRoundMatchResult>>}
         * @private
         */
        private _fetchResults;
    }
    class TMEventChallenge {
        constructor(round: any, data: any);
        /**
         * The round instance
         * @type {TMEventRound}
         */
        round: TMEventRound;
        /**
         * The event instance
         * @type {TMEvent}
         */
        event: TMEvent;
        /**
         * The client instance
         * @type {Client}
         */
        client: Client;
        /** @private */
        private _data;
        /** @private */
        private _resultsCache;
        /**
         * The challenge's ID.
         * @type {Number}
         */
        get id(): number;
        /**
         * The challenge's name.
         * @type {String}
         */
        get name(): string;
        /**
         * The challenge's status.
         * @type {String}
         */
        get status(): string;
        /**
         * The challenge's rooms number.
         * @type {Number}
         */
        get rooms(): number;
        /**
         * The challenge's maps.
         * @returns {Promise<Array<TMmap>>}
         */
        getMaps(): Promise<Array<TMmap>>;
        /**
         * The challenge's admins.
         * @returns {Promise<Array<Player>>}
         */
        getAdmins(): Promise<Array<Player>>;
        /**
         * The challenge's results.
         * @param {Number} page The page number.
         * @param {Boolean} cache Whether to get the results from cache.
         * @returns {Promise<Array<TMEventChallengeResult>>}
        */
        getResults(page?: number, cache?: boolean): Promise<Array<TMEventChallengeResult>>;
        /**
         * Fetches the match's results.
         * @param {Number} page The page number.
         * @param {Boolean} cache Whether to cache the results.
         * @returns {Promise<Array<TMEventChallengeResult>>}
         * @private
         */
        private _fetchResults;
    }
    class TMEventRoundMatchResult {
        constructor(match: any, data: any);
        /**
         * The match instance
         * @type {TMEventRoundMatch}
         */
        match: TMEventRoundMatch;
        /**
         * The event instance
         * @type {TMEvent}
         */
        event: TMEvent;
        /**
         * The client instance
         * @type {Client}
         */
        client: Client;
        /** @private */
        private _data;
        /**
         * The player that got the result.
         * @returns {Promise<Player>}
         */
        player(): Promise<Player>;
        /**
         * The position of the player.
         * @returns {Number}
         */
        get position(): number;
        /**
         * The score of the player.
         * @returns {Number}
         */
        get score(): number;
    }
    import TMmap = require("structures/TMMap");
    class TMEventChallengeResult {
        constructor(challenge: any, data: any);
        /**
         * The challenge instance
         * @type {TMEventChallenge}
         */
        challenge: TMEventChallenge;
        /**
         * The event instance
         * @type {TMEvent}
         */
        event: TMEvent;
        /**
         * The client instance
         * @type {Client}
         */
        client: Client;
        /** @private */
        private _data;
        /**
         * The player.
         * @returns {Promise<Player>}
         */
        player(): Promise<Player>;
        /**
         * The position of the player.
         * @returns {Number}
         */
        get position(): number;
        /**
         * The score of the player.
         * @returns {Number}
         */
        get score(): number;
    }
}
declare module "managers/EventManager" {
    export = EventManager;
    class EventManager {
        constructor(client: any);
        /**
         * The client instance.
         * @type {Client}
         */
        client: Client;
        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        private _cache;
        /**
         * Fetches a Trackmania event and returns its data
         * @param {Number} eventId The event id
         * @param {Boolean} cache Whether to get the map from cache or not
         * @returns {Promise<TMEvent>} The event
         * @example
         * client.events.get(706).then(event => {
         *     console.log(event.name);
         * });
         */
        get(eventId: number, cache?: boolean): Promise<TMEvent>;
        /**
         * Fetches a event and returns its data
         * @param {Number} eventId The event id
         * @param {Boolean} cache Whether to cache the map or not
         * @returns {Event} The event
         * @private
         */
        private _fetch;
    }
    import Client = require("client/Client");
    import TMEvent = require("structures/TMEvent");
}
declare module "client/Client" {
    export = Client;
    class Client extends BaseClient {
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
    import BaseClient = require("client/BaseClient");
    import PlayerManager = require("managers/PlayerManager");
    import MapManager = require("managers/MapManager");
    import ClubManager = require("managers/ClubManager");
    import CampaignManager = require("managers/CampaignManager");
    import RoomManager = require("managers/RoomManager");
    import EventManager = require("managers/EventManager");
    import defaultOptions = require("util/defaultOptions");
}
declare module "index" {
    export const Client: typeof import("client/Client");
    export const Util: typeof import("util/Util");
}
declare module "structures/News" {
    export = News;
    class News {
        constructor(client: any, data: any);
        /**
         * The client object of the news page
         * @type {Client}
         */
        client: any;
        /**
         * The data of the news page
         * @type {Object}
         * @private
         */
        private _data;
        /**
         * The news item's id
         * @type {number}
         */
        get id(): number;
        /**
         * The news item's headline
         * @type {string}
         */
        get headline(): string;
        /**
         * The news item's text content
         * @type {string}
         */
        get body(): string;
        /**
         * The link to the news item on trackmania.com
         * @type {string}
         */
        get link(): string;
        /**
         * The news item's accompanying media file as a link
         * @type {string}
         */
        get media(): string;
        /**
         * The news item's time of publishing
         * @type {Date}
         */
        get time(): Date;
    }
}
declare module "managers/NewsManager" {
    export = NewsManager;
    class NewsManager {
        constructor(client: any);
        /**
         * The client instance.
         * @type {Client}
         */
        client: Client;
        /**
         * The cache manager
         * @type {CacheManager}
         * @private
         */
        private _cache;
        /**
         * Fetches a Trackmania splashscreen and returns its data.
         * @param {Number} newsId The splashscreen ID
         * @param {Boolean} cache Whether to get the news from cache or not
         * @returns {Promise<News>} The splashscreen
         * @example
         * client.news.get(143).then(news => {
         *     console.log(news.title);
         * });
         */
        get(newsId: number, cache?: boolean): Promise<News>;
        /**
         * Fetches a splashscreen and returns its data
         * @param {Number} newsId The splashscreen ID
         * @param {Boolean} cache Whether to cache the news or not
         * @returns {News} The splashscreen
         * @private
         */
        private _fetch;
    }
    import Client = require("client/Client");
    import News = require("structures/News");
}
