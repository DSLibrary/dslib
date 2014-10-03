'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');

var source = require('vinyl-source-stream');
var browserify = require('browserify');

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
    .on( 'end', cb);
  });
});

gulp.task('coveralls', function(cb){
  return gulp.src('./coverage/lcov.info')
  .pipe(coveralls());
});

gulp.task('watch', function(){
  gulp.watch('./dataStructures/**', ['test']);
  gulp.watch('./tests/**', ['test']);
});

gulp.task('browserify', function () {
  return browserify({
    entries: "./index.js",
    standalone: "dslib"
  })
    .bundle()
    .pipe(source('dslib.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['watch']);

// add uglifyjs compression here when we figure that out
gulp.task('dist', ['browserify']);
