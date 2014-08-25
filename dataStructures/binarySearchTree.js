'use strict';

var BinarySearchTree = function(value){
  this.value = value;
  this.left = null;
  this.right = null;
};

BinarySearchTree.prototype.insert = function(value){
  var placeValue = function(node){
    if(value > node.value){
      !node.right ? node.right = new BinarySearchTree(value) : placeValue(node.right);
    }
    else if(value < node.value){
      !node.left ? node.left = new BinarySearchTree(value) : placeValue(node.left);
    }
  };
  placeValue(this);
};

BinarySearchTree.prototype.contains = function(value){
  var found = false;
  var search = function(node){
    if(node.value === value){
      found = true;
    } 
    else if(node.value < value && node.right !== null) {
      search(node.right);
    }
    else if (node.value > value && node.left !== null){
      search(node.left);
    }
  };
  search(this);
  return found;
};


BinarySearchTree.prototype.depthFirstLog = function(callback){
  var map = function(node){
    callback(node);
    if(node.left !== null) map(node.left);
    if(node.right !== null) map(node.right);
  };
  map(this);
};

module.exports = BinarySearchTree;