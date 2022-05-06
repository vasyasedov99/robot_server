
const httpserver = require("./Server/HTTPServer.js");
const serversettings = require("../settings/server.json");

const server = new httpserver.Server(serversettings.hostname, serversettings.port);

console.log(server.run());