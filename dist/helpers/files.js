'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFiles = getFiles;
exports.getFileList = getFileList;
var fs = require('fs');

/**
 * @param {String} dir
 * @param {String[]} files
 *
 * @return {String[]}
 */
function getFiles(dir, files) {
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
}

function getFileList(path) {
    fs.readdir(path, function (err, files) {
        files.forEach(function (file) {
            console.log(file);
        });
    });
}

/**
 * Returns files in the given path
 *
 * @param {String} path
 * @returns {*}
 */
module.exports = {
    getFileList: getFileList,
    getFiles: getFiles
};