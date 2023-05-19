const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const htmlTpl = require('gulp-html-tpl');
const artTemplate = require('art-template');
const paths = {
  src: {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    html: 'src/page/**/*.html',
    tpl: 'src/tpl/**/*.html',
    font: 'src/font/**/*',
    img: 'src/img/**/*',
    lib: 'src/lib/**/*',
  },
  dist: {
    css: 'dist/css',
    js: 'dist/js',
    html: 'dist',
  },
  dev: {
    css: 'dev/css',
    js: 'dev/js',
    html: 'dev',
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
    .pipe(terser())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(gulp.dest(paths.dev.js));
}

// 压缩 HTML 文件，并在其中包含其他文件
function minifyHtml() {
  return gulp
    .src(paths.src.html)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(fileinclude({ prefix: '@@', basepath: __dirname + '/src/tpl/'  }))
    .pipe(htmlTpl({
      tag: 'template',
      engine: function(template, data) {
        return template && artTemplate.compile(template)(data);
      }
    }))
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.dist.html))
    .pipe(gulp.dest(paths.dev.html))
    .pipe(browserSync.stream());
}

function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: './dev', // 指定根目录
      index: 'index.html', // 指定默认路由为 index.html

    },
    port: 3000, // 设置端口号
    open: true, // 自动打开浏览器
  });

  // 监听文件变化，并触发重新加载页面
  gulp.watch(paths.src.html, gulp.series(minifyHtml)).on('change', browserSync.reload);
  gulp.watch(paths.src.scss, gulp.series(compileSass)).on('change', browserSync.reload);
  gulp.watch(paths.src.js, gulp.series(minifyJs)).on('change', browserSync.reload);
  gulp.watch(paths.src.tpl, gulp.series(minifyHtml)).on('change', browserSync.reload);
  gulp.watch(paths.src.font, gulp.series('font')).on('change', browserSync.reload);
  gulp.watch(paths.src.img, gulp.series('img')).on('change', browserSync.reload);
  gulp.watch(paths.src.lib, gulp.series('lib')).on('change', browserSync.reload);
}


// 清理 dist 文件夹
function cleanDist() {
  return gulp.src('dist', { allowEmpty: true, read: false }).pipe(clean());
}

// 清理 dev 文件夹
function cleanDev() {
  return gulp.src('dev', { allowEmpty: true, read: false }).pipe(clean());
}



// 处理 lib 文件夹任务
gulp.task('lib', function() {
  return gulp.src('src/lib/**/*') // 选择 lib 文件夹下的所有文件
    .pipe(gulp.dest('dist/lib')) // 将文件输出到 dist/lib 目录
    .pipe(gulp.dest('dev/lib'))
});
// 处理 img 文件夹任务
gulp.task('img', function() {
  return gulp.src('src/img/**/*') // 选择 img 文件夹下的所有文件
    .pipe(gulp.dest('dist/img')) // 将文件输出到 dist/img 目录
    .pipe(gulp.dest('dev/img'))
});
// 处理font 文件夹任务
gulp.task('font', function() {
  return gulp.src('src/font/**/*') // 选择 font 文件夹下的所有文件
    .pipe(gulp.dest('dist/font')) // 将文件输出到 dist/font 目录
    .pipe(gulp.dest('dev/font'))
});

// 开发模式任务
gulp.task('dev', gulp.series(cleanDev, 'lib', 'img', 'font', gulp.parallel(compileSass, minifyJs, minifyHtml), browserSyncTask));

// 构建模式任务
gulp.task('build', gulp.series(cleanDist,'lib', 'img', 'font', gulp.parallel(compileSass, minifyJs, minifyHtml)));

// 默认任务为开发模式
gulp.task('default', gulp.series('dev'));
