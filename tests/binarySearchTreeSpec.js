'use strict';
var should = require('chai').should();
var BinarySearchTree = require('../index.js').BinarySearchTree;

describe('BinarySearchTree', function(){

  var exBST;

  beforeEach(function(){
    exBST = new BinarySearchTree(5);
    exBST.insert(6);
    exBST.insert(4);
    exBST.insert(3);
    exBST.insert(4.5);
    exBST.insert(6.5);
    exBST.insert(5.5);
  });
  
  it('should be a function', function(){
    (typeof BinarySearchTree).should.equal('function');
  });

  it('should have a left property', function(){
    (typeof exBST.left).should.equal('object');
  });

  it('should have a right property', function(){
    (typeof exBST.right).should.equal('object');
  });

  it('should have an insert method', function(){
    (typeof exBST.insert).should.equal('function');
    (exBST.right.value).should.equal(6);
    (exBST.left.value).should.equal(4);
    (exBST.left.left.value).should.equal(3);
  });

  it('should have a contains method', function(){
    (typeof exBST.contains).should.equal('function');
    (exBST.contains(100)).should.equal(false);
    (exBST.contains(4).should.equal(true));
    (exBST.contains(6).should.equal(true));
    (exBST.contains(3)).should.equal(true);
  });

  it('should have a depthFirstLog function', function(){
    (typeof exBST.depthFirstLog).should.equal('function');
    exBST.depthFirstLog(function(node){
      node.value *=2;
    });
    (exBST.contains(100)).should.equal(false);
    (exBST.contains(8).should.equal(true));
    (exBST.contains(12).should.equal(true));
    (exBST.contains(6)).should.equal(true);
  });

  it('should have a breadthFirstLog function', function(){
    var testArray = [];
    (typeof exBST.breadthFirstLog).should.equal('function');
    exBST.breadthFirstLog(function(node){
      testArray.push(node.value);
    });
    (testArray[0]).should.equal(5);
    (testArray[1]).should.equal(4);
    (testArray[2]).should.equal(6);
  });

  it('should have a rebalance method', function(){
    (typeof exBST.rebalance).should.equal('function');
    (exBST.insert(7));
    (exBST.insert(8));
    (exBST.insert(9));
    (exBST.insert(10));
    (exBST.rebalance());
    var testArray = [];
    exBST.breadthFirstLog(function(node){
      testArray.push(node.value);
    });
    (testArray[0]).should.equal(6);
    (testArray[1]).should.equal(4.5);
    (testArray[2]).should.equal(8);
  });

});
