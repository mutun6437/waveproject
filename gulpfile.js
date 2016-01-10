var gulp = require("gulp");
var concat = require("gulp-concat");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var runSequence = require('run-sequence');
var nodemon = require("gulp-nodemon");
var tsconfig = require('./tsconfig.json');
var sass = require('gulp-sass');

var typescriptProject = ts.createProject(tsconfig.compilerOptions);

gulp.task("typescript",function(){
  runSequence('tsc', 'browserify');
});

gulp.task("tsc",function(){
  return gulp.src(['src/**/*.{ts,tsx}','!./typings'])
  .pipe(ts(typescriptProject, {referencedFrom: ['main.ts']}))
  .js
  .pipe(babel())
  .pipe(gulp.dest('build'));
});

gulp.task("browserify",function(){
  var browserify = require( 'browserify' );
  var source     = require( 'vinyl-source-stream' );
  var buffer     = require( 'vinyl-buffer' );
  var sourcemaps = require( 'gulp-sourcemaps' );

  return browserify( './build/main.js', { debug: true } )
      .bundle()
      .pipe( source( 'bundle.js' ) )
      .pipe( buffer() )
      .pipe( sourcemaps.init( { loadMaps: true } ) )
      //.pipe( uglify() )
      .pipe( sourcemaps.write( './' ) )
      .pipe( gulp.dest( 'public' ) );
});

gulp.task("static",function(){
  return gulp.src('src/**/*.{html,css,jpeg,wav,mp3,json,xml,js}').pipe(gulp.dest('public'));
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

// gulp.task('browser-sync', function() {
//     browserSync({
//         server: {
//             baseDir: "./public",
//             index  : "index.html"
//         }
//     });
// });

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('sass', function () {
  gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat("style.css"))
    .pipe(gulp.dest('public/style'));
});

gulp.task('sass:watch', function () {
  gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task("build",function(){
  runSequence("typescript","sass","static");
});

gulp.task("watch",function(){
  gulp.watch("src/**/*.{ts,tsx,html,scss}",["build"]);
});

gulp.task("default", ["build","watch","sass:watch","start"]);
