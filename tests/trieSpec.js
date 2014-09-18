'use strict';
var should = require('chai').should();
var Trie = require('../index.js').Trie;

describe('Trie', function(){
  var exTrie;

  beforeEach(function(){
    exTrie = new Trie();
  });

  it('should be a function', function(){
    (typeof Trie).should.equal('function');
  });

  describe('when used as an associative data structure', function(){
    beforeEach(function(){
      exTrie.insert('hello', 1);
      exTrie.insert('hey', 2);
      exTrie.insert('helium', 3);
      exTrie.insert('blue', 4);
    });

    it('should contain inserted keys', function(){
      (exTrie.contains('hello')).should.equal(true);
      (exTrie.contains('hey')).should.equal(true);
      (exTrie.contains('helium')).should.equal(true);
      (exTrie.contains('blue')).should.equal(true);
    });

    it('should not contain keys that were not inserted', function(){
      (exTrie.contains('hack reactor')).should.equal(false);
    });

    it('should lookup the correct inserted values', function(){
      (exTrie.lookup('hello').should.equal(1));
      (exTrie.lookup('hey').should.equal(2));
      (exTrie.lookup('helium').should.equal(3));
      (exTrie.lookup('blue').should.equal(4));
    });

    it('should return undefined if key not found', function(){
      (exTrie.lookup('huzzah')===undefined).should.equal(true);
    });
  });

  describe('when only used to store keys', function(){
    beforeEach(function(){
      exTrie.insert('hello');
      exTrie.insert('hey');
      exTrie.insert('helium');
      exTrie.insert('blue');
    });

    it('should contain inserted keys', function(){
      (exTrie.contains('hello')).should.equal(true);
      (exTrie.contains('hey')).should.equal(true);
      (exTrie.contains('helium')).should.equal(true);
      (exTrie.contains('blue')).should.equal(true);
    });

    it('should return null if key exists without a value', function(){
      (exTrie.lookup('hello')===null).should.equal(true);
      (exTrie.lookup('hey')===null).should.equal(true);
      (exTrie.lookup('helium')===null).should.equal(true);
      (exTrie.lookup('blue')===null).should.equal(true);
    });

    it('should return undefined if key not found', function(){
      (exTrie.lookup('huzzah')===undefined).should.equal(true);
    });
  });

  describe('when used to find all strings with a prefix', function(){
    beforeEach(function(){
      exTrie.insert('hello');
      exTrie.insert('hey');
      exTrie.insert('helloooo');
      exTrie.insert('blue');
    });

    it('shoud correctly return all keys that were inserted that contain a prefix', function(){
      var result;
      result = exTrie.stringsFromPrefix('he');
      result.length.should.equal(3);
      result.indexOf('hello').should.not.equal(-1);
      result.indexOf('hey').should.not.equal(-1);
      result.indexOf('helloooo').should.not.equal(-1);

      result = exTrie.stringsFromPrefix('hell');
      result.length.should.equal(2);
      result.indexOf('hello').should.not.equal(-1);
      result.indexOf('helloooo').should.not.equal(-1);

      result = exTrie.stringsFromPrefix('helloo');
      result.length.should.equal(1);
      result.indexOf('helloooo').should.not.equal(-1);

      result = exTrie.stringsFromPrefix('blue');
      result.length.should.equal(1);
      result.indexOf('blue').should.not.equal(-1);
    });

    it('should return an empty array if prefix no keys contain prefix', function(){
      var result = exTrie.stringsFromPrefix('abc');
      Array.isArray(result).should.equal(true);
      result.length.should.equal(0);
    });
  });
});