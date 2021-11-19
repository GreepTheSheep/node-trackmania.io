export = Club;
/**
 * The Club class represents a club in Trackmania.
 */
declare class Club {
    constructor(client: any, data: any);
    /**
     * The client object of the club
     * @type {Client}
     */
    client: Client;
    /**
     * The data of the club
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The Club ID
     * @type {number}
     */
    get id(): number;
    /**
     * The Club name
     * @type {string}
     */
    get name(): string;
    /**
     * The Club tag
     * @type {string}
     */
    get tag(): string;
    /**
     * The Club description
     * @type {string}
     */
    get description(): string;
    /**
     * The Club logo URL
     * @type {string}
     */
    get logo(): string;
    /**
     * The Club decal URL
     * @type {string}
     */
    get decal(): string;
    /**
     * The Club background URL
     * @type {string}
     */
    get background(): string;
    /**
     * The club vertical background URL
     * @type {string}
     */
    get vertical(): string;
    /**
     * The club screens URL. Imares are in DDS format, except the sponsor 4x1 that may be in PNG.
     * @type {Object<string, string>}
     */
    get screens(): {
        [x: string]: string;
    };
    /**
     * The club creation date
     * @type {Date}
     */
    get createdAt(): Date;
    /**
     * The club popularity level
     * @type {number}
     */
    get popularity(): number;
    /**
     * The club state (public/private)
     * @type {string}
     */
    get state(): string;
    /**
     * Whether the club is featured
     * @type {boolean}
     */
    get featured(): boolean;
    /**
     * The club member count
     * @type {number}
     */
    get memberCount(): number;
    /**
     * The club creator player
     * @returns {Promise<Player>}
     * @example
     * Client.clubs.get(54).then(async club => {
     *     const creator = await club.creator;
     *     console.log(creator.name);
     * });
     */
    creator(): Promise<Player>;
    /**
     * The club members (Members are sorted by role and club interaction time.)
     * @param {number} [page=0] The page number
     * @param {boolean} [cache=true] Whether to cache the result
     * @returns {Promise<Array<ClubMember>>}
     */
    fetchMembers(page?: number, cache?: boolean): Promise<Array<ClubMember>>;
    /**
     * The cache manager for members
     * @type {CacheManager}
     * @private
     */
    private _membersCache;
    /**
     * The club activities
     * @param {number} [page=0] The page number
     * @param {boolean} [cache=true] Whether to cache the result
     * @returns {Promise<Array<ClubActivity>>}
     */
    fetchActivities(page?: number, cache?: boolean): Promise<Array<ClubActivity>>;
    /**
     * The cache manager for members
     * @type {CacheManager}
     * @private
     */
    private _activitiesCache;
}
import Client = require("../client/Client");
import Player = require("./Player");
/**
 * Represents a club member (player) in the club
 */
declare class ClubMember {
    constructor(club: any, data: any);
    /**
     * The club object
     * @type {Club}
     */
    club: Club;
    /**
     * The data of the club
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The member
     * @returns {Promise<Player>}
     */
    member(): Promise<Player>;
    /**
     * The join date on the club
     * @type {Date}
     */
    get joinDate(): Date;
    /**
     * The member role
     * @type {ClubMemberRole}
     */
    get role(): string;
    /**
     * Whether the member is a club creator
     * @type {boolean}
     */
    get isCreator(): boolean;
    /**
     * Whether the member is a club admin
     * @type {boolean}
     */
    get isAdmin(): boolean;
    /**
     * Whether the member is a vip
     * @type {boolean}
     */
    get isVip(): boolean;
}
/**
 * Represents a club activity in the club
 */
declare class ClubActivity {
    constructor(club: any, data: any);
    /**
     * The club object
     * @type {Club}
     */
    club: Club;
    /**
     * The data of the club
     * @type {Object}
     * @private
     */
    private _data;
    /**
     * The activity id
     * @type {number}
     */
    get id(): number;
    /**
     * The activity name
     * @type {string}
     */
    get name(): string;
    /**
     * The activity type
     * @type {string}
     */
    get type(): string;
    /**
     * Whether the activity is a public activity
     * @type {boolean}
     */
    get isPublic(): boolean;
    /**
     * The activity image URL
     * @type {string}
     */
    get media(): string;
    /**
     * Whether the activity is password protected
     * @type {boolean}
     */
    get isPasswordProtected(): boolean;
    /**
     * The activity external id
     * @type {number}
     */
    get externalId(): number;
    /**
     * If the activity is a campaign, returns the campaign object of the activity
     * @returns {?Promise<Campaign>}
     */
    campaign(): Promise<Campaign> | null;
    /**
     * If the activity is a room, returns the room object of the activity
     * @returns {?Promise<Room>}
     */
    room(): Promise<Room> | null;
}
import Campaign = require("./Campaign");
