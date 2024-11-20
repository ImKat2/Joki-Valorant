const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');

// Paths
const paths = {
    html: 'src/*.html',
    css: 'src/css/*.css',
    js: 'src/js/*.js',
    images: 'src/images/**/*',
    dist: 'dist/'
};

// Clean 'dist' folder
function clean() {
    return del([paths.dist]);
}

// Minify HTML
function minifyHTML() {
    return gulp.src(paths.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.dist));
}

// Minify CSS
function minifyCSS() {
    return gulp.src(paths.css)
        .pipe(cssnano())
        .pipe(gulp.dest(paths.dist + 'css/'));
}

// Minify JavaScript
function minifyJS() {
    return gulp.src(paths.js)
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + 'js/'));
}

// Optimize Images
function optimizeImages() {
    return gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist + 'images/'));
}

// Watch for changes
function watchFiles() {
    gulp.watch(paths.html, minifyHTML);
    gulp.watch(paths.css, minifyCSS);
    gulp.watch(paths.js, minifyJS);
    gulp.watch(paths.images, optimizeImages);
}

// Define tasks
const build = gulp.series(clean, gulp.parallel(minifyHTML, minifyCSS, minifyJS, optimizeImages));
const watch = gulp.series(build, watchFiles);

exports.clean = clean;
exports.build = build;
exports.watch = watch;
