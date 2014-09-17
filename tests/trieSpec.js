'use strict';
var should = require('chai').should();
var Trie = require('../index.js').Trie;

describe('Trie', function(){
  var trie;

  beforeEach(function(){
    trie = new Trie();
  });

  it('should be a function', function(){
    (typeof Trie).should.equal('function');
  });

  describe('when used as an associative data structure', function(){
    beforeEach(function(){
      trie.insert('hello', 1);
      trie.insert('hey', 2);
      trie.insert('helium');
      trie.insert('blue');
    });

    it('should contain inserted values', function(){
      (trie.contains('hello')).should.equal(true);
    });
  });
});
