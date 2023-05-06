const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const paths = {
  src: {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    html: 'src/page/**/*.html',
  },
  dist: {
    css: 'dist/css',
    js: 'dist/js',
    html: 'dist/html',
  },
  dev: {
    css: 'dev/css',
    js: 'dev/js',
    html: 'dev/html',
  },
};

// 编译 SCSS 文件为 CSS，并添加浏览器前缀
function compileSass() {
  return gulp
    .src(paths.src.scss)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(gulp.dest(paths.dev.css));
}

// 合并并压缩 JS 文件
function minifyJs() {
  return gulp
    .src(paths.src.js)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(gulp.dest(paths.dev.js));
}

// 压缩 HTML 文件，并在其中包含其他文件
function minifyHtml() {
  return gulp
    .src(paths.src.html)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(fileinclude({ prefix: '@@', basepath: __dirname + '/src/tpl/'  }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist.html))
    .pipe(gulp.dest(paths.dev.html));
}

// 清理 dist 文件夹
function cleanDist() {
  return gulp.src('dist', { allowEmpty: true, read: false }).pipe(clean());
}

// 清理 dev 文件夹
function cleanDev() {
  return gulp.src('dev', { allowEmpty: true, read: false }).pipe(clean());
}

// 监听文件变化
function watchFiles() {
  gulp.watch(paths.src.scss, compileSass);
  gulp.watch(paths.src.js, minifyJs);
  gulp.watch(paths.src.html, minifyHtml);
}

// 开发模式任务
gulp.task('dev', gulp.series(cleanDev, gulp.parallel(compileSass, minifyJs, minifyHtml), watchFiles));

// 构建模式任务
gulp.task('build', gulp.series(cleanDist, gulp.parallel(compileSass, minifyJs, minifyHtml)));

// 默认任务为开发模式
gulp.task('default', gulp.series('dev'));
