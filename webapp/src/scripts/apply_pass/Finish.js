
var ApplyPass = require("./ApplyPass.js");
var Store = require("../libs/store.js");
var pop = require("../libs/pop.js");


ApplyPass.controller("Finish", ["$scope", "$http", "$location",  

function ($scope, $http, $location) {

  $scope.viewHy = function() {
    window.location.href = "/webapp/html/amilypass.html";
  }
  
}]);

