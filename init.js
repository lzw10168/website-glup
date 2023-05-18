const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

// 定义需要创建的文件夹和文件列表
const directories = [
  'dist/css',
  'dist/font',
  'dist/img',
  'dist/lib',
  'dist/js',
  'dev',
  'src/font',
  'src/img',
  'src/js/common',
  'src/js/view',
  'src/lib',
  'src/page',
  'src/scss/component',
  'src/scss/core',
  'src/scss/dependencies',
  'src/scss/mixins',
  'src/scss/variables',
  'src/tpl'
];

const files = [
  'dist/js/index.html',
  'dist/js/about.html',
  'dist/js/archive.html',
  'src/js/common/entry.js',
  'src/scss/_component.scss',
  'src/scss/_mixins.scss',
  'src/scss/_variables.scss',
  'src/scss/app.scss',
  'src/tpl/page-header.html',
  'src/tpl/page-breadcrumb.html',
  'src/tpl/page-footer.html',
  'src/tpl/page-foot.html',
  'src/tpl/page-aside.html',
  'src/tpl/page-meta.html',
  'src/tpl/page-pendant.html',
  'src/tpl/page-style.html',

  '.gitignore',
  '.babelrc',
  '.csslintrc',
  '.eslintignore',
  '.eslintrc',
  '.htmlhintrc',
  '.jshintignore',
  '.jshintrc',
  '.scss-lint.yml',
  'gulpfile.js',
];

// 创建文件夹
directories.forEach(directory => {
  const dirPath = path.join(__dirname, directory);
  mkdirp.sync(dirPath);
});

// 创建空文件
files.forEach(file => {
  const filePath = path.join(__dirname, file);
  fs.writeFileSync(filePath, '');
});

console.log('Initialization completed.');
