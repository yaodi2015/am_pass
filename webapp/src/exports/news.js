var $ = require('zepto');
require("../scripts/libs/jquery.waterfall.js");

$(function() {
  
  $("#news").waterfall({
    colMinWidth : 300,
    autoresize : true
  });

})

