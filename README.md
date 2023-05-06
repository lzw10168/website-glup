- project/
  - dist/               (打包文件)
    - css/
        main.min.css
    + font/
    + img/
    + lib/
    + js/
    + html/
        index.html
        about.html
        archive.html
  + dev/                (开发预览，样式脚本都未合并或混合，方便调试)
  - src/
    + font/             (Icon)
    + img/              (项目用图形图标)
    - js/
      + common/         (内部编写公用模块脚本，打包成 common.min.js 单文件)
          entry.js      (入口文件，定义一个全局变量，项目所有脚本对象都挂在它名下，即类似声明一个命名空间，避免污染)
      + view/           (每个页面的脚本)
    + lib/              (第三方依赖，不可改动)
    - page/             (页面，采用`gulp-file-include`从 tpl 引入模块)
        index.html
        about.html
        archive.html
    - scss/             (所有样式打包成 main.min.css 单文件)
      + component/      (组件类)
      + core/           (核心样式)
      + dependencies/   (第三方依赖)
      + mixins/         (混合器)
      + variables/      (全局样式变量)
        _component.scss
        _mixins.scss
        _variables.scss
        app.scss        (全局样式)
    - tpl/              (模块)
        page-header.html
        page-breadcrumb.html
        page-footer.html
        page-aside.html
        page-meta.html
        page-pendant.html
        page-style.html
        script-head.html
        script-foot.html
        site-topbar.html
        site-footer.html
  .gitignore            (Gulp task 代码校验配置、Git 版本控制配置)
  .babelrc
  .csslintrc
  .eslintignore
  .eslintrc
  .htmlhintrc
  .jshintignore
  .jshintrc
  .scss-lint.yml
  gulpfile.js           (Gulp 配置)
  package.json          (项目配置)



