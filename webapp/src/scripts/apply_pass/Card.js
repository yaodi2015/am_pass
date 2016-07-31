
var ApplyPass = require("./ApplyPass.js");
var Store = require("../libs/store.js");
var pop = require("../libs/pop.js");
var Utils = require("./Utils.js");

ApplyPass.controller("Card", ["$scope", "$http", "$location",  

function ($scope, $http, $location) {
    
   $http.post("/server/pass/getInfo.htm",JSON.stringify({
    uin : Utils.getUin()
  })).then(function(rs){
    var data = rs.data;
    if (data.ret === 0 ) {
      var info = data.info;
      if (info) {
        $scope.changeNum = 1;
        $scope.username = info.cardName;
        $scope.selectNum = info.cardNumber;
        $scope.numbers = [{num : info.cardNumber , selected : true }];
        $scope.notShowChange = true;
      } else {
        initDefaultData();
      }
    } else {
      initDefaultData();
    }
  
  }).catch(function() {
    initDefaultData(); 
  });
  
  
  var _flag = false;
  $scope.changeCard = function(event) {
    event.preventDefault();
    if (!_flag) {
      _flag = true;
      getNumbers($scope.changeNum + 1);
    }
    setTimeout(function() {
      _flag = false;
    }, 1000);
  }

  $scope.selectCard = function() {
    var $index = this.$index;
    $scope.numbers.forEach(function(it, index) {
      if ($index === index) {
        it.selected = true;
        $scope.selectNum = it.num;
      } else {
        it.selected = false;
      }
    });
  }

  $scope.nextStep = function(event) {
    event.preventDefault();
    if (!$scope.selectNum) {
      pop.tip("请选择一个卡号");
      return;
    }
    if (!$scope.username) {
      pop.tip("请输入姓名");
      return;
    }

    $http.post("/server/pass/saveInfo.htm" , JSON.stringify({
      uin : Utils.getUin(), 
      step : 1 ,
      cardNumber : $scope.selectNum,
      cardName : $scope.username
    })).then(function(res) {
      var data = res.data;
      if (data.ret === 0) {
        $location.path("/info");
      } else {
        pop.tip("保存错误，请重试");
        $location.path("/info");
      }
    }).catch(function() {
      pop.tip("服务器错误");
    })

  }
  
  function initDefaultData() {
    $scope.changeNum = 1;
    $scope.username = "";
    $scope.selectNum = "";
    getNumbers($scope.changeNum);
  }

  function getNumbers(changeNum) {
    changeNum = changeNum || 1;

    $http.post("/server/pass/avilibleCode.htm", JSON.stringify({
      changeNum : changeNum 
    })).then(function(res) {
      var data = res.data;
      if (data.ret === 0 ) {
        $scope.changeNum = data.changeNum;
        $scope.numbers = data.numbers.map(function(num) {
          return {num : num , selected : false};
        });
        $scope.selectNum = "";

      } else {
        pop.tip("获取卡号失败");
      }
    });
  }

}]);
