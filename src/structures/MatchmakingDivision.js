const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const MatchmakingDivisionData = require('../data/MatchmakingDivisions.json');

/**
 * Represents a division in the matchmaking system.
 */
class MatchmakingDivision{
    /**
     * @param {Client} client The client
     * @param {Number} typeId 
     * @param {Object} division 
     */
    constructor(client, typeId, division){
        /**
         * The client instance
         * @type {Client}
         */
        this.client = client;

        /**
         * The type of the division
         * @type {Number}
         */
        this.typeId = typeId;


        /**
         * The division data
         * @type {Object}
         * @private
         */
        this._division = division;
    }

    /**
     * The division position
     * @type {Number}
     */
    get position(){
        return this._division.position;
    }

    /**
     * The type name of the division
     * @type {string}
     */
    get typeName(){
        if (this.typeId === 2) return "3v3";
        else if (this.typeId === 3) return "Royal";
        else return null;
    }

    /**
     * The name of the division
     * @type {String}
     */
    get name(){
        if (this.typeName == null) return null;
        return MatchmakingDivisionData[this.typeName][this.position].name;
    }

    /**
     * The rule identifier of this division
     * @type {String}
     */
    get rule(){
        return this._division.rule;
    }

    /**
     * The minimum points to the division
     * @type {Number}
     */
    get minPoints(){
        if (this.typeName == "Royal") return this._division.minwins;
        else return this._division.minpoints;
    }

    /**
     * The maximum points to the division
     * @type {Number}
     */
    get maxPoints(){
        if (this.typeName == "Royal") return this._division.maxwins;
        else return this._division.maxpoints;
    }

    /**
     * The image of the division. If Royal, the crown
     * @type {String}
     */
    get image(){
        if (this.typeName == null) return null;
        if (this.typeName === "3v3") return MatchmakingDivisionData[this.typeName][this.position].img;
        else if (this.typeName === "Royal") return MatchmakingDivisionData[this.typeName][this.position].img.crown;
        else return null;
    }

    /**
     * The Royal Lion image of the division
     * @type {String}
     */
    get lion(){
        if (this.typeName == null) return null;
        else if (this.typeName === "Royal") return MatchmakingDivisionData[this.typeName][this.position].img.lion;
        else return null;
    }
}

module.exports = MatchmakingDivision;