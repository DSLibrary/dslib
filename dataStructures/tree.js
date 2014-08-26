'use strict';

var Tree = function(value){
  this.parent =  null;
  this.children = [];
  if(value){
    this.value  = value;
  }
};

Tree.prototype.addChild = function(value){
  var child;
  if(typeof value === 'number'){
    child = new Tree(value);    
  }
  else if(typeof value === 'object'){
    child = value;
  }
  child.parent = this;
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

module.exports = Tree;