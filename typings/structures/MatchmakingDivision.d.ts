export = MatchmakingDivision;
declare class MatchmakingDivision {
    constructor(client: any, division: any);
    /**
     * The client instance
     * @type {Client}
     */
    client: any;
    /**
     * The division
     * @type {number}
     */
    id: number;
    /**
     * The name of the division
     * @type {string}
     */
    get name(): string;
    /**
     * The minimum points to the division
     * @type {number}
     */
    get minPoints(): number;
    /**
     * The maximum points to the division
     * @type {number}
     */
    get maxPoints(): number;
    /**
     * The minimum number of wins to the division
     * @type {number}
     */
    get minWins(): number;
    /**
     * The maximum number of wins to the division
     * @type {number}
     */
    get maxWins(): number;
}
