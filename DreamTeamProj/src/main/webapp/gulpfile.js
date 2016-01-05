var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    wiredep = require('wiredep').stream,
    ngAnnotate = require('gulp-ng-annotate');

var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),

    livereloadport = 35729,
    serverport = 5000;

var server = express();
server.use(livereload({port: livereloadport}));
server.use(express.static('./dist'));
server.all('/*', function(req, res) {
    res.sendfile('index.html', { root: 'dist' });
});

var distPath = '../WEB-INF/static';

gulp.task('lint', function() {
    gulp.src('./app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    gulp.src(['app/scripts/app.js', 'app/scripts/**/*.js'])
        .pipe(ngAnnotate())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(distPath + '/js'))
        .pipe(refresh(lrserver));
});

gulp.task('watch', function() {
    gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], [
        'lint',
        'scripts'
    ]);
});

gulp.task('index', function() {
    gulp.src('app/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest(distPath + '/'));
});

gulp.task('views', ['index'], function() {
    gulp.src('app/views/**/*')
        .pipe(gulp.dest(distPath + '/views/'))
        .pipe(refresh(lrserver));
});

gulp.watch(['app/index.html', 'app/views/**/*.html'], ['views']);

gulp.task('serve', function() {
    // Start webserver
    server.listen(serverport);
    // Start live reload
    lrserver.listen(livereloadport);
    // Run the watch task, to keep taps on changes
});

// Styles task
gulp.task('styles', function() {
    gulp.src('app/styles/*.scss')
        // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
        .pipe(sass().on('error', sass.logError))
        // Optionally add autoprefixer
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        // These last two should look familiar now :)
        .pipe(concat('main.css'))
        .pipe(gulp.dest(distPath + '/css/'))
        .pipe(refresh(lrserver));
});

gulp.watch('app/styles/**/*.scss', ['styles']);

gulp.task('develop', ['styles', 'scripts', 'views', 'lint', 'serve']);
