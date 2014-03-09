var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
js.Cookie = function() { }
$hxClasses["js.Cookie"] = js.Cookie;

var CrossConsts = function() { }
$hxClasses["CrossConsts"] = CrossConsts;
CrossConsts.__name__ = ["CrossConsts"];
CrossConsts.COOK_SEL = "sel";
CrossConsts.COOK_CURCHAT = "curChat";
CrossConsts.REMOTING_COM_CHANNEL = "default";
CrossConsts.COOK_INV_OFFSET_L = "inv_offset_l";
CrossConsts.BASELINE_NONE = 439;
CrossConsts.BASELINE_CLOSET = 260;
CrossConsts.BASELINE_ACTIONS = 350;
CrossConsts.ISO_VERSION = 21;
CrossConsts.NB_PRIVATE_CHAN = 3;
CrossConsts.PRIVATE_CHAN_START = 7;


js.Cookie.__name__ = ["js","Cookie"];
js.Cookie.set = function(name,value,expireDelay,path,domain) {
	var s = name + "=" + StringTools.urlEncode(value);
	if(expireDelay != null) {
		var d;
		var d1 = new Date();
		var t = d1.getTime() + expireDelay * 1000;
		var d2 = new Date();
		d2.setTime(t);
		d = d2;
		s += ";expires=" + d.toGMTString();
	}
	if(path != null) s += ";path=" + path;
	if(domain != null) s += ";domain=" + domain;
	window.document.cookie = s;
}
js.Cookie.all = function() {
	var h = new haxe.ds.StringMap();
	var a = window.document.cookie.split(";");
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		e = StringTools.ltrim(e);
		var t = e.split("=");
		if(t.length < 2) continue;
		h.set(t[0],StringTools.urlDecode(t[1]));
	}
	return h;
}
js.Cookie.get = function(name) {
	return js.Cookie.all().get(name);
}

js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
if (typeof document != "undefined") js.Lib.document = document;
if (typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}

js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch(e) {
		return null;
	}
}
js.Browser.getSessionStorage = function() {
	try {
		var s = window.sessionStorage;
		s.getItem("");
		return s;
	} catch(e) {
		return null;
	}
}
js.Browser.createXMLHttpRequest = function() {
	if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if (typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
}

var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = {};
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
}
haxe.remoting = {}
haxe.remoting.Context = function() {
	this.objects = new haxe.ds.StringMap();
};
$hxClasses["haxe.remoting.Context"] = haxe.remoting.Context;
haxe.remoting.Context.__name__ = ["haxe","remoting","Context"];
haxe.remoting.Context.prototype = {
	addObject: function(name,obj,recursive) {
		this.objects.set(name,{ obj : obj, rec : recursive});
	}
	,call: function(path,params) {
		if(path.length < 2) throw "Invalid path '" + path.join(".") + "'";
		var inf = this.objects.get(path[0]);
		if(inf == null) throw "No such object " + path[0];
		var o = inf.obj;
		var m;
		var v = null;
		try {
			v = o[path[1]];
		} catch( e ) {
		}
		m = v;
		if(path.length > 2) {
			if(!inf.rec) throw "Can't access " + path.join(".");
			var _g1 = 2;
			var _g = path.length;
			while(_g1 < _g) {
				var i = _g1++;
				o = m;
				var v = null;
				try {
					v = o[path[i]];
				} catch( e ) {
				}
				m = v;
			}
		}
		if(!Reflect.isFunction(m)) throw "No such method " + path.join(".");
		return m.apply(o,params);
	}
	,__class__: haxe.remoting.Context
}
haxe.remoting.ExternalConnection = function(data,path) {
	this.__data = data;
	this.__path = path;
};

haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe.Http;
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.prototype = {
	setParameter: function(param,value) {
		this.params = Lambda.filter(this.params,function(p) {
			return p.param != param;
		});
		this.params.push({ param : param, value : value});
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(me.responseData = r.responseText); else if(s == null) me.onError("Failed to connect or resolve host"); else switch(s) {
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p.param) + "=" + StringTools.urlEncode(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h.header,h.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
}
Math.__name__ = ["Math"];


var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,last: function() {
		if(this.q == null) return null; else return this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}



var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}

var JqEx = function() { }
$hxClasses["JqEx"] = JqEx;
JqEx.__name__ = ["JqEx"];
JqEx.blink = function(j,period,start,finish) {
	if(finish == null) finish = -1;
	if(start == null) start = 0;
	if(period == null) period = 200;
	var cbk = null;
	cbk = function() {
		if(start != finish) {
			start = start + 1;
			JqEx.blink(j,period,start,finish);
		}
	};
	j.fadeOut(period).fadeIn(period,cbk);
	return j;
}
JqEx.j = function(sel) {
	return new js.JQuery(sel);
}
JqEx.ok = function(j) {
	return j;
}
JqEx.softHide = function(j) {
	j.css("visibility","hidden");
	j.attr("oldHeight",j.css("height"));
	return j;
}
JqEx.vis = function(j,onOff) {
	if(onOff) j.css("visibility","visible"); else j.css("visibility","hidden");
	return j;
}
JqEx.softShow = function(j) {
	j.css("visibility","visible");
	j.css("height",j.attr("oldHeight"));
	j.removeAttr("oldHeight");
}
JqEx.loading = function(jq) {
	jq.prepend("<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading...' />");
}
JqEx.postLoading = function(jq) {
	jq.append("<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading...' />");
	return jq;
}
JqEx.remLoading = function(jq) {
	jq.find(".cdLoading").remove();
	return jq;
}
JqEx.warp = function(jq,x,y) {
	var lval = jq.css("left").split("px")[0];
	jq.css("left",Std.parseInt(lval) + x + "px");
	if(y != null) {
		var tval = jq.css("top").split("px")[0];
		jq.css("top",Std.parseInt(tval) + y + "px");
	}
	return jq;
}
JqEx.move = function(jq,x,y,dur) {
	if(dur == null) dur = 200;
	var lval = jq.css("left").split("px")[0];
	jq.animate({ left : Std.parseInt(lval) + x + "px"},dur);
	if(y != null) {
		var tval = jq.css("top").split("px")[0];
		jq.animate({ top : Std.parseInt(tval) + y + "px"},dur);
	}
	return jq;
}
JqEx.countTo = function(jq,i,delay_ms) {
	if(delay_ms == null) delay_ms = 20;
	var start = Std.parseInt(jq.text());
	if(start == null) start = 0;
	if(start <= i + 1) {
		var steps = i + 1 - start;
		var _g = 0;
		while(_g < steps) {
			var j = [_g++];
			haxe.Timer.delay((function(j) {
				return function() {
					jq.text(Std.string(start + j[0]));
				};
			})(j),delay_ms * j[0]);
		}
	} else {
		var steps = start - i + 1;
		var _g = 0;
		while(_g < steps) {
			var j1 = [_g++];
			haxe.Timer.delay((function(j1) {
				return function() {
					jq.text(Std.string(start - j1[0]));
				};
			})(j1),delay_ms * j1[0]);
		}
	}
	return jq;
}
JqEx.tip = function(jq,t,b) {
	jq.hover(function(e) {
		mt.js.Tip.showTip(jq.toArray()[0],"","<div class='tiptop' >" + "<div class='tipbottom'>" + "<div class='tipbg'>" + "<div class='tipcontent'>" + "<h1>" + t + "</h1>" + b + "</div>" + "</div>" + "</div>" + "</div>");
	},function(e) {
		mt.js.Tip.hide();
	});
	return jq;
}

var Tools = $hxClasses["Tools"] = function() { }
Tools.__name__ = ["Tools"];
Tools.globalEval = function(script) {
	if(script.content == null || script.content.length == 0) return;
	var o = js.Lib.document;
	js.Lib.document = { write : function(data) {
		var t = o.createElement("div");
		t.setAttribute("id","_" + script.id);
		t.innerHTML = data;
		var s = o.getElementById(script.id);
		s.parentNode.insertBefore(t,s);
	}, getElementById : $bind(o,o.getElementById), getElementsByTagName : $bind(o,o.getElementsByTagName), getElementsByName : $bind(o,o.getElementsByName), body : o.body, attachEvent : function(eventName,handler) {
		return o.attachEvent(eventName,handler);
	}, detachEvent : function(eventName,handler) {
		return o.detachEvent(eventName,handler);
	}, addEventListener : function(eventName,handler,useCapture) {
		return o.addEventListener(eventName,handler,useCapture);
	}, removeEventListener : function(eventName,handler,useCapture) {
		return o.removeEventListener(eventName,handler,useCapture);
	}, _document : o, cookie : o.cookie};
	try {
		if(js.Lib.window.execScript != null) js.Lib.window.execScript(script.content); else if(js.Lib.window.eval != null) js.Lib.window.eval(script.content); else {
			var s = js.Lib.document.createElement("script");
			s.setAttribute("type","text/jatvascript");
			s.innerHTML = script.content;
			js.Lib.document.getElementsByTagName("head")[0].appendChild(s);
		}
	} catch( e ) {
		js.Lib.document = o;
		throw e;
	}
	js.Lib.document = o;
	return;
}
Tools.extractId = function(flow,id) {
	var a = flow.split("id=\"" + id + "\"");
	if(a.length != 2) return null;
	var tagPart = a[0];
	var id1 = tagPart.lastIndexOf("<") + 1;
	var tag = "";
	var _g1 = id1, _g = tagPart.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = HxOverrides.cca(tagPart,i);
		if((c < 97 || c > 122) && (c < 65 || c > 90) && c != 58) break;
		tag += String.fromCharCode(c);
	}
	var imp = a[1];
	var beginIndex = imp.indexOf(">") + 1;
	var crtIndex = beginIndex;
	var nextCloseIndex = 0;
	var nextOpenIndex = 0;
	var count = 1;
	var limit = 100000;
	while(true) {
		nextCloseIndex = imp.indexOf("</" + tag + ">",crtIndex);
		nextOpenIndex = imp.indexOf("<" + tag,crtIndex);
		var descending = nextOpenIndex < nextCloseIndex && nextOpenIndex != -1;
		count += descending?1:-1;
		if(count <= 0) break;
		crtIndex = descending?imp.indexOf(">",nextOpenIndex + 1):nextCloseIndex + 3 + tag.length;
		if(limit-- == 0) return null;
	}
	return HxOverrides.substr(imp,beginIndex,nextCloseIndex - 1 - beginIndex);
}
Tools.extractTag = function(data,tag,offset) {
	if(offset == null) offset = 0;
	var start = data.indexOf("<" + tag,offset);
	if(start == -1) return null;
	var begin = data.indexOf(">",start) + 1;
	var end = data.indexOf("</" + tag + ">",begin);
	var content = HxOverrides.substr(data,begin,end - begin);
	end += 3 + tag.length;
	var fullContent = HxOverrides.substr(data,start,end - start);
	return { content : content, start : start, end : end, fullContent : fullContent, id : null};
}
Tools.extractScripts = function(data) {
	var scripts = [];
	var currentIndex = 0;
	while(true) {
		var info = Tools.extractTag(data,"script",currentIndex);
		if(info == null) break;
		scripts.push(info);
		currentIndex = info.end;
	}
	return scripts;
}
Tools.hasTag = function(tag,source) {
	return source.split(tag + "=").length > 1;
}
Tools.makeTag = function(tag,source) {
	var output = { source : source, id : ""};
	var pos = source.indexOf(">");
	if(pos == -1) return null;
	if(Tools.hasTag(tag,source)) output.id = source.split(tag + "=")[1].split("\"")[1]; else {
		var before = HxOverrides.substr(source,0,pos);
		var after = HxOverrides.substr(source,pos,null);
		output.id = "script_" + Tools.SCRIPT_ID++;
		output.source = before + " id=\"" + output.id + "\"" + after;
	}
	return output;
}
Tools.updateContent = function(url,seek,dest,cb) {
	var r = new haxe.Http(url);
	var dbg = false;
	r.onData = function(data) {
		var meR = r;
		var _g1 = 0, _g = seek.length;
		while(_g1 < _g) {
			var i = _g1++;
			var target = js.Lib.document.getElementById(dest != null?dest[i]:seek[i]);
			if(target == null) {
				if(dbg) null;
				continue;
			}
			var input = Tools.extractId(data,seek[i]);
			if(input == null) try {
				if(dbg) null;
				target = js.Lib.document.body;
				var tag = Tools.extractTag(data,"body",0);
				input = tag.content;
				var scripts = Tools.extractScripts(input);
				var _g2 = 0;
				while(_g2 < scripts.length) {
					var s = scripts[_g2];
					++_g2;
					var data1 = Tools.makeTag("id",s.fullContent);
					if(data1 != null) {
						s.id = data1.id;
						input = StringTools.replace(input,s.fullContent,data1.source);
					}
				}
				target.innerHTML = input;
				if(dbg) null;
				var _g2 = 0;
				while(_g2 < scripts.length) {
					var s = scripts[_g2];
					++_g2;
					Tools.globalEval(s);
				}
				if(cb != null) cb();
				return;
			} catch( e ) {
				var regIt = true;
				var h = "";
				var meta = "";
				try {
					h = data.split("<head>")[1].split("</head>")[0];
					var start = "<meta name=\"msh\" content=\"";
					var i1 = h.indexOf("<meta name=\"msh\"");
					if(i1 != null) {
						meta = HxOverrides.substr(h,i1 + start.length,null);
						var end = meta.indexOf("\"");
						meta = HxOverrides.substr(meta,0,end);
						var keys = meta.split(",");
						if(Lambda.has(keys,"DEATH")) regIt = false;
					}
				} catch( d ) {
					h = "parse error data:" + data.length + " ";
					if(data.length < 256) h = h + " data: " + data;
				}
				var dsize = data.length;
				var msg = "error 2  loading:" + url + " tgt:" + seek[i] + " meta: " + meta + " hlen: " + h.length + " err: " + Std.string(e) + " es: " + haxe.Stack.exceptionStack().toString();
				if(h.length > 0) msg += " hl : >>" + h + "<<";
				if(dbg) null;
				js.Lib.window.location.assign(Tools.defaultUrl == null?url:Tools.defaultUrl);
				var s = StringTools.urlEncode(msg);
				if(regIt) Tools.ping("registerError/" + s);
				return;
			} else if(dbg) null;
			var scripts = Tools.extractScripts(input);
			var _g2 = 0;
			while(_g2 < scripts.length) {
				var s = scripts[_g2];
				++_g2;
				var data1 = Tools.makeTag("id",s.fullContent);
				if(data1 != null) {
					s.id = data1.id;
					input = StringTools.replace(input,s.fullContent,data1.source);
				}
			}
			target.innerHTML = input;
			if(dbg) null;
			var _g2 = 0;
			while(_g2 < scripts.length) {
				var s = scripts[_g2];
				++_g2;
				Tools.globalEval(s);
			}
			if(dbg) null;
		}
		if(cb != null) cb();
	};
	r.request(false);
	return false;
}
Tools.ping = function(url,cbk) {
	var r = new haxe.Http(url);
	r.async = true;
	r.request(false);
	if(cbk != null) r.onData = cbk;
}
Tools.send2SessionStore = function(k,v) {
	try {
		var ser = haxe.Serializer.run(v);
		((function($this) {
			var $r;
			var s;
			try {
				s = window.sessionStorage;
				s.getItem("");
			} catch( e ) {
				s = null;
			}
			$r = s;
			return $r;
		}(this))).setItem(k,ser);
	} catch( d ) {
		null;
	}
}
Tools.getFromSessionStore = function(k) {
	var v = ((function($this) {
		var $r;
		var s;
		try {
			s = window.sessionStorage;
			s.getItem("");
		} catch( e ) {
			s = null;
		}
		$r = s;
		return $r;
	}(this))).getItem(k);
	if(v == null) return null;
	return haxe.Unserializer.run(v);
}
Tools.send2Store = function(k,v) {
	try {
		var ser = haxe.Serializer.run(v);
		((function($this) {
			var $r;
			var s;
			try {
				s = window.localStorage;
				s.getItem("");
			} catch( e ) {
				s = null;
			}
			$r = s;
			return $r;
		}(this))).setItem(k,ser);
	} catch( d ) {
		null;
	}
}
Tools.getFromStore = function(k) {
	var v = ((function($this) {
		var $r;
		var s;
		try {
			s = window.localStorage;
			s.getItem("");
		} catch( e ) {
			s = null;
		}
		$r = s;
		return $r;
	}(this))).getItem(k);
	if(v == null) return null;
	return haxe.Unserializer.run(v);
}
Tools.jqColToInt = function(str,def) {
	if(StringTools.startsWith(str,"#")) return Std.parseInt("0x" + HxOverrides.substr(str,1,999)); else if(StringTools.startsWith(str,"rgb")) {
		str = HxOverrides.substr(str,3,null);
		var spl = str.split(",");
		var r = "0";
		var g = "0";
		var b = "0";
		var _g = 0;
		while(_g < spl.length) {
			var s = spl[_g];
			++_g;
			if(StringTools.startsWith(s,"(")) r = HxOverrides.substr(s,1,null); else if(StringEx.endsWith(s,")")) b = HxOverrides.substr(s,0,s.length - 1); else g = s;
		}
		return Std.parseInt(r) << 16 | Std.parseInt(g) << 8 | Std.parseInt(b);
	} else return def;
}

var Lambda = function() { }
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
}
function $iterator(o) { if( $.isArray(o) ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) {
	if( m == null ) return null;
	if( m.__id__ == null ) m.__id__ = $fid++;
	var f;
	if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__];
	if( f == null ) {
		f = function(){
			return f.method.apply(f.scope, arguments);
		};
		f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f;
	} return f;
};
$.fn.iterator = function() {
	return {
	pos : 0, j : this,
	hasNext : function() {
		return this.pos < this.j.length;
	}, next : function() {
		return $(this.j[this.pos++]);
	}};
};


var ALMHeroListState = $hxClasses["ALMHeroListState"] = { __ename__ : ["ALMHeroListState"], __constructs__ : ["DisplayHeroRoomActionActions","DisplayHeroItemActions"] }
ALMHeroListState.DisplayHeroRoomActionActions = ["DisplayHeroRoomActionActions",0];
ALMHeroListState.DisplayHeroRoomActionActions.toString = $estr;
ALMHeroListState.DisplayHeroRoomActionActions.__enum__ = ALMHeroListState;
ALMHeroListState.DisplayHeroItemActions = function(serial) { var $x = ["DisplayHeroItemActions",1,serial]; $x.__enum__ = ALMHeroListState; $x.toString = $estr; return $x; }
var ALMRoomListState = $hxClasses["ALMRoomListState"] = { __ename__ : ["ALMRoomListState"], __constructs__ : ["DisplayHeroAction","DisplayRoomAction","DisplayNone"] }
ALMRoomListState.DisplayHeroAction = function(serial) { var $x = ["DisplayHeroAction",0,serial]; $x.__enum__ = ALMRoomListState; $x.toString = $estr; return $x; }
ALMRoomListState.DisplayRoomAction = function(serial) { var $x = ["DisplayRoomAction",1,serial]; $x.__enum__ = ALMRoomListState; $x.toString = $estr; return $x; }
ALMRoomListState.DisplayNone = ["DisplayNone",2];
ALMRoomListState.DisplayNone.toString = $estr;
ALMRoomListState.DisplayNone.__enum__ = ALMRoomListState;

var ActionListMaintainer = $hxClasses["ActionListMaintainer"] = function() {
	this.heroWorking = false;
	this.roomWorking = false;
};
ActionListMaintainer.__name__ = ["ActionListMaintainer"];
ActionListMaintainer.j = function(s) {
	return new js.JQuery(s);
}
ActionListMaintainer.prototype = {
	refreshRoomInv: function() {
		var roomSel = JqEx.j("#room .selected");
		var toShow = null;
		if(roomSel.length > 0) toShow = roomSel.parent().attr("serial"); else if(Main.sel.currentRoomSelection != null) {
			toShow = Main.sel.currentRoomSelection;
			this.updateRoomListState(ALMRoomListState.DisplayRoomAction(Main.sel.currentRoomSelection));
		} else this.updateRoomListState(ALMRoomListState.DisplayNone);
		if(toShow == null) this.updateRoomListState(ALMRoomListState.DisplayNone); else if(Main.heroes.get(toShow) != null) this.updateRoomListState(ALMRoomListState.DisplayHeroAction(toShow)); else this.updateRoomListState(ALMRoomListState.DisplayRoomAction(toShow));
	}
	,refreshHeroInv: function() {
		var itemSel = JqEx.j("#myInventory .selected");
		if(itemSel.length <= 0) this.changeHeroListState(ALMHeroListState.DisplayHeroRoomActionActions); else this.changeHeroListState(ALMHeroListState.DisplayHeroItemActions(itemSel.parent().attr("serial")));
	}
	,refresh: function(force) {
		if(force == null) force = false;
		if(force) {
			this.heroState = null;
			this.roomState = null;
			this.roomWorking = false;
			this.heroWorking = false;
		}
		this.refreshHeroInv();
		this.refreshRoomInv();
	}
	,updateRoomListState: function(st) {
		var _g = this;
		var set = JqEx.j("#roomActionList1").add("#roomActionList2");
		if(this.roomState != null && Type.enumEq(this.roomState,st)) return;
		if(this.roomWorking) {
			if(this.roomState == null || this.roomState == ALMRoomListState.DisplayNone) {
				set.stop();
				this.roomWorking = false;
				this.updateRoomListState(st);
			} else null;
			return;
		}
		if(set.length > 0) {
			this.roomWorking = true;
			set.fadeTo(120,0,function() {
				var $e = (st);
				switch( $e[1] ) {
				case 0:
					var inSerial = $e[2];
					var pack = Main.heroes.get(inSerial);
					var tgt = JqEx.j("#roomActionList2");
					var src = JqEx.j(".cdActionRepository");
					var actions = src.find("[webdata=" + inSerial + "]").clone();
					tgt.html(actions);
					new js.JQuery("#cdItemActions").addClass("selectplayer");
					var tgth = JqEx.j("#roomActionList1");
					tgth.html("");
					tgth.parent().addClass("player");
					var htmlRes = new js.JQuery(".cdHeroSheet").clone();
					htmlRes.find(".cdFace").addClass("portrait_" + pack.dev_surname);
					htmlRes.find(".cdCharName").html(pack.name);
					htmlRes.find(".cdSkills").html(pack.skills.map(function(s) {
						return new Tag("li").append(new Tag("img").attr("src","/img/icons/skills/" + s.img + ".png")).tip(Utils.escapeJS(s.name),Utils.escapeJS(s.desc)).toString();
					}).join(""));
					var stCont = new js.JQuery(".cdStatusList");
					var content = new List();
					var $it0 = pack.statuses.iterator();
					while( $it0.hasNext() ) {
						var st1 = $it0.next();
						content.push(new Tag("li").append(new Tag("img").attr("src","/img/icons/ui/status/" + st1.img + ".png")).tip(Utils.escapeJS(st1.name),Utils.escapeJS(st1.desc)).toString());
					}
					var $it1 = pack.titles.iterator();
					while( $it1.hasNext() ) {
						var t = $it1.next();
						content.push(new Tag("li").append(new Tag("img").attr("src","/img/icons/ui/" + t.img + ".png")).tip(Utils.escapeJS(t.name),Utils.escapeJS(t.desc)).toString());
					}
					if(pack.spores != null) content.push(new Tag("span").append(new Tag("li").append(new Tag("img").attr("src",pack.spores.img))).content("x" + pack.spores.nb).toString());
					stCont.html(content.join(""));
					htmlRes.find(".cdStatusList").html(content.join(""));
					htmlRes.find(".presentation").html(pack.short_desc);
					if(pack.me) htmlRes.find(".cdEcoLink").hide();
					tgth.html(htmlRes.children());
					tgt.fadeTo(120,1);
					tgth.fadeTo(120,1);
					Main.tipAll();
					_g.roomWorking = false;
					break;
				case 1:
					var inSerial = $e[2];
					var tgt1 = JqEx.j("#roomActionList1");
					var tgt2 = JqEx.j("#roomActionList2");
					var src = JqEx.j(".cdActionRepository");
					var actions = src.find("[webdata=" + inSerial + "]").clone();
					new js.JQuery("#cdItemActions").removeClass("selectplayer");
					tgt1.parent().removeClass("player");
					tgt1.html(actions.filter(":even"));
					tgt2.html(actions.filter(":odd"));
					tgt1.fadeTo(120,1);
					tgt2.fadeTo(120,1);
					Main.tipAll();
					_g.roomWorking = false;
					break;
				case 2:
					var tgt1 = JqEx.j("#roomActionList1");
					var tgt2 = JqEx.j("#roomActionList2");
					tgt1.html("");
					tgt2.html("");
					_g.roomWorking = false;
					break;
				}
			});
		} else null;
	}
	,changeHeroListState: function(st) {
		var _g = this;
		if(this.roomState != null && Type.enumEq(this.heroState,st)) return;
		if(this.heroWorking) return;
		this.heroWorking = true;
		JqEx.j(".cdActionList").fadeTo(120,0,function() {
			_g.changeHeroListState2(st);
		});
	}
	,changeHeroListState2: function(st) {
		var _g = this;
		var $e = (st);
		switch( $e[1] ) {
		case 0:
			var tgt = JqEx.j(".cdActionList");
			var src = JqEx.j(".cdActionRepository .heroRoomActions").children().clone();
			tgt.html(src);
			JqEx.j(".cdActionList .move").hide();
			break;
		case 1:
			var serial = $e[2];
			var tgt = JqEx.j(".cdActionList");
			var src = JqEx.j(".cdActionRepository .heroSerialActions");
			var actions = src.children("[webdata=" + serial + "]").add(".cdActionRepository .heroSerialActions .cdReturnFromSelButton").clone();
			tgt.html(actions);
			Main.tipAll();
			JqEx.j(".cdActionList .move").hide();
			break;
		}
		this.heroState = st;
		JqEx.j(".cdActionList").hide().fadeTo(120,1,function() {
			_g.heroWorking = false;
		});
	}
	,__class__: ActionListMaintainer
}

var ArrayEx = function() { }
$hxClasses["ArrayEx"] = ArrayEx;
ArrayEx.__name__ = ["ArrayEx"];
ArrayEx.scramble = function(arr) {
	var _g1 = 0;
	var _g = 3 * (arr.length + Std.random(arr.length));
	while(_g1 < _g) {
		var x = _g1++;
		var b = Std.random(arr.length);
		var a = Std.random(arr.length);
		var temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}
	return arr;
}
ArrayEx.first = function(arr) {
	return arr[0];
}
ArrayEx.last = function(arr) {
	return arr[arr.length - 1];
}
ArrayEx.random = function(arr) {
	return arr[Std.random(arr.length)];
}
ArrayEx.reserve = function(n) {
	var r = new Array();
	r[n] = null;
	return r;
}
ArrayEx.rfind = function(arr,proc) {
	var res = null;
	var _g1 = 0;
	var _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		var idx = arr.length - i - 1;
		if(proc(arr[idx])) {
			res = arr[idx];
			break;
		}
	}
	return res;
}
ArrayEx.clear = function(arr) {
	arr.splice(0,arr.length);
}
ArrayEx.removeByIndex = function(arr,i) {
	arr.splice(i,1);
}
ArrayEx.enqueue = function(a,b) {
	var $it0 = $iterator(b)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		a.push(x);
	}
	return a;
}
ArrayEx.strip = function(a,f) {
	var top = a.length - 1;
	while(top >= 0) {
		if(f(a[top])) a.splice(top,1);
		top--;
	}
	return a;
}
ArrayEx.splat = function(arr,nb,e) {
	var _g = 0;
	while(_g < nb) {
		var i = _g++;
		arr.push(Reflect.copy(e));
	}
	return arr;
}
ArrayEx.wrap = function(arr,pre,post) {
	var r = [];
	var _g = 0;
	while(_g < arr.length) {
		var k = arr[_g];
		++_g;
		r.push(pre + Std.string(k) + post);
	}
	return r;
}
ArrayEx.bsearch = function(a,key,f) {
	var st = 0;
	var max = a.length;
	var index = -1;
	while(st < max) {
		index = st + max >> 1;
		var val = a[index];
		var cmp = f(key,val);
		if(cmp < 0) max = index; else if(cmp > 0) st = index + 1; else return val;
	}
	return null;
}
ArrayEx.except = function(it,exc) {
	return Lambda.filter(it,function(a) {
		return !Lambda.has(exc,a);
	});
}
ArrayEx.excepta = function(it,exc) {
	return Lambda.array(ArrayEx.except(it,exc));
}
ArrayEx.pushBack = function(l,e) {
	l.push(e);
	return e;
}
ArrayEx.pushFront = function(l,e) {
	l.unshift(e);
	return e;
}
ArrayEx.partition = function(it,predicate) {
	var p = new mt.gx.Pair([],[]);
	var _g = 0;
	while(_g < it.length) {
		var x = it[_g];
		++_g;
		if(predicate(x)) p.first.push(x); else p.second.push(x);
	}
	return p;
}
ArrayEx.removeLast = function(arr) {
	arr.pop();
}
ArrayEx.best = function(arr,f) {
	if(arr.length == 0) return null; else {
		var i = 0;
		var idx = 0;
		var _g1 = 0;
		var _g = arr.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(f(arr[idx]) < f(arr[i1])) idx = i1;
		}
		return arr[i];
	}
}
ArrayEx.bestNZ = function(arr,f) {
	if(arr.length == 0) return null; else {
		var cur = null;
		var idx = null;
		var _g1 = 0;
		var _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			var nv = f(arr[i]);
			if(nv != 0) {
				if(idx == null) {
					idx = i;
					cur = f(arr[idx]);
				} else if(nv > cur) {
					idx = i;
					cur = nv;
				}
			}
		}
		if(idx != null) return arr[idx]; else return null;
	}
}
ArrayEx.worstNZ = function(arr,f) {
	if(arr.length == 0) return null; else {
		var i = 0;
		var cur = 0;
		var idx = null;
		var _g1 = 0;
		var _g = arr.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			var nv = f(arr[i1]);
			if(nv != 0) {
				if(idx == null) {
					idx = 0;
					cur = f(arr[idx]);
				} else if(nv < cur) {
					idx = i1;
					cur = nv;
				}
			}
		}
		if(idx != null) return arr[idx]; else return null;
	}
}
ArrayEx.worst = function(arr,f) {
	if(arr.length == 0) return null; else {
		var i = 0;
		var idx = 0;
		var _g1 = 1;
		var _g = arr.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(f(arr[idx]) > f(arr[i1])) idx = i1;
		}
		return arr[i];
	}
}
ArrayEx.removeAll = function(a,f) {
	var _g = 0;
	var _g1 = a.slice();
	while(_g < _g1.length) {
		var d = _g1[_g];
		++_g;
		if(f(d)) HxOverrides.remove(a,d);
	}
}
var ChatType = $hxClasses["ChatType"] = { __ename__ : ["ChatType"], __constructs__ : ["Local","_Central","Mush","_Alert","Objectives","Wall","FavWall","Private0","Private1","Private2"] }
ChatType.Local = ["Local",0];
ChatType.Local.toString = $estr;
ChatType.Local.__enum__ = ChatType;
ChatType._Central = ["_Central",1];
ChatType._Central.toString = $estr;
ChatType._Central.__enum__ = ChatType;
ChatType.Mush = ["Mush",2];
ChatType.Mush.toString = $estr;
ChatType.Mush.__enum__ = ChatType;
ChatType._Alert = ["_Alert",3];
ChatType._Alert.toString = $estr;
ChatType._Alert.__enum__ = ChatType;
ChatType.Objectives = ["Objectives",4];
ChatType.Objectives.toString = $estr;
ChatType.Objectives.__enum__ = ChatType;
ChatType.Wall = ["Wall",5];
ChatType.Wall.toString = $estr;
ChatType.Wall.__enum__ = ChatType;
ChatType.FavWall = ["FavWall",6];
ChatType.FavWall.toString = $estr;
ChatType.FavWall.__enum__ = ChatType;
ChatType.Private0 = ["Private0",7];
ChatType.Private0.toString = $estr;
ChatType.Private0.__enum__ = ChatType;
ChatType.Private1 = ["Private1",8];
ChatType.Private1.toString = $estr;
ChatType.Private1.__enum__ = ChatType;
ChatType.Private2 = ["Private2",9];
ChatType.Private2.toString = $estr;
ChatType.Private2.__enum__ = ChatType;

mt.gx = {}
mt.gx.Pair = function(a,b) {
	this.first = a;
	this.second = b;
};

var Tag = function(n) {
	this.name = n;
	this.children = new List();
	this.att = new Array();
};
$hxClasses["Tag"] = Tag;
Tag.__name__ = ["Tag"];
Tag.attr2Html = function(s) {
	var l = s;
	var $it0 = Tag.hash2Attr.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		l = l.split(k).join(Tag.hash2Attr.get(k));
	}
	return l;
}
var Clients = $hxClasses["Clients"] = { __ename__ : ["Clients"], __constructs__ : ["ISO_MODULE"] }
Clients.ISO_MODULE = ["ISO_MODULE",0];
Clients.ISO_MODULE.toString = $estr;
Clients.ISO_MODULE.__enum__ = Clients;

Tag.prototype = {
	css: function(n,v) {
		this.att.push(new mt.gx.Pair("style","" + n + ":" + v + ";"));
	}
	,attr: function(n,c) {
		this.att.push(new mt.gx.Pair(n,c));
		return this;
	}
	,clone: function() {
		var cl = new Tag(this.name);
		cl.children = this.children.map(function(e) {
			switch(e[1]) {
			case 0:
				var s = e[2];
				return TagElem.Txt(s);
			case 1:
				var t = e[2];
				return TagElem.Tg(t.clone());
			}
		});
		cl.att = Lambda.fold(this.att,function(p,r) {
			r.push(new mt.gx.Pair(p.first,p.second));
			return r;
		},[]);
		return cl;
	}
	,content: function(str) {
		this.children.add(TagElem.Txt(str));
		return this;
	}
	,append: function(tg) {
		this.children.add(TagElem.Tg(tg));
		return this;
	}
	,format: function(c) {
		this.name = StdEx.format(this.name,c);
		this.children = this.children.map(function(e) {
			switch(e[1]) {
			case 0:
				var s = e[2];
				return TagElem.Txt(StdEx.format(s,c));
			case 1:
				var t = e[2];
				t.format(c);
				return TagElem.Tg(t);
			}
		});
		var _g = 0;
		var _g1 = this.att;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.second = StdEx.format(p.second);
		}
	}
	,toString: function() {
		var _g = this;
		var listAttr = function() {
			var s = " ";
			var _g1 = 0;
			var _g2 = _g.att;
			while(_g1 < _g2.length) {
				var p = _g2[_g1];
				++_g1;
				s += " " + p.first + " =\"" + p.second + "\" ";
			}
			return s;
		};
		var s;
		s = "<" + this.name + " " + listAttr() + (this.children.length > 0?">":"/>");
		var $it0 = this.children.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			switch(c[1]) {
			case 1:
				var tg = c[2];
				s += tg.toString();
				break;
			case 0:
				var t = c[2];
				s += t;
				break;
			}
		}
		if(this.children.length > 0) s += "</" + this.name + ">";
		return s;
	}
	,htmlEscapeEx: function(s) {
		var l = s;
		var $it0 = Tag.escapeHash.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			l = l.split(k).join(Tag.escapeHash.get(k));
		}
		return StringTools.htmlEscape(l);
	}
	,tip: function(title,body) {
		if(body == null) body = "";
		this.attr("onmouseover","Main.showTip(this," + "'<div class=\\'tiptop\\' >" + "<div class=\\'tipbottom\\'>" + "<div class=\\'tipbg\\'>" + "<div class=\\'tipcontent\\'>" + "<h1>" + Tag.attr2Html(title) + "</h1>" + Tag.attr2Html(body) + "</div>" + "</div>" + "</div>" + "</div>')");
		this.attr("onmouseout","Main.hideTip()");
		return this;
	}
	,__class__: Tag
}
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
}
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		var value;
		var v = null;
		try {
			v = o[f];
		} catch( e ) {
		}
		value = v;
		o2[f] = value;
	}
	return o2;
}
var Selection = function() {
};
$hxClasses["Selection"] = Selection;
$hxExpose(Selection, "Selection");
Selection.__name__ = ["Selection"];
Selection.j = function(sel) {
	return new js.JQuery(sel);
}
Selection.attr2Html = function(s) {
	return s.split("\\'").join("'");
}
Selection.prototype = {
	hasSelection: function() {
		return this.currentInvSelection != null || this.currentRoomSelection != null;
	}
	,canSelect: function(serial) {
		var jinv = Selection.j(".inv");
		var jset = Selection.j("#roomActionList1").add(Selection.j("#roomActionList2"));
		return jset.length > 0 && jinv.length > 0;
	}
	,selectBySerial: function(serial) {
		js.Cookie.set(CrossConsts.COOK_SEL,StringTools.urlEncode(serial),3600);
		var jMe = Selection.j("[serial=" + serial + "]");
		var domMe = jMe.toArray()[0];
		if(jMe.parent().attr("id") == "myInventory") {
			var allItems = JqEx.j("#myInventory .item").not(".cdEmptySlot").add("[serverselected=true]");
			Selection.j(".cdCharColSel").remove();
			Selection.j("#myInventory .selected").parent().removeClass("on");
			Selection.j("#myInventory .selected").remove();
			jMe.addClass("on").prepend(new Tag("div").attr("class","selected").toString());
			var pre = Selection.j("<div class='action stSel cdCharColSel'> " + (function($this) {
				var $r;
				var s = jMe.data("name");
				$r = s.split("\\'").join("'");
				return $r;
			}(this)) + " :</div>");
			Selection.j(".cdHeroOne").prepend(pre);
			Lambda.iter(allItems.toArray(),function(h) {
				h.onclick = function(e) {
					Main.selectItem(h);
				};
			});
			if(domMe != null) domMe.onclick = function(e) {
				Main.cancelSelection(jMe);
			};
			this.currentInvSelection = serial;
			Main.acListMaintainer.refreshHeroInv();
		} else if(jMe.parent().attr("id") == "room") {
			var allItems = JqEx.j("#room .item").not(".cdEmptySlot");
			Selection.j("#room .selected").parent().removeClass("on");
			Selection.j("#room .selected").remove();
			jMe.addClass("on").prepend(new Tag("div").attr("class","selected").toString());
			var lit;
			var s = jMe.data("name");
			lit = s.split("\\'").join("'");
			Selection.j("#tt_itemname").html(lit);
			Lambda.iter(allItems.toArray(),function(h1) {
				h1.onclick = function(e) {
					Main.selectItem(h1);
				};
			});
			if(domMe != null) domMe.onclick = function(e) {
				Main.cancelSelection(jMe);
			};
			this.currentRoomSelection = serial;
			Main.acListMaintainer.refreshRoomInv();
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) {
				if(Main.closet.visible) prx._setBaseLine(CrossConsts.BASELINE_CLOSET); else prx._setBaseLine(CrossConsts.BASELINE_ACTIONS);
			}
			Selection.j(".inv").css("visibility","visible");
			Selection.j(".cdDistrib").addClass("placard_on");
		} else {
			this.currentRoomSelection = serial;
			Main.acListMaintainer.refreshRoomInv();
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(CrossConsts.BASELINE_ACTIONS);
			Selection.j(".inv").css("visibility","visible");
			Selection.j(".cdDistrib").addClass("placard_on");
		}
	}
	,selectItem: function(frm) {
		this.selectBySerial(frm.getAttribute("serial"));
	}
	,cancelSelection: function(node) {
		var doHeroInv;
		if(node != null) doHeroInv = node.parents("#myInventory").length > 0; else doHeroInv = true;
		var doRoomInv;
		if(node != null) doRoomInv = node.parents("#room").length > 0; else doRoomInv = true;
		if(doHeroInv) {
			js.Cookie.set(CrossConsts.COOK_SEL,null,3600);
			var allItems = Selection.j("#myInventory .item").not(".cdEmptySlot");
			Selection.j(".cdCharColSel").remove();
			Selection.j("#myInventory .selected").parent().removeClass("on");
			Selection.j("#myInventory .selected").remove();
			Lambda.iter(allItems.toArray(),function(h) {
				h.onclick = function(e) {
					Main.selectItem(h);
				};
			});
			this.currentInvSelection = null;
			Main.acListMaintainer.refreshHeroInv();
			null;
		}
		if(doRoomInv) {
			js.Cookie.set(CrossConsts.COOK_SEL,null,3600);
			var allItems = Selection.j("#room .item").not(".cdEmptySlot");
			Selection.j("#room .selected").parent().removeClass("on");
			Selection.j("#room .selected").remove();
			Selection.j("#tt_itemname").text("");
			Lambda.iter(allItems.toArray(),function(h1) {
				h1.onclick = function(e) {
					Main.selectItem(h1);
				};
			});
			this.currentRoomSelection = null;
			Main.acListMaintainer.refreshRoomInv();
			null;
		}
		if(!Main.closet.visible) {
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(439);
			Selection.j(".inv").css("visibility","hidden");
			Selection.j(".cdDistrib").removeClass("placard_on");
		}
	}
	,refreshSelection: function() {
		if(this.currentInvSelection != null) this.selectBySerial(this.currentInvSelection);
		if(this.currentRoomSelection != null) this.selectBySerial(this.currentRoomSelection);
	}
	,__class__: Selection
}
function $hxExpose(src, path) {
	var o = typeof window != "undefined" ? window : exports;
	var parts = path.split(".");
	for(var ii = 0; ii < parts.length-1; ++ii) {
		var p = parts[ii];
		if(typeof o[p] == "undefined") o[p] = {};
		o = o[p];
	}
	o[parts[parts.length-1]] = src;
}

var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.int = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};