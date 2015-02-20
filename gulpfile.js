var gulp = require('gulp');
var to5 = require('gulp-6to5');
var browserify = require('gulp-browserify');

var paths = {
  js:       './src/**/*.js',
  dist:     './dist',
  example:  {
    html: './example/client.html',
    js:   './example/**/*.js',
    dist: './dist/example'
  }
};

gulp.task('6to5', function () {
  return gulp.src(paths.js)
    .pipe(to5())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('example:browserify', function () {
  return gulp.src(paths.example.js)
    .pipe(browserify({ debug: true }))
    .pipe(gulp.dest(paths.example.dist));
});

gulp.task('example:copyhtml', function () {
  return gulp.src(paths.example.html)
    .pipe(gulp.dest(paths.example.dist));
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['6to5']);
});

gulp.task('example', ['example:browserify', 'example:copyhtml']);
gulp.task('default', ['6to5']);
