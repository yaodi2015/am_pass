var ApplyPass = require("./ApplyPass.js");
var Store = require("../libs/store.js");
var pop = require("../libs/pop.js");
var Cookie = require("../libs/cookies.js");

var Phone = ApplyPass.controller("Phone", ["$scope", "$http", "$location", "$rootScope", 
    function ($scope, $http, $location, $rootScope) {

  $scope.codeText = "验证";
  $scope.phone = "";
  if (Store.get("last_phone")) {
    $scope.phone = Store.get("last_phone");
  }  


  $scope.sendCode = function(event) {
    if ($scope.sendStatus === "sended") {
      return;
    }
    if ($scope.phone) {
      $http.post("/server/mobile.htm" , JSON.stringify({
        phone : $scope.phone,
        operacode : 1
      })).then(function(res) {
        var data = res.data;
        if (data.ret === 0) {
          $scope.setCodeStatus();
          pop.tip("验证码已发送");
        } else {
          pop.tip("验证码发送失败");
        }
      })
    } else {
      pop.tip("请输入正确的手机号");
    
    }
  }

  $scope.startLogin = function(event) {
    $http.post("/server/pass/login.htm" , JSON.stringify({
      phone : $scope.phone,
      code : $scope.code
    })).then(function(res) {
      var data = res.data;
      if (data.ret === 0 ) {
        $rootScope.userData = data;
        setCookie(data, $location.host());
        setStore($scope.phone, data);
        redirect(data.status, $location);
      } else {
        if (data.ret === 101) {
          pop.tip("验证码错误，请检查");
        } else {
          pop.tip("登录失败请刷新重试");
        }
      }
    
    });
  }
  $scope.setCodeStatus = function() {
    $scope.sendStatus = "sended";
    var time = new Date();
    time.setTime(time.getTime() + 60 * 1000);
    $scope.codeText = "60s";
    var _t = setInterval(function(){
      $scope.$apply(function() {
        var r = time_dur.dv(time);
        if (r.dur > 0 ) {
          $scope.codeText = (r.dur+"s");
        } else {
          clearInterval(_t);
          $scope.sendStatus = "";
          $scope.codeText = "验证";
        }
      });
    },1000);
  }

}]);


function redirect(status, $location) {
  switch (status) {
    case 0:
      $location.path("/card");
      break;
    case 1:
      $location.path("/info");
      break;
    case 2:
      $location.path("/pay");
      break;
    case 3:
      $location.path("/finish");
      break;
    default:
      break;
  }
}

function setStore(phone,data) {
  Store.set(phone+"_pass" , data.passStatus);
  Store.set(phone+ "_serverTime" , data.serverTime);
  Store.set(phone + "_uin", data.uin);
  Store.set(phone + "_signature", data.signature);
  Store.set(phone + "_status", data.status);
  Store.set("am_uin", data.uin);
}

function setCookie(data , host) {
  var expires = new Date().getTime() + 1000 * 60 * 60 * 24 * 30;
  Cookie.setItem("uin",data.uin ,expires, "/" , host );
  Cookie.setItem("signature",data.signature ,expires, "/" , host );
}

var time_dur = {
  zero: function(n){
    var n = parseInt(n, 10);
    if(n > 0){
      if(n <= 9){
        n = "0" + n;
      }
      return String(n);
    }else{
      return "00";
    }
  },
  dv: function(d){
    var f = this;
    var future = d, now = new Date();
    var dur = Math.round((future.getTime() - now.getTime()) / 1000), pms = {
      sec: "00",
      mini: "00",
      hour: "00",
      day: "00",
      month: "00",
      year: "0"
    };
    if(dur > 0){
      pms.sec = f.zero(dur % 60);
      pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
      pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
      pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
      //月份，以实际平均每月秒数计算
      pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
      //年份，按按回归年365天5时48分46秒算
      pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
    }
    pms.dur = dur;
    return pms;
  }
}


module.exports = Phone;
