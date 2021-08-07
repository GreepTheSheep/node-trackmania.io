/**
 * Util for API requests
 * @private
 */
class ReqUtil {
    static get tmioAPIURL(){
        const tmio = this.client.options.api.paths.tmio;
        return `${tmio.protocol}://${tmio.host}/${tmio.api}`;
    }

    static get tmxAPIURL(){
        const tmx = this.client.options.api.paths.tmx;
        return `${tmx.protocol}://${tmx.host}/${tmx.api}`;
    }
}

module.exports = ReqUtil;