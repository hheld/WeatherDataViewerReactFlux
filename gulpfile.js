/* jshint node: true */

var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    reactify    = require('reactify'),
    streamify   = require('gulp-streamify');

var path = {
    CSS: ['./css/app.css'],
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: 'dist',
    DEST_BUILD: 'dist/build',
    DEST_SRC: 'dist/src',
    ENTRY_POINT: './js/app.js'
};

gulp.task('copy', ['copyCss']);

gulp.task('watch', function() {
    gulp.watch(path.CSS, ['copyCss']);

    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function() {
        watcher.bundle()
            .on('error', swallowError)
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC));
        console.log('Updated');
    }).bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function() {
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('production', ['build', 'copyCss']);
gulp.task('default', ['watch', 'copyCss']);

gulp.task('copyCss', function() {
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST + '/css'));
});

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}
