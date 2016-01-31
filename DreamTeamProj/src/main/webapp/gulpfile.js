var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    mainBowerFiles = require('main-bower-files'),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync'),
    modRewrite = require('connect-modrewrite'),

    distPath = './WEB-INF/static';

gulp.task('lint', function() {
    gulp.src('./app/scripts/**/*.js')
        .pipe($.eslint({
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
        .pipe($.eslint.formatEach('compact', process.stderr));
});

gulp.task('vendor', function() {
    var jsFilter = $.filter(['**/*.js'], {restore: true});
    var stylesFilter = $.filter([ '**/*.css'], {restore: true});

    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(distPath + '/js/'))
        .pipe(jsFilter.restore)
        .pipe(stylesFilter)
        .pipe($.print())
        .pipe($.concat('vendor.css'))
        .pipe(gulp.dest(distPath + '/css'));
});

gulp.task('scripts', ['inject'], function() {
    return gulp.src(['app/scripts/**/*.js'])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        //.pipe($.babel({
        //    presets: ['es2015']
        //}))
        .pipe($.ngAnnotate())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(distPath + '/scripts'));
});

gulp.task('copy-bower', function() {
    return gulp.src(['app/bower_components/**/*'])
        .pipe(gulp.dest(distPath + '/bower_components'));
});

gulp.task('watch', function() {
    gulp.watch(['app/scripts/**/*.js', 'app/app.js'], ['js-watch']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch(['app/**/*.html'], ['html-watch']);
});

gulp.task('js-watch', ['scripts'], browserSync.reload);
gulp.task('html-watch', ['views'], browserSync.reload);

gulp.task('inject', ['copy-bower'], function() {
    var sources = gulp.src(['./app/scripts/**/*.js'], {relative: true});
    return gulp.src('./app/index.html')
        .pipe(wiredep({
            exclude: [/underscore/],
            //fileTypes: {
            //    html: {
            //        replace: {
            //            js: '<script src="static/{{filePath}}"></script>',
            //            css: '<link rel="stylesheet" href="static/{{filePath}}" />'
            //        }
            //    }
            //}
        }))
        .pipe($.inject(sources, {
            ignorePath: 'app/',
            //addRootSlash: false,
            //addPrefix: 'static'
        }))
        .pipe(gulp.dest(distPath + '/'));
});

gulp.task('views', ['inject'], function() {
    return gulp.src(['app/**/*.html', '!app/index.html'])
        .pipe(gulp.dest(distPath + '/'));
});


gulp.task('serve', ['styles', 'views',  'scripts', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: distPath,
            middleware: [
                modRewrite([
                    '^[^\\.]*$ /index.html [L]'
                ])
            ]
        }
    });
});

gulp.task('styles', function() {
    return gulp.src('app/styles/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .pipe($.concat('main.css'))
        //.pipe($.uncss({
        //    html: ['app/index.html', 'app/states/**/*.html', 'app/templates/**/*.html'],
        //    report: true
        //}))
        .pipe($.sourcemaps.write())
        .pipe($.print())
        .pipe(gulp.dest(distPath + '/css'))
        .pipe(browserSync.stream())
});

gulp.task('clean', function() {
    return gulp.src(distPath + '/').pipe(clean());
});

gulp.task('develop', ['serve'], function() {});
