class CacheManager{
    constructor(){
        Object.assign(this, {});
    }

    get(key){
        return this[key];
    }

    set(key, value){
        this[key] = value;
    }
}

module.exports = CacheManager;