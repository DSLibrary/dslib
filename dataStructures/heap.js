'use strict';

//going to do array implementation!
var Heap = function(){
  this._storage = [];
};

Heap.prototype._swap = function(startIndex, targetIndex){
  var temp = this._storage[startIndex];
  this._storage[startIndex] = this._storage[targetIndex];
  this._storage[targetIndex] = temp;
};

//Inserts at end of array and percolates up
Heap.prototype.insert = function(value){
  this._storage.push(value);
  var startIndex = this._storage.length - 1;
  var set = false;
  while(!set){
    var parentIndex = Math.floor(startIndex/2);
    if(this._storage[parentIndex] !== undefined && this._storage[startIndex] < this._storage[parentIndex]){
      this._swap(parentIndex,startIndex);
      startIndex = parentIndex;
    } 
    else {
      set = true;
    }
  }
};

Heap.prototype.getMin = function(){
  return this._storage[0];
};


//replaces first item with last, pops off last item, then percolates down
Heap.prototype.deleteMin = function(){
  var removedMin = this._storage[0];
  this._swap(0, this._storage.length - 1);
  this._storage.pop();
  var startIndex = 0;
  var set = false;
  while(!set){
    var leftChild = startIndex * 2;
    var rightChild = startIndex * 2 + 1;
    var direction;
    if(this._storage[startIndex] > this._storage[leftChild] && this._storage[startIndex] > this._storage[rightChild]){
      if(this._storage[rightChild] < this._storage[leftChild]){
        direction = 'right';
      } 
      else {
        direction = 'left';
      }
    }
    else if(this._storage[leftChild] < this._storage[startIndex]){
      direction = 'left';
    } 
    else if (this._storage[rightChild] < this._storage[startIndex]){
      direction = 'right';
    } 
    else {
      direction = 'set';
    }
    if(direction === 'right'){
      this._swap(startIndex, rightChild);
      startIndex = rightChild;
    } else if(direction === 'left'){
      this._swap(startIndex, leftChild);
      startIndex = leftChild;
    } else {
      set = true;
    }
  }
  return removedMin;
};

Heap.prototype.heapSort = function(array){
  var sortedArray = [];
  var heap = new Heap();
  for(var i = 0; i < array.length; i++){
    heap.insert(array[i]);
  }
  for(var j = 0; j < array.length; j++){
    sortedArray.push(heap.deleteMin());
  }
  return sortedArray;
};

module.exports = Heap;