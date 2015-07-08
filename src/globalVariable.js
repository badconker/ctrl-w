
var Main = unsafeWindow.Main;
var _tid = unsafeWindow._tid;
/*var ArrayEx = unsafeWindow.ArrayEx;
 var ChatType = unsafeWindow.ChatType;
 var Clients = unsafeWindow.Clients;
 var CrossConsts = unsafeWindow.CrossConsts;
 var haxe = unsafeWindow.haxe;
 var HxOverrides = unsafeWindow.HxOverrides;*/
var js = unsafeWindow.js;
js.JQuery = $;
/*var Lambda = unsafeWindow.Lambda;
 var Reflect = unsafeWindow.Reflect;
 var Selection = unsafeWindow.Selection;
 var Std = unsafeWindow.Std;
 var StringBuf = unsafeWindow.StringBuf;
 var StringTools = unsafeWindow.StringTools;
 var Tag = unsafeWindow.Tag;
 var Tools = unsafeWindow.Tools;
 var Utils = unsafeWindow.Utils;*/
var mt = unsafeWindow.mt;
var mush_jquery = unsafeWindow.$;

if (typeof(exportFunction) == 'undefined') {
    var exportFunction = function(foo, scope, defAs){
        return foo;
    }
}
if (typeof(createObjectIn) == 'undefined') {
    var createObjectIn = function(obj,options){
        return {};
    }
}
if (typeof(cloneInto) == 'undefined') {
    var cloneInto = function(obj,targetScope,options){
        return obj;
    }
}
Main.k = createObjectIn(unsafeWindow.Main, {defineAs: "k"});

Main.k.window = unsafeWindow;
Main.k.version = GM_info.script.version;
Main.k.website = "http://ks26782.kimsufi.com/ctrlw";
Main.k.servurl = "http://ctrl-w.badconker.com";
Main.k.servurl_badconker = 'http://ctrlw.badconker.com';
Main.k.window = window;
Main.k.domain = document.domain;
Main.k.mushurl = 'http://' + document.domain;
Main.k.debug = true;
Main.k.errorList = [];
if(Main.k.debug){
    var console = unsafeWindow.console;
}else{
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}