var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (request, response) {
  var statusCode;
  var serverResponse = {results: 'Resource not found.'};
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/html'; // MAY NEED TO CHANGE THIS
  // var targetURL = '';

  if (request.method === 'GET' ){

    // store parsed url object in a variable
    var parsedURL = url.parse(request.url, true, true);
    // lookup path(name) in url object
    var path = parsedURL.path;
    // if query object is empty
    if( Object.keys(parsedURL.query).length === 0 )
      // if path in url object is / or /index.html (if it's one of our files)
      if( path === "/" || path === "/index.html" ){
        console.log('***** reached / or /index.html --- send file: ', archive.paths.siteAssets.concat('/index.html'));
        // read file on server
        fs.readFile(archive.paths.siteAssets.concat('/index.html'), 'utf-8', function(err, data){  //***
          //if no errors
          if( !err ){
            // write response
            statusCode = 200;
            headers['Content-Length'] = data.length;      // Testing
            serverResponse = data;
            console.log('***** statusCode: ', statusCode, '***** headers: ', headers, '***** error', '***** data: ', data);
          }else{
            // send error
            console.log('***** error: 204!');
            statusCode = 204;
            serverResponse = 'Invalid input. Must be a valid URL.'
          }
          //  response
          sendResponse();
        });
      }
    // else if query object is not empty
      // if it is valid
        // initiate searching of our archives
      // else
        // serve index.html with message "invalid input - must be a website query"

  } else if ( request.method === 'POST' ){ // never intending to receive POST requests, but just in case
    statusCode = 201;
    serverResponse = {results: 'You are not allowed to POST.'};
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



