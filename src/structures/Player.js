class Player {
    constructor(client, data){
        /**
         * The client object of the player
         * @type {Client}
         */
        this.client = client;

        /** @private */
        this._data = data;

        //Object.assign(this, data);
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
     */
    get lastChange(){
        return new Date(this.player._data.trophies.timestamp);
    }

    /**
     * The echelon level of the player
     * @returns {Number}
     */
    get echelon(){
        return this.player._data.trophies.echelon;
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

class PlayerMatchmaking {
    constructor(player, type){
        /**
         * The player object
         * @type {Player}
         */
        this.player = player;

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
            this._MatchmakingDivision = new MatchmakingDivision(this.player.client, this._data.division.position);
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

module.exports = Player;