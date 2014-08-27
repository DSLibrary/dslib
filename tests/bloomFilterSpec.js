'use strict';
var should = require('chai').should();
var BloomFilter = require('../index.js').BloomFilter;

describe('BloomFilter', function(){
  it('should be a function', function(){
    (typeof BloomFilter).should.equal('function');
  });
});