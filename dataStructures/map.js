'use strict';

var Map = function(){
  this._keys = [];
  this._values = [];
  this._counter = 0;
};

Map.prototype.add = function (key, value) {
  if (this._keys.indexOf(key) === -1) {
    this._keys[this._counter] = key;
    this._values[this._counter] = value;
    this._counter++;
  }
};
Map.prototype.insert = Map.prototype.add;

Map.prototype.remove = function (key) {
  var idx = this._keys.indexOf(key);
  if (idx > -1) {
    delete this._keys[idx];
  }
};
Map.prototype.delete = Map.prototype.remove;

Map.prototype.get = function (key) {
  var idx = this._keys.indexOf(key);
  if (idx > -1) {
    return this._values[idx];
  }
  return undefined;
};

Map.prototype.update = function (key, value) {
  var idx = this._keys.indexOf(key);
  if (idx !== -1) {
    this._values[idx] = value;
  }
};

// not delegating to add/update to avoid additional indexOf
Map.prototype.set = function (key, value) {
  var idx = this._keys.indexOf(key);
  if (idx === -1) {
    this._keys[this._counter] = key;
    this._values[this._counter] = value;
    this._counter++;
  } else {
    this._values[idx] = value;
  }
};

Map.prototype.size = function () {
  return Object.keys(this._keys).length;
};

Map.prototype.hasKey = function (key) {
  return this._keys.indexOf(key) !== -1;
};

module.exports = Map;
