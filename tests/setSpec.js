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
    exSet.remove(3);
    exSet.remove(1);
  });

  it('should be a function', function(){
    (typeof Set).should.equal('function');
  });

  it('should have an add method', function(){
    (typeof exSet.add).should.equal('function');
  });

  it('should have a remove method', function(){
    (typeof exSet.remove).should.equal('function');
  });

  it('should have a contains method', function(){
    (typeof exSet.contains).should.equal('function');
    (exSet.contains(2)).should.equal(true);
    (exSet.contains(1)).should.equal(false);
    (exSet.contains(3)).should.equal(false);
  });

});
