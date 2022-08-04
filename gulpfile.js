var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');

var files = {
  js: ['index.js', 'lib/**/*.js', 'routes/**/*.js', 'public/**/*.js'],
  html: ['public/**/*.html'],
  css: ['public/**/*.css'],
  scss: ['public/**/*.scss', 'public/**/*.sass'],
  test: ['./test/**/*.js']
};

gulp.task('build', function() {
  return gulp.src('www/js/app.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    })).pipe(gulp.dest('test/'));
});

gulp.task('jshint:test', function(){
  return gulp.src(files.test)
    .pipe(jshint({
      node: true,
      globals: {
        describe: true,
        it: true,
        before: true,
        after: true
      }
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:app', function(){
  return gulp.src(files.js)
    .pipe(jshint({
    })).pipe(jshint.reporter('default'));
});

gulp.task('mocha:test', function(){
  return gulp.src(files.test)
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

// gulp.task('watch:html', function() {
//   gulp.watch(files.html, []);
// });
// gulp.task('watch:css', function() {});
// gulp.task('watch:js', function() {});

// gulp.task('watch', []);
gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('mocha', ['mocha:test']);
gulp.task('default', ['jshint', 'mocha:test']);

gulp.doneCallback = function(err) {
  process.exit(err ? 1 : 0);
};