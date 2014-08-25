'use strict';

var Tree = require('../dataStructures/tree.js');
var should = require('chai').should();


describe('Tree', function(){

  var exTree = new Tree();

  it('should be a function', function(){
    (typeof Tree).should.equal('function');
  });

  it('should have children', function(){
    (Array.isArray(exTree.children)).should.equal(true);
  });

  it('should have an addChild method', function(){
    (typeof exTree.addChild).should.equal('function');
  });

  it('should have an contains method', function(){
    (typeof exTree.contains).should.equal('function');
  });

});