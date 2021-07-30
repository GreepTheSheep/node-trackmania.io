const EventEmitter = require('events');
const APIRequest = require('../rest/APIRequest');
const Util = require('../util/Util');
const Options = require('../util/Options');

class BaseClient extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = Util.mergeDefault(Options.createDefault(), options);
    }

    /**
     * Sets a desctiption for your project.
     * Important if you run a important project. 
     * It will set the User-Agent for requests.
     * @returns {Boolean}
     */
    setDescription(description){
        this.options.api.useragent = description;

        if (this.options.api.useragent == description) return true;
        else return false;
    }

    /**
     * Do an API request
     * @param {String} url The URL to request
     * @param {Function} cb The callback with the result in parameter
     * @private
     */
    apiReq(url, cb){
        var request = new APIRequest(this);

        return request.do(url, cb);
    }

}

module.exports = BaseClient;