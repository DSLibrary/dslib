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

  it('.insert method', function(){
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

});