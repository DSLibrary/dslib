'use strict';
//requirements
var DEQueue = require('../index.js').DEQueue;
var should = require('chai').should();


var exDEQueue = new DEQueue();

describe('DEQueue', function(){

  it('should be a function', function(){
    (typeof DEQueue).should.equal('function');
  });

  it('should have an addFront method', function(){
    (typeof exDEQueue.addFront).should.equal('function');
    exDEQueue.addFront(1);
    exDEQueue.addFront(2);
  });

  it('should have an addRear method', function(){
    (typeof exDEQueue.addRear).should.equal('function');
    exDEQueue.addRear(1);
    exDEQueue.addRear(2);
  });

  it('should have a removeFront method', function(){
    (typeof exDEQueue.removeFront).should.equal('function');
    exDEQueue.removeFront(1);
    exDEQueue.removeFront(2);
  });

  it('should have a removeRear method', function(){
    (typeof exDEQueue.removeRear).should.equal('function');
    exDEQueue.removeRear(1);
    exDEQueue.removeRear(2);
  });

  it('should have an isEmpty method', function(){
    (typeof exDEQueue.isEmpty).should.equal('function');
    exDEQueue.isEmpty(1);
    exDEQueue.isEmpty(2);
  });

  it('should have a functioning size method', function(){
    (typeof exDEQueue.size).should.equal('function');
    exDEQueue.addFront(1);
    (exDEQueue.size()).should.equal(1);
  });
});
