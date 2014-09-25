var Deque = function() {
  this.storage = [];
};

Deque.prototype.addFront = function (value) {
  this.storage.unshift(value);
};

Deque.prototype.addRear = function (value) {
  this.storage.push(value);
};

Deque.prototype.removeFront = function () {
  if (!this.isEmpty()) {
    return this.storage.shift();
  }
};

Deque.prototype.removeRear = function () {
  if (!this.isEmpty()) {
    return this.storage.pop();
  }
};

Deque.prototype.isEmpty = function () {
  if (this.storage.length === 0) {
    return true;
  } else {
    return false;
  }
};

Deque.prototype.size = function () {
  return this.storage.length;
};