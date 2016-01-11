var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    mainBowerFiles = require('main-bower-files'),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync'),
    modRewrite = require('connect-modrewrite'),

    distPath = './WEB-INF/static';

gulp.task('lint', function() {
    gulp.src('./app/scripts/**/*.js')
        .pipe(plugins.eslint({
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
        .pipe(plugins.eslint.formatEach('compact', process.stderr));
});

gulp.task('vendor', function() {
    var jsFilter = plugins.filter(['**/*.js'], {restore: true});
    var stylesFilter = plugins.filter([ '**/*.css'], {restore: true});

    gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(distPath + '/js/'))
        .pipe(jsFilter.restore)
        .pipe(stylesFilter)
        .pipe(plugins.print())
        .pipe(plugins.concat('vendor.css'))
        .pipe(gulp.dest(distPath + '/css'));
});

gulp.task('scripts', function() {
    return gulp.src(['app/scripts/**/*.js'])
        .pipe(plugins.ngAnnotate())
        .pipe(gulp.dest(distPath + '/scripts'));
});

gulp.task('copy-bower', function() {
    gulp.src(['app/bower_components/**/*'])
        .pipe(gulp.dest(distPath + '/bower_components'));
});

gulp.task('watch', function() {
    gulp.watch(['app/scripts/**/*.js'], ['js-watch']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch(['app/**/*.html'], ['html-watch']);
});

gulp.task('js-watch', ['lint', 'scripts'], browserSync.reload);
gulp.task('html-watch', ['views'], browserSync.reload);

gulp.task('inject', ['copy-bower'], function() {
    var sources = gulp.src(['./app/scripts/**/*.js'], {relative: true});
    gulp.src('./app/index.html')
        .pipe(wiredep({
            exclude: [/underscore/]
        }))
        .pipe(plugins.inject(sources, {ignorePath: 'app/', addRootSlash: false}))
        .pipe(gulp.dest(distPath + '/'));
});

gulp.task('views', ['inject'], function() {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest(distPath + '/'));
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
});

// Styles task
gulp.task('styles', function() {
    gulp.src('app/styles/*.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .pipe(plugins.concat('main.css'))
        .pipe(gulp.dest(distPath + '/css/'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function() {
    gulp.src(distPath + '/').pipe(clean());
});

gulp.task('develop', ['serve'], function() {});
