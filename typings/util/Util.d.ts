export = Util;
declare class Util {
    /**
     * Sets default properties on an object that aren't already specified.
     * @param {Object} def Default properties
     * @param {Object} given Object to assign defaults to
     * @returns {Object}
     * @private
   */
    private static mergeDefault;
    /**
     * Format the string and remove the TM style code on it.
     * @param {String} str String to format
     * @returns {String}
     */
    static formatTMText(str: string): string;
}
