const gulp = require('gulp');
const gutil = require("gulp-util");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const WebpackDevServer = require("webpack-dev-server");

gulp.task('riot', () => {
  return gulp.src('ui/index.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('ui/dist/'));
});

gulp.task('riot:watch', ()=>{
  gulp.watch(['ui/**/*.tag','ui/index.js','ui/router.js','ui/services/*.js'], ['riot']);
})

gulp.task('dev', ['riot','riot:watch','wr'], function() {
	gutil.log('done');
});

gulp.task("wr", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: "/ui",
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});