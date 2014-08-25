'use strict';

var Graph = function(){
  this._vertices = {};
  this._edges = {};
};

Graph.prototype.contains = function(value){
  return !!this._vertices[value];
};

Graph.prototype.addNode = function(value){
  if(!this._vertices[value]){
    this._vertices[value] = true;
    this._edges[value] = {};
  }
};

Graph.prototype.removeNode = function(value){
  this._vertices[value] = false;
  for(var key in this._edges){
    this._edges[key][value] = false;
  }
};

Graph.prototype.addEdge = function(node1, node2){
  this._edges[node1][node2] = true;
  this._edges[node2][node1] = true;
};

Graph.prototype.getEdge = function(node1, node2){
  return this._edges[node1][node2] && this._edges[node2][node1];
};

Graph.prototype.removeEdge = function(node1, node2){
  this._edges[node1][node2] = false;
  this._edges[node2][node1] = false;
};

module.exports = Graph;