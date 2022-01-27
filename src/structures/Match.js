const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const {MMTypes, MatchmakingGroup, MatchStatus, TeamNames, TeamName} = require('../util/Constants'); // eslint-disable-line no-unused-vars
const RoyalTeams = require('../data/RoyalTeams.json');

/**
 * The match
 */
class Match {
    constructor(client, data){
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The match ID
     * @type {number}
     */
    get id(){
        return this._data.id;
    }

    /**
     * The match live ID
     * @type {string}
     */
    get liveId(){
        return this._data.lid;
    }

    /**
     * The match name
     * @type {string}
     */
    get name(){
        return this._data.name;
    }

    /**
     * The match type
     * @type {?MatchmakingGroup}
     */
    get type(){
        if (this.name.includes("3v3")) return MMTypes[2];
        else if (this.name.includes("royal")) return MMTypes[3];
        else return null;
    }

    /**
     * The match group
     * @type {string}
     * @private
     */
    get group(){
        return this._data.group;
    }

    /**
     * The match start date
     * @type {Date}
     */
    get startDate(){
        return new Date(this._data.startdate * 1000);
    }

    /**
     * The match end date
     * @type {Date}
     */
    get endDate(){
        return new Date(this._data.enddate * 1000);
    }

    /**
     * The match score direction
     * @type {string}
     * @private
     */
    get scoreDirection(){
        return this._data.scoredirection;
    }

    /**
     * The match participant type
     * @type {string}
     * @private
     */
    get participantType(){
        return this._data.participanttype;
    }

    /**
     * The match script settings
     * NOTE: Array is empty (api update?)
     * @type {Array<MatchScriptSetting>}
     * @private
     */
    get scriptSettings(){
        return this._data.scriptsettings;
    }

    /**
     * The match maps
     * NOTE: Array is empty (api update?)
     * @type {Array<MatchMap>}
     * @private
     */
    get maps(){
        return this._data.maps;
    }

    /**
     * The match server id
     * @type {number}
     */
    get serverId(){
        return this._data.serverid;
    }

    /**
     * The match join link
     * @type {string}
     */
    get joinLink(){
        return this._data.serverjoinlink;
    }

    /**
     * The match status
     * @type {MatchStatus}
     */
    get status(){
        return this._data.status;
    }

    /**
     * The match players
     * @type {Array<MatchPlayer>}
     */
    get players(){
        return this._data.players.map(player => new MatchPlayer(this, player));
    }

    /**
     * The match teams (if match is completed)
     * @type {?Array<MatchTeam>}
     */
    get teams(){
        if(this.status === "COMPLETED"){
            if (this.type == MMTypes[3]) {
                // In royal, there are 20 teams but the API returns 30 items, so we need to delete the last 10 teams
                return this._data.teams.slice(0, 20).map(team => new MatchTeam(this, team));
            }
            return this._data.teams.map(team => new MatchTeam(this, team));
        }
        return null;
    }
}

/**
 * The team in the match
 */
class MatchTeam {
    constructor(match, data){
        /**
         * The match
         * @type {Match}
         */
        this.match = match;

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = match.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The team Index
     * @type {number}
     */
    get index(){
        return this._data.index;
    }

    /**
     * The team score
     * @type {number}
     */
    get score(){
        return this._data.score;
    }

    /**
     * The team name
     * @type {?string | TeamName}
     */
    get name(){
        if (this.match.type == MMTypes[2]){ // 3v3
            return TeamNames[this.index];
        } else if (this.match.type == MMTypes[3]){ // Royal
            return RoyalTeams[this.index].name;
        }
        return null;
    }

    /**
     * The team image (if the match is Royal)
     * @type {?string}
     */
    get image(){
        if (this.match.type == MMTypes[3]){ // Royal
            return RoyalTeams[this.index].img;
        }
        return null;
    }
}

/**
 * The player in the match
 */
class MatchPlayer {
    constructor(match, data){
        /**
         * The match
         * @type {Match}
         */
        this.match = match;

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = match.client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The player name
     * @type {string}
     */
    get name(){
        return this._data.player.name;
    }

    /**
     * The player id
     * @type {string}
     */
    get id(){
        return this._data.player.id;
    }

    /**
     * The player rank in the match
     * @type {number}
     */
    get rank(){
        return this._data.rank;
    }

    /**
     * The player score in the match
     * @type {number}
     */
    get score(){
        return this._data.score;
    }

    /**
     * The team index where the player is in the match
     * @type {number}
     */
    get teamIndex(){
        return this._data.team;
    }

    /**
     * The team where the player is (if the match is completed)
     * @type {?MatchTeam}
     */
    get team(){
        if(this.match.status === "COMPLETED"){
            return this.match.teams[this.teamIndex];
        }
        return null;
    }

    /**
     * Whether the player is MVP (in a 3v3 match)
     * @type {boolean}
     */
    get isMVP(){
        if (this._data.mvp) return this._data.mvp;
        else return false;
    }

    /**
     * The matchmaking points of the player before the match
     * @type {number}
     */
    get mmPointsBefore(){
        return this._data.matchmakingpoints.before;
    }

    /**
     * The matchmaking points of the player after the match
     * @type {number}
     */
    get mmPointsAfter(){
        return this._data.matchmakingpoints.after;
    }

    /**
     * The matchmaking points of the player gained in the match
     * @type {number}
     */
    get mmPointsGained(){
        return this.mmPointsAfter - this.mmPointsBefore;
    }

    /**
     * The player object
     * @type {Player}
     */
    async player(){
        return this.client.players.get(this.id);
    }
}

module.exports = Match;