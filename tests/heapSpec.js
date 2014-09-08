'use strict';
var should = require('chai').should();
var Heap = require('../index.js').Heap;

describe('Heap', function(){

  var exHeap;
  beforeEach(function(){
    exHeap = new Heap();
  });

  it('should be a function', function(){
    (typeof Heap).should.equal('function');
  });

  it('should have a getMin function', function(){
    (typeof exHeap.getMin).should.equal('function');
  });

  it('should have an insert method', function(){
    (typeof exHeap.insert).should.equal('function');
    exHeap.insert(1);
    (exHeap.getMin()).should.equal(1);
    exHeap.insert(2);
    exHeap.insert(0);
    (exHeap.getMin()).should.equal(0);
    exHeap.insert(-1);
    (exHeap.getMin()).should.equal(-1);
    exHeap.insert(5);
  });

  it('should have a deleteMin method', function(){
    (typeof exHeap.deleteMin).should.equal('function');
    exHeap.insert(1);
    exHeap.insert(0);
    exHeap.insert(15);
    exHeap.insert(-1);
    (exHeap.deleteMin()).should.equal(-1);
    (exHeap.deleteMin()).should.equal(0);
  });

});