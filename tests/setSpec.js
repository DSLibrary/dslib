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

  it("should have a toArray method", function() {
    (typeof exSet.toArray).should.equal('function');
    var arr = exSet.toArray();
    (arr.length).should.equal(2);
    arr.should.contain(2);
    arr.should.contain("Hello");
  });

  it("should have a fromArray method", function() {
    (typeof Set.fromArray).should.equal('function');
    var set = Set.fromArray(["1", 2, 3]);
    (set.has("1")).should.equal(true);
    (set.has(2)).should.equal(true);
    (set.has(3)).should.equal(true);
  });

  it("should have a copy method", function() {
    (typeof exSet.copy).should.equal('function');
    var newSet = exSet.copy();
    (newSet.has("Hello")).should.equal(true);
    (newSet.has(2)).should.equal(true);
    exSet.add(1);
    (newSet.has(1)).should.equal(false);
  });

  it("should have a union method", function() {
    (typeof exSet.union).should.equal('function');
    var set1 = Set.fromArray([1, 2, 3]);
    var set2 = Set.fromArray([3, 4, 5, 6]);
    var set3 = Set.fromArray([1, 3, 7]);
    var union = set1.union(set2, set3);
    (union.toArray().sort()).should.deep.equal([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should have a difference method", function() {
    (typeof exSet.difference).should.equal('function');
    var set1 = Set.fromArray([0, 1, 2, 3]);
    var set2 = Set.fromArray([3, 4, 5, 6]);
    var set3 = Set.fromArray([1, 3, 7]);
    var difference = set1.difference(set2, set3);
    difference.toArray().sort().should.deep.equal([0, 2]);
  });

  it("should have an intersection method", function() {
    (typeof exSet.intersection).should.equal('function');
    var set1 = Set.fromArray([1, 2, 3, 4]);
    var set2 = Set.fromArray([3, 4, 5, 6]);
    var set3 = Set.fromArray([1, 3, 7, 4]);
    var intersection = set1.intersection(set2, set3);
    intersection.toArray().sort().should.deep.equal([3, 4]);
  });

});
