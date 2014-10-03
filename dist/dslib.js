!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.dslib=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// var fs = require( 'fs' ),
//     components = fs.readdirSync( './dataStructures' ),
//     dslib = {},
//     i;

// // dynamically add all datastructures
// for ( i = 0; i < components.length; i++ ) {
//   var fileName = components[ i ].split( '.' )[0],
//       temp,
//       keys,
//       index;

//   if ( fileName[ 1 ] === '-' ) {
//     // edgecase for n-Tree and similar
//     // may cause problems for red-black tree
//     fileName = fileName[ 0 ] +
//                 fileName[ 2 ].toUpperCase() +
//                 fileName.substring( 3 );
//   } else {
//     fileName = fileName[ 0 ].toUpperCase() +
//                fileName.substring( 1 );
//   }
//   // I don't want to have to do this here,
//   // there should be an agreed upon format for structures
//   temp = require( './dataStructures/' +
//                   components[ i ] );
//   keys = Object.keys( temp );

//   // edgecase for files w/ multiple structures
//   // ( eg. quadTree )
//   if ( keys.length > 1 ){
//     for ( index = 0; index < keys.length; index++ ) {
//       dslib[ keys[ index ] ] = temp[ keys[ index ] ];
//     }
//   } else {
//     dslib[ fileName ] = temp;
//   }
// }

var dslib = {};
var qt = require('./dataStructures/quadTree');

dslib.BinarySearchTree = require('./dataStructures/binarySearchTree');
dslib.BloomFilter = require('./dataStructures/bloomFilter');
dslib.DoublyLinkedList = require('./dataStructures/doublyLinkedList');
dslib.Graph = require('./dataStructures/graph');
dslib.Heap = require('./dataStructures/heap');
dslib.LinkedList = require('./dataStructures/LinkedList');
dslib.Map = require('./dataStructures/map');
dslib.nTree = require('./dataStructures/n-tree');
dslib.QuadTree = qt.QuadTree;
dslib.Box = qt.Box;
dslib.Point = qt.Point;
dslib.Queue = require('./dataStructures/queue');
dslib.Set = require('./dataStructures/set');
dslib.SetStrict = require('./dataStructures/setStrict');
dslib.Tree = require('./dataStructures/tree');
dslib.Trie = require('./dataStructures/trie');


module.exports = dslib;

},{"./dataStructures/LinkedList":2,"./dataStructures/binarySearchTree":3,"./dataStructures/bloomFilter":4,"./dataStructures/doublyLinkedList":5,"./dataStructures/graph":6,"./dataStructures/heap":7,"./dataStructures/map":8,"./dataStructures/n-tree":9,"./dataStructures/quadTree":10,"./dataStructures/queue":11,"./dataStructures/set":12,"./dataStructures/setStrict":13,"./dataStructures/tree":14,"./dataStructures/trie":15}],2:[function(require,module,exports){
'use strict';

var LinkedList = function(){
  this.head = null;
  this.tail = null;
  this._size = 0;
};

LinkedList.prototype._makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;
  return node;
};

LinkedList.prototype.size = function(){
  return this._size;
};

LinkedList.prototype.addToTail = function(value){
  var newNode = this._makeNode(value);
  if(this.head === null){
    this.head = newNode;
    this.tail = newNode;
    this._size++;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
    this._size++;
  }
};

LinkedList.prototype.removeHead = function(){
  this._size--;
  var removed = this.head;
  if(this.head === this.tail){
    this.tail = null;
  }
  this.head = this.head.next;
  return removed.value;
};

LinkedList.prototype.contains = function(value){
  var targetNode = this.head;
  var found = false;
  while(targetNode && !found){
    if(targetNode.value === value){
      found = true;
    } else {
      targetNode = targetNode.next;
    }
  }
  return found;
};


module.exports = LinkedList;

},{}],3:[function(require,module,exports){
'use strict';

var BinarySearchTree = function(value){
  this.value = value;
  this.left = null;
  this.right = null;
  this.count = 1;
  this.height = 0;
};

BinarySearchTree.prototype.insert = function(value){
  var currentHeight = 0;
  var placeValue = function(node){
    currentHeight++;
    if(value > node.value){
      !node.right ? node.right = new BinarySearchTree(value) : placeValue(node.right);
    }
    else if(value < node.value){
      !node.left ? node.left = new BinarySearchTree(value) : placeValue(node.left);
    }
  };
  placeValue(this);
  this.count++;
  if(currentHeight > this.height){this.height = currentHeight;}
  if(this.count > 1 && this.count/this.height < 2){this.rebalance();}
};

BinarySearchTree.prototype.contains = function(value){
  if(this.value === value){ return true; }
  else if(this.value < value && this.right !== null){ return this.right.contains(value); }
  else if (this.value > value && this.left !== null){ return this.left.contains(value); }
  else { return false;}
}

BinarySearchTree.prototype.depthFirstLog = function(callback){
  var each = function(node){
    callback(node);
    if(node.left !== null){each(node.left);}
    if(node.right !== null){each(node.right);}
  };
  each(this);
};

BinarySearchTree.prototype.breadthFirstLog = function(callback){
  var mappedArray = [];
  var map = function(node){
    if(mappedArray.length === 0){
      mappedArray.push(node);
    }
    if(node.left !== null){mappedArray.push(node.left);}
    if(node.right !== null){mappedArray.push(node.right);}
    if(node.left !== null){map(node.left);}
    if(node.right !== null){map(node.right);}
  };
  map(this);
  for(var i = 0; i < mappedArray.length; i++){
    callback(mappedArray[i]);
  }
};

BinarySearchTree.prototype.rebalance = function() {
  var nodes = [];
  this.breadthFirstLog(function(node) {
    nodes.push(node.value);
  });
  nodes.sort(function(a, b) {
    return a - b;
  });
  var findMiddlePosition = function(nodelist) {
    return Math.floor(nodelist.length / 2);
  };
  this.value = nodes[findMiddlePosition(nodes)];
  this.left = null;
  this.right = null;
  this.count = 1;
  this.height = 0;
  var balance = function(nodelist, tree) {
    var leftBranch = nodelist.slice(0, findMiddlePosition(nodelist));
    var rightBranch = nodelist.slice(findMiddlePosition(nodelist) + 1);
    if (leftBranch.length > 0) {tree.insert(leftBranch[findMiddlePosition(leftBranch)]);}
    if (rightBranch.length > 0) {tree.insert(rightBranch[findMiddlePosition(rightBranch)]);}
    if (leftBranch.length > 0) {balance(leftBranch, tree);}
    if (rightBranch.length > 0) {balance(rightBranch, tree);}
  };
  balance(nodes, this);
};
module.exports = BinarySearchTree;

},{}],4:[function(require,module,exports){
'use strict';

var BloomFilter = function(size, numHashes){
  this._hashingFunctions = [];
  this._numHashes = numHashes;
  this._storage = new Array(size);
  this.genHashingFunctions();
};

BloomFilter.prototype.add = function(key){
  for(var i = 0; i < this._hashingFunctions.length; i++){
    var curFunc = this._hashingFunctions[i];
    var hashKey = curFunc(key);
    this._storage[hashKey] = 1;
  }
};

BloomFilter.prototype.test = function(key){
  for(var i = 0; i < this._hashingFunctions.length; i++){
    var curFunc = this._hashingFunctions[i];
    var hashKey = curFunc(key);
    if(!this._storage[hashKey]){
      return false;
    }
  }
  return true;
};

BloomFilter.prototype.genHashingFunctions = function(){
  var storage = this._storage;
  for(var i = 0; i < this._numHashes; i++){
    var hashFunction = function(key){
      var keyString = key.toString();
      var hashKey = 0;
      for(var j = 0; j < keyString.length; j++){
        hashKey += (keyString.charCodeAt(j) + 5 * i)*keyString.charCodeAt(j);
      }
      hashKey = Math.floor(hashKey % storage.length);
      return hashKey; 
    };
    this._hashingFunctions.push(hashFunction);
  }
};

module.exports = BloomFilter;
},{}],5:[function(require,module,exports){
'use strict';
var DoublyLinkedList = function(){
  this.head = null;
  this.tail = null;
  this._size = 0;
};

DoublyLinkedList.prototype._makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;
  node.prev = null;
  return node;
};

DoublyLinkedList.prototype.size = function(){
  return this._size;
};

DoublyLinkedList.prototype.addToTail = function(value){
  var newNode = this._makeNode(value);
  if(this.head === null){
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this._size++;
};

DoublyLinkedList.prototype.addToHead = function(value){
  var newNode = this._makeNode(value);
  if(this.tail === null){
    this.tail = newNode;
    this.head = newNode;
  } 
  else{
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }
  this._size++;
};

DoublyLinkedList.prototype.contains = function(value){
  var targetNode = this.head;
  var found = false;
  while(targetNode !== null && !found){
    if(targetNode.value === value){
      found = true;
    } else {
      targetNode = targetNode.next;
    }
  }
  return found;
};

DoublyLinkedList.prototype.removeHead = function(){
  var head = this.head;
  this.head = head.next;
  if(this.head){
    this.head.prev = null;    
  }
  this._size--;
  return head.value;
};
DoublyLinkedList.prototype.removeTail = function(){
  var tail = this.tail;
  this.tail = tail.prev;
  if(this.tail){
    this.tail.next = null;
  }
  this._size--;
  return tail.value;
};
DoublyLinkedList.prototype.remove = function(value){
  var found = false;
  var target = this.head;
  while(!found && target !== null){
    if(target.value === value){
      found = true;
    } else {
      target = target.next;
    }
  }
  if(found){
    var next = target.next;
    var prev = target.prev;
    if(target === this.head){
      this.head = next;
    }
    if(target === this.tail){
      this.tail = prev;
    }
    if(next){
      next.prev = prev;
    }
    if(prev){
      prev.next = next;
    }
    this._size--;
  }
  return found && target.value;
};

module.exports = DoublyLinkedList;
},{}],6:[function(require,module,exports){
'use strict';

var Graph = function(){
  this._vertices = {};
  this._edges = {};
  this._size = 0;
};

Graph.prototype.contains = function(value){
  return !!this._vertices[value];
};

Graph.prototype.addNode = function(value, targetEdge){
  var target;
  if(!this._vertices[value]){
    if(this._size === 1){
      for(var key in this._vertices){
        target = key;
      }
    }
    this._vertices[value] = true;
    this._edges[value] = {};
    if(target !== undefined){
      this.addEdge(target, value);
    }
    this._size++;
    if(targetEdge !== undefined){
      this.addEdge(value, targetEdge);
    }
  }
};

Graph.prototype.removeNode = function(value){
  if(this._vertices[value]){
    this._size--; 
  }   
  this._vertices[value] = false;
  this._edges[value] = false;
  for(var key in this._edges){
    this._edges[key][value] = false;
  }
};

Graph.prototype.addEdge = function(node1, node2){
  this._edges[node1][node2] = true;
  this._edges[node2][node1] = true;
};

Graph.prototype.getEdge = function(node1, node2){
  if(this.contains(node1) && this.contains(node2)){
    return this._edges[node1][node2] && this._edges[node2][node1];
  } 
  else {
    return false;
  }
};

Graph.prototype.removeEdge = function(node1, node2){
  this._edges[node1][node2] = false;
  this._edges[node2][node1] = false;
  var count1 = 0;
  var count2 = 0;
  for(var edge in this._edges[node1]){
    if(this._edges[node1][edge]){
      count1++;
    }
  }
  for(var edge in this._edges[node2]){
    if(this._edges[node2][edge]){
      count2++;
    }
  }
  if(count1 === 0){
    this.removeNode(node1);
  }
  if(count2 === 0){
    this.removeNode(node2);
  }

};

Graph.prototype.forEachNode = function(callback){
  var newVertices = {};
  var newEdges = {};
  for(var value in this._vertices){
    var newValue = callback(value) || value;
    newVertices[newValue] = true;
    newEdges[newValue] = {};
    for(var edge in this._edges[value]){
      var newEdge = callback(edge) || edge;
      newEdges[newValue][newEdge] = true;
    }
  }
  this._vertices = newVertices;
  this._edges = newEdges;
};

module.exports = Graph;
},{}],7:[function(require,module,exports){
'use strict';

//going to do array implementation!
var Heap = function(){
  this._storage = [];
};

Heap.prototype._swap = function(startIndex, targetIndex){
  var temp = this._storage[startIndex];
  this._storage[startIndex] = this._storage[targetIndex];
  this._storage[targetIndex] = temp;
};

//Inserts at end of array and percolates up
Heap.prototype.insert = function(value){
  this._storage.push(value);
  var startIndex = this._storage.length - 1;
  var set = false;
  while(!set){
    var parentIndex = Math.floor(startIndex/2);
    if(this._storage[parentIndex] !== undefined && this._storage[startIndex] < this._storage[parentIndex]){
      this._swap(parentIndex,startIndex);
      startIndex = parentIndex;
    } 
    else {
      set = true;
    }
  }
};

Heap.prototype.getMin = function(){
  return this._storage[0];
};


//replaces first item with last, pops off last item, then percolates down
Heap.prototype.deleteMin = function(){
  var removedMin = this._storage[0];
  this._swap(0, this._storage.length - 1);
  this._storage.pop();
  var startIndex = 0;
  var set = false;
  while(!set){
    var leftChild = startIndex * 2;
    var rightChild = startIndex * 2 + 1;
    var direction;
    if(this._storage[startIndex] > this._storage[leftChild] && this._storage[startIndex] > this._storage[rightChild]){
      if(this._storage[rightChild] < this._storage[leftChild]){
        direction = 'right';
      } 
      else {
        direction = 'left';
      }
    }
    else if(this._storage[leftChild] < this._storage[startIndex]){
      direction = 'left';
    } 
    else if (this._storage[rightChild] < this._storage[startIndex]){
      direction = 'right';
    } 
    else {
      direction = 'set';
    }
    if(direction === 'right'){
      this._swap(startIndex, rightChild);
      startIndex = rightChild;
    } else if(direction === 'left'){
      this._swap(startIndex, leftChild);
      startIndex = leftChild;
    } else {
      set = true;
    }
  }
  return removedMin;
};

Heap.prototype.heapSort = function(array){
  var sortedArray = [];
  var heap = new Heap();
  for(var i = 0; i < array.length; i++){
    heap.insert(array[i]);
  }
  for(var j = 0; j < array.length; j++){
    sortedArray.push(heap.deleteMin());
  }
  return sortedArray;
};

module.exports = Heap;
},{}],8:[function(require,module,exports){
'use strict';

var Map = function(){
  this._keys = [];
  this._values = [];
  this._counter = 0;
};

Map.prototype.add = function (key, value) {
  if (this._keys.indexOf(key) === -1) {
    this._keys[this._counter] = key;
    this._values[this._counter] = value;
    this._counter++;
  }
};
Map.prototype.insert = Map.prototype.add;

Map.prototype.remove = function (key) {
  var idx = this._keys.indexOf(key);
  if (idx > -1) {
    delete this._keys[idx];
  }
};
Map.prototype.delete = Map.prototype.remove;

Map.prototype.get = function (key) {
  var idx = this._keys.indexOf(key);
  if (idx > -1) {
    return this._values[idx];
  }
  return undefined;
};

Map.prototype.update = function (key, value) {
  var idx = this._keys.indexOf(key);
  if (idx !== -1) {
    this._values[idx] = value;
  }
};

// not delegating to add/update to avoid additional indexOf
Map.prototype.set = function (key, value) {
  var idx = this._keys.indexOf(key);
  if (idx === -1) {
    this._keys[this._counter] = key;
    this._values[this._counter] = value;
    this._counter++;
  } else {
    this._values[idx] = value;
  }
};

Map.prototype.size = function () {
  return Object.keys(this._keys).length;
};

Map.prototype.hasKey = function (key) {
  return this._keys.indexOf(key) !== -1;
};

module.exports = Map;

},{}],9:[function(require,module,exports){
//declare fomr helper functions for matrix operations
var divide = function(array, divisor){
  return array.map(function(element){
    return element / divisor;
  });
};

var subtract = function(subtractor, subtractee){
  var result = new Array(subtractor.length);
  for(var i=0; i<subtractor.length; i++){
    result[i] = subtractor[i] - subtractee[i];
  }
  return result;
};

var add = function(array1, array2){
  var result = new Array(array1.length);
  for(var i=0; i<array1.length; i++){
    result[i] = array1[i] + array2[i];
  }
  return result;
};

var getCentre = function(maxima, minima){
  return add(minima, divide(subtract(maxima, minima), 2));
};

/*Tree class. Has neither values nor control over its coordinates*/
var Tree = function(maxima, minima, parent, centre){
  this.parent = parent;
  this.maxima = maxima;
  this.minima = minima;
  this.centre = centre || getCentre(maxima, minima);
  this.children = new Array(1 << maxima.length);
};

/*Leaf class. Has value, assigned to specified coordinates*/
var Leaf = function(parent, relativePosition){
  this.parent = parent;
  this.values = [];
  this.getCentreAndRegion(relativePosition);
};

Tree.prototype.getRelativeVector = function(coords){
  var result = 0;
  for(var i=0, bit=1; i<coords.length; i++){
    result = coords[i] >= this.centre[i] ? result | bit : result;
    bit = bit << 1;
  }
  return result;
};

Tree.prototype.insert = function(coords, value) {
  //find out which child to insert into
  var insertionVector = this.getRelativeVector(coords);
  var childRef = this.children[insertionVector];

  //if that child is empty, make a new leaf out of it
  if(childRef === undefined){
    this.children[insertionVector] = new Leaf(this, insertionVector);
    this.children[insertionVector].insert(coords, value);
  }
  //else if that child is a branch or a leaf, recurse down
  //to either insert or subdivide as appropriate
  else{
    this.children[insertionVector].insert(coords, value);
  }
};

Tree.prototype.isWithin = Leaf.prototype.isWithin = function(maxima, minima) {
  var result = true;
  for(var i=0; i<minima.length; i++){
    if(this.minima[i] > maxima[i] || this.maxima[i] < minima[i]){
      return false;
    }
  }
  return true;
};

Tree.prototype.query = function(maxima, minima, result){
  result = result || [];
  for(var i=0; i<this.children.length; i++){
    if(this.children[i] && this.children[i].isWithin(maxima, minima)){
      if(!this.children[i].values){
        //recurse down for more children
        this.children[i].query(maxima, minima, result);
      }else{
        //it's a leaf. Fetch all of it's children
        for(var j=0; j<this.children[i].values.length; j++){
          result.push(this.children[i].values[j]);
        }
      }
    }
  }
  return result;
};

Tree.prototype.each = function(maxima, minima, cb){
  for(var i=0; i<this.children.length; i++){
    if(this.children[i] && this.children[i].isWithin(maxima, minima)){
      //if this is a tree
      if(!this.children[i].values){
        //recurse down for more children
        this.children[i].each(maxima, minima, cb);
      }else{
        //it's a leaf. Fetch all of it's children
        for(var j=0; j<this.children[i].values.length; j++){
          cb(this.children[i].values[j]);
        }
      }
    }
  }
};

Tree.prototype.eachLeaf = function(maxima, minima, cb){
  for(var i=0; i<this.children.length; i++){
    if(this.children[i] && this.children[i].isWithin(maxima, minima)){
      //if this is a tree
      if(!this.children[i].values){
        //recurse down for more children
        this.children[i].eachLeaf(maxima, minima, cb);
      }else{
        //it's a leaf. Fetch all of it's children
        cb(this.children[i]);
      }
    }
  }
};

Leaf.prototype.getCentreAndRegion =
Tree.prototype.getCentreAndRegion = function(vector){
  var maxima = this.parent.maxima;
  var minima = this.parent.minima;
  var parentCentre = this.parent.centre;

  var radii = divide(subtract(maxima, parentCentre), 2);
  
  this.centre = new Array(maxima.length);
  this.maxima = new Array(maxima.length);
  this.minima = new Array(maxima.length);
  this.vector = vector;

  for(var i=0, bit=1; i<maxima.length; i++){
    if(vector & bit){
      this.centre[i] = parentCentre[i] + radii[i];
      this.maxima[i] = maxima[i];
      this.minima[i] = parentCentre[i];
    }else{
      this.centre[i] = parentCentre[i] - radii[i];
      this.maxima[i] = parentCentre[i];
      this.minima[i] = minima[i];
    }
    bit = bit << 1;
  }

};

Leaf.prototype.insert = function(coords, value) {
  if(this.values.length < this.limit){
    this.values.push({
      coords: coords,
      value: value
    });
  }else{
    this.subdivide(coords, value);
  }
};

Leaf.prototype.subdivide = function(coords, value) {
  var subdivision = new Tree(this.maxima, this.minima, this.parent, this.centre);
  for(var i=0; i<this.values.length; i++){
    subdivision.insert(this.values[i].coords, this.values[i].value);
  }
  var self = this;
  subdivision.insert(coords, value);
  self.parent.children[self.vector] = subdivision;
};

module.exports = function(maxima, minima, limit){
  var tree = new Tree(maxima, minima, null);
  Leaf.prototype.limit = limit;
  return tree;
};

},{}],10:[function(require,module,exports){
'use strict';

/* 
 * This is an implementation of a Point Quadtree which acts as an adaptation of a binary 
 * tree used to represent two-dimensional point data. The center of the quadtree and 
 * each sub-quadtree is always on a point. The tree shapes depends on the order the 
 * data is inserted. This implementation is often very efficient in comparing two-dimensional, 
 * ordered data points, usually operating in logarithmic (O(log n)) time
 *
 * Please use the provided Box and Point helper classes when using this quadtree.
 *
 * Quadtree algorithm adapted from Peter Hayes's excellent Algorithm repository.
 * https://github.com/peterkhayes/HR-Algorithms-Meetup/
 */

var Quadtree = function(box) {
  this.box = box;
  this.point = null;
  this.SW = null;
  this.SE = null;
  this.NW = null;
  this.NE = null;
};

// Takes a Point as an input and inserts into the Quadtree.
Quadtree.prototype.insert = function(point) {
  var currentTree = this;
  if(!currentTree.point) {
    currentTree.point = point;
    return;
  }

  var quadrant = currentTree.box.findQuadrantForPoint(point);
  while(currentTree[quadrant]) {
    currentTree = currentTree[quadrant];
    quadrant = currentTree.box.findQuadrantForPoint(point);
  }

  var quadtreeBox = currentTree.box.getQuadrant(quadrant);
  currentTree[quadrant] = new Quadtree(quadtreeBox);
  currentTree[quadrant].point = point;
};

// Takes a Box as an input and returns an array of all Points within that Box.
Quadtree.prototype.retrieve = function(searchBox) {
  var foundPoints = [];
  if(searchBox.contains(this.point)) {
    foundPoints.push(this.point);
  }

  if(this.NE && this.NE.box.overlaps(searchBox)) {
    foundPoints = foundPoints.concat(this.NE.retrieve(searchBox));
  }
  if(this.NW && this.NW.box.overlaps(searchBox)) {
    foundPoints = foundPoints.concat(this.NW.retrieve(searchBox));
  }
  if(this.SW && this.SW.box.overlaps(searchBox)) {
    foundPoints = foundPoints.concat(this.SW.retrieve(searchBox));
  }
  if(this.SE && this.SE.box.overlaps(searchBox)) {
    foundPoints = foundPoints.concat(this.SE.retrieve(searchBox));
  }

  return foundPoints;
};

// Takes a Point as the target input and an optional number as the initialSearchRadius input.
// Returns the nearest Point to the target Point.
Quadtree.prototype.findNearestPointTo = function(target, initialSearchRadius) {
  if(!this.point) {
    return null;
  }
  var findNearestPoints = function(quadtree) {
    var initialSearchRadius = initialSearchRadius || 1;
    var searchBox = new Box(target.x - initialSearchRadius, 
                            target.y - initialSearchRadius, 
                            target.x + initialSearchRadius, 
                            target.y + initialSearchRadius);

    var nearestPoints = quadtree.retrieve(searchBox);
    while(nearestPoints.length === 0) {
      searchBox.expand();
      nearestPoints = quadtree.retrieve(searchBox);
    }
    return nearestPoints;
  };
  var findShortestDistance = function(points) {
    var shortestDistance;
    var nearestPoint = null;
    for(var i=0; i<points.length; i++) {
      var curDistance = target.distanceTo(points[i]);
      if(shortestDistance === undefined || curDistance < shortestDistance) {
        shortestDistance = curDistance;
        nearestPoint = points[i];
      }
    }
    return nearestPoint;
  };

  var points = findNearestPoints(this);
  return findShortestDistance(points);
};


/*
 * Box class helper function
 */

var Box = function(minX, minY, maxX, maxY) {
  if (minX > maxX) {
    throw new Error('Illegal x dimensions: ' + minX + ', ' + maxX);
  }
  if (minY > maxY) {
    throw new Error('Illegal y dimensions: ' + minY + ', ' + maxY);
  }

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;

  this.midX = (minX + maxX)/2;
  this.midY = (minY + maxY)/2;
};

Box.prototype.contains = function(point) {
  if (!point) {
    throw new Error('No point passed to Box.contains');
  }
  var inX = point.x >= this.minX && point.x <= this.maxX;
  var inY = point.y >= this.minY && point.y <= this.maxY;
  return inX && inY;
};

Box.prototype.overlaps = function(that) {
  if (!that) {
    throw new Error('No box passed to Box.overlaps');
  }
  var xOverlap = this.maxX >= that.minX && this.minX <= that.maxX;
  var yOverlap = this.maxY >= that.minY && this.minY <= that.maxY;
  return xOverlap && yOverlap;
};

Box.prototype.getQuadrant = function(quadrant) {
  if (quadrant === 'SW') {
    return new Box(this.minX, this.minY, this.midX, this.midY);
  } else if (quadrant === 'NW') {
    return new Box(this.minX, this.midY, this.midX, this.maxY);
  } else if (quadrant === 'SE') {
    return new Box(this.midX, this.minY, this.maxX, this.midY);
  } else if (quadrant === 'NE') {
    return new Box(this.midX, this.midY, this.maxX, this.maxY);
  } else {
    throw new Error('Quadrant ' + quadrant + ' is not one of: ["SW", "SE", "NW", "NE"]');
  }
};

Box.prototype.shrink = function() {
  var minX = (this.minX + this.midX)/2;
  var minY = (this.minY + this.midY)/2;
  var maxX = (this.maxX + this.midX)/2;
  var maxY = (this.maxY + this.midY)/2;

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;
};

Box.prototype.expand = function() {
  var minX = 2*this.minX - this.midX;
  var minY = 2*this.minY - this.midY;
  var maxX = 2*this.maxX - this.midX;
  var maxY = 2*this.maxY - this.midY;

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;
};

Box.prototype.findQuadrantForPoint = function(point) {
  if (!point) {
    throw new Error('No point passed to Box.findQuadrantForPoint');
  }
  if (!this.contains(point)) {
    throw new Error('Point' + point + ' is not inside box ' + this);
  }

  if (point.x <= this.midX && point.y <= this.midY) {
    return 'SW';
  } else if (point.x <= this.midX) {
    return 'NW';
  } else if (point.y <= this.midY) {
    return 'SE';
  } else {
    return 'NE';
  }
};


/*
 * Point class helper function
 */

var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.isIn = function(box) {
  if (!box) {
    throw new Error('No box passed to Point.isIn');
  }
  var inX = this.x >= box.minX && this.x <= box.maxX;
  var inY = this.y >= box.minY && this.y <= box.maxY;
  return inX && inY;
};

Point.prototype.distanceTo = function(point) {
  if (!point) {
    throw new Error('No point passed to Point.distanceTo');
  }
  var dx = point.x - this.x;
  var dy = point.y - this.y;
  return Math.sqrt(dx*dx + dy*dy);
};


module.exports.Quadtree = Quadtree;
module.exports.Box = Box;
module.exports.Point = Point;

},{}],11:[function(require,module,exports){
'use strict';

var Queue = function(){
  this._storage = [];
  this._size = 0;
};

Queue.prototype.enqueue = function(value){
  this._size++;
  this._storage.push(value);
};

Queue.prototype.dequeue = function(){
  this._size--;
  return this._storage.shift();
};

Queue.prototype.size = function(){
  return this._size;
};

module.exports = Queue;
},{}],12:[function(require,module,exports){
'use strict';

var Set = function(){
  this._storage = Object.create(null);
};

Set.fromArray = function(input) {
  var set = new Set();
  input.forEach(set.add.bind(set));
  return set;
};

Set.prototype.add = function(value){
  this._storage[JSON.stringify(value)] = true;
};

Set.prototype.remove = Set.prototype.delete = function(value){
  delete this._storage[JSON.stringify(value)];
};

Set.prototype.contains = Set.prototype.has = function(value){
  return this._storage[JSON.stringify(value)] || false;
};

// Clears the set of all values.
Set.prototype.clear = function(){
  this._storage = Object.create(null);
};

// Returns all elements of the set as an array.
Set.prototype.toArray = function() {
  return Object.keys(this._storage).map(JSON.parse);
};

// Returns the count of items in this set.
Set.prototype.size = function(){
  return Object.keys(this._storage).length;
};

Set.prototype.copy = function() {
  return Set.fromArray(this.toArray());
};

Set.prototype.union = function() {
  var union = this.copy();
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(arg) {
    arg.toArray().forEach(function(elem) {
      union.add(elem);
    });
  });
  return union;
};

Set.prototype.difference = function() {
  var difference = this.copy();
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(arg) {
    arg.toArray().forEach(function(elem) {
      difference.remove(elem);
    });
  });
  return difference;
};

Set.prototype.intersection = function() {
  var intersection = this.copy();
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(arg) {
    var newIntersection = new Set();
    arg.toArray().forEach(function(elem) {
      if (intersection.has(elem)) {
        newIntersection.add(elem);
      }
    });
    intersection = newIntersection;
  });
  return intersection;
};

module.exports = Set;

},{}],13:[function(require,module,exports){
'use strict';

var SetStrict = function(){
  this._storage = [];
};

SetStrict.prototype.add = function(value){
  if (this._storage.indexOf(value) === -1) {
    this._storage.push(value);
  }
};

SetStrict.prototype.remove = function(value){
  var idx = this._storage.indexOf(value);
  if (idx !== -1) {
    this._storage.splice(idx, 1);
  }
};

SetStrict.prototype.delete = SetStrict.prototype.remove;

SetStrict.prototype.contains = function(value){
  return this._storage.indexOf(value) !== -1;
};

SetStrict.prototype.has = SetStrict.prototype.contains;

// Clears the Set of all values.
SetStrict.prototype.clear = function(){
  this._storage = [];
};

// Returns the count of items in this set.
SetStrict.prototype.size = function(){
  return this._storage.length;
};

module.exports = SetStrict;

},{}],14:[function(require,module,exports){
'use strict';

var Tree = function(value){
  this.parent =  null;
  this.children = [];
  if(value){
    this.value  = value;
  }
};

Tree.prototype.addChild = function(value){
  var child;
  if(typeof value === 'number'){
    child = new Tree(value);    
  }
  else if(typeof value === 'object'){
    child = value;
  }
  child.parent = this;
  this.children.push(child);
};

Tree.prototype.contains = function(value){
  if(this.value === value){
    return true;
  } 
  for(var i = 0; i < this.children.length; i++){
    if(this.children[i].contains(value)){
      return true;
    }
  }
  return false;
};

Tree.prototype.removeChild= function(value){
  for(var i = 0; i < this.children.length; i++){
    if(this.children[i].value === value){
      var child = this.children.splice(i,1)[0];
      child.parent = null;
    }
  }
};

Tree.prototype.removeFromParent = function(){
  this.parent.removeChild(this.value);
};

Tree.prototype.traverse = function(callback){
  var subroutine = function(node){
    node.value = callback(node.value) || node.value;
    for(var i = 0; i < node.children.length; i++){
      subroutine(node.children[i]);
    }
  };
  subroutine(this);
};

module.exports = Tree;
},{}],15:[function(require,module,exports){
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

Trie.prototype.stringsFromPrefix = function(prefix){
  var strings = [];

  (function rec(prefix, curr, node){
    if (prefix === '' && node.value !== undefined) strings.push(curr);
    var keys = Object.keys(node.children);
    keys.forEach(function(key){
      if(prefix === '' || prefix[0] === key) rec(prefix.slice(1), curr+key, node.children[key]);
    });
  })(prefix, '', this);

  return strings;
};

module.exports = Trie;
},{}]},{},[1])(1)
});