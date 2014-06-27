var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var serveAssets = require('../web/http-helpers.js').serveAssets;

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(response, targetUrl){
  // console.log('&&&&& readListOfUrls(', targetUrl, ')');
  // read list of URLs at sites.txt
  fs.readFile(paths.list, 'utf-8', function(err, list){
    if( err ) {
      throw err;
    }else{
      // if isUrlInList(Target = URL, List = path.archivedSites)
      if( isUrlInList(list, targetUrl) ){
        // console.log('$$$$$$ isUrlInList: ', isUrlInList(list, targetUrl));
        // if isURLArchived()
        if( isUrlArchived(targetUrl) ){
          // serve target to client
          return serveAssets(response, paths.archivedSites.concat('/').concat(targetUrl));
        }else{
          // serve up loading.html
          console.log('***** isUrlInList === true, so serve loading.html')
          return serveAssets(response, paths.siteAssets.concat('/loading.html'));
        }
      }else{
        //add url to sites.txt
        fs.appendFile(paths.list, targetUrl.concat('\n'), 'utf-8', function(err){
          if( err ) throw err;
          console.log('WE SAVED IT!');
          //serve up loading.html
          console.log('***** isUrlInList === false, so serve loading.html')
          return serveAssets(response, paths.siteAssets.concat('/loading.html'));
        });

      }
    }
  });

  //cron -- maybe needs its own functions

};

exports.isUrlInList = isUrlInList = function(list, targetUrl){
  // console.log('***** list: ', list, list.length, typeof(list));
  if (list.indexOf(targetUrl) !== -1) {
    return true;
  } else {
    return false;
  }
};

exports.addUrlToList = addUrlToList = function(){
  // server only
};

exports.deleteUrlFromList = deleteUrlFromList = function(){
  // cron only, after archive (scrape) end
};

exports.isUrlArchived = isUrlArchived = function(targetUrl){
  // server only
  fs.readFile(paths.archivedSites.concat('/'+ targetUrl), 'utf-8', function(err, list){
    if (err){
      console.log('not in archive');
      return false;
    } else {
      return true;
    }
  });
};

exports.downloadUrls = downloadUrls = function(){
  // cron only
};
