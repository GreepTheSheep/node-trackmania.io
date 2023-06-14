const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('../structures/TMMap'); // eslint-disable-line no-unused-vars
const PlayerEchelonData = require('../data/PlayerEchelons.json');
const {MMTypes, MatchmakingGroup} = require('../util/Constants'); // eslint-disable-line no-unused-vars

/**
 * Represents a player in Trackmania.
 */
class Player {
    constructor(client, data){
        /**
         * The client object of the player
         * @type {Client}
         */
        this.client = client;

        /**
         * The data of the player
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * Constructs an array of the zone of the player
     * @returns {Array<Object>}
     * @private
     */
    _constructZoneArray(array, obj){
        // Copy the object to a new object for displaing
        const obj2 = Object.assign({}, obj);
        delete obj2.parent;
        // Add ranking to this object
        obj2.ranking = this._data.trophies.zonepositions[array.length];
        array.push(obj2);
        Object.entries(obj).forEach(entry => {
            const [key, value] = entry;
            if (key == 'parent' && value != null) this._constructZoneArray(array, value);
        });
        return array;
    }

    /**
     * The account ID of the player
     * @type {string}
     */
    get id(){
        return this._data.accountid;
    }

    /**
     * The login of the player
     * @type {string}
     */
    get login(){
        return this.client.players.toLogin(this.id);
    }

    /**
     * The display name of the player
     * @type {string}
     */
    get name(){
        return this._data.displayname;
    }

    /**
     * The date of the player's first login
     * @type {Date}
     * @readonly
     */
    get firstLogin(){
        return new Date(this._data.timestamp);
    }

    /**
     * The club tag of the player (non-formatted)
     * @type {string}
     */
    get clubTag(){
        return this._data.clubtag;
    }

    /**
     * The last change of the player's club tag
     * @type {Date}
     * @readonly
     */
    get lastClubTagChange(){
        return new Date(this._data.clubtagtimestamp);
    }

    /**
     * The player's zone data with the ranking of the player in the zone
     * @type {Array<PlayerZone>}
     * @example
     * // Generate a string of the player's zone data
     * const string = player.zone.map(z=>z.name).join(', ');
     */
    get zone(){
        const zonesArray = this._constructZoneArray([], this._data.trophies.zone);
        return zonesArray.map(z=>new PlayerZone(this, z));
    }

    /**
     * The player's trophy data
     * @type {PlayerTrophies}
     */
    get trophies(){
        if (!this._PlayerTrophies){
            /**
             * The player's trophy data
             * @type {PlayerTrophies}
             * @private
             */
            this._PlayerTrophies = new PlayerTrophies(this, this._data.trophies);
        }
        return this._PlayerTrophies;
    }

    /**
     * The player's meta data
     * @type {PlayerMeta}
     */
    get meta(){
        if (!this._PlayerMeta){
            /**
             * The player's meta data
             * @type {PlayerMeta}
             * @private
             */
            this._PlayerMeta = new PlayerMeta(this);
        }
        return this._PlayerMeta;
    }

    /**
     * The player's COTD Data
     * @param {number} [page=0] The page number.
     * @returns {Promise<PlayerCOTD>}
     */
    async cotd(page = 0){
        const player = this.client.options.api.paths.tmio.tabs.player,
            cotd = this.client.options.api.paths.tmio.tabs.cotd,
            ReqUtil = require('../util/ReqUtil');

        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${this.id}/${cotd}/${page}`);
        if (!res) throw "No response from the API";
        return new PlayerCOTD(this, res);
    }

    /**
     * The player's matchmaking data
     * @param {MatchmakingGroup} [type="3v3"] The type of matchmaking data to return
     * @returns {PlayerMatchmaking}
     */
    matchmaking(type = '3v3'){
        if (!this._PlayerMatchmaking || this._PlayerMatchmaking.type !== type){
            /**
             * The player's matchmaking data
             * @type {PlayerMatchmaking}
             * @private
             */
            this._PlayerMatchmaking = new PlayerMatchmaking(this, type);
        }
        return this._PlayerMatchmaking;
    }

}

/**
 * Represents a zone in a player
 */
class PlayerZone {
    constructor(player, zone){
        /**
         * The player instance
         * @type {Player}
         */
        this.player = player;

        /**
         * The client that instancied the Player
         * @type {Client}
         */
        this.client = this.player.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = zone;
    }

    /**
     * The name of the zone
     * @type {string}
     */
    get name(){
        return this._data.name;
    }

    /**
     * The flag of the zone
     * @type {string}
     */
    get flag(){
        return this._data.flag;
    }

    /**
     * The ranking of the player in the zone
     * @type {number}
     */
    get ranking(){
        return this._data.ranking;
    }
}

/**
 * Represents the trophies of a player
 */
class PlayerTrophies {
    constructor(player, data){
        /**
         * The player object
         * @type {Player}
         */
        this.player = player;

        /**
         * The client object
         * @type {Client}
         */
        this.client = player.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The points of the player
     * @type {number}
     */
    get points(){
        return this._data.points;
    }

    /**
     * The last time the player got a trophy
     * @type {Date}
     * @readonly
     */
    get lastChange(){
        return new Date(this._data.timestamp);
    }

    /**
     * The echelon level of the player
     * @type {PlayerEchelon}
     */
    get echelon(){
        if (!this._PlayerEchelon || this._PlayerEchelon.number !== this._data.echelon){
            /**
             * The player's echelon data
             * @type {PlayerEchelon}
             * @private
             */
            this._PlayerEchelon = new PlayerEchelon(this.player, this._data);
        }
        return this._PlayerEchelon;
    }

    /**
     * The number of trophies the player has
     * @param {number} [number=1] The trophy number, from 1 (bronze 1) to 9 (gold 3)
     * @returns {number}
     * @example
     * // Get number of trophy 5 (aka silver 2 trophy)
     * player.trophies.trophy(5);
     */
    trophy(number = 1){
        if (number < 1 || number > 9){
            throw "Invalid trophy number";
        }
        return this._data.counts[number - 1];
    }

    /**
     * The number of trophies the player has
     * @type {Array<number>}
     */
    get trophies(){
        return this._data.counts;
    }

    /**
     * The last 25 trophies gains of the player
     * @param {number} [page=0] The page number.
     * @type {Array<PlayerTrophyHistory>}
     */
    async history(page = 0){
        const player = this.client.options.api.paths.tmio.tabs.player,
            trophies = this.client.options.api.paths.tmio.tabs.trophies,
            ReqUtil = require('../util/ReqUtil');

        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${this.player.id}/${trophies}/${page}`);
        if (!res) throw "No response from the API";
        let arr = [];
        for (let i = 0; i < res.gains.length; i++){
            arr.push(new PlayerTrophyHistory(this.player, res.gains[i]));
        }
        return arr;
    }
}

/**
 * Represents the history of a player's trophies
 */
class PlayerTrophyHistory {
    constructor(player, data){
        /**
         * The player object
         * @type {Player}
         */
        this.player = player;

        /**
         * The client object
         * @type {Client}
         */
        this.client = player.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The number of trophies the player has
     * @param {number} [number=1] The trophy number, from 1 (bronze 1) to 9 (gold 3)
     * @returns {number}
     * @example
     * // Get number of trophy 5 (aka silver 2 trophy) on the latest gain
     * player.trophies.history[0].trophy(5);
     */
    trophy(number = 1){
        if (number < 1 || number > 9){
            throw "Invalid trophy number";
        }
        return this._data.counts[number - 1];
    }

    /**
     * The number of trophies the player has
     * @type {Array<number>}
     */
    get trophies(){
        return this._data.counts;
    }

    /**
     * The date of the gain
     * @type {Date}
     */
    get date(){
        return new Date(this._data.timestamp);
    }

    /**
     * The rank of the player
     * @type {number}
     */
    get rank(){
        return this._data.details.rank;
    }

    /**
     * The types of the achievement
     * @type {PlayerTrophyAchievementType}
     */
    get type(){
        let achievement = this._data.achievement;
        if (this._data.details) achievement.details = this._data.details;
        if (!this._achievement || this.achievement.id != achievement.trophyAchievementId){
            /**
             * The achievement type object
             * @type {PlayerTrophyAchievementType}
             * @private
             */
            this._achievement = new PlayerTrophyAchievementType(this.player, achievement);
        }
        return this._achievement;
    }

    /**
     * The map where the achievement was earned (if any)
     * @returns {Promise<TMMap>|null}
     */
    async map(){
        if (this._data.map){
            return await this.client.maps.get(this._data.map.mapId);
        } else return null;
    }
}

/**
 * Represents the type of an achievement
 */
class PlayerTrophyAchievementType{
    constructor(player, data){
        /**
         * The player object
         * @type {Player}
         */
        this.player = player;

        /**
         * The client object
         * @type {Client}
         */
        this.client = this.player.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * Gets the type of the achievement
     * @type {string}
     */
    get type(){
        return this._data.trophyAchievementType;
    }

    /**
     * Gets the ID of the achievement
     * @type {string}
     */
    get id(){
        return this._data.trophyAchievementId;
    }

    /**
     * Gets the solo ranking achievement type (if the type is SoloRanking)
     * @type {?string}
     */
    get soloRankingType(){
        if (this.type == "SoloRanking") return this._data.trophySoloRankingAchievementType;
        else return null;
    }

    /**
     * Gets the solo ranking season ID (if the type is SoloRanking)
     * @type {?string}
     */
    get soloRankingSeasonId(){
        if (this.type == "SoloRanking") return this._data.seasonId;
        else return null;
    }

    /**
     * Gets the competition id (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionId(){
        if (this.type == "CompetitionRanking") return this._data.competitionId;
        else return null;
    }

    /**
     * Gets the competition name (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionName(){
        if (this.type == "CompetitionRanking") return this._data.competitionName;
        else return null;
    }

    /**
     * Gets the competition stage (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionStage(){
        if (this.type == "CompetitionRanking") return this._data.competitionStage;
        else return null;
    }

    /**
     * Gets the competition stage step (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionStageStep(){
        if (this.type == "CompetitionRanking") return this._data.competitionStageStep;
        else return null;
    }

    /**
     * Gets the competition type (if the type is CompetitionRanking)
     * @type {?string}
     */
    get competitionType(){
        if (this.type == "CompetitionRanking") return this._data.competitionType;
        else return null;
    }

    /**
     * Gets the Solo Medal type (if the type is SoloMedal)
     * @type {?string}
     */
    get soloMedalType(){
        if (this.type == "SoloMedal") return this._data.trophySoloMedalAchievementType;
        else return null;
    }

    /**
     * Gets the solo medal level (if the type is SoloMedal)
     * @type {?number}
     */
    get soloMedalLevel(){
        if (this.type == "SoloMedal") return this._data.detals.level;
        else return null;
    }

    /**
     * Gets the server ID of the Live Match (if the type is LiveMatch)
     * @type {?string}
     */
    get liveMatchServerId(){
        if (this.type == "LiveMatch") return this._data.serverId;
        else return null;
    }

    /**
     * Gets the game mode of the Live Match (if the type is LiveMatch)
     * @type {?string}
     */
    get liveMatchGameMode(){
        if (this.type == "LiveMatch") return this._data.gameMode;
        else return null;
    }

    /**
     * Gets the duration of the Live Match in seconds (if the type is LiveMatch)
     * @type {?number}
     */
    get liveMatchDuration(){
        if (this.type == "LiveMatch") return this._data.duration;
        else return null;
    }

    /**
     * Gets the rank of the Live Match (if the type is LiveMatch)
     * @type {?number}
     */
    get liveMatchRank(){
        if (this.type == "LiveMatch") return this._data.details.rank;
        else return null;
    }

    /**
     * Gets the trophy rank of the Live Match (if the type is LiveMatch)
     * @type {?number}
     */
    get liveMatchTrophyRank(){
        if (this.type == "LiveMatch") return this._data.details.trophyRanking;
        else return null;
    }
}

/**
 * Represents a player's echelon
 */
class PlayerEchelon {
    constructor(player, data){
        /**
         * The player object
         * @type {Player}
         */
        this.player = player;

        /**
         * The client object of the player
         * @type {Client}
         */
        this.client = player.client;

        /**
         * The echelon number
         * @type {number}
         */
        this.number = data.echelon;
    }

    /**
     * The name of the echelon
     * @type {string}
     */
    get name(){
        return PlayerEchelonData[this.number].name;
    }

    /**
     * The image URL of the echelon
     * @type {string}
     */
    get image(){
        return PlayerEchelonData[this.number].img;
    }
}

/**
 * Represents a player's metadata
 */
class PlayerMeta {
    constructor(player){
        /**
         * The player object
         * @type {Player}
         */
        this.player = player;
    }

    /**
     * The vanity name of the player, if the player has one, otherwise null
     * @type {string}
     */
    get vanity(){
        if (this.player._data.meta && (this.player._data.meta.vanity && this.player._data.vanity != "")) return this.player._data.meta.vanity;
        else return null;
    }

    /**
     * The youtube link of the player, if the player has one, otherwise null
     * @type {string}
     */
    get youtube(){
        if (this.player._data.meta && (this.player._data.meta.youtube && this.player._data.youtube != "")) return 'https://www.youtube.com/channel/' + this.player._data.meta.youtube;
        else return null;
    }

    /**
     * The twitter link of the player, if the player has one, otherwise null
     * @type {string}
     */
    get twitter(){
        if (this.player._data.meta && (this.player._data.meta.twitter && this.player._data.twitter != "")) return 'https://twitter.com/' + this.player._data.meta.twitter;
        else return null;
    }

    /**
     * The twitch channel link of the player, if the player has one, otherwise null
     * @type {string}
     */
    get twitch(){
        if (this.player._data.meta && (this.player._data.meta.twitch && this.player._data.twitch != "")) return 'https://www.twitch.tv/' + this.player._data.meta.twitch;
        else return null;
    }

    /**
     * The mastodon profile link of the player, if the player has one, otherwise null
     * @type {string}
     */
    get mastodon(){
        if (this.player._data.meta && (this.player._data.meta.mastodon && this.player._data.mastodon != "")) {
            let mastodonDomain = this.player._data.meta.mastodon.substring(this.player._data.meta.mastodon.indexOf('@')+1),
                mastodonHandle = this.player._data.meta.mastodon.substring(0, this.player._data.meta.mastodon.indexOf('@'));
            return "https://"+mastodonDomain+"/@"+mastodonHandle;
        }
        else return null;
    }

    /**
     * The display URL of the player
     * @type {string}
     */
    get displayURL(){
        const tmio = this.player.client.options.api.paths.tmio,
            player = `${tmio.protocol}://${tmio.host}/#/${tmio.tabs.player}/`;
        if (this.vanity != null) {
            return player + this.vanity;
        } else {
            return player + this.player.id;
        }
    }

    /**
     * Whether the player is in the TMGL group
     * @type {boolean}
     */
    get inTMGL(){
        if(this.player._data.meta && this.player._data.meta.tmgl) return true;
        else return false;
    }

    /**
     * Whether the player is in the Nadeo company
     * @type {boolean}
     */
    get inNadeo(){
        if(this.player._data.meta && this.player._data.meta.nadeo) return true;
        else return false;
    }

    /**
     * Whether the player is in the Openplanet & Trackmania.io team
     * @type {boolean}
     */
    get inTMIOTeam(){
        if(this.player._data.meta && this.player._data.meta.team) return true;
        else return false;
    }

    /**
     * Whether the player is a Openplanet & Trackmania.io sponsor
     * @type {boolean}
     */
    get isSponsor(){
        if(this.player._data.meta && this.player._data.meta.sponsor) return true;
        else return false;
    }

    /**
     * If the player is a sponsor, this returns the sponsor's level
     * @type {?number}
     */
    get sponsorLevel(){
        if (this.isSponsor) return this.player._data.meta.sponsorlevel;
        else return null;
    }
}

/**
 * Represents a player's stats in matchmaking
 */
class PlayerMatchmaking {
    constructor(player, type){
        /**
         * The player object
         * @type {Player}
         */
        this.player = player;

        /**
         * The client object
         * @type {Client}
         */
        this.client = this.player.client;

        /**
         * The raw data of the player's matchmaking data based on the type
         * @type {Object}
         * @private
         */
        this._data = typeof type == 'string' ? this.player._data.matchmaking.find(m=>m.info.typename == type) : this.player._data.matchmaking.find(m=>m.info.typeid == type);

        // throw error if no matchmaking data found
        if (!this._data){
            throw "No matchmaking data found";
        }
    }

    /**
     * The type name of the matchmaking
     * @type {string}
     */
    get type(){
        return this._data.info.typename;
    }

    /**
     * The type ID of the matchmaking
     * @type {number}
     */
    get typeId(){
        return this._data.info.typeid;
    }

    /**
     * The rank of the player on this matchmaking
     * @type {number}
     */
    get rank(){
        return this._data.info.rank;
    }

    /**
     * The total number of players in this matchmaking
     * @type {number}
     */
    get totalPlayers(){
        return this._data.total;
    }

    /**
     * The MMR rank of the player on this matchmaking (score)
     * @type {number}
     */
    get score(){
        return this._data.info.score;
    }

    /**
     * The progression of the player on this matchmaking (can be number of wins for Royal, or score for 3v3)
     * @type {number}
     */
    get progression(){
        return this._data.info.progression;
    }

    /**
     * The division of the player on this matchmaking
     * @type {MatchmakingDivision}
     */
    get division(){
        if (!this._MatchmakingDivision || this._MatchmakingDivision.division !== this._data.info.division.position){
            const MatchmakingDivision = require('./MatchmakingDivision');
            /**
             * The division of the player on this matchmaking
             * @type {MatchmakingDivision}
             * @private
             */
            this._MatchmakingDivision = new MatchmakingDivision(this.client, this.typeId, this._data.info.division);
        }
        return this._MatchmakingDivision;
    }

    /**
     * The history of recent matches on this matchmaking
     * @param {number} [page=0] The page number to get
     * @type {Promise<Array<PlayerMatchmakingMatchResult>>}
     */
    async history(page = 0){
        const player = this.client.options.api.paths.tmio.tabs.player,
            matches = this.client.options.api.paths.tmio.tabs.matches,
            ReqUtil = require('../util/ReqUtil');

        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${player}/${this.player.id}/${matches}/${this.typeId}/${page}`);
        if (!res) throw "No matchmaking history found";
        let arr = [];
        for (let i = 0; i < res.matches.length; i++){
            arr.push(new PlayerMatchmakingMatchResult(this.player, res.matches[i]));
        }
        return arr;
    }
}

/**
 * Represents a player's matchmaking match result
 */
class PlayerMatchmakingMatchResult {
    constructor(player, data){
        /**
         * The player object
         * @type {Player}
         */
        this.player = player;

        /**
         * The client object
         * @type {Client}
         */
        this.client = this.player.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The player has win the match
     * @type {boolean}
     */
    get win(){
        return this._data.win;
    }

    /**
     * The player has leaved the match
     * @type {boolean}
     */
    get leave(){
        return this._data.leave;
    }

    /**
     * The player is the most valuable player in the match
     * @type {boolean}
     */
    get mvp(){
        return this._data.mvp;
    }

    /**
     * The match LiveID
     * @type {string}
     */
    get liveId(){
        return this._data.lid;
    }

    /**
     * The start date of the match
     * @type {Date}
     */
    get startDate(){
        return new Date(this._data.starttime);
    }

    /**
     * The score of the player after this match
     * @type {number}
     */
    get afterScore(){
        return this._data.afterscore;
    }
}

/**
 * Represents a player's COTD object
 */
class PlayerCOTD{
    constructor(player, data){
        /**
         * The Player object
         * @type {Player}
         */
        this.player = player;

        /**
         * The client object
         * @type {Client}
         */
        this.client = player.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The number of COTDs played
     * @type {number}
     */
    get count(){
        return this._data.total;
    }

    /**
     * The Player COTD stats
     * @type {PlayerCOTDStats}
     */
    get stats(){
        if (!this._stats){
            /**
             * The Player COTD stats
             * @type {PlayerCOTDStats}
             * @private
             */
            this._stats = new PlayerCOTDStats(this.player, this._data.stats);
        }
        return this._stats;
    }

    /**
     * Get the 25 recents COTD results
     * @type {Array<PlayerCOTDResult>}
     */
    get recentResults(){
        const arr = [];
        this._data.cotds.forEach(cotd=>{
            arr.push(new PlayerCOTDResult(this.player, cotd));
        });
        return arr;
    }
}

/**
 * Represents a player's COTD result
 */
class PlayerCOTDResult{
    constructor(player, data){
        /**
         * The Player object
         * @type {Player}
         */
        this.player = player;

        /**
         * The client object
         * @type {Client}
         */
        this.client = player.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The ID of the COTD
     * @type {number}
     */
    get id(){
        return this._data.id;
    }

    /**
     * The date of the COTD
     * @type {Date}
     * @readonly
     */
    get date(){
        return new Date(this._data.timestamp);
    }

    /**
     * The name of the COTD
     * @type {string}
     */
    get name(){
        return this._data.name;
    }

    /**
     * The division of the COTD
     * @type {number}
     */
    get division(){
        return this._data.div;
    }

    /**
     * The overall rank on the COTD
     * @type {number}
     */
    get rank(){
        return this._data.rank;
    }

    /**
     * The division rank on the COTD
     * @type {number}
     */
    get divisionRank(){
        return this._data.divrank;
    }

    /**
     * The score of the COTD
     * @type {number}
     */
    get score(){
        return this._data.score;
    }

    /**
     * The total number of players of the COTD
     * @type {number}
     */
    get totalPlayers(){
        return this._data.total;
    }
}

/**
 * Represents a player's COTD stats
 */
class PlayerCOTDStats{
    constructor(player, data){

        /**
         * The player object
         * @type {Player}
         */
        this.player = player;

        /**
         * The client object
         * @type {Client}
         */
        this.client = player.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The best stats in the primary COTD
     * @type {PlayerCOTDStatsBest}
     */
    get bestPrimary(){
        if (!this._bestprimary){
            /**
             * The best stats in the primary COTD
             * @type {PlayerCOTDStatsBest}
             * @private
             */
            this._bestprimary = new PlayerCOTDStatsBest(this, this._data.bestprimary);
        }
        return this._bestprimary;
    }

    /**
     * The best stats in all COTDs (including reruns)
     * @type {PlayerCOTDStatsBest}
     */
    get bestOverall(){
        if (!this._bestoverall){
            /**
             * The best stats in all COTDs (including reruns)
             * @type {PlayerCOTDStatsBest}
             * @private
             */
            this._bestoverall = new PlayerCOTDStatsBest(this, this._data.bestoverall);
        }
        return this._bestoverall;
    }

    /**
     * The total COTD wins in division 1
     * @type {number}
     */
    get totalWins(){
        return this._data.totalwins;
    }

    /**
     * The total COTD wins in any divison
     * @type {number}
     */
    get totalDivWins(){
        return this._data.totaldivwins;
    }

    /**
     * Average rank, float between 0 and 1
     * @type {number}
     */
    get averageRank(){
        return this._data.avgrank;
    }

    /**
     * Average div rank (in any division), float between 0 and 1
     * @type {number}
     */
    get averageDivRank(){
        return this._data.avgdivrank;
    }

    /**
     * Average division
     * @type {number}
     */
    get averageDiv(){
        return this._data.avgdiv;
    }

    /**
     * The win streak in division 1
     * @type {number}
     */
    get winStreak(){
        return this._data.winstreak;
    }

    /**
     * The win streak in any division
     * @type {number}
     */
    get divWinStreak(){
        return this._data.divwinstreak;
    }
}

/**
 * Represents a player's COTD stats best stats
 */
class PlayerCOTDStatsBest{
    constructor(PlayerCOTDStats, data){

        /**
        * The PlayerCOTDStats object
        * @type {PlayerCOTDStats}
        */
        this.stats = PlayerCOTDStats;

        /**
         * The player object
         * @type {Player}
         */
        this.player = PlayerCOTDStats.player;

        /**
         * The client object
         * @type {Client}
         */
        this.client = this.player.client;

        /**
        * The data
        * @type {Object}
        * @private
        */
        this._data = data;
    }

    /**
     * The best rank
     * @type {number}
     */
    get rank(){
        return this._data.bestrank;
    }

    /**
     * The best rank date
     * @type {Date}
     * @readonly
     */
    get rankDate(){
        return new Date(this._data.bestranktime);
    }

    /**
     * The best div rank
     * @type {number}
     */
    get divRank(){
        return this._data.bestrankdivrank;
    }

    /**
     * The best division
     * @type {number}
     */
    get division(){
        return this._data.bestdiv;
    }

    /**
     * The best divison date
     * @type {Date}
     * @readonly
     */
    get divisionDate(){
        return new Date(this._data.bestdivtime);
    }

    /**
     * The best rank in a division
     * @type {number}
     */
    get rankInDivision(){
        return this._data.bestrankindiv;
    }

    /**
     * The best rank in a division date
     * @type {Date}
     * @readonly
     */
    get rankInDivisionDate(){
        return new Date(this._data.bestrankindivtime);
    }

    /**
     * The division who got the best rank in a division
     * @type {number}
     */
    get divisionOfRankInDivision(){
        return this._data.bestrankindivdiv;
    }
}

module.exports = Player;