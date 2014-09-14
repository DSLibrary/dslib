'use strict';

var should   = require('chai').should();
var Tree     = require('../dataStructures/n-tree.js');

describe("n-tree", function() {

  var randomCoords = function(n, tree){
    for(var j=0; j<n; j++){
      //define some coordinates
      var coords = new Array(tree.maxima.length);
      for(var i=0; i<tree.maxima.length; i++){
        coords[i] = ((Math.random()*(tree.maxima[i]-tree.minima[i])) + tree.minima[i]);
      }

      var value = JSON.stringify(coords); //define a value

      tree.insert(coords, value); //insert it
    }
  };

  var getDistance = function(a, b){
    var sumSq = 0;
    for(var i=0; i<a.length; i++){
      sumSq += Math.pow(a[i] - b[i], 2);
    }
    return Math.sqrt(sumSq);
  };

  describe('getRelativeVector', function() {
    it('should return the correct relative direction from a point', function() {
      var n = new Tree([10, 10], [0, 0], 1);

      n.getRelativeVector([1, 1]).should.equal(0);
      n.getRelativeVector([6, 1]).should.equal(1);
      n.getRelativeVector([1, 6]).should.equal(2);
      n.getRelativeVector([6, 6]).should.equal(3);
    });

    it('should work with one-dimensional coordinate sets', function() {
      var n = new Tree([10], [0], 1);

      n.getRelativeVector([1]).should.equal(0);
      n.getRelativeVector([6]).should.equal(1);
    });

    it('should work with n-dimensional coordinate sets', function() {
      var n = new Tree([10, 10, 10, 10], [-10 ,-10, -10, -10], 1);

      n.getRelativeVector([-1, -1, -1, -1]).should.equal(0);
      n.getRelativeVector([1, -1, -1, -1]).should.equal(1);
      n.getRelativeVector([-1, 1, -1, -1]).should.equal(2);
      n.getRelativeVector([-1, -1, 1, -1]).should.equal(4);
      n.getRelativeVector([-1, -1, -1, 1]).should.equal(8);
      n.getRelativeVector([1, 1, -1, -1]).should.equal(3);
      n.getRelativeVector([-1, 1, 1, -1]).should.equal(6);
      n.getRelativeVector([1, -1, -1, 1]).should.equal(9);
      n.getRelativeVector([10, 10, 10, 10]).should.equal(15);
    });
  });

  describe('prototype.insert', function(){
    it('should insert into the correct position', function(){
      var n = new Tree([10, 10], [0, 0], 2);
      n.insert([1, 1], "value1");
      n.insert([1, 7.5], "value2");

      (n.children[0].values[0].value).should.equal('value1');
      (n.children[1] === undefined).should.equal(true);
      (n.children[2].values[0].value).should.equal('value2');
      (n.children[3] === undefined).should.equal(true);
      (n.children[4] === undefined).should.equal(true);
    });

    it('should nest correctly', function(){
      var n = new Tree([10, 10], [0, 0], 2);
      n.insert([1, 1], "value1");
      n.insert([1, 2], "value2");
      n.insert([1.1, 2.1], "value3");

      (n.children[0].children[0].children[0].values[0].value).should.equal('value1');
      (n.children[0].children[0].children[2].values[0].value).should.equal('value2');
    });
  });

  describe('value iteration function', function(){
    it('should find the correct number of points', function(){
      var n = new Tree([100, 100], [0, 0], 4);
      randomCoords(1000, n);

      var valueCounter = 0, proximityCounter = 0;
      n.each([100, 100], [0, 0], function(item){
        valueCounter++;
      });

      valueCounter.should.equal(1000);

      n.each([50, 50], [0, 0], function(item){
        proximityCounter++;
      });

      proximityCounter.should.be.within(150, 350);

    });

    it('should pass some reasonable (100,000-insertion) stress tests', function(){
      var n = new Tree([100, 100], [0, 0], 10);

      var start = new Date();
      randomCoords(100000, n);

      var insertionComplete = new Date();

      var valueCounter = 0, proximityCounter = 0;
      n.each([100, 100], [0, 0], function(item){
        valueCounter++;
      });

      var iterationComplete = new Date();
      var insertionTime = insertionComplete - start;
      var iterationTime = iterationComplete - insertionComplete;

      valueCounter.should.equal(100000);
      insertionTime.should.be.lessThan(2500);
      iterationTime.should.be.lessThan(250);

    });
  });

  describe('leaf iteration function', function(){

    it('should find the correct number of leaves', function(){
      var n = new Tree([10, 10], [0, 0], 2);

      n.insert([1, 1], '[1, 1]');
      n.insert([1, 7], '[1, 7]');
      n.insert([1, 8], '[1, 8]');
      n.insert([1, 9], '[1, 9]');

      var leafCounter = 0;
      n.eachLeaf([10, 10], [0, 0], function(leaf){
        leafCounter++;
      });

      leafCounter.should.equal(3);

    });

    it('should rearrange the tree accurately', function(){

    });

  });

  describe('leaf iteration function performance', function(){

    var n = new Tree([10, 10, 10, 10], [0, 0, 0, 0], 4);
    randomCoords(10000, n);
    var leafCounter = 0;

    it('should take a reasonable amount of time to re-build the tree', function(){
      var start = new Date();

      var m = new Tree([10, 10, 10, 10], [0, 0, 0, 0], 4);
      n.each([10, 10, 10, 10], [0, 0, 0, 0], function(item){
        m.insert(item.coords, item.value);
        leafCounter++;
      });

      var time = new Date() - start;

      leafCounter.should.equal(10000);
      time.should.be.lessThan(300);

    });

    it('should perform collision detection in a reasonable amount of time', function(){

      var start = new Date();

      n.eachLeaf([10, 10, 10, 10], [0, 0, 0, 0], function(leaf){
        var checked = {};

        for(var i=0; i<leaf.values.length; i++){
          for(var j=1; j<leaf.values.length; j++){

            if(i !== j){
              var key = i.toString(10) + j.toString(10);
              var keyInverse = j.toString(10);

              if(!Object.hasOwnProperty(key)){
                checked[key] = 1;
                checked[keyInverse] = 1;
                var distance = getDistance(leaf.values[i].coords, leaf.values[j].coords);
              }

            }

          }
        }
      });

      var time = new Date() - start;
      time.should.be.lessThan(50);

    });

  });


});
