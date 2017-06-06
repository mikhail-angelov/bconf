const gulp = require('gulp');
const gutil = require("gulp-util");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const WebpackDevServer = require("webpack-dev-server");
const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');
const spawn = require('child_process').spawn;
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
var node;

gulp.task('riot', () => {
  return gulp.src('ui/index.js')
    .pipe(plumber({ errorHandler: function(err) {
              notify.onError({
                  title: 'Gulp error in ' + err.plugin,
                  message:  err.toString()
              })(err);
          }}))
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('assets',()=>{
  return gulp.src(['ui/index.html','ui/assets/**'])
  .pipe(gulp.dest('dist/'))
})

gulp.task('dist', ['riot', 'assets'])

gulp.task('riot:watch', ()=>{
  snode();
  return gulp.watch(['ui/**/*.*','ui/*.*'], ['riot']);
})

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 9002,
    livereload: true,
    middleware: function(connect, opt) {
            return [
                proxy(['/api/**', '/auth/**'], {
                    target: 'http://localhost:9000',
                    changeOrigin:true
                })
            ]
        }
  });
});

gulp.task('dev', ['connect', 'riot','riot:watch'], function() {
	gutil.log('done');
});

function snode() {
  if (node) node.kill()
  node = spawn('node', ['snode/index.fake.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
}

process.on('exit', function() {
    if (node) node.kill()
})