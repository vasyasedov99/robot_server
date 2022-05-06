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
    handler = () => {return "empty"};

    constructor(hostname="", port=0) {
        this.hostname = hostname;
        this.port = port;
    }

    run() {
        try {
            this.server = http.createServer((req, res) => {
                let urlObj = new URL("http://root" + req.url);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(this.handler());
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