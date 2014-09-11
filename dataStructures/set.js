'use strict';

var Set = function(){
  this._storage = {};
};

Set.prototype.add = function(value){
  this._storage[value] = value;
};

Set.prototype.remove = function(value){
  delete this._storage[value];
};

// Same as remove function.
Set.prototype.delete = function(value){
  this.remove(value);
};

Set.prototype.contains = function(value){
  //return (this._storage[value] === true);
  return (this._storage.hasOwnProperty(value));
};

// Clears the Set of all values.
Set.prototype.clear = function(){
  this._storage = {};
};

// Returns the count of items in this set.
Set.prototype.size = function(){
  return Object.keys(this._storage).length;
}

// Same as contains function.
Set.prototype.has = function(value){
  return this.contains(value);
}

module.exports = Set;
