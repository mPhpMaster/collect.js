'use strict';

module.exports = function firstOrFail(fn) {
  return this.first(fn, function () {
    throw new Error('Item not found.');
  });
};