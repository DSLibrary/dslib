'use strict';
//requirements
var LinkedList = require('../index.js').LinkedList;
var should = require('chai').should();


describe('LinkedList', function(){

  var exLinkedList;

  beforeEach(function(){
    exLinkedList = new LinkedList();
  });

  it('should be a function', function(){
    (typeof LinkedList).should.equal('function');
  });

  it('should have a head', function(){
    (typeof exLinkedList.head).should.equal('object');
  });

  it('should have a tail', function(){
    (typeof exLinkedList.tail).should.equal('object');
  });

  it('should have a size method', function(){
    (typeof exLinkedList.size).should.equal('function');
    var size = exLinkedList.size();
    exLinkedList.addToTail(100);
    exLinkedList.addToTail(101);
    exLinkedList.size().should.equal(size+2);

  });

  it('should have an addToTail method', function(){
    exLinkedList.addToTail(1);
    (typeof exLinkedList.addToTail).should.equal('function');
    (exLinkedList.tail.value).should.equal(1);
    (exLinkedList.head.value).should.equal(1);
    exLinkedList.addToTail(2);
    (exLinkedList.tail.value).should.equal(2);
    (exLinkedList.head.value).should.equal(1);
    (exLinkedList.head.next.value).should.equal(2);

  });

  it('should have a removeHead method', function(){
    exLinkedList.addToTail(1);
    exLinkedList.addToTail(2);

    (typeof exLinkedList.removeHead).should.equal('function');
    (exLinkedList.removeHead()).should.equal(1);
    (exLinkedList.head.value).should.equal(2);
    (exLinkedList.removeHead()).should.equal(2);
    (!!exLinkedList.head).should.equal(false);
    (!!exLinkedList.tail).should.equal(false);
  });

  it('should have a contains method', function(){
    (typeof exLinkedList.contains).should.equal('function');
    exLinkedList.addToTail(1);
    (exLinkedList.contains(1)).should.equal(true);
    exLinkedList.addToTail(2);
    (exLinkedList.contains(2)).should.equal(true);
    exLinkedList.removeHead();
    (exLinkedList.contains(1)).should.equal(false);
  });
});
