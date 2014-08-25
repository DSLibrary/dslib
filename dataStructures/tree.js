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
  if(this.value === value){
    return true;
  } else {
    for(var i = 0; i < this.children.length; i++){
      Tree.prototype.contains.call(this.children[i], value);
    }
  }
};

module.exports = Tree;