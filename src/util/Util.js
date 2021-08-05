class Util {
    /**
     * Sets default properties on an object that aren't already specified.
     * @param {Object} def Default properties
     * @param {Object} given Object to assign defaults to
     * @returns {Object}
     * @private
   */
    static mergeDefault(def, given) {
        if (!given) return def;
        for (const key in def) {
            if (!Object.prototype.hasOwnProperty.call(given, key) || given[key] === undefined) {
                given[key] = def[key];
            } else if (given[key] === Object(given[key])) {
                given[key] = Util.mergeDefault(def[key], given[key]);
            }
        }
        return given;
    }

    /**
     * Format the string and remove the TM style code on it.
     * @param {String} str String to format
     * @returns {String}
     */
    static formatTMText(str) {
        return str.replace(/\$[nmwoszi]|\$[hl]\[[a-zA-Z0-9/?#!&.\\\-_=@$'()+,;:]*\]|\$[0-f]{3}/gi, '');
    }
}

module.exports = Util;