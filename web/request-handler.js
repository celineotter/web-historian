var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var headers = require('../web/http-helpers').headers;
var url = require('url');
// require more modules/folders here!



exports.handleRequest = function (request, response) {
  var statusCode;
  var serverResponse = {results: 'Resource not found.'};
  // var targetURL = '';

  if (request.method === 'GET' ){

    // store parsed url object in a variable
    var parsedURL = url.parse(request.url, true, true);
    // lookup path(name) in url object
    var path = parsedURL.path;
    console.log('@@@@@@@@@@@@@@@@@@@ path:' + path)

    // if query object is empty
    if( Object.keys(parsedURL.query).length === 0 )
      // if path in url object is / or /index.html (if it's one of our files)
      if( (path === '/') || (path === '/index.html') ){
        // read file on server
        fs.readFile(archive.paths.siteAssets.concat('/index.html'), 'utf-8', function(err, data){  //***
          //if no errors
          if( !err ){
            // write response
            statusCode = 200;
            //switch header content type depending on file type
            headers['Content-Type'] = 'text/html'; // for HTML
            // headers['Content-Length'] = data.length;
            serverResponse = data;
          }else{
            // send error
            console.log('***** error: 204!');
            statusCode = 204;
            serverResponse = 'Invalid input. Must be a valid URL.';
          }
          //  response
          sendResponse();
        });
      }else if( (path === '/styles.css') ){
        //***********************************
        console.log('**** path: ', path);
        fs.readFile(archive.paths.siteAssets.concat('/styles.css'), 'utf-8', function(err, data){  //***
          //if no errors
          if( !err ){
            // write response
            statusCode = 200;
            headers['Content-Type'] = 'text/css'; // for CSS
            // headers['Content-Length'] = data.length;
            serverResponse = data;
          } // if css file fails, don't worry 'bout it
          sendResponse();
        });
        //***********************************
      } else if (path.indexOf('.com') !== -1 ){
        if (path.substring(0, 4) === 'www.') {
          path = path.slice(4);
        }

        fs.readFile(archive.paths.archivedSites.concat(path), 'utf-8', function(err, data){  //***

          if( !err ){
            statusCode = 200;

            headers['Content-Type'] = 'text/html';

            serverResponse = data;
          }else{
            statusCode = 200; // not 204?

            serverResponse = err;
          }
          console.log('***** statusCode: ', statusCode);
          sendResponse();
        });
      }else{
        statusCode = 501;

        serverResponse = null;

        console.log('***** statusCode: ', statusCode);
        sendResponse();
      }
    // else if query object is not empty
      // if it is valid
        // initiate searching of our archives
      // else
        // serve index.html with message "invalid input - must be a website query"

  } else if ( request.method === 'POST' ){ // never intending to receive POST requests, but just in case
    statusCode = 201;




    //serverResponse = {results: 'You are not allowed to POST.'};
    sendResponse();

  }

  function sendResponse(){
    response.writeHead(statusCode, headers);
    response.end(serverResponse);
  }

};
