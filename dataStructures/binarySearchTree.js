'use strict';

var BinarySearchTree = function(value){
  this.value = value;
  this.left = null;
  this.right = null;
  this.count = 1;
  this.height = 0;
};

BinarySearchTree.prototype.insert = function(value){
  var currentHeight = 0;
  var placeValue = function(node){
    currentHeight++;
    if(value > node.value){
      !node.right ? node.right = new BinarySearchTree(value) : placeValue(node.right);
    }
    else if(value < node.value){
      !node.left ? node.left = new BinarySearchTree(value) : placeValue(node.left);
    }
  };
  placeValue(this);
  this.count++;
  if(currentHeight > this.height){this.height = currentHeight;}
  if(this.count > 1 && this.count/this.height < 2){this.rebalance();}
};

BinarySearchTree.prototype.contains = function(value){
  if(this.value === value){ return true; }
  else if(this.value < value && this.right !== null){ return this.right.contains(value); }
  else if (this.value > value && this.left !== null){ return this.left.contains(value); }
  else { return false;}
}

BinarySearchTree.prototype.depthFirstLog = function(callback){
  var each = function(node){
    callback(node);
    if(node.left !== null){each(node.left);}
    if(node.right !== null){each(node.right);}
  };
  each(this);
};

BinarySearchTree.prototype.breadthFirstLog = function(callback){
  var prev = [this];
  var mappedArray = [this];
  var row = [];
  while (prev.length) {
    for (var i = 0; i < prev.length; i++) {
      row = row
        .concat(prev[i].left || [])
        .concat(prev[i].right || []);
    }
    mappedArray = mappedArray.concat(row);
    prev = row;
    row = [];
  }
  for(var j = 0; j < mappedArray.length; j++){
    callback(mappedArray[j]);
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
  this.count = 1;
  this.height = 0;
  var balance = function(nodelist, tree) {
    var leftBranch = nodelist.slice(0, findMiddlePosition(nodelist));
    var rightBranch = nodelist.slice(findMiddlePosition(nodelist) + 1);
    if (leftBranch.length > 0) {tree.insert(leftBranch[findMiddlePosition(leftBranch)]);}
    if (rightBranch.length > 0) {tree.insert(rightBranch[findMiddlePosition(rightBranch)]);}
    if (leftBranch.length > 0) {balance(leftBranch, tree);}
    if (rightBranch.length > 0) {balance(rightBranch, tree);}
  };
  balance(nodes, this);
};
module.exports = BinarySearchTree;
