'use strict';
//requirements
var Set = require('../dataStructures/set.js');
var should = require('chai').should();


var exSet = new Set();

describe('Set', function(){

  it('should be a function', function(){
    (typeof Set).should.equal('function');
  });

  it('should have an add method', function(){
    (typeof exSet.add).should.equal('function');
    exSet.add(1);
    exSet.add(2);
    exSet.add(3);
  });

  it('should have a remove method', function(){
    (typeof exSet.remove).should.equal('function');
    exSet.remove(3);
    exSet.remove(1);
  });

  it('should have a contains method', function(){
    (typeof exSet.contains).should.equal('function');
    (exSet.contains(2)).should.equal(true);
    (exSet.contains(1)).should.equal(false);
    (exSet.contains(3)).should.equal(false);
  });

});
