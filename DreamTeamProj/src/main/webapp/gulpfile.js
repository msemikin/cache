var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    ngAnnotate = require('gulp-ng-annotate'),
    eslint = require('gulp-eslint'),
    mainBowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    print = require('gulp-print'),
    wiredep = require('wiredep').stream,
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    modRewrite = require('connect-modrewrite'),

    serverport = 5000,
    distPath = './WEB-INF/static';

gulp.task('lint', function() {
    gulp.src('./app/scripts/**/*.js')
        .pipe(eslint({
            extends: 'eslint:recommended',
            rules: {
                'strict': [2, 'global']
            },
            globals: {
                jQuery: false,
                window: false,
                angular: false,
                '$': false,
                '_': false,
                canvg: false,
                Ladda: false
            },
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.formatEach('compact', process.stderr));
});

gulp.task('vendor', function() {
    var jsFilter = gulpFilter(['**/*.js'], {restore: true});
    var stylesFilter = gulpFilter([ '**/*.css'], {restore: true});

    gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(distPath + '/js/'))
        .pipe(jsFilter.restore)
        .pipe(stylesFilter)
        .pipe(print())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(distPath + '/css'));
});

gulp.task('scripts', function() {
    gulp.src(['app/scripts/**/*.js'])
        .pipe(ngAnnotate())
        .pipe(gulp.dest(distPath + '/scripts'));
});

gulp.task('copy-bower', function() {
    gulp.src(['app/bower_components/**/*'])
        .pipe(gulp.dest(distPath + '/bower_components'));
});

gulp.task('watch', function() {
    gulp.watch(['app/scripts/**/*.js'], ['lint', 'scripts']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch(['app/**/*.html'], ['views']);
});

gulp.task('inject', ['copy-bower'], function() {
    var sources = gulp.src(['./app/scripts/**/*.js'], {relative: true});
    gulp.src('./app/index.html')
        .pipe(wiredep({
            exclude: [/underscore/]
        }))
        .pipe(inject(sources, {ignorePath: 'app/', addRootSlash: false}))
        .pipe(gulp.dest(distPath + '/'));
});

gulp.task('views', ['inject'], function() {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest(distPath + '/'));
    browserSync.reload();
});


gulp.task('serve', ['styles', 'views',  'scripts', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: distPath,
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });

    gulp.watch(distPath + '/**/*.js').on('change', browserSync.reload);
    gulp.watch(distPath + '/**/*.html').on('change', browserSync.reload);
});

// Styles task
gulp.task('styles', function() {
    gulp.src('app/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(distPath + '/css/'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function() {
    gulp.src(distPath + '/').pipe(clean());
});

gulp.task('develop', ['serve'], function() {});
