const fetch = require('node-fetch');
const pkg = require('../../package.json');

module.exports = class APIRequest {
    constructor(UA = null, method = 'GET', body = null) {
        var cwd = process.cwd();
        var cwf = require.main.filename;
        cwf = cwf.substring(cwf.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);
        cwd = cwd.substring(cwd.lastIndexOf(require('os').type == 'Windows_NT' ? '\\' : '/')+1);
        if (UA != null || !cwd.includes(pkg.name)) {
            if (UA == null) UA = cwd + ' (' + cwf + ')' ;
            else UA += ' (' + cwf + ')';

            UA += ' - using';
        } else UA = '[TESTING BUILD]';
        this.UA = UA + ' ' + pkg.name + ' ' + pkg.version;
        var headers = new fetch.Headers({
            "Accept"       : "application/json",
            "Content-Type" : "application/json",
            "User-Agent"   : this.UA 
        });
        this.url = null;
        this.options = {
            method,
            headers,
            body
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
};