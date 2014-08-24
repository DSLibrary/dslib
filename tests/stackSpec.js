'use strict';
//requirements
var Stack = require('../dataStructures/stack.js');
var should = require('chai').should();



describe('Stack', function(){
  var exStack = new Stack();

  it('should be a function', function(){
    (typeof(Stack)).should.equal('function');
  });

  it('should have a pop method', function(){
    (typeof(exStack.pop)).should.equal('function');
  });

  it('should have a push method', function(){
    (typeof(exStack.push)).should.equal('function');
  });

  it('should have a push method', function(){
    (typeof(exStack.push)).should.equal('function');
  });

});
