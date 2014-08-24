'use strict';
//requirements
var Queue = require('../dataStructures/queue.js');
var should = require('chai').should();


var exQueue = new Queue();

describe('Queue', function(){

  it('should be a function', function(){
    (typeof Queue).should.equal('function');
  });

  it('should have an enqueue method', function(){
    (typeof exQueue.enqueue).should.equal('function');
    exQueue.enqueue(1);
    exQueue.enqueue(2);
  });

  it('should have a dequeue method', function(){
    (typeof exQueue.dequeue).should.equal('function');
    (exQueue.dequeue()).should.equal(1);
  });

  it('should have a functioning size method', function(){
    (typeof exQueue.size).should.equal('function');
    (exQueue.size()).should.equal(1);
  });
});
