const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const TMMap = require('../structures/TMMap'); // eslint-disable-line no-unused-vars
const PlayerEchelonData = require('../data/PlayerEchelons.json');

class Player {
    constructor(client, data){
        /**
         * The client object of the player
         * @type {Client}
         */
        this.client = client;

        /** @private */
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
     * @returns {String}
     */
    get id(){
        return this._data.accountid;
    }

    /**
     * The display name of the player
     * @returns {String}
     */
    get name(){
        return this._data.displayname;
    }

    /**
     * The timestamps of the player's first login
     * @returns {Date}
     * @readonly
     * @private can be used but keep it private
     */
    get timestamp(){
        return new Date(this._data.timestamp);
    }

    /**
     * The club tag of the player (non-formatted)
     * @returns {String}
     */
    get clubTag(){
        return this._data.clubtag;
    }

    // TODO: Add a formatter function


    /**
     * The last change of the player's club tag
     * @returns {Date}
     * @readonly
     */
    get lastClubTagChange(){
        return new Date(this._data.clubtagtimestamp);
    }

    /**
     * The player's zone data with the ranking of the player in the zone
     * @returns {Array<Object>} An array from the player's region name to World
     * @example
     * // Generate a string of the player's zone data
     * const string = player.zone.map(p=>p.name).join(', ');
     */
    get zone(){
        return this._constructZoneArray([], this._data.trophies.zone);
    }

    /**
     * The player's trophy data
     * @returns {PlayerTrophies}
     */
    get trophies(){
        if (!this._PlayerTrophies){
            /** @private */
            this._PlayerTrophies = new PlayerTrophies(this, this._data.trophies);
        } 
        return this._PlayerTrophies;
    }

    /**
     * The player's meta data
     * @returns {PlayerMeta}
     */
    get meta(){
        if (!this._PlayerMeta){
            /** @private */
            this._PlayerMeta = new PlayerMeta(this);
        } 
        return this._PlayerMeta;
    }

    /**
     * The player's COTD Data
     * @returns {PlayerCOTD}
     */
    get cotd(){
        if (!this._cotd){
            /** @private */
            this._cotd = new PlayerCOTD(this, this._data.cotd);
        }
        return this._cotd;
    }

    /**
     * The player's matchmaking data
     * @param {String | number} type The type of matchmaking data to return ('3v3' / 'Royal') (defaults to '3v3')
     * @returns {PlayerMatchmaking}
     */
    matchmaking(type = '3v3'){
        if (!this._PlayerMatchmaking || this._PlayerMatchmaking.type !== type){
            /** @private */
            this._PlayerMatchmaking = new PlayerMatchmaking(this, type);
        } 
        return this._PlayerMatchmaking;
    }

}

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
         * @private
         */
        this._data = data;
    }

    /**
     * The points of the player
     * @returns {Number}
     */
    get points(){
        return this._data.points;
    }

    /**
     * The last time the player got a trophy
     * @returns {Date}
     * @readonly
     */
    get lastChange(){
        return new Date(this._data.timestamp);
    }

    /**
     * The echelon level of the player
     * @returns {PlayerEchelon}
     */
    get echelon(){
        if (!this._PlayerEchelon || this._PlayerEchelon.number !== this._data.echelon){
            /** @private */
            this._PlayerEchelon = new PlayerEchelon(this.player, this._data);
        } 
        return this._PlayerEchelon;
    }

    /**
     * The number of trophies the player has
     * @param {Number} number The trophy number, from 1 (bronze 1) to 9 (gold 3)
     * @returns {Number}
     * @example
     * // Get number of trophy 5 (aka silver 2 trophy)
     * player.trophies.trophy(5);
     */
    trophy(number = 1){
        if (number < 1 || number > 9){
            throw new Error('Invalid trophy number');
        }
        return this._data.counts[number - 1];
    }

    /**
     * The number of trophies the player has
     * @returns {Array<Number>}
     */
    get trophies(){
        return this._data.counts;
    }

    /**
     * The last 25 trophies gains of the player
     * @returns {Array<PlayerTrophyHistory>}
     */
    get history(){
        let arr = [];
        for (let i = 0; i < this._data.history.length; i++){
            arr.push(new PlayerTrophyHistory(this.player, this._data.history[i]));
        }
        return arr;
    }
}

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
         * @private
         */
        this._data = data;
    }

    /**
     * The number of trophies the player has
     * @param {Number} number The trophy number, from 1 (bronze 1) to 9 (gold 3)
     * @returns {Number}
     * @example
     * // Get number of trophy 5 (aka silver 2 trophy) on the latest gain
     * player.trophies.history[0].trophy(5);
     */
    trophy(number = 1){
        if (number < 1 || number > 9){
            throw new Error('Invalid trophy number');
        }
        return this._data.counts[number - 1];
    }

    /**
     * The number of trophies the player has
     * @returns {Array<Number>}
     */
    get trophies(){
        return this._data.counts;
    }

    /**
     * The date of the gain
     * @returns {Date}
     */
    get date(){
        return new Date(this._data.timestamp);
    }

    /**
     * The rank of the player
     * @returns {Number}
     */
    get rank(){
        return this._data.details.rank;
    }

    /**
     * The types of the achievement
     * @returns {PlayerTrophyAchievementType}
     */
    get type(){
        let achievement = this._data.achievement;
        if (this._data.details) achievement.details = this._data.details;
        if (!this._achievement || this.achievement.id != achievement.trophyAchievementId){
            /** @private */
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
         * @private
         */
        this._data = data;
    }

    /**
     * Gets the type of the achievement
     * @returns {String}
     */
    get type(){
        return this._data.trophyAchievementType;
    }

    /**
     * Gets the ID of the achievement
     * @returns {String}
     */
    get id(){
        return this._data.trophyAchievementId;
    }

    /**
     * Gets the solo ranking achievement type (if the type is SoloRanking)
     * @return {String|null}
     */
    get soloRankingType(){
        if (this.type == "SoloRanking") return this._data.trophySoloRankingAchievementType;
        else return null;
    }

    /**
     * Gets the solo ranking season ID (if the type is SoloRanking)
     * @return {String|null}
     */
    get soloRankingSeasonId(){
        if (this.type == "SoloRanking") return this._data.seasonId;
        else return null;
    }

    /**
     * Gets the competition id (if the type is CompetitionRanking)
     * @returns {String|null}
     */
    get competitionId(){
        if (this.type == "CompetitionRanking") return this._data.competitionId;
        else return null;
    }

    /**
     * Gets the competition name (if the type is CompetitionRanking)
     * @returns {String|null}
     */
    get competitionName(){
        if (this.type == "CompetitionRanking") return this._data.competitionName;
        else return null;
    }

    /**
     * Gets the competition stage (if the type is CompetitionRanking)
     * @returns {String|null}
     */
    get competitionStage(){
        if (this.type == "CompetitionRanking") return this._data.competitionStage;
        else return null;
    }

    /**
     * Gets the competition stage step (if the type is CompetitionRanking)
     * @returns {String|null}
     */
    get competitionStageStep(){
        if (this.type == "CompetitionRanking") return this._data.competitionStageStep;
        else return null;
    }

    /**
     * Gets the competition type (if the type is CompetitionRanking)
     * @returns {String|null}
     */
    get competitionType(){
        if (this.type == "CompetitionRanking") return this._data.competitionType;
        else return null;
    }

    /**
     * Gets the Solo Medal type (if the type is SoloMedal)
     * @return {String|null}
     */
    get soloMedalType(){
        if (this.type == "SoloMedal") return this._data.trophySoloMedalAchievementType;
        else return null;
    }

    /**
     * Gets the solo medal level (if the type is SoloMedal)
     * @return {Number|null}
     */
    get soloMedalLevel(){
        if (this.type == "SoloMedal") return this._data.detals.level;
        else return null;
    }

    /**
     * Gets the server ID of the Live Match (if the type is LiveMatch)
     * @returns {String|null}
     */
    get liveMatchServerId(){
        if (this.type == "LiveMatch") return this._data.serverId;
        else return null;
    }

    /**
     * Gets the game mode of the Live Match (if the type is LiveMatch)
     * @return {String|null}
     */
    get liveMatchGameMode(){
        if (this.type == "LiveMatch") return this._data.gameMode;
        else return null;
    }

    /**
     * Gets the duration of the Live Match in seconds (if the type is LiveMatch)
     * @return {Number|null}
     */
    get liveMatchDuration(){
        if (this.type == "LiveMatch") return this._data.duration;
        else return null;
    }

    /**
     * Gets the rank of the Live Match (if the type is LiveMatch)
     * @return {Number|null}
     */
    get liveMatchRank(){
        if (this.type == "LiveMatch") return this._data.details.rank;
        else return null;
    }

    /**
     * Gets the trophy rank of the Live Match (if the type is LiveMatch)
     * @return {Number|null}
     */
    get liveMatchTrophyRank(){
        if (this.type == "LiveMatch") return this._data.details.trophyRanking;
        else return null;
    }
}

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
         * @type {Number}
         */
        this.number = data.echelon;
    }

    /**
     * The name of the echelon
     * @returns {String}
     */
    get name(){
        return PlayerEchelonData[this.number].name;
    }

    /**
     * The image URL of the echelon
     * @returns {String}
     */
    get image(){
        return PlayerEchelonData[this.number].img;
    }
}

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
     * @returns {String}
     */
    get vanity(){
        if (this.player._data.meta && (this.player._data.meta.vanity && this.player._data.vanity != "")) return this.player._data.meta.vanity;
        else return null;
    }

    /**
     * The youtube link of the player, if the player has one, otherwise null
     * @returns {String}
     */
    get youtube(){
        if (this.player._data.meta && (this.player._data.meta.youtube && this.player._data.youtube != "")) return 'https://www.youtube.com/channel/' + this.player._data.meta.youtube;
        else return null;
    }

    /**
     * The twitter link of the player, if the player has one, otherwise null
     * @returns {String}
     */
    get twitter(){
        if (this.player._data.meta && (this.player._data.meta.twitter && this.player._data.twitter != "")) return 'https://twitter.com/' + this.player._data.meta.twitter;
        else return null;
    }

    /**
     * The twitch channel link of the player, if the player has one, otherwise null
     * @returns {String}
     */
    get twitch(){
        if (this.player._data.meta && (this.player._data.meta.twitch && this.player._data.twitch != "")) return 'https://www.twitch.tv/' + this.player._data.meta.twitch;
        else return null;
    }

    /**
     * The display URL of the player
     * @returns {String}
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
}

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
        this._data = typeof type == 'string' ? this.player._data.matchmaking.find(m=>m.info.typename == type).info : this.player._data.matchmaking.find(m=>m.info.typeid == type).info;

        // throw error if no matchmaking data found
        if (!this._data){
            throw new Error('No matchmaking data found');
        }
    }

    /**
     * The type name of the matchmaking 
     * @returns {String}
     */
    get type(){
        return this._data.typename;
    }

    /**
     * The type ID of the matchmaking
     * @returns {Number}
     */
    get typeId(){
        return this._data.typeid;
    }

    /**
     * The rank of the player on this matchmaking
     * @returns {Number}
     */
    get rank(){
        return this._data.rank;
    }

    /**
     * The MMR rank of the player on this matchmaking (score)
     * @returns {Number}
     */
    get score(){
        return this._data.score;
    }

    /**
     * The progression of the player on this matchmaking (can be number of wins for Royal, or score for 3v3)
     * @returns {Number}
     */
    get progression(){
        return this._data.progression;
    }

    /**
     * The division of the player on this matchmaking
     * @returns {MatchmakingDivision}
     */
    get division(){
        if (!this._MatchmakingDivision || this._MatchmakingDivision.division !== this._data.division.position){
            const MatchmakingDivision = require('./MatchmakingDivision');
            /** @private */
            this._MatchmakingDivision = new MatchmakingDivision(this.client, this.typeId, this._data.division);
        } 
        return this._MatchmakingDivision;
    }

    /**
     * The history of recent matches on this matchmaking
     * @returns {Array<PlayerMatchmakingMatchResult>}
     */
    get history(){
        let arr = [];
        for (let i = 0; i < this._data.history.length; i++){
            arr.push(new PlayerMatchmakingMatchResult(this.player, this._data.history[i]));
        }
        return arr;
    }
}

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
         * @private
         */
        this._data = data;
    }

    /**
     * The player has win the match
     * @returns {Boolean}
     */
    get win(){
        return this._data.win;
    }

    /**
     * The player has leaved the match
     * @returns {Boolean}
     */
    get leave(){
        return this._data.leave;
    }

    /**
     * The player is the most valuable player in the match
     * @returns {Boolean}
     */
    get mvp(){
        return this._data.mvp;
    }

    /**
     * The match LiveID
     * @returns {String}
     */
    get liveId(){
        return this._data.lid;
    }

    /**
     * The start date of the match
     * @returns {Date}
     */
    get startDate(){
        return new Date(this._data.starttime);
    }

    /**
     * The score of the player after this match
     * @returns {Number}
     */
    get afterScore(){
        return this._data.afterscore;
    }
}

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
         * @private
         */
        this._data = data;
    }

    /**
     * The number of COTDs played
     * @returns {Number}
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
            /** @private */
            this._stats = new PlayerCOTDStats(this.player, this._data.stats);
        }
        return this._stats;
    }

    /**
     * Get the 25 recents COTD results
     * @returns {Array<PlayerCOTDResult>}
     */
    get recentResults(){
        const arr = [];
        this._data.cotds.forEach(cotd=>{
            arr.push(new PlayerCOTDResult(this.player, cotd));
        });
        return arr;
    }
}

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
         * @private
         */
        this._data = data;
    }

    /**
     * The ID of the COTD
     * @returns {Number}
     */
    get id(){
        return this._data.id;
    }

    /**
     * The date of the COTD
     * @returns {Date}
     * @readonly
     */
    get date(){
        return new Date(this._data.timestamp);
    }

    /**
     * The name of the COTD
     * @returns {String}
     */
    get name(){
        return this._data.name;
    }

    /**
     * The division of the COTD
     * @returns {Number}
     */
    get division(){
        return this._data.div;
    }

    /**
     * The overall rank on the COTD
     * @returns {Number}
     */
    get rank(){
        return this._data.rank;
    }

    /**
     * The division rank on the COTD
     * @returns {Number}
     */
    get divisionRank(){
        return this._data.divrank;
    }

    /**
     * The score of the COTD
     * @returns {Number}
     */
    get score(){
        return this._data.score;
    }

    /**
     * The total number of players of the COTD
     * @returns {Number}
     */
    get totalPlayers(){
        return this._data.total;
    }
}

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
            /** @private */
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
            /** @private */
            this._bestoverall = new PlayerCOTDStatsBest(this, this._data.bestoverall);
        }
        return this._bestoverall;
    }

    /**
     * The total COTD wins in division 1
     * @returns {Number}
     */
    get totalWins(){
        return this._data.totalwins;
    }

    /**
     * The total COTD wins in any divison
     * @returns {Number}
     */
    get totalDivWins(){
        return this._data.totaldivwins;
    }

    /**
     * Average rank, float between 0 and 1
     * @returns {Number}
     */
    get averageRank(){
        return this._data.avgrank;
    }

    /**
     * Average div rank (in any division), float between 0 and 1
     * @returns {Number}
     */
    get averageDivRank(){
        return this._data.avgdivrank;
    }

    /**
     * Average division
     * @returns {Number}
     */
    get averageDiv(){
        return this._data.avgdiv;
    }

    /**
     * The win streak in division 1
     * @returns {Number}
     */
    get winStreak(){
        return this._data.winstreak;
    }

    /**
     * The win streak in any division
     * @returns {Number}
     */
    get divWinStreak(){
        return this._data.divwinstreak;
    }
}

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
        * @private
        */
        this._data = data;
    }

    /**
     * The best rank
     * @returns {Number}
     */
    get rank(){
        return this._data.bestrank;
    }

    /**
     * The best rank date
     * @returns {Date}
     * @readonly
     */
    get rankDate(){
        return new Date(this._data.bestrankdate);
    }

    /**
     * The best div rank
     * @returns {Number}
     */
    get divRank(){
        return this._data.bestrankdivrank;
    }

    /**
     * The best division
     * @returns {Number}
     */
    get division(){
        return this._data.bestdiv;
    }

    /**
     * The best divison date
     * @returns {Date}
     * @readonly
     */
    get divisionDate(){
        return new Date(this._data.bestdivdate);
    }

    /**
     * The best rank in a division
     * @returns {Number}
     */
    get rankInDivision(){
        return this._data.bestrankindiv;
    }

    /**
     * The best rank in a division date
     * @returns {Date}
     * @readonly
     */
    get rankInDivisionDate(){
        return new Date(this._data.bestrankindivdate);
    }

    /**
     * The division who got the best rank in a division
     * @returns {Number}
     */
    get divisionOfRankInDivision(){
        return this._data.bestrankindivdiv;
    }
}

module.exports = Player;