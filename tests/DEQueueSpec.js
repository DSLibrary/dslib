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
    (typeof exQueue.addFront).should.equal('function');
    exQueue.addFront(1);
    exQueue.addFront(2);
  });

  it('should have an addRear method', function(){
    (typeof exQueue.addRear).should.equal('function');
    exQueue.addRear(1);
    exQueue.addRear(2);
  });

  it('should have a removeFront method', function(){
    (typeof exQueue.removeFront).should.equal('function');
    exQueue.removeFront(1);
    exQueue.removeFront(2);
  });

  it('should have a removeRear method', function(){
    (typeof exQueue.removeRear).should.equal('function');
    exQueue.removeRear(1);
    exQueue.removeRear(2);
  });

  it('should have an isEmpty method', function(){
    (typeof exQueue.isEmpty).should.equal('function');
    exQueue.isEmpty(1);
    exQueue.isEmpty(2);
  });

  it('should have a functioning size method', function(){
    (typeof exQueue.size).should.equal('function');
    (exQueue.size()).should.equal(1);
  });
});
