dslib
==============

[![NPM](http://img.shields.io/npm/v/dslib.svg)](https://www.npmjs.org/package/dslib)
[![Circle CI](https://circleci.com/gh/DSLibrary/dslib.png?style=shield&circle-token=9f898f273bc7c23f93416b505b1f25bf9b1397cb)](https://circleci.com/gh/DSLibrary/dslib)
[![Coverage Status](http://img.shields.io/coveralls/DSLibrary/dslib.svg)](https://coveralls.io/r/DSLibrary/dslib?branch=master)

A library of useful data structures in Javascript

## Installation
```
npm install dslib --save
```
## Usage
```
var dslib = require('dslib');
```
###Stack
```
var stack = new dslib.Stack();

//methods
stack.push(item); //adds an item to top of stack
stack.pop(); // removes and returns last item added to stack
stack.size() // returns size of stack
```

###Queue
```
var queue = new dslib.Queue();

//methods
queue.enqueue(item); // adds an item to end of queue
queue.dequeue(); // removes and returns first item in queue
queue.size(); // returns size of queue
```

###Set

```
var set = new dslib.Set();

//methods
set.add(item); //adds an item to the set
set.remove(item); //removes an item from the set
set.delete(item); // removes an item from the set, same as remove
set.contains(item) // returns a boolean if item is in a set
set.has(item) // returns a boolean if item is in set, same as contains
set.clear() // empties the set
set.size() // returns the number of items in the set
Set.fromArray(array) // creates a new set from an array.
set.toArray() // creates an array out of a set
set.copy() // creates a new copy of the set
set.union(args) // creates a new set from an existing set adding existing args from set
set.difference(args) // creates a new set from an existing set, removing args from set
set.intersection(args) // create a set which is an intersection of the set and its arguments.
```

###setStrict

```
/* a strict set should be used as an alternative to set when
 * object uniqueness is necessary, or if storing functions in a set
 */
var setStrict = new dislib.SetStrict();

//methods
setStrict.add(val) // add a value to the set
setStrict.remove(val) // removes an item from the set
setStrict.delete(val) // synonymous with remove
setStrict.contains(val) // returns a boolean if item is in a set
setStrict.has(val) // synonymous with contains
setStrict.clear() // empties a set
setStric.size() // returns the size of a set
```

###map

```
var map = new dslib.Map();

//methods
map.add(key, val); // inserts key value pair to map
map.insert(key, val); // inserts key value pair to map
map.remove(key); // removes value stored at key
map.delete(key); //removes value stored at key
map.update(key, val); // updates a key to specific val
map.set(key, val); // sets a key to val, even if not in map
map.size(); // returns size of map
map.hasKey(key); // returns bool if key in map
```

###LinkedList
```
var linkedList = new dslib.LinkedList();

//methods
linkedList.size(); // returns the size of a linkedList
linkedList.addToTail(item); //adds an item to tail of linkedList
linkedList.removeHead(); //removes an item from head of linkedList
linkedList.contains(item); //returns a boolean if item in linkedList
```

###Tree
```
var tree = new dslib.Tree();

//methods
tree.addChild(value); //adds a child to tree with set value
tree.contains(value); //returns a boolean if node with value in tree
tree.removeChild(value); //removes a child from the tree with value
tree.removeFromParent(); //removes a childnode from its parent
tree.traverse(callback); //executes a callback on every value in tree, can mutate

```

###BinarySearchTree
```
var binarySearchTree = new dslib.BinarySearchTree();

//methods
binarySearchTree.insert(value) //inserts a node with the specific value
binarySearchTree.contains(value) //returns a boolean if the value is in the tree
binarySearchTree.depthFirstLog(callback) //executes callback on each node in tree, depth first order
binarySearchTree.breadthFirstLog(callback) //executes callback on each node in tree, breadth first order
binarySearchTree.rebalance() //rebalances tree upon insertion when inserted node causes maximum depth to be more than two times greater than minimum depth
```

###Graph
```

var graph = new dslib.Graph();

//methods
graph.addNode(value, optional2) //adds a new node to the graph
graph.contains(value) //returns a boolean whether graph contains value
graph.removeNode(value) //removes a specific node from the graph
graph.addEdge(node1,node2) //creates a connection between 2 nodes
graph.getEdge(node1, node2) //creates an edge between 2 existing nodes
graph.removeEdge(node1, node2) //removes the connection between 2 nodes
graph.forEachNode(callback) //applys a callback to nodes in the graph, can mutate the graph
```

###DoublyLinkedList
```
var doublyLinkedList = new dslib.DoublyLinkedList();

//methods
doublyLinkedList.size() // returns size of list
doublyLinkedList.addToTail(value) // adds a node with value to tail of list
doublyLinkedList.addToHead(value) //adds a node with value to head of list
doublyLinkedList.contains(value) //returns a boolean as to if value in list
doublyLinkedList.removeHead() //removes the head of the list
doublyLinkedList.removeTail() //removes the tail of the list
doublyLinkedList.remove(value) //removes a specific value
```

###BloomFilter
```
var bloomFilter = new dslib.BloomFilter(size, hashes);
//create a bloom filter of a certain size and with a certain number of hashes

//methods
bloomFilter.add(value) //adds a specific value into the bloomfilter
bloomFilter.test(value) //tests if a specific value is in the bloomfilter
```

###Heap
```
//create a min heap
var heap = new dslib.Heap();

//methods
heap.getMin() //returns the minimum value in the heap
heap.insert(value) //inserts a specific value to the heap
heap.deleteMin() //deletes a specific value from a heap
heap.heapSort(array) //takes an array of numbers and returns a least to greatest numerically sorted array
```

###QuadTree
```
//necessary helper classes

//create a box that with the designated min and max coordinates
var box = new dslib.Box(minX, minY, maxX, maxY);

//create a point with the designated x and y coordinates
var point = new dslib.Point(x, y)

//QuadTree class
//create a point QuadTree of dimensions designated by box.
var quadTree = new dslib.QuadTree(box);

//methods
quadTree.insert(point) //insert a point into the quad tree.
quadTree.retrieve(box) //returns an array of all the points within a quadtree for a specific box
quadTree.findNearestPointTo(point /*, optional initialSearchRadius */) //returns the nearest point to point argument
```

###n-Tree
```
An n-dimensional tree. Great for fast lookup of points in three or more dimensions.
Essentially the same as a Quadtree but can be used for things like 3D collision detection.

//create an n-tree with the designated max and min coordinates, and a maximum number of points per 'bucket'
var nTree = new dslib.nTree([10, 20, 5 etc...], [0, -20, 0...], 4);

//methods

nTree.insert([5, -5, 12], "{myValue: "fooBot"}"); //insert a point with the designated coordinates and an optional value

quadTree.query([maxima], [minima]) //returns all points within given coordinates

nTree.eachLeaf([maxima], [minima], function(leaf){
  console.log(leaf);
}]) //iterate over each point in the tree within given range

quadTree.each([maxima], [minima], function(leaf){
  console.log(leaf);
}]) //iterate over each node in the tree within given range

/*Implement your own functions on top of these. E.g., to get nearest neighbours (e.g., in a KNN machine-learning algorithm), try: */

var getDistance = function(a, b){
  var sumSq = 0;
  for(var i=0; i<a.length; i++){
    sumSq += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sumSq);
};

var getNearestNeighbours = function(coords, k){
  var results = [];
  nMap.eachNode(coords, coords, function(leaf){
    for(var i=0; i<leaf.values.length; i++){
      results.push(leaf.values[i]);
    }

  });
};
```

###Trie
```
var trie = new dslib.Trie();

//methods
trie.insert(key, val)       //inserts a key into the trie ( must be a string ) and an optional associated value
trie.contains(key)          //returns true if a key is contained in the trie and false otherwise
trie.lookup(key)            //returns the value associated with a key, returns null if key was inserted with no value,
                            //returns undefined if they key is not contained in the trie
trie.stringsFromPrefix(str) //returns an array of all of the keys that have the given prefix

```

## Tests

```
gulp test
//or
gulp watch
```

##Backlog

* set up better documentation system
* prefixTree
* b-tree
* red-black tree
* priority queue
* Breadth-first, pre-, in, post-order dpeth-first traversal tree
* Graph traversals
* Find and AddAfter for Linked List


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

* Feel free to contribute with any of the items in the backlog

To Contribute via Issue Notice:
* Write up a description of the problem
* I will write a fix correspondingly

To Contribute via Pull Request:
* Fork the repo

* Add unit tests for any new or changed functionality. Write tests in the
appropriate spec file in the tests directory

* Submit a pull request to master branch

## Release History

* 0.1.0 Initial release
* 0.2.0 Tree, Stack, Queue, Set, LinkedList
* 0.3.0 BinarySearchTree
* 0.4.0 Graph
* 0.5.0 Clean up tests
* 0.5.1 Add backlog
* 0.5.2 Add traverse method on tree
* 0.5.3 Add breadthFirstLog tree on binarySearchTree
* 0.6.0 Add bloomFilter!
* 0.6.1 Clean up documentation
* 0.6.2 Fix circle
* 0.7.0 Heap
* 0.8.0 Update Set (Thanks to David Deriso)
* 0.9.0 Add QuadTree (Thanks to davegw)
* 0.10.0 Add n-Tree (Thanks to rp-3)
* 0.10.1 Add size() method on linkedList (Thanks to David Deriso)
* 0.10.2 Add Coveralls and Istanbul for Code Coverage (Thanks to Andrew Zey)
* 1.0.0 Clean up and add auto-rebalancing to BST (Thanks to smk1992 and JonathanWarrick)
* 1.0.1 Update README.md backlog (Thanks to Peter Hayes)
* 1.1.0 Add setStrict and map (nickb1080), update set methods (Peter Hayes), add tries (jhrdoty)
* 1.1.1 Add gulp-coveralls (andrewzey)
