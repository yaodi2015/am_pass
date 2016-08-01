var angular = require("angular");
var ngRouter = require("angular-route");
require("angularjs-datepicker");
require("angular-sanitize");
require("angular-validation/dist/angular-validation.js");
require("angular-validation/dist/angular-validation-rule.js");

require("../libs/qrcode.js");
require("angular-qrcode");
require("../libs/angular-locale_zh.js");

var ApplyPass = angular.module("ApplyPass", [ngRouter, 
    '720kb.datepicker', 
    //'validation' , 'validation.rule',
    'monospaced.qrcode', 'ngSanitize']);

ApplyPass.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
/**
ApplyPass.config(['$validationProvider', function ($validationProvider) {
    $validationProvider.showSuccessMessage = false; // or true(default)

    var expression = {
      date :  /^\d\d\d\d\-\d\d\-\d\d$/,
      mobile : /^(13|15|17|18|14)\d{9}$/
    };

    var validMsg = {
      date : {
        error: '日期格式必须是YYYY-MM-DD',
        success: ''
      },
      maxlength : {
        error : '输入超长了'
      },
      required : {
        error : '必填项不能为空'
      },
      mobile : {
        error : '请输入正确的手机号'
      }
    };

    $validationProvider.setExpression(expression) // set expression
    .setDefaultMsg(validMsg); // set valid message
    $validationProvider.setValidMethod('watch')

}]);

***/

module.exports = ApplyPass;

