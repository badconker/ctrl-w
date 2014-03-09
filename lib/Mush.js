var $hx_exports = unsafeWindow;
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ALMHeroListState = $hxClasses["ALMHeroListState"] = { __ename__ : ["ALMHeroListState"], __constructs__ : ["DisplayHeroRoomActionActions","DisplayHeroItemActions"] };
ALMHeroListState.DisplayHeroRoomActionActions = ["DisplayHeroRoomActionActions",0];
ALMHeroListState.DisplayHeroRoomActionActions.toString = $estr;
ALMHeroListState.DisplayHeroRoomActionActions.__enum__ = ALMHeroListState;
ALMHeroListState.DisplayHeroItemActions = function(serial) { var $x = ["DisplayHeroItemActions",1,serial]; $x.__enum__ = ALMHeroListState; $x.toString = $estr; return $x; };
var ALMRoomListState = $hxClasses["ALMRoomListState"] = { __ename__ : ["ALMRoomListState"], __constructs__ : ["DisplayHeroAction","DisplayRoomAction","DisplayNone"] };
ALMRoomListState.DisplayHeroAction = function(serial) { var $x = ["DisplayHeroAction",0,serial]; $x.__enum__ = ALMRoomListState; $x.toString = $estr; return $x; };
ALMRoomListState.DisplayRoomAction = function(serial) { var $x = ["DisplayRoomAction",1,serial]; $x.__enum__ = ALMRoomListState; $x.toString = $estr; return $x; };
ALMRoomListState.DisplayNone = ["DisplayNone",2];
ALMRoomListState.DisplayNone.toString = $estr;
ALMRoomListState.DisplayNone.__enum__ = ALMRoomListState;
var ActionListMaintainer = $hx_exports.ActionListMaintainer = function() {
	this.heroWorking = false;
	this.roomWorking = false;
};
$hxClasses["ActionListMaintainer"] = ActionListMaintainer;
ActionListMaintainer.__name__ = ["ActionListMaintainer"];
ActionListMaintainer.j = function(s) {
	return new js.JQuery(s);
};
ActionListMaintainer.prototype = {
	changeHeroListState2: function(st) {
		var _g = this;
		switch(st[1]) {
		case 0:
			var tgt = JqEx.j(".cdActionList");
			var src = JqEx.j(".cdActionRepository .heroRoomActions").children().clone();
			tgt.html(src);
			JqEx.j(".cdActionList .move").hide();
			break;
		case 1:
			var serial = st[2];
			var tgt1 = JqEx.j(".cdActionList");
			var src1 = JqEx.j(".cdActionRepository .heroSerialActions");
			var actions = src1.children("[webdata=" + serial + "]").add(".cdActionRepository .heroSerialActions .cdReturnFromSelButton").clone();
			tgt1.html(actions);
			Main.tipAll();
			JqEx.j(".cdActionList .move").hide();
			break;
		}
		this.heroState = st;
		JqEx.j(".cdActionList").hide().fadeTo(120,1,function() {
			_g.heroWorking = false;
		});
	}
	,changeHeroListState: function(st) {
		var _g = this;
		if(this.roomState != null && Type.enumEq(this.heroState,st)) {
			Debug.MSG("rejected, already same state " + Std.string(st),{ fileName : "ActionListMaintainer.hx", lineNumber : 86, className : "ActionListMaintainer", methodName : "changeHeroListState"});
			return;
		}
		if(this.heroWorking) return;
		this.heroWorking = true;
		JqEx.j(".cdActionList").fadeTo(120,0,function() {
			_g.changeHeroListState2(st);
		});
	}
	,updateRoomListState: function(st) {
		var _g = this;
		var set = JqEx.j("#roomActionList1").add("#roomActionList2");
		if(this.roomState != null && Type.enumEq(this.roomState,st)) {
			Debug.MSG("maintain room rejected cause same state " + Std.string(st) + "<>" + Std.string(this.roomState),{ fileName : "ActionListMaintainer.hx", lineNumber : 114, className : "ActionListMaintainer", methodName : "updateRoomListState"});
			return;
		}
		if(this.roomWorking) {
			if(this.roomState == null || this.roomState == ALMRoomListState.DisplayNone) {
				set.stop();
				this.roomWorking = false;
				this.updateRoomListState(st);
			} else Debug.MSG("maintain room rejected cause working " + Std.string(st) + "<>" + Std.string(this.roomState),{ fileName : "ActionListMaintainer.hx", lineNumber : 128, className : "ActionListMaintainer", methodName : "updateRoomListState"});
			return;
		}
		if(set.length > 0) {
			this.roomWorking = true;
			set.fadeTo(120,0,function() {
				switch(st[1]) {
				case 0:
					var inSerial = st[2];
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
					var inSerial1 = st[2];
					var tgt1 = JqEx.j("#roomActionList1");
					var tgt2 = JqEx.j("#roomActionList2");
					var src1 = JqEx.j(".cdActionRepository");
					var actions1 = src1.find("[webdata=" + inSerial1 + "]").clone();
					new js.JQuery("#cdItemActions").removeClass("selectplayer");
					tgt1.parent().removeClass("player");
					tgt1.html(actions1.filter(":even"));
					tgt2.html(actions1.filter(":odd"));
					tgt1.fadeTo(120,1);
					tgt2.fadeTo(120,1);
					Main.tipAll();
					_g.roomWorking = false;
					break;
				case 2:
					var tgt11 = JqEx.j("#roomActionList1");
					var tgt21 = JqEx.j("#roomActionList2");
					tgt11.html("");
					tgt21.html("");
					_g.roomWorking = false;
					break;
				}
			});
		} else null;
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
	,refreshHeroInv: function() {
		var itemSel = JqEx.j("#myInventory .selected");
		if(itemSel.length <= 0) this.changeHeroListState(ALMHeroListState.DisplayHeroRoomActionActions); else this.changeHeroListState(ALMHeroListState.DisplayHeroItemActions(itemSel.parent().attr("serial")));
	}
	,refreshRoomInv: function() {
		var roomSel = JqEx.j("#room .selected");
		var toShow = null;
		if(roomSel.length > 0) toShow = roomSel.parent().attr("serial"); else if(Main.sel.currentRoomSelection != null) {
			toShow = Main.sel.currentRoomSelection;
			this.updateRoomListState(ALMRoomListState.DisplayRoomAction(Main.sel.currentRoomSelection));
		} else this.updateRoomListState(ALMRoomListState.DisplayNone);
		if(toShow == null) this.updateRoomListState(ALMRoomListState.DisplayNone); else if(Main.heroes.get(toShow) != null) this.updateRoomListState(ALMRoomListState.DisplayHeroAction(toShow)); else this.updateRoomListState(ALMRoomListState.DisplayRoomAction(toShow));
	}
	,__class__: ActionListMaintainer
};
var ArrayEx = function() { };
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
};
ArrayEx.first = function(arr) {
	return arr[0];
};
ArrayEx.last = function(arr) {
	return arr[arr.length - 1];
};
ArrayEx.random = function(arr) {
	return arr[Std.random(arr.length)];
};
ArrayEx.reserve = function(n) {
	var r = new Array();
	r[n] = null;
	return r;
};
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
};
ArrayEx.clear = function(arr) {
	arr.splice(0,arr.length);
};
ArrayEx.removeByIndex = function(arr,i) {
	arr.splice(i,1);
};
ArrayEx.enqueue = function(a,b) {
	var $it0 = $iterator(b)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		a.push(x);
	}
	return a;
};
ArrayEx.strip = function(a,f) {
	var top = a.length - 1;
	while(top >= 0) {
		if(f(a[top])) a.splice(top,1);
		top--;
	}
	return a;
};
ArrayEx.splat = function(arr,nb,e) {
	var _g = 0;
	while(_g < nb) {
		var i = _g++;
		arr.push(Reflect.copy(e));
	}
	return arr;
};
ArrayEx.wrap = function(arr,pre,post) {
	var r = [];
	var _g = 0;
	while(_g < arr.length) {
		var k = arr[_g];
		++_g;
		r.push(pre + Std.string(k) + post);
	}
	return r;
};
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
};
ArrayEx.except = function(it,exc) {
	return Lambda.filter(it,function(a) {
		return !Lambda.has(exc,a);
	});
};
ArrayEx.excepta = function(it,exc) {
	return Lambda.array(ArrayEx.except(it,exc));
};
ArrayEx.pushBack = function(l,e) {
	l.push(e);
	return e;
};
ArrayEx.pushFront = function(l,e) {
	l.unshift(e);
	return e;
};
ArrayEx.partition = function(it,predicate) {
	var p = new mt.gx.Pair([],[]);
	var _g = 0;
	while(_g < it.length) {
		var x = it[_g];
		++_g;
		if(predicate(x)) p.first.push(x); else p.second.push(x);
	}
	return p;
};
ArrayEx.removeLast = function(arr) {
	arr.pop();
};
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
};
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
};
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
};
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
};
ArrayEx.removeAll = function(a,f) {
	var _g = 0;
	var _g1 = a.slice();
	while(_g < _g1.length) {
		var d = _g1[_g];
		++_g;
		if(f(d)) HxOverrides.remove(a,d);
	}
};
var BitArray = function() {
	this.data = new Array();
};
$hxClasses["BitArray"] = BitArray;
BitArray.__name__ = ["BitArray"];
BitArray.bitSet = function(_v,_i) {
	return _v | _i;
};
BitArray.bitIs = function(_v,_i) {
	return (_v & _i) == _i;
};
BitArray.bitClear = function(_v,_i) {
	return _v & ~_i;
};
BitArray.bitNeg = function(_i) {
	return ~_i;
};
BitArray.bitToggle = function(_v,_onoff,_i) {
	if(_onoff) return _v | _i; else return _v & ~_i;
};
BitArray.unitTest = function() {
};
BitArray.prototype = {
	rawData: function() {
		return this.data;
	}
	,rawFill: function(a) {
		this.data = [];
		var _g1 = 0;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.data[i] = a[i];
		}
	}
	,fill: function(v) {
		if(v == false) this.data = []; else {
			var _g1 = 0;
			var _g = this.data.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.data[i] = 65535;
			}
		}
	}
	,copy: function(v) {
		this.data = [];
		var _g1 = 0;
		var _g = v.data.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.data[i] = v.data[i];
		}
	}
	,clear: function() {
		this.data = [];
	}
	,set: function(i,v) {
		var cell = i >> 4;
		if(this.data[cell] == null) this.data[cell] = 0;
		this.data[cell] = BitArray.bitToggle(this.data[cell],v,1 << (i & 15));
	}
	,has: function(i) {
		return this.get(i);
	}
	,get: function(i) {
		var cell = i >> 4;
		if(this.data[cell] == null) {
			this.data[cell] = 0;
			return false;
		} else return BitArray.bitIs(this.data[cell],1 << (i & 15));
	}
	,__class__: BitArray
};
var Closet = $hx_exports.Closet = function() {
	this.visible = null;
};
$hxClasses["Closet"] = Closet;
Closet.__name__ = ["Closet"];
Closet.j = function(s) {
	return new js.JQuery(s);
};
Closet.prototype = {
	sync: function() {
		if(this.visible == true) this.show(true,true); else if(this.visible == false) this.hide(true); else null;
	}
	,show: function(forced,immediate) {
		var _g = this;
		var doIt = function() {
			new js.JQuery(".invcolorbg").show();
			new js.JQuery(".inv#cdInventory").addClass("placard_on");
			_g.visible = true;
			if(!forced) Main.cancelSelection();
			new js.JQuery(".inv").css("visibility","visible");
			new js.JQuery(".cdDistrib").addClass("placard_on");
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(CrossConsts.BASELINE_CLOSET);
		};
		if(Main.isTuto() && !forced && Main.uiFlags().has(UI_FLAGS.UF_EXPECT_CLOSET_OPENED)) Tools.updateContent("/co",Main.selUpdtArr,null,function() {
			Main.resetJs();
			doIt();
		}); else doIt();
	}
	,serverHide: function() {
		var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
		if(prx != null) prx._cancelSelection();
		this.hide(false);
	}
	,hide: function(forced) {
		try {
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(CrossConsts.BASELINE_NONE);
		} catch( d ) {
			null;
		}
		new js.JQuery(".invcolorbg").hide();
		new js.JQuery(".inv#cdInventory").removeClass("placard_on");
		new js.JQuery(".inv").css("visibility","hidden");
		new js.JQuery(".cdDistrib").removeClass("placard_on");
		if(!forced) Main.sel.cancelSelection();
		this.visible = false;
	}
	,__class__: Closet
};
var CookieEx = function() { };
$hxClasses["CookieEx"] = CookieEx;
CookieEx.__name__ = ["CookieEx"];
CookieEx.read = function() {
	var g;
	g = js.Cookie.get("objectiveTable");
	if(g != null) CookieEx.objectiveTable = haxe.Unserializer.run(g); else CookieEx.objectiveTable = new haxe.ds.StringMap();
};
CookieEx.flush = function() {
	js.Cookie.set("objectiveTable",haxe.Serializer.run(CookieEx.objectiveTable));
};
var ChatType = $hxClasses["ChatType"] = { __ename__ : ["ChatType"], __constructs__ : ["Local","_Central","Mush","_Alert","Objectives","Wall","FavWall","Private0","Private1","Private2"] };
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
var UI_FLAGS = $hxClasses["UI_FLAGS"] = { __ename__ : ["UI_FLAGS"], __constructs__ : ["UF_EXPECT_CLOSET_OPENED","UF_FAKE_HUNTER","UF_FORCE_CLOSET_OPENED","UF_BREAK_THE_DOOR","UF_EXPECT_NORMAL_MODE","UF_SIMPLE_UI","UF_EXPECT_TIPS"] };
UI_FLAGS.UF_EXPECT_CLOSET_OPENED = ["UF_EXPECT_CLOSET_OPENED",0];
UI_FLAGS.UF_EXPECT_CLOSET_OPENED.toString = $estr;
UI_FLAGS.UF_EXPECT_CLOSET_OPENED.__enum__ = UI_FLAGS;
UI_FLAGS.UF_FAKE_HUNTER = ["UF_FAKE_HUNTER",1];
UI_FLAGS.UF_FAKE_HUNTER.toString = $estr;
UI_FLAGS.UF_FAKE_HUNTER.__enum__ = UI_FLAGS;
UI_FLAGS.UF_FORCE_CLOSET_OPENED = ["UF_FORCE_CLOSET_OPENED",2];
UI_FLAGS.UF_FORCE_CLOSET_OPENED.toString = $estr;
UI_FLAGS.UF_FORCE_CLOSET_OPENED.__enum__ = UI_FLAGS;
UI_FLAGS.UF_BREAK_THE_DOOR = ["UF_BREAK_THE_DOOR",3];
UI_FLAGS.UF_BREAK_THE_DOOR.toString = $estr;
UI_FLAGS.UF_BREAK_THE_DOOR.__enum__ = UI_FLAGS;
UI_FLAGS.UF_EXPECT_NORMAL_MODE = ["UF_EXPECT_NORMAL_MODE",4];
UI_FLAGS.UF_EXPECT_NORMAL_MODE.toString = $estr;
UI_FLAGS.UF_EXPECT_NORMAL_MODE.__enum__ = UI_FLAGS;
UI_FLAGS.UF_SIMPLE_UI = ["UF_SIMPLE_UI",5];
UI_FLAGS.UF_SIMPLE_UI.toString = $estr;
UI_FLAGS.UF_SIMPLE_UI.__enum__ = UI_FLAGS;
UI_FLAGS.UF_EXPECT_TIPS = ["UF_EXPECT_TIPS",6];
UI_FLAGS.UF_EXPECT_TIPS.toString = $estr;
UI_FLAGS.UF_EXPECT_TIPS.__enum__ = UI_FLAGS;
var CrossConsts = function() { };
$hxClasses["CrossConsts"] = CrossConsts;
CrossConsts.__name__ = ["CrossConsts"];
var CrossFlags = $hxClasses["CrossFlags"] = { __ename__ : ["CrossFlags"], __constructs__ : ["MushBody","PilgredUnlocked","IcarusLanded","IsA"] };
CrossFlags.MushBody = ["MushBody",0];
CrossFlags.MushBody.toString = $estr;
CrossFlags.MushBody.__enum__ = CrossFlags;
CrossFlags.PilgredUnlocked = ["PilgredUnlocked",1];
CrossFlags.PilgredUnlocked.toString = $estr;
CrossFlags.PilgredUnlocked.__enum__ = CrossFlags;
CrossFlags.IcarusLanded = ["IcarusLanded",2];
CrossFlags.IcarusLanded.toString = $estr;
CrossFlags.IcarusLanded.__enum__ = CrossFlags;
CrossFlags.IsA = ["IsA",3];
CrossFlags.IsA.toString = $estr;
CrossFlags.IsA.__enum__ = CrossFlags;
var FeedResponse = $hxClasses["FeedResponse"] = { __ename__ : ["FeedResponse"], __constructs__ : ["FRReload","FRJq"] };
FeedResponse.FRReload = ["FRReload",0];
FeedResponse.FRReload.toString = $estr;
FeedResponse.FRReload.__enum__ = FeedResponse;
FeedResponse.FRJq = function(jq,html,fx) { var $x = ["FRJq",1,jq,html,fx]; $x.__enum__ = FeedResponse; $x.toString = $estr; return $x; };
var DateEx = function() { };
$hxClasses["DateEx"] = DateEx;
DateEx.__name__ = ["DateEx"];
DateEx.lt = function(d1,d2) {
	return HxOverrides.dateStr(d1) < HxOverrides.dateStr(d2);
};
DateEx.gt = function(d1,d2) {
	return HxOverrides.dateStr(d1) < HxOverrides.dateStr(d2);
};
DateEx.eq = function(d1,d2) {
	return HxOverrides.dateStr(d1) == HxOverrides.dateStr(d2);
};
DateEx.diff = function(d1,d2) {
	return d1.getTime() - d2.getTime();
};
DateEx.diffHours = function(d1,d2) {
	return (d1.getTime() - d2.getTime()) / 3600000;
};
DateEx.diffSeconds = function(d1,d2) {
	return (d1.getTime() - d2.getTime()) / 1000;
};
DateEx.toSec = function(d) {
	return d.getTime() * 0.001;
};
DateEx.addSeconds = function(d,t) {
	var t1 = d.getTime() + t * 1000.0;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
DateEx.addMins = function(d,t) {
	var t1 = d.getTime() + t * 60.0 * 1000.0;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
DateEx.addHours = function(date,t) {
	var t1 = date.getTime() + t * 60.0 * 60.0 * 1000.0;
	var d = new Date();
	d.setTime(t1);
	return d;
};
DateEx.addDays = function(d,t) {
	var t1 = d.getTime() + t * 24.0 * 60.0 * 60.0 * 1000.0;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
DateEx.round = function(d,secSlice) {
	var secs = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
	var nb = (secs / secSlice | 0) * secSlice | 0;
	var remHrs = nb / 3600 | 0;
	nb -= remHrs * 3600;
	var remMin = nb / 60 | 0;
	nb -= remMin * 60;
	var remSec = nb;
	return new Date(d.getFullYear(),d.getMonth(),d.getDate(),remHrs | 0,remMin | 0,remSec | 0);
};
var DateTools = function() { };
$hxClasses["DateTools"] = DateTools;
DateTools.__name__ = ["DateTools"];
DateTools.delta = function(d,t) {
	var t1 = d.getTime() + t;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
var Debug = function() { };
$hxClasses["Debug"] = Debug;
Debug.__name__ = ["Debug"];
Debug.NOT_NULL = function(d) {
	return;
};
Debug.NOT_ZERO = function(d) {
	return;
};
Debug.getTarget = function() {
	return "js";
};
Debug.ASSERT = function(_Obj,_s,pos) {
	return;
};
Debug.NOP = function() {
	return;
};
Debug.ASSERT_MINMAX = function(obj,min,max,_s,pos) {
	return;
};
Debug.BREAK = function(_Str,pos) {
	throw "error  / break ";
	return null;
};
Debug.MSG = function(o,pos) {
};
Debug.REPORT = function(_Str,pos) {
	throw "Dear user, sorry for the inconvenience : please report this issue to the Motion-Twin support http://support.motion-twin.com " + _Str;
};
Debug.CHECK = function(o,_Str,pos) {
	if(o == null) throw "FAILED : NULL " + _Str + Std.string(pos); else if(o == false) throw "FAILED : FALSE " + _Str + Std.string(pos);
	return null;
};
var Dice = function() { };
$hxClasses["Dice"] = Dice;
Dice.__name__ = ["Dice"];
Dice.roll = function(min,max) {
	var i = Std.random(max - min + 1) + min;
	return i;
};
Dice.roll2 = function(min,max) {
	var d = Dice.roll(min,max) + Dice.roll(min,max);
	d >>= 1;
	return d;
};
Dice.percent2 = function(thresh) {
	var r = Dice.roll2(1,100);
	return r <= thresh;
};
Dice.percent = function(thresh) {
	var r = Dice.roll(1,100);
	return r <= thresh;
};
Dice.oneChance = function(qty) {
	return Dice.roll(1,qty) == qty;
};
Dice.D100 = function() {
	return Dice.roll(1,100);
};
Dice.toss = function() {
	return Std.random(2) == 0;
};
Dice.rollF = function(min,max) {
	return Math.random() * (max - min) + min;
};
var Freq = $hxClasses["Freq"] = { __ename__ : ["Freq"], __constructs__ : ["Once","NTimes","Allways"] };
Freq.Once = ["Once",0];
Freq.Once.toString = $estr;
Freq.Once.__enum__ = Freq;
Freq.NTimes = function(n) { var $x = ["NTimes",1,n]; $x.__enum__ = Freq; $x.toString = $estr; return $x; };
Freq.Allways = ["Allways",2];
Freq.Allways.toString = $estr;
Freq.Allways.__enum__ = Freq;
var EnumEx = function() { };
$hxClasses["EnumEx"] = EnumEx;
EnumEx.__name__ = ["EnumEx"];
EnumEx.random = function(e) {
	return ArrayEx.random(Type.allEnums(e));
};
EnumEx.next = function(v,e) {
	var len = Type.allEnums(e).length;
	return Type.createEnumIndex(e,(v[1] + 1) % len);
};
EnumEx.previous = function(v,e) {
	var len = Type.allEnums(e).length;
	return Type.createEnumIndex(e,(v[1] + (len - 1)) % len);
};
EnumEx.array = function(e) {
	return Type.allEnums(e);
};
EnumEx.flags2List = function(e,f) {
	var res = new List();
	var _g = 0;
	var _g1 = Type.allEnums(e);
	while(_g < _g1.length) {
		var ef = _g1[_g];
		++_g;
		if((f & 1 << ef[1]) != 0) res.push(ef);
	}
	return res;
};
EnumEx.iterator = function(e) {
	var _this = Type.allEnums(e);
	return HxOverrides.iter(_this);
};
EnumEx.iterFlags = function(e,f,p) {
	var _g = 0;
	var _g1 = Type.allEnums(e);
	while(_g < _g1.length) {
		var ef = _g1[_g];
		++_g;
		if((f & 1 << ef[1]) != 0) p(ef);
	}
};
EnumEx.index = function(v) {
	return v[1];
};
EnumEx.createI = function(e,v) {
	return Type.createEnumIndex(e,v);
};
EnumEx.createS = function(e,v) {
	return Type.createEnum(e,v);
};
EnumEx.safeCreateS = function(e,v) {
	try {
		return Type.createEnum(e,v);
	} catch( d ) {
		return null;
	}
};
EnumEx.str = function(v) {
	return Std.string(v);
};
EnumEx.getOpt = function(v) {
	switch(v[1]) {
	case 1:
		var b = v[2];
		return b;
	default:
		throw "invalid option depackaging";
	}
};
var EnumHash = function(e) {
	this.data = new IntHash();
	this.e = e;
};
$hxClasses["EnumHash"] = EnumHash;
EnumHash.__name__ = ["EnumHash"];
EnumHash.prototype = {
	clear: function() {
		this.data = new IntHash();
	}
	,exists: function(key) {
		return this.data.exists(key[1]);
	}
	,get: function(key) {
		return this.data.get(key[1]);
	}
	,remove: function(key) {
		return this.data.remove(key[1]);
	}
	,set: function(key,value) {
		this.data.set(key[1],value);
	}
	,getArray: function() {
		return Lambda.array(this.data);
	}
	,iterator: function() {
		return this.data.iterator();
	}
	,keys: function() {
		var _g = this;
		var iter = this.data.keys();
		return { next : function() {
			return Type.createEnumIndex(_g.e,iter.next());
		}, hasNext : $bind(iter,iter.hasNext)};
	}
	,iterKV: function(proc) {
		var $it0 = this.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			proc(k,this.data.get(k[1]));
		}
	}
	,mapKV: function(proc) {
		var l = new List();
		var $it0 = this.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			l.add(proc(k,this.data.get(k[1])));
		}
		return l;
	}
	,filterKV: function(proc) {
		var l = new List();
		var $it0 = this.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var v = this.data.get(k[1]);
			if(proc(k,v)) l.add(v);
		}
		return l;
	}
	,filterKVH: function(proc) {
		var l = new EnumHash(this.e);
		var $it0 = this.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var v = this.data.get(k[1]);
			if(proc(k,v)) l.data.set(k[1],v);
		}
		return l;
	}
	,isoKVH: function(proc) {
		var l = new EnumHash(this.e);
		var $it0 = this.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			l.set(k,proc(k,this.data.get(k[1])));
		}
		return l;
	}
	,hxSerialize: function(s) {
		s.serialize(Type.getEnumName(this.e));
		s.serialize(this.data);
	}
	,hxUnserialize: function(s) {
		var p = s.unserialize();
		this.e = Type.resolveEnum(p);
		this.data = s.unserialize();
	}
	,__class__: EnumHash
};
var Ex = function() { };
$hxClasses["Ex"] = Ex;
Ex.__name__ = ["Ex"];
Ex.whether = function(d,f,dfl) {
	if(d == null) return dfl; else return f(d);
};
Ex.dflt = function(d,dfl) {
	if(d == null) return dfl; else return d;
};
Ex.assert = function(d,msg) {
	if(msg == null) msg = "";
	if(d == null) throw "assert " + msg; else return d;
};
var Flags = function(v) {
	if(v == null) v = 0;
	this.rep = v;
};
$hxClasses["Flags"] = Flags;
Flags.__name__ = ["Flags"];
Flags.ofInt = function(i) {
	var res = new Flags(i);
	return res;
};
Flags.test = function(rep,v) {
	return (rep & 1 << v[1]) != 0;
};
Flags.prototype = {
	has: function(v) {
		return (this.rep & 1 << v[1]) != 0;
	}
	,get: function(v) {
		return (this.rep & 1 << v[1]) != 0;
	}
	,set: function(v) {
		this.rep |= 1 << v[1];
	}
	,unset: function(v) {
		this.rep &= ~(1 << v[1]);
	}
	,clear: function() {
		this.rep = 0;
	}
	,toInt: function() {
		return this.rep;
	}
	,__class__: Flags
};
var Hash = function() {
	this.h = { };
};
$hxClasses["Hash"] = Hash;
Hash.__name__ = ["Hash"];
Hash.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += i;
			s.b += " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: Hash
};
var HashEx = function() { };
$hxClasses["HashEx"] = HashEx;
HashEx.__name__ = ["HashEx"];
HashEx.filterKV = function(rep,proc) {
	var l = new Hash();
	var $it0 = rep.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		var v = rep.get(k);
		if(proc(k,v)) l.set(k,v);
	}
	return l;
};
HashEx.mapKV = function(rep,f) {
	var l = new Hash();
	var $it0 = rep.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		l.set(k,f(k,rep.get(k)));
	}
	return l;
};
HashEx.iterKV = function(rep,f) {
	var $it0 = rep.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		f(k,rep.get(k));
	}
	return rep;
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
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
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IntHash = function() {
	this.h = { };
};
$hxClasses["IntHash"] = IntHash;
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += "" + i;
			s.b += " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: IntHash
};
var IntHashEx = function() { };
$hxClasses["IntHashEx"] = IntHashEx;
IntHashEx.__name__ = ["IntHashEx"];
IntHashEx.iterKV = function(rep,f) {
	var $it0 = rep.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		f(k,rep.get(k));
	}
	return rep;
};
IntHashEx.mapKV = function(rep,f) {
	var l = new IntHash();
	var $it0 = rep.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		l.set(k,f(k,rep.get(k)));
	}
	return l;
};
IntHashEx.mapKVH = function(rep,proc) {
	var l = new IntHash();
	var $it0 = rep.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		l.set(k,proc(k,rep.get(k)));
	}
	return l;
};
IntHashEx.innerCount = function(x) {
	var rep = new IntHash();
	IntHashEx.iterKV(x,function(k,v) {
		if(!rep.exists(k)) rep.set(k,1); else rep.set(k,1 + rep.get(k));
	});
	return rep;
};
IntHashEx.innerSumI = function(x,get) {
	var rep = new IntHash();
	IntHashEx.iterKV(x,function(k,v) {
		if(!rep.exists(k)) rep.set(k,get(v)); else rep.set(k,get(v) + rep.get(k));
	});
	return rep;
};
IntHashEx.innerSumF = function(x,get) {
	var rep = new IntHash();
	IntHashEx.iterKV(x,function(k,v) {
		if(!rep.exists(k)) rep.set(k,get(v)); else rep.set(k,get(v) + rep.get(k));
	});
	return rep;
};
IntHashEx.innerAvg = function(x,get,getLen) {
	var rep = new IntHash();
	IntHashEx.iterKV(x,function(k,v) {
		if(!rep.exists(k)) rep.set(k,{ len : getLen(v), sum : get(v), avg : null}); else {
			var d = rep.get(k);
			rep.set(k,{ len : d.len + getLen(v), sum : d.sum + get(v), avg : d.avg});
		}
	});
	var $it0 = rep.iterator();
	while( $it0.hasNext() ) {
		var v1 = $it0.next();
		if(v1.len != 0) v1.avg = v1.sum / v1.len; else v1.avg = null;
	}
	return rep;
};
var JQueryUi = function() { };
$hxClasses["JQueryUi"] = JQueryUi;
JQueryUi.__name__ = ["JQueryUi"];
JQueryUi.j = function(v) {
	return new js.JQuery(v);
};
JQueryUi.dialog = function(jq,call,data) {
	if(call != null) return jq.dialog(call,data); else if(data != null) return jq.dialog(data); else return jq.dialog();
};
var JqEx = function() { };
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
};
JqEx.j = function(sel) {
	return new js.JQuery(sel);
};
JqEx.ok = function(j) {
	return j;
};
JqEx.softHide = function(j) {
	j.css("visibility","hidden");
	j.attr("oldHeight",j.css("height"));
	return j;
};
JqEx.vis = function(j,onOff) {
	if(onOff) j.css("visibility","visible"); else j.css("visibility","hidden");
	return j;
};
JqEx.softShow = function(j) {
	j.css("visibility","visible");
	j.css("height",j.attr("oldHeight"));
	j.removeAttr("oldHeight");
};
JqEx.loading = function(jq) {
	jq.prepend("<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading...' />");
};
JqEx.postLoading = function(jq) {
	jq.append("<img class='cdLoading' src='/img/icons/ui/loading1.gif' alt='loading...' />");
	return jq;
};
JqEx.remLoading = function(jq) {
	jq.find(".cdLoading").remove();
	return jq;
};
JqEx.warp = function(jq,x,y) {
	var lval = jq.css("left").split("px")[0];
	jq.css("left",Std.parseInt(lval) + x + "px");
	if(y != null) {
		var tval = jq.css("top").split("px")[0];
		jq.css("top",Std.parseInt(tval) + y + "px");
	}
	return jq;
};
JqEx.move = function(jq,x,y,dur) {
	if(dur == null) dur = 200;
	var lval = jq.css("left").split("px")[0];
	jq.animate({ left : Std.parseInt(lval) + x + "px"},dur);
	if(y != null) {
		var tval = jq.css("top").split("px")[0];
		jq.animate({ top : Std.parseInt(tval) + y + "px"},dur);
	}
	return jq;
};
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
					jq.text("" + (start + j[0]));
				};
			})(j),delay_ms * j[0]);
		}
	} else {
		var steps1 = start - i + 1;
		var _g1 = 0;
		while(_g1 < steps1) {
			var j1 = [_g1++];
			haxe.Timer.delay((function(j1) {
				return function() {
					jq.text("" + (start - j1[0]));
				};
			})(j1),delay_ms * j1[0]);
		}
	}
	return jq;
};
JqEx.tip = function(jq,t,b) {
	jq.hover(function(e) {
		mt.js.Tip.showTip(jq.toArray()[0],"","<div class='tiptop' >" + "<div class='tipbottom'>" + "<div class='tipbg'>" + "<div class='tipcontent'>" + "<h1>" + t + "</h1>" + b + "</div>" + "</div>" + "</div>" + "</div>");
	},function(e1) {
		mt.js.Tip.hide();
	});
	return jq;
};
var Js2Swf_ISO_MODULE = function() {
};
$hxClasses["Js2Swf_ISO_MODULE"] = Js2Swf_ISO_MODULE;
Js2Swf_ISO_MODULE.__name__ = ["Js2Swf_ISO_MODULE"];
Js2Swf_ISO_MODULE.prototype = {
	_echo: function() {
	}
	,_event: function(str) {
	}
	,_forceData: function(str) {
	}
	,_cancelSelection: function() {
	}
	,_setBaseLine: function(v) {
	}
	,_gatherUp: function(a,b,r) {
	}
	,__class__: Js2Swf_ISO_MODULE
};
var JsImage = function(s,w,h) {
	this.o = new Image();
	this.o.url = s;
	this.w = w;
	this.h = h;
};
$hxClasses["JsImage"] = JsImage;
JsImage.__name__ = ["JsImage"];
JsImage.prototype = {
	width: function(v) {
		if(v == null) return this.w; else return this.w = v;
	}
	,height: function(v) {
		if(v == null) return this.h; else return this.h = v;
	}
	,__class__: JsImage
};
var JsMath = function() { };
$hxClasses["JsMath"] = JsMath;
JsMath.__name__ = ["JsMath"];
JsMath.blocLerp = function(j0,j1,oe) {
	var j1o = j1.offset();
	var anmDelay = 750;
	var fadeDelay = 200;
	j0.animate({ left : "" + j1o.left + "px", top : "" + j1o.top + "px", width : j1.width() + "px", height : j1.height() + "px"},anmDelay,"linear").fadeTo(fadeDelay,0);
	haxe.Timer.delay(function() {
		j0.remove();
		if(oe != null) oe();
	},anmDelay + fadeDelay);
};
var Lambda = function() { };
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
};
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
};
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
};
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
};
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
};
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
};
var LambdaEx = function() { };
$hxClasses["LambdaEx"] = LambdaEx;
LambdaEx.__name__ = ["LambdaEx"];
LambdaEx.scramble = function(it) {
	var arr = Lambda.array(it);
	var _g1 = 0;
	var _g = arr.length * 2;
	while(_g1 < _g) {
		var x = _g1++;
		var b = Std.random(arr.length);
		var a = Std.random(arr.length);
		var temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}
	return Lambda.list(arr);
};
LambdaEx.find = function(it,predicate,dflt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(predicate(x)) return x;
	}
	return dflt;
};
LambdaEx.sum = function(it,valFunc) {
	var v = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		v += valFunc(x);
	}
	return v;
};
LambdaEx.avg = function(it,valFunc) {
	var len = Lambda.count(it);
	if(len == 0) return null;
	var v = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		v += valFunc(x);
	}
	return v / len;
};
LambdaEx.locate = function(it,predicate,dflt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var o = predicate(x);
		if(o != null) return o;
	}
	return dflt;
};
LambdaEx.test = function(it,predicate) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(predicate(x)) return true;
	}
	return false;
};
LambdaEx.allTrue = function(it,predicate) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!predicate(x)) return false;
	}
	return true;
};
LambdaEx.partition = function(it,predicate) {
	var p = new mt.gx.Pair(new List(),new List());
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(predicate(x)) p.first.add(x); else p.second.add(x);
	}
	return p;
};
LambdaEx.partitionA = function(it,predicate) {
	var p = new mt.gx.Pair([],[]);
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(predicate(x)) p.first.push(x); else p.second.push(x);
	}
	return p;
};
LambdaEx.nth = function(it,n,dflt) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(i == n) return x;
		i++;
	}
	return dflt;
};
LambdaEx.first = function(it,dflt) {
	return LambdaEx.nth(it,0,dflt);
};
LambdaEx.nullStrip = function(it) {
	return Lambda.filter(it,function(x) {
		return x != null;
	});
};
LambdaEx.reverse = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.push(x);
	}
	return l;
};
LambdaEx.when = function(it,match,proc) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(match(x)) {
			proc(x);
			return;
		}
	}
};
LambdaEx.singletons = function(it,eqFunc) {
	var infer = new List();
	if(eqFunc == null) eqFunc = function(a,b) {
		return a == b;
	};
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!Lambda.exists(infer,(function(f,a1) {
			return function(a2) {
				return f(a1,a2);
			};
		})(eqFunc,x))) infer.add(x);
	}
	return infer;
};
LambdaEx.range = function(it,min,max) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		if(i >= min) l.add(k);
		i++;
		if(i == max) break;
	}
	return l;
};
LambdaEx.packSimilar = function(it,eq) {
	var a = new List();
	if(eq == null) eq = function(a1,b) {
		return a1 == b;
	};
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(a.last() == null) a.add({ v : v, nb : 1}); else if(eq(a.last().v,v)) a.last().nb++; else a.add({ v : v, nb : 1});
	}
	return a;
};
LambdaEx.removeOne = function(it,testFunc) {
	var res = new List();
	var done = false;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!done && testFunc(x)) done = true; else res.push(x);
	}
	return res;
};
LambdaEx.inject = function(it,n,v) {
	var _g = 0;
	while(_g < n) {
		var x = _g++;
		it.push(v);
	}
	return it;
};
LambdaEx.head = function(it,n) {
	var i = 0;
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		if(i >= n) return l;
		l.add(e);
		i++;
	}
	return l;
};
LambdaEx.tail = function(it,n) {
	var i = 0;
	var len = Lambda.count(it);
	return Lambda.filter(it,function(x) {
		return i++ >= len - n;
	});
};
LambdaEx.randomSubset = function(it,n) {
	var len = it.length;
	var res = new List();
	var mark = new Array();
	LambdaEx.inject(mark,it.length,true);
	while(n > 0) {
		var _g1 = 0;
		var _g = it.length;
		while(_g1 < _g) {
			var x = _g1++;
			if(Std.random(len) == 0 && mark[x]) {
				res.push(it[x]);
				n--;
				mark[x] = false;
			}
		}
	}
	return res;
};
LambdaEx.sortAbsOrder = function(it,order) {
	var arr = Lambda.array(it);
	var f = function(x,y) {
		if(order(x,y)) return -1; else return 1;
	};
	arr.sort(f);
	return Lambda.list(arr);
};
LambdaEx.sortRelOrder = function(it,order) {
	var arr = Lambda.array(it);
	arr.sort(order);
	return Lambda.list(arr);
};
LambdaEx.random = function(it) {
	var i = null;
	if(i == null) i = Std.random(Lambda.count(it));
	return LambdaEx.nth(it,i);
};
LambdaEx.findIndex = function(it,p) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(p(x)) return i;
		i++;
	}
	return null;
};
LambdaEx.wrap = function(x) {
	var l = new List();
	l.push(x);
	return l;
};
LambdaEx.unwrap = function(i) {
	var l = new List();
	var $it0 = $iterator(i)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var $it1 = $iterator(x)();
		while( $it1.hasNext() ) {
			var y = $it1.next();
			l.add(y);
		}
	}
	return l;
};
LambdaEx.hash = function(l) {
	var h = new Hash();
	var $it0 = $iterator(l)();
	while( $it0.hasNext() ) {
		var kv = $it0.next();
		h.set(kv.k,kv.v);
	}
	return h;
};
LambdaEx.stringMap = function(l) {
	var h = new haxe.ds.StringMap();
	var $it0 = $iterator(l)();
	while( $it0.hasNext() ) {
		var kv = $it0.next();
		h.set(kv.k,kv.v);
	}
	return h;
};
LambdaEx.intHash = function(l) {
	var h = new IntHash();
	var $it0 = $iterator(l)();
	while( $it0.hasNext() ) {
		var kv = $it0.next();
		h.set(kv.k,kv.v);
	}
	return h;
};
LambdaEx.intMap = function(l) {
	var h = new haxe.ds.IntMap();
	var $it0 = $iterator(l)();
	while( $it0.hasNext() ) {
		var kv = $it0.next();
		h.set(kv.k,kv.v);
	}
	return h;
};
LambdaEx.dispatch = function(x,f) {
	var rep = new haxe.ds.IntMap();
	var $it0 = $iterator(x)();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		var i = f(e);
		if(!rep.exists(i)) rep.set(i,new List());
		rep.get(i).add(e);
	}
	return rep;
};
LambdaEx.dispatchByEnum = function(x,ecl,f) {
	mt.gx.Debug.assert(x != null,null,{ fileName : "LambdaEx.hx", lineNumber : 414, className : "LambdaEx", methodName : "dispatchByEnum"});
	var rep = new EnumHash(ecl);
	var $it0 = $iterator(x)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		var e = f(v);
		if(!rep.data.exists(e[1])) rep.set(e,new List());
		rep.data.get(e[1]).add(v);
	}
	return rep;
};
LambdaEx.flatten = function(x) {
	var nl = new List();
	var $it0 = $iterator(x)();
	while( $it0.hasNext() ) {
		var l = $it0.next();
		var $it1 = $iterator(l)();
		while( $it1.hasNext() ) {
			var e = $it1.next();
			nl.push(e);
		}
	}
	return nl;
};
LambdaEx.iso = function(x,p) {
	return Lambda.map(x,p);
};
LambdaEx.mapa = function(x,p) {
	return Lambda.array(Lambda.map(x,p));
};
LambdaEx.unitTest = function() {
	var r = [1,2,3];
	Debug.ASSERT(LambdaEx.tail(r,2).first() == 2,null,{ fileName : "LambdaEx.hx", lineNumber : 448, className : "LambdaEx", methodName : "unitTest"});
	Debug.ASSERT(LambdaEx.tail(r,1).first() == 3,null,{ fileName : "LambdaEx.hx", lineNumber : 449, className : "LambdaEx", methodName : "unitTest"});
};
LambdaEx.filterA = function(l,f) {
	return Lambda.array(Lambda.filter(l,f));
};
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
			if(first) first = false; else s.b += sep;
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
};
var ListEx = function() { };
$hxClasses["ListEx"] = ListEx;
ListEx.__name__ = ["ListEx"];
ListEx.orderedAdd = function(it,o,order) {
	if(it.length == 0) {
		it.push(o);
		return;
	}
	if(order(o,it.last())) it.push(o); else {
		var old = it.last();
		it.remove(old);
		it.push(o);
		it.push(old);
	}
};
ListEx.checkOrder = function(it,order) {
	var old = Lambda.list(it);
	while(old.length > 1) {
		if(!order(old.first(),LambdaEx.nth(old,1))) return false;
		old.pop();
	}
	return true;
};
ListEx.random = function(it) {
	var i = null;
	if(i == null) i = Std.random(it.length);
	return LambdaEx.nth(it,i);
};
ListEx.empty = function() {
	return new List();
};
ListEx.from = function(v) {
	var l = new List();
	l.push(v);
	return l;
};
ListEx.n = function() {
	return new List();
};
ListEx.append = function(those,it) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		those.add(x);
	}
	return those;
};
ListEx.pushBack = function(l,e) {
	l.add(e);
	return e;
};
ListEx.pushFront = function(l,e) {
	l.push(e);
	return e;
};
ListEx.best = function(l,f) {
	if(l.length == 0) return null; else {
		var i = 0;
		var idx = 0;
		var elem = null;
		var elV = 0;
		var $it0 = l.iterator();
		while( $it0.hasNext() ) {
			var el = $it0.next();
			if(i != 0) {
				var tel = f(el);
				if(elV < tel) {
					idx = i;
					elem = el;
					elV = tel;
				}
			} else {
				idx = 0;
				elem = el;
				elV = f(el);
			}
		}
		return elem;
	}
};
ListEx.unitTest = function() {
};
var EState = $hxClasses["EState"] = { __ename__ : ["EState"], __constructs__ : ["FirstFrame","Updating"] };
EState.FirstFrame = ["FirstFrame",0];
EState.FirstFrame.toString = $estr;
EState.FirstFrame.__enum__ = EState;
EState.Updating = ["Updating",1];
EState.Updating.toString = $estr;
EState.Updating.__enum__ = EState;
var OverlayState = $hxClasses["OverlayState"] = { __ename__ : ["OverlayState"], __constructs__ : ["None","RetrievingContent","Building","Functionnal"] };
OverlayState.None = ["None",0];
OverlayState.None.toString = $estr;
OverlayState.None.__enum__ = OverlayState;
OverlayState.RetrievingContent = ["RetrievingContent",1];
OverlayState.RetrievingContent.toString = $estr;
OverlayState.RetrievingContent.__enum__ = OverlayState;
OverlayState.Building = ["Building",2];
OverlayState.Building.toString = $estr;
OverlayState.Building.__enum__ = OverlayState;
OverlayState.Functionnal = ["Functionnal",3];
OverlayState.Functionnal.toString = $estr;
OverlayState.Functionnal.__enum__ = OverlayState;
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
var haxe = {};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
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
};
var time = {};
time.Spin = function(v) {
	this.n = v;
	this.lim = this.n - 1;
};
$hxClasses["time.Spin"] = time.Spin;
time.Spin.__name__ = ["time","Spin"];
time.Spin.prototype = {
	force: function() {
		this.n = this.lim;
	}
	,shallow: function() {
		this.n = 0;
		return this;
	}
	,tick: function() {
		if(++this.n >= this.lim) {
			this.n = 0;
			return true;
		}
		return false;
	}
	,__class__: time.Spin
};
haxe.remoting = {};
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
		var m = Reflect.field(o,path[1]);
		if(path.length > 2) {
			if(!inf.rec) throw "Can't access " + path.join(".");
			var _g1 = 2;
			var _g = path.length;
			while(_g1 < _g) {
				var i = _g1++;
				o = m;
				m = Reflect.field(o,path[i]);
			}
		}
		if(!Reflect.isFunction(m)) throw "No such method " + path.join(".");
		return m.apply(o,params);
	}
	,__class__: haxe.remoting.Context
};
var fx = {};
fx.FXManager = function() {
	this.rep = new Hash();
	this.rep.set(null,new List());
	this._old = new List();
};
$hxClasses["fx.FXManager"] = fx.FXManager;
fx.FXManager.__name__ = ["fx","FXManager"];
fx.FXManager.prototype = {
	len: function() {
		var n = 0;
		var $it0 = this.rep.iterator();
		while( $it0.hasNext() ) {
			var l = $it0.next();
			n += l.length;
		}
		return n;
	}
	,update: function() {
		var $it0 = this.rep.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var x = this.rep.get(k);
			if(k == "__multi") this.rep.set(k,x.filter(function(fx) {
				var ok = fx.update();
				if(!ok) fx.kill();
				return ok;
			})); else {
				var p = x.first();
				while(p != null) if(!p.update()) {
					p.kill();
					x.remove(p);
					p = x.first();
					if(p != null) p.reset();
				} else break;
			}
		}
	}
	,add: function(queue,x) {
		if(queue == null) queue = "__multi";
		if(!this.rep.exists(queue)) this.rep.set(queue,new List());
		this.rep.get(queue).add(x);
	}
	,__class__: fx.FXManager
};
var mt = {};
mt.tracking = {};
mt.tracking.Mode = $hxClasses["mt.tracking.Mode"] = { __ename__ : ["mt","tracking","Mode"], __constructs__ : ["MInit","MServer","MClient"] };
mt.tracking.Mode.MInit = ["MInit",0];
mt.tracking.Mode.MInit.toString = $estr;
mt.tracking.Mode.MInit.__enum__ = mt.tracking.Mode;
mt.tracking.Mode.MServer = ["MServer",1];
mt.tracking.Mode.MServer.toString = $estr;
mt.tracking.Mode.MServer.__enum__ = mt.tracking.Mode;
mt.tracking.Mode.MClient = ["MClient",2];
mt.tracking.Mode.MClient.toString = $estr;
mt.tracking.Mode.MClient.__enum__ = mt.tracking.Mode;
mt.tracking.GoogleAnalytics = $hx_exports.mt.tracking.GoogleAnalytics = function(mode,id,debug) {
	if(debug == null) debug = false;
	this.mode = mode;
	if(mode == mt.tracking.Mode.MInit) {
		this.id = id;
		this.debug = debug;
		this.ga().push(["_setAccount",id]);
	}
};
$hxClasses["mt.tracking.GoogleAnalytics"] = mt.tracking.GoogleAnalytics;
mt.tracking.GoogleAnalytics.__name__ = ["mt","tracking","GoogleAnalytics"];
mt.tracking.GoogleAnalytics.j = function(q) {
	return new js.JQuery(q);
};
mt.tracking.GoogleAnalytics.prototype = {
	ga: function() {
		var out = new Array();
		var _g = this.mode;
		switch(_g[1]) {
		case 0:
			if(window._gaq == null) window._gaq = new Array();
			out = window._gaq;
			break;
		case 1:
			break;
		case 2:
			if(window._gaq != null && window._gaq._getAsyncTracker != null) out = window._gaq; else {
				if(window._ga_later == null) window._ga_later = new Array();
				out = window._ga_later;
			}
			break;
		}
		return out;
	}
	,toString: function() {
		var output = "";
		if(this.mode == mt.tracking.Mode.MInit) {
			var _ga_later = window._ga_later;
			if(_ga_later != null) {
				var _g = 0;
				while(_g < _ga_later.length) {
					var x = _ga_later[_g];
					++_g;
					this.ga().push(x);
				}
			}
			var found = false;
			var _g1 = 0;
			var _g11 = this.ga();
			while(_g1 < _g11.length) {
				var i = _g11[_g1];
				++_g1;
				if(i[0] == "_trackPageview") found = true;
			}
			if(!found) this.ga().push(["_trackPageview"]);
			output += "(function() {    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;";
			output += "ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/" + "ga.js" + "';";
			output += "var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  } )();";
			output += "<script type=\"text/javascript\">" + output + "</script> ";
			if(this.debug) {
				haxe.Log.trace("mt.tracking.GoogleAnalytics() DEBUG :",{ fileName : "GoogleAnalytics.hx", lineNumber : 111, className : "mt.tracking.GoogleAnalytics", methodName : "toString"});
				var _g2 = 0;
				var _g12 = this.ga();
				while(_g2 < _g12.length) {
					var g = _g12[_g2];
					++_g2;
					haxe.Log.trace(g,{ fileName : "GoogleAnalytics.hx", lineNumber : 113, className : "mt.tracking.GoogleAnalytics", methodName : "toString"});
				}
			}
		}
		return output;
		throw "tracking code cant be printed in other langage than JS";
	}
	,trackEvent: function(category,action,opt_label,opt_value,opt_noninteraction) {
		if(opt_noninteraction == null) opt_noninteraction = true;
		if(opt_value == null) opt_value = 1;
		if(opt_label == null) opt_label = "";
		try {
			this.ga().push(["_trackEvent",category,action,opt_label,opt_value,opt_noninteraction]);
		} catch( e ) {
		}
	}
	,trackUserRegistration: function() {
		this.trackPageView("/virtual_registration");
	}
	,trackPurchase: function(cart) {
		this.trackEcommerce("Item purchase",cart);
		this.trackPageView("/virtual_purchase");
	}
	,trackRefill: function(cart) {
		this.trackEcommerce("Credit refill",cart);
		this.trackPageView("/virtual_refill");
	}
	,trackEcommerce: function(shopName,cart) {
		if(Lambda.empty(cart)) return;
		var orderId = "" + new Date().getTime() + "-" + ("" + Std.random(1000));
		var total = 0.0;
		var $it0 = $iterator(cart)();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			total += item.quantity * item.price;
		}
		this.ga().push(["_addTrans",orderId,shopName,"" + total]);
		var $it1 = $iterator(cart)();
		while( $it1.hasNext() ) {
			var item1 = $it1.next();
			this.ga().push(["_addItem",orderId,item1.name,item1.name,null,item1.price,item1.quantity]);
		}
		this.ga().push(["_trackTrans"]);
	}
	,trackPageView: function(url) {
		try {
			this.ga().push(["_trackPageview",url]);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "GoogleAnalytics.hx", lineNumber : 214, className : "mt.tracking.GoogleAnalytics", methodName : "trackPageView"});
		}
	}
	,setCustomVar: function(index,name,value,opt_scope) {
		if(opt_scope == null) opt_scope = 3;
		try {
			this.ga().push(["_setCustomVar",index,name,value,opt_scope]);
		} catch( e ) {
		}
	}
	,imLogged: function() {
		this.setCustomVar(1,"UserStatus","member");
	}
	,imVisitor: function() {
		this.setCustomVar(1,"UserStatus","visitor");
	}
	,__class__: mt.tracking.GoogleAnalytics
};
var Pager = $hx_exports.Pager = function() {
	this.pages = new Hash();
};
$hxClasses["Pager"] = Pager;
Pager.__name__ = ["Pager"];
Pager.prototype = {
	j: function(s) {
		return new js.JQuery(s);
	}
	,get: function(sel) {
		return this.pages.get(sel);
	}
	,set: function(sel,d) {
		return this.pages.set(sel,d);
	}
	,setDefaultHandlers: function(uniqClass,lineClass) {
		var _g = this;
		var uniqSel = "." + uniqClass;
		var sel = "." + lineClass;
		var idSel = uniqSel + " " + sel;
		this.pages.set(idSel,{ sel : idSel, cursor : 0, onPage : function(i,n) {
			if(i == 0) _g.j(uniqSel + " .cdFirst").addClass("off"); else _g.j(uniqSel + " .cdFirst").removeClass("off");
			if(i == n - 1) _g.j(uniqSel + " .cdLast").addClass("off"); else _g.j(uniqSel + " .cdLast").removeClass("off");
			if(i == 0) _g.j(uniqSel + " .cdPrev").addClass("off"); else _g.j(uniqSel + " .cdPrev").removeClass("off");
			if(i == n - 1) _g.j(uniqSel + " .cdNext").addClass("off"); else _g.j(uniqSel + " .cdNext").removeClass("off");
		}});
	}
	,setRankHandlers: function(uniqClass,lineClass) {
		var _g = this;
		var uniqSel = "." + uniqClass;
		var sel = "." + lineClass;
		var idSel = uniqSel + " " + sel;
		this.pages.set(idSel,{ sel : idSel, cursor : 0, onPage : function(i,n) {
			if(i == 0) _g.j(uniqSel + " .cdFirst").addClass("off"); else _g.j(uniqSel + " .cdFirst").removeClass("off");
			if(i == n - 1) _g.j(uniqSel + " .cdLast").addClass("off"); else _g.j(uniqSel + " .cdLast").removeClass("off");
			if(i == 0) _g.j(uniqSel + " .cdPrev").addClass("off"); else _g.j(uniqSel + " .cdPrev").removeClass("off");
			if(i == n - 1) _g.j(uniqSel + " .cdNext").addClass("off"); else _g.j(uniqSel + " .cdNext").removeClass("off");
			if(i == 0) _g.j(uniqSel + " .ranking_bar1").add(uniqSel + " .ranking_bar2").show(); else _g.j(uniqSel + " .ranking_bar1").add(uniqSel + " .ranking_bar2").hide();
		}});
	}
	,previousPageUniq: function(uniqSel,sel,entryPerPage) {
		this.previousPage(sel,entryPerPage,uniqSel + " .cdPrev",uniqSel + " .cdNext",uniqSel + " .cdPageNum");
	}
	,nextPageUniq: function(uniqSel,sel,entryPerPage) {
		this.nextPage(sel,entryPerPage,uniqSel + " .cdPrev",uniqSel + " .cdNext",uniqSel + " .cdPageNum");
	}
	,firstPageUniq: function(uniqSel,sel,entryPerPage) {
		var old = this.pages.get(sel);
		if(old == null) old = { sel : sel, cursor : 0, onPage : null};
		old.cursor = 0;
		this.pages.set(sel,old);
		this.previousPageUniq(uniqSel,sel,entryPerPage);
	}
	,lastPageUniq: function(uniqSel,sel,entryPerPage) {
		var old = this.pages.get(sel);
		if(old == null) old = { sel : sel, cursor : 0, onPage : null};
		old.cursor = 1048576;
		this.pages.set(sel,old);
		this.nextPageUniq(uniqSel,sel,entryPerPage);
	}
	,nthPageUniq: function(uniqSel,sel,entryPerPage,n) {
		var old = this.pages.get(sel);
		if(old == null) old = { sel : sel, cursor : 0, onPage : null};
		old.cursor = n;
		this.pages.set(sel,old);
		this.previousPageUniq(uniqSel,sel,entryPerPage);
	}
	,previousPage: function(sel,entryPerPage,previouser,nexter,pageNum) {
		if(this.pages.get(sel) == null) this.pages.set(sel,{ sel : sel, cursor : 0, onPage : null});
		var p = this.pages.get(sel);
		var jq = this.j(sel);
		var max = MathEx.nbPage(jq.length,entryPerPage);
		p.cursor--;
		if(p.cursor <= 0) p.cursor = 0;
		jq.hide();
		var _g1 = 0;
		var _g = jq.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ji = mt.gx.LambdaEx.nth(jq,i);
			var numPage = i / entryPerPage | 0;
			if(p.cursor == numPage) ji.show();
		}
		if(p.onPage != null) p.onPage(p.cursor,max); else {
			this.j(previouser).hide();
			this.j(nexter).show();
		}
		this.j(pageNum).text("" + (p.cursor + 1)).val("" + (p.cursor + 1));
	}
	,nextPage: function(sel,entryPerPage,previouser,nexter,pageNum,onProc,offProc) {
		var mOn = function(jq) {
			if(onProc == null) jq.show(); else onProc(jq);
		};
		var mOff = function(jq1) {
			if(offProc == null) jq1.hide(); else offProc(jq1);
		};
		if(this.pages.get(sel) == null) this.pages.set(sel,{ sel : sel, cursor : 0, onPage : null});
		var p = this.pages.get(sel);
		var jq2 = this.j(sel);
		p.cursor++;
		var max = MathEx.nbPage(jq2.length,entryPerPage);
		if(p.cursor >= max) p.cursor = max - 1;
		jq2.hide();
		var _g1 = 0;
		var _g = jq2.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ji = mt.gx.LambdaEx.nth(jq2,i);
			var numPage = i / entryPerPage | 0;
			if(p.cursor == numPage) ji.show();
		}
		if(p.onPage != null) p.onPage(p.cursor,max); else {
			this.j(previouser).show();
			if(p.cursor >= max - 1) this.j(nexter).hide();
		}
		this.j(pageNum).text("" + (p.cursor + 1)).val("" + (p.cursor + 1));
	}
	,__class__: Pager
};
var RemotingManager = function() {
	this.hub = new EnumHash(Clients);
	var _g = 0;
	var _g1 = Type.allEnums(Clients);
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		this.hub.set(x,{ id : x, cnx : null, proxy : null, retry : 1000, swfName : Std.string(x)});
	}
};
$hxClasses["RemotingManager"] = RemotingManager;
RemotingManager.__name__ = ["RemotingManager"];
RemotingManager.DBG_MSG = function(a,b,c) {
};
RemotingManager.prototype = {
	tryProxyInstance: function(e) {
		var _g = e.id;
		var prx = new PrxISO_MODULE(e.cnx.resolve("js2Swf_ISO_MODULE"));
		if(prx == null) throw "no contact";
		e.proxy = prx;
		prx._echo();
		RemotingManager.DBG_MSG("success contacting " + e.swfName);
	}
	,resetFailed: function() {
		var $it0 = this.hub.data.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == null) continue;
			if(x.cnx != null && x.proxy != null) continue;
			x.retry = 1000;
		}
	}
	,getProxy: function(x) {
		if(this.hub.data.get(x[1]) == null) return null;
		var b = this.hub.data.get(x[1]).proxy;
		if(b == null) return null;
		return b;
	}
	,update: function() {
		var $it0 = this.hub.data.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == null) continue;
			if(x.cnx != null && x.proxy != null) continue;
			if(x.cnx == null) {
				if(x.retry > 0) try {
					x.cnx = haxe.remoting.ExternalConnection.flashConnect(CrossConsts.REMOTING_COM_CHANNEL,x.swfName,Main.ctx);
				} catch( d ) {
					x.cnx = null;
					RemotingManager.DBG_MSG(d);
				}
				x.retry--;
				if(x.retry == 0 && x.proxy == null) RemotingManager.DBG_MSG("cnx killed by retryout " + Std.string(x) + " stg = cnx ");
				if(x.cnx != null) RemotingManager.DBG_MSG("rm: cnx retrieved");
			}
			if(x.proxy == null) {
				if(x.retry > 0) {
					try {
						this.tryProxyInstance(x);
					} catch( d1 ) {
						x.proxy = null;
						RemotingManager.DBG_MSG(d1);
					}
					x.retry--;
					if(x.retry == 0 && x.proxy == null) RemotingManager.DBG_MSG("cnx killed by retryout " + Std.string(x) + " stg = proxy ");
				}
			}
		}
	}
	,__class__: RemotingManager
};
var Clients = $hxClasses["Clients"] = { __ename__ : ["Clients"], __constructs__ : ["ISO_MODULE"] };
Clients.ISO_MODULE = ["ISO_MODULE",0];
Clients.ISO_MODULE.toString = $estr;
Clients.ISO_MODULE.__enum__ = Clients;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		return false;
	}
	return true;
};
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
};
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		Reflect.setField(o2,f,Reflect.field(o,f));
	}
	return o2;
};
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
var js = {};
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
var Selection = $hx_exports.Selection = function() {
};
$hxClasses["Selection"] = Selection;
Selection.__name__ = ["Selection"];
Selection.j = function(sel) {
	return new js.JQuery(sel);
};
Selection.attr2Html = function(s) {
	return s.split("\\'").join("'");
};
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
			var pre = Selection.j("<div class='action stSel cdCharColSel'> " + Selection.attr2Html(jMe.data("name")) + " :</div>");
			Selection.j(".cdHeroOne").prepend(pre);
			Lambda.iter(allItems.toArray(),function(h) {
				h.onclick = function(e) {
					Main.selectItem(h);
				};
			});
			if(domMe != null) domMe.onclick = function(e1) {
				Main.cancelSelection(jMe);
			};
			this.currentInvSelection = serial;
			Main.acListMaintainer.refreshHeroInv();
		} else if(jMe.parent().attr("id") == "room") {
			var allItems1 = JqEx.j("#room .item").not(".cdEmptySlot");
			Selection.j("#room .selected").parent().removeClass("on");
			Selection.j("#room .selected").remove();
			jMe.addClass("on").prepend(new Tag("div").attr("class","selected").toString());
			var lit = Selection.attr2Html(jMe.data("name"));
			Selection.j("#tt_itemname").html(lit);
			Lambda.iter(allItems1.toArray(),function(h1) {
				h1.onclick = function(e2) {
					Main.selectItem(h1);
				};
			});
			if(domMe != null) domMe.onclick = function(e3) {
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
			var prx1 = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx1 != null) prx1._setBaseLine(CrossConsts.BASELINE_ACTIONS);
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
			var allItems1 = Selection.j("#room .item").not(".cdEmptySlot");
			Selection.j("#room .selected").parent().removeClass("on");
			Selection.j("#room .selected").remove();
			Selection.j("#tt_itemname").text("");
			Lambda.iter(allItems1.toArray(),function(h1) {
				h1.onclick = function(e1) {
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
};
mt.deepnight = {};
mt.deepnight.Color = function() { };
$hxClasses["mt.deepnight.Color"] = mt.deepnight.Color;
mt.deepnight.Color.__name__ = ["mt","deepnight","Color"];
mt.deepnight.Color.hexToRgb = function(hex) {
	if(hex == null) throw "hexToColor with null";
	if(hex.indexOf("#") == 0) hex = HxOverrides.substr(hex,1,999);
	return { r : Std.parseInt("0x" + HxOverrides.substr(hex,0,2)), g : Std.parseInt("0x" + HxOverrides.substr(hex,2,2)), b : Std.parseInt("0x" + HxOverrides.substr(hex,4,2))};
};
mt.deepnight.Color.hexToInt = function(hex) {
	return Std.parseInt("0x" + HxOverrides.substr(hex,1,999));
};
mt.deepnight.Color.hexToInta = function(hex) {
	return Std.parseInt("0xff" + HxOverrides.substr(hex,1,999));
};
mt.deepnight.Color.rgbToInt = function(c) {
	return c.r << 16 | c.g << 8 | c.b;
};
mt.deepnight.Color.rgbToHex = function(c) {
	return mt.deepnight.Color.intToHex(c.r << 16 | c.g << 8 | c.b,null);
};
mt.deepnight.Color.rgbToHsl = function(c) {
	var r = c.r / 255;
	var g = c.g / 255;
	var b = c.b / 255;
	var min;
	if(r <= g && r <= b) min = r; else if(g <= b) min = g; else min = b;
	var max;
	if(r >= g && r >= b) max = r; else if(g >= b) max = g; else max = b;
	var delta = max - min;
	var hsl = { h : 0., s : 0., l : 0.};
	hsl.l = max;
	if(delta != 0) {
		hsl.s = delta / max;
		var dr = ((max - r) / 6 + delta / 2) / delta;
		var dg = ((max - g) / 6 + delta / 2) / delta;
		var db = ((max - b) / 6 + delta / 2) / delta;
		if(r == max) hsl.h = db - dg; else if(g == max) hsl.h = 0.33333333333333331 + dr - db; else if(b == max) hsl.h = 0.66666666666666663 + dg - dr;
		if(hsl.h < 0) hsl.h++;
		if(hsl.h > 1) hsl.h--;
	}
	return hsl;
};
mt.deepnight.Color.hslToRgb = function(hsl) {
	var c = { r : 0, g : 0, b : 0};
	var r = 0.;
	var g = 0.;
	var b = 0.;
	if(hsl.s == 0) c.r = c.g = c.b = Math.round(hsl.l * 255); else {
		var h = hsl.h * 6;
		var i = Math.floor(h);
		var c1 = hsl.l * (1 - hsl.s);
		var c2 = hsl.l * (1 - hsl.s * (h - i));
		var c3 = hsl.l * (1 - hsl.s * (1 - (h - i)));
		if(i == 0 || i == 6) {
			r = hsl.l;
			g = c3;
			b = c1;
		} else if(i == 1) {
			r = c2;
			g = hsl.l;
			b = c1;
		} else if(i == 2) {
			r = c1;
			g = hsl.l;
			b = c3;
		} else if(i == 3) {
			r = c1;
			g = c2;
			b = hsl.l;
		} else if(i == 4) {
			r = c3;
			g = c1;
			b = hsl.l;
		} else {
			r = hsl.l;
			g = c1;
			b = c2;
		}
		c.r = Math.round(r * 255);
		c.g = Math.round(g * 255);
		c.b = Math.round(b * 255);
	}
	return c;
};
mt.deepnight.Color.rgbToMatrix = function(c) {
	var matrix = new Array();
	matrix = matrix.concat([c.r / 255,0,0,0,0]);
	matrix = matrix.concat([0,c.g / 255,0,0,0]);
	matrix = matrix.concat([0,0,c.b / 255,0,0]);
	matrix = matrix.concat([0,0,0,1.0,0]);
	return matrix;
};
mt.deepnight.Color.intToHex = function(c,leadingZeros) {
	if(leadingZeros == null) leadingZeros = 6;
	var h = StringTools.hex(c);
	while(h.length < leadingZeros) h = "0" + h;
	return "#" + h;
};
mt.deepnight.Color.intToRgb = function(c) {
	return { r : c >> 16, g : c >> 8 & 255, b : c & 255};
};
mt.deepnight.Color.intToRgba = function(c) {
	return { a : c >>> 24, r : c >> 16 & 255, g : c >> 8 & 255, b : c & 255};
};
mt.deepnight.Color.intToHsl = function(c) {
	return mt.deepnight.Color.rgbToHsl({ r : c >> 16, g : c >> 8 & 255, b : c & 255});
};
mt.deepnight.Color.hslToInt = function(c) {
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.hslToRgb(c));
};
mt.deepnight.Color.rgbaToInt = function(c) {
	return c.a << 24 | c.r << 16 | c.g << 8 | c.b;
};
mt.deepnight.Color.rgbaToRgb = function(c) {
	return { r : c.r, g : c.g, b : c.b};
};
mt.deepnight.Color.multiply = function(c,f) {
	return { r : c.r * f | 0, g : c.g * f | 0, b : c.b * f | 0};
};
mt.deepnight.Color.saturation = function(c,delta) {
	var hsl = mt.deepnight.Color.rgbToHsl(c);
	hsl.s += delta;
	if(hsl.s > 1) hsl.s = 1;
	if(hsl.s < 0) hsl.s = 0;
	return mt.deepnight.Color.hslToRgb(hsl);
};
mt.deepnight.Color.saturationInt = function(c,delta) {
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.saturation({ r : c >> 16, g : c >> 8 & 255, b : c & 255},delta));
};
mt.deepnight.Color.capBrightness = function(c,maxLum) {
	var hsl = mt.deepnight.Color.rgbToHsl(c);
	if(hsl.l > maxLum) {
		hsl.l = maxLum;
		return mt.deepnight.Color.hslToRgb(hsl);
	} else return c;
};
mt.deepnight.Color.capBrightnessInt = function(cint,maxLum) {
	var hsl = mt.deepnight.Color.rgbToHsl({ r : cint >> 16, g : cint >> 8 & 255, b : cint & 255});
	if(hsl.l > maxLum) {
		hsl.l = maxLum;
		return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.hslToRgb(hsl));
	} else return cint;
};
mt.deepnight.Color.cap = function(c,sat,lum) {
	var hsl = mt.deepnight.Color.rgbToHsl(c);
	if(hsl.s > sat) hsl.s = sat;
	if(hsl.l > lum) hsl.l = lum;
	return mt.deepnight.Color.hslToRgb(hsl);
};
mt.deepnight.Color.capInt = function(c,sat,lum) {
	var hsl = mt.deepnight.Color.rgbToHsl({ r : c >> 16, g : c >> 8 & 255, b : c & 255});
	if(hsl.s > sat) hsl.s = sat;
	if(hsl.l > lum) hsl.l = lum;
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.hslToRgb(hsl));
};
mt.deepnight.Color.hue = function(c,f) {
	var hsl = mt.deepnight.Color.rgbToHsl(c);
	hsl.h += f;
	if(hsl.h > 1) hsl.h = 1;
	if(hsl.h < 0) hsl.h = 0;
	return mt.deepnight.Color.hslToRgb(hsl);
};
mt.deepnight.Color.hueInt = function(c,f) {
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.hue({ r : c >> 16, g : c >> 8 & 255, b : c & 255},f));
};
mt.deepnight.Color.brightnessInt = function(cint,delta) {
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.brightness({ r : cint >> 16, g : cint >> 8 & 255, b : cint & 255},delta));
};
mt.deepnight.Color.brightness = function(c,delta) {
	var hsl = mt.deepnight.Color.rgbToHsl(c);
	if(delta < 0) {
		hsl.l += delta;
		if(hsl.l < 0) hsl.l = 0;
	} else {
		var d = 1 - hsl.l;
		if(d > delta) hsl.l += delta; else {
			hsl.l = 1;
			hsl.s -= delta - d;
			if(hsl.s < 0) hsl.s = 0;
		}
	}
	return mt.deepnight.Color.hslToRgb(hsl);
};
mt.deepnight.Color.desaturate = function(c,ratio) {
	var gray = 0.3 * c.r + 0.59 * c.g + 0.11 * c.b;
	return { r : gray * ratio + c.r * (1 - ratio) | 0, g : gray * ratio + c.g * (1 - ratio) | 0, b : gray * ratio + c.b * (1 - ratio) | 0};
};
mt.deepnight.Color.desaturateInt = function(c,ratio) {
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.desaturate({ r : c >> 16, g : c >> 8 & 255, b : c & 255},ratio));
};
mt.deepnight.Color.getAlpha = function(c) {
	return c >> 24;
};
mt.deepnight.Color.addAlphaF = function(c,a) {
	if(a == null) a = 1.0;
	return (a * 255 | 0) << 24 | c;
};
mt.deepnight.Color.addAlphaI = function(c,a) {
	if(a == null) a = 255;
	return a << 24 | c;
};
mt.deepnight.Color.randomColor = function(hue,sat,lum) {
	if(lum == null) lum = 1.0;
	if(sat == null) sat = 1.0;
	return mt.deepnight.Color.makeColorHsl(hue,sat,lum);
};
mt.deepnight.Color.makeColorHsl = function(hue,saturation,luminosity) {
	if(luminosity == null) luminosity = 1.0;
	if(saturation == null) saturation = 1.0;
	var hsl = { h : hue, s : saturation, l : luminosity};
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.hslToRgb(hsl));
};
mt.deepnight.Color.makeColorRgb = function(r,g,b) {
	var rgb_r = r;
	var rgb_g = g;
	var rgb_b = b;
	return rgb_r << 16 | rgb_g << 8 | rgb_b;
};
mt.deepnight.Color.getRgbRatio = function(cint,crgb) {
	var c;
	if(cint != null) c = { r : cint >> 16, g : cint >> 8 & 255, b : cint & 255}; else c = crgb;
	var max;
	if(c.b > c.g && c.b > c.r) max = c.b; else if(c.g > c.r && c.g > c.b) max = c.g; else max = c.r;
	return { r : c.r / max, g : c.g / max, b : c.b / max};
};
mt.deepnight.Color.getLuminosityPerception = function(c) {
	return Math.sqrt(0.241 * (c.r * c.r) + 0.691 * (c.g * c.g) + 0.068 * (c.b * c.b));
};
mt.deepnight.Color.autoContrast = function(c,dark,light) {
	if(light == null) light = 16777215;
	if(dark == null) dark = 0;
	if(mt.deepnight.Color.getLuminosityPerception({ r : c >> 16, g : c >> 8 & 255, b : c & 255}) >= 180) return dark; else return light;
};
mt.deepnight.Color.getLuminosity = function(c,cint) {
	if(c != null) return mt.deepnight.Color.rgbToHsl(c).l; else return mt.deepnight.Color.rgbToHsl({ r : cint >> 16, g : cint >> 8 & 255, b : cint & 255}).l;
};
mt.deepnight.Color.setLuminosity = function(c,lum) {
	var hsl = mt.deepnight.Color.rgbToHsl(c);
	hsl.l = lum;
	return mt.deepnight.Color.hslToRgb(hsl);
};
mt.deepnight.Color.setLuminosityInt = function(c,lum) {
	var hsl = mt.deepnight.Color.rgbToHsl({ r : c >> 16, g : c >> 8 & 255, b : c & 255});
	hsl.l = lum;
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.hslToRgb(hsl));
};
mt.deepnight.Color.offsetColor = function(c,delta) {
	return { r : Std.int(Math.max(0,Math.min(255,c.r + delta))), g : Std.int(Math.max(0,Math.min(255,c.g + delta))), b : Std.int(Math.max(0,Math.min(255,c.b + delta)))};
};
mt.deepnight.Color.offsetColorRgba = function(c,delta) {
	return { r : Std.int(Math.max(0,Math.min(255,c.r + delta))), g : Std.int(Math.max(0,Math.min(255,c.g + delta))), b : Std.int(Math.max(0,Math.min(255,c.b + delta))), a : c.a};
};
mt.deepnight.Color.offsetColorInt = function(c,delta) {
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.offsetColor({ r : c >> 16, g : c >> 8 & 255, b : c & 255},delta));
};
mt.deepnight.Color.interpolatePal = function(from,to,ratio) {
	var result = new Array();
	var _g1 = 0;
	var _g = from.length;
	while(_g1 < _g) {
		var i = _g1++;
		result[i] = mt.deepnight.Color.interpolate(from[i],to[i],ratio);
	}
	return result;
};
mt.deepnight.Color.interpolate = function(from,to,ratio) {
	ratio = Math.min(1,Math.max(0,ratio));
	return { r : from.r + (to.r - from.r) * ratio | 0, g : from.g + (to.g - from.g) * ratio | 0, b : from.b + (to.b - from.b) * ratio | 0};
};
mt.deepnight.Color.interpolateInt = function(from,to,ratio) {
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.interpolate({ r : from >> 16, g : from >> 8 & 255, b : from & 255},{ r : to >> 16, g : to >> 8 & 255, b : to & 255},ratio));
};
mt.deepnight.Color.interpolateIntArray = function(colors,ratio) {
	if(colors.length < 2) throw "Need 2 colors or more!";
	var idx = ratio * (colors.length - 1) | 0;
	var segLen = 1 / (colors.length - 1);
	var subRatio = (ratio - segLen * idx) / segLen;
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.interpolate(mt.deepnight.Color.intToRgb(colors[idx]),mt.deepnight.Color.intToRgb(colors[idx + 1]),subRatio));
};
mt.deepnight.Color.darken = function(c,ratio) {
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.interpolate({ r : c >> 16, g : c >> 8 & 255, b : c & 255},mt.deepnight.Color.BLACK,ratio));
};
mt.deepnight.Color.lighten = function(c,ratio) {
	return mt.deepnight.Color.rgbToInt(mt.deepnight.Color.interpolate({ r : c >> 16, g : c >> 8 & 255, b : c & 255},mt.deepnight.Color.WHITE,ratio));
};
mt.deepnight.Color.getPaletteAverage = function(pal) {
	if(pal.length < 0) return Reflect.copy(mt.deepnight.Color.BLACK);
	var c_r = 0;
	var c_g = 0;
	var c_b = 0;
	var _g = 0;
	while(_g < pal.length) {
		var p = pal[_g];
		++_g;
		c_r += p.r;
		c_g += p.g;
		c_b += p.b;
	}
	return { r : c_r / pal.length | 0, g : c_g / pal.length | 0, b : c_b / pal.length | 0};
};
mt.deepnight.Color.interpolateArrays = function(ary1,ary2,t) {
	var result = new Array();
	var _g1 = 0;
	var _g = ary1.length;
	while(_g1 < _g) {
		var i = _g1++;
		result[i] = ary1[i] + (ary2[i] - ary1[i]) * t;
	}
	return result;
};
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
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
Math.__name__ = ["Math"];
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
};
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
		var s1;
		s1 = "<" + this.name + " " + listAttr() + (this.children.length > 0?">":"/>");
		var $it0 = this.children.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			switch(c[1]) {
			case 1:
				var tg = c[2];
				s1 += tg.toString();
				break;
			case 0:
				var t = c[2];
				s1 += t;
				break;
			}
		}
		if(this.children.length > 0) s1 += "</" + this.name + ">";
		return s1;
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
};
mt.js = {};
mt.js.Tip = $hx_exports.mt.js.Tip = function() { };
$hxClasses["mt.js.Tip"] = mt.js.Tip;
mt.js.Tip.__name__ = ["mt","js","Tip"];
mt.js.Tip.show = function(refObj,contentHTML,cName,pRef) {
	mt.js.Tip.init();
	if(mt.js.Tip.tooltip == null) {
		mt.js.Tip.tooltip = window.document.getElementById(mt.js.Tip.tooltipId);
		if(mt.js.Tip.tooltip == null) {
			mt.js.Tip.tooltip = window.document.createElement("div");
			mt.js.Tip.tooltip.id = mt.js.Tip.tooltipId;
			window.document.body.insertBefore(mt.js.Tip.tooltip,window.document.body.firstChild);
		}
		mt.js.Tip.tooltip.style.top = "-1000px";
		mt.js.Tip.tooltip.style.position = "absolute";
		mt.js.Tip.tooltip.style.zIndex = "" + mt.js.Tip.tipZIndex;
	}
	if(mt.js.Tip.tooltipContent == null) {
		mt.js.Tip.tooltipContent = window.document.getElementById(mt.js.Tip.tooltipContentId);
		if(mt.js.Tip.tooltipContent == null) {
			mt.js.Tip.tooltipContent = window.document.createElement("div");
			mt.js.Tip.tooltipContent.id = mt.js.Tip.tooltipContentId;
			mt.js.Tip.tooltip.appendChild(mt.js.Tip.tooltipContent);
		}
	}
	if(pRef == null) pRef = false;
	mt.js.Tip.placeRef = pRef;
	if(cName == null) mt.js.Tip.tooltip.className = mt.js.Tip.defaultClass; else mt.js.Tip.tooltip.className = cName;
	if(mt.js.Tip.lastRef != null && mt.js.Tip.onHide != null) {
		mt.js.Tip.onHide();
		mt.js.Tip.onHide = null;
	}
	mt.js.Tip.lastRef = refObj;
	mt.js.Tip.tooltipContent.innerHTML = contentHTML;
	if(mt.js.Tip.placeRef) mt.js.Tip.placeTooltipRef(); else mt.js.Tip.placeTooltip();
};
mt.js.Tip.exclude = function(id) {
	var e = window.document.getElementById(id);
	if(e == null) throw id + " not found";
	if(mt.js.Tip.excludeList == null) mt.js.Tip.excludeList = new List();
	mt.js.Tip.excludeList.add(e);
};
mt.js.Tip.placeTooltip = function() {
	if(mt.js.Tip.mousePos == null) return;
	var tts = mt.js.Tip.elementSize(mt.js.Tip.tooltip);
	var w = mt.js.Tip.windowSize();
	var top = 0;
	var left = 0;
	left = mt.js.Tip.mousePos.x + mt.js.Tip.xOffset;
	top = mt.js.Tip.mousePos.y + mt.js.Tip.yOffset;
	if(top + tts.height > w.height - 2 + w.scrollTop) {
		if(mt.js.Tip.mousePos.y - tts.height > 5 + w.scrollTop) top = mt.js.Tip.mousePos.y - tts.height - 5; else top = w.height - 2 + w.scrollTop - tts.height;
	}
	if(left + tts.width > w.width - 22 + w.scrollLeft) {
		if(mt.js.Tip.mousePos.x - tts.width > 5 + w.scrollLeft) left = mt.js.Tip.mousePos.x - tts.width - 5; else left = w.width - 22 + w.scrollLeft - tts.width;
	}
	if(top < 0) top = 0;
	if(left < 0) left = 0;
	if(mt.js.Tip.excludeList != null) {
		var $it0 = mt.js.Tip.excludeList.iterator();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			var s = mt.js.Tip.elementSize(e);
			if(left > s.x + s.width || left + tts.width < s.x || top > s.y + s.height || top + tts.height < s.y) continue;
			var dx1 = left - (s.x + s.width);
			var dx2 = left + tts.width - s.x;
			var dx;
			if(Math.abs(dx1) > Math.abs(dx2)) dx = dx2; else dx = dx1;
			var dy1 = top - (s.y + s.height);
			var dy2 = top + tts.height - s.y;
			var dy;
			if(Math.abs(dy1) > Math.abs(dy2)) dy = dy2; else dy = dy1;
			var cx = left + tts.width / 2 - mt.js.Tip.mousePos.x;
			var cy = top + tts.height / 2 - mt.js.Tip.mousePos.y;
			if((cx - dx) * (cx - dx) + cy * cy > cx * cx + (cy - dy) * (cy - dy)) top -= dy; else left -= dx;
		}
	}
	mt.js.Tip.tooltip.style.left = left + "px";
	mt.js.Tip.tooltip.style.top = top + "px";
};
mt.js.Tip.placeTooltipRef = function() {
	var o = mt.js.Tip.elementSize(mt.js.Tip.lastRef);
	var tts = mt.js.Tip.elementSize(mt.js.Tip.tooltip);
	if(o.width <= 0) mt.js.Tip.tooltip.style.left = o.x + "px"; else mt.js.Tip.tooltip.style.left = o.x - tts.width * 0.5 + o.width * 0.5 + "px";
	mt.js.Tip.tooltip.style.top = o.y + Math.max(mt.js.Tip.minOffsetY,o.height) + "px";
};
mt.js.Tip.showTip = function(refObj,title,contentBase) {
	contentBase = "<p>" + contentBase + "</p>";
	mt.js.Tip.show(refObj,"<div class=\"title\">" + title + "</div>" + contentBase);
};
mt.js.Tip.hide = function() {
	if(mt.js.Tip.lastRef == null) return;
	mt.js.Tip.lastRef = null;
	if(mt.js.Tip.onHide != null) {
		mt.js.Tip.onHide();
		mt.js.Tip.onHide = null;
	}
	mt.js.Tip.tooltip.style.top = "-1000px";
	mt.js.Tip.tooltip.style.width = "";
};
mt.js.Tip.clean = function() {
	if(mt.js.Tip.lastRef == null) return;
	if(mt.js.Tip.lastRef.parentNode == null) return mt.js.Tip.hide();
	if(mt.js.Tip.lastRef.id != null && mt.js.Tip.lastRef.id != "") {
		if(window.document.getElementById(mt.js.Tip.lastRef.id) != mt.js.Tip.lastRef) return mt.js.Tip.hide();
	}
	return;
};
mt.js.Tip.elementSize = function(o) {
	var ret = { x : 0, y : 0, width : o.clientWidth, height : o.clientHeight};
	var p = o;
	while(p != null) {
		if(p.offsetParent != null) {
			ret.x += p.offsetLeft - p.scrollLeft;
			ret.y += p.offsetTop - p.scrollTop;
		} else {
			ret.x += p.offsetLeft;
			ret.y += p.offsetTop;
		}
		p = p.offsetParent;
	}
	return ret;
};
mt.js.Tip.windowSize = function() {
	var ret = { x : 0, y : 0, width : window.innerWidth, height : window.innerHeight, scrollLeft : window.document.body.scrollLeft + window.document.documentElement.scrollLeft, scrollTop : window.document.body.scrollTop + window.document.documentElement.scrollTop};
	var isIE = document.all != null && window.opera == null;
	var body;
	if(isIE) body = window.document.documentElement; else body = window.document.body;
	if(ret.width == null) ret.width = body.clientWidth;
	if(ret.height == null) ret.height = body.clientHeight;
	return ret;
};
mt.js.Tip.onMouseMove = function(evt) {
	try {
		var posx = 0;
		var posy = 0;
		if(evt == null) evt = window.event;
		var e = evt;
		if(e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		} else if(e.clientX || e.clientY) {
			posx = e.clientX + window.document.body.scrollLeft + window.document.documentElement.scrollLeft;
			posy = e.clientY + window.document.body.scrollTop + window.document.documentElement.scrollTop;
		}
		mt.js.Tip.mousePos = { x : posx, y : posy};
		if(mt.js.Tip.lastRef != null && !mt.js.Tip.placeRef) mt.js.Tip.placeTooltip();
	} catch( e1 ) {
	}
};
mt.js.Tip.trackMenu = function(elt,onOut) {
	mt.js.Tip.init();
	var ftrack = null;
	var body = window.document.body;
	ftrack = function(evt) {
		if(mt.js.Tip.mousePos == null) return;
		var size = mt.js.Tip.elementSize(elt);
		if(mt.js.Tip.mousePos.x < size.x || mt.js.Tip.mousePos.y < size.y || mt.js.Tip.mousePos.x > size.x + size.width || mt.js.Tip.mousePos.y > size.y + size.height) {
			if(body.attachEvent) body.detachEvent("onmousemove",ftrack); else body.removeEventListener("mousemove",ftrack,false);
			onOut();
		}
	};
	if(body.attachEvent) body.attachEvent("onmousemove",ftrack); else body.addEventListener("mousemove",ftrack,false);
};
mt.js.Tip.init = function() {
	if(mt.js.Tip.initialized) return;
	if(document.body != null) {
		mt.js.Tip.initialized = true;
		document.body.onmousemove = mt.js.Tip.onMouseMove;
	}
};
var Tools = function() { };
$hxClasses["Tools"] = Tools;
Tools.__name__ = ["Tools"];
Tools.globalEval = function(script) {
	if(script.content == null || script.content.length == 0) return;
	var o = window.document;
	js.Browser.document = { write : function(data) {
		var t = o.createElement("div");
		t.setAttribute("id","_" + script.id);
		t.innerHTML = data;
		var s = o.getElementById(script.id);
		s.parentNode.insertBefore(t,s);
	}, getElementById : $bind(o,o.getElementById), getElementsByTagName : $bind(o,o.getElementsByTagName), getElementsByName : $bind(o,o.getElementsByName), body : o.body, attachEvent : function(eventName,handler) {
		return o.attachEvent(eventName,handler);
	}, detachEvent : function(eventName1,handler1) {
		return o.detachEvent(eventName1,handler1);
	}, addEventListener : function(eventName2,handler2,useCapture) {
		return o.addEventListener(eventName2,handler2,useCapture);
	}, removeEventListener : function(eventName3,handler3,useCapture1) {
		return o.removeEventListener(eventName3,handler3,useCapture1);
	}, _document : o, cookie : o.cookie};
	try {
		if(window.execScript != null) window.execScript(script.content); else if(window["eval"] != null) window["eval"](script.content); else {
			var s1 = window.document.createElement("script");
			s1.setAttribute("type","text/jatvascript");
			s1.innerHTML = script.content;
			window.document.getElementsByTagName("head")[0].appendChild(s1);
		}
	} catch( e ) {
		js.Browser.document = o;
		throw e;
	}
	js.Browser.document = o;
	return;
};
Tools.extractId = function(flow,id) {
	var a = flow.split("id=\"" + id + "\"");
	if(a.length != 2) return null;
	var tagPart = a[0];
	var id1 = tagPart.lastIndexOf("<") + 1;
	var tag = "";
	var _g1 = id1;
	var _g = tagPart.length;
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
		if(descending) count += 1; else count += -1;
		if(count <= 0) break;
		if(descending) crtIndex = imp.indexOf(">",nextOpenIndex + 1); else crtIndex = nextCloseIndex + 3 + tag.length;
		if(limit-- == 0) return null;
	}
	return HxOverrides.substr(imp,beginIndex,nextCloseIndex - 1 - beginIndex);
};
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
};
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
};
Tools.hasTag = function(tag,source) {
	return source.split(tag + "=").length > 1;
};
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
};
Tools.updateContent = function(url,seek,dest,cb) {
	var r = new haxe.Http(url);
	var dbg = false;
	r.onData = function(data) {
		var meR = r;
		var _g1 = 0;
		var _g = seek.length;
		while(_g1 < _g) {
			var i = _g1++;
			var target = window.document.getElementById(dest != null?dest[i]:seek[i]);
			if(target == null) {
				if(dbg) null;
				continue;
			}
			var input = Tools.extractId(data,seek[i]);
			if(input == null) try {
				if(dbg) null;
				target = Tools.document.body;
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
				var _g21 = 0;
				while(_g21 < scripts.length) {
					var s1 = scripts[_g21];
					++_g21;
					Tools.globalEval(s1);
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
				var msg = "error 2  loading:" + url + " tgt:" + seek[i] + " meta: " + meta + " hlen: " + h.length + " err: " + Std.string(e) + " es: " + haxe.CallStack.exceptionStack().toString();
				if(h.length > 0) msg += " hl : >>" + h + "<<";
				if(dbg) null;
				Tools.window.location.assign(Tools.defaultUrl == null?url:Tools.defaultUrl);
				var s2 = StringTools.urlEncode(msg);
				if(regIt) Tools.ping("registerError/" + s2);
				return;
			} else if(dbg) null;
			var scripts1 = Tools.extractScripts(input);
			var _g22 = 0;
			while(_g22 < scripts1.length) {
				var s3 = scripts1[_g22];
				++_g22;
				var data2 = Tools.makeTag("id",s3.fullContent);
				if(data2 != null) {
					s3.id = data2.id;
					input = StringTools.replace(input,s3.fullContent,data2.source);
				}
			}
			target.innerHTML = input;
			if(dbg) null;
			var _g23 = 0;
			while(_g23 < scripts1.length) {
				var s4 = scripts1[_g23];
				++_g23;
				Tools.globalEval(s4);
			}
			if(dbg) null;
		}
		if(cb != null) cb();
	};
	r.request(false);
	return false;
};
Tools.ping = function(url,cbk) {
	var r = new haxe.Http(url);
	r.async = true;
	r.request(false);
	if(cbk != null) r.onData = cbk;
};
Tools.send2SessionStore = function(k,v) {
	Debug.MSG("send to sessions " + Std.string(v),{ fileName : "Tools.hx", lineNumber : 301, className : "Tools", methodName : "send2SessionStore"});
	try {
		var ser = haxe.Serializer.run(v);
		js.Browser.getSessionStorage().setItem(k,ser);
	} catch( d ) {
		null;
	}
};
Tools.getFromSessionStore = function(k) {
	var v = js.Browser.getSessionStorage().getItem(k);
	if(v == null) return null;
	return haxe.Unserializer.run(v);
};
Tools.send2Store = function(k,v) {
	try {
		var ser = haxe.Serializer.run(v);
		js.Browser.getLocalStorage().setItem(k,ser);
	} catch( d ) {
		null;
	}
};
Tools.getFromStore = function(k) {
	var v = js.Browser.getLocalStorage().getItem(k);
	if(v == null) return null;
	return haxe.Unserializer.run(v);
};
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
		var r = this.req = js.Browser.createXMLHttpRequest();
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
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
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
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
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
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
js.Browser = function() { };
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		return null;
	}
};
js.Browser.getSessionStorage = function() {
	try {
		var s = window.sessionStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		return null;
	}
};
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
haxe.CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
js.Cookie = function() { };
$hxClasses["js.Cookie"] = js.Cookie;
js.Cookie.__name__ = ["js","Cookie"];
js.Cookie.set = function(name,value,expireDelay,path,domain) {
	var s = name + "=" + StringTools.urlEncode(value);
	if(expireDelay != null) {
		var d = DateTools.delta(new Date(),expireDelay * 1000);
		s += ";expires=" + d.toGMTString();
	}
	if(path != null) s += ";path=" + path;
	if(domain != null) s += ";domain=" + domain;
	window.document.cookie = s;
};
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
};
js.Cookie.get = function(name) {
	return js.Cookie.all().get(name);
};
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0;
	var _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
};
haxe.Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c1 = this.buf.charCodeAt(this.pos);
				if(c1 == 104) {
					this.pos++;
					break;
				}
				if(c1 == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw "Invalid reference";
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw "Invalid string reference";
			return this.scache[n2];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw "Enum not found " + name1;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw "Enum not found " + name2;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw "Unknown enum index " + name2 + "@" + index;
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe.ds.IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c2 = this.get(this.pos++);
			while(c2 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c2 = this.get(this.pos++);
			}
			if(c2 != 104) throw "Invalid IntMap format";
			return h1;
		case 77:
			var h2 = new haxe.ds.ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			var s3 = HxOverrides.substr(this.buf,this.pos,19);
			d = HxOverrides.strDate(s3);
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c21 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c21 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c22 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c22 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c22 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw "Class not found " + name3;
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o2;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.IntMap
};
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
};
haxe.Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = StringTools.urlEncode(s);
		this.buf.b += "" + s.length;
		this.buf.b += ":";
		this.buf.b += s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				if(v == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				this.buf.b += Std.string(v);
				break;
			case 2:
				if(Math.isNaN(v)) this.buf.b += "k"; else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
					this.buf.b += "d";
					this.buf.b += Std.string(v);
				}
				break;
			case 3:
				this.buf.b += Std.string(v?"t":"f");
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v1 = v;
					var $it0 = v1.iterator();
					while( $it0.hasNext() ) {
						var i1 = $it0.next();
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(HxOverrides.dateStr(d));
					break;
				case haxe.ds.StringMap:
					this.buf.b += "b";
					var v2 = v;
					var $it1 = v2.keys();
					while( $it1.hasNext() ) {
						var k = $it1.next();
						this.serializeString(k);
						this.serialize(v2.get(k));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.IntMap:
					this.buf.b += "q";
					var v3 = v;
					var $it2 = v3.keys();
					while( $it2.hasNext() ) {
						var k1 = $it2.next();
						this.buf.b += ":";
						this.buf.b += "" + k1;
						this.serialize(v3.get(k1));
					}
					this.buf.b += "h";
					break;
				case haxe.ds.ObjectMap:
					this.buf.b += "M";
					var v4 = v;
					var $it3 = v4.keys();
					while( $it3.hasNext() ) {
						var k2 = $it3.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v4.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe.io.Bytes:
					var v5 = v;
					var i2 = 0;
					var max = v5.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe.Serializer.BASE64;
					while(i2 < max) {
						var b1 = v5.get(i2++);
						var b2 = v5.get(i2++);
						var b3 = v5.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v5.get(i2++);
						var b21 = v5.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v5.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					this.buf.b += "" + chars.length;
					this.buf.b += ":";
					this.buf.b += chars;
					break;
				default:
					this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(this.useCache && this.serializeRef(v)) return;
				this.buf.b += "o";
				this.serializeFields(v);
				break;
			case 7:
				var e = _g[2];
				if(this.useCache && this.serializeRef(v)) return;
				this.cache.pop();
				this.buf.b += Std.string(this.useEnumIndex?"j":"w");
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += "" + (l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				this.cache.push(v);
				break;
			case 5:
				throw "Cannot serialize function";
				break;
			default:
				throw "Cannot serialize " + Std.string(v);
			}
		}
	}
	,serializeException: function(e) {
		this.buf.b += "x";
		this.serialize(e);
	}
	,__class__: haxe.Serializer
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,__class__: StringBuf
};
var MathEx = function() { };
$hxClasses["MathEx"] = MathEx;
MathEx.__name__ = ["MathEx"];
MathEx.clamp = function(a,min,max) {
	if(a < min) return min; else if(a > max) return max; else return a;
};
MathEx.maxi = function(x,y) {
	if(x < y) return y; else return x;
};
MathEx.page = function(i,n) {
	return i / n | 0;
};
MathEx.nbPage = function(count,pgSz) {
	if(count <= 0) return 0; else if(count % pgSz == 0) return count / pgSz | 0; else return 1 + (count / pgSz | 0);
};
MathEx.mini = function(x,y) {
	if(x < y) return x; else return y;
};
MathEx.nearesti = function(x) {
	return (x < 0?x - 0.5:x + 0.5) | 0;
};
MathEx.absi = function(x) {
	var sign = x >> 31;
	return (x ^ sign) - sign;
};
MathEx.clampi = function(a,min,max) {
	if(a < min) return min; else if(a > max) return max; else return a;
};
MathEx.sqrI = function(a) {
	return a * a;
};
MathEx.div = function(a,b) {
	return a / b | 0;
};
MathEx.countBits = function(x) {
	var res = 0;
	while(x != 0) {
		x >>= 1;
		if((x & 1) != 0) res++;
	}
	return res;
};
MathEx.eq = function(v0,v1) {
	return Math.abs(v0 - v1) < 1e-06;
};
MathEx.lerpi = function(v0,v1,t) {
	return (v1 - v0) * t + v0 | 0;
};
MathEx.lerp = function(v0,v1,t) {
	return (v1 - v0) * t + v0;
};
MathEx.lerpEaseIn = function(v0,v1,t) {
	var tt = t * t;
	return (v1 - v0) * tt + v0;
};
MathEx.powi = function(v,p) {
	return Std.int(Math.pow(v,p));
};
MathEx.pow2i = function(v) {
	return v * v;
};
MathEx.pow2f = function(v) {
	return v * v;
};
MathEx.lerpEaseOut = function(v0,v1,t) {
	var tt;
	if(t <= 1e-06) tt = 0; else tt = Math.sqrt(t);
	return (v1 - v0) * tt + v0;
};
MathEx.normAngle = function(f) {
	while(f >= Math.PI * 2) f -= Math.PI * 2;
	while(f <= -Math.PI * 2) f += Math.PI * 2;
	return f;
};
MathEx.posMod = function(i,m) {
	var mod = i % m;
	if(mod >= 0) return mod; else return mod + m;
};
MathEx.trunk = function(v,digit) {
	var hl = 10.0 * digit;
	return (v * hl | 0) / hl;
};
MathEx.squareSignal = function(t,period) {
	return (t / period | 0) % 2 == 0;
};
MathEx.headingSign = function(v) {
	if(v > 0) return "+ " + v; else return "- " + MathEx.absi(v);
};
MathEx.sameSign = function(f0,f1) {
	return f0 < 0 && f1 < 0 || f0 > 0 && f1 > 0;
};
var StdEx = function() { };
$hxClasses["StdEx"] = StdEx;
StdEx.__name__ = ["StdEx"];
StdEx.id = function() {
};
StdEx.parseBool = function(str) {
	if(str == null) return null;
	var s = str.toLowerCase();
	if(s == "1" || StringTools.startsWith(s,"true")) return true; else return false;
};
StdEx.time = function() {
	return new Date().getTime() * 0.001;
};
StdEx.format = function(t,params) {
	if(params != null) {
		var _g = 0;
		var _g1 = Reflect.fields(params);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			t = t.split("::" + f + "::").join(Std.string(Reflect.field(params,f)));
		}
	}
	return t;
};
StdEx.lsFlags = function(e,v) {
	var l = [];
	var ival = v;
	var _g = 0;
	var _g1 = Type.allEnums(e);
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		var idx = a[1];
		if((ival & 1 << idx) != 0) l.push(a);
	}
	return l;
};
StdEx.inject = function(o,add) {
	mt.Assert.notNull(o);
	mt.Assert.notNull(add);
	var _g = 0;
	var _g1 = Reflect.fields(add);
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		Reflect.setProperty(o,a,Reflect.getProperty(add,a));
	}
	return o;
};
var ConfirmFlags = $hxClasses["ConfirmFlags"] = { __ename__ : ["ConfirmFlags"], __constructs__ : ["Centered"] };
ConfirmFlags.Centered = ["Centered",0];
ConfirmFlags.Centered.toString = $estr;
ConfirmFlags.Centered.__enum__ = ConfirmFlags;
var Option = $hxClasses["Option"] = { __ename__ : ["Option"], __constructs__ : ["None","Some"] };
Option.None = ["None",0];
Option.None.toString = $estr;
Option.None.__enum__ = Option;
Option.Some = function(a) { var $x = ["Some",1,a]; $x.__enum__ = Option; $x.toString = $estr; return $x; };
var RandomEx = function() { };
$hxClasses["RandomEx"] = RandomEx;
RandomEx.__name__ = ["RandomEx"];
RandomEx.randI = function(n) {
	return Std.random(n);
};
RandomEx.randF = function() {
	return Math.random();
};
RandomEx.randB = function() {
	return (Std.random(1024) & 2) == 1;
};
RandomEx.rf = function(f) {
	return Math.random() * f;
};
RandomEx.SqrtFilter = function(f) {
	return Math.sqrt(f);
};
RandomEx.SqrFilter = function(f) {
	return f * f;
};
RandomEx.SinFilter = function(f) {
	return Math.sin(f * Math.PI / 2);
};
RandomEx.CosFilter = function(f) {
	return 1 - Math.cos(f * Math.PI * 0.5);
};
RandomEx.randFilteredI = function(n,filter) {
	var i = Std.int(filter(Math.random()) * (n - 1) + 0.5);
	i = MathEx.clampi(i,0,n - 1);
	return i;
};
RandomEx.normalizedRandom = function(arr) {
	var sum = Lambda.fold(arr,function(x,r) {
		return r + x.weight;
	},0);
	var rval = null;
	if(rval == null) rval = Std.random(sum);
	var svrval = rval;
	var i = 0;
	var $it0 = $iterator(arr)();
	while( $it0.hasNext() ) {
		var x1 = $it0.next();
		rval -= x1.weight;
		if(rval < 0) return i;
		i++;
	}
	return -1;
};
RandomEx.normRdEnum = function(arr) {
	var sum = Lambda.fold(arr,function(x,r) {
		return r + x.weight;
	},0);
	var rd = Std.random(sum);
	var $it0 = $iterator(arr)();
	while( $it0.hasNext() ) {
		var x1 = $it0.next();
		rd -= x1.weight;
		if(rd < 0) return x1.id;
	}
	return null;
};
var Js2Swf_ISO_MODULE = function(c) {
	this.__cnx = c;
};
$hxClasses["Js2Swf_ISO_MODULE"] = Js2Swf_ISO_MODULE;
Js2Swf_ISO_MODULE.__name__ = ["Js2Swf_ISO_MODULE"];
Js2Swf_ISO_MODULE.prototype = {
	_echo: function() {
		this.__cnx.resolve("_echo").call([]);
	}
	,_event: function(str) {
		this.__cnx.resolve("_event").call([str]);
	}
	,_forceData: function(str) {
		this.__cnx.resolve("_forceData").call([str]);
	}
	,_cancelSelection: function() {
		this.__cnx.resolve("_cancelSelection").call([]);
	}
	,_setBaseLine: function(v) {
		this.__cnx.resolve("_setBaseLine").call([v]);
	}
	,_gatherUp: function(a,b,r) {
		this.__cnx.resolve("_gatherUp").call([a,b,r]);
	}
	,__class__: Js2Swf_ISO_MODULE
};
var PrxISO_MODULE = function(c) {
	Js2Swf_ISO_MODULE.call(this,c);
};
$hxClasses["PrxISO_MODULE"] = PrxISO_MODULE;
PrxISO_MODULE.__name__ = ["PrxISO_MODULE"];
PrxISO_MODULE.__super__ = Js2Swf_ISO_MODULE;
PrxISO_MODULE.prototype = $extend(Js2Swf_ISO_MODULE.prototype,{
	__class__: PrxISO_MODULE
});
var StringEx = function() { };
$hxClasses["StringEx"] = StringEx;
StringEx.__name__ = ["StringEx"];
StringEx.contains = function(str,pattern) {
	return str.indexOf(pattern) >= 0;
};
StringEx.isBlank = function(c) {
	return c == " " || c == "\t" || c == "\r" || c == "\n" || c.charCodeAt(0) == 160;
};
StringEx.trimWhiteSpace = function(s) {
	return s.split(" ").join("").split("\r").join("").split("\n").join("").split("\t").join("");
};
StringEx.filterAlphaNum = function(s) {
	var res = new StringBuf();
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var x = _g1++;
		var c = s.charCodeAt(x);
		if(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57) res.b += String.fromCharCode(c);
	}
	return res.b;
};
StringEx.firstBlankIndex = function(str) {
	var _g1 = 0;
	var _g = str.length;
	while(_g1 < _g) {
		var k = _g1++;
		if(StringEx.isBlank(str.chartAt(k))) return k;
	}
	return -1;
};
StringEx.zeroPad = function(digits,nb) {
	var nbd = "" + nb;
	var _g1 = 0;
	var _g = digits - nbd.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(nb < Std.int(Math.pow(10,nb))) nbd = "0" + nbd;
	}
	return nbd;
};
StringEx.readParen = function(r) {
	var lp = r.indexOf("(");
	var rp = r.lastIndexOf(")");
	if(lp < 0 || rp < 0) return null;
	return HxOverrides.substr(r,lp + 1,rp - lp - 1);
};
StringEx.parseWord = function(r,w) {
	if(r.startsWith(w)) return r.sub(w.length); else return null;
};
StringEx.readWord = function(r) {
	var end = 0;
	while(r.charAt(end) >= "a" && r.charAt(end) <= "z" || r.charAt(end) >= "A" && r.charAt(end) <= "Z" && end < r.length) end++;
	return { word : HxOverrides.substr(r,0,end), rest : HxOverrides.substr(r,end,null)};
};
StringEx.replace = function(str,pat,sub) {
	return str.split(pat).join(sub);
};
StringEx.startsWith = function(s1,s2) {
	return StringTools.startsWith(s1,s2);
};
StringEx.endsWith = function(s1,s2) {
	return HxOverrides.substr(s1,s1.length - s2.length,null) == s2;
};
StringEx.reverse = function(str) {
	var a = str.split("");
	a.reverse();
	return a.join("");
};
var Swf2Js = $hx_exports.Swf2Js = function() {
};
$hxClasses["Swf2Js"] = Swf2Js;
Swf2Js.__name__ = ["Swf2Js"];
Swf2Js.j = function(s) {
	return new js.JQuery(s);
};
Swf2Js.prototype = {
	_echo: function() {
	}
	,_touch: function() {
		haxe.Timer.delay(function() {
			Main.ajax("/touch",null);
		},10);
		null;
	}
	,_acFaHoverIn: function(rindex) {
		this._acFaHoverOut();
		var jq = Swf2Js.j(".butbg a" + "[data=" + rindex + "]");
		jq.parent().parent().parent().addClass("swfhover");
	}
	,_acFaHoverOut: function() {
		var jq = Swf2Js.j(".move.but").removeClass("swfhover");
	}
	,_useModule: function(iid) {
	}
	,_showCloset: function(_force) {
		Main.closet.show(_force,false);
	}
	,_hideCloset: function() {
		Main.closet.hide(false);
	}
	,_cancelSelection: function() {
		Main.cancelSelection();
	}
	,_selectPlayer: function(ser) {
		Main.selectBySerial(ser);
	}
	,_selectNpc: function(uid) {
		this._hideCloset();
		var ser = Main.npcKey2Serial(uid);
		if(ser == null) null; else null;
		Main.selectBySerial(ser);
	}
	,_selectItem: function(iid,k) {
		if(k == null) {
			if(iid == null) {
				Main.cancelSelection();
				return;
			}
			var req = ".item";
			var jitem = Swf2Js.j(req);
			var jqx = null;
			var $it0 = (jitem.iterator)();
			while( $it0.hasNext() ) {
				var x = $it0.next();
				if(x.data("id") == iid) jqx = x;
			}
			if(jqx != null && jqx.length > 0) Main.selectItem(jqx.toArray()[0]); else {
				var ser = Main.iid2Serial(iid);
				if(ser != null) Main.selectBySerial(ser); else null;
			}
		} else {
			this._hideCloset();
			var ser1 = Main.ikey2Serial(k);
			if(ser1 == null) null; else null;
			Main.selectBySerial(ser1);
		}
	}
	,_reload: function() {
		window.location.assign("/");
	}
	,_makeMove: function(lnk) {
		Main.execJump(lnk);
	}
	,__class__: Swf2Js
};
var TagElem = $hxClasses["TagElem"] = { __ename__ : ["TagElem"], __constructs__ : ["Txt","Tg"] };
TagElem.Txt = function(str) { var $x = ["Txt",0,str]; $x.__enum__ = TagElem; $x.toString = $estr; return $x; };
TagElem.Tg = function(tag) { var $x = ["Tg",1,tag]; $x.__enum__ = TagElem; $x.toString = $estr; return $x; };
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Utils = function() { };
$hxClasses["Utils"] = Utils;
Utils.__name__ = ["Utils"];
Utils.Bit_set = function(_v,_i) {
	return _v | _i;
};
Utils.Bit_is = function(_v,_i) {
	return (_v & _i) == _i;
};
Utils.Bit_clear = function(_v,_i) {
	return _v & ~_i;
};
Utils.Bit_neg = function(_i) {
	return ~_i;
};
Utils.escapeJS = function(str) {
	return str.split("\\").join("\\\\").split("'").join("\\'").split("\r").join("\\r").split("\n").join("\\n").split("\"").join("\\'");
};
Utils.genCostTag = function(d) {
	var t = "";
	var _g1 = 0;
	var _g = d.length;
	while(_g1 < _g) {
		var i = _g1++;
		var k = d[i];
		if(k > 0) {
			var src;
			switch(i) {
			case 0:
				src = "/img/icons/ui/pa_slot" + 1 + ".png";
				break;
			case 1:
				src = "/img/icons/ui/pa_slot" + 2 + ".png";
				break;
			case 2:
				src = "/img/icons/ui/pa_eng.png";
				break;
			case 3:
				src = "/img/icons/ui/pa_exp.png";
				break;
			case 4:
				src = "/img/icons/ui/pa_comp.png";
				break;
			case 5:
				src = "/img/icons/ui/pa_garden.png";
				break;
			case 6:
				src = "/img/icons/ui/pa_core.png";
				break;
			case 7:
				src = "/img/icons/ui/pa_shoot.png";
				break;
			case 8:
				src = "/img/icons/ui/pa_cook.png";
				break;
			case 9:
				src = "/img/icons/ui/pa_heal.png";
				break;
			case 10:
				src = "/img/icons/ui/pa_pilgred.png";
				break;
			default:
				src = "/img/icons/ui/att.png";
			}
			t += Std.string(new Tag("span").content("" + k + " ").append(new Tag("img").attr("class","paslot").attr("src",src)));
			t += " ";
		}
	}
	return t;
};
fx.FX = function(q,d) {
	this.duration = d;
	this.t0 = StdEx.time();
	fx.FXManager.self.add(q,this);
	this.onKill = function() {
	};
};
$hxClasses["fx.FX"] = fx.FX;
fx.FX.__name__ = ["fx","FX"];
fx.FX.prototype = {
	reset: function() {
		this.t0 = StdEx.time();
	}
	,t: function() {
		return (StdEx.time() - this.t0) / this.duration;
	}
	,date: function() {
		return StdEx.time() - this.t0;
	}
	,onKill: function() {
	}
	,kill: function() {
		this.onKill();
		this.duration = 0;
	}
	,update: function() {
		if(this.duration != null) {
			var resp = StdEx.time() <= this.t0 + this.duration;
			if(resp == false) this.kill();
			return resp;
		} else return true;
	}
	,__class__: fx.FX
};
fx.DelayProc = function(d,ap) {
	fx.FX.call(this,null,d);
	this.proc(ap);
};
$hxClasses["fx.DelayProc"] = fx.DelayProc;
fx.DelayProc.__name__ = ["fx","DelayProc"];
fx.DelayProc.__super__ = fx.FX;
fx.DelayProc.prototype = $extend(fx.FX.prototype,{
	proc: function(ap) {
		this.p = ap;
		null;
	}
	,kill: function() {
		fx.FX.prototype.kill.call(this);
		this.p();
		this.p = null;
	}
	,__class__: fx.DelayProc
});
fx.js = {};
fx.js.BackgroundTransition = function(sel,ast) {
	fx.FX.call(this,null,ast[ast.length - 1].t);
	this.stages = ast;
	this.jq = new js.JQuery(sel);
};
$hxClasses["fx.js.BackgroundTransition"] = fx.js.BackgroundTransition;
fx.js.BackgroundTransition.__name__ = ["fx","js","BackgroundTransition"];
fx.js.BackgroundTransition.toHtml = function(c) {
	return mt.deepnight.Color.intToHex(c.r << 16 | c.g << 8 | c.b,null);
};
fx.js.BackgroundTransition.__super__ = fx.FX;
fx.js.BackgroundTransition.prototype = $extend(fx.FX.prototype,{
	lookupStages: function() {
		var d = this.date();
		var vmin = null;
		var vmax = null;
		var _g1 = 0;
		var _g = this.stages.length;
		while(_g1 < _g) {
			var st = _g1++;
			if(this.stages[st].t > d) {
				vmax = st;
				vmin = MathEx.clampi(vmax - 1,0,this.stages.length);
				break;
			}
		}
		if(vmax == null) {
			vmax = this.stages.length - 1;
			vmin = MathEx.clampi(vmax,0,this.stages.length);
		}
		var ratio;
		if(vmin == vmax) ratio = 0; else ratio = (d - this.stages[vmin].t) / (this.stages[vmax].t - this.stages[vmin].t);
		if(ratio < 0) ratio = 0; else if(ratio > 1) ratio = 1; else ratio = ratio;
		return { ratio : ratio, src : this.stages[vmin].c, tgt : this.stages[vmax].c};
	}
	,update: function() {
		var cur = this.lookupStages();
		var interp = fx.js.BackgroundTransition.toHtml(mt.deepnight.Color.interpolate(cur.src,cur.tgt,cur.ratio));
		this.jq.css("background-color",interp);
		if(this.duration == null && this.date() > ArrayEx.last(this.stages).t) this.reset();
		return fx.FX.prototype.update.call(this);
	}
	,__class__: fx.js.BackgroundTransition
});
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.ds.BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe.ds.BalancedTree;
haxe.ds.BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe.ds.BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return true; else if(c < 0) node = node.left; else node = node.right;
		}
		return false;
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe.ds.TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe.ds.TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(l.left,l.key,l.value,new haxe.ds.TreeNode(l.right,k,v,r)); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe.ds.TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe.ds.TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe.ds.TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe.ds.BalancedTree
};
haxe.ds.TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe.ds.TreeNode;
haxe.ds.TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe.ds.TreeNode.prototype = {
	__class__: haxe.ds.TreeNode
};
haxe.ds.EnumValueMap = function() {
	haxe.ds.BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe.ds.EnumValueMap;
haxe.ds.EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe.ds.EnumValueMap.__interfaces__ = [IMap];
haxe.ds.EnumValueMap.__super__ = haxe.ds.BalancedTree;
haxe.ds.EnumValueMap.prototype = $extend(haxe.ds.BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe.ds.EnumValueMap
});
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe.io.Bytes
};
haxe.remoting.Connection = function() { };
$hxClasses["haxe.remoting.Connection"] = haxe.remoting.Connection;
haxe.remoting.Connection.__name__ = ["haxe","remoting","Connection"];
haxe.remoting.Connection.prototype = {
	__class__: haxe.remoting.Connection
};
haxe.remoting.ExternalConnection = $hx_exports.haxe.remoting.ExternalConnection = function(data,path) {
	this.__data = data;
	this.__path = path;
};
$hxClasses["haxe.remoting.ExternalConnection"] = haxe.remoting.ExternalConnection;
haxe.remoting.ExternalConnection.__name__ = ["haxe","remoting","ExternalConnection"];
haxe.remoting.ExternalConnection.__interfaces__ = [haxe.remoting.Connection];
haxe.remoting.ExternalConnection.escapeString = function(s) {
	return s;
};
haxe.remoting.ExternalConnection.doCall = function(name,path,params) {
	try {
		var cnx = haxe.remoting.ExternalConnection.connections.get(name);
		if(cnx == null) throw "Unknown connection : " + name;
		if(cnx.__data.ctx == null) throw "No context shared for the connection " + name;
		var params1 = new haxe.Unserializer(params).unserialize();
		var ret = cnx.__data.ctx.call(path.split("."),params1);
		var s = new haxe.Serializer();
		s.serialize(ret);
		return s.toString() + "#";
	} catch( e ) {
		var s1 = new haxe.Serializer();
		s1.serializeException(e);
		return s1.toString();
	}
};
haxe.remoting.ExternalConnection.flashConnect = function(name,flashObjectID,ctx) {
	var cnx = new haxe.remoting.ExternalConnection({ ctx : ctx, name : name, flash : flashObjectID},[]);
	haxe.remoting.ExternalConnection.connections.set(name,cnx);
	return cnx;
};
haxe.remoting.ExternalConnection.prototype = {
	resolve: function(field) {
		var e = new haxe.remoting.ExternalConnection(this.__data,this.__path.slice());
		e.__path.push(field);
		return e;
	}
	,call: function(params) {
		var s = new haxe.Serializer();
		s.serialize(params);
		var params1 = haxe.remoting.ExternalConnection.escapeString(s.toString());
		var data = null;
		var fobj = window.document[this.__data.flash];
		if(fobj == null) fobj = window.document.getElementById(this.__data.flash);
		if(fobj == null) throw "Could not find flash object '" + this.__data.flash + "'";
		try {
			data = fobj.externalRemotingCall(this.__data.name,this.__path.join("."),params1);
		} catch( e ) {
		}
		if(data == null) {
			var domain;
			var pageDomain;
			try {
				domain = fobj.src.split("/")[2];
				pageDomain = window.location.host;
			} catch( e1 ) {
				domain = null;
				pageDomain = null;
			}
			if(domain != pageDomain) throw "ExternalConnection call failure : SWF need allowDomain('" + pageDomain + "')";
			throw "Call failure : ExternalConnection is not " + "initialized in Flash";
		}
		return new haxe.Unserializer(data).unserialize();
	}
	,__class__: haxe.remoting.ExternalConnection
};
js.Lib = function() { };
if (typeof document != "undefined") js.Lib.document = document;
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
js.Lib["eval"] = function(code) {
	return eval(code);
};
mt.Assert = function() { };
$hxClasses["mt.Assert"] = mt.Assert;
mt.Assert.__name__ = ["mt","Assert"];
mt.Assert.throwError = function(msg) {
	var msg1 = mt.Assert.ASSERT_HEADER + "\n msg: " + msg + "\nstatck:\n" + haxe.CallStack.callStack().join(",\n");
	throw msg1;
};
mt.Assert.fail = function(msg) {
	mt.Assert.throwError(msg);
};
mt.Assert.isTrue = function(o,msg) {
	if(msg == null) msg = "";
	if(false == o) mt.Assert.throwError("value should be true\n" + msg);
};
mt.Assert.isFalse = function(o,msg) {
	if(msg == null) msg = "";
	if(false == !o) return mt.Assert.throwError("value should be true\n" + msg);
};
mt.Assert.equals = function(value,expected,msg) {
	if(msg == null) msg = "";
	if(value != expected) mt.Assert.throwError(Std.string(value) + " should be " + Std.string(expected) + "\n  msg: " + msg);
};
mt.Assert.isNull = function(o,msg) {
	if(msg == null) msg = "";
	if(o != null) mt.Assert.throwError("Object is null\n msg: " + msg);
};
mt.Assert.isZero = function(o,msg) {
	if(msg == null) msg = "";
	if(o != 0.0) mt.Assert.throwError("" + o + " does not equal 0 \n msg: " + msg);
};
mt.Assert.notZero = function(o,msg) {
	if(msg == null) msg = "";
	if(o == 0.0) mt.Assert.throwError("" + o + " equals 0 \n msg: " + msg);
};
mt.Assert.notNull = function(o,msg) {
	if(msg == null) msg = "";
	if(o == null) mt.Assert.throwError("Object should be null\n  msg: " + msg);
};
mt.Assert.arrayContains = function(a,o,msg) {
	if(msg == null) msg = "";
	if((function($this) {
		var $r;
		var x = o;
		$r = HxOverrides.indexOf(a,x,0);
		return $r;
	}(this)) == -1) mt.Assert.throwError("Array does not contain expected object\n  msg: " + msg);
};
mt.Assert.contains = function(a,o,msg) {
	if(msg == null) msg = "";
	if(!Lambda.has(a,o)) mt.Assert.throwError("Iterable does not contain expected object\n  msg: " + msg);
};
mt.Rand = function(seed) {
	this.seed = (seed < 0?-seed:seed) + 131;
};
$hxClasses["mt.Rand"] = mt.Rand;
mt.Rand.__name__ = ["mt","Rand"];
mt.Rand.prototype = {
	clone: function() {
		var r = new mt.Rand(0);
		r.seed = this.seed;
		return r;
	}
	,random: function(n) {
		return ((this.seed = this.seed * 16807 % 2147483647) & 1073741823) % n;
	}
	,range: function(min,max,randSign) {
		if(randSign == null) randSign = false;
		return (min + ((this.seed = this.seed * 16807 % 2147483647) & 1073741823) % 10007 / 10007.0 * (max - min)) * (randSign?((this.seed = this.seed * 16807 % 2147483647) & 1073741823) % 2 * 2 - 1:1);
	}
	,irange: function(min,max,randSign) {
		if(randSign == null) randSign = false;
		return (min + ((this.seed = this.seed * 16807 % 2147483647) & 1073741823) % (max - min + 1)) * (randSign?((this.seed = this.seed * 16807 % 2147483647) & 1073741823) % 2 * 2 - 1:1);
	}
	,getSeed: function() {
		return (this.seed | 0) - 131;
	}
	,rand: function() {
		return ((this.seed = this.seed * 16807 % 2147483647) & 1073741823) % 10007 / 10007.0;
	}
	,sign: function() {
		return ((this.seed = this.seed * 16807 % 2147483647) & 1073741823) % 2 * 2 - 1;
	}
	,addSeed: function(d) {
		this.seed = (this.seed + d) % 2147483647 & 1073741823;
		if(this.seed == 0) this.seed = d + 1;
	}
	,initSeed: function(n,k) {
		if(k == null) k = 5;
		var _g = 0;
		while(_g < k) {
			var i = _g++;
			n ^= n << 7 & 727393536;
			n ^= n << 15 & 462094336;
			n ^= n >>> 16;
			n &= 1073741823;
			var h = 5381;
			h = (h << 5) + h + (n & 255);
			h = (h << 5) + h + (n >> 8 & 255);
			h = (h << 5) + h + (n >> 16 & 255);
			h = (h << 5) + h + (n >> 24);
			n = h & 1073741823;
		}
		this.seed = (n & 536870911) + 131;
	}
	,int: function() {
		return (this.seed = this.seed * 16807 % 2147483647) & 1073741823;
	}
	,__class__: mt.Rand
};
mt.ArrayStd = function() { };
$hxClasses["mt.ArrayStd"] = mt.ArrayStd;
mt.ArrayStd.__name__ = ["mt","ArrayStd"];
mt.ArrayStd.size = function(ar) {
	return ar.length;
};
mt.ArrayStd.first = function(ar) {
	return ar[0];
};
mt.ArrayStd.last = function(ar) {
	return ar[ar.length - 1];
};
mt.ArrayStd.clear = function(ar) {
	ar.splice(0,ar.length);
	return ar;
};
mt.ArrayStd.set = function(ar,index,v) {
	ar[index] = v;
	return ar;
};
mt.ArrayStd.at = function(ar,index) {
	return ar[index];
};
mt.ArrayStd.indexOf = function(ar,elt) {
	var id = -1;
	var i = -1;
	var _g = 0;
	while(_g < ar.length) {
		var e = ar[_g];
		++_g;
		++i;
		if(e == elt) {
			id = i;
			break;
		}
	}
	return id;
};
mt.ArrayStd.addFirst = function(ar,e) {
	ar.unshift(e);
	return ar;
};
mt.ArrayStd.addLast = function(ar,e) {
	ar.push(e);
	return ar;
};
mt.ArrayStd.removeFirst = function(ar) {
	return ar.shift();
};
mt.ArrayStd.removeLast = function(ar) {
	return ar.pop();
};
mt.ArrayStd.map = function(ar,f) {
	var output = [];
	var _g = 0;
	while(_g < ar.length) {
		var e = ar[_g];
		++_g;
		output.push(f(e));
	}
	return output;
};
mt.ArrayStd.stripNull = function(ar) {
	while(HxOverrides.remove(ar,null)) {
	}
	return ar;
};
mt.ArrayStd.flatten = function(ar) {
	var out = new Array();
	var _g1 = 0;
	var _g = ar.length;
	while(_g1 < _g) {
		var i = _g1++;
		var $it0 = $iterator(ar[i])();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			out.push(x);
			out;
		}
		out;
	}
	return out;
};
mt.ArrayStd.append = function(ar,it) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		ar.push(x);
		ar;
	}
	return ar;
};
mt.ArrayStd.prepend = function(ar,it) {
	var a = Lambda.array(it);
	a.reverse();
	var _g = 0;
	while(_g < a.length) {
		var x = a[_g];
		++_g;
		ar.unshift(x);
		ar;
	}
	return ar;
};
mt.ArrayStd.shuffle = function(ar,rand) {
	var rnd;
	if(rand != null) rnd = rand; else rnd = Std.random;
	var size = ar.length;
	var _g1 = 0;
	var _g = size << 1;
	while(_g1 < _g) {
		var i = _g1++;
		var id0 = rnd(size);
		var id1 = rnd(size);
		var tmp = ar[id0];
		ar[id0] = ar[id1];
		ar[id1] = tmp;
	}
	return ar;
};
mt.ArrayStd.getRandom = function(ar,rnd) {
	var random;
	if(rnd != null) random = rnd; else random = Std.random;
	var id = random(ar.length);
	return ar[id];
};
mt.ArrayStd.usort = function(t,f) {
	var a = t;
	var i = 0;
	var l = t.length;
	while(i < l) {
		var swap = false;
		var j = 0;
		var max = l - i - 1;
		while(j < max) {
			if(f(a[j],a[j + 1]) > 0) {
				var tmp = a[j + 1];
				a[j + 1] = a[j];
				a[j] = tmp;
				swap = true;
			}
			j += 1;
		}
		if(!swap) break;
		i += 1;
	}
	return a;
};
mt.ListStd = function() { };
$hxClasses["mt.ListStd"] = mt.ListStd;
mt.ListStd.__name__ = ["mt","ListStd"];
mt.ListStd.size = function(l) {
	return l.length;
};
mt.ListStd.at = function(l,index) {
	var ite = l.iterator();
	while(--index > -1) ite.next();
	return ite.next();
};
mt.ListStd.indexOf = function(l,elt) {
	var id = -1;
	var i = -1;
	var $it0 = l.iterator();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		++i;
		if(e == elt) {
			id = i;
			break;
		}
	}
	return id;
};
mt.ListStd.addFirst = function(l,e) {
	l.push(e);
	return l;
};
mt.ListStd.addLast = function(l,e) {
	l.add(e);
	return l;
};
mt.ListStd.removeFirst = function(l) {
	return l.pop();
};
mt.ListStd.removeLast = function(l) {
	var cpy = Lambda.list(l);
	var ite = cpy.iterator();
	var last = l.last();
	l.clear();
	var _g1 = 0;
	var _g = cpy.length - 1;
	while(_g1 < _g) {
		var i = _g1++;
		l.add(ite.next());
	}
	return last;
};
mt.ListStd.copy = function(l) {
	return Lambda.list(l);
};
mt.ListStd.flatten = function(l) {
	var out = new List();
	var _g1 = 0;
	var _g = l.length;
	while(_g1 < _g) {
		var i = _g1++;
		mt.ListStd.append(out,mt.ListStd.at(l,i));
	}
	return out;
};
mt.ListStd.append = function(l,it) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	return l;
};
mt.ListStd.prepend = function(l,it) {
	var a = Lambda.array(it);
	a.reverse();
	var _g = 0;
	while(_g < a.length) {
		var x = a[_g];
		++_g;
		l.push(x);
		l;
	}
	return l;
};
mt.ListStd.reverse = function(l) {
	var cpy = [];
	while(l.length > 0) mt.ArrayStd.addFirst(cpy,l.pop());
	while(cpy.length > 0) mt.ListStd.addFirst(l,cpy.pop());
	return l;
};
mt.ListStd.shuffle = function(l,rand) {
	var ar = Lambda.array(l);
	mt.ArrayStd.shuffle(ar,rand);
	l.clear();
	var _g1 = 0;
	var _g = ar.length;
	while(_g1 < _g) {
		var i = _g1++;
		l.add(ar[i]);
		l;
	}
	ar = null;
	return l;
};
mt.ListStd.slice = function(l,pos,end) {
	var out = new List();
	if(end == null) end = l.length;
	var _g = pos;
	while(_g < end) {
		var i = _g++;
		mt.ListStd.addLast(out,mt.ListStd.at(l,i));
	}
	return out;
};
mt.ListStd.splice = function(l,pos,len) {
	var out = new List();
	var copy = Lambda.list(l);
	l.clear();
	var i = 0;
	var $it0 = copy.iterator();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		if(i < pos) {
			l.add(e);
			l;
		} else if(i >= pos + len) {
			l.add(e);
			l;
		} else {
			out.add(e);
			out;
		}
		i++;
	}
	return out;
};
mt.ListStd.stripNull = function(l) {
	while(l.remove(null)) {
	}
	return l;
};
mt.ListStd.getRandom = function(l,rnd) {
	var random;
	if(rnd != null) random = rnd; else random = Std.random;
	var id = random(l.length);
	return mt.ListStd.at(l,id);
};
mt.ListStd.usort = function(l,f) {
	var a = Lambda.array(l);
	a = mt.ArrayStd.usort(a,f);
	l.clear();
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		l.add(e);
		l;
	}
	return l;
};
mt.gx = {};
mt.gx.ArrayEx = function() { };
$hxClasses["mt.gx.ArrayEx"] = mt.gx.ArrayEx;
mt.gx.ArrayEx.__name__ = ["mt","gx","ArrayEx"];
mt.gx.ArrayEx.scramble = function(arr,mr) {
	var _g1 = 0;
	var _g;
	_g = arr.length + (mr == null?Std.random(arr.length):((mr.seed = mr.seed * 16807 % 2147483647) & 1073741823) % arr.length);
	while(_g1 < _g) {
		var x = _g1++;
		var b;
		if(mr == null) b = Std.random(arr.length); else b = ((mr.seed = mr.seed * 16807 % 2147483647) & 1073741823) % arr.length;
		var a;
		if(mr == null) a = Std.random(arr.length); else a = ((mr.seed = mr.seed * 16807 % 2147483647) & 1073741823) % arr.length;
		var temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}
	return arr;
};
mt.gx.ArrayEx.first = function(arr) {
	return arr[0];
};
mt.gx.ArrayEx.last = function(arr) {
	return arr[arr.length - 1];
};
mt.gx.ArrayEx.random = function(arr,mr) {
	var v;
	if(mr == null) v = arr[Std.random(arr.length)]; else v = arr[((mr.seed = mr.seed * 16807 % 2147483647) & 1073741823) % arr.length];
	return v;
};
mt.gx.ArrayEx.reserve = function(n) {
	var r = new Array();
	r[n] = null;
	return r;
};
mt.gx.ArrayEx.clear = function(arr) {
	arr.splice(0,arr.length);
};
mt.gx.ArrayEx.removeByIndex = function(arr,i) {
	arr.splice(i,1);
};
mt.gx.ArrayEx.enqueue = function(a,b) {
	var $it0 = $iterator(b)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		a.push(x);
	}
	return a;
};
mt.gx.ArrayEx.strip = function(a,f) {
	var top = a.length - 1;
	while(--top >= 0) if(f(a[top])) a.splice(top,1);
	return a;
};
mt.gx.ArrayEx.splat = function(arr,nb,e) {
	var _g = 0;
	while(_g < nb) {
		var i = _g++;
		arr.push(Reflect.copy(e));
	}
	return arr;
};
mt.gx.ArrayEx.wrap = function(arr,pre,post) {
	var r = [];
	var _g = 0;
	while(_g < arr.length) {
		var k = arr[_g];
		++_g;
		r.push(pre + Std.string(k) + post);
	}
	return r;
};
mt.gx.ArrayEx.bsearch = function(a,key,f) {
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
};
mt.gx.ArrayEx.except = function(it,exc) {
	return Lambda.filter(it,function(a) {
		return !Lambda.has(exc,a);
	});
};
mt.gx.ArrayEx.excepta = function(it,exc) {
	return Lambda.array(mt.gx.ArrayEx.except(it,exc));
};
mt.gx.ArrayEx.pushBack = function(l,e) {
	l.push(e);
	return e;
};
mt.gx.ArrayEx.pushFront = function(l,e) {
	l.unshift(e);
	return e;
};
mt.gx.ArrayEx.partition = function(it,predicate) {
	var p = new mt.gx.Pair([],[]);
	var _g = 0;
	while(_g < it.length) {
		var x = it[_g];
		++_g;
		if(predicate(x)) p.first.push(x); else p.second.push(x);
	}
	return p;
};
mt.gx.ArrayEx.removeLast = function(arr) {
	arr.pop();
};
mt.gx.ArrayEx.worst = function(arr,f) {
	if(arr.length == 0) return null; else {
		var idx = 0;
		var _g1 = 1;
		var _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(f(arr[idx]) > f(arr[i])) idx = i;
		}
		return arr[idx];
	}
};
mt.gx.ArrayEx.best = function(arr,f) {
	if(arr.length == 0) return null; else {
		var idx = 0;
		var _g1 = 1;
		var _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(f(arr[idx]) < f(arr[i])) idx = i;
		}
		return arr[idx];
	}
};
mt.gx.ArrayEx.bestNZ = function(arr,f) {
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
};
mt.gx.ArrayEx.worstNZ = function(arr,f) {
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
};
mt.gx.ArrayEx.removeAll = function(a,f) {
	var _g = 0;
	var _g1 = a.slice();
	while(_g < _g1.length) {
		var d = _g1[_g];
		++_g;
		if(f(d)) HxOverrides.remove(a,d);
	}
};
mt.gx.ArrayEx.findAndRemove = function(a,f) {
	var i = mt.gx.LambdaEx.findIndex(a,f);
	if(i == null || i < 0) return null;
	return a.splice(i,1)[0];
};
mt.gx.ArrayEx.put = function(a,elem) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a[i] == null) {
			a[i] = elem;
			return i;
		}
	}
	a[a.length] = elem;
	return a.length - 1;
};
mt.gx.ArrayEx.rem = function(a,elem) {
	var idx = -1;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a[i] == elem) {
			a[idx = i] = null;
			break;
		}
	}
	return -1 != idx;
};
mt.gx.ArrayEx.unitTest = function() {
};
mt.gx.DateEx = function() { };
$hxClasses["mt.gx.DateEx"] = mt.gx.DateEx;
mt.gx.DateEx.__name__ = ["mt","gx","DateEx"];
mt.gx.DateEx.cmp = function(d1,d2) {
	return Std.int(d2.getTime() - d1.getTime());
};
mt.gx.DateEx.lt = function(d1,d2) {
	return HxOverrides.dateStr(d1) < HxOverrides.dateStr(d2);
};
mt.gx.DateEx.gt = function(d1,d2) {
	return HxOverrides.dateStr(d1) < HxOverrides.dateStr(d2);
};
mt.gx.DateEx.eq = function(d1,d2) {
	return HxOverrides.dateStr(d1) == HxOverrides.dateStr(d2);
};
mt.gx.DateEx.diff = function(d1,d2) {
	return d1.getTime() - d2.getTime();
};
mt.gx.DateEx.diffHours = function(d1,d2) {
	return (d1.getTime() - d2.getTime()) / 3600000;
};
mt.gx.DateEx.diffSeconds = function(d1,d2) {
	return (d1.getTime() - d2.getTime()) / 1000;
};
mt.gx.DateEx.toSec = function(d) {
	return d.getTime() * 0.001;
};
mt.gx.DateEx.addSeconds = function(d,t) {
	var t1 = d.getTime() + t * 1000.0;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
mt.gx.DateEx.addMins = function(d,t) {
	var t1 = d.getTime() + t * 60.0 * 1000.0;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
mt.gx.DateEx.addHours = function(date,t) {
	var t1 = date.getTime() + t * 60.0 * 60.0 * 1000.0;
	var d = new Date();
	d.setTime(t1);
	return d;
};
mt.gx.DateEx.addDays = function(d,t) {
	var t1 = d.getTime() + t * 24.0 * 60.0 * 60.0 * 1000.0;
	var d1 = new Date();
	d1.setTime(t1);
	return d1;
};
mt.gx.DateEx.round = function(d,secSlice) {
	var secs = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
	var nb = (secs / secSlice | 0) * secSlice | 0;
	var remHrs = nb / 3600 | 0;
	nb -= remHrs * 3600;
	var remMin = nb / 60 | 0;
	nb -= remMin * 60;
	var remSec = nb;
	return new Date(d.getFullYear(),d.getMonth(),d.getDate(),remHrs | 0,remMin | 0,remSec | 0);
};
mt.gx.Debug = function() { };
$hxClasses["mt.gx.Debug"] = mt.gx.Debug;
mt.gx.Debug.__name__ = ["mt","gx","Debug"];
mt.gx.Debug.assert = function(o,s,pos) {
	if(o == null || o == false) {
		var info = haxe.CallStack.exceptionStack().join(", ") + "\n\n" + haxe.CallStack.callStack().join(", ");
		if(s != null) throw "Assertion failed (" + ("" + o) + "): " + s + "\n" + info; else throw "assert (" + ("" + o) + ") \n" + info;
	}
	return null;
};
mt.gx.Debug.nz = function(v) {
	mt.gx.Debug.assert(v != 0.0,null,{ fileName : "Debug.hx", lineNumber : 22, className : "mt.gx.Debug", methodName : "nz"});
};
mt.gx.Debug.brk = function(_Str,pos) {
	throw _Str;
	return null;
};
mt.gx.Debug.msg = function(o,pos) {
	haxe.Log.trace(o,pos);
};
mt.gx.EnumEx = function() { };
$hxClasses["mt.gx.EnumEx"] = mt.gx.EnumEx;
mt.gx.EnumEx.__name__ = ["mt","gx","EnumEx"];
mt.gx.EnumEx.random = function(e) {
	return mt.gx.ArrayEx.random(Type.allEnums(e),null);
};
mt.gx.EnumEx.next = function(v,e) {
	var len = Type.allEnums(e).length;
	return Type.createEnumIndex(e,(v[1] + 1) % len);
};
mt.gx.EnumEx.previous = function(v,e) {
	var len = Type.allEnums(e).length;
	return Type.createEnumIndex(e,(v[1] + (len - 1)) % len);
};
mt.gx.EnumEx.array = function(e) {
	return Type.allEnums(e);
};
mt.gx.EnumEx.flags2List = function(e,f) {
	var res = new List();
	var _g = 0;
	var _g1 = Type.allEnums(e);
	while(_g < _g1.length) {
		var ef = _g1[_g];
		++_g;
		if((f & 1 << ef[1]) != 0) res.push(ef);
	}
	return res;
};
mt.gx.EnumEx.iterator = function(e) {
	var _this = Type.allEnums(e);
	return HxOverrides.iter(_this);
};
mt.gx.EnumEx.iterFlags = function(e,f,p) {
	var _g = 0;
	var _g1 = Type.allEnums(e);
	while(_g < _g1.length) {
		var ef = _g1[_g];
		++_g;
		if((f & 1 << ef[1]) != 0) p(ef);
	}
};
mt.gx.EnumEx.index = function(v) {
	return v[1];
};
mt.gx.EnumEx.createI = function(e,v) {
	return Type.createEnumIndex(e,v);
};
mt.gx.EnumEx.parseInt = function(e,s) {
	return Type.createEnumIndex(e,Std.parseInt(s));
};
mt.gx.EnumEx.createS = function(e,v) {
	return Type.createEnum(e,v);
};
mt.gx.EnumEx.str = function(v) {
	return Std.string(v);
};
mt.gx.EnumFlagsEx = function() { };
$hxClasses["mt.gx.EnumFlagsEx"] = mt.gx.EnumFlagsEx;
mt.gx.EnumFlagsEx.__name__ = ["mt","gx","EnumFlagsEx"];
mt.gx.EnumFlagsEx.list = function(h,e) {
	var r = new List();
	var _g = 0;
	var _g1 = Type.allEnums(e);
	while(_g < _g1.length) {
		var v = _g1[_g];
		++_g;
		if((h & 1 << v[1]) != 0) r.push(v);
	}
	return r;
};
mt.gx.EnumFlagsEx.mix = function(v0,v1,v2,v3) {
	var e = 0;
	e |= 1 << v0[1];
	if(null == v1) e |= 1 << v1[1];
	if(null == v2) e |= 1 << v2[1];
	if(null == v3) e |= 1 << v3[1];
	return e;
};
mt.gx.EnumFlagsEx.hasSome = function(h0,h1) {
	return (h0 & h1) != 0;
};
mt.gx.EnumFlagsEx.hasAll = function(h0,h1) {
	return (h0 & h1) == h1;
};
mt.gx.EnumFlagsEx.mset = function(e,v0,v1,v2,v3) {
	e |= 1 << v0[1];
	e |= 1 << v1[1];
	if(null != v2) e |= 1 << v2[1];
	if(null != v3) e |= 1 << v3[1];
	return e;
};
mt.gx.EnumFlagsEx.munset = function(e,v0,v1,v2,v3) {
	e &= 268435455 - (1 << v0[1]);
	e &= 268435455 - (1 << v1[1]);
	if(null != v2) e &= 268435455 - (1 << v2[1]);
	if(null != v3) e &= 268435455 - (1 << v3[1]);
	return e;
};
mt.gx.EnumFlagsEx.mhasAll = function(e,v0,v1,v2,v3) {
	var i = 0;
	i |= v0[1];
	i |= v1[1];
	if(v2 != null) i |= v2[1];
	if(v3 != null) i |= v3[1];
	return (e & i) == i;
};
mt.gx.EnumFlagsEx.mhasSome = function(e,v0,v1,v2,v3) {
	var i = 0;
	i |= v0[1];
	i |= v1[1];
	if(v2 != null) i |= v2[1];
	if(v3 != null) i |= v3[1];
	return (e & i) != 0;
};
mt.gx.Ex = function() { };
$hxClasses["mt.gx.Ex"] = mt.gx.Ex;
mt.gx.Ex.__name__ = ["mt","gx","Ex"];
mt.gx.Ex.assert = function(d,msg) {
	if(msg == null) msg = "";
	if(d == null) throw "assert " + msg; else return d;
};
mt.gx.Ex.deepCopy = function(v) {
	var type = Type["typeof"](v);
	switch(type[1]) {
	case 0:
		return null;
	case 3:
		return v;
	case 1:
		return v;
	case 2:
		return v;
	case 5:
		return v;
	case 7:
		var e = type[2];
		var en = Type.createEnum(e,Std.string(e));
		return en;
	case 4:
		var obj = { };
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var ff = _g1[_g];
			++_g;
			Reflect.setField(obj,ff,mt.gx.Ex.deepCopy(Reflect.field(v,ff)));
		}
		return obj;
	case 6:
		var c = type[2];
		var fields = Reflect.fields(v);
		if(fields.length == 0) return Type.createInstance(c,[v]); else {
			var obj1 = Type.createEmptyInstance(c);
			var _g2 = 0;
			while(_g2 < fields.length) {
				var ff1 = fields[_g2];
				++_g2;
				Reflect.setField(obj1,ff1,mt.gx.Ex.deepCopy(Reflect.field(v,ff1)));
			}
			return obj1;
		}
		break;
	case 8:
		return v;
	}
};
mt.gx.Ex.id = function() {
};
mt.gx.LambdaEx = function() { };
$hxClasses["mt.gx.LambdaEx"] = mt.gx.LambdaEx;
mt.gx.LambdaEx.__name__ = ["mt","gx","LambdaEx"];
mt.gx.LambdaEx.scramble = function(it) {
	var arr = Lambda.array(it);
	var _g1 = 0;
	var _g = arr.length * 2;
	while(_g1 < _g) {
		var x = _g1++;
		var b = Std.random(arr.length);
		var a = Std.random(arr.length);
		var temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}
	return Lambda.list(arr);
};
mt.gx.LambdaEx.find = function(it,predicate,dflt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(predicate(x)) return x;
	}
	return dflt;
};
mt.gx.LambdaEx.sum = function(it,valFunc) {
	var v = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		v += valFunc(x);
	}
	return v;
};
mt.gx.LambdaEx.avg = function(it,valFunc) {
	var len = Lambda.count(it);
	if(len == 0) return 0;
	var v = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		v += valFunc(x);
	}
	return v / len;
};
mt.gx.LambdaEx.locate = function(it,predicate,dflt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var o = predicate(x);
		if(o != null) return o;
	}
	return dflt;
};
mt.gx.LambdaEx.test = function(it,predicate) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(predicate(x)) return true;
	}
	return false;
};
mt.gx.LambdaEx.allTrue = function(it,predicate) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!predicate(x)) return false;
	}
	return true;
};
mt.gx.LambdaEx.partition = function(it,predicate) {
	var p = new mt.gx.Pair(new List(),new List());
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(predicate(x)) p.first.add(x); else p.second.add(x);
	}
	return p;
};
mt.gx.LambdaEx.nth = function(it,n,dflt) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(i == n) return x;
		i++;
	}
	return dflt;
};
mt.gx.LambdaEx.first = function(it,dflt) {
	return mt.gx.LambdaEx.nth(it,0,dflt);
};
mt.gx.LambdaEx.nullStrip = function(it) {
	return Lambda.filter(it,function(x) {
		return x != null;
	});
};
mt.gx.LambdaEx.reverse = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.push(x);
	}
	return l;
};
mt.gx.LambdaEx.when = function(it,match,proc) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(match(x)) {
			proc(x);
			return;
		}
	}
};
mt.gx.LambdaEx.singletons = function(it,eqFunc) {
	var infer = new List();
	Lambda.iter(it,function(x) {
		if(eqFunc == null) {
			if(Lambda.has(infer,x) == false) infer.add(x);
		} else {
			var exist = false;
			var $it0 = infer.iterator();
			while( $it0.hasNext() ) {
				var e = $it0.next();
				if(eqFunc(x,e)) {
					exist = true;
					break;
				}
			}
			if(!exist) infer.add(x);
		}
	});
	return infer;
};
mt.gx.LambdaEx.range = function(it,min,max) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		if(i >= min) l.add(k);
		i++;
		if(i == max) break;
	}
	return l;
};
mt.gx.LambdaEx.packSimilar = function(it,eq) {
	var a = new List();
	if(eq == null) eq = function(a1,b) {
		return a1 == b;
	};
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(a.last() == null) a.add({ v : v, nb : 1}); else if(eq(a.last().v,v)) a.last().nb++; else a.add({ v : v, nb : 1});
	}
	return a;
};
mt.gx.LambdaEx.removeOne = function(it,testFunc) {
	var res = new List();
	var done = false;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!done && testFunc(x)) done = true; else res.push(x);
	}
	return res;
};
mt.gx.LambdaEx.inject = function(it,n,v) {
	var _g = 0;
	while(_g < n) {
		var x = _g++;
		it.push(v);
	}
	return it;
};
mt.gx.LambdaEx.head = function(it,n) {
	var i = 0;
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		if(i >= n) return l;
		l.add(e);
		i++;
	}
	return l;
};
mt.gx.LambdaEx.tail = function(it,n) {
	var i = 0;
	var len = Lambda.count(it);
	return Lambda.filter(it,function(x) {
		return i++ >= len - n;
	});
};
mt.gx.LambdaEx.randomSubset = function(it,n) {
	var len = it.length;
	var res = new List();
	var mark = new Array();
	mt.gx.LambdaEx.inject(mark,it.length,true);
	while(n > 0) {
		var _g1 = 0;
		var _g = it.length;
		while(_g1 < _g) {
			var x = _g1++;
			if(Std.random(len) == 0 && mark[x]) {
				res.push(it[x]);
				n--;
				mark[x] = false;
			}
		}
	}
	return res;
};
mt.gx.LambdaEx.sortAbsOrder = function(it,order) {
	var arr = Lambda.array(it);
	var f = function(x,y) {
		if(order(x,y)) return -1; else return 1;
	};
	arr.sort(f);
	return Lambda.list(arr);
};
mt.gx.LambdaEx.sortRelOrder = function(it,order) {
	var arr = Lambda.array(it);
	arr.sort(order);
	return Lambda.list(arr);
};
mt.gx.LambdaEx.random = function(it,mr) {
	var i = null;
	if(mr != null) i = mr.random(Lambda.count(it));
	if(i == null) i = Std.random(Lambda.count(it));
	return mt.gx.LambdaEx.nth(it,i);
};
mt.gx.LambdaEx.findIndex = function(it,p) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(p(x)) return i;
		i++;
	}
	return null;
};
mt.gx.LambdaEx.wrap = function(x) {
	var l = new List();
	l.push(x);
	return l;
};
mt.gx.LambdaEx.unwrap = function(i) {
	var l = new List();
	var $it0 = $iterator(i)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var $it1 = $iterator(x)();
		while( $it1.hasNext() ) {
			var y = $it1.next();
			l.add(y);
		}
	}
	return l;
};
mt.gx.LambdaEx.dispatch = function(x,f) {
	var rep = new haxe.ds.IntMap();
	var $it0 = $iterator(x)();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		var i = f(e);
		if(!rep.exists(i)) rep.set(i,new List());
		rep.get(i).add(e);
	}
	return rep;
};
mt.gx.LambdaEx.dispatchA = function(x,f) {
	var rep = new haxe.ds.IntMap();
	var $it0 = $iterator(x)();
	while( $it0.hasNext() ) {
		var e = $it0.next();
		var i = f(e);
		if(!rep.exists(i)) rep.set(i,[]);
		rep.get(i).push(e);
	}
	return rep;
};
mt.gx.LambdaEx.dispatchByEnum = function(x,f) {
	var rep = new haxe.ds.EnumValueMap();
	var $it0 = $iterator(x)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		var e = f(v);
		if(!rep.exists(e)) rep.set(e,new List());
		rep.get(e).add(v);
	}
	return rep;
};
mt.gx.LambdaEx.dispatchByEnumA = function(x,f) {
	var rep = new haxe.ds.EnumValueMap();
	var $it0 = $iterator(x)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		var e = f(v);
		if(!rep.exists(e)) rep.set(e,[]);
		rep.get(e).push(v);
	}
	return rep;
};
mt.gx.LambdaEx.flatten = function(x) {
	var nl = new List();
	var $it0 = $iterator(x)();
	while( $it0.hasNext() ) {
		var l = $it0.next();
		var $it1 = $iterator(l)();
		while( $it1.hasNext() ) {
			var e = $it1.next();
			nl.push(e);
		}
	}
	return nl;
};
mt.gx.LambdaEx.iso = function(x,p) {
	return Lambda.map(x,p);
};
mt.gx.LambdaEx.mapa = function(x,p) {
	return Lambda.array(Lambda.map(x,p));
};
mt.gx.LambdaEx.bestF = function(l,f) {
	var velem = null;
	var vw = null;
	var $it0 = $iterator(l)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		var vwi = f(i);
		if(velem == null) {
			velem = i;
			vw = vwi;
		} else if(vwi > vw) {
			velem = i;
			vw = vwi;
		}
	}
	return velem;
};
mt.gx.LambdaEx.worstF = function(l,f) {
	var velem = null;
	var vw = null;
	var $it0 = $iterator(l)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		var vwi = f(i);
		if(velem == null) {
			velem = i;
			vw = vwi;
		} else if(vwi < vw) {
			velem = i;
			vw = vwi;
		}
	}
	return velem;
};
mt.gx.ListEx = function() { };
$hxClasses["mt.gx.ListEx"] = mt.gx.ListEx;
mt.gx.ListEx.__name__ = ["mt","gx","ListEx"];
mt.gx.ListEx.removeAll = function(a,f) {
	var nb = 0;
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var d = $it0.next();
		if(f(d)) {
			a.remove(d);
			nb++;
		}
	}
	return nb;
};
mt.gx.ListEx.orderedAdd = function(it,o,order) {
	if(it.length == 0) {
		it.push(o);
		return;
	}
	if(order(o,it.last())) it.push(o); else {
		var old = it.last();
		it.remove(old);
		it.push(o);
		it.push(old);
	}
};
mt.gx.ListEx.checkOrder = function(it,order) {
	var old = Lambda.list(it);
	while(old.length > 1) {
		if(!order(old.first(),mt.gx.LambdaEx.nth(old,1))) return false;
		old.pop();
	}
	return true;
};
mt.gx.ListEx.random = function(it) {
	var i = null;
	if(i == null) i = Std.random(it.length);
	return mt.gx.LambdaEx.nth(it,i);
};
mt.gx.ListEx.empty = function() {
	return new List();
};
mt.gx.ListEx.from = function(v) {
	var l = new List();
	l.push(v);
	return l;
};
mt.gx.ListEx.n = function() {
	return new List();
};
mt.gx.ListEx.append = function(those,it) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		those.add(x);
	}
	return those;
};
mt.gx.ListEx.pushBack = function(l,e) {
	l.add(e);
	return e;
};
mt.gx.ListEx.pushFront = function(l,e) {
	l.push(e);
	return e;
};
mt.gx.ListEx.best = function(l,f) {
	if(l.length == 0) return null; else {
		var i = 0;
		var idx = 0;
		var elem = null;
		var elV = 0;
		var $it0 = l.iterator();
		while( $it0.hasNext() ) {
			var el = $it0.next();
			if(i != 0) {
				var tel = f(el);
				if(elV < tel) {
					idx = i;
					elem = el;
					elV = tel;
				}
			} else {
				idx = 0;
				elem = el;
				elV = f(el);
			}
		}
		return elem;
	}
};
mt.gx.ListEx.unitTest = function() {
};
mt.gx.MathEx = function() { };
$hxClasses["mt.gx.MathEx"] = mt.gx.MathEx;
mt.gx.MathEx.__name__ = ["mt","gx","MathEx"];
mt.gx.MathEx.clamp = function(a,min,max) {
	if(a < min) return min; else if(a > max) return max; else return a;
};
mt.gx.MathEx.maxi = function(x,y) {
	if(x < y) return y; else return x;
};
mt.gx.MathEx.page = function(i,n) {
	return i / n | 0;
};
mt.gx.MathEx.nbPage = function(count,pgSz) {
	if(count <= 0) return 0; else if(count % pgSz == 0) return count / pgSz | 0; else return 1 + (count / pgSz | 0);
};
mt.gx.MathEx.mini = function(x,y) {
	if(x < y) return x; else return y;
};
mt.gx.MathEx.nearesti = function(x) {
	return (x < 0?x - 0.5:x + 0.5) | 0;
};
mt.gx.MathEx.absi = function(x) {
	var sign = x >> 31;
	return (x ^ sign) - sign;
};
mt.gx.MathEx.clampi = function(a,min,max) {
	if(a < min) return min; else if(a > max) return max; else return a;
};
mt.gx.MathEx.sqrI = function(a) {
	return a * a;
};
mt.gx.MathEx.div = function(a,b) {
	return a / b | 0;
};
mt.gx.MathEx.countBits = function(x) {
	var res = 0;
	while(x != 0) {
		x >>= 1;
		if((x & 1) != 0) res++;
	}
	return res;
};
mt.gx.MathEx.log2i = function(v) {
	if(v == 0) return 0; else {
		var r = 0;
		while(v != 0) {
			v >>= 1;
			if(v == 0) break;
			r++;
		}
		return r;
	}
};
mt.gx.MathEx.eq = function(v0,v1,d) {
	if(d == null) d = 1e-04;
	return Math.abs(v0 - v1) < d;
};
mt.gx.MathEx.lerpi = function(v0,v1,t) {
	return (v1 - v0) * t + v0 | 0;
};
mt.gx.MathEx.lerp = function(v0,v1,t) {
	return (v1 - v0) * t + v0;
};
mt.gx.MathEx.ratio = function(v,lo,hi) {
	if(lo == hi) return 0; else return (v - lo) / (hi - lo);
};
mt.gx.MathEx.lerpEaseIn = function(v0,v1,t) {
	var tt = t * t;
	return (v1 - v0) * tt + v0;
};
mt.gx.MathEx.powi = function(v,p) {
	return Std.int(Math.pow(v,p));
};
mt.gx.MathEx.pow2i = function(v) {
	return v * v;
};
mt.gx.MathEx.pow2f = function(v) {
	return v * v;
};
mt.gx.MathEx.lerpEaseOut = function(v0,v1,t) {
	var tt;
	if(t <= 1e-04) tt = 0; else tt = Math.sqrt(t);
	return (v1 - v0) * tt + v0;
};
mt.gx.MathEx.normAngle = function(f) {
	while(f >= Math.PI * 2) f -= Math.PI * 2;
	while(f <= -Math.PI * 2) f += Math.PI * 2;
	return f;
};
mt.gx.MathEx.posMod = function(i,m) {
	var mod = i % m;
	if(mod >= 0) return mod; else return mod + m;
};
mt.gx.MathEx.trunk = function(v,digit) {
	var hl = 10.0 * digit;
	return (v * hl | 0) / hl;
};
mt.gx.MathEx.dist = function(x,y,xx,yy) {
	return Math.sqrt(mt.gx.MathEx.dist2(x,y,xx,yy));
};
mt.gx.MathEx.dist2 = function(x,y,xx,yy) {
	var sx = xx - x;
	var sy = yy - y;
	return sx * sx + sy * sy;
};
mt.gx.MathEx.len = function(x,y) {
	return Math.sqrt(x * x + y * y);
};
mt.gx.MathEx.squareSignal = function(t,period) {
	return (t / period | 0) % 2 == 0;
};
mt.gx.MathEx.headingSign = function(v) {
	if(v > 0) return "+ " + v; else return "- " + mt.gx.MathEx.absi(v);
};
mt.gx.MathEx.sameSign = function(f0,f1) {
	return f0 < 0 && f1 < 0 || f0 > 0 && f1 > 0;
};
mt.gx.MathEx.ceili = function(v0) {
	return Std.int(Math.ceil(v0));
};
mt.gx.MathEx.floori = function(v0) {
	return Std.int(Math.floor(v0));
};
mt.gx.MathEx.is0 = function(f) {
	return Math.abs(f) < 1e-04;
};
mt.gx.Pair = function(a,b) {
	this.first = a;
	this.second = b;
};
$hxClasses["mt.gx.Pair"] = mt.gx.Pair;
mt.gx.Pair.__name__ = ["mt","gx","Pair"];
mt.gx.Pair.prototype = {
	toString: function() {
		return "first:" + Std.string(this.first) + " second:" + Std.string(this.second);
	}
	,__class__: mt.gx.Pair
};
mt.gx.RandomEx = function() { };
$hxClasses["mt.gx.RandomEx"] = mt.gx.RandomEx;
mt.gx.RandomEx.__name__ = ["mt","gx","RandomEx"];
mt.gx.RandomEx.randI = function(n) {
	return Std.random(n);
};
mt.gx.RandomEx.randF = function() {
	return Math.random();
};
mt.gx.RandomEx.randB = function() {
	return (Std.random(1024) & 2) == 1;
};
mt.gx.RandomEx.rf = function(f) {
	return Math.random() * f;
};
mt.gx.RandomEx.SqrtFilter = function(f) {
	return Math.sqrt(f);
};
mt.gx.RandomEx.SqrFilter = function(f) {
	return f * f;
};
mt.gx.RandomEx.SinFilter = function(f) {
	return Math.sin(f * Math.PI / 2);
};
mt.gx.RandomEx.CosFilter = function(f) {
	return 1 - Math.cos(f * Math.PI * 0.5);
};
mt.gx.RandomEx.randFilteredI = function(n,filter) {
	var i = Std.int(filter(Math.random()) * (n - 1) + 0.5);
	i = mt.gx.MathEx.clampi(i,0,n - 1);
	return i;
};
mt.gx.RandomEx.normRdEnum = function(arr) {
	var sum = Lambda.fold(arr,function(x,r) {
		return r + x.weight;
	},0);
	var rd = Std.random(sum);
	var $it0 = $iterator(arr)();
	while( $it0.hasNext() ) {
		var x1 = $it0.next();
		rd -= x1.weight;
		if(rd < 0) return x1.id;
	}
	return null;
};
mt.gx.StringEx = function() { };
$hxClasses["mt.gx.StringEx"] = mt.gx.StringEx;
mt.gx.StringEx.__name__ = ["mt","gx","StringEx"];
mt.gx.StringEx.contains = function(str,pattern) {
	return str.indexOf(pattern) >= 0;
};
mt.gx.StringEx.isBlank = function(c) {
	return c == " " || c == "\t" || c == "\r" || c == "\n" || c.charCodeAt(0) == 160;
};
mt.gx.StringEx.trimWhiteSpace = function(s) {
	return s.split(" ").join("").split("\r").join("").split("\n").join("").split("\t").join("");
};
mt.gx.StringEx.filterAlphaNum = function(s) {
	var res = new StringBuf();
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var x = _g1++;
		var c = s.charCodeAt(x);
		if(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57) res.b += String.fromCharCode(c);
	}
	return res.b;
};
mt.gx.StringEx.firstBlankIndex = function(str) {
	var _g1 = 0;
	var _g = str.length;
	while(_g1 < _g) {
		var k = _g1++;
		if(mt.gx.StringEx.isBlank(str.charAt(k))) return k;
	}
	return -1;
};
mt.gx.StringEx.zeroPad = function(digits,nb) {
	var nbd = "" + nb;
	var _g1 = 0;
	var _g = digits - nbd.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(nb < Std.int(Math.pow(10,nb))) nbd = "0" + nbd;
	}
	return nbd;
};
mt.gx.StringEx.readParen = function(r) {
	var lp = r.indexOf("(");
	var rp = r.lastIndexOf(")");
	if(lp < 0 || rp < 0) return null;
	return HxOverrides.substr(r,lp + 1,rp - lp - 1);
};
mt.gx.StringEx.parseWord = function(r,w) {
	r = StringTools.trim(r);
	if(StringTools.startsWith(r,w)) return HxOverrides.substr(r,w.length,null); else return null;
};
mt.gx.StringEx.readWord = function(r) {
	var end = 0;
	while(r.charAt(end) >= "a" && r.charAt(end) <= "z" || r.charAt(end) >= "A" && r.charAt(end) <= "Z" && end < r.length) end++;
	return { word : HxOverrides.substr(r,0,end), rest : HxOverrides.substr(r,end,null)};
};
mt.gx.StringEx.replace = function(str,pat,sub) {
	return str.split(pat).join(sub);
};
mt.gx.StringEx.reverse = function(str) {
	var s = new StringBuf();
	var _g1 = 0;
	var _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		var j = str.length - i - 1;
		s.addChar(str.charCodeAt(j));
	}
	return s.b;
};
mt.js.Timer = $hx_exports.mt.js.Timer = function(now,end,start) {
	this.t = now.getTime();
	if(start == null) this.start = now; else this.start = start;
	this.end = end;
	if(mt.js.Timer.timer == null) {
		mt.js.Timer.timer = new haxe.Timer(1000);
		mt.js.Timer.timer.run = function() {
			var _g = 0;
			var _g1 = mt.js.Timer.timers;
			while(_g < _g1.length) {
				var t = _g1[_g];
				++_g;
				t.update();
			}
		};
	}
	mt.js.Timer.timers.push(this);
};
$hxClasses["mt.js.Timer"] = mt.js.Timer;
mt.js.Timer.__name__ = ["mt","js","Timer"];
mt.js.Timer.alloc = function(now,end,prec,div) {
	if(div == null) {
		div = "timer_" + mt.js.Timer.timers.length;
		window.document.write("<div id=\"" + div + "\" class=\"timer\"></div>");
	}
	var t = new mt.js.Timer(HxOverrides.strDate(now),HxOverrides.strDate(end));
	t.textDiv = { id : div, prec : prec};
	t.update();
	return t;
};
mt.js.Timer.prototype = {
	stop: function() {
		HxOverrides.remove(mt.js.Timer.timers,this);
	}
	,buildText: function() {
		var str = "";
		var prec = this.textDiv.prec;
		var force = false;
		if(prec < 1) {
			var sep;
			if(this.rem.seconds % 2 == 0) sep = ":"; else sep = "<span style=\"opacity : 0\">:</span>";
			if(this.rem.hours > 0) {
				var str1 = this.rem.hours + sep;
				if(this.rem.minutes < 10) str1 += "0";
				return str1 + this.rem.minutes;
			}
			var str2 = this.rem.minutes + sep;
			if(this.rem.seconds < 10) str2 += "0";
			return str2 + this.rem.seconds;
		}
		if(this.rem.days > 0) {
			str += this.rem.days + mt.js.Timer.TIMES.charAt(0) + " ";
			force = true;
			if(--prec == 0) return str;
		}
		if(force || this.rem.hours > 0) {
			str += this.rem.hours + mt.js.Timer.TIMES.charAt(1) + " ";
			force = true;
			if(--prec == 0) return str;
		}
		if(force || this.rem.minutes > 0) {
			if(force && this.rem.minutes < 10) str += "0";
			str += this.rem.minutes + mt.js.Timer.TIMES.charAt(2) + " ";
			force = true;
			if(--prec == 0) return str;
		}
		if(force && this.rem.seconds < 10) str += "0";
		str += this.rem.seconds + mt.js.Timer.TIMES.charAt(3) + " ";
		return str;
	}
	,update: function() {
		this.t += 1000;
		var remt = (this.end.getTime() - this.t) / 1000;
		var rt;
		if(remt < 0) rt = 0; else rt = remt;
		this.rem = { days : rt / 86400 | 0, hours : (rt / 3600 | 0) % 24, minutes : (rt / 60 | 0) % 60, seconds : rt % 60 | 0, time : remt};
		var et = this.end.getTime();
		var st = this.start.getTime();
		if(this.t >= et) this.progress = 1; else this.progress = (this.t - st) / (et - st);
		if(this.textDiv != null) {
			var div = window.document.getElementById(this.textDiv.id);
			if(div != null) div.innerHTML = this.buildText();
		}
		if(this.progressDiv != null) {
			var div1 = window.document.getElementById(this.progressDiv.id);
			if(div1 != null) {
				var w = this.progressDiv.width * this.progress | 0;
				div1.style.width = w + "px";
			}
		}
		if(remt <= 0) this.onReady();
		this.onUpdate();
	}
	,onReady: function() {
		if(this.rem.time < -2) {
			window.location = window.location;
			this.onReady = function() {
			};
		}
	}
	,onUpdate: function() {
	}
	,__class__: mt.js.Timer
};
mt.js.Twinoid = function() { };
$hxClasses["mt.js.Twinoid"] = mt.js.Twinoid;
mt.js.Twinoid.__name__ = ["mt","js","Twinoid"];
mt.js.Twinoid.call = function(method,args,callb) {
	if(mt.js.Twinoid.boot != null) {
		var m = Reflect.field(mt.js.Twinoid.boot,method);
		if(m == null) throw "No such method '" + method + "'";
		var r = m.apply(mt.js.Twinoid.boot,args);
		if(callb != null) callb(r);
		return;
	}
	var calls;
	try {
		calls = window._tid_calls;
	} catch( e ) {
		calls = null;
	}
	if(calls == null) {
		var t = new haxe.Timer(100);
		t.run = function() {
			var tid = null;
			try {
				tid = _tid;
			} catch( e1 ) {
			}
			if(tid == null || !tid.isReady) return;
			mt.js.Twinoid.boot = tid;
			t.stop();
			var _g = 0;
			while(_g < calls.length) {
				var c = calls[_g];
				++_g;
				mt.js.Twinoid.call(c.m,c.a,c.c);
			}
			window._tid_calls = null;
		};
		calls = window._tid_calls = [];
	}
	calls.push({ m : method, a : args, c : callb});
};
mt.js.Twinoid.isConnected = function(proc) {
	mt.js.Twinoid.call("isConnected",[proc]);
};
mt.js.Twinoid.onLoad = function() {
	mt.js.Twinoid.call("onLoad",[]);
};
mt.js.Twinoid.quickNotice = function(msg,error) {
	mt.js.Twinoid.call("quickNotice",[msg,error]);
};
mt.js.Twinoid.notice = function(msg,error) {
	mt.js.Twinoid.call("notice",[msg,error]);
};
mt.js.Twinoid.lockBar = function() {
	mt.js.Twinoid.call("lockBar",[]);
};
mt.js.Twinoid.point = function(e,html) {
	mt.js.Twinoid.call("point",[e,html]);
};
mt.js.Twinoid.hidePointer = function() {
	mt.js.Twinoid.call("hidePointer",[]);
};
mt.js.Twinoid.onCssReady = function(cb) {
	mt.js.Twinoid.call("isCssReady",[],function(b) {
		if(b) cb(); else haxe.Timer.delay((function(f,cb1) {
			return function() {
				return f(cb1);
			};
		})(mt.js.Twinoid.onCssReady,cb),100);
	});
};
mt.js.Twinoid.popImage = function(url,title) {
	mt.js.Twinoid.call("popImage",[url,title]);
};
mt.js.Twinoid.wallAutoShareUrl = function(url) {
	mt.js.Twinoid.call("wallAutoShareUrl",[url]);
};
mt.js.Twinoid.askCashFrame = function(params,onClose) {
	mt.js.Twinoid.call("askCashFrame",[params,onClose]);
};
mt.js.Twinoid.addLoadListener = function(callb) {
	mt.js.Twinoid.call("addLoadListener",[callb]);
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
var q = window.jQuery;
js.JQuery = q;
q.fn.iterator = function() {
	return { pos : 0, j : this, hasNext : function() {
		return this.pos < this.j.length;
	}, next : function() {
		return $(this.j[this.pos++]);
	}};
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};