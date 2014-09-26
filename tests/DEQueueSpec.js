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
  });

  it('should have an addRear method', function(){
    (typeof exDEQueue.addRear).should.equal('function');
  });

  it('should have a removeFront method', function(){
    (typeof exDEQueue.removeFront).should.equal('function');
  });

  it('should return the front value when removeFront is called', function(){
    exDEQueue.addFront(3);
    exDEQueue.addFront(2);
    exDEQueue.addFront(1);
    (exDEQueue.removeFront()).should.equal(1);
    exDEQueue.removeFront(3);
    exDEQueue.removeFront(2);
    exDEQueue.removeFront(1);
  });

  it('should not remove a value, if the DEQueue is empty', function(){
    var none = exDEQueue.removeFront();
    should.not.exist(none);
  });

  it('should have a removeRear method', function(){
    (typeof exDEQueue.removeRear).should.equal('function');
  });

  it('should return the rear value when removeRear is called', function(){
    exDEQueue.addFront(3);
    exDEQueue.addFront(2);
    exDEQueue.addFront(1);
    (exDEQueue.removeRear()).should.equal(3);
    exDEQueue.removeFront(3);
    exDEQueue.removeFront(2);
    exDEQueue.removeFront(1);
  });

  it('should not remove a value, if the DEQueue is empty', function(){
    var none = exDEQueue.removeRear();
    should.not.exist(none);
  });

  it('should have an isEmpty method', function(){
    (typeof exDEQueue.isEmpty).should.equal('function');
  });

  it('should have a functioning size method', function(){
    (typeof exDEQueue.size).should.equal('function');
    exDEQueue.addFront(1);
    (exDEQueue.size()).should.equal(1);
  });
});
