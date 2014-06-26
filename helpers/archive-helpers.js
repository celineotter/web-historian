var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
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

exports.readListOfUrls = function(){
  // server - archive & to-archive
  // after post request (Target URL must be parsed), route as follows:

  //server
  // if isUrlInList(Target = URL, List = path.archivedSites)
    // if isURLArchived()
      // access target file ocntent & return it in loading html
    // else
      //
      // downloadUrls
  // else addUrlToList(Target)

  //cron -- maybe needs its own functions

};

exports.isUrlInList = function(){
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
