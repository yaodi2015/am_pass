var Dialog = require("../libs/plugin/idialog.js");
var tpl = require("./areadlg.tmpl");
var Observer = require("event");


var ActAreaDlg = function() {
  var me = this;
  this.content = $(tpl());
  this.$ul = this.content.find(".js-ul");
  this._dlg = new Dialog({
    content : this.content
  })
  this._dlg.hide();
  this._areas = [];
  this.content.delegate(".js-close", "click", function() {
    me.hide();  
  }).delegate(".act","click", function() {
     Observer.trigger("sumbit-act-area", me._areas);
     me.hide();
  }).delegate("li", "click" , function() {
     var $d = $(this);
     var text = $d.text();
     if (!$d.hasClass("selected")) {
       if (me._areas.length < 3) {
          $d.addClass("selected");
          me._areas.push(text);
       }
     } else {
      $d.removeClass("selected");
      removeArr(me._areas, text);
     }
  });

  this.show = function(data) {
    this._areas = [];
    this.$ul.html(data.map(function(area){
      return '<li><div class="area"><div class="abg"></div><div class="ar">'+area+'</div></div></li>';
    }).join(""));
    this._dlg.show();
  }
  this.hide = function() {
    this._areas =[];
    this._dlg.hide();
  }

}

function removeArr(arr,val) {
  var ind = null;
  for(var i = 0, l = arr.length ; i<l ; i++){
    if (val === arr[i]) {
      ind = i;
      break;
    }
  }
  if (ind !== null) {
    arr.splice(ind,1);
  }
  return arr;
}

var instance ;
module.exports.init = function() {
  if (!instance) {
    instance = new ActAreaDlg();
  }
  return instance;
}
