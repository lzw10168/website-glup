// nav-menu点击的时候, .nav-submenu显示, .nav-submenu是menu的子元素, 且<i class="bi bi-chevron-down"></i> 旋转
$('.nav-menu').click(function (e) {
  // 需要判断e.target是不是 .navbar-a7ff7dddf889 的子元素, 如果不是, 那么就不执行下面的代码
  if (!$(e.target).parents('.navbar-a7ff7dddf889').length) return


  e.preventDefault()
  $(this).children('.nav-submenu').slideToggle()
  $(this).children('.link').children('i').toggleClass('rotate')
  // 其它的.nav-submenu隐藏, 其它的<i class="bi bi-chevron-down"></i> 旋转
  $(this).siblings().children('.nav-submenu').slideUp()
  $(this).siblings().children('.link').children('i').removeClass('rotate')
})

// navbar-menu_btn
// .navbar-a7ff7dddf888下的子元素nav-menu点击, next().slideToggle() 显示隐藏, 
// .bi-plus-lg 隐藏, bi-dash-lg显示

$('.nav-menu').click(function (e) {
  if (!$(e.target).parents('.navbar-a7ff7dddf888').length) return

  e.preventDefault()
  $(this).next().slideToggle()
  $(this).children('.bi-plus-lg').toggleClass('d-none')
  $(this).children('.bi-dash-lg').toggleClass('d-block')
}
)

// 当出现滚动条距离顶部大于5px, .navbar-a7ff7dddf889, 和 .navbar-a7ff7dddf888的background-color变为透明

function changeTabTransparent() {
  $('.navbar-a7ff7dddf889').css('background-color', 'transparent')
  // 子集 .nav-submenu 的 background-color 也要变为透明
  $('.navbar-a7ff7dddf889 .navbar-nav .nav-menu .nav-submenu').css('background-color', 'transparent')
  // navbar-brand_logo src change to logo_dark.png
  $('.navbar-a7ff7dddf888').css('background-color', 'transparent')
}
changeTabTransparent()

$(window).scroll(function () {
  if ($(this).scrollTop() > 5) {
    $('.navbar-a7ff7dddf889').css('background-color', 'var(--bg-color)')
    $('.navbar-a7ff7dddf889 .navbar-nav .nav-menu .nav-submenu').css('background-color', 'var(--bg-color)')

    $('.navbar-a7ff7dddf888').css('background-color', 'var(--bg-color)')
  } else {
    changeTabTransparent()
  }
}
)


$('#back-top').click(function () {
  $('html, body').animate({ scrollTop: 0 }, 300)
})


{/* <i class="bi bi-play-fill"></i> <span class="text">
          继续播放
        </span>
        <!-- <i class="bi bi-pause-fill"></i> <span class="text">
          暂停播放
        </span> --> */}

$('#video_control').click(function () {
  if ($(this).children('i').hasClass('bi-play-fill')) {
    $(this).children('i').removeClass('bi-play-fill').addClass('bi-pause-fill')
    $(this).children('.text').text('暂停播放')
    $('video')[0].play()
  } else {
    $(this).children('i').removeClass('bi-pause-fill').addClass('bi-play-fill')
    $(this).children('.text').text('继续播放')
    $('video')[0].pause()
  }
})



var delay = 100; // 每个字符的打字速度
var interval = 5000; // 清空文字后的间隔时间

function typeWriter(element, text, index) {
  if (index < text.length) {
    $(element).text(text.substring(0, index + 1));
    setTimeout(function () {
      typeWriter(element, text, index + 1);
    }, delay);
  } else {
    setTimeout(function () {
      clearText(element);
    }, interval);
  }
}

function clearText(element) {
  $(element).text('');
  var text = $(element).data('text');
  setTimeout(function () {
    typeWriter(element, text, 0);
  }, delay);
}

$(document).ready(function () {
  $('.output-type_text').each(function () {
    var text = $(this).data('text');
    typeWriter(this, text, 0);
  });
});
