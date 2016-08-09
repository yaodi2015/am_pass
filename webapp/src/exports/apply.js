
var $ = require("zepto"); 
require("../scripts/libs/swiper.jquery.js"); 

$(function() {
  var $num = $("#swiper-num");
  var $swiper= $("#swiper");
  var len = $swiper.find(".swiper-slide").length;
  var swp = $swiper.swiper({
    autoplayDisableOnInteraction : false,
    touchMoveStopPropagation : false,
    preloadImages: true,
    // Enable lazy loading
    autoplay : 3000,
    loop : true,
    onSlideChangeEnd : function(swiper){
      var act_ind = swiper.activeIndex;
      //loop true 模式下 act_index 会有偏移量
      if ( act_ind == 1 || (act_ind == (len+1))) {
        act_ind = 1;
      }
      $num.text(act_ind +"/"+len);
    }
  });

  
  $swiper.on("mouseover",function() {
    swp.stopAutoplay();
  })
  $swiper.on("mouseout",function() {
    swp.startAutoplay();
  })

});


