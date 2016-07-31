
var ApplyPass = require("./ApplyPass.js");
var Store = require("../libs/store.js");
var pop = require("../libs/pop.js");
var Utils = require("./Utils.js");

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

  
}]);

