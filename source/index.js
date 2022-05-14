
const http = require("./Server/HTTPServer.js");
const tcps = require("./Server/TCPServer");
const tcpc = require("./Server/TCPClient");

const serversettings = require("../settings/server.json");


const httpserver = new http.Server(serversettings.http.hostname, serversettings.http.port);
const tcpserver = new tcps.Server(serversettings.tcp.port);
const tcpclient = new tcpc.Client();

/**
 * 
 * @param {String[]} path 
 * @param {{get: function(key), keys: function, values: function, has: function(key)}} args 
 * @param {object} args_object
 * @returns 
 */
httpserver.handler = function(path, args, args_object) {

    if (path.length > 0) {
        let command = path[0];

        if (command == "artyom") {
            return {
                code: 200, 
                text: "delayet server"
            }
        }
        if (command == "get_data") {
            return {
                code: 200, 
                text: JSON.stringify([{name: "noski", count: 30}, {name: "9 kafedra", count: 1}])
            }
        }
    }

    return {
        code: 200,
        text: JSON.stringify({path: path, args: args_object})
    }
}

console.log(httpserver.run());