var gulp = require('gulp');
var del = require('del');
var gulpsync = require('gulp-sync')(gulp);
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var replace = require('gulp-string-replace');

gulp.task('default', gulpsync.sync([
    'version.update',
    'clean',
    'uglify',
    'zip',
    'copy.to.docs',
]));

var version = '"1.2.3"';
var pattern = /(\"|\')(\d+\.\d+\.\d+)(\"|\')/;

gulp.task('version.update', function() {
    return gulp.src(["./pakka.js", "./bower.json", "./package.json"])
        .pipe(replace(pattern, version))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function() {
    return del.sync(['pakka.min.js', 'pakka.min.js.gz']);
});

gulp.task('uglify', function() {
    return gulp.src('./pakka.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./'));
});

gulp.task('zip', function() {
    return gulp.src('./pakka.min.js')
        .pipe(gzip())
        .pipe(gulp.dest('./'));
});

gulp.task('copy.to.docs', function() {
    return gulp.src([
            './pakka.js',
            './node_modules/lodash/lodash.js'
        ])
        .pipe(gulp.dest('./docs/'));
});
