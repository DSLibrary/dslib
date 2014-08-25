'use strict';
var Stack = require('./dataStructures/stack.js');
var Queue = require('./dataStructures/queue.js');
var LinkedList = require('./dataStructures/linkedList.js');
var Set = require('./dataStructures/set.js');
var Tree = require('./dataStructures/tree.js');
var BinarySearchTree = require('./dataStructures/binarySearchTree.js');
var Graph = require('./dataStructures/Graph.js');

//library object that contains all data structures
var dslib = {};
dslib.Stack = Stack;
dslib.Queue = Queue;
dslib.LinkedList = LinkedList;
dslib.Set = Set;
dslib.Tree = Tree;
dslib.BinarySearchTree = BinarySearchTree;
dslib.Graph = Graph;

module.exports = dslib;