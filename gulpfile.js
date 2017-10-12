/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict'

/********************************************************
 *                       PACKAGES                       *
 ********************************************************/
var gulp = require('gulp');

// JS error logger
var jshint = require('gulp-jshint');

// Sass compiler
var sass = require('gulp-sass');

// Compressors
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cleancss = require('gulp-clean-css');

// Forwards errors and handles exceptions properly. Destination files cleanup.
var pump = require('pump');

/********************************************************
 *                        TASKS                         *
 ********************************************************/
gulp.task('default', ['jshint', 'sass', 'compress'], function () {
    // Default task
});

// Watch task: js lint, sass,
gulp.task('watch', function() {
   gulp.watch('raw/*.js', ['jshint']);
   gulp.watch('raw/*.scss', ['sass']);
});

// jshint lint task
gulp.task('jshint', function() {
  return gulp.src('raw/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// sass task to build CSS
gulp.task('sass', function () {
  return gulp.src('raw/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('min'));
});

// Compresses raw JS, HTML, and CSS source files
gulp.task('compress', ['js-compress', 'html-compress', 'css-compress']);

// Compresses raw JS source files
gulp.task('js-compress', function (cb) {
    pump([
        gulp.src('raw/*.js'),
        uglify(),
        gulp.dest('min')
    ],
    cb
  );
});

// Compresses raw HTML source files
gulp.task('html-compress', function (cb) {
    pump([
        gulp.src('raw/*.html'),
        htmlmin({collapseWhitespace: true}),
        gulp.dest('min')
    ],
    cb
  );
});

// Compresses raw CSS source files
gulp.task('css-compress', function (cb) {
    pump([
        gulp.src('raw/*.css'),
        cleancss(),
        gulp.dest('min')
    ],
    cb
  );
});
