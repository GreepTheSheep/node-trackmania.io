/**
 * Sets default properties on an object that aren't already specified.
 * @param {Object} def Default properties
 * @param {Object} given Object to assign defaults to
 * @returns {Object}
 * @private
 */
exports.mergeDefault = (def, given) => {
    if (!given) return def;
    for (const key in def) {
        if (!Object.prototype.hasOwnProperty.call(given, key) || given[key] === undefined) {
            given[key] = def[key];
        } else if (given[key] === Object(given[key])) {
            given[key] = this.mergeDefault(def[key], given[key]);
        }
    }
    return given;
};

/**
 * Create an enum from a list of strings.
 * @param {Array<string>} keys
 * @returns {Object}
 * @private
 */
exports.createEnum = (keys) => {
    const obj = {};
    for (const [index, key] of keys.entries()) {
        if (key === null) continue;
        obj[key] = index;
        obj[index] = key;
    }
    return obj;
};