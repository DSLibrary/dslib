'use strict'

var Trie = function(val){
  this.value = val;
  this.children = {};
};

Trie.prototype.insert = function(str, val){
  if ( str === '' ){
    this.value = val || null; 
    return;
  }

  if ( !this.children[str[0]] ) this.children[str[0]] = new Trie();
  this.children[str[0]].insert(str.slice(1), val);
};

Trie.prototype.lookup = function(key){
  if (key === '') return this.value;
  return this.children[key[0]] ? this.children[key[0]].lookup(key.slice(1)) :  undefined;
};

Trie.prototype.contains = function(key){
  return this.lookup(key) !== undefined;
};

module.exports = Trie;