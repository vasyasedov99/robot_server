const http = require('http');
const url=require('url');

class ContentManager {

}

class HTTPServer {
    hostname = "";
    port = 0;
    /**
    * @type {http.Server}
    **/
    server = undefined; 
    _isrunning = false;
    handler = () => {return {text: "empty", code: 200}};

    constructor(hostname="", port=0) {
        this.hostname = hostname;
        this.port = port;
    }

    run() {
        if (this.isRunning()) {
            return "enabled";
        }
        try {
            this.server = http.createServer((req, res) => {
                let urlObj = new URL("http://root" + req.url);

                res.setHeader('Content-Type', 'text/plain');

                let params = {};
                let keys = urlObj.searchParams.keys();
                let n = keys.next();
                while (!n.done) {
                    params[n.value] = urlObj.searchParams.get(n.value);
                    n = keys.next();
                }

                let answer = this.handler(urlObj.pathname.split("/").filter(function(s){if (s == "") return false; return true}), urlObj.searchParams, params);
                res.statusCode = answer.code == undefined ? 200 : answer.code;
                res.end(answer.text);
            });
            this.server.listen(this.port, this.hostname, () => {
                this._isrunning = true;
            });
        }
        catch(e) {
            return e;
        }
        console.log(`Server running at http://${this.hostname}:${this.port}/`)
        return "ok";
    }

    stop() {
        if (!this.isRunning()) {
            return "disabled";
        }
        this.server.close();
        this._isrunning = false;
    }

    isRunning() {
        return this._isrunning;
    }
}

exports.Server = HTTPServer;