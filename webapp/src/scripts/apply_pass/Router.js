
var ApplyPass = require("./ApplyPass.js");
require("./Phone.js");
require("./Card.js");
require("./Info.js");
require("./Pay.js");
require("./Finish.js");

ApplyPass.config(["$routeProvider", "$locationProvider" , function($routeProvider, $locationProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'pass/phone.html',
            controller  : 'Phone'
        })
        .when('/card', {
            templateUrl : 'pass/card.html',
            controller  : 'Card'
        })
        .when('/info', {
            templateUrl : 'pass/info.html',
            controller  : 'Info'
        })
        .when('/pay', {
            templateUrl : 'pass/pay.html',
            controller  : 'Pay'
        })
        .when('/finish', {
            templateUrl : 'pass/finish.html',
            controller  : 'Finish'
        })


               //$locationProvider.html5Mode(true);
}]).run(["$rootScope" , function($rootScope) {
  $rootScope.$on("$routeChangeStart", function() {
    console.log(arguments);
    if ($rootScope.stopWatchPay) {
      $rootScope.stopWatchPay();
    }
  });

}]);






