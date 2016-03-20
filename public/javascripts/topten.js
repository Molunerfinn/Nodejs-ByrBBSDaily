$(function(){
  // 初始化全局变量记录首页显示文章的数目
  // 用于ajax请求后续文章时候的标志
  dayNum = 1;
  nightNum = 1;
  flag = "day";

  // 点击显示全文的效果、收起全文的效果
  $(document).on('click','.read-more',function(){
    $(this).siblings('.more-content').fadeToggle("1000");
  })
  $(document).on('click','.close-button',function(){
    $(this).parent('.close').parent('.more-content').fadeToggle("1000")
  })

  // 图片的处理
  imgFresh();
  imgDisplace();
  // 返回顶部
  var offset = 300,
  offset_opacity = 1200,
  scroll_top_duration = 700,
  $back_to_top = $('.cd-top');
  $(window).scroll(function(){
    flag == "day" ? right_dis=$('.day').offset().left : $('.night').offset().left;
    $(".cd-top").css('right',right_dis);
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if( $(this).scrollTop() > offset_opacity ) { 
      $back_to_top.addClass('cd-fade-out');
    }
  });
  
  // 返回顶部点击效果
  $back_to_top.on('click', function(){
    scroll('0px', 500);
  })
  $('.logo').on('click', function(){
    scroll('0px', 500);
  })

  // 切换晨间、晚间日报的效果
  $('.day-top').on('click', function(){
    $('.day').fadeIn();
    $('.night').hide();
    flag = "day";
  })
  $('.night-top').on('click', function(){
    $('.night').fadeIn();
    $('.day').hide();
    flag = "night";
  })

  // Ajax请求
  toptensAjax();
})


// Ajax请求
function toptensAjax(){
  $(window).scroll(function(){
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if (scrollTop + windowHeight > scrollHeight - 20) {

      var flagNum;
      flag == "day" ? flagNum = dayNum +=1 : flagNum = nightNum +=1;

      $.ajax({
        type: 'POST',
        url: '/topten',
        data: {
          loadNum: flagNum,
          flag: flag
        },
        dataType: 'json',
        success: function(data){
          if(flag == "day"){
            var json = data.toptensDay.toptenDay;
            var $toptenDate = $('<li class="topten-date"><div class="date">' + json.date + ' 晨间' + '</div></li>')
          } else {
            var json = data.toptens.topten;
            var $toptenDate = $('<li class="topten-date"><div class="date">' + json.date + ' 晚间' + '</div></li>')
          }
          var $toptenLists = $('<li class="topten-lists"><ul class="topten-main"></ul></li>')
          $toptenLists.append($toptenDate);
          for(var i = 0; i < 10; i++){
            var $content = $('<li class="content"><div class="title">' + 
              json.info[i].title + '</div>' +
                              // '<div id="heart"></div>'+
                              '<div class="info">' +
                              '<span class="author">作者</span>' +
                              '<a href="http://m.byr.cn/user/query/'  +
                              json.info[i].author +'"class="author-name">'+
                              json.info[i].author + '</a>' +
                              '<span class="board">版面</span>' +
                              '<a href="http://bbs.byr.cn/board/' +
                              json.info[i].boardName + '"class="board-name">' +
                              json.info[i].boardName + '</a>' +
                              '<a href="javascript:void(0)" class="read-more">全文</a>' +
                              '<div class="more-content">' + json.info[i].content + '<hr class="line">' +
                              '<div class="close"><a href="javascript:void(0)" class="close-button">收起</a>' +
                              '<a href="'+json.info[i].link + '"target="_blank" class="origin-article">原文</a>'+
                              '</div></div></div></li>'
                              )
            for(var k = 0; k < $content.find('img').length; k++){
              var temp = "http://bbs.byr.cn" + $content.find('img')[k].getAttribute('src', 2);
              $content.find('img')[k].src = temp;
            }
            $toptenLists.append($content)
          }
          flag == "day" ? $('.day').append($toptenLists) : $('.night').append($toptenLists)
          imgDisplace();
          $('footer').hide();
        },
        error: function(data){
          $('footer').show()
        }
      })
    }
  })
}

// 滚动效果
function scroll(scrollTo, time) {
  var scrollFrom = parseInt(document.body.scrollTop),i = 0,
  runEvery = 5; // run every 5ms
  scrollTo = parseInt(scrollTo);
  time /= runEvery;
  var interval = setInterval(function () {
    i++;
    document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
    if (i >= time) {
      clearInterval(interval);
    }
  }, runEvery);
}

// 替换错误图片
function imgDisplace(){
  $("img").error(function() {
    $(this).attr("src", "http://static.byr.cn/img/logo.gif");
  });
}

// 更改默认图片相对地址为绝对地址
function imgFresh(){
  for (var i = 0;i<$('img').length;i++){
    var temp = "http://bbs.byr.cn" + $('img')[i].getAttribute('src', 2);
    $('img')[i].src = temp;
  }
}