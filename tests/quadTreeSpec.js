'use strict';

var Quadtree = require('../index.js').Quadtree;
var Box = require('../dataStructures/quadTree.js').QuadtreeTestHelpers.Box;
var Point = require('../dataStructures/quadTree.js').QuadtreeTestHelpers.Point;
var should = require('chai').should();
var expect = require('chai').expect();

/*
 * Quadtree tests adapted from Peter Hayes's excellent Algorithm repository.
 * https://github.com/peterkhayes/HR-Algorithms-Meetup/
 */

describe("Quadtree", function() {
  var quadtree, bigFilledQuadtree, box, point;
  before(function() {
    bigFilledQuadtree = new Quadtree(-10, -10, 510, 510);
    for (var x = 0; x <= 100; x++) {
      for (var y = 0; y <= 100; y++) {
        bigFilledQuadtree.insert(x, y);
      }
    }
  });

  beforeEach(function() {
    quadtree = new Quadtree(-10, -10, 10, 10);
  });

  describe("should have an insert method", function() {
    it("calls 'insert' once without error", function() {
      quadtree.insert(1, 1);
    });

    it("calls 'insert' 3 times without error", function() {
      quadtree.insert(1, 1);
      quadtree.insert(0, 0);
      quadtree.insert(-2, 4);
    });

    it("calls 'insert' 100 times without error", function() {
      var x, y;
      for (var i = 0; i < 100; i++) {
        x = Math.random()*20-10;
        y = Math.random()*20-10;
        quadtree.insert(x, y);
      }
    });

    it("calls 'insert' 40000 times without error", function() {
      var quadtree = new Quadtree(-10, -10, 310, 310);
      for (var x = 0; x < 100; x++) {
        for (var y = 0; y < 100; y++) {
          quadtree.insert(x, y);
        }
      }
    });

    it("adds a first point without creating subtrees", function() {
      quadtree.insert(0, 0);
      should.exist(quadtree.point);
      should.not.exist(quadtree.SW);
      should.not.exist(quadtree.SE);
      should.not.exist(quadtree.NW);
      should.not.exist(quadtree.NE);
    });

    it("adds a second point into the correct subtree", function() {
      quadtree.insert(0, 0);
      quadtree.insert(1, 1);
      (quadtree.NE).should.be.an.instanceof(Quadtree);
      expectPoint(quadtree.point, 0, 0);
      expectPoint(quadtree.NE.point, 1, 1);
    });

    it("adds several points into the correct subtrees", function() {
      quadtree.insert(0, 0);
      quadtree.insert(1, 1);
      quadtree.insert(-3, -4);
      quadtree.insert(7, -4);
      quadtree.insert(-5, 2);
      quadtree.insert(2, 2);
      quadtree.insert(9, 2);
      quadtree.insert(9, 9);
      (quadtree.SW).should.be.an.instanceof(Quadtree);
      (quadtree.SE).should.be.an.instanceof(Quadtree);
      (quadtree.NW).should.be.an.instanceof(Quadtree);
      (quadtree.NE).should.be.an.instanceof(Quadtree);
      (quadtree.NE.SW).should.be.an.instanceof(Quadtree);
      (quadtree.NE.SE).should.be.an.instanceof(Quadtree);
      (quadtree.NE.NE).should.be.an.instanceof(Quadtree);
      expectPoint(quadtree.point, 0, 0);
      expectPoint(quadtree.SW.point, -3, -4);
      expectPoint(quadtree.SE.point, 7, -4);
      expectPoint(quadtree.NW.point, -5, 2);
      expectPoint(quadtree.NE.point, 1, 1);
      expectPoint(quadtree.NE.SW.point, 2, 2);
      expectPoint(quadtree.NE.SE.point, 9, 2);
      expectPoint(quadtree.NE.NE.point, 9, 9);
    });
  });

  describe("should have a retrieve method", function() {
    it("Finds one point in the search box.  Point: (0, 0).  Box: (-10, -10, 10, 10).", function() {
      quadtree.insert(0, 0);
      var points = quadtree.retrieve(quadtree.box);
      expectPoints(points, [[0, 0]]);
    });

    it("Does not find point out of the search box.  Point: (0, 0).  Box: (1, 1, 3, 3)", function() {
      quadtree.insert(0, 0);
      var points = quadtree.retrieve(1, 1, 3, 3);
      expectPoints(points, []);
    });

    it("Finds the three points in the search box.  Points: (1, 1), (-1, 1), (0, -1).  Box: (-10, -10, 10, 10)", function() {
      quadtree.insert(1, 1);
      quadtree.insert(-1, 1);
      quadtree.insert(0, -1);
      var points = quadtree.retrieve(quadtree.box);
      expectPoints(points, [[1, 1], [-1, 1], [0, -1]]);
    });

    it("Finds the two points in the search box.  Doesn't find the two points out of the box.  Points: (1, 1), (-1, 1), (0, -1), (-1, 2).  Box: (0, -10, 10, 10)", function() {
      quadtree.insert(1, 1);
      quadtree.insert(-1, 1);
      quadtree.insert(0, -1);
      quadtree.insert(-1, 2);
      var points = quadtree.retrieve(0, -10, 10, 10);
      expectPoints(points, [[1, 1], [0, -1]]);
    });

    it("Finds 100 points, all within (-10, -10, 10, 10)", function() {
      var x, y;
      for (var i = 0; i < 100; i++) {
        x = Math.random()*20-10;
        y = Math.random()*20-10;
        quadtree.insert(x, y);
      }
      var points = quadtree.retrieve(quadtree.box);
      (points).should.have.length(100);
    });

    it("Finds only the points inside a range.  100 points, 25 with x < -5, 75 with x >= -5, finds all points with x >= -5.", function() {
      var x, y;
      for (var i = 0; i < 100; i++) {
        if (i % 4) {
          x = Math.random()*15-5;
          y = Math.random()*20-10;
        } else {
          x = Math.random()*4-10;
          y = Math.random()*0-10;
        }
        quadtree.insert(x, y);
      }
      var points = quadtree.retrieve(-5, -10, 10, 10);
      (points).should.have.length(75);
    });
  });

  describe("should have a findNearestPointTo method", function() {
    it("If quadtree is empty, returns null", function() {
      var point = quadtree.findNearestPointTo(0, 0);
      should.equal(point, null);
    });

    it("If quadtree contains only 1 point, (0, 0), finds that point, with a query of (0, 0).", function() {
      quadtree.insert(0, 0);
      var point = quadtree.findNearestPointTo(0, 0);
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains only 1 point, (0, 0), finds that point, with a query of (1, 1).", function() {
      quadtree.insert(0, 0);
      var point = quadtree.findNearestPointTo(1, 1);
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains 2 points, (0, 0) and (5, 5), finds (0, 0) with a query of (0, 0)", function() {
      quadtree.insert(0, 0);
      quadtree.insert(5, 5);
      var point = quadtree.findNearestPointTo(0, 0);
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains 2 points, (0, 0) and (5, 5), finds (0, 0) with a query of (1, 1)", function() {
      quadtree.insert(0, 0);
      quadtree.insert(5, 5);
      var point = quadtree.findNearestPointTo(1, 1);
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains 4 points, (0, 0), (5, 0), (0, 5), and (5, 5), finds (5, 0) as the closest to (3, 2)", function() {
      quadtree.insert(0, 0);
      quadtree.insert(5, 0);
      quadtree.insert(0, 5);
      quadtree.insert(5, 5);
      var point = quadtree.findNearestPointTo(new Point(3, 2));
      expectPoint(point, 5, 0);
    });

    it("If the quadtree has all points with x and y between 0 and 99, finds (100, 99) as the closest point to (1000, 99)", function() {
      var point = bigFilledQuadtree.findNearestPointTo(1000, 349);
      expectPoint(point, 100, 100);
    });

    it("If the quadtree has all points with x and y between 0 and 99, finds (100, 99) as the closest point to (99.9, 99)", function() {
      var point = bigFilledQuadtree.findNearestPointTo(99.9, 99);
      expectPoint(point, 100, 99);
    });

    it("Works quickly. Performs 100 queries for random points (should be under 1000 ms)", function() {
      var startTime = Date.now();
      for (var i = 0; i < 100; i++) {
        var x = (Math.random()*1+999)/10 - 0.05;
        var y = (Math.random()*1+999)/10 - 0.05;
        var point = bigFilledQuadtree.findNearestPointTo(x, y);
        expectPoint(point, Math.round(x), Math.round(y));
      }
      (Date.now() - startTime).should.be.below(1000);
    });
  });
  describe("should have a Box helper class", function() {
    beforeEach(function() {
      box = new Box(-20, -20, 20, 20);
    })
    it("stores a box class on quadtree instantion", function() {
      (quadtree.box).should.be.an.instanceof(Box);
      (function(){new Box(10, 0, 0, 10)}).should.throw();
      (function(){new Box(0, 10, 10, 0)}).should.throw();
    });
    it("has a contains method", function() {
      var point1 = new Point(0, 0);
      var point2 = new Point(10, -10);
      var point3 = new Point(-30, 10);
      var point4 = new Point(10, 30);
      var point5 = new Point(20, 20);
      (box.contains(point1)).should.be.true;
      (box.contains(point2)).should.be.true;
      (box.contains(point3)).should.be.false;
      (box.contains(point4)).should.be.false;
      (box.contains(point5)).should.be.true;
      (function(){box.contains(0, 0)}).should.throw();
    });
    it("has an overlaps method", function() {
      var box1 = new Box(0, 0, 10, 10);
      var box2 = new Box(-100, -100, 10, 10);
      var box3 = new Box(-40, -40, -30, -30);
      var box4 = new Box(25, 0, 40, 20);
      var box5 = new Box(20, 20, 40, 40);
      (box.overlaps(box1)).should.be.true;
      (box.overlaps(box2)).should.be.true;
      (box.overlaps(box3)).should.be.false;
      (box.overlaps(box4)).should.be.false;
      (box.overlaps(box5)).should.be.true;
      (function(){box.overlaps(0, 0, 10, 10)}).should.throw();
    });
    it("has a getQuadrant method", function() {
      expectBox(box.getQuadrant('NE'), 0, 0, 20, 20);
      expectBox(box.getQuadrant('NW'), -20, 0, 0, 20);
      expectBox(box.getQuadrant('SW'), -20, -20, 0, 0);
      expectBox(box.getQuadrant('SE'), 0, -20, 20, 0);
      (function(){box.getQuadrant('NA')}).should.throw();
    });
    it("has shrink and expand methods", function() {
      box.shrink();
      expectBox(box, -10, -10, 10, 10);
      box.shrink();
      expectBox(box, -5, -5, 5, 5);
      box.expand();
      expectBox(box, -10, -10, 10, 10);
      box.expand();
      box.expand();
      expectBox(box, -40, -40, 40, 40);
    });
    it("has a findQuadrantForPoint method", function() {
      var point1 = new Point(1, 10);
      var point2 = new Point(-13, 5);
      var point3 = new Point(-3, -20);
      var point4 = new Point(20, -20);
      var point5 = new Point(30, 30);
      (box.findQuadrantForPoint(point1)).should.equal('NE');
      (box.findQuadrantForPoint(point2)).should.equal('NW');
      (box.findQuadrantForPoint(point3)).should.equal('SW');
      (box.findQuadrantForPoint(point4)).should.equal('SE');
      (function(){box.findQuadrantForPoint(10, 10)}).should.throw();
      (function(){box.findQuadrantForPoint(point5)}).should.throw();
    });
  });
  describe("should have a Point helper class", function() {
    beforeEach(function() {
      point = new Point(10, 10);
    })
    it("stores a point class on quadtree insertion", function() {
      quadtree.insert(new Point(0, 0));
      (quadtree.point).should.be.an.instanceof(Point);
    });
    it("has an isIn method", function() {
      var box1 = new Box(0, 0, 10, 10);
      var box2 = new Box(-100, -100, 100, 100);
      var box3 = new Box(-40, -40, -30, -30);
      var box4 = new Box(25, 0, 40, 20);
      (point.isIn(box1)).should.be.true;
      (point.isIn(box2)).should.be.true;
      (point.isIn(box3)).should.be.false;
      (point.isIn(box4)).should.be.false;
      (function(){point.isIn(-20, -20, 20, 20)}).should.throw();
    });
    it("has a distanceTo method", function() {
      var point1 = new Point(10, 10);
      var point2 = new Point(10, -10);
      var point3 = new Point(13, 14);
      (point.distanceTo(point1)).should.equal(0);
      (point.distanceTo(point2)).should.equal(20);
      (point.distanceTo(point3)).should.equal(5);
      (function(){point.distanceTo(20, 20)}).should.throw();
    });
  });
});

var expectBox = function(actual, expected) {
  if (typeof expected === "number") {
    expected = { minX: arguments[1], minY: arguments[2], maxX: arguments[3], maxY: arguments[4] };
  }
  (actual).should.be.an.instanceof(Box);
  (Object.keys(actual)).should.have.length(6);
  (actual.minX).should.equal(expected.minX);
  (actual.minY).should.equal(expected.minY);
  (actual.maxX).should.equal(expected.maxX);
  (actual.maxY).should.equal(expected.maxY);
};

var expectPoints = function(actual, expected) {
  (actual).should.have.length(expected.length);
  actual = actual.sort(pointsArrayComparator);
  expected = expected.map( function ( tuple ) {
    return {x: tuple[0], y: tuple[1]};
  }).sort(pointsArrayComparator);
  for (var i = 0; i < actual.length; i++) {
    var actualPoint = actual[i];
    var expectedPoint = expected[i];
    (actualPoint).should.have.property("x", expectedPoint.x);
    (actualPoint).should.have.property("y", expectedPoint.y);
  }
};

var pointsArrayComparator = function(a, b) {
  var xDiff = a.x - b.x;
  var yDiff = a.y - b.y;
  return xDiff ? xDiff : yDiff;
};

var expectPoint = function(actual, expected) {
  if (typeof expected === "number") {
    expected = { x: arguments[1], y: arguments[2] };
  }
  (actual).should.be.an.instanceof(Point);
  (Object.keys(actual)).should.have.length(2);
  (actual.x).should.equal(expected.x);
  (actual.y).should.equal(expected.y);
};
