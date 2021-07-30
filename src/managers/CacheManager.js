let cache = {};

class CacheManager {
    /**
     * Creates a new CacheManager instance.
     * @param {Number} ttl The time to live for the cache in minutes.
     */
    constructor(client) {
        
        this.client = client;

        /** 
         * The time to live for the cache in miliseconds.
         * @private
         */
        this._ttl = this.client.options.cache.ttl * 60 * 1000;

        /**
         * The cache itself.
         * @private
         */
        this.cache = cache;
    }

    /**
     * Gets a value from the cache. Returns undefined if the value is not on the cache or if it is expired.
     * @param {String} key The key of the value to get.
     * @returns {Object} The value from the cache.
     * @private
     */
    _get(key){
        if (key in this.cache) {
            if (Date.now() - this.cache[key]._cachedTimestamp > this._ttl) {
                delete cache[key];
                return undefined;
            } else {
                return this.cache[key];
            }
        } else {
            return undefined;
        }
    }

    /**
     * Sets a value in the cache.
     * @param {String} key The key of the value to set.
     * @param {Object} value The value to set.
     * @returns {Object} The value from the cache.
     * @private
     */
    _add(key, value) {
        cache[key] = value;
        return this._save()[key];
    }

    /**
     * Saves the cache to the class.
     * @returns {Object} The cache.
     * @private
     */
    _save(){
        this.cache = cache;
        return this.cache;
    }
}

module.exports = CacheManager;