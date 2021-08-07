/**
 * Util for API requests
 * @private
 */
class ReqUtil {
    constructor(client){
        this.client = client;
    }

    get tmioAPIURL(){
        const tmio = this.client.options.api.paths.tmio;
        return `${tmio.protocol}://${tmio.host}/${tmio.api}`;
    }
}

module.exports = ReqUtil;