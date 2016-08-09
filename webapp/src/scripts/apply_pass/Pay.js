
var ApplyPass = require("./ApplyPass.js");
var Store = require("../libs/store.js");
var pop = require("../libs/pop.js");
var Utils = require("./Utils.js");
var Dialog = require("../libs/plugin/idialog.js");
var dateFormat = require("../libs/date_format.js");
var oneYear = 1000 * 3600 * 24 * 365;

var ua = window.navigator.userAgent.toLowerCase();
var isWx = /micromessenger/.test(ua);
var __timer;

function stopWatchPay() {
  if (__timer) {
    clearInterval(__timer);
    __timer = null;
  }
}

ApplyPass.controller("Pay", ["$scope", "$http", "$location", "$rootScope", 

function ($scope, $http, $location, $rootScope) {

  if (!$rootScope.stopWatchPay) {
    $rootScope.stopWatchPay = stopWatchPay;
  }
  
  $http.post("/server/pass/getInfo.htm",JSON.stringify({
    uin : Utils.getUin()
  })).then(function(rs){
    var data = rs.data;
    if (data.ret === 0 ) {
      var info = data.info; 
      for (var key in info) {
        $scope[key] = info[key];
      }
      var createTime = info.createTime;
      if (createTime) {
        $scope.cardValid = dateFormat.format(new Date(createTime * 1000 + oneYear ) , "MM/YYYY");
      } else {
        $scope.cardValid = "一年";
      }
    } else {
      pop.tip("获取卡号信息失败,请刷新重试");
    }

  }).catch(function() {
    pop.tip("网络或者服务器异常，请刷新重试");
  });


  $scope.isWx = isWx;
  $scope.payWay = 'wx';

  $scope.selectPayway = function(event, val) {
    $scope.payWay = val;
  }
  initPay();

  function initPay() {
    var uin = Utils.getUin();
    $http.post("/server/pass/pay.htm",JSON.stringify({
      uin : uin
    })).then(function(res) {
      var data = res.data;
      if(data.ret === 0) {
        delete data.ret;
        for (var key in data) {
          $scope[key] = data[key];
        }
        //data.uin = uin;
        //$rootScope.payData = data; 
        $scope.indentId = data.indentId;
        startWatchPay(data.indentId);

      } else {
        if (data.msg === "RESULT_ID_INVALID_PARAM" ) {
          $location.path("/finish");
        } else {
          pop.tip("生成支付链接错误");
        }
      }
    }).catch(function() {
      pop.tip("服务器错误，重试");
    });
  }

  $scope.phonePay = function() {
    if ($scope.payWay === "wx") {
      window.open($scope.wxPayInfo);
    } else {
      window.open($scope.aliPayInfoPc);
    }

  }
  
  $scope.openZfbPc = function(event) {
    event.preventDefault();
    showPayDlg($scope.indentId);
    window.open($scope.aliPayInfoPc);
    
  }
  

  function startWatchPay(indentId) {
    __timer = setInterval(function() {
      $http.post("/server/pass/getPayStatus.htm" , JSON.stringify({
        uin : Utils.getUin(),
        indentId : indentId
      })).then(function(rs) {
        var data = rs.data;
        if (data.ret === 0 ) {
          if (data.status === 1 && __timer) {
            clearInterval(__timer);
            __timer = null;
            $location.path("/finish");
          }
        }
      });
    },1000 * 15);
    
  
  }

  var paydlg;

  function showPayDlg(indentId) {
    if (!paydlg) {
      var $content = $(require("./pay.tmpl")());
      paydlg = new Dialog({
        content : $content
      });

      paydlg.hide();
      $content.find(".js-ok").click(function() {
        stopWatchPay();
        $http.post("/server/pass/getPayStatus.htm" , JSON.stringify({
          uin : Utils.getUin(),
          indentId : indentId
        })).then(function(rs) {
          var data = rs.data;
          paydlg.hide();
          if (data.ret === 0) {
            if (data.status === 1) {
              $location.path("/finish");
            } else {
              pop.tip("订单未支付，请支付");
            }
          } else {
            pop.tip("订单状态未更新，请刷新查看");
          }
        });
      });

      $content.find(".js-cancel").click(function() {
         paydlg.hide();
         window.open("tel://4000123131");
      });
    
    
    
    }
    paydlg.show();
  
  }

  
}]);

