'use strict';

module.exports = function sole(fn) {
  var items = this.when(fn, function (collection) {
    return collection.filter(fn);
  });

  if (items.isEmpty()) {
    throw new Error('Item not found.');
  }

  if (items.count() > 1) {
    throw new Error('Multiple items found.');
  }

  return items.first();
};