class Options {
    /**
     * Creates default options for the client
     * @returns {Object}
     * @private
     */
    static createDefault(){
        return {
            api: {
                paths: {
                    tmio: {
                        protocol: "https",
                        host: "trackmania.io",
                        api: "api",
                        tabs: {
                            totd: "totd",
                            cotd: "cotd",
                            comp: "comp",
                            news: "splashscreens",
                            campaigns: "campaigns",
                            campaign: "campaign",
                            officialCampaign: "officialcampaign",
                            rooms: "rooms",
                            room: "room",
                            clubs: "clubs",
                            club: "club",
                            members: "members",
                            activities: "activities",
                            events: "competitions",
                            player: "player",
                            players: "players",
                            trophies:"trophies",
                            topTrophies: "top/trophies",
                            leaderboard: "leaderboard",
                            map: "map",
                            matches: "matches",
                            matchmaking: "top/matchmaking",
                            match:"match"
                        },
                    },
                    tmstats: {
                        protocol: "https",
                        host: "trackmaniastats.herokuapp.com",
                        api: "api",
                        tabs: {
                            searchPlayer: "searchPlayer",
                            player: "playerProfiles",
                            playerList: "playerList",
                            cotd: "cotd",
                            rankings: "COTDRankings"
                        }
                    },
                    tmx: {
                        protocol: "https",
                        host: "trackmania.exchange",
                        api: "api",
                        tabs: {
                            mapInfo: "maps/get_map_info/multi",
                            mapsDownload: "maps/download",
                        }
                    },
                },
                useragent: null
            },
            cache: {
                enabled: true,
                ttl: 10,
                leaderboardttl: 1,
                roomttl: 5,
            },
            dev: false
        };
    }
}

module.exports = Options;