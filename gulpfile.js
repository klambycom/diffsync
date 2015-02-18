var gulp = require('gulp');
var to5 = require('gulp-6to5');

var paths = {
  js:   './src/**/*.js',
  dist: './dist'
};

gulp.task('6to5', function () {
  return gulp.src(paths.js)
    .pipe(to5())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['6to5']);
});

gulp.task('default', ['6to5']);
