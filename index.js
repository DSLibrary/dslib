'use strict';
var Stack = require('./dataStructures/stack.js');
var Queue = require('./dataStructures/queue.js');
var LinkedList = require('./dataStructures/linkedList.js');

//library object that contains all data structures
var dslib = {};
dslib.Stack = Stack;
dslib.Queue = Queue;
dslib.LinkedList = LinkedList;

module.exports = dslib;