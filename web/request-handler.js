var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var headers = require('../web/http-helpers').headers;
var serveAssets = require('../web/http-helpers').serveAssets;
var url = require('url');
// require more modules/folders here!



exports.handleRequest = function (request, response) {
  var statusCode = 200;
  var serverResponse = {results: 'Resource not found.'};
  var parsedURL;
  var path;

  if (request.method === 'GET' ){

    // store parsed url object in a variable
    parsedURL = url.parse(request.url, true, true);
    // lookup path(name) in url object
    path = parsedURL.path;

    //router for GET requests
    if( (path === '/') || (path === '/index.html') ){
      serveAssets(response, '/index.html');

    }else if( path === '/styles.css' ){
      serveAssets(response, path, 200, 'text/css');

    }else if(path.indexOf('.com') !== -1 ){
      if (path.substring(0, 4) === 'www.') { path = path.slice(4); }

      fs.readFile(archive.paths.archivedSites.concat(path), 'utf-8', function(err, data){  //***

        if( !err ){
          statusCode = 200;
          headers['Content-Type'] = 'text/html';
          serverResponse = data;
        }else{
          statusCode = 200; // not 204?
          serverResponse = err;
        }
        response.writeHead(statusCode, headers);
        response.end(serverResponse);
      });
    }else{
      statusCode = 501;
      serverResponse = null;
      response.writeHead(statusCode, headers);
      response.end(serverResponse);
    }

  //router for POST requests
  } else if ( request.method === 'POST' ){
    parsedURL = url.parse(request.url, true, true);
    var targetUrl = '';

    request.on('data', function (d){
      targetUrl += d;
    });

    request.on('end', function(){
      targetUrl = targetUrl.slice(4);
      console.log('***** targetUrl: ', targetUrl);

      if( targetUrl.length === 0 ){ serveAssets(response, '/index.html', 301); }

      archive.readListOfUrls(targetUrl);
    });
  }

};
