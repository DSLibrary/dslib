'use strict';
var DoublyLinkedList = function(){
  this.head = null;
  this.tail = null;
  this._size = 0;
};

DoublyLinkedList.prototype._makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;
  node.prev = null;
  return node;
};

DoublyLinkedList.prototype.size = function(){
  return this._size;
};

DoublyLinkedList.prototype.addToTail = function(value){
  var newNode = this._makeNode(value);
  this._size++;
  if(this.head === null){
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this._size++;
};

DoublyLinkedList.prototype.addToHead = function(value){
  var newNode = this._makeNode(value);
  if(this.tail === null){
    this.tail = newNode;
    this.head = newNode;
  } 
  else{
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }
  this._size++;
};

DoublyLinkedList.prototype.contains = function(value){
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

module.exports = DoublyLinkedList;