'use strict';

var fs = require('fs');
/**
 * @param {String} dir
 * @param {String[]} files
 *
 * @return {String[]}
 */
module.exports = function getFiles(dir, files) {
  var results = files || [];
  var $files = Array.from(fs.readdirSync(dir));
  for (var i = 0, l = $files.length; i < l; i++) {
    var name = dir + '/' + $files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, results);
    } else {
      results.push(name);
    }
  }

  return results;
};