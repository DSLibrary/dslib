'use strict';
var should = require('chai').should();
var Map = require('../index.js').Map;

describe('Map', function(){

  var exMap, obj, obj2;
  beforeEach(function(){
    exMap = new Map();
    obj = {};
    obj2 = {};
  });

  it('should be a function', function(){
    Map.should.be.a('function');
  });

  it('should have a working add method', function () {
    exMap.size().should.equal(0);
    exMap.add(obj, "abc");
    exMap.size().should.equal(1);
    exMap.hasKey(obj).should.equal(true);
    exMap.hasKey(obj2).should.equal(false);
    exMap.add(obj, "def");
    exMap.size().should.equal(1);
    exMap.get(obj).should.equal("abc");
  });

  it('should have insert as an alias for add', function () {
    exMap.insert.should.equal(exMap.add);
  });

  it('should have a working remove method', function () {
    exMap.add(obj, "abc");
    exMap.add(obj2, "abc");
    exMap.size().should.equal(2);
    exMap.remove(obj);
    exMap.size().should.equal(1);
    exMap.remove(123);
    exMap.size().should.equal(1);
    exMap.remove(obj2);
    exMap.size().should.equal(0);
  });

  it('should have delete as an alias for remove', function () {
    exMap.delete.should.equal(exMap.remove);
  });

  it('should have a working get method', function () {
    var arr = [];
    exMap.add(obj, "abc");
    exMap.add(obj2, arr);
    exMap.get(obj).should.equal("abc");
    exMap.get(obj2).should.equal(arr);
    should.not.exist(exMap.get({}));
  });

  it('should have a working update method', function () {
    var arr = [];
    exMap.update(obj, arr);
    exMap.size().should.equal(0);
    exMap.add(obj, "abc");
    exMap.size().should.equal(1);
    exMap.get(obj).should.equal("abc");
    exMap.update(obj, arr);
    exMap.size().should.equal(1);
    exMap.get(obj).should.equal(arr);
  });

  it('should have a working set method', function () {
    exMap.add(obj, "abc");
    exMap.set(obj, "def");
    exMap.set(obj2, "ghi");
    exMap.get(obj).should.equal("def");
    exMap.get(obj2).should.equal("ghi");
  });

  it('should have a working size method', function () {
    exMap.size().should.equal(0);
    exMap.add(obj, "a");
    exMap.size().should.equal(1);
    exMap.add(obj2, "b");
    exMap.size().should.equal(2);
  });

  it('should have a working hasKey method', function () {
    exMap.add(obj, 1);
    exMap.hasKey(obj).should.equal(true);
    exMap.hasKey(obj2).should.equal(false);
  });
});
