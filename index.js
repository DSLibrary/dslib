'use strict';
//requirements
var Stack = require('./dataStructures/stack.js');
var Queue = require('./dataStructures/queue.js');
var LinkedList = require('./dataStructures/linkedList.js');
var Set = require('./dataStructures/set.js');
var Tree = require('./dataStructures/tree.js');
var BinarySearchTree = require('./dataStructures/binarySearchTree.js');
var Graph = require('./dataStructures/graph.js');
var DoublyLinkedList = require('./dataStructures/doublyLinkedList.js');
var BloomFilter = require('./dataStructures/bloomFilter.js');
var Heap = require('./dataStructures/heap.js');
var Quadtree = require('./dataStructures/quadTree.js');
var nTree = require('./dataStructures/n-tree.js');

//library object that contains all data structures
var dslib = {};

//library components
dslib.Stack = Stack;
dslib.Queue = Queue;
dslib.LinkedList = LinkedList;
dslib.Set = Set;
dslib.Tree = Tree;
dslib.BinarySearchTree = BinarySearchTree;
dslib.Graph = Graph;
dslib.DoublyLinkedList = DoublyLinkedList;
dslib.BloomFilter = BloomFilter;
dslib.Heap = Heap;
dslib.Quadtree = Quadtree.Quadtree;
dslib.Box = Quadtree.Box;
dslib.Point = Quadtree.Point;
dslib.nTree = nTree;

module.exports = dslib;
