'use strict';

var Queue = function(){
  this._storage = [];
  this._size = 0;
};

Queue.prototype.enqueue = function(value){
  this._size++;
  this._storage.push(value);
};

Queue.prototype.dequeue = function(){
  this._size--;
  return this._storage.shift();
};

Queue.prototype.size = function(){
  return this._size;
};

module.exports = Queue;