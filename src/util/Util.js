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
        let newStr = str;
        
        // Check if there are two dollar signs in a row, returns one dollar sign
        newStr = newStr.replace(/\$\$/gi, '$');

        // Then remove all TM codes
        newStr = newStr.replace(/\$[nmwoszi]|\$[hl]\[[a-zA-Z0-9/?#!&.\\\-_=@$'()+,;:]*\]|\$[hl]|\$[0-9a-fA-F]{3}/gi, '');

        return newStr;
    }
}

module.exports = Util;