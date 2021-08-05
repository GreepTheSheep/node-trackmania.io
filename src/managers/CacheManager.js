class CacheManager extends Map {
    /**
     * Creates a new CacheManager instance.
     * @param {Client} client The client instance. 
     * @param {*} from The class that instants this manager.
     */
    constructor(client, from) {
        super();

        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The class that instantiated this manager.
         * @type {*}
         */
        this.from = from;

        /** 
         * The time to live for the cache in miliseconds.
         * @private
         */
        this._ttl = this.client.options.cache.ttl * 60 * 1000;

        this._reset();
    }

    /**
     * Resets the cache based on the ttl.
     * @private
     */
    _reset() {
        setInterval(() => {
            this.clear();
            this.client.emit('debug', this.constructor.name, 'Cache reset for ' + this.from.name);
        }, this._ttl);
    }
}

module.exports = CacheManager;