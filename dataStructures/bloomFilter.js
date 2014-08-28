'use strict';

var BloomFilter = function(space, hashes){
  this._storage = new Array(space);
  this._size = 0;
};

BloomFilter.prototype.add = function(key){
  var h1key = hashingFunction1(key);
  var h2key = hashingFunction2(key);
  this._storage[h1key] = true;
  this._storage[h2key] = true;
  this._size++;
};

BloomFilter.prototype.test = function(key){
  var h1key = hashingFunction1(key);
  var h2key = hashingFunction2(key);
  return !!this._storage[h1key] && !!this._storage[h2key];
};

function hashingFunction1(key){
  return !!key%2 ? 1 : 2;
}

function hashingFunction2(key){
  return key % 3;
}

module.exports = BloomFilter;