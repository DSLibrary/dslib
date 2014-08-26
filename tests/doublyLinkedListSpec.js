'use strict';

var should = require('chai').should();
var DoublyLinkedList = require('../index.js').DoublyLinkedList;

describe('DoublyLinkedList', function(){
  
  var dLinkedList;

  beforeEach(function(){
    dLinkedList = new DoublyLinkedList();
  });

  it('should be a function', function(){
    (typeof DoublyLinkedList).should.equal('function');
  });

  it('should have an addToTailMethod', function(){
    dLinkedList.addToTail(1);
    dLinkedList.addToTail(2);
    (dLinkedList.head.value).should.equal(1);
    (dLinkedList.tail.value).should.equal(2);
  });

  it('should have an addToHead', function(){
    dLinkedList.addToHead(5);
    dLinkedList.addToHead(4);
    (dLinkedList.head.value).should.equal(4);
    (dLinkedList.tail.value).should.equal(5);
  });

  it('should have a contains method', function(){
    dLinkedList.addToHead(5);
    dLinkedList.addToTail(1);
    (dLinkedList.contains(5)).should.equal(true);
    (dLinkedList.contains(1)).should.equal(true);
  });

  it('should have a removeHead method', function(){
    dLinkedList.addToHead(5);
    dLinkedList.addToTail(1);
    (dLinkedList.removeHead()).should.equal(5);
    (dLinkedList.removeHead()).should.equal(1);
  });

  it('should have a removeTail method', function(){
    dLinkedList.addToTail(5);
    dLinkedList.addToTail(1);
    (dLinkedList.removeTail()).should.equal(1);
    (dLinkedList.removeTail()).should.equal(5);
  });

  it('should have a remove method', function(){
    dLinkedList.addToTail(5);
    dLinkedList.addToHead(4);
    (dLinkedList.contains(5)).should.equal(true);
    (dLinkedList.contains(4)).should.equal(true);
    (dLinkedList.remove(5)).should.equal(5);
    (dLinkedList.remove(4)).should.equal(4);
    (dLinkedList.remove(100)).should.equal(false);
    (dLinkedList.contains(4)).should.equal(false);
  });

});