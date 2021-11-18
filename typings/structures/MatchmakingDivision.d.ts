export = MatchmakingDivision;
/**
 * Represents a division in the matchmaking system.
 */
declare class MatchmakingDivision {
    constructor(client: any, typeId: any, division: any);
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /**
     * The type of the division
     * @type {number}
     */
    typeId: number;
    /**
     * The division data
     * @type {Object}
     * @private
     */
    private _division;
    /**
     * The division position
     * @type {number}
     */
    get position(): number;
    /**
     * The type name of the division
     * @type {string}
     */
    get typeName(): string;
    /**
     * The name of the division
     * @type {string}
     */
    get name(): string;
    /**
     * The rule identifier of this division
     * @type {string}
     */
    get rule(): string;
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
     * The image of the division. If Royal, the crown
     * @type {string}
     */
    get image(): string;
    /**
     * The Royal Lion image of the division
     * @type {string}
     */
    get lion(): string;
}
import Client = require("../client/Client");
