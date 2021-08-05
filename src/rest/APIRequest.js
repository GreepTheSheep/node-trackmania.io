const fetch = require('node-fetch');
const pkg = require('../../package.json');

class APIRequest {
    constructor(client) {
        this.client = client;

        // Creating UA string
        let cwd = process.cwd();
        let cwf = require.main.filename;
        cwf = cwf.substring(cwf.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);
        cwd = cwd.substring(cwd.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);
        this.UA = this.client.options.api.useragent;
        if (this.UA != null || !cwd.includes(pkg.name)) {
            if (this.UA == null) this.UA = cwd + ' (' + cwf + ')' ;
            else this.UA += ' (' + cwf + ')';

            this.UA += ' - using';
        } else this.UA = '[TESTING BUILD]';
        this.UA += ' node-' + pkg.name + ' ' + pkg.version;
    }

    do(url, method = 'GET', body = null) {
        // Creating options
        const headers = new fetch.Headers({
            "Accept"       : "application/json",
            "Content-Type" : "application/json",
            "User-Agent"   : this.UA 
        });
        this.options = {
            headers,
            method,
            body            
        };
        this.url = url;
        return fetch(this.url, this.options)
            .then(async response => {
                if (response.status >= 200 && response.status < 300) {
                    return await response.json();
                } else {
                    if (response.status == 500) {
                        const json = await response.json();
                        throw new Error(json.error);
                    } else throw new Error(response.statusText);
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    }
}

module.exports = APIRequest;