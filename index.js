'use strict';
var Stack = require('./dataStructures/stack.js');
var Queue = require('./dataStructures/queue.js');
var LinkedList = require('./dataStructures/linkedList.js');
var Set = require('./dataStructures/set.js');

//library object that contains all data structures
var dslib = {};
dslib.Stack = Stack;
dslib.Queue = Queue;
dslib.LinkedList = LinkedList;
dslib.Set = Set;

module.exports = dslib;