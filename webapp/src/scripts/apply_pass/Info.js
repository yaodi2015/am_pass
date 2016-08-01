
var ApplyPass = require("./ApplyPass.js");
var Store = require("../libs/store.js");
var pop = require("../libs/pop.js");
var ActAreaDlg = require("./ActAreaDlg.js");
var Observer = require("event");
var Utils = require("./Utils");



var BJBUSI = [
  "三里屯","望京","国贸","大望路","朝外大街","亚运村","王府井/东单","亮马桥/三元桥",
  "双井","五道口","西单","崇文门","中关村","东直门"
];
var SHBUSI = [
  "徐家汇","静安寺","南京西路","淮海路","人民广场","打浦桥","五角场/大学区","八佰伴",
  "中山公园","南京东路","陆家嘴","世纪公园","虹口足球场","虹桥"
];



ApplyPass.controller("Info", ["$scope", "$http", "$location", "$injector" , 

function ($scope, $http, $location, $injector) {
  var actAreaDlg = ActAreaDlg.init();


  $http.post("/server/pass/getInfo.htm",JSON.stringify({
    uin : Utils.getUin()
  })).then(function(rs){
    var data = rs.data;
    if (data.ret === 0 ) {
      var info = data.info; 
      for (var key in info) {
        $scope[key] = info[key];
      }
      $scope.actArea = $scope.actionZone ? $scope.actionZone.split(",") : [];
      $scope.longHabitat = $scope.longHabitat || "北京";
      $scope.sensitive = $scope.sensitive || 0;
      $scope.fertilityState =  $scope.fertilityState || 3;

    } else {
      initDefaultData();
    }
  
  }).catch(function() {
    initDefaultData(); 
  });
  
  $scope.$watch("longHabitat", function(val) {
    if (val ==="上海") {
      $scope.busi =  SHBUSI; 
    } else {
      $scope.busi =  BJBUSI; 
    }
  });
 

  $scope.selectSex = function(event) {
    var t ;
    if (t = event.target.getAttribute("data-sex")) {
      $scope.sex = t*1;     
    }
  }

  $scope.selectYesSens = function(event, sens) {
    $scope.sensitive = sens;
  }
  $scope.selectHuaiYun = function(event, huaiyun) {
    $scope.fertilityState = huaiyun; 
  }

  $scope.showActArea = function(event) {
    actAreaDlg.show($scope.busi);
  }

  Observer.on("sumbit-act-area", function(areas) {
    $scope.actArea = areas;
    $scope.$digest();
  });

  $scope.lastStep = function(event) {
    $location.path("/card");
  }
  $scope.submitOrder = function(form) {
    if (form.$valid) {
      save();
    } else {
      pop.tip("输入内容格式错误,请检查");  
    }
  }
  
  function initDefaultData() {
    $scope.sex = 0;
    $scope.sensitive = 0;
    $scope.fertilityState = 3;
    $scope.longHabitat = "北京";
    $scope.birthday = "1990-01-01"
    $scope.actArea = [];
  }

  function save() {
    
    var data = {
      uin : Utils.getUin(),
      step : 2,
      name : $scope.name,
      sex : $scope.sex,
      email : $scope.email,
      birthday : $scope.birthday,
      longHabitat : $scope.longHabitat,
      actionZone : $scope.actArea.join(","),
      phone : $scope.phone,
      recipients : $scope.recipients,
      receivePhone : $scope.receivePhone,
      receiveAddress : $scope.receiveAddress,
      sensitive : $scope.sensitive,
      sensitiveSymptom : $scope.sensitiveSymptom,
      fertilityState : $scope.fertilityState,
      medicalHistory : $scope.medicalHistory
    }


    $http.post("/server/pass/saveInfo.htm" , JSON.stringify(data))
      .then(function(res) {
          var data = res.data;
          if (data.ret === 0 ) {
            $location.path("/pay");
          } else {
            pop.tip("保存失败,请重试");
          }
      }).catch(function() {
          pop.tip("网络异常,请重试");
      });
  }
}]);

