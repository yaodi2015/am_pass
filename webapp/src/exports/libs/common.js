(function (doc, win) {
  var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if(clientWidth>=768){
      docEl.style.fontSize = '100px';
    }else{
      docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
    }

    var navMenu = document.getElementById("nav-menu");
    var smallNavPanel = document.getElementById("small-nav-panel");
    var smallNavMenu = document.getElementById("small-nav-menu");
    navMenu.addEventListener("click", function() {
      smallNavPanel.style.display = "block";
    }, false);

    smallNavMenu.addEventListener("click", function() {
      smallNavPanel.style.display = "none";
    }, false);
    
    smallNavPanel.addEventListener("click", function(event) {
      smallNavPanel.style.display = "none";
    }, false);

    var aHrefs = smallNavPanel.getElementsByTagName("a");

    for (var i=0, l= aHrefs.length ; i < l ; i++ ){
      aHrefs[i].addEventListener("click", function(e) {
        e.stopPropagation();
      }, false);
    }

    var nav1 = document.getElementById("nav1"),
        nav2 = document.getElementById("nav2"),
        navItem1 = nav1.getElementsByTagName("li"),
        navItem2 = nav2.getElementsByTagName("li");

    var url = window.location.href;
    console.log(url);

    if(~url.indexOf("index.html")) {
      navItem1[0].className = "hl";
      navItem2[0].className = "hl";
    } else if (~url.indexOf("amilypass.html")) {
      navItem1[1].className = "hl";
      navItem2[1].className = "hl";
    
    } else if (~url.indexOf("life.html")) {
      navItem1[2].className = "hl";
      navItem2[2].className = "hl";
    
    } else if (~url.indexOf("app_download.html")) {
      navItem1[3].className = "hl";
      navItem2[3].className = "hl";

    } else if (~url.indexOf("news.html")) {
      navItem1[4].className = "hl";
      navItem2[4].className = "hl";

    }


  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
