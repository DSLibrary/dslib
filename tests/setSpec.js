'use strict';
//requirements
var Set = require('../index.js').Set;
var should = require('chai').should();



describe('Set', function(){

  var exSet;

  beforeEach(function(){
    exSet = new Set();
    exSet.add(1);
    exSet.add(2);
    exSet.add(3);
    exSet.add('Hello');
    exSet.remove(3);
    exSet.remove(1);
  });

  it('should be a function', function(){
    (typeof Set).should.equal('function');
  });

  it('should have an add method', function(){
    (typeof exSet.add).should.equal('function');
    var size = exSet.size();
    exSet.add('apple');
    exSet.size().should.equal(size+1);
    exSet.has('apple').should.equal(true);
    exSet.contains('apple').should.equal(true);
  });

  it('should have a remove method', function(){
    (typeof exSet.remove).should.equal('function');
    var value = new Date();
    exSet.add(value);
    (exSet.contains(value).should.equal(true));
    exSet.remove(value);
    (exSet.contains(value).should.equal(false));
  });

  it('should have a delete method', function(){
    (typeof exSet.delete).should.equal('function');
    var value = new Date();
    exSet.add(value);
    exSet.contains(value).should.equal(true);
    exSet.delete(value);
    exSet.contains(value).should.equal(false);
  });

  it('should have a size method', function(){
    (typeof exSet.size).should.equal('function');
    (exSet.size().should.equal(2));
    var value = new Date();
    exSet.add(value);
    (exSet.size().should.equal(3));
    exSet.delete(value);
    (exSet.size().should.equal(2));
    exSet.clear();
    (exSet.size().should.equal(0));
  });

  it('should have a clear method', function(){
    (typeof exSet.clear).should.equal('function');
    var count = exSet.size();
    exSet.size().should.be.above(0);
    exSet.clear();
    exSet.size().should.equal(0);
  });

  it('should have a contains method', function(){
    (typeof exSet.contains).should.equal('function');
    (exSet.contains(2)).should.equal(true);
    (exSet.contains(1)).should.equal(false);
    (exSet.contains(3)).should.equal(false);
  });

  it('should have a has method', function(){
    (typeof exSet.contains).should.equal('function');
    (exSet.has(2)).should.equal(true);
    (exSet.has(1)).should.equal(false);
    (exSet.has(3)).should.equal(false);
  });

});
