'use strict';

var Set = function(){
  this._storage = Object.create(null);
};

Set.fromArray = function(input) {
  var set = new Set();
  input.forEach(set.add.bind(set));
  return set;
};

Set.prototype.add = function(value){
  this._storage[JSON.stringify(value)] = true;
};

Set.prototype.remove = Set.prototype.delete = function(value){
  delete this._storage[JSON.stringify(value)];
};

Set.prototype.contains = Set.prototype.has = function(value){
  return this._storage[JSON.stringify(value)] || false;
};

// Clears the set of all values.
Set.prototype.clear = function(){
  this._storage = Object.create(null);
};

// Returns all elements of the set as an array.
Set.prototype.toArray = function() {
  return Object.keys(this._storage).map(JSON.parse);
};

// Returns the count of items in this set.
Set.prototype.size = function(){
  return Object.keys(this._storage).length;
};

Set.prototype.copy = function() {
  return Set.fromArray(this.toArray());
};

Set.prototype.union = function() {
  var union = this.copy();
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(arg) {
    arg.toArray().forEach(function(elem) {
      union.add(elem);
    });
  });
  return union;
};

Set.prototype.difference = function() {
  var difference = this.copy();
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(arg) {
    arg.toArray().forEach(function(elem) {
      difference.remove(elem);
    });
  });
  return difference;
};

Set.prototype.intersection = function() {
  var intersection = this.copy();
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(arg) {
    var newIntersection = new Set();
    arg.toArray().forEach(function(elem) {
      if (intersection.has(elem)) {
        newIntersection.add(elem);
      }
    });
    intersection = newIntersection;
  });
  return intersection;
};

module.exports = Set;
