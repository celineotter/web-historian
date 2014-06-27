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
        isUrlArchived(response, targetUrl);
      }else{
        //add url to sites.txt
        return addUrlToList(response, targetUrl);
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

exports.addUrlToList = addUrlToList = function(response, targetUrl){
  // server only
  fs.appendFile(paths.list, targetUrl.concat('\n'), 'utf-8', function(err){
    if( err ) throw err;
    //serve up loading.html
    // console.log('***** isUrlInList === false, so serve loading.html');
    return serveAssets(response, paths.siteAssets.concat('/loading.html'));
  });
};

exports.deleteUrlFromList = deleteUrlFromList = function(){
  // cron only, after archive (scrape) end
};

exports.isUrlArchived = isUrlArchived = function(response, targetUrl){
  // server only
  fs.readdir(paths.archivedSites, function(err, list){
    if (err){
      throw err;
    } else {
      for( var i = 0; i < list.length; i++ ){
        console.log(list[i] === targetUrl, list[i], targetUrl);
        if( list[i] === targetUrl ) {
          console.log('***** isUrlArchived === true, so serve ', targetUrl);
          // serve target to client
          return serveAssets(response, paths.archivedSites.concat('/').concat(targetUrl));
        }
      }
      // serve up loading.html
      console.log('***** isUrlArchived === false, so serve loading.html');
      return serveAssets(response, paths.siteAssets.concat('/loading.html'));
    }
  });
};

exports.downloadUrls = downloadUrls = function(){
  // cron only
};
