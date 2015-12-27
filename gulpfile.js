var gulp = require("gulp");
var concat = require("gulp-concat");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var runSequence = require('run-sequence');

var typescriptProject = ts.createProject({
  target: "ES5",
  removeComments: true,
  sortOutput: true,
  module:'commonjs',
  "sourceMap": true
});

gulp.task("typescript",function(){
  runSequence('tsc', 'browserify');
});

gulp.task("tsc",function(){
  return gulp.src(['src/**/*.ts','!./typings'])
  .pipe(ts(typescriptProject, {referencedFrom: ['main.ts']}))
  .js
  .pipe(babel())
  .pipe(gulp.dest('build'));
});

gulp.task("browserify",function(){
  return browserify({
            entries: "./build/main.js"
          })
      .bundle()
      .pipe(source("bundle.js")) // <- ここで vinyl になる！
      .pipe(gulp.dest("public"));
});

gulp.task("static",function(){
  return gulp.src('src/**/*.{html,css,jpeg,wav,mp3}').pipe(gulp.dest('public'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./public",
            index  : "index.html"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task("build",["typescript","static","bs-reload"]);

gulp.task("watch",function(){
  gulp.watch("src/**/*.ts",["build"]);
});

gulp.task("default", ["build","watch","browser-sync"]);
