'use strict';

var Tree = function(value){
  this.children = [];
  if(value){
    this.value  = value;
  }
};

Tree.prototype.addChild = function(value){
  var child = new Tree(value);
  this.children.push(child);
};

Tree.prototype.contains = function(value){
  var found = false;
  var subroutine = function(node){
    if(node.value === value){
      found = true;
    } 
    else {
      for(var i = 0; i < node.children.length; i++){
        subroutine(node.children[i]);
      }
    }
  };
  subroutine(this);
  return found;
};

module.exports = Tree;