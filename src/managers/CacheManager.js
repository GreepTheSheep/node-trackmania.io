let cache = {};

class CacheManager {
    constructor() {
        Object.assign(this, cache);
    }

    _add(key, value) {
        cache[key] = value;
        return this.save();
    }

    save(){
        Object.assign(this, cache);
        return this;
    }
}

module.exports = CacheManager;