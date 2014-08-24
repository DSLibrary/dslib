'use strict';
var Stack = require('./dataStructures/stack.js');
var Queue = require('./dataStructures/queue.js');

//library object that contains all data structures
var dslib = {};
dslib.Stack = Stack;
dslib.Queue = Queue;

module.exports = dslib;