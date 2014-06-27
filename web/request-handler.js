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
      // console.log(archive.paths.siteAssets.concat(path));
      return serveAssets(response, archive.paths.siteAssets.concat('/index.html'));

    }else if( path === '/styles.css' ){
      // console.log(archive.paths.siteAssets.concat(path));
      return serveAssets(response, archive.paths.siteAssets.concat(path), 200, 'text/css');

    }else if(path.indexOf('.com') !== -1 ){
      if (path.substring(0, 4) === 'www.') { path = path.slice(4); }
      // console.log(archive.paths.archivedSites.concat(path));
      return serveAssets(response, archive.paths.archivedSites.concat(path));

    }else{
      statusCode = 501;
      serverResponse = null;
      response.writeHead(statusCode, headers);
      return response.end(serverResponse);
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

      if( targetUrl.length === 0 ){ return serveAssets(response, archive.paths.siteAssets.concat('/index.html'), 301); }

      console.log('***** targetUrl: ', targetUrl);
      archive.readListOfUrls(response, targetUrl);
    });
  }

};
