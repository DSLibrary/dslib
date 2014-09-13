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
    if(node.left !== null){map(node.left);}
    if(node.right !== null){map(node.right);}
  };
  map(this);
};

BinarySearchTree.prototype.breadthFirstLog = function(callback){
  var mappedArray = [];
  var map = function(node){
    if(mappedArray.length === 0){
      mappedArray.push(node);
    }
    if(node.left !== null){mappedArray.push(node.left);}
    if(node.right !== null){mappedArray.push(node.right);}
    if(node.left !== null){map(node.left);}
    if(node.right !== null){map(node.right);}
  };
  map(this);
  for(var i = 0; i < mappedArray.length; i++){
    callback(mappedArray[i]);
  }
};

BinarySearchTree.prototype.rebalance = function() {
  var nodes = [];
  this.breadthFirstLog(function(node) {
    nodes.push(node.value);
  });
  nodes.sort(function(a, b) {
    return a - b;
  });
  var findMiddlePosition = function(nodelist) {
    return Math.floor(nodelist.length / 2);
  };
  this.value = nodes[findMiddlePosition(nodes)];
  this.left = null;
  this.right = null;
  var balance = function(nodelist, tree) {
    var leftBranch = nodelist.slice(0, findMiddlePosition(nodelist));
    if (leftBranch.length > 0) {
      tree.insert(leftBranch[findMiddlePosition(leftBranch)]);
      balance(leftBranch, tree);
    }
    var rightBranch = nodelist.slice(findMiddlePosition(nodelist) + 1);
    if (rightBranch.length > 0) {
      tree.insert(rightBranch[findMiddlePosition(rightBranch)]);
      balance(rightBranch, tree);
    }
  };
  balance(nodes, this);
};
module.exports = BinarySearchTree;
