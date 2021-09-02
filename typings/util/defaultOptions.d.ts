export = defaultOptions;
declare class defaultOptions {
    api: defaultOptionsAPI;
    cache: defaultOptionsCache;
    dev: boolean;
}
declare class defaultOptionsAPI {
    paths: defaultOptionsAPIPaths;
    useragent: any;
    key: any;
}
declare class defaultOptionsCache {
    enabled: boolean;
    ttl: number;
    leaderboardttl: number;
    roomttl: number;
}
declare class defaultOptionsAPIPaths {
    tmio: defaultOptionsAPIPathsTMIO;
    tmx: defaultOptionsAPIPathsTMX;
    mapVoting: defaultOptionsAPIPathsMapVoting;
}
declare class defaultOptionsAPIPathsTMIO {
    protocol: string;
    host: string;
    api: string;
    tabs: defaultOptionsAPIPathsTMIOTabs;
}
declare class defaultOptionsAPIPathsTMX {
    protocol: string;
    host: string;
    api: string;
    tabs: defaultOptionsAPIPathsTMXTabs;
}
declare class defaultOptionsAPIPathsMapVoting {
    protocol: string;
    host: string;
    tabs: defaultOptionsAPIPathsMapVotingTabs;
}
declare class defaultOptionsAPIPathsTMIOTabs {
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
declare class defaultOptionsAPIPathsTMXTabs {
    mapInfo: string;
    mapsDownload: string;
}
declare class defaultOptionsAPIPathsMapVotingTabs {
    getPlayerVote: string;
    getVotes: string;
    mostPlayerVoted: string;
    mostVotedMaps: string;
}
