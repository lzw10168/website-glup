// 初始化 MuiPlayer 插件，MuiPlayer 方法传递一个对象，该对象包括所有插件的配置
const aidrawMp = new MuiPlayer({
  container: '#aidraw-video-container',
  title: '开放蓝天',
  muted: true,
  autoplay: true,
  showMiniProgress: true,
  // custom: {
  //   footerControls : []
  // },
  plugins: [
    new MuiPlayerDesktopPlugin({
      // customSetting, // 设置组配置
      // contextmenu, // 右键菜单组配置
      // thumbnails,  // 缩略图配置
    })
  ],
  src: './img/video/aichat.mp4',
})
