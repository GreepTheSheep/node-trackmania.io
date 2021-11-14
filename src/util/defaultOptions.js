/**
 * The default options.
 */
class defaultOptions {
    constructor(baseClient) {
        /**
         * The base client instance.
         * @type {BaseClient}
         * @private
         */
        this._baseClient = baseClient;

        /**
         * The default API options.
         * @type {defaultOptionsAPI}
         */
        this.api = new defaultOptionsAPI();

        /**
         * The default Cache options.
         * @type {defaultOptionsCache}
         */
        this.cache = new defaultOptionsCache();

        /**
         * Whether is in dev mode (Uses more logging traces in the core).
         * @type {boolean}
         */
        this.dev = false;
    }
}

/**
 * The default API options.
 */
class defaultOptionsAPI {
    constructor(defaultOptions) {
        /**
         * The default options.
         * @type {defaultOptions}
         * @private
         * @readonly
         */
        this._defaultOptions = defaultOptions;

        /**
         * The default API Paths options.
         * @type {defaultOptionsAPIPaths}
         */
        this.paths = new defaultOptionsAPIPaths();

        /**
         * The default User Agent to use.
         * @type {?string}
         */
        this.useragent = null;

        /**
         * The API Key to use. It must contains "yourname:theactualsecretkey".
         * @type {?string}
         */
        this.key = null;
    }
}

/**
 * The default API Paths options.
 */
class defaultOptionsAPIPaths {
    constructor(defaultOptionsAPI) {
        /**
         * The default API options.
         * @type {defaultOptionsAPI}
         * @private
         * @readonly
         */
        this._defaultOptionsAPI = defaultOptionsAPI;

        /**
         * The default Trackmania.io Paths options.
         * @type {defaultOptionsAPIPathsTMIO}
         */
        this.tmio = new defaultOptionsAPIPathsTMIO();

        /**
         * The default Trackmania.exchange Paths options.
         * @type {defaultOptionsAPIPathsTMX}
         */
        this.tmx = new defaultOptionsAPIPathsTMX();

        /**
         * The default Map Voting API Paths options.
         * @type {defaultOptionsAPIPathsMapVoting}
         */
        this.mapVoting = new defaultOptionsAPIPathsMapVoting();
    }
}

/**
 * The default Trackmania.io Paths options.
 */
class defaultOptionsAPIPathsTMIO {
    constructor(defaultOptionsAPIPaths) {
        /**
         * The default API Paths options.
         * @type {defaultOptionsAPIPaths}
         * @private
         * @readonly
         */
        this._defaultOptionsAPIPaths = defaultOptionsAPIPaths;

        /**
         * The default Trackmania.io Protocol to use.
         * @type {string}
         */
        this.protocol = "https";

        /**
         * The default Trackmania.io Host to use.
         * @type {string}
         */
        this.host = "trackmania.io";

        /**
         * The default Trackmania.io API Route to use.
         * @type {string}
         */
        this.api = "api";

        /**
         * The default Trackmania.io API Tabs to use.
         * @type {defaultOptionsAPIPathsTMIOTabs}
         */
        this.tabs = new defaultOptionsAPIPathsTMIOTabs();
    }
}

/**
 * The default Trackmania.io Tabs options.
 */
class defaultOptionsAPIPathsTMIOTabs {
    constructor(defaultOptionsAPIPathsTMIO) {
        /**
         * The default Trackmania.io API options.
         * @type {defaultOptionsAPIPathsTMIO}
         * @private
         * @readonly
         */
        this._defaultOptionsAPIPathsTMIO = defaultOptionsAPIPathsTMIO;

        /**
         * TOTD Tab.
         * @type {string}
         */
        this.totd = "totd";

        /**
         * COTD Tab.
         * @type {string}
         */
        this.cotd = "cotd";

        /**
         * Competitions Tab.
         * @type {string}
         */
        this.comp = "comp";

        /**
         * News Tab.
         * @type {string}
         */
        this.news = "splashscreens";

        /**
         * Campaigns Tab.
         * @type {string}
         */
        this.campaigns = "campaigns";
        
        /**
         * Specific campaign Tab.
         * @type {string}
         */
        this.campaign = "campaign";
        
        /**
         * Official campaign Tab.
         * @type {string}
         */
        this.officialCampaign = "officialcampaign";
        
        /**
         * Rooms Tab.
         * @type {string}
         */
        this.rooms = "rooms";
        
        /**
         * Specific room Tab.
         * @type {string}
         */
        this.room = "room";

        /**
         * Clubs Tab.
         * @type {string}
         */
        this.clubs = "clubs";
        
        /**
         * Specific club Tab.
         * @type {string}
         */
        this.club = "club";
        
        /**
         * Members Tab.
         * @type {string}
         */
        this.members = "members";
        
        /**
         * Activities Tab.
         * @type {string}
         */
        this.activities = "activities";
        
        /**
         * Events Tab.
         * @type {string}
         */
        this.events = "competitions";
        
        /**
         * Specific player Tab.
         * @type {string}
         */
        this.player = "player";
        
        /**
         * Players Tab.
         * @type {string}
         */
        this.players = "players";
        
        /**
         * Trophies Tab.
         * @type {string}
         */
        this.trophies = "trophies";
        
        /**
         * Top Trophies Tab.
         * @type {string}
         */
        this.topTrophies = "top/trophies";
        
        /**
         * Leaderboard Tab.
         * @type {string}
         */
        this.leaderboard = "leaderboard";
        
        /**
         * Map Tab.
         * @type {string}
         */
        this.map = "map";
        
        /**
         * Matches Tab.
         * @type {string}
         */
        this.matches = "matches";

        /**
         * Matchmaking Tab.
         * @type {string}
         */
        this.topMatchmaking = "top/matchmaking";
        
        /**
         * Specific match Tab.
         * @type {string}
         */
        this.match = "match";
        
        /**
         * Specific challenge Tab.
         * @type {string}
         */
        this.challenge = "challenge";
    }
}

/**
 * The default Trackmania.exchange Paths options.
 */
class defaultOptionsAPIPathsTMX {
    constructor(defaultOptionsAPIPaths) {
        /**
         * The default API Paths options.
         * @type {defaultOptionsAPIPaths}
         * @private
         * @readonly
         */
        this._defaultOptionsAPIPaths = defaultOptionsAPIPaths;

        /**
         * The default Trackmania.exchange Protocol to use.
         * @type {string}
         */
        this.protocol = "https";

        /**
         * The default Trackmania.exchange Host to use.
         * @type {string}
         */
        this.host = "trackmania.exchange";

        /**
         * The default Trackmania.exchange API Route to use.
         * @type {string}
         */
        this.api = "api";

        /**
         * The default Trackmania.exchange API Tabs to use.
         * @type {defaultOptionsAPIPathsTMXTabs}
         */
        this.tabs = new defaultOptionsAPIPathsTMXTabs();
    }
}

/**
 * The default Trackmania.exchange Tabs options.
 */
class defaultOptionsAPIPathsTMXTabs {
    constructor(defaultOptionsAPIPathsTMX) {
        /**
         * The default Trackmania.exchange API options.
         * @type {defaultOptionsAPIPathsTMX}
         * @private
         * @readonly
         */
        this._defaultOptionsAPIPathsTMX = defaultOptionsAPIPathsTMX;
        
        /**
         * Map Info Tab.
         * @type {string}
         */
        this.mapInfo = "maps/get_map_info/multi";
        
        /**
         * Map Download Tab.
         * @type {string}
         */
        this.mapsDownload = "maps/download";
    }
}

/**
 * The default Map Voting Paths options.
 */
class defaultOptionsAPIPathsMapVoting {
    constructor(defaultOptionsAPIPaths) {
        /**
         * The default API Paths options.
         * @type {defaultOptionsAPIPaths}
         * @private
         * @readonly
         */
        this._defaultOptionsAPIPaths = defaultOptionsAPIPaths;

        /**
         * The default Map Voting Protocol to use.
         * @type {string}
         */
        this.protocol = "https";

        /**
         * The default Map Voting Host to use.
         * @type {string}
         */
        this.host = "tm-voting.willers.digital";
        
        /**
         * The default Map Voting API Tabs to use.
         * @type {defaultOptionsAPIPathsMapVotingTabs}
         */
        this.tabs = new defaultOptionsAPIPathsMapVotingTabs();
    }
}

/**
 * The default Map Voting Tabs options.
 */
class defaultOptionsAPIPathsMapVotingTabs {
    constructor(defaultOptionsAPIPathsMapVoting) {
        /**
         * The default Map Voting API options.
         * @type {defaultOptionsAPIPathsMapVoting}
         */
        this._defaultOptionsAPIPathsMapVoting = defaultOptionsAPIPathsMapVoting;

        /**
         * Player Vote Tab.
         * @type {string}
         */
        this.getPlayerVote = "getPlayerVote";

        /**
         * All Votes Tab.
         * @type {string}
         */
        this.getVotes = "getVotes";

        /**
         * Most Player Voted Tab.
         * @type {string}
         */
        this.mostPlayerVoted = "mostPlayerVoted";

        /**
         * Most Map Voted Tab.
         * @type {string}
         */
        this.mostVotedMaps = "mostVotedMaps";
        
        //TODO setVote (POST)
    }
}

/**
 * The default Cache options.
 */
class defaultOptionsCache {
    constructor(defaultOptions) {
        /**
         * The default Options.
         * @type {defaultOptions}
         * @private
         * @readonly
         */
        this._defaultOptions = defaultOptions;

        /**
         * Whether to cache the API responses.
         * @type {boolean}
         */
        this.enabled = true;

        /**
         * The cache TTL in minutes.
         * @type {number}
         */
        this.ttl = 10;

        /**
         * The cache TTL for leaderboards in minutes.
         * @type {number}
         */
        this.leaderboardttl = 1;

        /**
         * The cache TTL for rooms in minutes.
         * @type {number}
         */
        this.roomttl = 5;
    }
}

module.exports = defaultOptions;