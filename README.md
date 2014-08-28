dslib
==============

![alt tag](https://circleci.com/gh/KiaFathi/dslib/tree/master.png?circle-token=9f898f273bc7c23f93416b505b1f25bf9b1397cb&style=shield)

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
set.contains(item); // returns a boolean if item in slt 
```

###LinkedList
```
var linkedList = new dslib.LinkedList();

//methods
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

bloomFilter.add(value) //adds a specific value into the bloomfilter
bloomFilter.test(value) //tests if a specific value is in the bloomfilter
```

## Tests

```
gulp mocha
//or
gulp watch
```

##Backlog

* QuadTree
* Trie
* Set with numbers and strings
* Set with any input
* Make BinarySearchTree rebalance
* prefixTree
* b-tree
* red-black tree
* priority queue


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
