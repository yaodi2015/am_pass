var $ = require("zepto");
var Dialog = require("./plugin/idialog.js");
var alert_tpl = require("./tmpl/ui/alert.tmpl")
var confirm_tpl = require("./tmpl/ui/confirm.tmpl");
var tip_tpl = require("./tmpl/ui/tip.tmpl");

var alert_instance , confirm_instance , tip_instance ;
var __t ;
var Pop = {

    "alert" : function(opt,content){
        var _opt ;
        if (typeof opt === "string") {
            if (content) {
                 _opt = {
                    title : opt,
                    content : content
                };
            } else {
                 _opt = {
                    title : "提示",
                    content : opt
                };
            }
         } else  {
            _opt = opt || { 
                "title" : "提示",
                "content" : "error:no content"
            };
        }
        
        if (alert_instance) {
            alert_instance.remove();
        }
        var $dom = $(alert_tpl({
            title : _opt.title,
            content : _opt.content
        }));
        $dom.find(".js-btn").click(function(){
            alert_instance.hide(); 
            _opt.callback && _opt.callback();
        });
        alert_instance = new Dialog({
            content : $dom
        })
        alert_instance.hide();
        alert_instance.show();
    },
    
    "confirm" : function(opt){
        var _opt ;
        if (typeof opt === "string") {
            _opt = {
                title : "提示",
                content : opt
            };
        } else  {
            _opt = opt || { 
                "title" : "提示",
                "content" : "error:no content"
            };
        }
        
        if (confirm_instance) {
            confirm_instance.remove();
        }
        var $dom = $(confirm_tpl({
            title : _opt.title,
            content : _opt.content
        }));
        $dom.find(".js-cancel").click(function(){
            confirm_instance.hide(); 
            _opt.cancel && _opt.cancel();
        });
        $dom.find(".js-ok").click(function(){
            confirm_instance.hide(); 
            _opt.ok && _opt.ok();
        });
        confirm_instance = new Dialog({
            content : $dom
        })
        confirm_instance.hide();
        confirm_instance.show(); 
    },
    "tip" : function(text,t){
         if (!tip_instance) {
             tip_instance = new Dialog({
                content : tip_tpl(),
                maskVisible : false
             });
             tip_instance.hide();
         }
         if (__t) {
             clearTimeout(__t);
             __t = null;
             tip_instance.hide();
         }
         tip_instance.getDlgDom().find(".js-tip").text(text);
         tip_instance.show();
         __t = setTimeout(function(){
             tip_instance.hide(); 
         },t || 3000)
    }

    
}

window.Pop = Pop;

module.exports = Pop;
module.exports = Pop;
