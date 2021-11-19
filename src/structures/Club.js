const Player = require('./Player'); // eslint-disable-line no-unused-vars
const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const Campaign = require('./Campaign'); // eslint-disable-line no-unused-vars
const {ClubMemberRole} = require('../util/Constants'); // eslint-disable-line no-unused-vars
const CacheManager = require('../managers/CacheManager');

/**
 * The Club class represents a club in Trackmania.
 */
class Club {
    constructor(client, data) {
        /**
         * The client object of the club
         * @type {Client}
         */
        this.client = client;

        /**
         * The data of the club
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The Club ID
     * @type {number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The Club name
     * @type {string}
     */
    get name() {
        return this._data.name;
    }

    /**
     * The Club tag
     * @type {string}
     */
    get tag() {
        return this._data.tag;
    }

    /**
     * The Club description
     * @type {string}
     */
    get description() {
        return this._data.description;
    }

    /**
     * The Club logo URL
     * @type {string}
     */
    get logo() {
        return this._data.logoUrl;
    }

    /**
     * The Club decal URL
     * @type {string}
     */
    get decal() {
        return this._data.decalUrl;
    }

    /**
     * The Club background URL
     * @type {string}
     */
    get background() {
        return this._data.backgroundUrl;
    }

    /**
     * The club vertical background URL
     * @type {string}
     */
    get vertical() {
        return this._data.verticalUrl;
    }

    /**
     * The club screens URL. Imares are in DDS format, except the sponsor 4x1 that may be in PNG.
     * @type {Object<string, string>}
     */
    get screens() {
        return {
            '2x1': this._data.screen2x1Url,
            '16x9': this._data.screen16x9Url,
            'Sponsor4x1': this._data.decalSponsor4x1Url,
            '8x1': this._data.decal8x1Url,
            '16x1': this._data.decal16x1Url,
        };
    }

    /**
     * The club creation date
     * @type {Date}
     */
    get createdAt() {
        return new Date(this._data.creationTimestamp*1000);
    }

    /**
     * The club popularity level
     * @type {number}
     */
    get popularity() {
        return this._data.popularityLevel;
    }

    /**
     * The club state (public/private)
     * @type {string}
     */
    get state() {
        return this._data.state;
    }

    /**
     * Whether the club is featured 
     * @type {boolean}
     */
    get featured() {
        return this._data.featured;
    }

    /**
     * The club member count
     * @type {number}
     */
    get memberCount() {
        return this._data.membercount;
    }

    /**
     * The club creator player
     * @returns {Promise<Player>}
     * @example
     * Client.clubs.get(54).then(async club => {
     *     const creator = await club.creator;
     *     console.log(creator.name);
     * });
     */
    async creator() {
        return this.client.players.get(this._data.creatorplayer.id);
    }

    /**
     * The club members (Members are sorted by role and club interaction time.)
     * @param {number} [page=0] The page number
     * @param {boolean} [cache=true] Whether to cache the result
     * @returns {Promise<Array<ClubMember>>}
     */
    async fetchMembers(page = 0, cache = true) {

        if (!this._membersCache) {
            /**
             * The cache manager for members
             * @type {CacheManager}
             * @private
             */
            this._membersCache = new CacheManager(this.client, this, ClubMember);
        }

        const club = this.client.options.api.paths.tmio.tabs.club,
            members = this.client.options.api.paths.tmio.tabs.members,
            ReqUtil = require('../util/ReqUtil');
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${club}/${this.id}/${members}/${page}`);

        const array = [];
        for (const member of res.members) {
            array.push(new ClubMember(this, member));
            
            if (cache) {
                this._membersCache.set(member.player.id, member);
            }
        }
        return array;
    }

    /**
     * The club activities
     * @param {number} [page=0] The page number
     * @param {boolean} [cache=true] Whether to cache the result
     * @returns {Promise<Array<ClubActivity>>}
     */
    async fetchActivities(page = 0, cache = true) {
        if (!this._activitiesCache) {
            /**
             * The cache manager for members
             * @type {CacheManager}
             * @private
             */
            this._activitiesCache = new CacheManager(this.client, this, ClubActivity);
        }

        const club = this.client.options.api.paths.tmio.tabs.club,
            activities = this.client.options.api.paths.tmio.tabs.activities,
            ReqUtil = require('../util/ReqUtil');
        const res = await this.client._apiReq(`${new ReqUtil(this.client).tmioAPIURL}/${club}/${this.id}/${activities}/${page}`);

        const array = [];
        for (const activity of res.activities) {
            array.push(new ClubActivity(this, activity));
            
            if (cache) {
                this._activitiesCache.set(activity.id, activity);
            }
        }
        return array;
    }
}

/**
 * Represents a club member (player) in the club
 */
class ClubMember {
    constructor(club, data) {
        /**
         * The club object
         * @type {Club}
         */
        this.club = club;

        /**
         * The data of the club
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The member
     * @returns {Promise<Player>}
     */
    async member() {
        return this.club.client.players.get(this._data.player.id);
    }

    /**
     * The join date on the club
     * @type {Date}
     */
    get joinDate() {
        return new Date(this._data.joinTime*1000);
    }

    /**
     * The member role
     * @type {ClubMemberRole}
     */
    get role() {
        return this._data.role;
    }

    /**
     * Whether the member is a club creator
     * @type {boolean}
     */
    get isCreator() {
        return this.role == 'Creator';
    }

    /**
     * Whether the member is a club admin
     * @type {boolean}
     */
    get isAdmin() {
        return this.role == 'Admin';
    }

    /**
     * Whether the member is a vip
     * @type {boolean}
     */
    get isVip() {
        return this._data.vip;
    }
}

/**
 * Represents a club activity in the club
 */
class ClubActivity {
    constructor(club, data) {
        /**
         * The club object
         * @type {Club}
         */
        this.club = club;

        /**
         * The data of the club
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The activity id
     * @type {number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The activity name
     * @type {string}
     */
    get name() {
        return this._data.name;
    }

    /**
     * The activity type
     * @type {string}
     */
    get type() {
        return this._data.type;
    }

    /**
     * Whether the activity is a public activity
     * @type {boolean}
     */
    get isPublic() {
        return this._data.public;
    }

    /**
     * The activity image URL
     * @type {string}
     */
    get media() {
        return this._data.media;
    }

    /**
     * Whether the activity is password protected
     * @type {boolean}
     */
    get isPasswordProtected() {
        return this._data.password;
    }

    /**
     * The activity external id
     * @type {number}
     */
    get externalId() {
        return this._data.externalid;
    }

    /**
     * If the activity is a campaign, returns the campaign object of the activity
     * @returns {?Promise<Campaign>}
     */
    async campaign() {
        if (this.type === 'campaign') return this.club.client.campaigns.get(this.club.id, this.externalId);
        else return null;
    }

    /**
     * If the activity is a room, returns the room object of the activity
     * @returns {?Promise<Room>}
     */
    async room() {
        if (this.type === 'room') return this.club.client.rooms.get(this.club.id, this.externalId);
        else return null;
    }
}

module.exports = Club;