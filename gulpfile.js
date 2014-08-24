'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('mocha', function(){
  return gulp.src('tests/*.js', {read: false})
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', function(){
  gulp.watch('./dataStructures/**', ['mocha']);
  gulp.watch('./tests/**', ['mocha']);

});

gulp.task('default', ['watch']);