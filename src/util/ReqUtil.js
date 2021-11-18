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

    get tmioURL(){
        const tmio = this.client.options.api.paths.tmio;
        return `${tmio.protocol}://${tmio.host}`;
    }

    get tmxAPIURL(){
        const tmx = this.client.options.api.paths.tmx;
        return `${tmx.protocol}://${tmx.host}/${tmx.api}`;
    }

    get votingAPIURL(){
        const mapVoting = this.client.options.api.paths.mapVoting;
        return `${mapVoting.protocol}://${mapVoting.host}`;
    }
}

module.exports = ReqUtil;