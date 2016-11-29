const gulp = require('gulp');
const gutil = require("gulp-util");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const WebpackDevServer = require("webpack-dev-server");
const connect = require('gulp-connect');
const spawn = require('child_process').spawn;
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
var node;

gulp.task('riot', () => {
  return gulp.src('ui/index.js')
    .pipe(plumber({ errorHandler: function(err) {
              notify.onError({
                  title: "Gulp error in " + err.plugin,
                  message:  err.toString()
              })(err);
          }}))
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('ui/dist/'))
    .pipe(connect.reload());
});

gulp.task('riot:watch', ()=>{
  snode();
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

function snode() {
  if (node) node.kill()
  node = spawn('node', ['snode/index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
}

process.on('exit', function() {
    if (node) node.kill()
})