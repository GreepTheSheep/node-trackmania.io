class CacheManager extends Map {
    /**
     * Creates a new CacheManager instance.
     * @param {Number} ttl The time to live for the cache in minutes.
     */
    constructor(client, exports) {
        super();

        this.client = client;
        this.exports = exports;

        /** 
         * The time to live for the cache in miliseconds.
         * @private
         */
        this._ttl = this.client.options.cache.ttl * 60 * 1000;

        this._reset();
    }

    /**
	 * Searches for a single item where the given function returns a truthy value. This behaves like
	 * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * @param {Function} f The function to test for each element.
     * @returns {*} 
     */
    find(f) {
        return Array.from(this.values()).find(f);
    }

    /**
	 * Checks if there exists an item that passes a test. Identical in behavior to
	 * [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
     * @param {Function} f The function to test for each element.
     * @returns {Boolean} 
     */
    some(f) {
        return Array.from(this.values()).some(f);
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