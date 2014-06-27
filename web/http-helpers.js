var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(response, file, statusCode, contentType) {
      console.log("&&&&&Inner func: file: ", file);

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.
  var serverResponse;
  statusCode = statusCode || 200;
  // read file on server
  fs.readFile(file, 'utf-8', function(err, file){
    if( !err ){
      // write response
      //switch header content type depending on file type
      headers['Content-Type'] = contentType || 'text/html';
      serverResponse = file;
    }else{
      console.log('()()()()()() DATA: ', file);
      statusCode = 204;
      serverResponse = 'Invalid input. Must be a valid URL.';
    }
    response.writeHead(statusCode, headers);
    response.end(serverResponse);
  });
};

// As you progress, keep thinking about what helper functions you can put here!
