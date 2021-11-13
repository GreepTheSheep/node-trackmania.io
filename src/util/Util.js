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
     * Create an enum from a list of strings.
     * @param {Array<String>} keys
     * @returns {Object}
     */
    static createEnum(keys) {
        const obj = {};
        for (const [index, key] of keys.entries()) {
            if (key === null) continue;
            obj[key] = index;
            obj[index] = key;
        }
        return obj;
    }

    /**
     * Format the string and remove the TM style code on it.
     * @param {String} str String to format
     * @returns {String}
     */
    static formatTMText(str) {
        let res, resStr;

        // Iterate through the string and check if there are $t,

        // First remplace all $T by $t and $Z by $z (for the regex)
        resStr = str.replace(/\$T/g, '$t').replace(/\$Z/g, '$z');
        
        
        // If there is a $t, it will be replaced by the text in uppercase until the $z or the end of the string
        while ((res = resStr.match(/\$t(.)*(\$z)|\$t(.)*$/g)) !== null) {
            for (let i = 0; i < res.length; i++) {
                resStr = resStr.replace(res[i], res[i].toUpperCase());
            }
        }

        // Check if there are two dollar signs in a row, returns one dollar sign
        resStr = resStr.replace(/\$\$/gi, '$');

        // Then remove all TM codes
        return resStr.replace(/\$[<>wnoisgtz]|\$[hl]\[(.)+\]|\$[hl]|\$[0-9a-fA-F]{3}/gi, '');
    }
}

module.exports = Util;