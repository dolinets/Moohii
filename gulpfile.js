//gulp clean
var gulp = require('gulp');

var clean = require('gulp-clean');
gulp.task('clean', function () {
    return gulp.src('build', {
            read: false
        })
        .pipe(clean());
});

//gulp minify
var uglify = require('gulp-uglify');
gulp.task('minify', function () {
    gulp.src('public_html/script.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

//gulp css-autoprefixer
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css-autoprefixer', () =>
    gulp.src('public_html/style.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('build'))
);

//gulp compress
var imagemin = require('gulp-imagemin');

gulp.task('compress', function () {
    gulp.src('public_html/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});


//gulp compress1
var imagemin = require('gulp-imagemin');

gulp.task('compress1', function () {
    gulp.src('public_html/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});


//gulp images
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');

// Images optimization and copy in /dist
gulp.task('images', function () {
    return gulp.src('public_html/images/**/*.*')
        .pipe(cache(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imageminJpegRecompress({
                loops: 5,
                min: 65,
                max: 70,
                quality: 'medium'
            }),
            imagemin.svgo(),
            imagemin.optipng({
                optimizationLevel: 3
            }),
            pngquant({
                quality: '65-70',
                speed: 5
            })
        ], {
            verbose: true
        })))
        .pipe(gulp.dest('build/images'));
});

// Clearing the cache
gulp.task('clear', function (done) {
    return cache.clearAll(done);
});