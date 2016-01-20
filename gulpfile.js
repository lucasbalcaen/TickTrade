/**
 * Created by lucas on 20/01/2016.
 */

var gulp = require("gulp"),
    csslint = require("gulp-csslint"),
    cssMinifier = require("gulp-minify-css"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    less = require("gulp-less"),
    notify = require("gulp-notify"), //dit zijn allemaal modules
    jshint = require("gulp-jshint"),
    jsStylish = require("jshint-stylish"),
    uglify = require("gulp-uglify");

gulp.task("css",function(){

    gulp.src("./public/less/**/*.less")
        .pipe(less())
        .pipe(csslint(
            {
                'ids': false
            }
        ))
        .pipe(sourcemaps.init())
        .pipe(cssMinifier())
        .pipe(concat("ticktrade.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/dist/css"))
        .pipe(notify({
            message: "css built"
        }));

});

gulp.task("js",function(){
    gulp.src(["./public/js/**/*.js","./public/controllers/**/*.js"]) //array van files
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        .pipe(concat("ticktrade.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/dist/js"))
        .pipe(notify({message:"js built"}));
});