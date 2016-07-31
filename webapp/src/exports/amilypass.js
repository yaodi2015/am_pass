
var $ = require("zepto"); 
require("../scripts/libs/swiper.jquery.js"); 

$(function() {
  var $num = $("#swiper-num");
  $("#swiper").swiper({
    autoplayDisableOnInteraction : false,
    touchMoveStopPropagation : false,
    preloadImages: true,
    // Enable lazy loading
    autoplay : 3000,
    loop : true,
    onSlideChangeEnd : function(swiper){
      var act_ind = swiper.activeIndex;
      //loop true 模式下 act_index 会有偏移量
      if ( act_ind == 1 || (act_ind == 6)) {
        act_ind = 1;
      }
      $num.text(act_ind +"/5");
    }
  });

});

