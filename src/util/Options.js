const defaultOptions = require('./defaultOptions');

class Options {
    /**
     * Creates default options for the client
     * @returns {defaultOptions}
     * @private
     */
    static createDefault(){
        return new defaultOptions();
    }
}

module.exports = Options;