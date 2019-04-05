"use strict";

let gulp = require("gulp"),
	autoprefixer = require("gulp-autoprefixer"),
	exec = require("gulp-exec"),
	browserSync = require('browser-sync').create(),
	cp = require("child_process");
;

gulp.task("css", function() {
	return gulp.src( '_assets/css/**/*.css' )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( './docs/css/' ) )
		.pipe( browserSync.stream({ match: '**/*.css' }))
	;
});

gulp.task("js", function() {
	return gulp.src( '_assets/js/**/*.js' )
		.pipe( gulp.dest( './docs/js/' ) )
		.pipe( browserSync.stream({ match: '**/*.js' }))
	;
});

gulp.task("img", function() {
	return gulp.src( '_assets/img/**/*.jpg' )
		.pipe( gulp.dest( './docs/img/' ) )
		.pipe( browserSync.stream({ match: '**/*.jpg' }))
	;
});

// Jekyll
gulp.task("jekyll", function() {
	return cp.exec("jekyll build");
	//return cp.spawn("bundle", ["jekyll", "build"], { stdio: "inherit" });
});

gulp.task("watch", function() {

	browserSync.init({
		server: {
            baseDir: "./docs/"
		}
	});

	gulp.watch( '_assets/css/**/*.css', gulp.series('css') );

	gulp.watch( '_assets/js/**/*.js', gulp.series('js') );

	gulp.watch( '_assets/img/**/*.jpg', gulp.series('img') );

	gulp.watch(
		[
			"./*.html",
			"./_includes/*.html",
			"./_layouts/*.html",
			"./_site/*.html",
			"./views/*.html",
			//"./_posts/**/*.*"
		],
	).on('change', gulp.series('jekyll', 'css', 'js', 'img'));

	gulp.watch( 'docs/**/*.html' ).on('change', browserSync.reload );
	gulp.watch( 'docs/**/*.js' ).on('change', browserSync.reload );
	gulp.watch( 'docs/**/*.jpg' ).on('change', browserSync.reload );

});

gulp.task("default", gulp.series('jekyll', 'css', 'js', 'img', 'watch'));
