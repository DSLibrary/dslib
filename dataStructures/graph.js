'use strict';

var Graph = function(){
  this._vertices = {};
  this._edges = {};
  this._size = 0;
};

Graph.prototype.contains = function(value){
  return !!this._vertices[value];
};

Graph.prototype.addNode = function(value, targetEdge){
  var target;
  if(!this._vertices[value]){
    if(this._size === 1){
      for(var key in this._vertices){
        target = key;
      }
    }
    this._vertices[value] = true;
    this._edges[value] = {};
    if(target !== undefined){
      this.addEdge(target, value);
    }
    this._size++;
    if(targetEdge !== undefined){
      this.addEdge(value, targetEdge);
    }
  }
};

Graph.prototype.removeNode = function(value){
  if(this._vertices[value]){
    this._size--; 
  }   
  this._vertices[value] = false;
  this._edges[value] = false;
  for(var key in this._edges){
    this._edges[key][value] = false;
  }
};

Graph.prototype.addEdge = function(node1, node2){
  this._edges[node1][node2] = true;
  this._edges[node2][node1] = true;
};

Graph.prototype.getEdge = function(node1, node2){
  if(this.contains(node1) && this.contains(node2)){
    return this._edges[node1][node2] && this._edges[node2][node1];
  } 
  else {
    return false;
  }
};

Graph.prototype.removeEdge = function(node1, node2){
  this._edges[node1][node2] = false;
  this._edges[node2][node1] = false;
  var count1 = 0;
  var count2 = 0;
  for(var edge in this._edges[node1]){
    if(this._edges[node1][edge]){
      count1++;
    }
  }
  for(var edge in this._edges[node2]){
    if(this._edges[node2][edge]){
      count2++;
    }
  }
  if(count1 === 0){
    this.removeNode(node1);
  }
  if(count2 === 0){
    this.removeNode(node2);
  }

};

Graph.prototype.forEachNode = function(callback){
  var newVertices = {};
  var newEdges = {};
  for(var value in this._vertices){
    var newValue = callback(value) || value;
    newVertices[newValue] = true;
    newEdges[newValue] = {};
    for(var edge in this._edges[value]){
      var newEdge = callback(edge) || edge;
      newEdges[newValue][newEdge] = true;
    }
  }
  this._vertices = newVertices;
  this._edges = newEdges;
};

module.exports = Graph;