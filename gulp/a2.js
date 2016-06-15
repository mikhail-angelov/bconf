const gulp = require('gulp');
const clientBuildTask = require('./client_build');
const config = require('./config/index').client;
const serve = require('gulp-serve');
const runSequence =require('run-sequence');
const less = require('gulp-less');

gulp.task('client-build-dist', clientBuildTask(true));
gulp.task('html:ui', function(){
  gulp.src(config.indexHtml)
    .pipe(gulp.dest(config.destination))
});
gulp.task('css:ui', ()=>{
  gulp.src(config.less)
    .pipe(less())
    .pipe(gulp.dest(config.destination))
});
gulp.task('serve:ui', serve({
    root: [config.destination],
    port: 8000
}));

gulp.task('a2',cb => {
  runSequence(['client-build-dist', 'html:ui', 'serve:ui', 'css:ui', 'watch:ui'], cb);
});

gulp.task('watch:ui',() => {
  console.log('on watch')
  gulp.watch(config.app, ['client-build-dist'])
});