'use strict';

var Tree = function(value){
  this.parent =  null;
  this.children = [];
  this.value = value || null;
};

Tree.prototype.addChild = function(value){
  var child;

  if(value.constructor === Tree) {
    child = value;
  } else {
    child = new Tree(value);
  }
  child.parent = this;
  this.children.push(child);
};

Tree.prototype.contains = function(value){
  if(this.value === value){
    return true;
  }
  for(var i = 0; i < this.children.length; i++){
    if(this.children[i].contains(value)){
      return true;
    }
  }
  return false;
};

Tree.prototype.removeChild= function(value){
  for(var i = 0; i < this.children.length; i++){
    if(this.children[i].value === value){
      var child = this.children.splice(i,1)[0];
      child.parent = null;
    }
  }
};

Tree.prototype.removeFromParent = function(){
  this.parent.removeChild(this.value);
};

Tree.prototype.traverse = function(callback){
  var subroutine = function(node){
    node.value = callback(node.value) || node.value;
    for(var i = 0; i < node.children.length; i++){
      subroutine(node.children[i]);
    }
  };
  subroutine(this);
};

module.exports = Tree;
