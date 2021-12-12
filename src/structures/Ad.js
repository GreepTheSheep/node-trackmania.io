const Client = require('../client/Client'); // eslint-disable-line no-unused-vars
const {AdType} = require('../util/Constants'); // eslint-disable-line no-unused-vars

/**
 * The Maniapub
 */
class Ad {
    constructor(client, data){
        /**
         * The client instance.
         * @type {Client}
         */
        this.client = client;

        /**
         * The data
         * @type {Object}
         * @private
         */
        this._data = data;
    }

    /**
     * The Ad UID
     * @type {string}
     */
    get uid(){
        return this._data.uid;
    }

    /**
     * The name of the Ad
     * @type {string}
     */
    get name(){
        return this._data.name;
    }

    /**
     * The type of the Ad
     * @type {AdType}
     */
    get type(){
        return this._data.type;
    }

    /**
     * The URL linked with this ad
     * @type {string}
     */
    get url(){
        return this._data.url;
    }

    /**
     * The 2x3 image URL of this ad (shown on the vertical screen)
     * @type {string}
     */
    get verticalImage(){
        return this._data.img2x3;
    }

    /**
     * The 16x9 image URL of this ad (shown on the big screen)
     * @type {string}
     */
    get image(){
        return this._data.img16x9;
    }

    /**
     * The 64x10 image URL of this ad (shown on Start, CPs and Finish)
     * @type {string}
     */
    get cpImage(){
        return this._data.img64x10;
    }

    /**
     * The media of this ad (mostly the vertical image)
     * @type {string}
     */
    get media(){
        return this._data.media;
    }

    /**
     * The display format of this screen (2x3 vertical image by default)
     * @type {string}
     */
    get displayFormat(){
        return this._data.displayformat;
    }
}

module.exports = Ad;