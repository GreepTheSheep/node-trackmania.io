export = ReqUtil;
/**
 * Util for API requests
 * @private
 */
declare class ReqUtil {
    constructor(client: any);
    client: any;
    get tmioAPIURL(): string;
    get tmioURL(): string;
    get tmxAPIURL(): string;
    get votingAPIURL(): string;
}
