class CacheManager extends Map {
    /**
     * Creates a new CacheManager instance.
     * @param {Client} client The client instance. 
     */
    constructor(client) {
        super();

        this.client = client;

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
        setTimeout(() => {
            this.clear();
        }, this._ttl);
    }
}

module.exports = CacheManager;