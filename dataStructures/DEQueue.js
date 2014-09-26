'use strict';

var DEQueue = function() {
  this.storage = [];
};

DEQueue.prototype.addFront = function (value) {
  this.storage.unshift(value);
};

DEQueue.prototype.addRear = function (value) {
  this.storage.push(value);
};

DEQueue.prototype.removeFront = function () {
  if (!this.isEmpty()) {
    return this.storage.shift();
  } else {
    return undefined
  }
};

DEQueue.prototype.removeRear = function () {
  if (!this.isEmpty()) {
    return this.storage.pop();
  } else {
    return undefined
  }
};

DEQueue.prototype.isEmpty = function () {
  if (this.storage.length === 0) {
    return true;
  } else {
    return false;
  }
};

DEQueue.prototype.size = function () {
  return this.storage.length;
};

module.exports = DEQueue;