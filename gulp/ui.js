const gulp = require('gulp');
const gutil = require("gulp-util");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const WebpackDevServer = require("webpack-dev-server");
const connect = require('gulp-connect');

gulp.task('riot', () => {
  return gulp.src('ui/index.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('ui/dist/'))
    .pipe(connect.reload());
});

gulp.task('riot:watch', ()=>{
  return gulp.watch(['ui/**/*.tag','ui/index.js','ui/router.js','ui/services/**/*.js'], ['riot']);
})

gulp.task('connect', function() {
  connect.server({
    root: 'ui',
    livereload: true
  });
});

gulp.task('dev', ['riot','connect','riot:watch'], function() {
	gutil.log('done');
});
