var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var headers = require('../web/http-helpers').headers;
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
      serveTargetFile('/index.html');

    }else if( path === '/styles.css' ){
      serveTargetFile(path, 200, 'text/css');

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
        sendResponse();
      });
    }else{
      statusCode = 501;
      serverResponse = null;
    }

  //router for POST requests
  } else if ( request.method === 'POST' ){
    parsedURL = url.parse(request.url, true, true);
    var targetURL = parsedURL;
    var dataBody = '';

    request.on('data', function (d){
      dataBody += d;
    });

    request.on('end', function(){
      dataBody = dataBody.slice(4);
      console.log('***** body', dataBody);
      // if query object is not empty
      // if( dataBody.length === 0 ){
      serveTargetFile('/loading.html', 201);
    });

    // }
      // assign query to target URL
      // initiate searching of our archives - read list of URLs for match



    //serverResponse = {results: 'You are not allowed to POST.'};
  }

  function sendResponse(){
    response.writeHead(statusCode, headers);
    response.end(serverResponse);
  }

  function serveTargetFile (file, statusCode, contentType) {
    // read file on server
    fs.readFile(archive.paths.siteAssets.concat(file), 'utf-8', function(err, data){
      if( !err ){
        // write response
        statusCode = statusCode || 200;
        //switch header content type depending on file type
        headers['Content-Type'] = contentType || 'text/html';
        serverResponse = data;
      }else{
        statusCode = 204;
        serverResponse = 'Invalid input. Must be a valid URL.';
      }
      sendResponse();
    });
  }
};
