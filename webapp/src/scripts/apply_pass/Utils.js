var Store = require("../libs/store.js");
var Cookie = require("../libs/cookies.js");

module.exports = {

  getUin : function() {
    return   Store.get("am_uin") || Cookie.getItem("uin");  
  },
  hasUin : function() {
    return !!this.getUin();
  }
  
}
