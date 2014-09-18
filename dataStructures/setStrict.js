'use strict';

var SetStrict = function(){
  this._storage = [];
};

SetStrict.prototype.add = function(value){
  if (this._storage.indexOf(value) === -1) {
    this._storage.push(value);
  }
};

SetStrict.prototype.remove = function(value){
  var idx = this._storage.indexOf(value);
  if (idx !== -1) {
    this._storage.splice(idx, 1);
  }
};

SetStrict.prototype.delete = SetStrict.prototype.remove;

SetStrict.prototype.contains = function(value){
  return this._storage.indexOf(value) !== -1;
};

SetStrict.prototype.has = SetStrict.prototype.contains;

// Clears the Set of all values.
SetStrict.prototype.clear = function(){
  this._storage = [];
};

// Returns the count of items in this set.
SetStrict.prototype.size = function(){
  return this._storage.length;
};

module.exports = SetStrict;
