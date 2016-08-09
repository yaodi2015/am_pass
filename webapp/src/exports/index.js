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

  $swiper.find(".js-lf").click(function(e) {
    swp.slidePrev();
  });

  $swiper.find(".js-rt").click(function(e) {
    swp.slideNext();
  });



});
