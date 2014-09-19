'use strict';

var LinkedList = function(){
  this.head = null;
  this.tail = null;
  this._size = 0;
};

LinkedList.prototype._makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;
  return node;
};

LinkedList.prototype.size = function(){
  return this._size;
};

LinkedList.prototype.addToTail = function(value){
  var newNode = this._makeNode(value);
  if(this.head === null){
    this.head = newNode;
    this.tail = newNode;
    this._size++;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
    this._size++;
  }
};

LinkedList.prototype.removeHead = function(){
  if (this._size !== 0) {
    this._size--;
    var removed = this.head;
    if(this.head === this.tail){
      this.tail = null;
    }
    this.head = this.head.next;
    return removed.value;
  } else {
    // not clear from README what to do when list is empty
    throw new Error("Cannot remove head of empty list");
  }
};

LinkedList.prototype.contains = function(value){
  var targetNode = this.head;
  var found = false;
  while(targetNode && !found){
    if(targetNode.value === value){
      found = true;
    } else {
      targetNode = targetNode.next;
    }
  }
  return found;
};


module.exports = LinkedList;
