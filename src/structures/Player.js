const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
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
            this._PlayerTrophies = new PlayerTrophies(this);
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
    constructor(player){
        /**
         * The player object
         * @type {Player}
         */
        this.player = player;
    }

    /**
     * The points of the player
     * @returns {Number}
     */
    get points(){
        return this.player._data.trophies.points;
    }

    /**
     * The last time the player got a trophy
     * @returns {Date}
     * @readonly
     */
    get lastChange(){
        return new Date(this.player._data.trophies.timestamp);
    }

    /**
     * The echelon level of the player
     * @returns {PlayerEchelon}
     */
    get echelon(){
        if (!this._PlayerEchelon || this._PlayerEchelon.number !== this.player._data.trophies.echelon){
            /** @private */
            this._PlayerEchelon = new PlayerEchelon(this.player);
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
        return this.player._data.trophies.counts[number - 1];
    }

    /**
     * The number of trophies the player has
     * @returns {Array<Number>}
     */
    get trophies(){
        return this.player._data.trophies.counts;
    }
}

class PlayerEchelon {
    constructor(player){
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
        this.number = player._data.trophies.echelon;
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