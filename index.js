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

module.exports = dslib;