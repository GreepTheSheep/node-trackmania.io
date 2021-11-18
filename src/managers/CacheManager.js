const Client = require('../client/Client'); // eslint-disable-line no-unused-vars

/**
 * The Cache Manager is responsible for managing the cache.
 * @extends {Map}
 * @private
 */
class CacheManager extends Map {
    constructor(client, from, to) {
        super();

        /**
         * The class that instantiated this manager.
         * @type {*}
         * @readonly
         */
        this.from = from;

        /**
         * The class this manager will operate on.
         * @type {*}
         * @readonly
         */
        this.to = to;
        
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        const ttlOpts = {
            default: this.client.options.cache.ttl * 60 * 1000,
            Leaderboard: this.client.options.cache.leaderboardttl * 60 * 1000,
            Room: this.client.options.cache.roomttl * 60 * 1000
        };

        /** 
         * The time to live for the cache in miliseconds.
         * @type {number}
         * @private
         */
        this._ttl = this.client.options.cache.ttl != 10 ? ttlOpts.default : ttlOpts[this.to.name] || ttlOpts.default;

        this.client.emit('debug', this.constructor.name, 'Cache is set to a TTL of ' + (this._ttl / 60 / 1000) + ' min for the manager "' + this.from.constructor.name + '" to the class "' + this.to.name + '"');
        this._reset();
    }

    /**
     * Resets the cache based on the ttl.
     * @private
     * @type {void}
     */
    _reset() {
        setInterval(() => {
            this.clear();
            this.client.emit('debug', this.constructor.name, 'Cache reset for ' + this.to.name);
        }, this._ttl);
    }
}

module.exports = CacheManager;