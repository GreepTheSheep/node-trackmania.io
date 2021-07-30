const fetch = require('node-fetch');
const pkg = require('../../package.json');

class APIRequest {
    constructor(client) {
        this.client = client;

        // Creating UA string
        var cwd = process.cwd();
        var cwf = require.main.filename;
        cwf = cwf.substring(cwf.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);
        cwd = cwd.substring(cwd.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);
        this.UA = this.client.options.api.useragent;
        if (this.UA != null || !cwd.includes(pkg.name)) {
            if (this.UA == null) this.UA = cwd + ' (' + cwf + ')' ;
            else this.UA += ' (' + cwf + ')';

            this.UA += ' - using';
        } else this.UA = '[TESTING BUILD]';
        this.UA += ' node-' + pkg.name + ' ' + pkg.version;
        
        // Creating options
        var headers = new fetch.Headers({
            "Accept"       : "application/json",
            "Content-Type" : "application/json",
            "User-Agent"   : this.UA 
        });
        this.url = null;
        this.options = {
            method : this.client.options.api.method,
            headers
        };
    }

    do(url, cb) {
        this.url = url;
        fetch(this.url, this.options)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(json => {
                cb(json);
            })
            .catch(error => {
                throw new Error(error);
            });
    }
}

module.exports = APIRequest;