'use strict';

var BloomFilter = function(size, numHashes){
  this._hashingFunctions = [];
  this._numHashes = numHashes;
  this._storage = new Array(size);
  this.genHashingFunctions();
};

BloomFilter.prototype.add = function(key){
  for(var i = 0; i < this._hashingFunctions.length; i++){
    var curFunc = this._hashingFunctions[i];
    var hashKey = curFunc(key);
    this._storage[hashKey] = 1;
  }
};

BloomFilter.prototype.test = function(key){
  for(var i = 0; i < this._hashingFunctions.length; i++){
    var curFunc = this._hashingFunctions[i];
    var hashKey = curFunc(key);
    if(!this._storage[hashKey]){
      return false;
    }
  }
  return true;
};

BloomFilter.prototype.genHashingFunctions = function(){
  var storage = this._storage;
  for(var i = 0; i < this._numHashes; i++){
    var hashFunction = function(key){
      var keyString = key.toString();
      var hashKey = 0;
      for(var j = 0; j < keyString.length; j++){
        hashKey += keyString.charCodeAt(j) + 5 * i;
      }
      hashKey = hashKey % storage.length;
      return hashKey; 
    };
    this._hashingFunctions.push(hashFunction);
  }
};

module.exports = BloomFilter;