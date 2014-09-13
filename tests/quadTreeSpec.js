'use strict';

var Quadtree = require('../index.js').Quadtree;
var Box = require('../index.js').Box;
var Point = require('../index.js').Point;
var should = require('chai').should();
var expect = require('chai').expect();

/*
 * Quadtree tests adapted from Peter Hayes's excellent Algorithm repository.
 * https://github.com/peterkhayes/HR-Algorithms-Meetup/
 */

describe("Quadtree", function() {
  var quadtree, bigFilledQuadtree;
  before(function() {
    bigFilledQuadtree = new Quadtree(new Box(-10, -10, 510, 510));
    for (var x = 0; x <= 100; x++) {
      for (var y = 0; y <= 100; y++) {
        bigFilledQuadtree.insert(new Point(x, y));
      }
    }
  });

  beforeEach(function() {
    var box = new Box(-10, -10, 10, 10);
    quadtree = new Quadtree(box);
  });

  describe("should have an insert method", function() {
    it("calls 'insert' once without error", function() {
      quadtree.insert(new Point(1, 1));
    });

    it("calls 'insert' 3 times without error", function() {
      quadtree.insert(new Point(1, 1));
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(-2, 4));
    });

    it("calls 'insert' 100 times without error", function() {
      var x, y;
      for (var i = 0; i < 100; i++) {
        x = Math.random()*20-10;
        y = Math.random()*20-10;
        quadtree.insert(new Point(x, y));
      }
    });

    it("calls 'insert' 40000 times without error", function() {
      var quadtree = new Quadtree(new Box(-10, -10, 310, 310));
      for (var x = 0; x < 100; x++) {
        for (var y = 0; y < 100; y++) {
          quadtree.insert(new Point(x, y));
        }
      }
    });

    it("adds a first point without creating subtrees", function() {
      quadtree.insert(new Point(0, 0));
      should.exist(quadtree.point);
      should.not.exist(quadtree.SW);
      should.not.exist(quadtree.SE);
      should.not.exist(quadtree.NW);
      should.not.exist(quadtree.NE);
    });

    it("adds a second point into the correct subtree", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(1, 1));
      (quadtree.NE).should.be.an.instanceof(Quadtree);
      expectPoint(quadtree.point, 0, 0);
      expectPoint(quadtree.NE.point, 1, 1);
    });

    it("adds several points into the correct subtrees", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(1, 1));
      quadtree.insert(new Point(-3, -4));
      quadtree.insert(new Point(7, -4));
      quadtree.insert(new Point(-5, 2));
      quadtree.insert(new Point(2, 2));
      quadtree.insert(new Point(9, 2));
      quadtree.insert(new Point(9, 9));
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
      quadtree.insert(new Point(0, 0));
      var points = quadtree.retrieve(quadtree.box);
      expectPoints(points, [new Point(0, 0)]);
    });

    it("Does not find point out of the search box.  Point: (0, 0).  Box: (1, 1, 3, 3)", function() {
      quadtree.insert(new Point(0, 0));
      var points = quadtree.retrieve(new Box(1, 1, 3, 3));
      expectPoints(points, []);
    });

    it("Finds the three points in the search box.  Points: (1, 1), (-1, 1), (0, -1).  Box: (-10, -10, 10, 10)", function() {
      quadtree.insert(new Point(1, 1));
      quadtree.insert(new Point(-1, 1));
      quadtree.insert(new Point(0, -1));
      var points = quadtree.retrieve(quadtree.box);
      expectPoints(points, [new Point(1, 1), new Point(-1, 1), new Point(0, -1)]);
    });

    it("Finds the two points in the search box.  Doesn't find the two points out of the box.  Points: (1, 1), (-1, 1), (0, -1), (-1, 2).  Box: (0, -10, 10, 10)", function() {
      quadtree.insert(new Point(1, 1));
      quadtree.insert(new Point(-1, 1));
      quadtree.insert(new Point(0, -1));
      quadtree.insert(new Point(-1, 2));
      var points = quadtree.retrieve(new Box(0, -10, 10, 10));
      expectPoints(points, [new Point(1, 1), new Point(0, -1)]);
    });

    it("Finds 100 points, all within (-10, -10, 10, 10)", function() {
      var x, y;
      for (var i = 0; i < 100; i++) {
        x = Math.random()*20-10;
        y = Math.random()*20-10;
        quadtree.insert(new Point(x, y));
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
        quadtree.insert(new Point(x, y));
      }
      var points = quadtree.retrieve(new Box(-5, -10, 10, 10));
      (points).should.have.length(75);
    });

    // it("Works on large trees.  Properly searches 360000 points, finding 3000.", function() {
    //   var startTime = Date.now();
    //   var points = bigFilledQuadtree.retrieve(new Box(220, 280, 319, 309));
    //   (points.length).should.equal(3000);
    //   (Date.now() - startTime).should.be.below(300);
    // });
  });

  describe("should have a findNearestPointTo method", function() {
    it("If quadtree is empty, returns null", function() {
      var point = quadtree.findNearestPointTo(new Point(0, 0));
      should.equal(point, null);
    });

    it("If quadtree contains only 1 point, (0, 0), finds that point, with a query of (0, 0).", function() {
      quadtree.insert(new Point(0, 0));
      var point = quadtree.findNearestPointTo(new Point(0, 0));
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains only 1 point, (0, 0), finds that point, with a query of (1, 1).", function() {
      quadtree.insert(new Point(0, 0));
      var point = quadtree.findNearestPointTo(new Point(1, 1));
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains 2 points, (0, 0) and (5, 5), finds (0, 0) with a query of (0, 0)", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(5, 5));
      var point = quadtree.findNearestPointTo(new Point(0, 0));
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains 2 points, (0, 0) and (5, 5), finds (0, 0) with a query of (1, 1)", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(5, 5));
      var point = quadtree.findNearestPointTo(new Point(1, 1));
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains 4 points, (0, 0), (5, 0), (0, 5), and (5, 5), finds (5, 0) as the closest to (3, 2)", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(5, 0));
      quadtree.insert(new Point(0, 5));
      quadtree.insert(new Point(5, 5));
      var point = quadtree.findNearestPointTo(new Point(3, 2));
      expectPoint(point, 5, 0);
    });

    it("If the quadtree has all points with x and y between 0 and 99, finds (100, 99) as the closest point to (1000, 99)", function() {
      var point = bigFilledQuadtree.findNearestPointTo(new Point(1000, 349));
      expectPoint(point, 100, 100);
    });

    it("If the quadtree has all points with x and y between 0 and 99, finds (100, 99) as the closest point to (99.9, 99)", function() {
      var point = bigFilledQuadtree.findNearestPointTo(new Point(99.9, 99));
      expectPoint(point, 100, 99);
    });

    it("Works quickly. Performs 100 queries for random points (should be under 1000 ms)", function() {
      var startTime = Date.now();
      for (var i = 0; i < 100; i++) {
        var x = (Math.random()*1+999)/10 - 0.05;
        var y = (Math.random()*1+999)/10 - 0.05;
        var point = bigFilledQuadtree.findNearestPointTo(new Point(x, y));
        expectPoint(point, Math.round(x), Math.round(y));
      }
      (Date.now() - startTime).should.be.below(1000);
    });
  });
});

var expectPoints = function(actual, expected) {
  (actual).should.have.length(expected.length);
  actual = actual.sort(pointsArrayComparator);
  expected = expected.sort(pointsArrayComparator);
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
    expected = new Point(arguments[1], arguments[2]);
  }
  (actual).should.be.an.instanceof(Point);
  (Object.keys(actual)).should.have.length(2);
  (actual.x).should.equal(expected.x);
  (actual.y).should.equal(expected.y);
};
