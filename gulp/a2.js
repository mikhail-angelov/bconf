let gulp = require('gulp');
let clientBuildTask = require('./client_build');
let config = require('./config/index').client;
let serve = require('gulp-serve');

gulp.task('client-build-dist', clientBuildTask(true));
gulp.task('html-ui', function(){
  gulp.src(config.indexHtml)
    .pipe(gulp.dest(config.destination))
});
gulp.task('serve-ui', serve({
    root: [config.destination],
    port: 8000
}));