var http = require("http");
var handler = require("./request-handler");
var utils = require("../node_modules/mocha/lib/utils");
var url = require("url");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

