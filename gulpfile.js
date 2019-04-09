"use strict";

let gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	exec = require("gulp-exec"),
	browserSync = require('browser-sync').create(),
	cp = require("child_process");
;

sass.compiler = require("node-sass");

gulp.task("scss", function () {
	return gulp.src('_assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./docs/css/'))
		.pipe(browserSync.stream({ match: '**/*.css' }))
		;
});

gulp.task("js", function () {
	return gulp.src('_assets/js/**/*.js')
		.pipe(gulp.dest('./docs/js/'))
		.pipe(browserSync.stream({ match: '**/*.js' }))
		;
});

gulp.task("img", function () {
	return gulp.src('_assets/img/**/*.jpg')
		.pipe(gulp.dest('./docs/img/'))
		.pipe(browserSync.stream({ match: '**/*.jpg' }))
		;
});

// Jekyll
gulp.task("jekyll", function () {
	try {
		return cp.exec("jekyll build");
	} catch (error) {
		return error;
	}
	
});

gulp.task("watch", function () {

	browserSync.init({
		server: {
			baseDir: "./docs/"
		}
	});

	gulp.watch('_assets/scss/**/*.scss', gulp.series('scss'));

	gulp.watch('_assets/js/**/*.js', gulp.series('js'));

	gulp.watch('_assets/img/**/*.jpg', gulp.series('img'));


	gulp.watch(
		[
			"./*.html",
			"./_includes/*.html",
			"./_layouts/*.html",
			"./_site/*.html",
			"./views/*.html",
			"./views/games/*.html"
		],
		{ 
			events: "change", delay: 500 
		},
		gulp.series('jekyll', 'scss', 'js', 'img'));


	gulp.watch('docs/**/*.html').on('change', browserSync.reload);
	gulp.watch('docs/**/*.js').on('change', browserSync.reload);
	gulp.watch('docs/**/*.jpg').on('change', browserSync.reload);

});

gulp.task("default", gulp.series('jekyll', 'scss', 'js', 'img', 'watch'));
