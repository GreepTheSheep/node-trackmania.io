class defaultOptions {
    constructor() {
        this.api = new defaultOptionsAPI();
        this.cache = new defaultOptionsCache();
        this.dev = false;
    }
}

class defaultOptionsAPI {
    constructor() {
        this.paths = new defaultOptionsAPIPaths();
        this.useragent = null;
        this.key = null;
    }
}

class defaultOptionsAPIPaths {
    constructor() {
        this.tmio = new defaultOptionsAPIPathsTMIO();
        this.tmx = new defaultOptionsAPIPathsTMX();
        this.mapVoting = new defaultOptionsAPIPathsMapVoting();
    }
}

class defaultOptionsAPIPathsTMIO {
    constructor() {
        this.protocol = "https";
        this.host = "trackmania.io";
        this.api = "api";
        this.tabs = new defaultOptionsAPIPathsTMIOTabs();
    }
}

class defaultOptionsAPIPathsTMIOTabs {
    constructor() {
        this.totd = "totd";
        this.cotd = "cotd";
        this.comp = "comp";
        this.news = "splashscreens";
        this.campaigns = "campaigns";
        this.campaign = "campaign";
        this.officialCampaign = "officialcampaign";
        this.rooms = "rooms";
        this.room = "room";
        this.clubs = "clubs";
        this.club = "club";
        this.members = "members";
        this.activities = "activities";
        this.events = "competitions";
        this.player = "player";
        this.players = "players";
        this.trophies = "trophies";
        this.topTrophies = "top/trophies";
        this.leaderboard = "leaderboard";
        this.map = "map";
        this.matches = "matches";
        this.matchmaking = "top/matchmaking";
        this.match = "match";
        this.challenge = "challenge";
    }
}

class defaultOptionsAPIPathsTMX {
    constructor() {
        this.protocol = "https";
        this.host = "trackmania.exchange";
        this.api = "api";
        this.tabs = new defaultOptionsAPIPathsTMXTabs();
    }
}

class defaultOptionsAPIPathsTMXTabs {
    constructor() {
        this.mapInfo = "maps/get_map_info/multi";
        this.mapsDownload = "maps/download";
    }
}

class defaultOptionsAPIPathsMapVoting {
    constructor() {
        this.protocol = "https";
        this.host = "tm-voting.willers.digital";
        this.tabs = new defaultOptionsAPIPathsMapVotingTabs();
    }
}

class defaultOptionsAPIPathsMapVotingTabs {
    constructor() {
        this.getPlayerVote = "getPlayerVote";
        this.getVotes = "getVotes";
        this.mostPlayerVoted = "mostPlayerVoted";
        this.mostVotedMaps = "mostVotedMaps";
        //TODO setVote (POST)
    }
}

class defaultOptionsCache {
    constructor() {
        this.enabled = true;
        this.ttl = 10;
        this.leaderboardttl = 1;
        this.roomttl = 5;
    }
}

module.exports = defaultOptions;