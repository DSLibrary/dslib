'use strict';
var should = require('chai').should();
var Heap = require('../index.js').Heap;

describe('Heap', function(){

  var exHeap;
  beforeEach(function(){
    exHeap = new Heap(18,3);
  });

  it('should be a function', function(){
    (typeof Heap).should.equal('function');
  });

  it('should have an insert method', function(){
    (typeof exHeap.insert).should.equal('function');
  });

  it('should have a delete method', function(){
    (typeof exHeap.delete).should.equal('function');
  });

});