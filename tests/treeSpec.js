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

  it('should create a Tree with value "null" when called without an argument', function(){
    var nullTree = new Tree();
    should.equal(nullTree.value, null);
  });

  it('should have children', function(){
    (Array.isArray(exTree.children)).should.equal(true);
  });


  it('should have an addChild method', function(){
    (typeof exTree.addChild).should.equal('function');
    exTree.addChild(1);
    (exTree.children[0].value).should.equal(1);
    exTree.addChild({prop: 'test'});
    (exTree.children[1].value.prop).should.equal('test');
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
    exTree.removeChild(5);
    (exTree.contains(5)).should.equal(false);
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

  it('should have a traverse method', function(){
    (typeof exTree.traverse).should.equal('function');
    exTree.addChild(1);
    exTree.addChild(2);
    exTree.traverse(function(value){
      return value*2;
    });
    (exTree.contains(1)).should.equal(false);
    (exTree.contains(4)).should.equal(true);
    var testArray = [];
    exTree.traverse(function(value){
      testArray.push(value*2);
    });
    (testArray.length).should.equal(3);
    (exTree.contains(2)).should.equal(true);
    (exTree.contains(5)).should.equal(false);
  });

});
