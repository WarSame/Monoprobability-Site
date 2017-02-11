var gulp = require("gulp");
var sass = require("gulp-sass");
var nodemon = require("gulp-nodemon");

gulp.task("css", function(){
  gulp.src("public/sass/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("public/css"))
});

gulp.task("default", function(){
  gulp.watch("public/sass/*.sass",["css"])
});

nodemon({script: 'server.js'}).on('restart', function(){
//Lint and browserify in here if wanted
});
