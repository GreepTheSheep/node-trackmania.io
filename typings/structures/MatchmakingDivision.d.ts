export = MatchmakingDivision;
/**
 * Represents a division in the matchmaking system.
 */
declare class MatchmakingDivision {
    /**
     * @param {Client} client The client
     * @param {Number} typeId
     * @param {Object} division
     */
    constructor(client: Client, typeId: number, division: any);
    /**
     * The client instance
     * @type {Client}
     */
    client: Client;
    /**
     * The type of the division
     * @type {Number}
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
     * @type {Number}
     */
    get position(): number;
    /**
     * The type name of the division
     * @type {string}
     */
    get typeName(): string;
    /**
     * The name of the division
     * @type {String}
     */
    get name(): string;
    /**
     * The rule identifier of this division
     * @type {String}
     */
    get rule(): string;
    /**
     * The minimum points to the division
     * @type {Number}
     */
    get minPoints(): number;
    /**
     * The maximum points to the division
     * @type {Number}
     */
    get maxPoints(): number;
    /**
     * The image of the division. If Royal, the crown
     * @type {String}
     */
    get image(): string;
    /**
     * The Royal Lion image of the division
     * @type {String}
     */
    get lion(): string;
}
import Client = require("../client/Client");
