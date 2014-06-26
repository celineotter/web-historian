var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (request, response) {
  var statusCode;
  var serverResponse = {results: 'Resource not found.'};
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/html';
  var targetURL = '';

  if( request.method === 'POST' ){
    statusCode = 201;
    serverResponse = {results: 'You are not allowed to POST.'};
    sendResponse();

  } else if (request.method === 'GET' ){
    statusCode = 200;

    console.log(url.parse(request.url, true, true));
    targetURL = url.parse(request.url, true, true).query.url;
    console.log(targetURL);

    serverResponse = '/index.html';
    sendResponse();
  }

  function sendResponse(){
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(serverResponse));
  }
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 //Seconds.
};
