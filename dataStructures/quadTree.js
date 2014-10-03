'use strict';

/*
 * This is an implementation of a Point Quadtree which acts as an adaptation of a binary
 * tree used to represent two-dimensional point data. The center of the quadtree and
 * each sub-quadtree is always on a point. The tree shapes depends on the order the
 * data is inserted. This implementation is often very efficient in comparing two-dimensional,
 * ordered data points, usually operating in logarithmic (O(log n)) time
 *
 * Please use the provided Box and Point helper classes when using this quadtree.
 *
 * Quadtree algorithm adapted from Peter Hayes's excellent Algorithm repository.
 * https://github.com/peterkhayes/HR-Algorithms-Meetup/
 */

// Takes coordinate box and creates a new Quadtree.
// Alternately, accepts a Box instance as only argument
var Quadtree = function(minX, minY, maxX, maxY) {

  // argument shifting
  if (arguments.length === 1) {
    this.box = arguments[0];
  } else {
    this.box = new Box(minX, minY, maxX, maxY);
  }
  this.point = null;
  this.SW = null;
  this.SE = null;
  this.NW = null;
  this.NE = null;
};

// Takes x and y coordinates as input and inserts point into the Quadtree.
// Alternately, accepts a Point instance as only argument.
Quadtree.prototype.insert = function(x, y) {
  var point;

  // argument shifting
  if (arguments.length === 1) {
    point = arguments[0];
  } else {
    point = new Point(x, y);
  }
  var currentTree = this;
  if(!currentTree.point) {
    currentTree.point = point;
    return;
  }

  var quadrant = currentTree.box.findQuadrantForPoint(point);
  while(currentTree[quadrant]) {
    currentTree = currentTree[quadrant];
    quadrant = currentTree.box.findQuadrantForPoint(point);
  }

  var quadtreeBox = currentTree.box.getQuadrant(quadrant);
  currentTree[quadrant] = new Quadtree(quadtreeBox);
  currentTree[quadrant].point = point;
};

// Takes 4 coordinates and returns an array of all Points within that box
// Alternately accepts a Box instance as it's only argument.
Quadtree.prototype.retrieve = function(minX, minY, maxX, maxY) {
  var searchBox;

  // arguemnt shifting
  if (arguments.length === 1) {
    searchBox = arguments[0];
  } else {
    searchBox = new Box(minX, minY, maxX, maxY);
  }

  var foundPoints = [];
  if(searchBox.contains(this.point)) {
    foundPoints.push(this.point);
  }

  if(this.NE && this.NE.box.overlaps(searchBox)) {
    foundPoints = foundPoints.concat(this.NE.retrieve(searchBox));
  }
  if(this.NW && this.NW.box.overlaps(searchBox)) {
    foundPoints = foundPoints.concat(this.NW.retrieve(searchBox));
  }
  if(this.SW && this.SW.box.overlaps(searchBox)) {
    foundPoints = foundPoints.concat(this.SW.retrieve(searchBox));
  }
  if(this.SE && this.SE.box.overlaps(searchBox)) {
    foundPoints = foundPoints.concat(this.SE.retrieve(searchBox));
  }

  return foundPoints;
};

// Takes a Point as the target point and an optional number as the initialSearchRadius input.
// Alternately, accepts a Point as first argument and a number in the second argument as initialSearchRadius.
// Returns the nearest Point to the target Point.
Quadtree.prototype.findNearestPointTo = function(x, y, initialSearchRadius) {
  var target;
  if(!this.point) {
    return null;
  }

  // argument shifting
  if (typeof arguments[0] === "number") {
    target = new Point(x, y);
  } else {
    target = arguments[0];
    initialSearchRadius = arguments[1];
  }

  var findNearestPoints = function(quadtree) {
    var initialSearchRadius = initialSearchRadius || 1;
    var searchBox = new Box(target.x - initialSearchRadius,
                            target.y - initialSearchRadius,
                            target.x + initialSearchRadius,
                            target.y + initialSearchRadius);

    var nearestPoints = quadtree.retrieve(searchBox);
    while(nearestPoints.length === 0) {
      searchBox.expand();
      nearestPoints = quadtree.retrieve(searchBox);
    }
    return nearestPoints;
  };
  var findShortestDistance = function(points) {
    var shortestDistance;
    var nearestPoint = null;
    for(var i=0; i<points.length; i++) {
      var curDistance = target.distanceTo(points[i]);
      if(shortestDistance === undefined || curDistance < shortestDistance) {
        shortestDistance = curDistance;
        nearestPoint = points[i];
      }
    }
    return nearestPoint;
  };

  var points = findNearestPoints(this);
  return findShortestDistance(points);
};


/*
 * Box class helper function
 */

var Box = function(minX, minY, maxX, maxY) {
  if (minX > maxX) {
    throw new Error('Illegal x dimensions: ' + minX + ', ' + maxX);
  }
  if (minY > maxY) {
    throw new Error('Illegal y dimensions: ' + minY + ', ' + maxY);
  }

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;

  this.midX = (minX + maxX)/2;
  this.midY = (minY + maxY)/2;
};

Box.prototype.contains = function(point) {
  if (!point) {
    throw new Error('No point passed to Box.contains');
  }
  var inX = point.x >= this.minX && point.x <= this.maxX;
  var inY = point.y >= this.minY && point.y <= this.maxY;
  return inX && inY;
};

Box.prototype.overlaps = function(that) {
  if (!that) {
    throw new Error('No box passed to Box.overlaps');
  }
  var xOverlap = this.maxX >= that.minX && this.minX <= that.maxX;
  var yOverlap = this.maxY >= that.minY && this.minY <= that.maxY;
  return xOverlap && yOverlap;
};

Box.prototype.getQuadrant = function(quadrant) {
  if (quadrant === 'SW') {
    return new Box(this.minX, this.minY, this.midX, this.midY);
  } else if (quadrant === 'NW') {
    return new Box(this.minX, this.midY, this.midX, this.maxY);
  } else if (quadrant === 'SE') {
    return new Box(this.midX, this.minY, this.maxX, this.midY);
  } else if (quadrant === 'NE') {
    return new Box(this.midX, this.midY, this.maxX, this.maxY);
  } else {
    throw new Error('Quadrant ' + quadrant + ' is not one of: ["SW", "SE", "NW", "NE"]');
  }
};

Box.prototype.shrink = function() {
  var minX = (this.minX + this.midX)/2;
  var minY = (this.minY + this.midY)/2;
  var maxX = (this.maxX + this.midX)/2;
  var maxY = (this.maxY + this.midY)/2;

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;
};

Box.prototype.expand = function() {
  var minX = 2*this.minX - this.midX;
  var minY = 2*this.minY - this.midY;
  var maxX = 2*this.maxX - this.midX;
  var maxY = 2*this.maxY - this.midY;

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;
};

Box.prototype.findQuadrantForPoint = function(point) {
  if (!point) {
    throw new Error('No point passed to Box.findQuadrantForPoint');
  }
  if (!this.contains(point)) {
    throw new Error('Point' + point + ' is not inside box ' + this);
  }

  if (point.x <= this.midX && point.y <= this.midY) {
    return 'SW';
  } else if (point.x <= this.midX) {
    return 'NW';
  } else if (point.y <= this.midY) {
    return 'SE';
  } else {
    return 'NE';
  }
};


/*
 * Point class helper function
 */

var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.isIn = function(box) {
  if (!box) {
    throw new Error('No box passed to Point.isIn');
  }
  var inX = this.x >= box.minX && this.x <= box.maxX;
  var inY = this.y >= box.minY && this.y <= box.maxY;
  return inX && inY;
};

Point.prototype.distanceTo = function(point) {
  if (!point) {
    throw new Error('No point passed to Point.distanceTo');
  }
  var dx = point.x - this.x;
  var dy = point.y - this.y;
  return Math.sqrt(dx*dx + dy*dy);
};


module.exports = Quadtree;
