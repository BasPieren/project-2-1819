const gulp = require('gulp'),
      concat = require('gulp-concat'),
      cssnano = require('gulp-cssnano'),
      baseDir = 'public/css/'

gulp.src([
  baseDir + 'style.css'
])
  .pipe(concat('style-min.css'))
  .pipe(cssnano({ discardComments: { removeAll:true }}))
  .pipe(gulp.dest('public/css/'))
