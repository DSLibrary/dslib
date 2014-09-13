'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('test', function(cb){
  gulp.src([
    './dataStructures/**/*.js',
    './index.js'
  ])
  .pipe( istanbul() )
  .on( 'finish', function(){
    gulp.src([
      './tests/**/*.js'
    ])
    .pipe( mocha({ reporter: 'spec' }) )
    .pipe( istanbul.writeReports() ) //stores reports in "coverage" directory
    .on( 'end', function() {
      process.exit( 0 );
    });
  });
});

gulp.task('watch', function(){
  gulp.watch('./dataStructures/**', ['test']);
  gulp.watch('./tests/**', ['test']);
});

gulp.task('default', ['watch']);
