class MatchmakingDivision{
    constructor(client, division){
        /**
         * The client instance
         * @type {Client}
         */
        this.client = client;
        
        /**
         * The division
         * @type {number}
         */
        this.id = division;
    }

    /**
     * The name of the division
     * @type {string}
     */
    get name(){
        throw new Error("Not implemented");
    }

    /**
     * The minimum points to the division
     * @type {number}
     */
    get minPoints(){
        throw new Error("Not implemented");
    }

    /**
     * The maximum points to the division
     * @type {number}
     */
    get maxPoints(){
        throw new Error("Not implemented");
    }

    /**
     * The minimum number of wins to the division
     * @type {number}
     */
    get minWins(){
        throw new Error("Not implemented");
    }

    /**
     * The maximum number of wins to the division
     * @type {number}
     */
    get maxWins(){
        throw new Error("Not implemented");
    }   
}

module.exports = MatchmakingDivision;