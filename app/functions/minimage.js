var fs = require('fs');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
// var path = require('path');


module.exports = function resize(srcpath,destpath,width) {
  gulp.src(srcpath)
  .pipe(imageResize({
    width: width
    // height: 400
      //      crop: true
  }))
  .pipe(imagemin({
      optimizationLevel: 5
    }))
  .pipe(gulp.dest(destpath));
}
