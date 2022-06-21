export = defaultOptions;
/**
 * The default options.
 */
declare class defaultOptions {
    constructor(baseClient: any);
    /**
     * The base client instance.
     * @type {BaseClient}
     * @private
     */
    private _baseClient;
    /**
     * The default API options.
     * @type {defaultOptionsAPI}
     */
    api: defaultOptionsAPI;
    /**
     * The default Cache options.
     * @type {defaultOptionsCache}
     */
    cache: defaultOptionsCache;
    /**
     * Whether is in dev mode (Uses more logging traces in the core).
     * @type {boolean}
     */
    dev: boolean;
}
/**
 * The default API options.
 */
declare class defaultOptionsAPI {
    constructor(defaultOptions: any);
    /**
     * The default options.
     * @type {defaultOptions}
     * @private
     * @readonly
     */
    private readonly _defaultOptions;
    /**
     * The default API Paths options.
     * @type {defaultOptionsAPIPaths}
     */
    paths: defaultOptionsAPIPaths;
    /**
     * The default User Agent to use.
     * If present, this defaults to `process.env.TMIO_UA` when instantiating the client
     * @type {?string}
     */
    useragent: string | null;
    /**
     * The API Key to use. It must contains "yourname:theactualsecretkey".
     * If present, this defaults to `process.env.TMIO_API` when instantiating the client
     *
     * <warn>This should be kept private at all times.</warn>
     * @type {?string}
     */
    key: string | null;
}
/**
 * The default Cache options.
 */
declare class defaultOptionsCache {
    constructor(defaultOptions: any);
    /**
     * The default Options.
     * @type {defaultOptions}
     * @private
     * @readonly
     */
    private readonly _defaultOptions;
    /**
     * Whether to cache the API responses.
     * @type {boolean}
     */
    enabled: boolean;
    /**
     * The cache TTL in minutes.
     * @type {number}
     */
    ttl: number;
    /**
     * The cache TTL for leaderboards in minutes.
     * @type {number}
     */
    leaderboardttl: number;
    /**
     * The cache TTL for rooms in minutes.
     * @type {number}
     */
    roomttl: number;
}
/**
 * The default API Paths options.
 */
declare class defaultOptionsAPIPaths {
    constructor(defaultOptionsAPI: any);
    /**
     * The default API options.
     * @type {defaultOptionsAPI}
     * @private
     * @readonly
     */
    private readonly _defaultOptionsAPI;
    /**
     * The default Trackmania.io Paths options.
     * @type {defaultOptionsAPIPathsTMIO}
     */
    tmio: defaultOptionsAPIPathsTMIO;
    /**
     * The default Trackmania.exchange Paths options.
     * @type {defaultOptionsAPIPathsTMX}
     */
    tmx: defaultOptionsAPIPathsTMX;
}
/**
 * The default Trackmania.io Paths options.
 */
declare class defaultOptionsAPIPathsTMIO {
    constructor(defaultOptionsAPIPaths: any);
    /**
     * The default API Paths options.
     * @type {defaultOptionsAPIPaths}
     * @private
     * @readonly
     */
    private readonly _defaultOptionsAPIPaths;
    /**
     * The default Trackmania.io Protocol to use.
     * @type {string}
     */
    protocol: string;
    /**
     * The default Trackmania.io Host to use.
     * @type {string}
     */
    host: string;
    /**
     * The default Trackmania.io API Route to use.
     * @type {string}
     */
    api: string;
    /**
     * The default Trackmania.io API Tabs to use.
     * @type {defaultOptionsAPIPathsTMIOTabs}
     */
    tabs: defaultOptionsAPIPathsTMIOTabs;
}
/**
 * The default Trackmania.exchange Paths options.
 */
declare class defaultOptionsAPIPathsTMX {
    constructor(defaultOptionsAPIPaths: any);
    /**
     * The default API Paths options.
     * @type {defaultOptionsAPIPaths}
     * @private
     * @readonly
     */
    private readonly _defaultOptionsAPIPaths;
    /**
     * The default Trackmania.exchange Protocol to use.
     * @type {string}
     */
    protocol: string;
    /**
     * The default Trackmania.exchange Host to use.
     * @type {string}
     */
    host: string;
    /**
     * The default Trackmania.exchange API Route to use.
     * @type {string}
     */
    api: string;
    /**
     * The default Trackmania.exchange API Tabs to use.
     * @type {defaultOptionsAPIPathsTMXTabs}
     */
    tabs: defaultOptionsAPIPathsTMXTabs;
}
/**
 * The default Trackmania.io Tabs options.
 */
declare class defaultOptionsAPIPathsTMIOTabs {
    constructor(defaultOptionsAPIPathsTMIO: any);
    /**
     * The default Trackmania.io API options.
     * @type {defaultOptionsAPIPathsTMIO}
     * @private
     * @readonly
     */
    private readonly _defaultOptionsAPIPathsTMIO;
    /**
     * TOTD Tab.
     * @type {string}
     */
    totd: string;
    /**
     * COTD Tab.
     * @type {string}
     */
    cotd: string;
    /**
     * Competitions Tab.
     * @type {string}
     */
    comp: string;
    /**
     * News Tab.
     * @type {string}
     */
    news: string;
    /**
     * Ads tab (Maniapub)
     * @type {string}
     */
    ads: string;
    /**
     * Campaigns Tab.
     * @type {string}
     */
    campaigns: string;
    /**
     * Specific campaign Tab.
     * @type {string}
     */
    campaign: string;
    /**
     * Official campaign Tab.
     * @type {string}
     */
    officialCampaign: string;
    /**
     * Rooms Tab.
     * @type {string}
     */
    rooms: string;
    /**
     * Specific room Tab.
     * @type {string}
     */
    room: string;
    /**
     * Clubs Tab.
     * @type {string}
     */
    clubs: string;
    /**
     * Specific club Tab.
     * @type {string}
     */
    club: string;
    /**
     * Members Tab.
     * @type {string}
     */
    members: string;
    /**
     * Activities Tab.
     * @type {string}
     */
    activities: string;
    /**
     * Activity Tab.
     * @type {string}
     */
    activity: string;
    /**
     * Events Tab.
     * @type {string}
     */
    events: string;
    /**
     * Specific player Tab.
     * @type {string}
     */
    player: string;
    /**
     * Players Tab.
     * @type {string}
     */
    players: string;
    /**
     * Trophies Tab.
     * @type {string}
     */
    trophies: string;
    /**
     * Top Trophies Tab.
     * @type {string}
     */
    topTrophies: string;
    /**
     * Leaderboard Tab.
     * @type {string}
     */
    leaderboard: string;
    /**
     * Map Tab.
     * @type {string}
     */
    map: string;
    /**
     * Matches Tab.
     * @type {string}
     */
    matches: string;
    /**
     * Matchmaking Tab.
     * @type {string}
     */
    topMatchmaking: string;
    /**
     * Specific match Tab.
     * @type {string}
     */
    match: string;
    /**
     * Specific challenge Tab.
     * @type {string}
     */
    challenge: string;
}
/**
 * The default Trackmania.exchange Tabs options.
 */
declare class defaultOptionsAPIPathsTMXTabs {
    constructor(defaultOptionsAPIPathsTMX: any);
    /**
     * The default Trackmania.exchange API options.
     * @type {defaultOptionsAPIPathsTMX}
     * @private
     * @readonly
     */
    private readonly _defaultOptionsAPIPathsTMX;
    /**
     * Map Info Tab.
     * @type {string}
     */
    mapInfo: string;
    /**
     * Map Download Tab.
     * @type {string}
     */
    mapsDownload: string;
}
