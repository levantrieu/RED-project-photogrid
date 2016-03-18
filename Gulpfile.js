var gulp = require('gulp');
    uglify = require('gulp-uglify');
    browserSync = require('browser-sync').create();
    plumber = require('gulp-plumber');
    notify = require('gulp-notify');
    rename = require('gulp-rename');
    jscs = require('gulp-jscs');
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    minifyCSS = require('gulp-cssnano');


gulp.task('uglify', function(){
    gulp.src('./js/instagrid.js') // What files do we want gulp to consume?
      .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"
      )}))
      .pipe(jscs())
		  .pipe(jscs.reporter())
      .pipe(uglify())
      .pipe(rename('instagrid.min.js'))
      .pipe(gulp.dest('./build'));// Where do we put the result?
});

gulp.task('sass', function (){
  gulp.src('./scss/style.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function(){

  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['./scss/style.scss'], ['sass']);
  gulp.watch(['./js/instagrid.js'], ['uglify']);
  gulp.watch(['./build/instagrid.js', 'index.html', './scss/style.scss']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'sass', 'uglify']);
