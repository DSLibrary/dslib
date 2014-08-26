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
  while(targetNode !== null && !found){
    if(targetNode.value === value){
      found = true;
    } else {
      targetNode = targetNode.next;
    }
  }
  return found;
};

DoublyLinkedList.prototype.removeHead = function(){
  var head = this.head;
  this.head = head.next;
  if(this.head){
    this.head.prev = null;    
  }
  this._size--;
  return head.value;
};
DoublyLinkedList.prototype.removeTail = function(){
  var tail = this.tail;
  this.tail = tail.prev;
  if(this.tail){
    this.tail.next = null;
  }
  this._size--;
  return tail.value;
};
DoublyLinkedList.prototype.remove = function(value){
  var found = false;
  var target = this.head;
  while(!found && target !== null){
    if(target.value === value){
      found = true;
    } else {
      target = target.next;
    }
  }
  if(found){
    var next = target.next;
    var prev = target.prev;
    if(target === this.head){
      this.head = next;
    }
    if(target === this.tail){
      this.tail = prev;
    }
    if(next){
      next.prev = prev;
    }
    if(prev){
      prev.next = next;
    }
    this._size--;
  }
  return found && target.value;
};

module.exports = DoublyLinkedList;