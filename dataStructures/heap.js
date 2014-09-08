'use strict';

//going to do array implementation!
var Heap = function(){
  this._storage = [];
  //the left child is 2*i
  //the right child is located at 2*i + 1
  //parent is located at Math.floor(i/2)
};


//Notes about insert, add at bottom, move up heap, compare to parents, if different switch
Heap.prototype.insert = function(value){
  this._storage.push(value);
  var startIndex = this._storage.length - 1;
  var set = false;
  //going through checking if parent exists, and is in right spot with parent
  //then percolate up
  while(!set){
    var parentIndex = Math.floor(startIndex/2);
    if(this._storage[parentIndex] !== undefined && this._storage[startIndex] < this._storage[parentIndex]){
      this._storage[startIndex] = this._storage[parentIndex];
      this._storage[parentIndex] = value;
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


//removes the first item in the heap and then percolates down
Heap.prototype.deleteMin = function(){
  var removedMin = this._storage[0];
  this._storage[0] = this._storage[(this._storage.length - 1)];
  this._storage.pop();
  var startIndex = 0;
  var set = false;
  while(!set){
    var leftChild = startIndex * 2;
    var rightChild = startIndex * 2 + 1;
    if(this._storage[leftChild] < this._storage[startIndex]){
      var temp = this._storage[leftChild];
      this._storage[leftChild] = this._storage[startIndex];
      this._storage[startIndex] = temp;
      startIndex = leftChild;
    } else if (this._storage[rightChild] < this._storage[startIndex]){
      var temp = this._storage[rightChild];
      this._storage[rightChild] = this._storage[startIndex];
      this._storage[startIndex] = temp;
      startIndex = rightChild;
    } else {
      set = true;
    }
  }
  return removedMin;
}; 

module.exports = Heap;