'use strict';
//requirements
var Stack = require('../index.js').Stack;
var should = require('chai').should();



describe('Stack', function(){
  var exStack = new Stack();

  it('should be a function', function(){
    (typeof(Stack)).should.equal('function');
  });

  it('should have a size method', function(){
    (typeof(exStack.size)).should.equal('function');
    exStack.size().should.equal(0);
  });

  it('should have a push method', function(){
    (typeof(exStack.push)).should.equal('function');
    exStack.push(1);
    exStack.size().should.equal(1);
  });

  it('should have a pop method', function(){
    (typeof(exStack.pop)).should.equal('function');
    (exStack.pop()).should.equal(1);
    (exStack.size()).should.equal(0);
  });

  it('should have a peek method', function(){
    (typeof(exStack.peek)).should.equal('function');
    exStack.push(25);
    (exStack.size()).should.equal(1);
    (exStack.peek()).should.equal(25);
    (exStack.size()).should.equal(1);
  });

  it('should have an isEmpty method', function(){
    (typeof(exStack.isEmpty)).should.equal('function');
    (exStack.isEmpty()).should.equal(false);
    exStack.pop();
    (exStack.isEmpty()).should.equal(true);
  });

});
