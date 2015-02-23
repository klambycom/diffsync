var gulp = require('gulp');
var to5 = require('gulp-6to5');
var browserify = require('gulp-browserify');

var paths = {
  js:       './src/**/*.js',
  dist:     './dist',
  example:  {
    html:   './example/client.html',
    js:     './example/client.js',
    server: './example/server.js',
    dist:   './dist/example'
  }
};

gulp.task('6to5', function () {
  return gulp.src(paths.js)
    .pipe(to5())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('example:browserify', function () {
  return gulp.src(paths.example.js)
    .pipe(browserify({ transform: '6to5ify', debug: true }))
    .pipe(gulp.dest(paths.example.dist));
});

gulp.task('example:copyhtml', function () {
  return gulp.src(paths.example.html)
    .pipe(gulp.dest(paths.example.dist));
});

gulp.task('example:copyserver', function () {
  return gulp.src(paths.example.server)
    .pipe(gulp.dest(paths.example.dist));
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['6to5', 'example']);
  gulp.watch(paths.example.js, ['example']);
  gulp.watch(paths.example.server, ['example:copyserver']);
});

gulp.task('example', ['example:browserify', 'example:copyhtml', 'example:copyserver']);
gulp.task('default', ['6to5']);
