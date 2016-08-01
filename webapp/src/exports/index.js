var $ = require("zepto"); 
require("../scripts/libs/swiper.jquery.js"); 

$(function() {
  var $swiper= $("#swiper");
  var swp = $swiper.swiper({
      autoplayDisableOnInteraction : false,
      touchMoveStopPropagation : false,
      preloadImages: true,
      // Enable lazy loading
      autoplay : 3000,
      loop : true,
      onSlideChangeEnd : function(swiper){
      }
    });

  $swiper.on("mouseover",function() {
    swp.stopAutoplay();
  })
  $swiper.on("mouseout",function() {
    swp.startAutoplay();
  })

});
