'use strict';
//requirements
var SetStrict = require('../index.js').SetStrict;
var should = require('chai').should();

describe('SetStrict', function(){

  var exSet;

  beforeEach(function(){
    exSet = new SetStrict();
  });

  it('should be a function', function(){
    SetStrict.should.be.a('function');
  });

  it('should have an add method', function(){
    exSet.add.should.be.a('function');
    var size = exSet.size();
    var obj = {};
    exSet.add('apple');
    exSet.size().should.equal(size+1);
    exSet.has('apple').should.equal(true);
    exSet.contains('apple').should.equal(true);
    exSet.add(obj);
    exSet.add(obj);
    exSet.has(obj).should.equal(true);
    exSet.remove(obj);
    exSet.has(obj).should.equal(false);
  });

  it('should have a remove method', function(){
    exSet.remove.should.be.a('function');
    var value = new Date();
    var obj = {};
    exSet.add(value);
    exSet.add(obj);
    exSet.contains(value).should.equal(true);
    exSet.remove(value);
    exSet.contains(value).should.equal(false);
    exSet.remove({});
    exSet.contains(obj).should.equal(true);
  });

  it('should have a delete method', function(){
    exSet.delete.should.equal(exSet.remove);
  });

  it('should have a size method', function(){
    exSet.size.should.be.a('function');
    exSet.size().should.equal(0);
    var value = new Date();
    var x = {};
    exSet.add(value);
    exSet.add(x);
    exSet.size().should.equal(2);
    exSet.delete(value);
    exSet.size().should.equal(1);
    exSet.clear();
    exSet.size().should.equal(0);
  });

  it('should have a clear method', function(){
    exSet.clear.should.be.a('function');
    exSet.add({});
    var count = exSet.size();
    exSet.size().should.be.above(0);
    exSet.clear();
    exSet.size().should.equal(0);
  });

  it('should have a contains method', function(){
    exSet.contains.should.be.a('function');
    exSet.add(2);
    exSet.contains(2).should.equal(true);
    exSet.contains(1).should.equal(false);
    exSet.contains(3).should.equal(false);
  });

  it('should have a has method', function(){
    exSet.has.should.equal(exSet.contains);
  });

});
