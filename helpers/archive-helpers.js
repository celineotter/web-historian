var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.readListOfUrls = function(targetUrl){
  console.log('&&&&& readListOfUrls(', targetUrl, ')');
  fs.readFile(paths.list, 'utf-8', function(err, list){
    if( err ) {
      throw err;
    }else{
      console.log('***** isUrlInList: ', exports.isUrlInList(list, targetUrl));/* ){
        if( exports.isURLArchived(targetUrl) ){
          return cacheFile; //????
        }
      }*/
    }
  });




    // initiate searching of our archives - read list of URLs for match

  // if isUrlInList(Target = URL, List = path.archivedSites)
    // if isURLArchived()
      // serve target to client
    // else
      // serve loading.html to client
  // else
    // addUrlToList(target)
    // serve loading.html
    // serveTargetFile('/loading.html', 201);


  //cron -- maybe needs its own functions

};

exports.isUrlInList = function(list, targetUrl){
  console.log('***** list: ', list, list.length, typeof(list));
  if (list.indexOf(targetUrl) !== -1) {
    return true;
  } else {
    return false;
  }
  // server
  // iterator
  // does any item match target ? T : F
  //
};

exports.addUrlToList = function(){
  // server only
};

exports.deleteURLFromList = function(){
  // cron only, after archive (scrape) end
};

exports.isURLArchived = function(){
  // server only
};

exports.downloadUrls = function(){
  // cron only
};
