'use strict';

var Set = function(){
  this._storage = {};
};

Set.prototype.add = function(value){
  this._storage[value] = true;
};

Set.prototype.remove = function(value){
  this._storage[value] = false;
};

Set.prototype.contains = function(value){
  return this._storage[value];
};

module.exports = Set;