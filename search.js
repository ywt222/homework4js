$(document).ready(function(){

  $.getJSON("bookmarks.json", function(data) {
      var arr = data;


//整体页面
function page(title,time){
  $("#book").append('<div>'
   +  '<p class="item">' + title + '</p>'
   +  '<span class="time">Created @ ' + time +'</span>'
   +  '</div>'
   +  '<hr>');
}

//初始页面
  arr.forEach(function(arr) {
     page(arr.title,convertDate(arr.created));
  });

//日期转换
  function convertDate(seconds) {
      var day = new Date();
      day.setTime(seconds*1000);
      return day.getFullYear() + "-"
      + ((day.getMonth()+1)<10?("0"+(day.getMonth()+1)):(day.getMonth()+1)) + "-"
      + ((day.getDate())<10?("0"+(day.getDate())):(day.getDate()));
  }


//输入事件响应,匹配关键字
  $("#input").bind("input propertychange",function() {
      var keyword = $(this).val();
      var reg = new RegExp(keyword, "ig");
    //var reg = new RegExp("(" + input + ")", "ig");
      function filterKeyword(arr) {
          return reg.test(arr.title);
      }

//新页面
      function newPage(arr) {
          var highlightKeyword = arr.title.replace(reg, '<span class="highlight">$&</span>');
           page(highlightKeyword,convertDate(arr.created));
      }


     //关键字匹配成功，新页面
      $("#book").html("");
      arr.filter(filterKeyword).map(newPage);
  });
  });

})
