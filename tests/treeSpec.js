'use strict';

var Tree = require('../index.js').Tree;
var should = require('chai').should();


describe('Tree', function(){

  var exTree;

  beforeEach(function(){
    exTree = new Tree(1);
  });

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
    var branch2 = new Tree(2);
    exTree.addChild(branch2);
    exTree.addChild(3);
    branch2.addChild(5);
    (exTree.contains(1)).should.equal(true);
    (exTree.contains(2)).should.equal(true);
    (exTree.contains(3)).should.equal(true);
    (exTree.contains(5)).should.equal(true);
    (exTree.contains(4)).should.equal(false);
  });

  it('should have a parent property', function(){
    var branch2 = new Tree(2);
    exTree.addChild(branch2);
    exTree.addChild(3);
    branch2.addChild(5);
    branch2.parent.value.should.equal(1);
  });

  it('should have a removeChild method', function(){
    exTree.addChild(3);
    exTree.addChild(4);
    exTree.removeChild(3);
    (exTree.contains(3)).should.equal(false);
    (exTree.contains(4)).should.equal(true);
  });

  it('should have a removeFromParent method', function(){
    var branch2 = new Tree(2);
    exTree.addChild(branch2);
    exTree.addChild(3);
    branch2.addChild(5);
    branch2.parent.value.should.equal(1);
    branch2.removeFromParent();
    (!!branch2.parent).should.equal(false);
  });
  
});