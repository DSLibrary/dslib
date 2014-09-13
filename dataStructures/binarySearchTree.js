// 'use strict';

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

BinarySearchTree.prototype.balanceTree = function() {
  // create empty array to store all nodes
  var nodes = [];

  // use depthFirstLog to go through tree and retrieve nodes
  this.depthFirstLog(function(node) {
    nodes.push(node.value);
  });

  // sort array 
  nodes.sort(function(a, b) {
    return a - b;
  });

  // helper function to find middle node
  var findMiddleNodePosition = function(nodelist) {
    return Math.floor(nodelist.length / 2);
  };

  // create top of new Tree
  var newTree = new BinarySearchTree(nodes[findMiddleNodePosition(nodes)]);

  var balance = function(nodelist, tree) {
    var leftBranch = nodelist.slice(0, Math.floor(nodelist.length / 2));
    var rightBranch = nodelist.slice(Math.floor(nodelist.length / 2) + 1);
    if (leftBranch.length > 0) {
      var leftMiddleNode = Math.floor(leftBranch.length / 2);
      tree.insert(leftBranch[leftMiddleNode]);
      balance(leftBranch, newTree);
    }
    if (rightBranch.length > 0) {
      var rightMiddleNode = Math.floor(rightBranch.length / 2);
      tree.insert(rightBranch[rightMiddleNode]);
      balance(rightBranch, newTree);
    }
  };
  balance(nodes, newTree);

  // return new tree
  // how to manipulate existing, NOT return new tree?
  return newTree;
};
// module.exports = BinarySearchTree;