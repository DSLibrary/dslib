'use strict';

var Graph = require('../index.js').Graph;
var should = require('chai').should();

describe('Graph', function(){
  
  it('should be a function', function(){
    (typeof Graph).should.equal('function');
  });

  var exGraph = new Graph();

  it('should have a contains method', function(){
    (typeof exGraph.contains).should.equal('function');
    (exGraph.contains(1)).should.equal(false);
  });

  it('should have an addNode method', function(){
    (typeof exGraph.addNode).should.equal('function');
    exGraph.addNode(1);
    exGraph.addNode(2);
    (exGraph.contains(1)).should.equal(true);
    (exGraph.contains(2)).should.equal(true);
  });

  it('should have a removeNode method', function(){
    (typeof exGraph.removeNode).should.equal('function');
    exGraph.removeNode(2);
    (exGraph.contains(2)).should.equal(false);
  });

  it('should have an addEdge method', function(){
    (typeof exGraph.addEdge).should.equal('function');
    exGraph.addNode(2);
    exGraph.addEdge(2,1);
  });

  it('should have a getEdge method', function(){
    (typeof exGraph.getEdge).should.equal('function');
    (exGraph.getEdge(1,2)).should.equal(true);
  });

  it('should have a removeEdge method', function(){
    (typeof exGraph.removeEdge).should.equal('function');
    exGraph.removeEdge(1,2);
    (exGraph.getEdge(1,2)).should.equal(false);
  });

  it('should have a forEachNode method', function(){
    (typeof exGraph.forEachNode).should.equal('function');
    var mapGraph = new Graph();
    mapGraph.addNode(1);
    mapGraph.addNode(2);
    mapGraph.addEdge(1,2);
    mapGraph.forEachNode(function(value){
      return value * 3;
    });
    (mapGraph.contains(2)).should.equal(false);
    (mapGraph.contains(6)).should.equal(true);
    (mapGraph.contains(3)).should.equal(true);
    (mapGraph.getEdge(1,2)).should.equal(false);
    (mapGraph.getEdge(3,6)).should.equal(true);
  });

  it('should remove nodes without any edges', function(){
    var exGraph = new Graph();
    exGraph.addNode(1);
    exGraph.addNode(2);
    (exGraph.getEdge(2,1)).should.equal(true);
    exGraph.removeEdge(1,2);
    (exGraph.contains(1)).should.equal(false);
    (exGraph.contains(2)).should.equal(false);

  });

  it('should create an edge if only one node before add', function(){
    var exGraph = new Graph();
    exGraph.addNode(1);
    exGraph.addNode(2);
    (exGraph.getEdge(1,2)).should.equal(true);
  });


});