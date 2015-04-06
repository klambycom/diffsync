var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var markdox = require('gulp-markdox');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

var paths = {
  js:       'src/**/*.js',
  dist:     'dist',
  docs:     'docs',
  tests:    'test/**/*_test.js',
  example:  {
    html:   'example/index.html',
    js:     'example/client.js',
    server: 'example/server.js',
    dist:   'dist/example'
  }
};

gulp.task('babel', function () {
  return gulp.src(paths.js)
    .pipe(babel())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('example:browserify', function () {
  return gulp.src(paths.example.js)
    .pipe(browserify({ transform: ['babelify'], debug: true }))
    .pipe(gulp.dest(paths.example.dist));
});

gulp.task('example:copyhtml', function () {
  return gulp.src(paths.example.html)
    .pipe(gulp.dest(paths.example.dist));
});

gulp.task('example:copyserver', function () {
  return gulp.src(paths.example.server)
    .pipe(babel())
    .pipe(gulp.dest(paths.example.dist));
});

gulp.task('docs', function () {
  return gulp.src(paths.js)
    .pipe(markdox())
    .pipe(rename({ extname: '.markdown' }))
    .pipe(gulp.dest(paths.docs));
});

gulp.task('server:start', ['example:copyserver'], function () {
  nodemon({
    script: 'dist/example/server.js',
    watch: [
      'dist/document.js',
      'dist/edits.js',
      'dist/server.js',
      'dist/storage_driver.js'
    ],
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('jasmine', function () {
  return gulp.src(paths.tests)
    .pipe(jasmine());
});

gulp.task('test:watch', function () {
  gulp.watch([paths.js, paths.tests], ['jasmine']);
});

gulp.task('lint', function () {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('setup:hooks', function () {
  return gulp.src('pre-push')
    .pipe(gulp.dest('.git/hooks/'));
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['babel', 'example', 'docs']);
  gulp.watch(paths.example.js, ['example']);
  gulp.watch(paths.example.server, ['example:copyserver']);
  gulp.watch(paths.example.html, ['example:copyhtml']);
});

gulp.task('example', ['example:browserify', 'example:copyhtml', 'example:copyserver']);
gulp.task('test', ['lint', 'jasmine']);
gulp.task('default', ['babel']);
