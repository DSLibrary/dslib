'use strict';

var Tree = require('../dataStructures/tree.js');
var should = require('chai').should();


describe('Tree', function(){

  var exTree = new Tree(1);

  it('should be a function', function(){
    (typeof Tree).should.equal('function');
  });

  it('should have children', function(){
    (Array.isArray(exTree.children)).should.equal(true);
  });


  it('should have an addChild method', function(){
    (typeof exTree.addChild).should.equal('function');
  });
  var branch2 = new Tree(2);
  exTree.addChild(branch2);
  exTree.addChild(3);
  branch2.addChild(5);

  it('should have an contains method', function(){
    (typeof exTree.contains).should.equal('function');
    (exTree.contains(1)).should.equal(true);
    (exTree.contains(2)).should.equal(true);
    (exTree.contains(3)).should.equal(true);
    (exTree.contains(5)).should.equal(true);
    (exTree.contains(4)).should.equal(false);
  });

});