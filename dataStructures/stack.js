'use strict';
var Stack = function(){
  this._storage = [];
  this._size = 0;
};

Stack.prototype.push = function(item){
  this._size++;
  this._storage.push(item);
};

Stack.prototype.pop = function(){
  this._size--;
  return this._storage.pop();
};

Stack.prototype.size = function(){
  return this._size;
};

module.exports = Stack;