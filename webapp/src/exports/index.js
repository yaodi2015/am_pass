var $ = require("zepto"); 
require("../scripts/libs/swiper.jquery.js"); 

$(function() {

  $("#swiper").swiper({
      autoplayDisableOnInteraction : false,
      touchMoveStopPropagation : false,
      preloadImages: true,
      // Enable lazy loading
      autoplay : 3000,
      loop : true,
      onSlideChangeEnd : function(swiper){
      }
    });

});
