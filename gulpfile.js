'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('mocha', function(){
  return gulp.src('tests/*.js', {read: false})
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', function(){
  gulp.watch('index.js' || 'dataStructures/*.js' || 'tests/*.js', ['mocha']);
});

gulp.task('default', ['mocha']);