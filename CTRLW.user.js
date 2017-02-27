// ==UserScript==
// @name        CTRL+W
// @namespace   Mush
// @license     MIT License (Expat)
// @include     http://mush.vg/*
// @include     http://mush.twinoid.com/*
// @include     http://mush.twinoid.es/*
// @connect     ctrl-w.badconker.fr
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       unsafeWindow
// @require     lib/jquery-1.11.1.min.js
// @require     lib/Gettext.js
// @resource    css:jgrowl lib/jquery.jgrowl.css
// @resource    jgrowl lib/jquery.jgrowl.js
// @resource    mush lib/Mush.js
// @resource    translation:fr translations/fr/LC_MESSAGES/ctrl-w.po
// @resource    translation:en translations/en/LC_MESSAGES/ctrl-w.po
// @resource    translation:es translations/es/LC_MESSAGES/ctrl-w.po
// @version     0.36.9
// ==/UserScript==

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
Main.k.servurl = "http://ctrl-w.badconker.fr";
Main.k.window = window;
Main.k.domain = document.domain;
Main.k.mushurl = 'http://' + document.domain;
Main.k.debug = false;
Main.k.errorList = [];
if(Main.k.debug){
	var console = unsafeWindow.console;
}else{
	var console = {};
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}


String.prototype.htmlEncode = function() {
	return $('<div/>').text(this).html();
};
String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) {
		return a.toUpperCase();
	});
};
String.prototype.replaceFromObj = function(obj) {
  var retStr = this;
  for (var x in obj) {
	if(obj.hasOwnProperty(x)){
		retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
	}
  }
  return retStr;
};
String.prototype.hashCode = function() {
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};
RegExp.escape = function(s) {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
function addFctToPage (text, name) {
	var D                                   = document;
	var scriptNode                          = D.createElement ('script');
	scriptNode.type                         = "text/javascript";
	if (text)       scriptNode.textContent  = text;
	if (name)		scriptNode.textContent  = name + ' = ' + text;

	var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
	targ.appendChild (scriptNode);
}
Main.k.initData = function() {
	// Define if we are ingame
	Main.k.playing = Main.heroes.iterator().hasNext();

	Main.k.BMAXWIDTH = 1160;
	//this variable can be modified during script execution
	Main.k.HEROES =   ["jin_su", "frieda", "kuan_ti", "janice", "roland", "hua", "paola", "chao", "finola", "stephen", "ian", "chun", "raluca", "gioele", "eleesha", "terrence", "andie", "derek"];
	Main.k.HEROES_ALL = Main.k.HEROES.slice();
	Main.k.COMMANDERS = ["jin_su", "chao", "gioele", "stephen", "frieda", "kuan_ti", "hua", "derek", "roland", "raluca", "finola", "paola", "terrence", "eleesha", "andie", "ian", "janice", "chun"];
	Main.k.COMMS = ["paola", "eleesha", "andie", "stephen", "janice", "roland", "hua", "derek", "jin_su", "kuan_ti", "gioele", "chun", "ian", "finola", "terrence", "frieda", "chao", "raluca"];
	Main.k.ADMINS =   ["janice", "terrence", "eleesha", "raluca", "finola", "andie", "frieda", "ian", "stephen", "paola", "jin_su", "hua", "kuan_ti", "gioele", "chun", "roland", "chao", "derek"];

	Main.k.HEROES_REPLACE = {
		finola:'andie',
		chao:'derek'
	};
	Main.k.h = {
		mush:{
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:mush")
		},
		jin_su:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Commandant suprême du Daedalus."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:jin_su"),
			dev_surname_long:'kim_jin_su'
		},
		frieda:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Scientifique millénaire."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:frieda"),
			dev_surname_long:'frieda_bergmann'
		},
		kuan_ti:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Grand architecte du Daedalus."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:kuan_ti"),
			dev_surname_long:'lai_kuan_ti'
		},
		janice:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Psychologue Digitale aux atouts certains."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:janice"),
			dev_surname_long:'janice_kent'
		},
		roland:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Humoriste pilote de chasse à ses heures."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:roland"),
			dev_surname_long:'roland_zuccali'
		},
		hua:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Exploratrice de l'EXTRÊME."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:hua"),
			dev_surname_long:'jiang_hua'
		},
		paola:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Officier principal des Communications du Daedalus."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:paola"),
			dev_surname_long:'paola_rinaldo'
		},
		chao:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Chef de la sécurité du Daedalus."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:chao"),
			dev_surname_long:'wang_chao'
		},
		finola:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Biologiste de renommée internationale, pionnière dans l'étude du Mush."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:finola"),
			dev_surname_long:'finola_keegan'
		},
		stephen:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Cuisinier le plus dangereux de la galaxie."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:stephen"),
			dev_surname_long:'stephen_seagull'
		},
		ian:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Chercheur frugivore flexible."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:ian"),
			dev_surname_long:'ian_soulton'
		},
		chun:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Dernier espoir de l'Humanité."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:chun"),
			dev_surname_long:'zhong_chun'
		},
		raluca:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Génie de la physique quantique félinophile."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:raluca"),
			dev_surname_long:'raluca_tomescu'
		},
		gioele:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Armateur philantrophobe."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:gioele"),
			dev_surname_long:'gioele_rinaldo'
		},
		eleesha:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Investigatrice déchue de premier plan."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:eleesha"),
			dev_surname_long:'eleesha_williams'
		},
		terrence:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Technophile motorisé."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:terrence"),
			dev_surname_long:'terrence_archer'
		},
		andie:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Fayot de la fédération."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:andie"),
			dev_surname_long:'andie_graham'
		},
		derek:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Héros malgré lui."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:derek"),
			dev_surname_long:'derek_hogan'
		}

	};
	$.each(Main.k.h,function(k,h){
		var $this = $(this)[0];
		if(typeof($this.dev_surname_long) != 'undefined'){
			$this.name = $this.dev_surname_long.replace("_", " ").capitalize();
		}
	});

	Main.k.cssToHeroes = [];
	Main.k.cssToHeroes["-1056px"] = "roland";
	Main.k.cssToHeroes["-1185px"] = "janice";
	Main.k.cssToHeroes["-1233px"] = "ian";
	Main.k.cssToHeroes["-1282px"] = "chao";
	Main.k.cssToHeroes["-1335px"] = "eleesha";
	Main.k.cssToHeroes["-1391px"] = "raluca";
	Main.k.cssToHeroes["-1444px"] = "terrence";
	Main.k.cssToHeroes["-1499px"] = "jin_su";
	Main.k.cssToHeroes["-1554px"] = "hua";
	Main.k.cssToHeroes["-1604px"] = "jin_su";
	Main.k.cssToHeroes["-1681px"] = "stephen";
	Main.k.cssToHeroes["-1728px"] = "paola";
	Main.k.cssToHeroes["-1875px"] = "kuan_ti";
	Main.k.cssToHeroes["-1921px"] = "finola";
	Main.k.cssToHeroes["-1970px"] = "gioele";
	Main.k.cssToHeroes["-2017px"] = "chun";
	Main.k.cssToHeroes["-2063px"] = "frieda";

	Main.k.compActiveMush = [];

	Main.k.compInactiveMush = [];
	Main.k.compInactiveMush["cold_blood"] = true;
	Main.k.compInactiveMush["opportunist"] = true;
	Main.k.compInactiveMush["optimistic"] = true;
	Main.k.compInactiveMush["mycologist"] = true;
	Main.k.compInactiveMush["panic"] = true;
	Main.k.compInactiveMush["caffeinomaniac"] = true;
	Main.k.compInactiveMush["frugivore"] = true;

	Main.k.researchGlory = [];
	Main.k.researchGlory["drug_dispenser"] = 0;//
	Main.k.researchGlory["healing_ointmant"] = 0;//
	Main.k.researchGlory["natamy_gun"] = 0;//
	Main.k.researchGlory["ncc_lens"] = 0;//
	Main.k.researchGlory["spore_extractor"] = 0;//
	Main.k.researchGlory["steroids"] = 0;//
	Main.k.researchGlory["tesla_sup2x"] = 0;//
	Main.k.researchGlory["antispore_gaz"] = 3;//
	Main.k.researchGlory["constipaspore_serum"] = 3;//
	Main.k.researchGlory["fungus_scrambler"] = 3;//
	Main.k.researchGlory["infinite_water"] = 3;//
	Main.k.researchGlory["mushicide_soap"] = 3;
	Main.k.researchGlory["mushophage_bacteria"] = 3;//
	Main.k.researchGlory["myco_alarm"] = 3;//
	Main.k.researchGlory["mycoscan"] = 3;//
	Main.k.researchGlory["patuline_scrambler"] = 3;//
	Main.k.researchGlory["pheromodem"] = 3;//
	Main.k.researchGlory["mush_breeding_system"] = 6;//
	Main.k.researchGlory["mush_breeds"] = 6;//
	Main.k.researchGlory["myco_dialect"] = 6;//
	Main.k.researchGlory["mush_predator"] = 6;//
	Main.k.researchGlory["anti_mush_serum"] = 16;//

	Main.k.statusImages = [];
	Main.k.statusImages['bronze'] = 'http://imgup.motion-twin.com/twinoid/6/b/8b8ae4d5_4030.jpg';
	Main.k.statusImages['silver'] = 'http://imgup.motion-twin.com/twinoid/a/e/3c341777_4030.jpg';
	Main.k.statusImages['gold'] = 'http://imgup.motion-twin.com/twinoid/c/1/4e43e15c_4030.jpg';

	Main.k.statuses = {
		'inactive': {
			/* Translators: This translation must be copied from the game. */
			'desc' : Main.k.text.gettext('Vous ne vous êtes pas connecté depuis 24h. Bonne chance pour la suite...'),
			'img' : 'sleepy',
			/* Translators: This translation must be copied from the game. */
			'name' : Main.k.text.gettext('Inactif')
		},
		'hinactive': {
			/* Translators: This translation must be copied from the game. */
			'desc' : Main.k.text.gettext('Description grand inactif'),
			'img' : 'noob',
			/* Translators: This translation must be copied from the game. */
			'name' : Main.k.text.gettext('Grand inactif')
		},
		'mush': {
			/* Translators: This translation must be copied from the game. */
			'desc' : Main.k.text.gettext('Vous faites partie du Mush.'),
			'img' : 'mush',
			/* Translators: This translation must be copied from the game. */
			'name' : Main.k.text.gettext('Mush')
		}
	};
};
Main.k.initLang = function() {
	// Language detection
	switch(Main.k.domain) {
		case "mush.twinoid.com":
			Main.k.lang = "en";
			break;
		case "mush.twinoid.es":
			Main.k.lang = "es";
			break;
		default:
			Main.k.lang = "fr";
	}
	/*Main.k.text = new Gettext({
		domain: "ctrl-w"
	});*/
	/*for (var id in Main.k.text) {
		if (typeof(Main.k.text[id]) == "function") {
			console.log('export Main.k.text.'+id)
			exportFunction(Main.k.text[id], unsafeWindow.Main.k.text, {defineAs: id});
		}
	}*/
	Main.k.textInit = exportFunction(function(){Main.k.text = new Gettext({
		domain: "ctrl-w"
	});}, unsafeWindow);
	//console.warn(Main.k.text);
	Main.k.textInit();
	//unsafeWindow.Main.k.text = cloneInto(Main.k.text,unsafeWindow,{cloneFunctions:true});
	//console.warn(Main.k.text);
	try {
		var translationDataText = GM_getResourceText("translation:"+Main.k.lang);
		if(typeof translationDataText == 'undefined') {
			console.warn("No translations for '"+Main.k.lang+"'");
			return;
		}
		var translationData = Main.k.text.parse_po(translationDataText);
		Main.k.text.parse_locale_data({"ctrl-w": translationData}); // ctrl-w is the domain.
	} catch(err) { // GM_getResourceText throws errors if things don't exist
		console.error("Error getting translation data:", err);
	}
};
Main.k.init = function(){

	Main.k.initLang();
	Main.k.Options.init();
	Main.k.Game.init();
	Main.k.initData();
	Main.k.displayMainMenu();
	//Integration with others scripts
	$( window ).load(function() {

		//For scripts which use load event
		$('img[data-async_src]').each(function(){
			$(this).attr('src',$(this).attr('data-async_src'));
			$(this).removeAttr('data-async_src');
		});

	});
};
Main.k.getFullName = function(dev_surname) {
	return dev_surname.replace(/_/g, " ").capitalize();
};
Main.k.getHeroBySurname = function(dev_surname) {
	console.info('Main.heroes',Main.heroes);
	var $it = Main.heroes.iterator();
	while ($it.hasNext()) {
		var hero = $it.next();
		console.log(dev_surname,hero.dev_surname);
		if (hero.dev_surname == dev_surname) return hero;
	}
	return null;
};
Main.k.MakeButton = function(content, href, onclick, tiptitle, tipdesc) {
	var but = $("<div>").addClass("action but");
	var butbr = $("<div>").addClass("butright").appendTo(but);
	var butbg = $("<div>").addClass("butbg").appendTo(butbr);

	var buta = $("<a>").attr("href", href ? href : "#").html(content).appendTo(butbg)
	.on("click", onclick ? onclick : href ? null : function() { return false; });

	/* Translators: domain name*/
	if(href !=null && href.indexOf(Main.k.text.gettext('mush.vg'))){
		buta.attr('target','_blank');
	}

	if (tiptitle || tipdesc) {
		if (tiptitle) buta.attr("_title", tiptitle);
		if (tipdesc) buta.attr("_desc", tipdesc);
		buta.on("mouseover", Main.k.CustomTip);
		buta.on("mouseout", Main.k.hideTip);
	}

	return but;
};
Main.k.clearCache = function(){
	Main.k.showLoading();
	Main.k.Game.clear();
	localStorage.removeItem('ctrlw_update_cache');
	localStorage.removeItem('ctrlw_remaining_cycles');
	window.location.reload();
};
Main.k.countdownTimer = {};
Main.k.countdownTimer.counters = {};
Main.k.countdownTimer.go = function(seconds, id, callback){
	var count = seconds;
	var $this = this;
	this.counters[id] = setInterval(function(){
		count--;
		callback(count);
		if(count <= 0){
			clearInterval($this.counters[id]);
		}
	}, 1000); //1000 will  run it every 1 second
};

Main.k.countdownTimer.stop = function (id){
	if(typeof(this.counters[id]) != "undefined"){
		clearInterval(this.counters[id]);
	}
};
// BUG
Main.k.treatingBug = function(e){
	Main.k.errorList += e;
};
Main.k.displayBug = function(e){
	var displayBug = "";
	var error = [];
	if(Main.k.errorList != undefined){
		error = Main.k.errorList;
	}

	for(var idBug = 0;idBug < error.length;idBug++){
		displayBug += "Name : "+error[idBug].name+"Message : "+error[idBug].message+"\n";
	}
	if(error.length > 0) {alert("nbError : "+error.length+"\n\n"+displayBug);}
};
Main.k.showLoading = function(){
	if($('.ctrlw_overlay_loading').length == 0){
		var overlay = $('<div class="ctrlw_overlay_loading"></div>');
		$('body').append(overlay);
		overlay.after('<div class="ctrlw_loading_ball_wrapper"><div class="ctrlw_loading_ball"></div><div class="ctrlw_loading_ball1"></div></div>');

	}
};
Main.k.hideLoading = function(){
	$('.ctrlw_overlay_loading,.ctrlw_loading_ball_wrapper').remove();
};
// ************ NEW: CASTING SUBMENU ************
Main.k.displayMainMenu = function() {
	Main.k.css.customMenu();

	// Fix position
	var fix = $("ul.mtabs").length > 0 ? 70 : 20;
	$("#maincontainer, .boxcontainer").css("margin", fix + "px auto 0");

	Main.k.ownHero = ($(".hero h1.who").length > 0 ) ? $(".who").html().toLowerCase().trim().replace(/(\s)/g, "_") : false;
	Main.k.silver = true; //TODO
	Main.k.fds = ($("a.butmini[href='/fds']").length > 0);
	var menu = $("<ul>").addClass("kmenu").insertBefore("#maincontainer, .boxcontainer");
	var play = $("<li class='kmenuel active first'><a href='"+Main.k.mushurl+"/chooseHero'>"+Main.k.text.gettext("Jouer")+"</a></li>").appendTo(menu);
	var account = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/me'>"+Main.k.text.gettext("Mon compte")+"</a></li>").appendTo(menu);

	if(Main.k.text.gettext("ForumCastingsId") != "ForumCastingsId") {
		var casting = $("<li class='kmenuel' id='ctrlw-main-menu-castings'><a href='"+Main.k.mushurl+"/group/list'>"+Main.k.text.gettext("Castings")+"</a></li>").appendTo(menu);

	}
	var rankings = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/ranking'>"+Main.k.text.gettext("Classements")+"</a></li>").appendTo(menu);
	var forum = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/tid/forum'>"+Main.k.text.gettext("Forum")+"</a></li>").appendTo(menu);
	var help = $("<li class='kmenuel last'><a href='"+Main.k.mushurl+"/help'>"+Main.k.text.gettext("Aide")+"</a></li>").appendTo(menu);

	var play_ss = $("<ul>").appendTo(play);

	var account_ss = $("<ul>").attr("id", "accountmenu").appendTo(account);
	$("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/me'><img src='/img/icons/skills/persistent.png' />"+Main.k.text.gettext("Expérience")+"</a></li>").appendTo(account_ss);
	$("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/me?profile'><img src='/img/icons/skills/opportunist.png' />"+Main.k.text.gettext("Ma fiche")+"</a></li>").appendTo(account_ss);
	$("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/me?config'><img src='/img/icons/skills/engineer.png' />"+Main.k.text.gettext("Mes réglages")+"</a></li>").appendTo(account_ss);
	$("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/me?news'><img src='/img/icons/skills/radio_expert.png' />"+Main.k.text.gettext("News")+"</a></li>").appendTo(account_ss);

	var rankings_ss = $("<ul>").appendTo(rankings);
	$("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/ranking'><img src='/img/icons/skills/persistent.png' />"+Main.k.text.gettext("Classements")+"</a></li>").appendTo(rankings_ss);
	$("<li><a class='kssmenuel ext' href='http://twinorank.kubegb.fr/jeux/Mush' target='_blank'><img src='/img/icons/skills/persistent.png' />Twin-O-Rank</a></li>").appendTo(rankings_ss);

	var forum_ss = $("<ul>").appendTo(forum);
	if(Main.k.text.gettext("ForumDiscussionId") != "ForumDiscussionId") {
		/* Translators: Forum Discussion id */
		$("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumDiscussionId")+
		/* Translators: Forum Discussion label */
		"'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Discussion")+"</a></li>").appendTo(forum_ss);
	}
	if(Main.k.text.gettext("ForumAdviceId") != "ForumAdviceId") {
		/* Translators: Forum Advice id */
		$("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumAdviceId")+
		/* Translators: Forum Advice label */
		"'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Entraide")+"</a></li>").appendTo(forum_ss);
	}
	if(Main.k.text.gettext("ForumLoungeId") != "ForumLoungeId") {
		/* Translators: Forum Lounge id */
		$("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumLoungeId")+
		/* Translators: Forum Lounge label */
		"'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Détente")+"</a></li>").appendTo(forum_ss);
	}
	if(Main.k.text.gettext("ForumCastingsId") != "ForumCastingsId") {
		/* Translators: Forum Castings id */
		$("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumCastingsId")+
		/* Translators: Forum Castings label */
		"'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Castings")+"</a></li>").appendTo(forum_ss);
	}
	if(Main.k.text.gettext("ForumOfficersId") != "ForumOfficersId") {
		/* Translators: Forum Officers id */
		$("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumOfficersId")+"'><img src='/img/icons/skills/rebel.png' />"+Main.k.text.gettext("Officiers")+"</a></li>").appendTo(forum_ss);
	}

	var help_ss = $("<ul>").appendTo(help);
	$("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/help'><img src='/img/icons/skills/genius.png' />"+Main.k.text.gettext("Aide Mush")+"</a></li>").appendTo(help_ss);
	$("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/patchlog'><img src='/img/icons/skills/persistent.png' />"+Main.k.text.gettext("Patchlog")+"</a></li>").appendTo(help_ss);

	if (Main.k.ownHero && typeof(Main.k.h[Main.k.ownHero]) != 'undefined') {
		var charname = Main.k.ownHero.replace("_", "");
		$("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumAdviceId")+"|thread/" + Main.k.h[Main.k.ownHero].tutorial + "'><img src='/img/icons/ui/" + charname + ".png' />" + Main.k.text.strargs(Main.k.text.gettext("Tuto %1"), [Main.k.ownHero.capitalize()]) + "</a></li>").appendTo(help_ss);
	}
	/* Translators: Wiki url */
	$("<li><a class='kssmenuel ext' target='_blank' href='"+Main.k.text.gettext("http://www.twinpedia.com/mush")+
	/* Translators: Wiki favicon url */
	"'><img data-async_src='"+Main.k.text.gettext("http://www.twinpedia.com/_media/favicon.ico")+"' />"+Main.k.text.gettext("Twinpedia")+"</a></li>").appendTo(help_ss);
	$("<li><a class='kssmenuel ext' href='http://pictoid.badconker.fr/"+encodeURIComponent(Main.k.lang)+"/game/"+encodeURIComponent(Main.k.text.gettext("mush_game_id"))+"' target='_blank'><img data-async_src='http://pictoid.badconker.fr/favicon.ico' />Pictoid</a></li>").appendTo(help_ss);

	if (Main.k.fds) {
		$("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumFDSId")+"'><img src='/img/icons/skills/juge.png' />"+Main.k.text.gettext("Magistrature")+"</a></li>").appendTo(forum_ss);

		$("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/fds'><img src='/img/icons/skills/juge.png' />FDS</a></li>").appendTo(play_ss);
	}
	Main.k.updateMainMenu();
};
Main.k.updateMainMenu = function (){
	var casting = $('#ctrlw-main-menu-castings');

	// ************ CASTING SUBMENU ************
	var casting_ss = casting.find(' > ul');
	if(casting_ss.length > 0){
		casting_ss.remove();
	}
	casting_ss = $("<ul>").appendTo(casting);

	var castings = Main.k.Game.data.castings;

	if(!$.isEmptyObject(castings)) {	// Check having casting
		var casting_menu, cast_ss;
		$.each(castings,function(id, casting){
			casting_menu = $("<li></li>")
				.appendTo(casting_ss);

			var a = $("<a class='kssmenuel' href='"+Main.k.mushurl+"/group/"+casting.id+"'><img src='"+casting.icon+"' />"+casting.short_name+"</a>")
				.appendTo(casting_menu);

			if(casting.long_name != casting.short_name){
				a
					.attr("_title", Main.k.text.gettext("Nom complet"))
					.attr("_desc", "<strong>"+casting.long_name+"</strong>")
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip)
			}

			cast_ss = $("<ul>").appendTo(casting_menu);
			$("<li><a href='"+Main.k.mushurl+"/group/page/"+casting.id+"'><img src='" + Main.k.mushurl + "/img/icons/skills/conceptor.png' />"+Main.k.text.gettext("Mémoire")+"</a></li>").appendTo(cast_ss); // Pages
			$("<li><a href='"+Main.k.mushurl+"/group/nexus/"+casting.id+"'><img src='" + Main.k.mushurl + "/img/icons/skills/logistics.png' />"+Main.k.text.gettext("Nexus")+"</a></li>").appendTo(cast_ss); // Nexus
			$("<li><a href='"+Main.k.mushurl+"/group/forum/"+casting.id+"'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Forum")+"</a></li>").appendTo(cast_ss); // Forum
			$("<li><a href='"+Main.k.mushurl+"/group/members/"+casting.id+"'><img src='" + Main.k.mushurl + "/img/icons/skills/optimistic.png' />"+Main.k.text.gettext("Membres")+"</a></li>").appendTo(cast_ss); // Members
			$("<li><a href='"+Main.k.mushurl+"/group/history/"+casting.id+"'><img src='" + Main.k.mushurl + "/img/icons/skills/hunt.png' />"+Main.k.text.gettext("Historique")+"</a></li>").appendTo(cast_ss); // History
		});
		$("<li style='height:2px'>&nbsp</li>").appendTo(casting_ss);
	}
	$("<li><a href='http://mtrg.kubegb.fr/' class='kssmenuel ext' title='Mush Triumph Remap Generator'><img src='"+Main.k.mushurl+"/img/icons/ui/triumph.png' />MTRG</a></li>").appendTo(casting_ss); // Mush Triumph Remap Generator
	// ************ NEW: CASTING SUBMENU ************
};
Main.k.CreateNeronAlert = function(message){
		var neronAlert = Main.k.CreatePopup();
		neronAlert.content.css({
			"height": "auto",
			"max-height": "90%",
			"width": "500px",
			"color": "#FFF"
		});

		var content = "<img class=\"img_neron\" alt='neron' src='/img/design/neron_chat.png' /><p>"+ message +"</p>";
		// Fill neronAlert content
		var cancelAc = "'Main.k.ClosePopup();'";
		var ok = "<div id=\"cancel\" class=\"but updatesbtn\" onclick=" + cancelAc + "><div class=\"butright\"><div class=\"butbg\"><a href=\"#\">" + Main.k.text.gettext("ok") + "</a></div></div></div></div>";
		var buttons = $('<div class="neron_alert_buttons"></div>');
		buttons.append(ok);
		$('<div>')
			.attr("id","neron_alert_content")
			.append(content)
			.append(buttons)
			.appendTo(neronAlert.content);

		// Display neronAlert
		Main.k.OpenPopup(neronAlert.dom);
};
Main.k.CreateNeronPrompt = function(){
		var NeronPrompt = Main.k.CreatePopup();
		NeronPrompt.content.css({
			"height": "auto",
			"max-height": "90%",
			"width": "500px",
			"color": "#FFF"
		});

		var cancelAc = "'Main.k.ClosePopup();'";
		// Fill prompt content
		var validate = "<div id=\"validate\" class=\"but updatesbtn\" ><div class=\"butright\"><div class=\"butbg\"><a href=\"#\">" + Main.k.text.gettext("valider") + "</a></div></div></div></div>";
		var cancel = "<div id=\"cancel\" class=\"but updatesbtn\" onclick="+cancelAc+"><div class=\"butright\"><div class=\"butbg\"><a href=\"#\">" + Main.k.text.gettext("annuler") + "</a></div></div></div></div>";
		var input = "<input type='text' name='neron_prompt'>";
		var content = "<img class=\"img_neron\" alt='neron' src='/img/design/neron_chat.png' /><p>" + Main.k.text.gettext("Saisissez le titre du message") + " : </p>";


		$("<div>")
		.attr("id","neron_alert_content")
		.html(content + input + "<br/>" + validate + cancel)
		.appendTo(NeronPrompt.content);

		// Display prompt
		Main.k.OpenPopup(NeronPrompt.dom);
};

Main.k.quickNotice = function(msg,type){
	if(typeof(type) == 'undefined' || type == 'info'){
		$.jGrowl("<img src='http://imgup.motion-twin.com/twinoid/8/5/ab7aced9_4030.jpg' height='16' alt='notice'/> "+msg);
	}else if(type == 'error'){
		$.jGrowl("<img src='http://imgup.motion-twin.com/twinoid/9/a/8429c028_4030.jpg' height='16' alt='notice'/> "+msg,{
			theme:'ctrlw-error',
			life: 6000
		});
	}
};
Main.k.quickNoticeError = function(msg){
	Main.k.quickNotice(msg,'error');
};
Main.k.CreatePopup = function() {
	var popup = {};

	popup.dom = $("<td>").attr("id", "usPopup").addClass("usPopup chat_box");
	popup.mask = $("<div>").addClass("usPopupMask").attr('onclick','Main.k.ClosePopup();').appendTo(popup.dom);
	popup.content = $("<div>").addClass("usPopupContent chattext").css({
		"width": (Main.k.window.innerWidth - 300) + "px",
		"height": (Main.k.window.innerHeight - 100) + "px"
	}).appendTo(popup.dom);

	return popup;
};
Main.k.OpenPopup = function(popup) { $("body").append(popup); };
Main.k.ClosePopup = function() {
	var popup = $("#usPopup");
	if (!popup.get()) return;

	popup.remove();
	var tgt = $("#formattingpopuptgt");
	if (tgt.get()) {
		tgt.focus();
		tgt.attr("id", "");
	}
};
exportFunction(Main.k.ClosePopup, unsafeWindow.Main.k, {defineAs: "ClosePopup"});
Main.k.SyncAstropad = function(tgt){
	if(typeof(Main.AstroPad) != 'undefined'){
		Main.AstroPad.updateInventory(false, Main.k.SyncAstropadNotice);
	}else{
		var $astro_maj_inventaire = $('#astro_maj_inventaire');
		if($astro_maj_inventaire.length > 0){
			$astro_maj_inventaire[0].click();
			Main.k.SyncAstropadNotice();
		}
	}
};
Main.k.SyncAstropadNotice = function(){
	Main.k.quickNotice(Main.k.text.gettext("Astropad synchronisé."));
};
exportFunction(Main.k.SyncAstropadNotice, unsafeWindow.Main.k, { defineAs: 'SyncAstropadNotice' });


Main.k.CustomTip = function(e) {
	var tgt = (e || event).target;
	var title = tgt.getAttribute("_title");
	var desc = tgt.getAttribute("_desc");
	if (desc) desc = desc.replace(/(\\r|\\n)/g, "");
	var max = 3, current = 0, t = tgt;
	while (!title && !desc && current<max) {
		t = t.parentNode;
		title = t.getAttribute("_title");
		desc = t.getAttribute("_desc");
		if (desc) desc = desc.replace(/(\\r|\\n)/g, "");
		current++;
	}

	Main.showTip(tgt,
		"<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'>" +
		(title ? "<h1>" + title + "</h1>" : "") +
		(desc ? "<p>" + desc.replace("\n", "") + "</p>" : "") +
		"</div></div></div></div>"
	);
};
Main.k.hideTip = function(){
	Main.hideTip();
};
//TODO make an Utils object

/**
 *
 * @param arr
 * @param o
 * @returns {boolean}
 */
Main.k.ArrayContains = function(arr, o) {
	for (var a in arr) {
		if (a == o) return true;
	}
	for (var i=0; i<arr.length; i++) {
		if (arr[i] == o) return true;
	}
	return false;
};

Main.k.EliminateDuplicates = function(arr) {
	var i, len=arr.length, out=[], obj={};
	for (i=0;i<len;i++) obj[arr[i]]=0;
	for (i in obj){
		if (obj.hasOwnProperty(i)) {
			out.push(i);
		}
	}
	return out;
};

/**
 * @param {object} topic
 * @return string
 */
Main.k.GetHeroNameFromTopic = function(topic) {
	var hero = '';
	var div = null;

	// First tries to get the character-specific css class name
	if (topic.find(".char,.tid_char").length >0) {
		div = topic.find(".char,.tid_char");
		hero = div.attr('class').replace("char ", "").replace("tid_char tid_", "");
	}

	// If it failed, compare the image position with custom outfits
	if (div != null && hero == '') {
		var sp = div.css('backgroundPosition').split(" ");
		var pos_y = sp[1];

		if(pos_y in Main.k.cssToHeroes){
			hero = Main.k.cssToHeroes[pos_y];
		}else{
			var storage = sessionStorage.getItem('ctrlw_css_outfit' + pos_y);
			if(storage == null){
				GM_xmlhttpRequest({
					method: 'POST',
					url: Main.k.servurl + "/misc/css-outfit",
					data: $.param({
						css: pos_y
					}),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				});
				sessionStorage.setItem('ctrlw_css_outfit' + pos_y,1);
			}
		}
	}
	return hero;
};

Main.k.InvertObject = function(obj){
	var new_obj = {};
	for (var prop in obj) {
		if(obj.hasOwnProperty(prop)) {
			new_obj[obj[prop]] = prop;
		}
	}
	return new_obj;
};


Main.k.css = {};
Main.k.css.bubbles = function() {
	var d = "3px";
	var custombubbles_glow = "text-shadow: 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF;";

	$("<style>").attr("type", "text/css").html("\
	.bubble_stephen {\
		background: url(" + Main.k.servurl + "/img/tile_stephen.png) center repeat #FFF! important;\
		border: 1px solid #b48d75;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_hua {\
		background: url(" + Main.k.servurl + "/img/tile_hua.png) center repeat #FFF! important;\
		border: 1px solid #6c543e;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_frieda {\
		background: url(" + Main.k.servurl + "/img/tile_frieda.png) center repeat #FFF! important;\
		border: 1px solid #204563;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_roland {\
		background: url(" + Main.k.servurl + "/img/tile_roland.png) center repeat #FFF! important;\
		border: 1px solid #dc3d8d;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_paola {\
		background: url(" + Main.k.servurl + "/img/tile_paola.png) center repeat #FFF! important;\
		border: 1px solid #792b70;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_jin_su {\
		background: url(" + Main.k.servurl + "/img/tile_jin_su.png) center repeat #FFF! important;\
		border: 1px solid #a41834;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_chao {\
		background: url(" + Main.k.servurl + "/img/tile_chao.png) center repeat #FFF! important;\
		border: 1px solid #5457b0;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_derek {\
		background: url(" + Main.k.servurl + "/img/tile_chao.png) center repeat #FFF! important;\
		border: 1px solid #5457b0;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_finola {\
		background: url(" + Main.k.servurl + "/img/tile_finola.png) center repeat #FFF! important;\
		border: 1px solid #35adbc;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_andie {\
		background: url(" + Main.k.servurl + "/img/tile_finola.png) center repeat #FFF! important;\
		border: 1px solid #35adbc;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_kuan_ti {\
		background: url(" + Main.k.servurl + "/img/tile_kuan_ti.png) center repeat #FFF! important;\
		border: 1px solid #e89413;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_ian {\
		background: url(" + Main.k.servurl + "/img/tile_ian.png) center repeat #FFF! important;\
		border: 1px solid #647c27;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_eleesha {\
		background: url(" + Main.k.servurl + "/img/tile_eleesha.png) center repeat #FFF! important;\
		border: 1px solid #dca312;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_terrence {\
		background: url(" + Main.k.servurl + "/img/tile_terrence.png) center repeat #FFF! important;\
		border: 1px solid #55141c;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_janice {\
		background: url(" + Main.k.servurl + "/img/tile_janice.png) center repeat #FFF! important;\
		border: 1px solid #df2b4e;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_raluca {\
		background: url(" + Main.k.servurl + "/img/tile_raluca.png) center repeat #FFF! important;\
		border: 1px solid #4c4e4c;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_chun {\
		background: url(" + Main.k.servurl + "/img/tile_chun.png) center repeat #FFF! important;\
		border: 1px solid #3aa669;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_gioele {\
		background: url(" + Main.k.servurl + "/img/tile_gioele.png) center repeat #FFF! important;\
		border: 1px solid #cb5b29;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.custombubbles_nobackground {\
		background: #FFF! important;\
	}\
	.bubble_stephen span.buddy, .colored_stephen { color: #b48d75! important; }\
	.bubble_hua span.buddy, .colored_hua { color: #6c543e! important; }\
	.bubble_frieda span.buddy, .colored_frieda { color: #204563! important; }\
	.bubble_roland span.buddy, .colored_roland { color: #dc3d8d! important; }\
	.bubble_paola span.buddy, .colored_paola { color: #792b70! important; }\
	.bubble_jin_su span.buddy, .colored_jin_su { color: #a41834! important; }\
	.bubble_chao span.buddy, .colored_chao { color: #5457b0! important; }\
	.bubble_derek span.buddy, .colored_derek { color: #5457b0! important; }\
	.bubble_finola span.buddy, .colored_finola { color: #35adbc! important; }\
	.bubble_andie span.buddy, .colored_andie { color: #35adbc! important; }\
	.bubble_kuan_ti span.buddy, .colored_kuan_ti { color: #e89413! important; }\
	.bubble_ian span.buddy, .colored_ian { color: #647c27! important; }\
	.bubble_eleesha span.buddy, .colored_eleesha { color: #dca312! important; }\
	.bubble_terrence span.buddy, .colored_terrence { color: #55141c! important; }\
	.bubble_janice span.buddy, .colored_janice { color: #df2b4e! important; }\
	.bubble_raluca span.buddy, .colored_raluca { color: #4c4e4c! important; }\
	.bubble_chun span.buddy, .colored_chun { color: #3aa669! important; }\
	.bubble_gioele span.buddy, .colored_gioele { color: #cb5b29! important; }\
	.bubble .replybuttons { text-shadow: none! important; }\
	.bubble ::-moz-selection {\
		text-shadow: none! important;\
		background: #38F;\
		color: #fff;\
	}\
	.bubble ::-webkit-selection {\
		text-shadow: none! important;\
		background: #38F;\
		color: #fff;\
	}\
	.bubble ::selection {\
		text-shadow: none! important;\
		background: #38F;\
		color: #fff;\
	}\
	.planet .analyse .buttons .share-planet.but{\
		width:20px;\
	}\
	").appendTo("head");
};
Main.k.css.customMenu = function() {
	$("<style>").attr("type", "text/css").html("\
	body.gold #maincontainer{margin-top:543px !important;}\
	#menuBar { display: none; }\
	.mxhead a[class^=logo] { position: relative! important; display: block; }\
	.mxhead {padding:0}\
	.kmenu {\
		margin: 10px auto 20px;\
		text-align: center;\
	}\
	.kmenuel {\
		position: relative;\
		display: inline-block;\
		border: 1px solid rgba(19,32,85,0.8);\
		border-left: none;\
		background: #003baf;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px -15px 15px -10px rgba(0,0,0,0.5);\
	}\
	.kmenuel a {\
		display: block;\
		width: 160px;\
		height: 24px;\
		padding: 4px 5px;\
		color: #DDD! important;\
		text-decoration: none! important;\
		text-shadow: 0 0 3px #000;\
	}\
	.kmenuel:hover a { color: #FFF! important; }\
	.kmenuel a:hover { color: rgb(255, 78, 100)! important; }\
	.kmenuel a:hover li {\
		color: #FFF! important;\
		text-shadow: 0 0 1px #000;\
	}\
	.kmenuel:hover {\
		border-color: rgb(19,32,85);\
		background: #0044bd;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px 5px 15px 0px rgba(0,0,0,0.4);\
	}\
	.kmenuel.first {\
		border-left: 1px solid rgba(19,32,85,0.8);\
		border-top-left-radius: 8px;\
		border-bottom-left-radius: 8px;\
	}\
	.kmenuel.last {\
		border-top-right-radius: 8px;\
		border-bottom-right-radius: 8px;\
	}\
	.kmenuel ul { display: none; }\
	.kmenuel ul a { display: block; width: auto; padding: 0px 5px }\
	.kmenuel:hover > ul {\
		display: block;\
		position: absolute;\
		width: 100%;\
		top: 33px;\
		left: 0;\
		text-align: right;\
		z-index: 9;\
		padding: 0;\
	}\
	.kmenuel ul li:hover ul {\
		display: block;\
		position: absolute;\
		width: 100%;\
		text-align: right;\
		z-index: 9;\
		padding: 0;\
	}\
	.kmenuel ul li {\
		text-align: left;\
		margin: 0 3px;\
		display: block! important;\
		border: 1px solid rgb(2,16,66);\
		border-top: none! important;\
		height: auto;\
		background: #0071e3;\
		color: #EEE;\
		text-shadow: 0 0 1px #000;\
		text-decoration: none! important;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px -8px 8px -5px rgba(0,0,0,0.3);\
	}\
	.kmenuel ul li:hover {\
		background: #0094ff;\
		text-shadow: 0 0 3px #000;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px 4px 8px 0px rgba(0,0,0,0.3);\
	}\
	.kmenuel ul li ul {\
		right: -160px;\
		top: 0px;\
	}\
	.kmenuel ul li img {\
		margin-right : 5px;\
		position: relative;\
		top: 2px;\
		height: 16px;\
	}\
	.kmenuel .kssmenuel{\
		display:block;\
		line-height: 22px;\
	}\
	").appendTo("head");
};
Main.k.css.ingame = function() {
	Main.k.css.bubbles();

	$("<style>").attr("type", "text/css").html("\
	.tid_editorContent {\
	  visibility: visible;\
	 }\
	.blink-limited {\
		-moz-animation: blink 1s 3 linear;\
		-webkit-animation: blink 1s 3 linear;\
	}\
	@-moz-keyframes blink {\
		from { opacity: 1; }\
		50% { opacity: 0; }\
		to { opacity: 1; }\
	}\
	@-webkit-keyframes blink {\
		from { opacity: 1; }\
		50% { opacity: 0; }\
		to { opacity: 1; }\
	}\
	.but.loading{\
		overflow:hidden;\
	}\
	.but.loading:before{\
		background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.1) 95%, rgba(255,255,255,0) 100%); /* FF3.6+ */\
		background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(50%,rgba(255,255,255,0.65)), color-stop(95%,rgba(255,255,255,0.1)), color-stop(100%,rgba(255,255,255,0))); /* Chrome,Safari4+ */\
		background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.1) 95%,rgba(255,255,255,0) 100%); /* Chrome10+,Safari5.1+ */\
		background: -o-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.1) 95%,rgba(255,255,255,0) 100%); /* Opera 11.10+ */\
		background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.1) 95%,rgba(255,255,255,0) 100%); /* W3C */\
		content: '';\
		height: 21px;\
		left: 0;\
		position: absolute;\
		width: 70px;\
		-moz-animation: loading-button 1s infinite linear;\
		-webkit-animation: loading-button 1s infinite linear;\
	}\
	@-moz-keyframes loading-button{\
		from { margin-left: -70px; }\
		to {margin-left: 100%; }\
	}\
	@-webkit-keyframes loading-button{\
		from { margin-left: -70px; }\
		to {margin-left: 100%; }\
	}\
	.ctrlw_overlay_loading{\
		background-color: #4E5162;\
		background-image: url('http://data.twinoid.com/img/design/mask.png');\
		height : 100%;\
		left : 0;\
		opacity:0.9;\
		position : fixed;\
		top : 0;\
		width : 100%;\
		z-index:1000;\
	}\
	.ctrlw_loading_ball_wrapper{\
		position:fixed;\
		left:50%;\
		top:50%;\
		z-index:1001;\
	}\
	.ctrlw_loading_ball {\
		background-color: rgba(0,0,0,0);\
		border: 5px solid rgba(0,183,229,0.9);\
		opacity: 1;\
		border-top: 5px solid rgba(0,0,0,0);\
		border-left: 5px solid rgba(0,0,0,0);\
		border-radius: 50px;\
		box-shadow: 0 0 35px #2187e7;\
		width: 50px;\
		height: 50px;\
		margin: 0 auto;\
		-moz-animation: spin .5s infinite linear;\
		-webkit-animation: spin .5s infinite linear;\
	}\
	.ctrlw_loading_ball1 {\
		background-color: rgba(0,0,0,0);\
		border: 5px solid rgba(0,183,229,0.9);\
		opacity: 1;\
		border-top: 5px solid rgba(0,0,0,0);\
		border-left: 5px solid rgba(0,0,0,0);\
		border-radius: 50px;\
		box-shadow: 0 0 15px #2187e7;\
		width: 30px;\
		height: 30px;\
		margin: 0 auto;\
		position: relative;\
		top: -50px;\
		-moz-animation: spinoff .5s infinite linear;\
		-webkit-animation: spinoff .5s infinite linear;\
	}\
	@-moz-keyframes spin {\
		0% {\
			-moz-transform: rotate(0deg);\
		}\
		100% {\
			-moz-transform: rotate(360deg);\
		};\
	}\
	@-moz-keyframes spinoff {\
		0% {\
			-moz-transform: rotate(0deg);\
		}\
	\
		100% {\
			-moz-transform: rotate(-360deg);\
		};\
	}\
	@-webkit-keyframes spin {\
		0% {\
			-webkit-transform: rotate(0deg);\
		}\
		100% {\
			-webkit-transform: rotate(360deg);\
		};\
	}\
	@-webkit-keyframes spinoff {\
		0% {\
			-webkit-transform: rotate(0deg);\
		}\
		100% {\
			-webkit-transform: rotate(-360deg);\
		};\
	}\
	.mxhead { height: 0; }\
	.cdReadMeHook { display: none! important; }\
	.tabon { background-image: url(" + Main.k.servurl + "/img/tabon.png)! important; }\
	.taboff { background-image: url(" + Main.k.servurl + "/img/taboff.png)! important; }\
	.taboff:hover { background-image: url(" + Main.k.servurl + "/img/tabon.png)! important; }\
	td.chat_box .right {\
		position: relative;\
		background: url(" + Main.k.servurl + "/img/chatbgtop.png) no-repeat scroll right top;\
	}\
	td.chat_box .right:before {\
		content: '';\
		display: block;\
		position: absolute;\
		top: 0; left: 0; right: 6px;\
		height: 5px;\
		background: rgb(194, 243, 252);\
	}\
	td.chat_box .chattext .bubble .talks .from { background-image: url(" + Main.k.servurl + "/img/chat_from_left.png)! important; }\
	.customtabs li { margin-right: 3px; margin-bottom: 0! important; }\
	html { overflow-x: auto; width: 100%; }\
	body { background-position: 50% -100px; overflow-x: hidden! important; min-width: " + Main.k.BMAXWIDTH + "px; width: 100%; }\
	ul.mtabs li { margin-right: 5px! important; }\
	.helpguide { display: none; }\
	#tid_bar_down { clear: both; }\
	#cdMainChat { position: relative; }\
	#cdTabsChat { margin: 0; top: -24px; }\
	#topinfo_bar { margin-top: 5px; }\
	#tooltip { z-index: 100! important; }\
	#floating_ui_start { position: absolute; top: 42px; left: 5px; z-index: 20; }\
	.mtabs a { color: #FFF! important; }\
	#char_col .sheetmain { position: relative; }\
	#char_col .statuses { margin: 0! important; top: 10px; left: 7px; }\
	#char_col .skills { margin: 0! important; top: 0px; left: 177px; }\
	span.highlight {\
		background: #FF6;\
		padding: 0 2px;\
		margin: 0 -2px;\
	}\
	.exploring {\
		top: -30px! important;\
		right: 15px! important;\
		width: 200px! important;\
		height: 24px! important;\
		z-index: 20;\
		overflow: hidden! important;\
	}\
	.exploring .exploring2 {\
		height: 22px! important;\
	}\
	.exploring:hover {\
		width: auto! important;\
		height: auto! important;\
	}\
	.exploring:hover .exploring2 {\
		height: auto! important;\
	}\
	a.butmini { \
		outline: none! important; \
		position: relative;\
	}\
	a.butmini:after { \
		display: block;\
		content: '';\
		position: absolute;\
		top: 0px; bottom: 0px; left: 0px; right: 0px;\
		border: 1px solid #1D2028;\
		z-index: 3;\
	}\
	.customreply { \
		right: -7px! important;\
		bottom: 2px! important;\
		text-align: right;\
	}\
	.customreply a { \
		opacity: 0.8;\
	}\
	.customreply a:hover { \
		opacity: 1;\
	}\
	.chatformatbtn { \
		float: right;\
		margin-right: 5px! important;\
		margin-top: 7px! important;\
		width: auto! important;\
	}\
	.chatformatbtn img { \
		vertical-align: middle! important;\
	}\
	.alertnbwrapper { \
		position: absolute;\
		top: 16px;\
		left: -3px;\
		height: 17px;\
		width: 22px;\
		text-align: center;\
		overflow: visible;\
		cursor: default;\
		z-index: 1;\
	}\
	.alertnbwrapper .alertnb { \
		position: relative;\
		display: inline-block;\
		background: url(/img/design/alarm_on_bg.gif) repeat-x bottom;\
		color: rgb(255, 78, 100);\
		padding: 0 0px;\
		font-size: 10px;\
		line-height: 16px;\
		height: 17px;\
		min-width: 10px;\
	}\
	.alertnbwrapper .alertnb:before { \
		content: '';\
		display: block;\
		position: absolute;\
		left: -4px;\
		top: 0px;\
		bottom: 0px;\
		width: 4px;\
		background: url(" + Main.k.servurl + "/img/alertleft.gif) bottom left;\
	}\
	.alertnbwrapper .alertnb:after { \
		content: '';\
		display: block;\
		position: absolute;\
		right: -4px;\
		top: 0px;\
		bottom: 0px;\
		width: 4px;\
		background: url(" + Main.k.servurl + "/img/alertright.gif) bottom right;\
	}\
	.usLeftbar { \
		position: relative;\
		float: left;\
		background-color: #17195B;\
		background: url('/img/design/bg_right.png') right repeat-y;\
		border-right: 1px solid rgba(0,0,0,0.1);\
		box-shadow: 1px 0 3px 1px rgba(0,0,0,0.2);\
		min-height: 725px;\
		margin-right: 15px;\
		padding: 8px 0;\
		width: 125px;\
	}\
	.usLeftbar:before { \
		display: block;\
		content: '';\
		position: absolute;\
		top: 0; bottom: 0; right: 113px;\
		width: 10000px;\
		background-color: #17195B;\
		z-index: -1;\
	}\
	.usLeftbar h3 { \
		clear: both;\
		position: relative;\
		margin: 20px 0 10px;\
		padding: 0 16px 2px 4px;\
		color: rgba(255,255,255,0.8);\
		font-variant: small-caps;\
		font-size: 15px;\
		border-bottom: 1px solid rgba(255,255,255,0.6);\
	}\
	.usLeftbar h3:before { \
		display: block;\
		content: '';\
		position: absolute;\
		bottom: -3px; left: 0; right: 0;\
		border-bottom: 1px solid rgba(255,255,255,0.6);\
	}\
	.usLeftbar h3.first { \
		margin: 0 0 10px 0! important;\
	}\
	.usLeftbar h3 span { \
		position: absolute;\
		width: 16px;\
		height: 16px;\
		top: 1px; right: 4px;\
		cursor: pointer;\
		opacity: 0.4;\
	}\
	.usLeftbar h3 span:hover { \
		opacity: 1;\
	}\
	.usLeftbar h3 .displaymore { \
		background: url(/img/icons/ui/more.png);\
	}\
	.usLeftbar h3 .displayless { \
		background: url(/img/icons/ui/less.png);\
	}\
	.usLeftbar .hero { \
		position: relative;\
		clear: both;\
		margin: 10px 0;\
		height: 36px;\
		padding-right: 20px;\
		background: rgba(255,255,255,0.08);\
		border-top: 1px solid rgba(255,255,255,0.1);\
		border-bottom: 1px solid rgba(255,255,255,0.1);\
	}\
	.usLeftbar .missingheroes { \
		position: relative;\
		clear: both;\
		margin: 10px 0;\
		padding: 1px 3px 3px;\
		line-height: 0px;\
		background: rgba(255,255,255,0.08);\
		border-top: 1px solid rgba(255,255,255,0.1);\
		border-bottom: 1px solid rgba(255,255,255,0.1);\
	}\
	.usLeftbar img { \
		opacity: 0.7;\
	}\
	.butbg img.alerted {\
		vertical-align: -20%;\
		margin-right: -10px;\
	}\
	.butbg img.alert {\
		position: relative;\
		left: 0px;\
		top: 2px;\
		transform: scale(1);\
	}\
	.usLeftbar .inventory { \
		padding-left: 4px;\
	}\
	.usLeftbar .item { \
		position: relative;\
		transform: scale(0.5);\
		-webkit-transform: scale(0.5);\
		margin: -14px;\
	}\
	.usLeftbar .item img.broken { \
		position: absolute;\
		right: 2px; top: 1px;\
		transform: scale(1.2);\
		-webkit-transform: scale(1.2);\
		opacity: 1! important;\
	}\
	.usLeftbar .item span.charges { \
		position: absolute;\
		padding: 0px 2px;\
		left: 2px; bottom: 1px;\
		background: rgba(0,0,0,0.7);\
		transform: scale(1.2);\
		-webkit-transform: scale(1.2);\
	}\
	.usLeftbar .item span.charges img { \
		width: 12px; height: 12px;\
	}\
	.usLeftbar .body { \
		float: left;\
		position: relative;\
		opacity: 1;\
		left: -5px;\
		top: -5px;\
		width: 28px;\
		height: 44px;\
		background: url('/img/art/char.png') no-repeat;\
		z-index: 2;\
	}\
	.usLeftbar .missingheroes .body { \
		height: 24px;\
		opacity: 0.7;\
		position: static! important;\
		float: none! important;\
		margin: 0 -3px! important;\
	}\
	.usLeftbar .hero .icons{\
		white-space: nowrap;\
		position: relative;\
		left: -2px;\
	}\
	.usLeftbar img:hover { \
		opacity: 1 !important;\
	}\
	.usLeftbar .but,\
	.ctrlw.but{ \
		margin: 0 2px;\
	}\
	.usLeftbar .but img { \
		opacity: 1;\
	}\
	.usLeftbar .hero .skills { \
		top: 2px;\
	}\
	.usLeftbar .hero .skills span.skill { \
		position: relative;\
	}\
	.icons.skills .skill{\
		display: inline-block;\
		font-size: 0;\
		position: relative;\
	}\
	.icons.skills{\
		height: 18px;\
		margin-bottom:3px;\
	}\
	.usLeftbar .hero .skills span.skill img.actmush,\
	.icons.skills .skill img.actmush\
	 { \
		position: absolute;\
		bottom: -3px;\
		right: 0px;\
		opacity: 1! important;\
	}\
	.usLeftbar .hero .titles { \
		position: absolute;\
		top: -3px;\
		right: 2px;\
		width: 16px;\
		line-height: 12px;\
		z-index: 2;\
	}\
	.usLeftbar .titles_list .icon { \
		margin: 0px 5px 3px 4px;\
		opacity: 1;\
	}\
	.usLeftbar .titles_list .body { \
		height: 24px;\
		opacity: 0.5;\
		position: static! important;\
		float: none! important;\
		margin: 0 -3px! important;\
	}\
	.usLeftbar .projectspreview { \
		text-align: center;\
	}\
	.usLeftbar .labpreview { \
		max-width: 120px;\
	}\
	.usLeftbar .projectpreview { \
		display: inline-block;\
		position: relative;\
		margin: 0 1px;\
		width: 34px;\
		height: 43px;\
		overflow: hidden;\
		border: 1px solid #458ddf;\
	}\
	.usLeftbar .projectpreview img.projectimg { \
		position: absolute;\
		top: -15px;\
		left: -7px;\
		z-index: 1;\
	}\
	.usLeftbar .projectpreview:hover img.projectimg { \
		opacity: 1;\
	}\
	.usLeftbar .projectpreview .projectpct { \
		position: absolute;\
		top: 6px;\
		left: 0px;\
		width: 34px;\
		text-align: center;\
		font-weight: bold;\
		font-size: 14px;\
		text-shadow: 0 0 6px black;\
		cursor: default;\
		z-index: 3;\
	}\
	.usLeftbar .projectpreview .projectbonus { \
		position: absolute;\
		bottom: 0px;\
		left: 0px;\
		width: 34px;\
		height: 16px;\
		text-align: center;\
		z-index: 3;\
	}\
	.usLeftbar .projectpreview .projectbonus img { \
		height: 16px;\
		opacity: 1;\
	}\
	td.chat_box .chattext .wall .mainmessage.neron_talks {\
		background-color : #74CBF3! important;\
		font-variant: small-caps;\
	}\
	#tabreply_content .loading, #tabcustom_content .loading { \
		text-align: center;\
		margin-top: 42px;\
	}\
	#tabreply_content .wall, #tabcustom_content .wall { \
		resize: none;\
	}\
	#tabreply_content .tid_buttons, #tabcustom_content .tid_buttons { \
		width: 100%;\
		text-align: center;\
		margin: 5px 0;\
	}\
	#tabreply_content .tid_button, #tabcustom_content .tid_button { \
		min-width: 0! important;\
		display: inline-block;\
		margin: 10px 4px;\
		padding: 3px 8px;\
	}\
	#tabreply_content textarea, #tabcustom_content textarea, #tabreply_content .reply, #tabcustom_content .reply { \
		width: 95%;\
		height: 80px! important;\
		resize: none! important;\
		margin: 3px auto! important;\
		background-color: #fff;\
		box-shadow: inset 0 0 3px #aad4e5, 0px 1px 0px #fff;\
		border: 1px solid #aad4e5;\
		border-radius : 3px;\
		color: rgb(10,40,80);\
		padding: 3px 5px;\
		font-size: 10pt;\
		overflow: auto;\
		text-align: left;\
	}\
	#tabreply_content form, #tabcustom_content form  { \
		height: 100%! important;\
	}\
	#tabreply_content .tid_wrapper, #tabcustom_content .tid_wrapper { \
		height: 100%! important;\
		padding: 4px;\
	}\
	#tabreply_content .tid_smileyPanel, #tabcustom_content .tid_smileyPanel { \
		margin: 2px auto;\
	}\
	#tabreply_content .tid_smileyPopUp .tid_wrapper, #tabcustom_content .tid_smileyPopUp .tid_wrapper  { \
		max-height: 80px! important;\
	}\
	#tabcustom_content .array_messages_prerecorded { \
		padding: 10px 10px 10px 35px;\
		background-color: #e1f9fe;\
		border-bottom: 1px solid #aad4e5;\
		border-top: 1px solid #aad4e5;\
		text-align: center;\
	}\
	#tabcustom_content .message_prerecorded { \
		margin: 2px;\
		padding: 2px 4px;\
		box-shadow: inset 0 0 3px #aad4e5, 0px 1px 0px #fff;\
		border: 1px solid #aad4e5;\
		border-radius : 3px;\
		cursor:  pointer;\
	}\
	#tabcustom_content .selected{ \
		background-color: #a1c9ce;\
	}\
	.recap p { \
		border: 1px solid rgb(9,10,97);\
		background: rgba(255,255,255,0.3);\
		margin: 10px 20px;\
		padding: 2px;\
		text-align: center;\
	}\
	.recap .chars { \
		text-align: center;\
	}\
	.recap .chars .hero { \
		display: inline-block;\
		position: relative;\
		width: 26px;\
		height: 30px;\
	}\
	.recap .chars .hero img { \
		position: absolute;\
		top: 0; left: 4px;\
	}\
	.recap .chars .hero span { \
		position: absolute;\
		bottom: 0; left: 0;\
		width: 100%;\
		text-align: center;\
		font-size: 10px;\
	}\
	.recap .chars .highlight { \
		width: 105px;\
		height: 16px;\
		margin-bottom: 6px;\
	}\
	.recap .chars .highlight span { \
		top: 0px; left: 24px;\
		width: auto;\
		line-height: 16px;\
		text-align: left;\
		font-size: 12px;\
	}\
	.recap textarea { \
		display: block;\
		height: 40px;\
		width: 90%;\
		border: 1px solid rgb(10,40,80);\
		padding: 2px;\
		margin: 5px auto;\
		font-size: 10px;\
		color: rgb(10,40,80);\
		opacity: 0.4;\
		resize: none;\
	}\
	.recap textarea:active { \
		opacity: 1;\
	}\
	.recap textarea:focus { \
		opacity: 1;\
	}\
	#tabtopic_content .mainmessage { \
		margin: 3px 5px;\
	}\
	#tabtopic_content table.treereply { \
		width: 92%;\
	}\
	#tabtopic_content td.tree { \
		width: 15px;\
	}\
	#tabfav_content .reply, #tabsearch_content .reply, #tabnew_content .reply, #tabwall_content .reply { \
		max-height: 65px;\
		overflow-y: hidden! important;\
		width: 92%;\
		margin: 5px 5px 0! important;\
	}\
	#tabfav_content .topicact, #tabsearch_content .topicact, #tabnew_content .topicact, #tabwall_content .topicact { \
		display: block;\
		text-align: center;\
		color: rgb(150,22,12)! important;\
		margin: 0 20px 8px;\
	}\
	#tabsearch_content { \
		padding-top: 30px;\
		position: relative;\
	}\
	#tabsearch_content .bar { \
		position: absolute;\
		top: 0px;\
		left: 0px;\
		right: 0px;\
		text-align: center;\
		padding: 4px 0;\
		border-bottom: 1px solid #555;\
	}\
	#tabsearch_content .bar input[type=text] { \
		color: black;\
		padding: 1px 3px;\
		border: 1px solid #555;\
	}\
	#tabsearch_content .bar .butmini { \
		margin: 0px 2px -6px;\
		padding: 3px 4px;\
	}\
	#searchresults h4 { \
		margin: 4px 8px; \
		font-size: 14px; \
	}\
	#searchresults p.help { \
		margin: 4px 8px; \
	}\
	#searchresults p.help i { \
		color: rgb(80,10,10); \
	}\
	.usPopup { \
		display: block! important;\
		position: fixed;\
		top: 23px;\
		bottom: 0px;\
		left: 0px;\
		right: 0px;\
		z-index: 98;\
	}\
	.usPopup .usPopupMask { \
		position: absolute;\
		top: 0; bottom: 0; right: 0; left: 0;\
		background: rgba(0,0,0,0.8);\
		z-index: -1;\
	}\
	.usPopup .usPopupContent { \
		position: relative;\
		margin: 100px auto 0 auto;\
		background: rgba(28, 56, 126, 0.976);\
		box-shadow: 0px 0px 3px 3px rgba(57, 101, 251, 0.5), 0px 0px 3px 3px rgba(57, 101, 251, 0.5) inset;\
		resize: none! important;\
	}\
	.popup-content{\
		margin: 30px;\
	}\
	.popup-actions{\
		margin-bottom: 10px;\
		text-align: center;\
	}\
	.updatescontent { \
		margin: 30px;\
	}\
	.updatescontent ul.updateslist { \
		font-size: 12px;\
		margin: 10px;\
	}\
	.updatescontent ul.updateslist li { \
		margin-left: 20px;\
		list-style-type: square;\
	}\
	.updatesactions{ \
		text-align: center;\
		margin-bottom: 10px;\
	}\
	.updatesbtn { \
		display: inline-block;\
		margin: 0 3px;\
	}\
	#neron_alert_content {\
		padding: 10px;\
	}\
	#neron_alert_content .img_neron{\
		float:left;\
		height:45px;\
		margin:0 8px 5px 0;\
	}\
	#neron_alert_content p{\
		margin: 10px 0;\
	}\
	#neron_alert_content input{\
		color: black;\
		margin-bottom: 10px;\
	}\
	.neron_alert_buttons{\
		text-align: center;\
	}\
	#char_col, #room_col, #chat_col, #topics_col, #topic_col, #reply_col, #options_col, #about_col, #profile_col {\
		transition: all 200ms;\
		-webkit-transition: all 200ms;\
		-o-transition: all 200ms;\
	}\
	#profile_col .hero-details{\
		height: 95px;\
		margin-left: 95px;\
		margin-right: 5px;\
		position: relative;\
	}\
	.profile-custom-infos{\
		border-top: 1px solid #FFF;\
		bottom: 0;\
		padding-top: 3px;\
		position: absolute;\
		width: 100%;\
	}\
	.profile-custom-infos label{\
		margin-right: 10px;\
	}\
	#profile-notes{\
	}\
	#profile-notes textarea{\
		height:40px;\
		display: block;\
		margin-bottom: 12px;\
		margin-top: 5px;\
		resize: none;\
	}\
	#profile-notes textarea:last-child{\
		height:146px;\
		overflow: hidden;\
	}\
	#profile-notes .actions {\
		bottom: 3px;\
		left: 0;\
		position: absolute;\
		right: 0;\
		text-align: center;\
	}\
	#profile-notes .profile-content{\
		height: 260px;\
		overflow: hidden;\
		padding: 0 10px;\
	}\
	/** pour régler les probleme du au scale css3 sur firefox**/\
	#char_col .sheetbgcontent table td.two .extrapa{\
		position:relative;\
	}\
	#cdMainContent{\
		position:relative;\
	}\
	.ctrlw_col input,\
	.ctrlw_col textarea{\
		color: #090A61;\
	}\
	.ctrlw-row-options{\
		background: none repeat scroll 0 0 rgba(255, 255, 255, 0.1);\
		border: 1px dashed #EEEEEE;\
		clear: both;\
		color: #EEEEEE;\
		margin: 10px 20px;\
		padding: 5px;\
	}\
	.ctrlw_col{\
		color: rgb(9,10,97);\
	}\
	.ctrlw_col p{\
		margin: 10px 0;\
	}\
	").appendTo("head");
	if (navigator.userAgent.indexOf("Firefox")==-1) $(".usLeftbar .hero .icons").css("padding-right", "30px");
};
// == Game Manager
Main.k.Game = {};
Main.k.Game.data = {};
Main.k.Game.data.day = 0;
Main.k.Game.data.cycle = 0;
Main.k.Game.data.xp = 1;
Main.k.Game.data.player_status = 'bronze';
Main.k.Game.data.castings = {};
Main.k.Game.init = function() {
	var ctrlw_game = localStorage.getItem("ctrlw_game");
	if (ctrlw_game == null){
		return;
	}
	Main.k.Game.data = JSON.parse(ctrlw_game);
};
Main.k.Game.clear = function(){
	Main.k.Game.data.day = 0;
	this.save();
};
// Shows the actual number of remaining cycles
Main.k.displayRemainingCyclesToNextLevel = function (){
	$('.levelingame').each(function(){
		var attr, xp_by_cycle;
		var regex = /(<p>.*>[^0-9]?)([0-9]+)([a-zA-Z ]*)(<)(.*<\/p>)/;
		if($(this).attr('onmouseover_save') !== undefined){
			attr = $(this).attr('onmouseover_save');
		}else{
			attr = $(this).attr('onmouseover');
			$(this).attr('onmouseover_save',attr);
		}
		if(regex.exec(attr) != null){
			if(Main.k.Game.data.player_status == 'gold'){
				xp_by_cycle = 2;
			}else{
				xp_by_cycle = 1;
			}
			var i_cycles = RegExp.$2;
			var i_cycles_save = localStorage.getItem('ctrlw_remaining_cycles');
			localStorage.setItem('ctrlw_remaining_cycles',i_cycles);
			if(i_cycles_save != i_cycles && i_cycles_save != null){
				Main.k.Game.updatePlayerInfos();
			}
			var remaining_cycles = Math.ceil(i_cycles - Main.k.Game.data.xp / xp_by_cycle);
			var i_daily_cycle = 8;
			if($('.miniConf img[src*="fast_cycle"]').length > 0){
				i_daily_cycle = 12;
			}else if($('.miniConf img[src$="blitz_cycle.png"]').length > 0){
				i_daily_cycle = 24;
			}

			var nb_days = Math.round(remaining_cycles / i_daily_cycle);
			var s_days = '';
			if(nb_days > 0){
				s_days = Main.k.text.strargs(Main.k.text.ngettext("(~%1 jour)","(~%1 jours)",nb_days),[nb_days]);
				s_days = ' '+s_days;
			}
			$(this).attr('onmouseover',attr.replace(regex,"$1"+remaining_cycles+"$3"+s_days+"$4"+"$5"));
		}
	});
	if($('.levelingame_no_anim').length > 0){
		localStorage.setItem('ctrlw_remaining_cycles',0);
	}
};
Main.k.onCycleChange = function(){
	// Script updates
	// ----------------------------------- //
	localStorage.removeItem('ctrlw_update_cache');
	localStorage.removeItem('ctrlw_remaining_cycles',0);
	// ----------------------------------- //
};
Main.k.Game.save = function() {
	localStorage.setItem("ctrlw_game",JSON.stringify(Main.k.Game.data));
};
Main.k.Game.updateDayAndCycle = function(day,cycle) {
	if(day != this.data.day || cycle != this.data.cycle){
		this.data.day = day;
		this.data.cycle = cycle;
		Main.k.onCycleChange();
		this.updatePlayerInfos();
		this.save();
	}
};
Main.k.Game.updatePlayerInfos = function() {
	var $this = this;
	console.info('Mise à jour des infos joueurs - envoi');
	Tools.ping('/me',function(content) {
		console.group('Mise à jour des infos joueurs - retour');
		var body = '<div id="body-mock">' + content.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') + '</div>';
		var jobject = $(body);
		console.log('récupération de l\'xp');
		if(jobject.find('#cdActualXp').length > 0){
			$this.data.xp = jobject.find('#cdActualXp').text();
			console.log('xp',$this.data.xp);
		}
		console.log('récupération du statut du joueur');
		if(jobject.find('#experience .bought.goldactive').length > 0){
			$this.data.player_status = 'gold';
			console.log('le joueur est gold');
		}else if(jobject.find('#experience .bought').length > 0){
			$this.data.player_status = 'silver';
			console.log('le joueur est silver');
		}else{
			$this.data.player_status = 'bronze';
			console.log('le joueur est bronze');
		}

		$this.data.castings = {};
		jobject.find('#profile .bgtablesummar:last li').each(function(index, element) {
			var casting = {};
			casting.id = $(this).find('a').attr('href').replace('/group/','');
			casting.icon = $(this).find('img').attr('src');
			var str = jobject.find('.nameCast a:eq('+index+')').text();
			casting.long_name = casting.short_name = str;
			if(str.length > 18){
				casting.short_name = str.match(/\b(\w)/g).join('.').concat('.');
			}
			$this.data.castings[casting.id] = casting;
		});

		$this.save();
		Main.k.MushUpdate();
		Main.k.updateMainMenu();
		Main.k.quickNotice(Main.k.text.gettext('Infos du joueur mises à jour.'));
	});
};


// == Options Manager  ========================================
Main.k.Options = {};
Main.k.Options.initialized = false;
Main.k.Options.cbubbles = false;
Main.k.Options.cbubblesNB = false;
Main.k.Options.dlogo = false;
Main.k.Options.splitpjt = true;
Main.k.Options.altpa = false;
Main.k.Options.mushNoConf = false;
Main.k.Options.options = [];

Main.k.Options.init = function() {
	Main.k.Options.options = [
	//  Option Name,	Option Object,				Need refresh,	After(),				Desc
		["cbubbles",	Main.k.Options.cbubbles,	false,			Main.k.customBubbles,	Main.k.text.gettext("Activer la mise en forme personnalisée des messages (bordure + couleur nom + image de fond).")],
		["cbubblesNB",	Main.k.Options.cbubblesNB,	false,			Main.k.customBubbles,	Main.k.text.gettext("Simplifier la mise en forme personnalisée des messages (suppression de l'image de fond).")],
		["dlogo",		Main.k.Options.dlogo,		true,			null,					Main.k.text.gettext("Afficher le logo Mush au dessus des onglets.")],
		["splitpjt",	Main.k.Options.splitpjt,	false,			Main.k.updateBottom,	Main.k.text.gettext("Séparer les projets / recherches / pilgred sous la zone de jeu.")]
		//["altpa",		Main.k.Options.altpa,		true,			null,					"Utiliser des images alternatives pour les pa / pm."]
	];

	var cook = js.Cookie.get("ctrlwoptions");
	if (!cook) return;

	var parts = cook.split("|");
	for (var i=0; i<parts.length; i++) {
		var part = parts[i].split(":");
		var key = part[0];
		var val = part[1];

		Main.k.Options.updateOpt(key,val);
	}
};
// == /Options Manager  =======================================
Main.k.Options.open = function() {
	if (Main.k.folding.displayed == "options") {
		Main.k.folding.displayGame();
		return;
	}

	if (!Main.k.Options.initialized) {
		Main.k.Options.initialized = true;

		var td = $("<td>").addClass("chat_box").css({
			"padding-right": "6px",
			"padding-top": "1px",
			transform: "scale(0,1)",
			color: "rgb(9,10,97)"
		}).attr("id", "options_col").appendTo($("table.inter tr").first());

		$("<p>").addClass("warning").text(Main.k.text.gettext("Plus d'options disponibles prochainement.")).appendTo(td);


		for (var i=0; i<Main.k.Options.options.length; i++) {
			var opt = Main.k.Options.options[i];
			var html = opt[4];
			if (opt[2]) html += " "+Main.k.text.gettext("Nécessite un rechargement de la page.");

			var p = $("<p>").css({
				color: "#EEE",
				padding: "5px",
				border: "1px dashed #EEE",
				background: "rgba(255,255,255,0.1)",
				margin: "10px 20px",
				clear: "both"
			})
			.html('<label style="margin-left: 30px;display:block" for="ctrlw_'+opt[0]+'">' + html + '</label>')
			.appendTo(td);

			var chk = $("<input>").css({
				"float": "left"
			})
			.attr("type", "checkbox")
			.attr("optname", opt[0])
			.attr("id", 'ctrlw_'+opt[0])
			.attr("opti", i)
			.on("change", Main.k.Options.update)
			.prependTo(p);
			if (opt[1]) chk.attr("checked", "checked");
		}

		Main.k.MakeButton("<img src='/img/icons/ui/reported.png' style='vertical-align: -20%' /> "+ Main.k.text.gettext("Vider le cache du script"), null, null, Main.k.text.gettext("Vider le cache du script"),
			Main.k.text.gettext("Ce bouton vous permet de vider le cache du script pour, par exemple, prendre en compte tout de suite votre mode Or ou forcer une vérification de mise à jour. A utiliser avec parcimonie svp."))
		.appendTo(td).find("a").on("mousedown", function(){
			Main.k.clearCache();
		});
	}

	Main.k.folding.display([null,null, "#options_col"], "options");
};
Main.k.Options.update = function(e) {
	var tgt = $(e.target);
	var key = $(tgt).attr("optname");
	var val = $(tgt).is(":checked") ? "y" : "n";
	var i = $(tgt).attr("opti");

	Main.k.Options.updateOpt(key,val);
	Main.k.Options.updateCookie();
	if (Main.k.Options.options[i][3]) Main.k.Options.options[i][3]();
};
Main.k.Options.updateCookie = function() {
	var cook = "";
	for (var i=0; i<Main.k.Options.options.length; i++) {
		if (i>0) cook += "|";
		cook += Main.k.Options.options[i][0] + ":";
		cook += Main.k.Options.options[i][1] ? "y" : "n";
	}

	js.Cookie.set("ctrlwoptions",cook,420000000);
};
Main.k.Options.updateOpt = function(key, val) {
	switch(key) {
		case "custombubbles":
		case "cbubbles":
			Main.k.Options.cbubbles = (val == "y");
			Main.k.Options.options[0][1] = (val == "y");
			break;
		case "custombubbles_nobackground":
		case "cbubblesNB":
			Main.k.Options.cbubblesNB = (val == "y");
			Main.k.Options.options[1][1] = (val == "y");
			break;
		case "displaylogo":
		case "dlogo":
			Main.k.Options.dlogo = (val == "y");
			Main.k.Options.options[2][1] = (val == "y");
			break;
		case "splitpjt":
			Main.k.Options.splitpjt = (val == "y");
			Main.k.Options.options[3][1] = (val == "y");
			break;
		//case "altpa":
		//	Main.k.Options.altpa = (val == "y");
		//	Main.k.Options.options[4][1] = (val == "y");
		//	break;
	}
};




Main.k.tabs = {};
Main.k.tabs.credits = function() {
	$("blockquote").css("overflow", "visible");
	$("blockquote p").css({
		height: "auto",
		"font-size": "10pt",
		"margin-top": "10px"
	});
	$("#extra").find(".nova").css("display", "none");

	// Add menu
	$("<div>").addClass("mainmenu").html('<ul id="menuBar">\
		<li class="daed"><a href="/">Jouer</a></li>\
		<li><a href="/me">Mon Compte</a></li>\
		<li><a href="/ranking">Classement</a></li>\
		<li><a href="/tid/forum">Forum</a></li>\
	</ul>').appendTo(".mxhead");

	// Enhance mushs
	$(".scoremush").siblings("h3").css("color", "rgb(255, 64, 89)");
	$(".triumphmush").siblings(".dude").find("h3").css("color", "rgb(255, 64, 89)");
};
Main.k.tabs.expPerma = function() {
	if (Main.k.Options.cbubbles) {
		Main.k.css.bubbles();

		$("div.exploreevent p").each(function() {
			var heroes = [];
			var heroes_replace = [];
			$("ul.adventurers .char").each(function() {
				var hero = Main.k.GetHeroNameFromTopic($(this).parent());
				var herof = hero.replace("_", " ").capitalize();
				heroes_replace.push('<span class="colored_' + hero + '"><img src="/img/icons/ui/' + hero.replace("_", "") + '.png" /> ' + herof + '</span>');
				heroes.push(herof);
			});

			var html = $(this).html();
			for (var i=0; i<heroes.length; i++) {
				var regex = new RegExp(heroes[i],'g');
				html = html.replace(regex, heroes_replace[i]);
			}
			$(this).html(html);
		})
	}
};
Main.k.tabs.gameover = function() {
	// Triumph logs
	var logs = $("#logtri li span, #logtri div div li");
	var logcount = {
		humanC: 0,			// 1
		researchMin: 0,		// 3
		research: 0,		// 6
		hunter: 0,			// 1
		expe: 0,			// 3
		planet: 0			// 5
	};

	var reg = /([0-9]+)\sx\s([^\(]+)\s\(\s(?:\+|-)\s([0-9]+)\s\)/;
	var $logtri = $("#logtri");
	$logtri.find("div").css("display", "block");
	$logtri.find(".rreadmore").css("display", "none");
	logs.each(function() {
		var counted = false;
		var data = reg.exec($(this).html());
		switch (data[2].trim()) {
			/* Translators: This translation must be copied from the game. */
			case Main.k.text.gettext("Cycle Humain"):
				counted = true;
				logcount.humanC += parseInt(data[1]);
				break;
			/* Translators: This translation must be copied from the game. */
			case Main.k.text.gettext("Recherche Mineur"):
				counted = true;
				logcount.researchMin += parseInt(data[1]);
				break;
			/* Translators: This translation must be copied from the game. */
			case Main.k.text.gettext("Recherche"):
				counted = true;
				logcount.research += parseInt(data[1]);
				break;
			/* Translators: This translation must be copied from the game. */
			case Main.k.text.gettext("Défenseur Du Daedalus"):
				counted = true;
				logcount.hunter += parseInt(data[1]);
				break;
			/* Translators: This translation must be copied from the game. */
			case Main.k.text.gettext("Expédition"):
				counted = true;
				logcount.expe += parseInt(data[1]);
				break;
			/* Translators: This translation must be copied from the game. */
			case Main.k.text.gettext("Nouvel Planète"):
				counted = true;
				logcount.planet += parseInt(data[1]);
				break;
		}

		if (counted) {
			var tgt = ($(this).tagName == "SPAN") ? $(this).parent() : $(this);
			tgt.css("display", "none");
		}
	});
	if (logcount.planet) {
		/* Translators: This translation must be copied from the game. */
		$("<li>").html(logcount.planet + " x "+Main.k.text.gettext("Nouvelle Planète") + " ( + " + logcount.planet * 5 + " )")
		.attr("_title", Main.k.text.gettext("Nouvelle Planète"))
		.attr("_desc", Main.k.text.gettext("Gagné à chaque planète (arrivée en orbite)."))
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.k.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.expe) {
		/* Translators: This translation must be copied from the game. */
		$("<li>").html(logcount.expe + " x "+ Main.k.text.gettext("Expédition") +" ( + " + logcount.expe * 3 + " )")
		.attr("_title", Main.k.text.gettext("Expédition"))
		.attr("_desc", Main.k.text.gettext("Gagné à chaque exploration."))
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.k.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.researchMin) {
		/* Translators: This translation must be copied from the game. */
		$("<li>").html(logcount.researchMin + " x "+ Main.k.text.gettext("Recherche Mineure") +" ( + " + logcount.researchMin * 3 + " )")
		.attr("_title", Main.k.text.gettext("Recherche Mineure"))
		.attr("_desc", Main.k.text.gettext("Gagné lorsque la recherche est terminée ainsi qu'une seconde fois lors du retour sur SOL."))
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.k.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.research) {
		/* Translators: This translation must be copied from the game. */
		$("<li>").html(logcount.research + " x "+ Main.k.text.gettext("Recherche") + " ( + " + logcount.research * 6 + " )")
		.attr("_title", Main.k.text.gettext("Recherche"))
		.attr("_desc", Main.k.text.gettext("Gagné lorsque la recherche est terminée ainsi qu'une seconde fois lors du retour sur SOL."))
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.k.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.hunter) {
		/* Translators: This translation must be copied from the game. */
		$("<li>").html(logcount.hunter + " x "+ Main.k.text.gettext("Défenseur du Daedalus") + " ( + " + logcount.hunter + " )")
		.attr("_title", Main.k.text.gettext("Défenseur du Daedalus"))
		.attr("_desc", Main.k.text.gettext("Gagné pour chaque Hunter abattu."))
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.k.hideTip)
		.prependTo("#logtri");
	}
	if (logcount.humanC) {
		/* Translators: This translation must be copied from the game. */
		$("<li>").html(logcount.humanC + " x "+ Main.k.text.gettext("Cycle Humain") + " ( + " + logcount.humanC + " )")
		.attr("_title", Main.k.text.gettext("Cycle Humain"))
		.attr("_desc", Main.k.text.gettext("Gagné à chaque cycle."))
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.k.hideTip)
		.prependTo("#logtri");
	}

	//Loading on like click
	$(document).on('click','a.like',function(){
		$(this).replaceWith('<img class="cdLoading" src="/img/icons/ui/loading1.gif" alt="loading..." />');
	});
};
Main.k.tabs.playerProfile = function() {

	/** Only on connected player profile page **/
	if($("#experience.cdTabTgt").length > 0){

		// Fix Experience
		$(".charboostbg ul.slots").css("display", "none");
		$("ul.boost li.charboost").css("height", "200px");

		// Fix menu
		$("#accountmenu").find("a").each(function() {
			$(this).on("click", function() {
				var r = /\?([a-z]+)$/;
				if (r.test(this.href)) {
					$('.cdTabTgt').hide();
					$("#" + r.exec(this.href)[1]).show();
					var sel = $("#" + r.exec(this.href)[1] + "tab");
					sel.addClass('active');
					sel.siblings().removeClass('active');
				} else {
					$('.cdTabTgt').hide();
					$("#experience").show();
					var $experiencetab = $("#experiencetab");
					$experiencetab.addClass('active');
					$experiencetab.siblings().removeClass('active');
				}
				return false;
			})
		});

		// Autoselect tab
		var url = Main.k.window.location;
		var r = /\?([a-z]+)$/;
		if (r.test(url)) {
			$('.cdTabTgt').hide();
			$("#" + r.exec(url)[1]).show();
			var sel = $("#" + r.exec(url)[1] + "tab");
			sel.addClass('active');
			sel.siblings().removeClass('active');
		}
	}

	/** For all profile pages **/
	/**** MY FILE ****/
	$('.cdTripEntry td .char').css('margin','5px 0');
	$('.cdTripEntry').each(function(){
		$(this).find('td').eq(-2).css('width','71px');
	});
	$('.cdTripEntry .new').remove();
	$('.cdTripPrevious').on('click',function(){
		if($('.cdTripPage').text() > 1){
			$('.cdTripPrevious').show();
		}
	});

};
Main.k.tabs.playing = function() {
	var callbacks_storage_sync = $.Callbacks();
	Main.k.css.ingame();

	// Open links in a new tab
	$("ul.kmenu a.ext").on("click", function() { Main.k.window.open(this.href); return false; });
	Main.k.hasTalkie = $("#walltab").length > 0;

	$('#swf_ISO_MODULE').click(function(){
		var fake_on = $('.fakeitem.on');
		if(fake_on.length == 1){
			Main.k.fakeSelectItem(fake_on);
		}
	});

	// == Extend Prototype  =======================================
	/*Selection.prototype.cancelSelection = function(node) {
		var doHeroInv = node != null?node.parents("#myInventory").length > 0:true;
		var doRoomInv = node != null?node.parents(".inventory").length > 0:true;
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
			var allItems = Selection.j(".inventory .item").not(".cdEmptySlot");
			Selection.j(".inventory .selected").parent().removeClass("on");
			Selection.j(".inventory .selected").remove();
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
		}
	}
	Closet.prototype.show = function(forced,immediate) {
		var _g = this;
		var doIt = function() {
			$(".invcolorbg").show();
			$(".inv#cdInventory").addClass("placard_on");
			_g.visible = true;
			if(!forced) Main.cancelSelection();
			$(".inv").css("visibility","visible");
			$(".inv").css("display", "block");
			$(".inv").css("margin-top", "-194px");
			var invbloc = $("#cdInventory .invcolorbg");
			invbloc.css("display", "block");
			invbloc.find(".exceed").css("display", "block");
			invbloc.find(".arrowleft").css("display", "block");
			invbloc.find(".arrowright").css("display", "block");
			$("#cdItemActions").removeClass("selectplayer");
			var prx = Main.rmMan.getProxy(Clients.ISO_MODULE);
			if(prx != null) prx._setBaseLine(CrossConsts.BASELINE_CLOSET);
		};
		if(Main.isTuto() && !forced && (Main.uiFlags().rep & 1 << UI_FLAGS.UF_EXPECT_CLOSET_OPENED[1]) != 0) Tools.updateContent("/co",Main.selUpdtArr,null,function() {
			Main.resetJs();
			doIt();
		}); else doIt();
	}*/
	$.fn.insertAtCaret = function(text) {
		return this.each(function() {
			if (this.selectionStart || this.selectionStart == '0') {
				var startPos = this.selectionStart;
				var endPos = this.selectionEnd;
				var scrollTop = this.scrollTop;
				this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos, this.value.length);
				this.focus();
				this.selectionStart = startPos + text.length;
				this.selectionEnd = startPos + text.length;
				this.scrollTop = scrollTop;
			} else {
				this.value += text;
				this.focus();
				this.value = this.value;
			}
		});
	};
	$.fn.insertAroundCaret = function(b, a) {
		return this.each(function() {
			if (this.selectionStart || this.selectionStart == '0') {
				var startPos = this.selectionStart;
				var endPos = this.selectionEnd;
				var scrollTop = this.scrollTop;
				this.value = this.value.substring(0, startPos) + b + this.value.substring(startPos, endPos) + a + this.value.substring(endPos, this.value.length);
				this.focus();
				this.selectionStart = startPos + b.length;
				this.selectionEnd = endPos + a.length;
				this.scrollTop = scrollTop;
			} else {
				this.value += b + a; // TODO: move caret?
				this.focus();
				this.value = this.value;
			}
		});
	};
	$.fn.addHeroDescToolTip = function(dev_surname){
		var $desc = $('<div/>');
		var $tooltip_title = $('<div/>');
		var name;
		var o_hero = Main.k.Profiles.get(dev_surname);
		$tooltip_title.append(o_hero.name);

		$.each(o_hero.titles,function(k,title){
			$("<img>").attr("src", "/img/icons/ui/" + title.img + ".png")
				.css({
					'margin-left': '5px',
					'line-height': '7px'
				})
				.attr("alt", title.img)
				.appendTo($tooltip_title);
		});
		var $statuses = $("<div>").addClass("icons statuses").css('float','right');
		$desc.append($statuses);
		if(o_hero.statuses.length > 0){
			$.each(o_hero.statuses,function(k,status){
				$("<img>").attr("src", "/img/icons/ui/status/" + status.img + ".png")
					.attr("height", "16").attr("alt", status.img)
					.appendTo($statuses);
			});
		}
		if(typeof(o_hero.spores) != 'undefined' && o_hero.spores != null){
			var $spores = $('<div>')
				.css({
					position: 'relative',
					display: 'inline-block',
					'margin-left': '2px',
					top: '2px'
				})
				.appendTo($statuses);

			$("<img>").attr("src", "/img/icons/ui/spore.png")
				.attr("height", "16").attr("alt", o_hero.spores.name)
				.attr("_title", o_hero.spores.name)
				.attr("_desc", o_hero.spores.desc)
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip)
				.appendTo($spores);

			$('<span>')
				.text(o_hero.spores.nb)
				.css({
					color: '#FFF',
					'font-size': "10px",
					position: 'absolute',
					left: '4px',
					top: '1px',
					opacity: 0.7,
					'pointer-events': 'none'

				})
				.appendTo($spores);
		}
		if(o_hero.skills.length > 0) {
			var $skills = $("<p>").addClass("icons skills");
			$.each(o_hero.skills, function (k, skill) {
				var $skilldom = $("<span>").addClass("skill").appendTo($skills);

				$("<img>").attr("src", "/img/icons/skills/" + skill.img + ".png")
					.attr("height", "19").attr("alt", skill.img)
					.appendTo($skilldom);

				if (Main.k.compInactiveMush[skill.img]) {
					$("<img>").attr("src", Main.k.servurl + "/img/non-mush.png").addClass("actmush")
						.attr("width", "10").attr("height", "10")
						.appendTo($skilldom);
				}
				$desc.append($skills);
			});
		}

		$desc.append('<div class="clear"></div>');
		$desc.append('<p>' + o_hero.short_desc.htmlEncode().replace(/([\r\n]+)/g, "<br/>") + '</p>');


		$desc.append('<p><strong>' + Main.k.text.gettext("Cliquez pour plus d'informations") + '</strong></p>');
		$(this)
			.attr("_title", $tooltip_title.html())
			.attr("_desc", $desc.html())
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.k.hideTip);
		return $(this);
	};
	$.fn.addTooltip = function(title,text){
		$(this)
			.attr("_title", title)
			.attr("_desc", text)
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.k.hideTip);
		return $(this);
	};
	/*haxe.remoting.ExternalConnection.prototype.call = function(params) {
		var s = new haxe.Serializer();
		s.serialize(params);
		var params1 = s.toString();
		var data = null;
		var fobj = Main.k.window.document[this.__data.flash];
		if(fobj == null) {
			fobj = Main.k.window.document.getElementById(this.__data.flash);
		}
		if(fobj == null) {
			throw "Could not find flash object '" + this.__data.flash + "'";
		}
		try {
			if (fobj.externalRemotingCall) {
				data = fobj.externalRemotingCall(this.__data.name,this.__path.join("."),params1);
			}
		} catch( e ) {
		}
		if(data == null) {
			var domain, pageDomain;
			try {
				domain = fobj.src.split("/")[2];
				pageDomain = js.Lib.window.location.host;
			} catch( e ) {
				domain = null;
				pageDomain = null;
			}
			if(domain != pageDomain) throw "ExternalConnection call failure : SWF need allowDomain('" + pageDomain + "')";
			throw "Call failure : ExternalConnection is not initialized in Flash";
		}
		return new haxe.Unserializer(data).unserialize();
	}*/
	// == /Extend Prototype =======================================


	// == Extend Reflect  =========================================
	/*var Reflect = function() {};
	$hxClasses["Reflect"] = Reflect;
	Reflect.__name__ = ["Reflect"];
	Reflect.field = function(o,field) {
		var v = null;
		try {
			v = o[field];
		} catch( e ) {
		}
		return v;
	}
	Reflect.fields = function(o) {
		var a = [];
		if(o != null) {
			var hasOwnProperty = Object.prototype.hasOwnProperty;
			for( var f in o ) {
			if(hasOwnProperty.call(o,f)) a.push(f);
			}
		}
		return a;
	}
	Reflect.copy = function(o) {
		var o2 = { };
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
		return o2;
	}
	Reflect.compare = function(a,b) { return a == b?0:a > b?1:-1; }*/
	// == /Extend Reflect =========================================


	// == Extend Main  ============================================
	Main.k.extend = createObjectIn(unsafeWindow.Main.k, {defineAs: "extend"});
	Main.k.extend.updateContent =  Main.updateContent;
	Main.updateContent = function(url,seek,dest,cb) {
		console.log('update content');
		Main.k.extend.updateContent(url,seek,dest,function(){
			try {
				if (cb != null) cb();
			} catch (e) {
				console.error('erreur',e);
				Main.k.MushUpdate();
			}

			if(/\/choosePeer\?charId=[0-9]+&idx=([0-9]+)/.test(url)){
				var tab_class = '.cdPrivateTab' + RegExp.$1;
				Main.k.MushUpdate();
				if($(tab_class).length > 0){
					$(tab_class).trigger('click');
				}
			}
		});
	};
	addFctToPage(Main.updateContent,'Main.updateContent');

	//Main.k.extend.onChatFocus = Main.onChatFocus;
	Main.k.extend.onChatFocus = function(t,i) {
		//Main.k.extend.onChatFocus(t,i);
		console.log('Main.rst',Main.rst);
		if (0 == (Main.rst & 1 << i)) {
			console.log('Main.rst if');
			Main.rst |= 1 << i;

			if (!t.parent().find(".formatbtn").get(0)) {

				// Add formatting
				$("<a>").addClass("butmini chatformatbtn").html("<img src='/img/icons/ui/pam.png' /> Formater").attr("href", "#").appendTo(t.parent())
					.on("click", function () {
						var tgt = $(this);
						if (tgt.hasClass("butmini")) tgt = tgt.parent().find("textarea");

						Main.k.Manager.openOn("newtopic", tgt.val());
						return false;
					});

				// Display chat button & fix tabindex
				t.siblings("input").show();
				t.siblings("input").attr("tabindex", 1);
			}
		}
		console.log('onchatfocus end');
	};
	Main.k.extend.onChatInput = function(event) {
		var jq = $(this);
		var tgt = new mush_jquery(event.target);
		tgt.siblings("input").show();
		if(event.keyCode == 13) {
			if(!event.ctrlKey) {
				event.preventDefault();
				var pr = tgt.parent();
				pr.submit();
				Tools.send2Store("mush_chatContent_" + jq.attr("id"),"");
				//jq.val('');
				tgt.data("default",true);
			} else {
				// Insert line break at caret, not at the end...
				$(tgt).insertAtCaret("\n");
				Tools.send2Store("mush_chatContent_" + jq.attr("id"),tgt.val());
			}
		} else Tools.send2Store("mush_chatContent_" + jq.attr("id"),tgt.val());
	};
	Main.k.extend.onWallInput = function(event) {
		var tgt = new mush_jquery(event.target);
		var val = tgt.val();
		if(event.keyCode == 13) {
			if(!event.ctrlKey && val.length > 1) {
				event.preventDefault();
				var updtArr = ["cdTabsChat","chatBlock","char_col"];
				var scr = new js.JQuery(".cdWallChannel").scrollTop();
				var sendChatProc = function() {
					Main.resetJs();
					var jq = new $(".cdWallChannel");
					jq.scrollTop(scr + 100);
				};
				unsafeWindow.sendChatProc = exportFunction(sendChatProc, unsafeWindow, {defineAs: "sendChatProc"});
				if(Main.isTuto()) {
					updtArr.unshift("floating_ui_start");
					updtArr.unshift("cdDialogs");
					updtArr.push("ode");
				}
				var stVal = encodeURIComponent(val);
				var url = "/wallReply?k=" + Std.string(tgt.closest(".unit").data("k")) + "&msg=" + stVal;
				Main.updateContent(url,cloneInto(updtArr,unsafeWindow),null,unsafeWindow.sendChatProc);
				Tools.send2Store("mush_wallReply_" + tgt.attr("id"),"");
				tgt.val('');
				tgt.data("default",true);
			} else {
				// Insert line break at caret, not at the end...
				$(tgt).insertAtCaret("\n");
				Tools.send2Store("mush_wallReply_" + tgt.attr("id"),tgt.val());
			}
		} else Tools.send2Store("mush_wallReply_" + tgt.attr("id"),tgt.val());
	};
	Main.k.extend.onWallFocus = function() {//TODO: MULTILANG
		jq = $(this);
		console.info('Main.onWallFocus');
		if (!jq.parent().find(".formatbtn").get(0)) {
			jq.attr("onblur", "");

			var td = jq.parent().parent().siblings("td").first();
			var sharediv = $("<div>").css({
				"margin-top": "20px",
				"margin-left": "5px"
			}).appendTo(td);

			// Life
			$("<a>").addClass("butmini formatbtn").html("<img src='" + Main.k.servurl + "/img/viemoral.png' />").attr("href", "#").appendTo(sharediv)
				.on("click", function() {
					var txt = Main.k.FormatLife();
					$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
					return false;
				})
				.attr("_title", Main.k.text.gettext("Partager son état de santé"))
				.attr("_desc", Main.k.text.gettext("<p>Insère votre nombre de points de vie et de moral dans la zone de texte active, de la forme&nbsp;:</p><p>TODO: example</p>"))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

			// Inventory
			$("<a>").addClass("butmini formatbtn").html("<img src='http://data.hordes.fr/gfx/icons/item_bag.gif' />").attr("href", "#").appendTo(sharediv)
				.on("click", function(e) {
					var txt = Main.k.FormatInventory();
					$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
					Main.k.SyncAstropad(e);
					return false;
				})
				.attr("_title", Main.k.text.gettext("Partager l'inventaire"))
				.attr("_desc", Main.k.text.gettext("Insère l'inventaire de la pièce dans la zone de texte active, de la forme&nbsp;:</p><p><strong>Couloir central :</strong> <i>Combinaison</i>, <i>Couteau</i>, <i>Médikit</i>, <i>Extincteur</i></p><p><strong>Partage aussi sur Astropad si celui-ci est installé.</strong></p>"))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

			// Conso
			if ($("#pharmashare").css("display") != "none") {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/sat.png' />").attr("href", "#").appendTo(sharediv)
					.on("click", function() {
						var txt = Main.k.FormatPharma();
						$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
						return false;
					});
			}

			// Plants
			if ($("#plantmanager").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/plant_youngling.png' />").attr("href", "#").appendTo(sharediv)
					.on("click", function() {
						var txt = Main.k.FormatPlants();
						$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
						return false;
					})
					.attr("_title", Main.k.text.gettext("Partager l'état des plantes"))
					.attr("_desc", Main.k.text.gettext("<p>Insère l'état des plantes dans la zone de texte active.</p><p>TODO: Exemple</p>"))
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip);
			}

			// Projects
			if ($(".shareprojectbtn").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/conceptor.png' />").attr("href", "#").appendTo(sharediv)
					.on("click", function() {
						var txt = Main.k.FormatProjects();
						$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
						return false;
					})
					.attr("_title", Main.k.text.gettext("Partager les projets"))
					.attr("_desc", Main.k.text.gettext("Insère la liste de projets dans la zone de texte active, de la forme&nbsp;:</p><p>" +
						"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>" +
						"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>" +
						"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>"))
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip);
			}

			// Research
			if ($(".shareresearchbtn").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/microsc.png' />").attr("href", "#").appendTo(sharediv)
					.on("click", function() {
						var txt = Main.k.FormatResearch();
						$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
						return false;
					})
					.attr("_title", Main.k.text.gettext("Partager les recherches"))
					.attr("_desc", Main.k.text.gettext("Insère la liste de recherches dans la zone de texte active, de la forme&nbsp;:</p><p>" +
						"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>" +
						"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>" +
						"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>"))
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip);
			}

			// BIOS
			if ($("#biosModule").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/pa_core.png' />").attr("href", "#").appendTo(sharediv)
					.on("click", function() {
						var txt = Main.k.FormatBIOS();
						$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
						return false;
					})
					.attr("_title", Main.k.text.gettext("Partager les paramètres BIOS"))
					.attr("_desc", Main.k.text.gettext("Insère la liste de paramètres BIOS Neron dans la zone de texte active, de la forme&nbsp;:</p><p>TODO: aperçu"))
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip);
			}

			// Planets
			if ($("#navModule").length > 0) {
				$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/planet.png' />").attr("href", "#").appendTo(sharediv)
					.on("click", function() {
						var txt = Main.k.FormatPlanets();
						$(this).parent().parent().siblings("td").first().find("textarea").insertAtCaret(txt);
						return false;
					})
					.attr("_title", Main.k.text.gettext("Partager les planètes"))
					.attr("_desc", Main.k.text.gettext("<p>Insère les détails des planètes dans la zone de texte active.</p><p>TODO: Exemple</p>"))
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip);
			}



			// Formatting
			var formatdiv = $("<div>").addClass("replybuttons customreply").appendTo(jq.parent());
			formatdiv.siblings("textarea").css({"padding-bottom": "22px", height: "130px"});

			// Bold
			$("<a>").addClass("butmini formatbtn").html("<strong>B</strong>").attr("href", "#").appendTo(formatdiv)
				.on("click", function() {
					$(this).parent().parent().find("textarea").insertAroundCaret("**","**");
				});

			// Italic
			$("<a>").addClass("butmini formatbtn").html("<i>I</i>").attr("href", "#").appendTo(formatdiv)
				.on("click", function() {
					$(this).parent().parent().find("textarea").insertAroundCaret("//","//");
				});

			// Add smile
			$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/moral.png' />").attr("href", "#").appendTo(formatdiv)
				.on("click", function() {
					// TODO
				})
				.attr("_title", Main.k.text.gettext("Insérer un smiley"))
				.attr("_desc", Main.k.text.gettext("Bientôt disponible."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

			// Empty textarea
			$("<a>").addClass("butmini").html("<img src='/img/icons/ui/bin.png' />").attr("href", "#").appendTo(formatdiv)
				.on("click", function() {
					var t = $(this).closest(".unit").find("textarea");
					t.val("");
					t.focus();
					return false;
				})
				.attr("_desc", Main.k.text.gettext("Vider la zone de texte."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

			// Close textarea
			$("<a>").addClass("butmini").html("<img src='/img/icons/ui/status/unsociable.png' />").attr("href", "#").appendTo(formatdiv)
				.on("click", function() {
					var jq = $(this);
					var jqp = jq.closest(".unit");
					jqp.find(".tree").not(".cdTreeReply").last().addClass("treelast");
					jqp.find(".blockreply").addClass("hide");
					jqp.find("textarea").val("");
					return false;
				})
				.attr("_desc", Main.k.text.gettext("Fermer la zone de texte."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

			// Add formatting link (manager)
			$("<span>&nbsp;</span>").appendTo(formatdiv);
			$("<a>").addClass("butmini formatbtn").html("<img src='/img/icons/ui/pam.png' /> Formater").attr("href", "#").appendTo(formatdiv)
				.on("click", function() {
					var tgt = $(this);
					if (tgt.hasClass("butmini")) tgt = tgt.parent().parent().find("textarea");

					Main.k.Manager.openOn("reply", tgt.val(), tgt.closest(".unit").attr("data-k"));
					return false;
				})
				.attr("_desc", Main.k.text.gettext("Ouvrir le manager."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);
		}
	};
	Main.k.extend.onChatScroll = function() {
		var jq = $(this);
		var curChan = Main.curChatIndex();
		Main.curScroll.set(curChan,jq.scrollTop());
		if(curChan == ChatType.Wall[1]) {
			if(jq.scrollTop() + jq.height() + 8 >= jq.toArray()[0].scrollHeight) Main.k.extend.loadMoreWall();
		}
	};
	Main.loadMoreWall = function(){

	};
	addFctToPage(Main.loadMoreWall,'Main.loadMoreWall');
	Main.k.extend.loadMoreWall = function(){
		if(Main.lmwProcessing) return;
		Main.lmwProcessing = true;
		Main.lmw_spin++;
		var chan = Main.getChannel(Main.curChatIndex()).find("div.wall div.unit");
		var w = chan.last();
		var wp = w.closest(".wall");
		if(w.length > 0) {
			JqEx.postLoading(wp);
			var url = "/retrWallAfter/" + Std.string(w.data("k"));
			Tools.ping(url,function(content) {
				var jq = new js.JQuery(content);
				JqEx.remLoading(wp);
				var subWall = Lambda.list(jq.find(".wall form"));
				var $it0 = subWall.iterator();
				while( $it0.hasNext() ) {
					var e = $it0.next();
					var u = e.find(".unit");
					if(u == null) continue;
					var $it1 = (function($this) {
						var $r;
						var _this = wp.find(".unit");
						$r = (_this.iterator)();
						return $r;
					}(this));
					while( $it1.hasNext() ) {
						var we = $it1.next();
						var uk = u.data("k");
						var wk = we.data("k");
						haxe.Log.trace(uk + " <>  " + wk,{ fileName : "Main.hx", lineNumber : 3841, className : "Main", methodName : "loadMoreWall"});
						if(wk == uk) subWall.remove(e);
					}
				}
				var $it2 = subWall.iterator();
				while( $it2.hasNext() ) {
					var w1 = $it2.next();
					wp.append(w1.html());
				}
				Main.lmwProcessing = false;

				/**************** CTRL+W *************/
				if (Main.k.Options.cbubbles) Main.k.customBubbles();
				// Never hide unread msg
				$("table.treereply tr.not_read.cdRepl").css("display", "table-row");
				/**************** CTRL+W *************/

			});
		} else Main.lmwProcessing = false;

	};

	Main.k.extend.resetJs = Main.resetJs;
	Main.resetJs = function(doActions, skipK) {
		Main.k.extend.resetJs(doActions);
		if (!skipK) Main.k.MushUpdate();
	};
	exportFunction(Main.resetJs, unsafeWindow.Main, {defineAs: 'resetJs'});

	// == /Extend Main ============================================




	// ============================================================
	// == User Script  ============================================
	// ============================================================
	Main.k.UpdateData = {currversion: 0, changelog: []};
	Main.k.UpdateCheck = function() {
		var version_update;
		if(Main.k.UpdateCheck.b_in_progress == undefined){
			Main.k.UpdateCheck.b_in_progress = false;
		}
		if(Main.k.UpdateCheck.b_in_progress == true){
			return;
		}
		var lastVersion = js.Cookie.get('ctrlwVersion');
		if(typeof(lastVersion) != 'undefined' && lastVersion < Main.k.version){
			version_update = lastVersion;
		}else{
			version_update = Main.k.version;
		}
		if(localStorage.getItem('ctrlw_update_cache') == null){
			Main.k.UpdateCheck.b_in_progress = true;
			GM_xmlhttpRequest({
				method: 'GET',
				url :Main.k.servurl + "/versions/update/"+ version_update,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(json) {
					setTimeout(function() {
						console.warn('update_json',json);
						localStorage.setItem('ctrlw_update_cache',JSON.stringify(json));
						Main.k.UpdateCheck.b_in_progress = false;
					}, 0);


					Main.k.UpdateCheckScriptVersion(json,lastVersion);
				},
				onerror: function(xhr,statut,http){
					console.warn(xhr,statut,http);
				}
			});

		}else{
			Main.k.UpdateCheckScriptVersion(JSON.parse(localStorage.getItem('ctrlw_update_cache')),lastVersion);
		}

	};
	/**
	 *
	 * @param {object} json infos about current version
	 * @param {string} json.numero Version number
	 * @param {string} json.changelog_long Changelog
	 * @param {string} json.user_num_version Version number of the installed script
	 * @param {int} json.user_code_version Version code of the installed script
	 * @param lastVersion
	 */
	Main.k.UpdateCheckScriptVersion = function(json,lastVersion){
		try {
			json = JSON.parse(json.response);
		} catch (e) {
			return false;
		}
		Main.k.UpdateData.currversion = json.numero;
		if(typeof(json['changelog_long_'+Main.k.lang]) != 'undefined'){
			Main.k.UpdateData.changelog = json['changelog_long_'+Main.k.lang];
		}else{
			Main.k.UpdateData.changelog = json.changelog_long;
		}
		Main.k.UpdateData.url = json.url;
		if (json.user_code_version < json.code && json.user_num_version == GM_info.script.version) {
			$("#updatebtn").css("display", "block");
		} else {
			if(typeof(lastVersion) != 'undefined' && lastVersion != GM_info.script.version){
				Main.k.AutoUpdateDialog();
			}
			js.Cookie.set('ctrlwVersion',GM_info.script.version,420000000);
			$("#updatebtn").css("display", "none");
		}
	};
	Main.k.UpdateDialog = function() {
		var okHref = Main.k.UpdateData.url;
		// Create popup
		var popup = Main.k.CreatePopup();
		popup.content.css({
			"height": "auto",
			"max-height": "90%",
			"width": "600px",
			"color": "#FFF"
		});

		//conf.title = "Mise à jour du script CTRL+W";
		var maj_content = Main.k.text.gettext("Version " + Main.k.UpdateData.currversion + " disponible :")+" <br/> <ul class='updateslist'>";
		for (var i=0; i<Main.k.UpdateData.changelog.length; i++) {
			var log = Main.k.UpdateData.changelog[i];
			maj_content += "<li>"+log+"</li>";
		}
		maj_content += "</ul>";

		// Fill popup content
		var content = "<div class='updatescontent'>" + maj_content + "</div>";
		var ok = "<div class='updatesactions'><div id=\"ok\" class=\"but updatesbtn\" ><div class=\"butright\"><div class=\"butbg\"><a onclick=\"$('#final').show();\" href=\""+okHref+"\">"+Main.k.text.gettext("Mettre à jour")+"</a></div></div></div>";
		var cancelAc = "'Main.k.ClosePopup();'";
		var cancel = "<div id=\"cancel\" class=\"but updatesbtn\" onclick=" + cancelAc + "><div class=\"butright\"><div class=\"butbg\"><a href=\"#\">" + Main.getText("cancel") + "</a></div></div></div></div>";
		var finalisation = '<div id="final" class="updatesactions" style="display:none"><div><strong>'+Main.k.text.gettext("Pour finaliser la mise à jour, après avoir installé le script, veuillez cliquer sur le bouton ci-dessous.")+'</strong></div><div class="but updatesbtn" onclick="Main.k.ClosePopup();window.location.reload();"><div class="butright"><div class="butbg"><a href="#">'+Main.k.text.gettext("Finaliser la mise à jour")+'</a></div></div></div></div></div>';
		$("<div>").html(content + ok + cancel + finalisation).appendTo(popup.content);

		// Display popup
		Main.k.OpenPopup(popup.dom);
	};
	Main.k.AutoUpdateDialog = function() {
		// Create popup
		var popup = Main.k.CreatePopup();
		popup.content.css({
			"height": "auto",
			"max-height": "90%",
			"width": "600px",
			"color": "#FFF"
		});

		//conf.title = "Mise à jour du script CTRL+W";
		var maj_content = Main.k.text.strargs(Main.k.text.gettext("Dernière version de CTRL+W installée (%1) :"), [GM_info.script.version]);
		maj_content += " <br/> <ul class='updateslist'>";
		for (var i=0; i<Main.k.UpdateData.changelog.length; i++) {
			var log = Main.k.UpdateData.changelog[i];
			maj_content += "<li>"+log+"</li>";
		}
		maj_content += "</ul>";

		// Fill popup content
		var content = "<div class='updatescontent'>" + maj_content + "</div>";
		var ok = "<div class='updatesactions'><div id=\"ok\" class=\"but updatesbtn\" ><div class=\"butright\"><div class=\"butbg\"><a onclick=\"Main.k.ClosePopup();\" href=\"#\">"+Main.k.text.gettext("Très bien, merci !")+"</a></div></div></div>";
		$("<div>").html(content + ok).appendTo(popup.content);

		// Display popup
		Main.k.OpenPopup(popup.dom);
	};
	Main.k.COMPLETE_SURNAME = function(n) { return n.replace("_", " ").capitalize(); };
	Main.k.LoadJS = function(url, params, after) {
		var s = js.Lib.document.createElement("script");
		s.async = true;
		var p = Reflect.copy(params);
		p.jsm = "1";
		p.lang = "FR";
		s.src = _tid.makeUrl(url,cloneInto(p,unsafeWindow));
		if (after != null) s.onload = after;
		js.Lib.document.body.appendChild(s);
	};
	Main.k.postMessage = function(k, msg, after) {
		// Save msg
		var stVal = StringTools.urlEncode(msg);
		js.Cookie.set("lastsentmsg", stVal);
		Main.k.displayLastSent(true);

		var sendChatProc = function() {
			Main.resetJs();

			// Message sent
			Main.k.displayLastSent(false);
			if (after) after();
		};

		var updtArr = ["cdTabsChat","chatBlock","char_col"];
		var url = "/wallReply?k=" + k + "&msg=" + stVal;
		Main.updateContent(url,updtArr,null,sendChatProc);
	};
	Main.k.newTopic = function(msg, after) {
		// Save msg
		var stVal = StringTools.urlEncode(msg);
		js.Cookie.set("lastsentmsg", stVal);
		Main.k.displayLastSent(true);

		var sendChatProc = function() {
			Main.resetJs();

			// Message sent
			Main.k.displayLastSent(false);
			if (after) after();
		};

		var updtArr = ["cdTabsChat","chatBlock","char_col"];
		var url = "/newWallThread?message=" + stVal;
		Main.updateContent(url,updtArr,null,sendChatProc);
	};
	Main.k.displayLastSent = function(show) {
		var btn = $("#lastsentmsg");
		if (show) {
			btn.css("display", "block");
			var cook = js.Cookie.get("lastsentmsg");
		} else {
			btn.css("display", "none");
			js.Cookie.set("lastsentmsg", "");
		}
	};
	/**
	 * @return string
	 */
	Main.k.FormatInventory = function() {
		// Room name
		var inv = "**" + $("#input").attr("d_name") + " :** ";

		// Objects
		var objects = $("#room").clone();
		objects.find(".cdEmptySlot").remove();
		var first = true;
		objects.find("li").each(function(i) {
			// Ignore hidden objects
			if ($(this).attr("data-name").indexOf("/img/icons/ui/hidden.png") != -1) return;
			var name = $(this).attr("data-name");

			// Ignore personal objects
			var perso = ["itrakie","itrackie", "talkie", "walkie", "traqueur", "tracker"]; // TODO: add other translations (itrackie exists or it's a mistake ?)
			for (var a = 0 ; a < perso.length ; a++) if (name.toLowerCase().indexOf(perso[a].toLowerCase()) != -1) return;

			// Handle broken objects
			var broken = (name.indexOf("/img/icons/ui/broken.png") > -1);

			// Remove img from desc
			name = name.replace(/(<img.+\/>)/ig, "").trim();

			// Handle mage books
			if (name.toLowerCase() == Main.k.text.gettext("apprentron")) {
				name = decodeURIComponent(/namey[0-9]+:(.+)g$/.exec($(this).attr("data-tip"))[1]).replace(/(\s\s)/, " ");
			}

			// Handle quantity
			var qty = "";
			if ($(this).find(".qty").get(0)) {
				qty = " x" + $(this).find(".qty").html().trim();
			}

			// Handle loads
			var reg = /x([0-9]+)$/;
			if (reg.test(name)) name += " " + Main.k.text.gettext("charges");

			if (!first) inv += ", ";
			inv += "//" + name + "//" + qty;
			if (broken) inv += " :alert:";
			first = false;
		});
		if (first) inv += "//" + Main.k.text.gettext("vide") + "//";

		// Camera / Drone
		var ncamera = 0;
		var ndrones = 0;
		var $it = Main.items.iterator();
		while( $it.hasNext() ) {
			/** @type {{iid:string}} **/
			var item = $it.next();
			if (item.iid == "CAMERA") ncamera++;
			else if (item.iid == "HELP_DRONE") ndrones++;
		}
		if (ncamera || ndrones) inv += " [";
		if (ncamera) inv += ncamera + " " + Main.k.text.gettext("caméra") + (ncamera != 1 ? "s" : "");
		if (ncamera && ndrones) inv += " - ";
		if (ndrones) inv += ndrones + " " + Main.k.text.gettext("drone") + (ndrones != 1 ? "s" : "");
		if (ncamera || ndrones) inv += "]";

		return inv;
	};
	/**
	 * @return string
	 */
	Main.k.FormatPlants = function() {
		var ret = "**//" + Main.k.text.gettext("plantes").capitalize() + " : //**";

		$("#room").find("[data-id='TREE_POT']").each(function(i) {
			var name = /^([^<]+)/.exec($(this).attr("data-name"))[1].trim();
			var diseased = ($(this).attr("data-name").indexOf("plant_diseased") != -1);
			var thirsty = ($(this).attr("data-name").indexOf("plant_thirsty") != -1);
			var dry = ($(this).attr("data-name").indexOf("plant_dry") != -1);
			var adult = true; // TODO

			ret += "\n- ////**" + name + "** ";
			//ret += adult ? "(mature)" : "(X cycles)";
			ret += " - ";

			var problems = [];
			if (diseased) problems.push("//" + Main.k.text.gettext("malade").capitalize() + "//");
			if (thirsty) problems.push("//" + Main.k.text.gettext("soif").capitalize() + "//");
			if (dry) problems.push("//" + Main.k.text.gettext("desséché").capitalize() + "//");
			if(problems.length == 0) problems.push("//" + Main.k.text.gettext("RAS").capitalize() + "//");

			ret += problems.join();

		});

		return ret;
	};
	/**
	 * @return string
	 */
	Main.k.FormatProjects = function() {//TODO: MULTILANG
		var ret = "**//" + Main.k.text.gettext("Projets") + " : //**";

		var parse = function(t) {
			t = t.replace(/<img\s+src=\"\/img\/icons\/ui\/pa_slot1.png\"[\/\s]*>/ig, ":pa:");
			t = t.replace(/&nbsp;/ig, " ");
			t = t.replace(/\n/ig, "");
			t = t.replace(/<p>/ig, " ");
			t = t.replace(/<\/?[^>]+>/g, "");
			return t;
		};

		$("#cdModuleContent").find("ul.dev li.cdProjCard").each(function(i) {
			var name = $(this).find("h3").html().trim();
			var pct = $(this).find("span").html().trim();
			var desc = parse($(this).find("div.desc").html().trim());
			var bonus1 = /<h1>([^<]+)<\/h1>/.exec($(this).find("div.suggestprogress ul li img").first().attr("onmouseover"))[1].trim();
			var bonus2 = /<h1>([^<]+)<\/h1>/.exec($(this).find("div.suggestprogress ul li img").last().attr("onmouseover"))[1].trim();

			ret += "\n**" + name + "** - " + pct + "\n";
			ret += "" + desc + "\n";
			ret += "Bonus : //" + bonus1 + "//, //" + bonus2 + "//";
		});

		return ret;
	};
	/**
	 * @return string;
	 */
	Main.k.FormatResearch = function(short) {
		var ret = "**//"+Main.k.text.gettext("Recherches")+" : //**";

		var parse = function(t) {
			t = t.replace(/<img\s+src=\"\/img\/icons\/ui\/triumph.png\"\s+alt=\"triomphe\"[\/\s]*>/ig, ":mush_triumph:");
			t = t.replace(/&nbsp;/ig, " ");
			t = t.replace(/\n/ig, "");
			t = t.replace(/<p>/ig, " ");
			t = t.replace(/<\/?[^>]+>/g, "");
			return t;
		};

		$("#cdModuleContent").find("ul.dev li.cdProjCard").each(function(i) {
			var pct = $(this).find("span").html().trim()
			if(parseInt(pct) == 0){
				return true;
			}
			var h3 = $(this).find("h3").clone();
			h3.find("em").remove();
			var name = parse(h3.html().trim());
			var desc = parse($(this).find("div.desc").html().trim());
			var bonus1 = /<strong>([^<]+)<\/strong>/.exec($(this).find("div.suggestprogress ul li img").first().attr("onmouseover"))[1].trim().replace("Médeçin", "Médecin");
			var bonus2 = /<strong>([^<]+)<\/strong>/.exec($(this).find("div.suggestprogress ul li img").last().attr("onmouseover"))[1].trim().replace("Médeçin", "Médecin");
			ret += "\n**" + name + "** - " + pct;
			if(typeof(short) == 'undefined' ||  short != true ) {
				ret += "\n" + desc + "\n";
				ret += "Bonus : //" + bonus1 + "//, //" + bonus2 + "//";
			}
		});

		return ret;
	};
	/**
	 * @return string;
	 */
	Main.k.FormatPlanets = function(index) {//TODO: MULTILANG
		var ret = "**//"+Main.k.text.gettext("Planètes")+" : //**";

		var parse = function(t) {
			t = t.replace(/<img\s+src=\"\/img\/icons\/ui\/triumph.png\"\s+alt=\"triomphe\"[\/\s]*>/ig, ":mush_triumph:");
			t = t.replace(/&nbsp;/ig, " ");
			t = t.replace(/\n/ig, "");
			t = t.replace(/<p>/ig, " ");
			t = t.replace(/<\/?[^>]+>/g, "");
			return t;
		};

		$("#navModule").find(".planet").not(".planetoff").each(function(i) {
			if(index != null && i != index){
				return true;
			}
			// Name + Planet img
			var name = $(this).find("h3").html().trim();
			var img = $(this).find("img.previmg").attr("src");

			// Distance & fuel
			var dir, dist;
			var pllist = $(this).find("ul.pllist li");
			if (pllist.length > 0) {
				var regex = new RegExp(Main.k.text.gettext('(Nord|Est|Ouest|Sud)'));
				dir = regex.exec(pllist.eq(-2).html())[1];
				dist = /([0-9]+)/.exec(pllist.last().html())[1];
			}

			// Cases
			var nbcases = $(this).find("td img.explTag").length;
			var cases = [];
			var casenamereg = /<h1>([^<]+)<\/h1>/;
			$(this).find("td img.explTag.on").each(function() {
				cases.push(casenamereg.exec($(this).attr("onmouseover"))[1]);
			});

			// Print planet
			ret += "\n**" + name + "** (" + nbcases + ' ' + Main.k.text.gettext('cases') + ")\n";
			if (dist && dir) ret += "//" + dir + " - " + dist + " :mush_fuel:****//\n";
			ret += cases.join(", ");
		});

		return ret;
	};
	/**
	 * @return string;
	 */
	Main.k.FormatBIOS = function() {//TODO: MULTILANG
		var ret = "//**" + Main.k.text.gettext('Paramètres BIOS:') + "**//";

		$('#biosModule').find('ul.dev li').each(function() {
			var biosParam = $(this);
			ret += "\n**" + $(this).children("h3:first").text().trim() + "** : ";
			ret += $(this).find("input[checked='checked']").siblings("label").text();
		});

		return ret;
	};
	/**
	 * @return string;
	 */
	Main.k.FormatComm = function(){
		var comm = "//**" + Main.k.text.gettext('Communications:') + "**//";

		var parse = function(t) {
			t = t.replace(/<img\s+src=\"\/img\/icons\/ui\/triumph.png\"\s+alt=\"triomphe\"[\/\s]*>/ig, ":mush_triumph:");
			t = t.replace(/&nbsp;/ig, " ");
			t = t.replace(/\n/ig, "");
			t = t.replace(/<p>/ig, " ");
			t = t.replace(/<\/?[^>]+>/g, "");
			return t;
		};
		var $trackerModule = $('#trackerModule');
		$trackerModule.find('.sensors').each(function() {

			var bdd = $(this).find("h2").html().trim();
			comm += "\n//" + bdd + "//: ";
			var data = [];
			$(this).find("p").each(function() {
				data.push($(this).find("em").html());
			});

			if (data.length < 2){
				data.push(' :alert:');
			}else{
				data.pop();
				data.push(' :com:');
			}
			comm += data.join("");
		});

		$trackerModule.find('.neron').each(function() {

			var version = $(this).find("h2").html().trim();
			comm += "\n//" + version + "//\n";

		});
		$trackerModule.find('.xyloph').each(function() {

			var bdd = $(this).find("h2").html().trim();
			var nbr = 0;
			var data = [];
			var datanamereg = /<h1>([^<]+)<\/h1>/;
			$(this).find("li").not(".undone").each(function() {
				nbr += 1;
				data.push(datanamereg.exec($(this).attr("onmouseover"))[1].replace('\\',''));
			});

			if (nbr == 12){
				comm += "//" + bdd + "//: ";
				comm += nbr + "/12\n";
			}
			else{
				if (nbr >0){
					comm += "//" + bdd + "//: ";
					comm += nbr + "/12"+"\n ▶ **"+ data.join("** \n ▶ **")+"**\n";
				}
			}



		});

		$trackerModule.find('.network .bases').each(function() {

			var base = "//" + Main.k.text.gettext('Décodage: ') + "//";
			var base_decode;
			$(this).find("li").each(function(){

				base_decode = $(this).attr("data-id");
				$(this).find(".percent").not(".off").each(function(){
					base += base_decode+ "► " + $(this).html().trim();
				});
			});

			if (base != "//" + Main.k.text.gettext('Décodage: ') + "//"){
				comm += base +"\n";
			}

			var base_fini = "//" + Main.k.text.gettext('Base(s) décodée(s): ') + "//";
			var _base ="";
			var base_signal_perdu = "//" + Main.k.text.gettext('Base(s) perdue(s): ') + "//";
			var base_nom = "";
			var nbr_base_perdu = 0;

			$(this).find("li").each(function(){

				base_nom = $(this).attr("data-id");
				$(this).find("h3").each(function(){
					if (($(this).html().trim()) != "???" && ($(this).html().trim()) != ""){

						base_fini += $(this).html().trim() +", ";
					}
				});

				$(this).find("span").not(".percent").each(function(){

					base_signal_perdu += base_nom +", ";
				});
			});

			if (base_fini != "//" + Main.k.text.gettext('Base(s) décodée(s): ') + "//"){
				comm += base_fini;
				comm = comm.substring(0,comm.length-2)+"\n";
			}
			if (base_signal_perdu != "//" + Main.k.text.gettext('Base(s) perdue(s): ') + "//"){
				comm += base_signal_perdu.substring(0,base_signal_perdu.length-2);
			}


		});
		return comm;
		};
	/**
	 * @return string;
	 */
	Main.k.FormatPharma = function() {
		var ret = "**//" + Main.k.text.gettext("Consommables :") + " //**";

		var o_replace = {};
		/* Translators: This translation must be copied from the game. (Consummables description) */
		o_replace[Main.k.text.gettext("Guérie la maladie")] = ':pa_heal:';
		/* Translators: This translation must be copied from the game. (Consummables description) */
		o_replace[Main.k.text.gettext("satiété")] = ':pa_cook:';
		/* Translators: This translation must be copied from the game. (Consummables description) */
		o_replace[Main.k.text.gettext("Provoque la maladie")] = ':ill:';

		var a_ignore = [];
		/* Translators: This translation must be copied from the game. (Consummables description) */
		a_ignore.push(Main.k.text.gettext("Impérissable"));
		var regex_ignore = new RegExp('^('+a_ignore.join('|')+'$)');

		var $room = $("#room");
		$room.find("li").not(".cdEmptySlot").each(function() {
			var name = $(this).attr("data-name").capitalize();
			var desc = $(this).attr("data-desc").split("\\'").join("'");

			if (desc.indexOf("Effets") != -1 || $(this).data('id') == "CONSUMABLE") {
				var $desc = $('<div>'+desc+'</div>');
				if($desc.has('p')){

					var a_ret_effect = [];
					$desc.find('p').each(function(){
						if(!regex_ignore.test($(this).html())){
							a_ret_effect.push($(this).html().replaceFromObj(o_replace));
						}
					});
					if(a_ret_effect.length > 0){
						ret += "\n**" + name + "** : ";
						ret += a_ret_effect.join(', ');
					}


				}


			}
		});

		ret = ret.replace(/<\/p>/g, ", ");
		ret = ret.replace(/(\t|\\r\\n|\\|<\/?(p|div)>)/g, "");
		ret = ret.replace(/,\s<br\/>/g, "\n");
		ret = ret.replace(/<img[^>]+pa_slot1[^>]+>/g, ":pa:");
		ret = ret.replace(/<img[^>]+pa_slot2[^>]+>/g, ":pm:");
		ret = ret.replace(/<img[^>]+moral[^>]+>/g, ":moral:");
		ret = ret.replace(/<img[^>]+lp\.png[^>]+>/g, ":hp:");
		ret = ret.replace(/<img[^>]+>/g, "");

		return ret;
	};
	/**
	 * @return string;
	 */
	Main.k.FormatLife = function() {//TODO: MULTILANG
		var pv = $("table.pvsm td").not(".barmoral").find("span").html().trim();
		var moral = $("table.pvsm td.barmoral span").html().trim();
		return pv + " :mush_hp: / " + moral + " :mush_moral:";
	};
	/**
	 * @return string;
	 */
	Main.k.Resize = function() {
		var leftbar = $(".usLeftbar");
		var content = $("#content");
		var $body = $("body");
		var bw = $body.width();
		var lbw = 126; //leftbar.width();
		var w = Math.min(Main.k.BMAXWIDTH, bw - lbw - 30);
		content.css("width", w);

		if ($(Main.k.window).width() > (w + (lbw + 15)*2)) {
			content.css("left", (bw - w) / 2 + "px");

			// Fix background position
			if (Main.k.Options.dlogo) $body.css("background-position", "-" + ((1830-bw)/2) + "px 20px");
		} else {
			content.css("left", lbw + 15 + "px");

			// Fix background position
			if (Main.k.Options.dlogo) $body.css("background-position", "-272px 20px");
		}

		var content_height = content.height() + content.position().top;
		if (leftbar.height() < content_height) {
			leftbar.css("height", content_height-11);
		} else {
			content.css("height", leftbar.height() - content.position().top + 11);
		}
	};
	Main.k.ToggleDisplay = function() {
		if (this.className == "displaymore") {
			this.className = "displayless";
			$("" + $(this).attr("_target")).css("display", "block");
		} else {
			this.className = "displaymore";
			$("" + $(this).attr("_target")).css("display", "none");
		}
		Main.k.Resize();
	};
	Main.k.ExtendPilgred = function() {
		var $cdBottomBlock = $("#cdBottomBlock");
		$("#pilgredbonus").remove();
		var pilgred = $cdBottomBlock.find("div.pilgred").parent().css({
			position: "relative",
			"margin-right": "160px"
		});

		// Double research points
		var research = $cdBottomBlock.find("div.research");
		var researchtriumph = 0;
		research.each(function() {
			var name = $(this).parent().find("img").attr("src").replace("/img/cards/research/", "").replace(".png", "");
			if(Main.k.researchGlory[name]) researchtriumph += Main.k.researchGlory[name];
		});

		// -10 / mush alive
		var nmush = $("ul.people img[src='/img/icons/ui/p_mush.png']").length;
		var mushtriumph = -10 * nmush;

		// Print result
		var res = "<h4>"+ Main.k.text.gettext("Triomphe retour sur sol") + "</h4>" +
		"- " + Main.k.text.gettext("Retour sur Sol :") + " 20 <br/>" +
		"- " + Main.k.text.gettext("Bonus recherches : ") + researchtriumph + "<br/>" +
		"- " + Main.k.text.gettext("Malus mush en vie : ") + mushtriumph + "<br/>" +
		Main.k.text.gettext("Total :") + " " + (20 + researchtriumph + mushtriumph);
		$("<div>")
			.attr("id", "pilgredbonus")
			.attr('_title',Main.k.text.gettext("Triomphe retour sur sol"))
			.attr('_desc',Main.k.text.gettext("Ne tient pas compte des mushs anonymes."))
			.css({
				position: "absolute",
				top: "3px",
				left: "54px",
				width: "150px",
				"font-size": "11px"
			})
			.html(res)
			.appendTo(pilgred)
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.k.hideTip);
	};
	Main.k.maxAgo = function(a,b) {//TODO: MULTILANG
		var min_a, min_b;

		// TODO: factorize code

		// undefined
		if (!a) return b;
		if (!b) return a;

		// à l'instant
		if (a == Main.k.text.gettext("à l'instant")) return b;
		if (b == Main.k.text.gettext("à l'instant")) return a;

		// Minutes
		var reg_min = /([0-9]+)min/;
		if (reg_min.test(a)) {
			if (!reg_min.test(b)) return b;

			min_a = parseInt(reg_min.exec(a)[1]);
			min_b = parseInt(reg_min.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		} else if (reg_min.test(b)) {
			if (!reg_min.test(a)) return a;

			min_a = parseInt(reg_min.exec(a)[1]);
			min_b = parseInt(reg_min.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		}

		// Hours
		var reg_hours = /\~([0-9]+)h/;
		if (reg_hours.test(a)) {
			if (!reg_hours.test(b)) return b;

			min_a = parseInt(reg_hours.exec(a)[1]);
			min_b = parseInt(reg_hours.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		} else if (reg_hours.test(b)) {
			if (!reg_hours.test(a)) return a;

			min_a = parseInt(reg_hours.exec(a)[1]);
			min_b = parseInt(reg_hours.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		}

		// Days
		var reg_days = /\~([0-9]+)j/;
		if (reg_days.test(a)) {
			if (!reg_days.test(b)) return b;

			min_a = parseInt(reg_days.exec(a)[1]);
			min_b = parseInt(reg_days.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		} else if (reg_days.test(b)) {
			if (!reg_days.test(a)) return a;

			min_a = parseInt(reg_days.exec(a)[1]);
			min_b = parseInt(reg_days.exec(b)[1]);
			if (min_a <= min_b) return b;
			return a;
		}

		// ?
		return a;
	};
	Main.k.minAgo = function(a,b) {//TODO: MULTILANG
		var min_a, min_b;
		// TODO: factorize code

		// undefined
		if (!a) return b;
		if (!b) return a;

		// à l'instant
		if (a == Main.k.text.gettext("à l'instant")) return a;
		if (b == Main.k.text.gettext("à l'instant")) return b;

		// Minutes
		var reg_min = /([0-9]+)min/;
		if (reg_min.test(a)) {
			if (!reg_min.test(b)) return a;

			min_a = parseInt(reg_min.exec(a)[1]);
			min_b = parseInt(reg_min.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		} else if (reg_min.test(b)) {
			if (!reg_min.test(a)) return b;

			min_a = parseInt(reg_min.exec(a)[1]);
			min_b = parseInt(reg_min.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		}

		// Hours
		var reg_hours = /\~([0-9]+)h/;
		if (reg_hours.test(a)) {
			if (!reg_hours.test(b)) return a;

			min_a = parseInt(reg_hours.exec(a)[1]);
			min_b = parseInt(reg_hours.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		} else if (reg_hours.test(b)) {
			if (!reg_hours.test(a)) return b;

			min_a = parseInt(reg_hours.exec(a)[1]);
			min_b = parseInt(reg_hours.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		}

		// Days
		var reg_days = /\~([0-9]+)j/;
		if (reg_days.test(a)) {
			if (!reg_days.test(b)) return a;

			min_a = parseInt(reg_days.exec(a)[1]);
			min_b = parseInt(reg_days.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		} else if (reg_days.test(b)) {
			if (!reg_days.test(a)) return b;

			min_a = parseInt(reg_days.exec(a)[1]);
			min_b = parseInt(reg_days.exec(b)[1]);
			if (min_a <= min_b) return a;
			return b;
		}

		// ?
		return a;
	};
	Main.k.extendAgo = function(ago) {//TODO: MULTILANG
		var reg_result = /([0-9]+)/.exec(ago);
		if(reg_result != null){
			var one = (parseInt(reg_result[1]) == 1);
			ago = ago.replace("min", " minute" + (one ? "" : "s"));
			ago = ago.replace("h", " heure" + (one ? "" : "s"));
			ago = ago.replace("j", " jour" + (one ? "" : "s"));
		}
		ago = ago.replace("&lt;1m", "moins d'une minute");
		ago = ago.replace("~", "environ ");
		return ago;
	};
	Main.k.surnameToBubble = function(surname){
		return surname.replace(/(\s)/g, "_").toLowerCase();
	};
	Main.k.customBubbles = function() {
		var bubbles = $(".bubble");
		if (Main.k.Options.cbubbles) {
			bubbles.each(function() {
				var charname = Main.k.GetHeroNameFromTopic($(this).parent());
				$(this).addClass("bubble_" + charname);
				if (Main.k.Options.cbubblesNB) $(this).addClass("custombubbles_nobackground");
			});
		} else {
			bubbles.removeClass("custombubbles_nobackground");

			for (var i=0; i<Main.k.HEROES.length; i++ ) {
				bubbles.removeClass("bubble_" + Main.k.HEROES[i]);
			}
		}
	};
	Main.k.updateBottom = function() {
		var $cdBottomBlock = $("#cdBottomBlock");
		if ($cdBottomBlock.find("div.pilgred").length > 0) Main.k.ExtendPilgred();
		$cdBottomBlock.find("div.split").remove();
		if (Main.k.Options.splitpjt) {
			if ($cdBottomBlock.find("div.project").length > 0) $("<div>").addClass("split").insertAfter($cdBottomBlock.find("div.project").last().parent());
			if ($cdBottomBlock.find("div.research").length > 0) $("<div>").addClass("split").insertAfter($cdBottomBlock.find("div.research").last().parent());
		}
	};

	// Game zone fold/unfold
	Main.k.folding = {};
	Main.k.folding.displayed = "game";
	Main.k.folding.busy = false;
	Main.k.folding.currcols = ["#char_col", "#room_col", "#chat_col"];
	Main.k.folding.gamecols = ["#char_col", "#room_col", "#chat_col"];
	Main.k.folding.display = function(cols, newdisplay, afterdisplay) {
		if (Main.k.folding.busy) return;
		Main.k.folding.busy = true;
		Main.k.folding.displayed = newdisplay;

		// Get cols to fold
		var tofold = [null, null, null];
		for (var i=0; i<Main.k.folding.currcols.length; i++) {
			if (cols[i]) {
				if (cols[i] != Main.k.folding.currcols[i]) tofold[i] = Main.k.folding.currcols[i];
			} else if (Main.k.folding.currcols[i] != Main.k.folding.gamecols[i]) {
				tofold[i] = Main.k.folding.currcols[i];
			}
		}

		// Unfolding
		var after = function() {
			// Get cols to unfold
			var tounfold = [null, null, null];
			for (var i=0; i<Main.k.folding.currcols.length; i++) {
				// If a new col is wanted here
				if (cols[i]) {
					if (cols[i] != Main.k.folding.currcols[i]) tounfold[i] = cols[i];

				// Else display game col
				} else if (Main.k.folding.currcols[i] != Main.k.folding.gamecols[i]) {
					tounfold[i] = Main.k.folding.gamecols[i];
				}
			}

			// Unfold
			Main.k.folding.unfold(tounfold, function() {
				Main.k.folding.busy = false;
				if (afterdisplay && typeof afterdisplay == 'function') afterdisplay();
			});
		};

		// Fold previous cols, then unfold new cols
		Main.k.folding.fold(tofold, after);
	};
	Main.k.folding.displayGame = function(afterdisplay) {
		if (Main.k.folding.busy) return;
		Main.k.folding.busy = true;
		Main.k.folding.displayed = "game";

		// Get cols to fold
		var tofold = [null, null, null];
		for (var i=0; i<Main.k.folding.currcols.length; i++) {
			if (Main.k.folding.currcols[i] != Main.k.folding.gamecols[i]) tofold[i] = Main.k.folding.currcols[i];
		}

		// Unfolding
		var after = function() {
			// Get cols to unfold
			var tounfold = [null, null, null];
			for (var i=0; i<Main.k.folding.currcols.length; i++) {
				// Display game col
				if (Main.k.folding.currcols[i] != Main.k.folding.gamecols[i]) {
					tounfold[i] = Main.k.folding.gamecols[i];
				}
			}

			// Unfold
			Main.k.folding.unfold(tounfold, function() {
				Main.k.folding.busy = false;
				if (afterdisplay) afterdisplay();
			});
		};

		// Fold previous cols, then unfold new cols
		Main.k.folding.fold(tofold, after);
	};
	Main.k.folding.fold = function(cols, after) {
		// Init CSS transform
		for (var i=0; i<cols.length; i++) {
			if (cols[i]) $(cols[i]).css({
				"transform": "scale(0,1)",
				"-o-transform": "scale(0,1)",
				"-webkit-transform": "scale(0,1)"
			});
		}

		setTimeout(function() {
			// Hide previous cols
			for (var i=0; i<cols.length; i++) {
				if (cols[i]) {
					var $col = $(cols[i]);
					if(cols[i] == '#room_col'){
						//jQuery n'arrive pas à récupérer la largeur réelle de la cellule, si quelqu'un a une solution...
						//$col.data('width', $col.width());
						$col.data('width', 436);
						$col.css({width:0});
						$col.children().each(function(){
							$(this).data('width', $(this).width());
						});
						$col.children().css({width: 0});
					}else{
						$col.hide();
					}
				}
			}

			if (after) after();
		}, 250);
	};
	Main.k.folding.unfold = function(cols, after) {
		// Display new cols
		for (var i=0; i<cols.length; i++) {
			if (cols[i]) {
				var $col = $(cols[i]);
				if(cols[i] == '#room_col'){
					$col.css({width:$col.data('width') + 'px'});
					$col.children().each(function(){
						$(this).css('width', $(this).data('width') + 'px');
					})
				}else{
					$col.show();
				}
			}
		}

		setTimeout(function() {
			// Init CSS transform
			for (var i=0; i<cols.length; i++) {
				if (cols[i]) $(cols[i]).css({
					"transform": "scale(1,1)",
					"-o-transform": "scale(1,1)",
					"-webkit-transform": "scale(1,1)"
				});
			}

			setTimeout(function() {
				// Update current cols
				for (var i=0; i<cols.length; i++) {
					if (cols[i]) Main.k.folding.currcols[i] = cols[i];
				}

				if (after) after();

			}, 230);
		}, 20);
	};

	Main.k.About = {};
	Main.k.About.initialized = false;
	Main.k.About.open = function() {//TODO: MULTILANG
		if (Main.k.folding.displayed == "about") {
			Main.k.folding.displayGame();
			return;
		}

		if (!Main.k.About.initialized) {
			Main.k.About.initialized = true;

			var td = $("<td>").addClass("").css({
				"padding-right": "6px",
				"padding-top": "1px",
				transform: "scale(0,1)",
				color: "rgb(9,10,97)"
			}).attr("id", "about_col").appendTo($("table.inter tr").first());

			// Logo

			// Links
			var links = $("<div>").css({
				"text-align": "center"
			}).appendTo(td);
			$("<img>").css({
				height: "100px",
				margin: "0 auto 0px"
			}).attr("src", Main.k.servurl + "/img/ctrlw1.png").appendTo(links);
			$("<br/>").appendTo(links);
			Main.k.MakeButton("<img src='/img/icons/ui/planet.png' /> Groupe Twinoid", 'http://twinoid.com/g/ctrl-w').css({
				margin: "0 2px",
				display: "inline-block"
			}).appendTo(links);
			Main.k.MakeButton("<img src='/img/icons/ui/talkie.png' /> Chan IRC", "http://webchat.quakenet.org/?channels=#ctrlw").css({
				margin: "0 2px",
				display: "inline-block"
			}).appendTo(links)
			.find("a").attr("_title", Main.k.text.gettext("Chan IRC"))
			.attr("_desc", Main.k.text.gettext("Venez discuter sur IRC avec les autres utilisateurs du script. \
			Vous pourrez également y trouver de l'aide ou faire des suggestions.</p><p><strong>Chan #ctrlw sur Quakenet</strong>"))
			.on("mouseover", Main.k.CustomTip).on("mouseout", Main.k.hideTip);

			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> "+Main.k.text.gettext("Topic (Forum Mush)"),
				/* Translators: Script topic (Mush forum) */
					Main.k.text.gettext("http://twd.io/e/0fdb0w")).css({
					margin: "0 2px",
					display: "inline-block"
				}
			).appendTo(links);

			// Disclaimer
			$("<p>").css({
				margin: "20px",
				color: "#CCC",
				"text-align": "center"
			}).html(Main.k.text.gettext("Script développé par <a href='http://twinoid.com/user/8297'>kill0u</a>, maintenu par <a href='http://twinoid.com/user/1244143'>badconker</a><br/>"+
			"Le logo, les images (mise en forme personnalisée des messages) et le design du site web ont été faits par "+
			"<a href='http://twinoid.com/user/2992052'>Gnux</a>.<br/>"+
			Main.k.text.gettext("Contributeurs : ") + "<a href='http://twinoid.com/user/362197'>FloKy</a>" +
				", <a href='http://twinoid.com/user/5140898'>_Fraise__</a>"+
				", <a href='http://twinoid.com/user/8011565'>NightExcessive</a><br/>"+
			Main.k.text.gettext("Traducteurs : ") + "<a href='http://twinoid.com/user/7845671'>Avistew (en)</a>, <a href='http://twinoid.com/user/6031682'>Kohaku (es)</a>, <a href='http://twinoid.com/user/531084'>R3my (es)</a>, <br/><a href='http://twinoid.com/user/21696'>Javiernh (es)</a>")).appendTo(td);

			// Coming soon
			/*$("<h2>").css({
				color: "#EEE",
				margin: "10px 15px 0"
			}).html("Fonctionnalités à venir&nbsp;:").appendTo(td);
			var ul = $("<ul>").css({
				margin: "0 20px 0 30px",
				color: "#CCC",
				"list-style-type": "square"
			}).appendTo(td);
			$("<li>").html("Enregistrement (manuel) des informations sur les joueurs").appendTo(ul);
			$("<li>").html("Amélioration du Manager").appendTo(ul);
			$("<li>").html("Amélioration de la gestion des plantes").appendTo(ul);
			$("<li>").html("Gestion des médicaments et de la nourriture").appendTo(ul);
			$("<li>").html("Gestion des animations distributeur").appendTo(ul);
			$("<li>").html("Informations sur le démontage d'objets").appendTo(ul);
			$("<li>").html("Assistant Admin. Neron + messages pré-enregistrés").appendTo(ul);
			$("<li>").html("Whiteboard (surprise)").appendTo(ul);
			$("<li>").css("list-style-type", "none").html("<a href='" + Main.k.website + "'>Liste des mises à jour</a>").appendTo(ul);*/

			// Close
			var close = $("<div>").css({
				"text-align": "center",
				margin: "30px 0 0"
			}).appendTo(td);
			Main.k.MakeButton("<img src='/img/icons/ui/pageleft.png' /> "+Main.k.text.gettext("Retour au jeu"), null, Main.k.About.open).css("display", "inline-block").appendTo(close);
		}

		Main.k.folding.display([null,null, "#about_col"], "about");
	};

	// == Sync Manager  ========================================
	Main.k.Sync = {};
	Main.k.Sync.initialized = false;
	Main.k.Sync.push_timer = null;
	Main.k.Sync.open = function(){
		if(!Main.k.Sync.initialized){
			this.initialized = true;
			var td = $("<td>").addClass("chat_box ctrlw_col").css({
				"padding-right": "6px",
				"padding-top": "1px",
				transform: "scale(0,1)"
			}).attr("id", "sync_col").appendTo($("table.inter tr").first());

			var regex = new RegExp('[0-9]+$');
			var result = regex.exec($('#tid_openRight').attr('href'));
			var sync_key = localStorage.getItem('ctrlw_sync_key');
			$('<p>').addClass('ctrlw-row-options').append(
				$('<label>')
					.html('<span style="display: inline-block; width:10%">'+Main.k.text.gettext("Clé :")+'</span>')
					.append(
						$('<input>')
							.attr({
								type: 'text',
								placeholder: Main.k.text.gettext('Collez votre clé ici'),
								id:'ctrlw-sync-key'
							})
							.css({
								'text-align': 'center',
								display: 'inline-block',
								width: '80%',
								'margin-right': '10px'
							})
							.data('val',localStorage.getItem('ctrlw_sync_key'))
							.val(sync_key != null ? sync_key : '')
							.on('paste',function(elem){
								var $this = $(this);
								setTimeout(function () {
									var val = $this.val();
									var old_val = $this.data('val');
									if (val.length > 20 && localStorage.getItem('ctrlw_sync_key') != val && old_val != val) {
										var $status_sync = $('.status_sync');
										$status_sync.hide();
										$('.status_sync_load').show();
										$.when(Main.k.Sync.pull(val)).then(function () {
											localStorage.setItem('ctrlw_sync_key', val);
											$status_sync.hide();
											$('.status_sync_ok').show();
										}).fail(function () {
											$status_sync.hide();
											$('.status_sync_ko').show();

										});

									}
									$this.data('val', val);
								},10);
							})
					)
					.append(
						$('<div>')
							.css({
								display: 'inline-block',
								position: 'relative',
								top: '2px'
							})
							.append(
								$('<img>')
									.attr({
										'src': '/img/icons/ui/alert.png'
									})
									.addClass('status_sync status_sync_ko')
									.css({
										'margin-left': '5px',
										display: (sync_key != null ? 'none' : 'inline'),
										position: 'relative',
										top: '-2px'
									})
							)
							.append(
								$('<img>')
									.attr({
										'src': '/img/icons/ui/reported.png'
									})
									.addClass('status_sync status_sync_ok')
									.css({
										'margin-left': '5px',
										display: (sync_key == null ? 'none' : 'inline')
									})
							)
							.append('<img class="cdLoading status_sync status_sync_load" src="/img/icons/ui/loading1.gif" alt="loading..." style="display:none"/>')

					)
			)
			.appendTo(td);
			$('<p>')
				.css({
					'text-align': 'center'
				})
				.append(
					Main.k.MakeButton("<img src='/img/icons/ui/neron_fluw.png' /> "+Main.k.text.gettext("Générer une nouvelle clé"), null, Main.k.Sync.createKey)
						.css("display", "inline-block")
						.addClass('ctrlw')
				)
			.appendTo(td);
			$('<p>')
				.css({
					'text-align': 'center'
				})
				.append(
				Main.k.MakeButton("<img src='http://imgup.motion-twin.com/twinoid/6/4/6666e528_4030.jpg' /> "+Main.k.text.gettext("Supprimer la clé"), null, function(){
						if(confirm(Main.k.text.gettext('Si vous supprimez la clé, vous ne pourrez plus synchroniser vos données, voulez vous continuer ?'))){
							$('.status_sync').hide();
							$('.status_sync_ko').show();
							localStorage.removeItem('ctrlw_sync_key');
							$('#ctrlw-sync-key').val('');
						}
					})
					.css("display", "inline-block")
					.addClass('ctrlw')
				)
				.appendTo(td);
			$('<p class="info">')
				.html(Main.k.text.gettext("Afin de pouvoir synchroniser vos données vous devez entrer votre clé d'authentification. " +
					"Si vous n'en n'avez pas, cliquez sur le bouton \"Générer une nouvelle clé\""))
				.appendTo(td);
			$('<p class="warning">'+Main.k.text.gettext("Conservez précieusement votre clé (dans votre bloc-note Twinoid par exemple) afin de pouvoir récupérer vos données.")+'<p>')
				.appendTo(td);
		}
		Main.k.folding.display([null,null, "#sync_col"], "sync", function() {
		});
	};
	Main.k.Sync.display = function(surname) {
		if (Main.k.folding.displayed == "sync") {
			Main.k.Sync.close();
		}else{
			Main.k.Sync.open();
		}
	};
	Main.k.Sync.close = function(){
		Main.k.folding.displayGame();
	};
	Main.k.Sync.createKey = function(){
		var $status_sync = $('.status_sync');
		$status_sync.hide();
		$('.status_sync_load').show();
		GM_xmlhttpRequest({
			url :Main.k.servurl + "/sync/createkey",
			method: "GET",
			onload: function(json) {
				$status_sync.hide();
				$('.status_sync_ok').show();
				try {
					json = JSON.parse(json.response);
				} catch (e) {
					Main.k.quickNoticeError('Une erreur serveur s\'est produite');
					console.error('json key',json);
					return false;
				}
				localStorage.setItem('ctrlw_sync_key',json.key);
				$('#ctrlw-sync-key').val(json.key);
				Main.k.Sync.push();
			},
			onerror: function(xhr,statut,http){
				var message = JSON.parse(xhr.responseText).message;
				$status_sync.hide();
				$('.status_sync_ko').show();
				Main.k.quickNoticeError('Une erreur s\'est produite : '+ message);
				console.warn(xhr,statut,http);
			}
		});
	};
	Main.k.Sync.pull = function(key) {
		console.info('Main.k.Sync.pull');
		var dfd = new jQuery.Deferred();
		if(typeof(key) == 'undefined'){
			key = localStorage.getItem('ctrlw_sync_key');
		}
		if(key == null){
			dfd.reject('key_null');
		}else{
			var button = $('#ctrlw_sync_button');
			button.find('img').hide();
			button.find('.ctrlw_down').show();
			console.log('Main.k.Sync.pull request');
			GM_xmlhttpRequest({
				method: 'POST',
				url : Main.k.servurl + "/sync/pull",
				data : $.param({
					last_update_time : localStorage.getItem('ctrlw_sync_last_update_time'),
					key: key
				}),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					button.find('img').hide();
					button.find('.ctrlw_normal').show();
					if(response.status == 200){
						var json = JSON.parse(response.responseText);
						console.log('Main.k.Sync.pull response',json);
						if(json.error == 'auth'){
							Main.k.quickNoticeError('Cette clé n\'existe pas');
							dfd.reject('auth');
						}else{
							if(json.status == 'outdated'){
								console.warn(JSON.parse(json.sync.profiles));
								Main.k.Profiles.load(json.sync.profiles,true);
								if(typeof(json.sync.msgs_prerecorded) != 'undefined'){
									Main.k.Manager.loadMsgsPrerecorded(json.sync.msgs_prerecorded,true);
								}
								Main.k.GameInfos.load(json.sync.game_infos);
								Main.k.quickNotice(Main.k.text.gettext('Synchronisation effectuée'));
								Main.k.MushUpdate();
							}
							dfd.resolve();
						}
					}else{
						Main.k.quickNoticeError('Sync pull, fatal error');
					}


				},
				onerror: function(xhr,statut,http){
					alert('error Main.k.Sync.pull');
					console.warn(xhr,statut,http);
					button.find('img').hide();
					button.find('.ctrlw_normal').show();
					dfd.reject('ajax_error');


				}
			});
		}

		return dfd.promise();
	};
	Main.k.Sync.push = function(force_push) {
		console.info('xhr Sync.push1');
		var key = localStorage.getItem('ctrlw_sync_key');
		if(key == null){
			return;
		}
		if(typeof(force_push) == 'undefined'){
			force_push = false;
		}
		var button = $('#ctrlw_sync_button');
		button.find('img').hide();
		button.find('.ctrlw_up').show();
		console.info('xhr Sync.push2');
		setTimeout(function() {
			GM_xmlhttpRequest({
				method: "POST",
				url: Main.k.servurl + "/sync/push",
				data : $.param({
					last_update_time : localStorage.getItem('ctrlw_sync_last_update_time'),
					mush_time: $('#input').attr('now'),
					profiles: JSON.stringify(Main.k.Profiles.data),
					game_infos: JSON.stringify(Main.k.GameInfos.data),
					msgs_prerecorded: JSON.stringify(Main.k.Manager.msgs_prerecorded),
					key: key,
					force : force_push ? 1 : 0
				}),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					console.warn('response',response);

					if(response.status == 200){
						/** @type {{sync:<Object{updated_at:string}>,status:string}} **/
						var json = JSON.parse(response.responseText);
						console.warn('json',json);
						//json = JSON.parse(localStorage.getItem('ctrlw_json_test'));
						if(json.status == 'ok'){
							localStorage.setItem('ctrlw_sync_last_update_time',$('#input').attr('now'));
						}else{
							console.warn('json.status',json.status);
							if(typeof(json.status) !='undefined'){
								if(typeof(json.error) !='undefined' && json.error == 'auth'){
									Main.k.quickNoticeError(Main.k.text.gettext('Synchronisation impossible, clé incorrecte'));
								}else{
									var popup = Main.k.CreatePopup();
									popup.content.css({
										"height": "auto",
										"max-height": "90%",
										"width": "700px",
										"color": "#FFF"
									});

									// Fill popup content
									var content = "<div class='sync_ask popup-content'>" + Main.k.text.gettext('Les données distantes sont plus récentes que les données locales. <br/> Que voulez vous faire ?') + '<br/>' +
										Main.k.text.gettext('Date synchro serveur : ') + new Date(json.sync.mush_time) + '<br/>' +
										Main.k.text.gettext('Date synchro locale : ') + new Date(parseInt(localStorage.getItem('ctrlw_sync_last_update_time'))) +
										"</div>";
									var buttons = $("<div class='popup-actions'>" +
														"<div id=\"confirm_pull\" class=\"but updatesbtn\" >" +
															"<div class=\"butright\">" +
																"<div class=\"butbg\">" +
																	"<a href=\"#\">"+Main.k.text.gettext("Ecraser les données locales")+"</a>" +
																"</div>" +
															"</div>" +
														"</div>" +
														"<div id=\"confirm_push\" class=\"but updatesbtn\" >" +
															"<div class=\"butright\">" +
																"<div class=\"butbg\">" +
																	"<a href=\"#\">"+Main.k.text.gettext("Ecraser les données distantes")+"</a>" +
																"</div>" +
															"</div>" +
														"</div>" +
													 "</div>");
									buttons.find('#confirm_pull').on('click',function(e){
										e.preventDefault();
										Main.k.Sync.pull();
										Main.k.ClosePopup();
									});
									buttons.find('#confirm_push').on('click',function(e){
										e.preventDefault();
										Main.k.Sync.push(true);
										Main.k.ClosePopup();
									});
									var cancelAc = "'Main.k.ClosePopup();'";
									var cancel = "<div id=\"cancel\" class=\"but updatesbtn\" onclick=" + cancelAc + "><div class=\"butright\"><div class=\"butbg\"><a href=\"#\">" + Main.getText("cancel") + "</a></div></div></div></div>";
									buttons.append(cancel);
									$("<div>").html(content).append(buttons).appendTo(popup.content);

									// Display popup
									Main.k.OpenPopup(popup.dom);
									//Main.k.Sync.pull();
								}
							}
						}
						button.find('img').hide();
						button.find('.ctrlw_normal').show();
					}else{
						Main.k.quickNoticeError('Sync push, fatal error');
					}


				},
				onerror: function(xhr,statut,http){
					alert('error Main.k.Sync.push');
					console.warn(xhr,statut,http);
				}
			});
		}, 0);
	};
	Main.k.Sync.pushDelay = function() {
		var delay = 5;
		var key = localStorage.getItem('ctrlw_sync_key');
		if(key == null){
			return;
		}
		var button = $('#ctrlw_sync_button');
		button.find('img').hide();
		button.find('.ctrlw_wheels').show();
		clearTimeout(Main.k.Sync.push_timer);
		button.removeClass('loading');

		/* trick for reset animation */
		var button_clone = button.clone(true);
		button.before(button_clone).remove();
		button = button_clone;

		var counter = button.find('.counter');
		Main.k.countdownTimer.stop('syncdelay');
		button.addClass('loading');
		counter.text(delay);
		Main.k.countdownTimer.go(delay,'syncdelay',function(count){
			button.find('.counter').text(count);
			if(count <= 0){
				counter.text('');
			}
		});
		Main.k.Sync.push_timer = setTimeout(function(){
			button.find('img').hide();
			button.find('.ctrlw_normal').show();
			button.removeClass('loading');
			Main.k.Sync.push();
			Main.k.Sync.push_timer = null;
		},delay * 1000);
	};
	callbacks_storage_sync.add(Main.k.Sync.pushDelay);


	// == /Sync Manager  =======================================

	// == Profiles Manager  ========================================
	Main.k.Profiles = {};
	Main.k.Profiles.initialized = false;
	Main.k.Profiles.current = null;
	Main.k.Profiles.data = {};
	Main.k.Profiles.open = function() {
		/** @type {{surname:string,statuses:List, titles:List, dev_surname:string}} **/
		var o_hero;
		console.log('Main.k.folding.displayed',Main.k.folding.displayed);
		if (!Main.k.Profiles.initialized) {
			Main.k.Profiles.initialized = true;
			var h = Main.k.h[Main.k.Profiles.current];
			console.log(h);
			var td = $("<td>").addClass("chat_box ctrlw_col").css({
				"padding-right": "6px",
				"padding-top": "1px",
				transform: "scale(0,1)",
				color: "rgb(9,10,97)"
			}).attr("id", "profile_col").appendTo($("table.inter tr").first());

			var header = $("<div>").addClass("header").css({
				background: "rgba(52,74,146,0.35)"
			}).appendTo(td);
			$("<img>").css({
				height: "120px",
				float: "left",
				margin: "4px"
			}).attr("src", "/img/art/char/" + h.dev_surname_long + ".jpg").appendTo(header);
			$("<h3>").css({
				position: "relative",
				margin: "2px 5px 5px 94px",
				color: "#EEE",
				"border-bottom": "2px solid #EEE",
				"padding-bottom": "2px",
				"font-size": "17px"
			}).html("<span>" + Main.k.getFullName(Main.k.Profiles.current) + "</span>").appendTo(header);
			Main.k.MakeButton("<img src='/img/icons/ui/awake.png' />",null,function(event) {
				Main.k.Profiles.set(Main.k.Profiles.current);
			}).css({
				position: "absolute",
				top: "2px",
				right: "3px"
			})
				.addClass('spy ctrlw')
				.appendTo($("h3",header)).find("a")
				.attr("_title", Main.k.text.gettext("Espionnage"))
				.attr("_desc", Main.k.text.gettext("<p>Vous êtes dans la même pièce que cette personne ; vous pouvez donc l'examiner de plus près.</p><p><strong>Cliquez ici pour enregistrer les compétences visibles, statuts publiques et titres de ce personnage.</strong><p>"))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

			$('<div>')
				.addClass('hero-details')
				.appendTo(header);
			$("<div>").addClass("clear").appendTo(header);
			var r = $("<div>").addClass("right").css({
				"margin-top": "10px"
			}).appendTo(td);
			var $notes = $("<div>").attr("id", "profile-notes").addClass("rightbg chattext").css({
				resize: "none",
				height: "293px",
				"min-height": "0"
			}).appendTo(r);
			$notes
				.append(
					$('<div>').addClass('profile-content')
						.append(
							$('<label>')
								.attr('for','tiny-notes')
								.html('<img src="/img/icons/ui/infoalert.png" style="vertical-align: text-bottom"/> '+Main.k.text.gettext('Notes résumées :'))
								.addTooltip(Main.k.text.gettext('Notes résumées :'),Main.k.text.gettext('Ce texte apparaitra au survol de la souris sur l\'icone du personnage à la place de la description originale du jeu'))
						)
							.append(
							$('<textarea>')
								.addClass('chatbox')
								.attr('id','tiny-notes')
								.on('focus',function(){$(this).addClass('chatboxfocus');})
								.on('keyup',function(){
									$('.desc-submit-button img').hide();
									$('.desc-submit-button img.desc-ko').show();
								})
						)
							.append(
							$('<label>')
								.attr('for','long-notes')
								.text(Main.k.text.gettext('Notes détaillées :'))
						)
							.append(
							$('<textarea>')
								.addClass('chatbox')
								.attr('id','long-notes')
								.on('focus',function(){$(this).addClass('chatboxfocus');})
								.on('keyup',function(){
									$('.desc-submit-button img').hide();
									$('.desc-submit-button img.desc-ko').show();
								})
						)
				);
			var $actions = $('<div>').addClass('actions').appendTo($notes);

			Main.k.MakeButton(
					"<img src='/img/icons/ui/alert.png' style=\"display:none\" class=\"desc-ko\" /><img class=\"desc-ok\" style='vertical-align:text-bottom' src='/img/icons/ui/projects_done.png' /> "+Main.k.text.gettext('Enregistrer'),
					null,
					function(e){
						e.preventDefault();
						var profile = Main.k.Profiles.get();
						profile.short_desc = $('#tiny-notes').val();
						profile.long_desc = $('#long-notes').val();
						Main.k.Profiles.set(profile);
						$('.desc-submit-button img').hide();
						$('.desc-submit-button img.desc-ok').show();
					}
				)
				.css("display", "inline-block")
				.addClass('desc-submit-button')
				.appendTo($actions);

			var close = $("<div>").css({
				"text-align": "center",
				margin: "10px 0 0"
			}).appendTo(td);
			Main.k.MakeButton("<img src='/img/icons/ui/pageleft.png' /> "+Main.k.text.gettext('Retour au jeu'), null, Main.k.Profiles.close).css("display", "inline-block").appendTo(close);

		}
		Main.k.Profiles.update();
		Main.k.folding.display([null,null, "#profile_col"], "profiles", function() {
		});
	};
	Main.k.Profiles.display = function(surname) {
		console.group('Main.k.Profiles.display');
		console.log('surname',surname);
		console.log(Main.k.folding.displayed +' == "profiles" && ' + surname + ' == '+ Main.k.Profiles.current);
		if (Main.k.folding.displayed == "profiles" && surname == Main.k.Profiles.current) {
			Main.k.Profiles.close();
		}else{
			Main.k.Profiles.current = surname;
			Main.k.Profiles.open();
		}
		console.groupEnd();
	};
	Main.k.Profiles.update = function() {
		console.group('Main.k.Profiles.update');
		if(Main.k.Profiles.current == null){
			return;
		}
		console.log('Main.k.Profiles.current',Main.k.Profiles.current);
		var $profile_col = $("#profile_col");
		var $header = $profile_col.find(".header");
		var $hero_details = $profile_col.find('.hero-details');

		var $this = this;
		var h = Main.k.h[Main.k.Profiles.current];

		$hero_details.empty();

		// Display hero
		$header.find("img").first().attr("src", "/img/art/char/" + h.dev_surname_long + ".jpg");
		$header.find("h3 span").html(Main.k.getFullName(Main.k.Profiles.current));

		var o_hero = this.get(Main.k.Profiles.current);
		var $spy_button = $profile_col.find('.spy');
		if($.inArray(Main.k.Profiles.current,Main.k.heroes_same_room) != -1){
			$spy_button.show();
		}else{
			$spy_button.hide();
		}
		console.log('o_hero',o_hero);
		if(o_hero != null){
			var statuses = $("<div>").addClass("icons statuses");
			$.each(o_hero.statuses,function(k,status){
				$("<img>").attr("src", "/img/icons/ui/status/" + status.img + ".png")
					.attr("alt", status.img)
					.attr("_title", status.name)
					.attr("_desc", status.desc)
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip)
					.appendTo(statuses);
			});
			if(typeof(o_hero.spores) != 'undefined' && o_hero.spores != null){
				console.warn(o_hero.spores);
				var $spores = $('<div>')
					.css({
						position: 'relative',
						display: 'inline-block',
						'margin-left': '2px',
						top: '2px'
					})
					.appendTo(statuses);

				$("<img>").attr("src", "/img/icons/ui/spore.png")
					.attr("height", "16").attr("alt", o_hero.spores.name)
					.attr("_title", o_hero.spores.name)
					.attr("_desc", o_hero.spores.desc)
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip)
					.appendTo($spores);

				$('<span>')
					.text(o_hero.spores.nb)
					.css({
						color: '#FFF',
						'font-size': "10px",
						position: 'absolute',
						left: '4px',
						top: '1px',
						opacity: 0.7,
						'pointer-events': 'none'

					})
					.appendTo($spores);
			}

			var skills = $("<div>").addClass("icons skills");
			$.each(o_hero.skills,function(k,skill){
					var skilldom = $("<span>").addClass("skill").appendTo(skills);

					$("<img>").attr("src", "/img/icons/skills/" + skill.img + ".png")
						.attr("height", "19").attr("alt", skill.img)
						.attr("_title", skill.name)
						.attr("_desc", skill.desc + (Main.k.compInactiveMush[skill.img] ? "<p><strong>"+Main.k.text.gettext("Compétence inactive mush")+"</strong></p>" : ""))
						.on("mouseover", Main.k.CustomTip)
						.on("mouseout", Main.k.hideTip)
						.appendTo(skilldom);

					if (Main.k.compInactiveMush[skill.img]) {
						$("<img>").attr("src", Main.k.servurl + "/img/non-mush.png").addClass("actmush")
							.attr("width", "10").attr("height", "10")
							.attr("_title", Main.k.text.gettext("Compétence inactive mush"))
							.attr("_desc", Main.k.text.gettext("Cette compétence est inactive quand on est mush (source : Twinpedia)."))
							.on("mouseover", Main.k.CustomTip)
							.on("mouseout", Main.k.hideTip)
							.appendTo(skilldom);
					}
			});

			var titles = $("<div>")
				.css({
					position: 'absolute',
					right: '5px',
					top: 0
				})
				.addClass("titles");
			console.info('o_hero.titles',o_hero.titles);
			$.each(o_hero.titles,function(k,title){
				console.log(title);
				$("<img>").attr("src", "/img/icons/ui/" + title.img + ".png")
					.attr("alt", title.img)
					.attr("_title", title.name)
					.attr("_desc", title.desc)
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip)
					.appendTo(titles);
			});

			$hero_details.append(skills);
			$hero_details.append(statuses);
			$hero_details.append(titles);

			$('#long-notes').val(typeof(o_hero.long_desc) != 'undefined' ? o_hero.long_desc : '');
			$('#tiny-notes').val(o_hero.short_desc);

		}else{
			$("<div>")
				.html(Main.k.text.gettext('Aucune donnée enregistrée'))
				.css({
					color:'#FFF'
				})
				.appendTo($hero_details);

		}
		var $custom_infos = $('<div>').addClass('profile-custom-infos').appendTo($hero_details);
		$('<label />')
			.attr('for','hero_details_dead')
			.append(
				$('<img>')
					.attr({
						src: '/img/icons/ui/dead.png',
						alt: Main.k.text.gettext('Mort'),
						title: Main.k.text.gettext('Mort')
					})
			)
			.append(
				$('<input />')
					.attr({
						id: 'hero_details_dead',
						type: 'checkbox'
					})
					.prop('checked',o_hero.dead)
					.on('change',function(){
						var o_hero = $this.get();
						o_hero.dead = $(this).prop('checked');
						$this.set(o_hero);
					})
			)
			.appendTo($custom_infos);
		$('<label />')
			.attr('for','hero_details_inactive')
			.append(
				$('<img>')
					.attr({
						src: '/img/icons/ui/'+Main.k.statuses['inactive']['img']+'.png',
						alt: Main.k.statuses.inactive.name,
						title: Main.k.statuses.inactive.name
					})
				)
			.append(
				$('<input />')
					.attr({
						id: 'hero_details_inactive',
						type: 'checkbox'
					})
					.prop('checked',$this.hasAttr(o_hero,'statuses',Main.k.statuses['inactive']['img']))
					.on('change',function(){
						var o_hero = $this.get();
						if($(this).prop('checked')){
							o_hero.statuses.push(Main.k.statuses['inactive']);
						}else{
							o_hero = $this.removeAttrFromProfile(o_hero,'statuses',Main.k.statuses['inactive']['img']);
						}
						$this.set(o_hero);
						$this.update();
					})
			)
			.appendTo($custom_infos);
		$('<label />')
			.attr('for','hero_details_hinactive')
			.append(
				$('<img>')
					.attr({
						src: '/img/icons/ui/'+Main.k.statuses['hinactive']['img']+'.png',
						alt: Main.k.statuses.hinactive.name,
						title: Main.k.statuses.hinactive.name
					})
				)
			.append(
				$('<input />')
					.attr({
						id: 'hero_details_hinactive',
						type: 'checkbox'
					})
					.prop('checked',$this.hasAttr(o_hero,'statuses',Main.k.statuses['hinactive']['img']))
					.on('change',function(){
						var o_hero = $this.get();
						if($(this).prop('checked')){
							o_hero.statuses.push(Main.k.statuses['hinactive']);
						}else{
							o_hero = $this.removeAttrFromProfile(o_hero,'statuses',Main.k.statuses['hinactive']['img']);
						}
						$this.set(o_hero);
						$this.update();
					})
			)
			.appendTo($custom_infos);
			$('<label />')
				.attr('for','hero_details_mush')
				.append(
				$('<img>')
					.attr({
						src: '/img/icons/ui/'+Main.k.statuses['mush']['img']+'.png',
						alt: Main.k.statuses.mush.name,
						title: Main.k.statuses.mush.name
					})
				)
				.append(
				$('<input />')
					.attr({
						id: 'hero_details_mush',
						type: 'checkbox'
					})
					.prop('checked',$this.hasAttr(o_hero,'statuses',Main.k.statuses['mush']['img']))
					.on('change',function(){
						var o_hero = $this.get();
						if($(this).prop('checked')){
							o_hero.statuses.push(Main.k.statuses['mush']);
						}else{
							o_hero = $this.removeAttrFromProfile(o_hero,'statuses',Main.k.statuses['mush']['img']);
						}
						$this.set(o_hero);
						$this.update();
					})
			)
				.appendTo($custom_infos);
		console.groupEnd();
	};
	Main.k.Profiles.create = function(dev_surname){
		return {
			'name': Main.k.h[dev_surname].name,
			'dev_surname': dev_surname,
			'short_desc': Main.k.h[dev_surname].short_desc,
			'long_desc': '',
			'statuses': [],
			'titles': [],
			'skills': [],
			'dead': false
		};
	};
	Main.k.Profiles.set = function(profile,save){
		if(save == null){
			save = true;
		}
//		console.group('Main.k.Profiles.save');
//		console.log('profile',profile);
		var profiles = this.data;
		if(profiles == null){
			profiles = {};
		}
		if(typeof(profile) == 'string'){
			profile = this.convertHeroToProfile(Main.k.getHeroBySurname(profile));
		}
		profiles[profile.dev_surname] = profile;
		this.data = profiles;
		console.groupEnd();
		if(save){
			this.save();
			Main.k.MushUpdate();
		}
	};
	Main.k.Profiles.get = function(hero){
		if(typeof(hero) == 'undefined'){
			hero = Main.k.Profiles.current;
		}
		var profiles = this.data;
		if(profiles != null && typeof(profiles[hero]) != 'undefined') {
			console.groupEnd();
			return profiles[hero];
		}else{
			console.groupEnd();
			return Main.k.Profiles.create(hero);
		}
	};
	Main.k.Profiles.save = function() {
		localStorage.setItem('ctrlw_profiles',JSON.stringify(this.data));
		callbacks_storage_sync.fire();
	};
	Main.k.Profiles.load = function(profiles,json) {
		console.info('Main.k.Profiles.load');
		var profiles_json;
		if(typeof(profiles) != 'undefined'){
			if(typeof(json) != 'undefined' && !json){
				profiles_json = JSON.stringify(profiles);
			}else{
				profiles_json = profiles;
				profiles = JSON.parse(profiles);
			}
			this.data = profiles;
			localStorage.setItem('ctrlw_profiles',profiles_json);
		}else{
			profiles_json = localStorage.getItem('ctrlw_profiles');
			if(profiles_json != null){
				this.data = JSON.parse(profiles_json);
			}
		}

	};
	Main.k.Profiles.convertHeroToProfile = function(o_hero_orig) {
		console.group('convertHeroToSimpleHero');
		console.log('o_hero_orig',o_hero_orig);
		var profile = this.get(o_hero_orig.dev_surname);
		if(profile == null){
			profile = Main.k.Profiles.create(o_hero_orig.dev_surname);
		}
		profile.statuses = [];
		profile.titles = [];
		profile.skills = [];
		profile.spores = null;
		profile.name = o_hero_orig.name;
		profile.dev_surname = o_hero_orig.dev_surname;
		profile.dead = false;
		if (o_hero_orig.statuses) {
			var $_statuses = o_hero_orig.statuses.iterator();
			while( $_statuses.hasNext() ) {
				/** @type {{img:string,desc:string}} **/
				profile.statuses.push($_statuses.next());
			}
		}

		var skills = $("<div>").addClass("icons skills");
		if (o_hero_orig.skills) {
			var $_skills = o_hero_orig.skills.iterator();
			while( $_skills.hasNext() ) {
				profile.skills.push($_skills.next());
			}
		}

		var titles = $("<div>").addClass("titles");
		if (o_hero_orig.titles) {
			var $_titles = o_hero_orig.titles.iterator();
			while( $_titles.hasNext() ) {
				profile.titles.push($_titles.next());
			}
		}
		if (o_hero_orig.spores) {
			profile.spores = o_hero_orig.spores;
		}
		console.groupEnd();
		return profile;
	};
	Main.k.Profiles.removeAttrFromProfile = function(profile,type_attribute,value,key_value){
		console.warn('avant',profile[type_attribute]);
		if(typeof(key_value) == 'undefined'){
			key_value = 'img';
		}
		var index_to_remove = null;
		for(var i = 0; i<profile[type_attribute].length; i++){
			if(profile[type_attribute][i][key_value] == value){
				index_to_remove = i;
			}
		}
		console.warn('milieu',index_to_remove,profile[type_attribute]);
		if(index_to_remove != null){
			profile[type_attribute].splice(index_to_remove,1);
		}
		console.warn('apres',profile[type_attribute]);
		return profile;
	};
	Main.k.Profiles.hasAttr = function(profile,type_attribute,value,key_value){
		if(typeof(key_value) == 'undefined'){
			key_value = 'img';
		}
		for(var i = 0; i<profile[type_attribute].length; i++){
			if(profile[type_attribute][i][key_value] == value){
				return true;
			}
		}
		return false;
	};
	Main.k.Profiles.hasStatusWhichRemoveTitle = function(profile){
		if(profile.dead){
			return true;
		}
		var status = null;
		for( var inc = 0; inc < profile.statuses.length; inc ++){
			/** @type {{desc:string,img:string, name:string}} **/
			status = profile.statuses[inc];
			if($.inArray(status.img,[Main.k.statuses.inactive.img,Main.k.statuses.hinactive.img]) != -1){
				return true;
			}
		}
		return false;
	};
	Main.k.Profiles.close = function(){
		console.log('Main.k.Profiles.close');
		Main.k.Profiles.current = null;
		Main.k.folding.displayGame();
	};
	Main.k.Profiles.clear = function(){
		Main.k.Profiles.data = {};
		localStorage.removeItem('ctrlw_profiles');
		callbacks_storage_sync.fire();
	};
// == /Profiles Manager  =======================================

	Main.k.GameInfos = {};
	Main.k.GameInfos.data = {};
	Main.k.GameInfos.data.heroes_list = [];
	Main.k.GameInfos.data.andrek = false; //persistant, not cleared on new game
	Main.k.GameInfos.init = function() {
		var ctrlw_game_infos = localStorage.getItem("ctrlw_game_infos");
		if (ctrlw_game_infos == null){
			return;
		}
		Main.k.GameInfos.data = JSON.parse(ctrlw_game_infos);
	};
	Main.k.GameInfos.load = function (json){
		localStorage.setItem("ctrlw_game_infos",json);
		Main.k.GameInfos.init();
	};
	Main.k.GameInfos.save = function() {
		localStorage.setItem("ctrlw_game_infos",JSON.stringify(Main.k.GameInfos.data));
		callbacks_storage_sync.fire();
	};
	Main.k.GameInfos.clear = function(){
		Main.k.GameInfos.data = {andrek: Main.k.GameInfos.data.andrek};
		Main.k.GameInfos.data.heroes_list = [];
		Main.k.HEROES = Main.k.HEROES_ALL.slice();
		localStorage.setItem("ctrlw_game_infos",JSON.stringify(Main.k.GameInfos.data));
		callbacks_storage_sync.fire();
	};

	// == Message Manager  ========================================
	Main.k.Manager = {};
	Main.k.Manager.initialized = false;
	Main.k.Manager.heroes = [];
	Main.k.Manager.open = function(after) {
		console.log('manager open debut');
		var tabs, r, rbg;
		if (Main.k.folding.displayed == "manager" || Main.k.folding.displayed == "manager_mini") {
			Main.k.folding.displayGame();
			return;
		}
		// TEMP CONFIG
		var hasmushchat = true;
		var haschat1 = true;
		var haschat2 = true;
		var haschat3 = true;
		
		var $tabstats;

		if (!Main.k.Manager.initialized) {
			Main.k.Manager.initialized = true;

			// Topics
			// ----------------------------------------------------------
			var $tableInterFirst = $("table.inter tr").first();
			var td_topics = $("<td>").addClass("chat_box").css({
				"padding-right": "6px",
				"padding-top": "1px",
				width: "330px",
				transform: "scale(0,1)"
			}).attr("id", "topics_col").appendTo($tableInterFirst);

			// Tabs
			tabs = $("<ul>").addClass("tabschat customtabs").css({margin: 0, position: "relative"}).appendTo(td_topics);
			$("<img>").attr("src", "/img/icons/ui/tip.png").appendTo($("<li>").addClass("tab taboff").attr("id", "tabstats").appendTo(tabs));
			$("<img>").attr("src", "http://twinoid.com/img/icons/new.png").appendTo($("<li>").addClass("tab taboff").attr("id", "tabnew").appendTo(tabs));
			$("<img>").attr("src", "http://twinoid.com/img/icons/search.png").appendTo($("<li>").addClass("tab taboff").attr("id", "tabsearch").appendTo(tabs));
			$("<img>").attr("src", "/img/icons/ui/wall.png").appendTo($("<li>").addClass("tab taboff").attr("id", "tabwall").appendTo(tabs));
			$("<img>").attr("src", "/img/icons/ui/fav.png").appendTo($("<li>").addClass("tab tabon").attr("id", "tabfav").appendTo(tabs));

			// Tab content
			r = $("<div>").addClass("right").css("margin-top", 0).appendTo(td_topics);
			rbg = $("<div>").addClass("rightbg chattext").css({
				"resize": "none"
			}).appendTo(r);

			$("<div>").addClass("tabcontent").attr("id", "tabstats_content").appendTo(rbg);
			$("<div>").addClass("tabcontent wall").attr("id", "tabnew_content").appendTo(rbg);
			$("<div>").addClass("tabcontent wall").attr("id", "tabsearch_content").appendTo(rbg);
			if (hasmushchat) $("<div>").addClass("tabcontent").attr("id", "tabmush_content").appendTo(rbg);
			$("<div>").addClass("tabcontent wall").attr("id", "tabwall_content").appendTo(rbg);
			$("<div>").addClass("tabcontent wall").attr("id", "tabfav_content").appendTo(rbg);
			if (haschat1) $("<div>").addClass("tabcontent").attr("id", "tabchat1_content").appendTo(rbg);
			if (haschat2) $("<div>").addClass("tabcontent").attr("id", "tabchat2_content").appendTo(rbg);
			if (haschat3) $("<div>").addClass("tabcontent").attr("id", "tabchat3_content").appendTo(rbg);
			rbg.find(".tabcontent").css("display", "none");

			// Tooltips
			$tabstats = $("#tabstats");
			$tabstats.attr("_title", Main.k.text.gettext("Statistiques")).attr("_desc", Main.k.text.gettext("Affiche les statistiques, et permet de gérer le nombre de messages chargés dans la page."));
			$("#tabnew").attr("_title", Main.k.text.gettext("Nouveaux Messages")).attr("_desc", Main.k.text.gettext("Beaucoup de messages à lire ? Le manager permet de rattraper son retard plus facilement. En chargeant tous les messages dans l'onglet Statistiques, vous pouvez aussi voir les messages non lus manqués à cause du bug (Mush) des messages."));
			$("#tabsearch").attr("_title", Main.k.text.gettext("Recherche de Messages")).attr("_desc", Main.k.text.gettext("Une discussion à retrouver ? Envie de savoir combien d'incendies se sont déclarés ? (@neron incendie daedalus)"));
			/* Translators: This translation must be copied from the game. */
			$("#tabwall").attr("_title", "Discussion").attr("_desc", Main.k.text.gettext("Le canal de discussion est indispensable pour s'organiser avec l'équipage.</p><p>Pour participer vous devez posséder un <strong>talkie-walkie</strong>."));
			/* Translators: This translation must be copied from the game. */
			$("#tabfav").attr("_title", Main.k.text.gettext("Favoris")).attr("_desc", Main.k.text.gettext("Votre sélection de sujets favoris."));
			tabs.find(".tab").on("mouseover", Main.k.CustomTip);
			tabs.find(".tab").on("mouseout", Main.k.hideTip);
			tabs.find(".tab").on("click", function() { Main.k.Manager.selectTab(this); });


			// Current topic
			// ----------------------------------------------------------
			var td_topic = $("<td>").addClass("chat_box").css({
				"padding-right": "6px",
				"padding-top": "1px",
				width: "330px",
				transform: "scale(0,1)"
			}).attr("id", "topic_col").appendTo($tableInterFirst);

			// Tabs
			tabs = $("<ul>").addClass("tabschat customtabs").css({margin: 0, position: "relative"}).appendTo(td_topic);
			$("<img>").attr("src", "/img/icons/ui/wall.png").appendTo(
				$("<li>").addClass("tab tabon").attr("id", "tabtopic").attr("_title", "Discussion").attr("_desc", Main.k.text.gettext("Le canal de discussion est indispensable pour s'organiser avec l'équipage.</p><p>Pour participer vous devez posséder un <strong>talkie-walkie</strong>.")).appendTo(tabs)
			);


			// List
			r = $("<div>").addClass("right").css("margin-top", 0).appendTo(td_topic);
			rbg = $("<div>").addClass("rightbg chattext").css({
				resize: "none"
			}).appendTo(r);

			var topic = $("<div>").attr("id", "tabtopic_content").addClass("tabcontent wall topicwall").css({
				resize: "none",
				"min-height": "427px"
			}).appendTo(rbg);
			$("<p>").addClass("warning").html(Main.k.text.gettext("Aucun topic sélectionné.")).appendTo(topic);

			if (hasmushchat) {
				/* Translators: The beginning must be copied from the game. */
				var mushtab = $("<li>").addClass("tab taboff").attr("id", "tabmush").attr("_title", Main.k.text.gettext("Canal Mush")).attr("_desc", Main.k.text.gettext("Ssshh, personne nous entend ici... Le Canal Mush est le <em>canal privé</em> pour les adhérents aux <strong>Mush</strong> <img src='/img/icons/ui/mush.png' />.</p><p><strong>/!&#92; Fonctionnalité non codée</strong>")).appendTo(tabs);
				$("<img>").attr("src", "/img/icons/ui/mush.png").appendTo(mushtab);
				var mushchat = $("<div>").attr("id", "tabmush_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
				$("<p>").addClass("warning").html(Main.k.text.gettext("Disponible prochainement.")).appendTo(mushchat);
			}
			if (haschat1) {
				var chat1tab = $("<li>").addClass("tab taboff").attr("id", "tabchat1").attr("_title", Main.k.text.gettext("Chat privé") + " #1").attr("_desc", Main.k.text.gettext("Chat privé ouvert avec :<br/>[liste des participants]</p><p><strong>/!&#92; Fonctionnalité non codée</strong>")).appendTo(tabs);
				$("<img>").attr("src", "/img/icons/ui/private.png").appendTo(chat1tab);
				var chat1 = $("<div>").attr("id", "tabchat1_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
				$("<p>").addClass("warning").html("Disponible prochainement.").appendTo(chat1);
			}
			if (haschat2) {
				var chat2tab = $("<li>").addClass("tab taboff").attr("id", "tabchat2").attr("_title", Main.k.text.gettext("Chat privé") + " #2").attr("_desc", Main.k.text.gettext("Chat privé ouvert avec :<br/>[liste des participants]</p><p><strong>/!&#92; Fonctionnalité non codée</strong>")).appendTo(tabs);
				$("<img>").attr("src", "/img/icons/ui/private.png").appendTo(chat2tab);
				var chat2 = $("<div>").attr("id", "tabchat2_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
				$("<p>").addClass("warning").html("Disponible prochainement.").appendTo(chat2);
			}
			if (haschat3) {
				var chat3tab = $("<li>").addClass("tab taboff").attr("id", "tabchat3").attr("_title", Main.k.text.gettext("Chat privé") + " #3").attr("_desc", Main.k.text.gettext("Chat privé ouvert avec :<br/>[liste des participants]</p><p><strong>/!&#92; Fonctionnalité non codée</strong>")).appendTo(tabs);
				$("<img>").attr("src", "/img/icons/ui/private.png").appendTo(chat3tab);
				var chat3 = $("<div>").attr("id", "tabchat3_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
				$("<p>").addClass("warning").html("Disponible prochainement.").appendTo(chat3);
			}
			tabs.find(".tab").on("mouseover", Main.k.CustomTip);
			tabs.find(".tab").on("mouseout", Main.k.hideTip);
			tabs.find(".tab").on("click", function() { Main.k.Manager.selectTopicTab(this); });


			// Reply
			// ----------------------------------------------------------
			var td_reply = $("<td>").addClass("chat_box").css({
				transform: "scale(0,1)",
				"padding-top": "1px",
				"text-align": "right"
			}).attr("id", "reply_col").appendTo($tableInterFirst);

			// Tabs
			tabs = $("<ul>").addClass("tabschat customtabs").css({
				margin: 0,
				"text-align": "left",
				position: "relative"
			}).appendTo(td_reply);
			var tabreply = $("<li>").addClass("tab tabon").attr("id", "tabreply").attr("_title", Main.k.text.gettext("Nouveau message")).attr("_desc", Main.k.text.gettext("Répondez à un topic / une discussion ou créez un nouveau topic.")).appendTo(tabs);
			var tabneron = $("<li>").addClass("tab taboff").attr("id", "tabneron").attr("_title", Main.k.text.gettext("Annonces vocodées")).attr("_desc", Main.k.text.gettext("Assistant pour les Admin. Néron pour faciliter la création d'annonces vocodées.</p><p><strong>/!&#92; Fonctionnalité non codée</strong>")).appendTo(tabs);
			var tabcustom = $("<li>").addClass("tab taboff").attr("id", "tabcustom").attr("_title", Main.k.text.gettext("Messages pré-enregistrés")).attr("_desc", Main.k.text.gettext("Messages récurrents & autres (à définir).</p><p><strong>/!&#92; Fonctionnalité non codée</strong>")).appendTo(tabs);
			$("<img>").attr("src", "http://twinoid.com/img/icons/edit.png").appendTo(tabreply);
			$("<img>").attr("src", "/img/icons/ui/neron.png").appendTo(tabneron);
			$("<img>").attr("src", "/img/icons/ui/book.png").appendTo(tabcustom);
			tabs.find(".tab").on("mouseover", Main.k.CustomTip);
			tabs.find(".tab").on("mouseout", Main.k.hideTip);
			tabs.find(".tab").on("click", function() { Main.k.Manager.selectReplyTab(this); });

			r = $("<div>").addClass("right").css("margin-top", 0).appendTo(td_reply);
			rbg = $("<div>").addClass("rightbg chattext").css({
				"resize": "none",
				"text-align": "center",
				"position": "relative"
			}).appendTo(r);
			var reply = $("<div>").attr("id", "tabreply_content").addClass("tabcontent wall").appendTo(rbg);
			var vocod = $("<div>").attr("id", "tabneron_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
			var custom = $("<div>").attr("id", "tabcustom_content").css("display", "none").addClass("tabcontent wall").appendTo(rbg);
			$("<p>").addClass("warning").html(Main.k.text.gettext("Disponible prochainement.")).appendTo(vocod);

			// Actions
			var mini = Main.k.MakeButton("<img src='/img/icons/ui/less.png' /> Réduire le Manager",null,function() {
				Main.k.Manager.minimize();
			}).attr("id", "manager_togglemini").appendTo(td_reply);
			mini.css({
				"margin": "3px 4px 0 auto",
				"display": "inline-block"
			});
			var close = Main.k.MakeButton("<img src='/img/icons/ui/pageleft.png' /> "+Main.k.text.gettext("Fermer le Manager"),null,function() {
				Main.k.Manager.open();
			}).appendTo(td_reply);
			close.css({
				"margin": "3px 4px 0 auto",
				"display": "inline-block"
			});
		}else{
			$tabstats = $("#tabstats");
		}

		// Load data
		Main.k.Manager.update();
		Main.k.Manager.selectTab($tabstats);

		$("#manager_togglemini").find("a").html("<img src='/img/icons/ui/less.png' /> "+Main.k.text.gettext("Réduire le Manager"));
		Main.k.folding.display(["#topics_col", "#topic_col", "#reply_col"], "manager", after);
	};
	Main.k.Manager.replywaiting = "";
	Main.k.Manager.openOn = function(_target, val, k) {
		if (val && val.length > 0) Main.k.Manager.replywaiting = val;

		if (_target == "newtopic") {
			Main.k.Manager.open();
		} else if (_target == "reply") {
			Main.k.Manager.displayedTopic = k;
			var after = function() {
				var k = Main.k.Manager.displayedTopic;
				Main.k.Manager.selectTopic(k);
			};
			Main.k.Manager.open(after);
		}
	};
	Main.k.Manager.minimize = function(){
		var $manager_togglemini = $("#manager_togglemini");
		if (Main.k.folding.displayed == "manager") {
			$manager_togglemini.find("a").html("<img src='/img/icons/ui/more.png' /> Agrandir le Manager");
			Main.k.folding.display([Main.k.folding.gamecols[0], Main.k.folding.gamecols[1], "#reply_col"], "manager_mini");
		} else {
			$manager_togglemini.find("a").html("<img src='/img/icons/ui/less.png' /> "+Main.k.text.gettext("Réduire le Manager"));
			Main.k.folding.display(["#topics_col", "#topic_col", "#reply_col"], "manager");
		}
	};
	Main.k.Manager.selectTab = function(el) {
		// Select tab
		var $topic_col = $("#topics_col");
		$topic_col.find(".tab").removeClass("tabon").addClass("taboff");
		$(el).removeClass("taboff").addClass("tabon");

		// Display content
		$topic_col.find(".tabcontent").css("display", "none");
		$("#" + $(el).attr("id") + "_content").css("display", "block");
	};
	Main.k.Manager.selectTopicTab = function(el) {
		// Select tab
		var $topic_col = $("#topics_col");
		$topic_col.find(".tab").removeClass("tabon").addClass("taboff");
		$(el).removeClass("taboff").addClass("tabon");

		// Display content
		$topic_col.find(".tabcontent").css("display", "none");
		$("#" + $(el).attr("id") + "_content").css("display", "block");
	};
	Main.k.Manager.selectReplyTab = function(el) {
		var $reply_col = $('#reply_col');
		// Select tab
		$reply_col.find(".tab").removeClass("tabon").addClass("taboff");
		$(el).removeClass("taboff").addClass("tabon");

		// Display content
		$reply_col.find(".tabcontent").css("display", "none");
		$("#" + $(el).attr("id") + "_content").css("display", "block");
	};
	Main.k.Manager.topics = [];
	Main.k.Manager.replies = [];
	Main.k.Manager.lastago = "";
	Main.k.Manager.loadedtopics = [];
	Main.k.Manager.loadedreplies = [];
	Main.k.Manager.lmwProcessing = false;
	Main.k.Manager.loadWholeWall = function(k) {
		if (Main.k.Manager.lmwProcessing) return;
		Main.k.Manager.lmwProcessing = true;

		var w = $('#cdStdWall').find("div.wall div.unit").last();
		var wp = w.closest(".wall");

		var datak = k ? k : w.attr("data-k");
		Tools.ping("/retrWallAfter/" + datak,function(content) {
			var jq1 = $(content);
			Main.k.Manager.lmwProcessing = false;
			if (jq1.find(".wall").html().trim().length > 0) {
				// Store messages
				Main.k.Manager.parseWall(jq1.find(".wall"));

				// Get data-k
				var datak = jq1.find(".wall .unit").last().attr("data-k");
				if(datak == k){
					Main.k.Manager.lmwProcessing = false;
					Main.k.Manager.update();
				}else{
					// Load more
					Main.k.Manager.loadWholeWall(datak);
				}
			} else {
				Main.k.Manager.update();
			}
		});
	};
	Main.k.Manager.parseWall = function(wall) {
		if (!wall.find) wall = $(wall);
		var topics = wall.find(".mainmessage");

		topics.each(function() {
			var topic_ago;
			var tid = $(this).closest(".unit").attr("data-k");
			var editing = (Main.k.Manager.loadedtopics[tid]);

			// Create topic object
			var topic = editing ? Main.k.Manager.getTopicByTid(tid) : {};
			if (!editing) topic.mushid = tid;

			// Favorite ?
			if (!editing) topic.fav = $(this).closest(".cdWallChannel").attr("id") == "cdFavWall";

			// Neron or Hero ?
			var hero = "";
			if (!editing) {
				if ($(this).find(".mainsaid.neron_talks").length != 0) {
					hero = "neron";
					Main.k.Manager.heroes[hero].mess++;

					// AV
					if ($(this).find(".mainsaid.neron_talks p").length > 0) {
						Main.k.Manager.heroes[hero].av++;

						topic.msg = "";
						$(this).find("p, ul").each(function() {
							topic.msg += "<" + $(this).prop("tagName") + ">" + $(this).html() + "</" + $(this).prop("tagName") + ">";
						});
					} else {
						Main.k.Manager.heroes[hero].a++;

						var msg = $(this).find(".mainsaid.neron_talks").html();
						msg = msg.replace(/([\r\n]+)/g, "");
						topic.msg = /NERON\s:<\/span>(.+)<span\s*class="ago"/i.exec(msg)[1].trim();
					}
				} else {
					hero = Main.k.GetHeroNameFromTopic($(this));
					if((!(hero in Main.k.Manager.heroes))){
						return true;
					}
					Main.k.Manager.heroes[hero].mess++;
					Main.k.Manager.heroes[hero].topic++;

					topic.msg = "";
					$(this).find("p, ul").each(function() {
						topic.msg += "<" + $(this).prop("tagName") + ">" + $(this).html() + "</" + $(this).prop("tagName") + ">";
					});
					if(topic.msg == ''){
						topic.msg = $(this).find('.mainsaid')
									.clone()		//clone the element
									.children()		//select all the children
									.remove()		//remove all the children
									.end()			//again go back to selected element
									.text();
					}
				}

				topic.author = hero;
				topic.id = Main.k.Manager.topics.length;
			}

			topic.ago = $(this).find(".ago").html().trim();
			topic_ago = topic.ago;
			topic.read = !$(this).hasClass("not_read");
			topic.realread = !$(this).hasClass("not_read");
			if (!topic.realread && !Main.k.hasTalkie) return;

			Main.k.Manager.loadedtopics[tid] = true;
			if (!editing) topic.replies = [];
			if (!editing) Main.k.Manager.topics.push(topic);

			// Add messages
			$(this).parent().find(".cdRepl").each(function() {
				var tid = $(this).closest(".unit").attr("data-k");
				var topic = Main.k.Manager.getTopicByTid(tid);

				var idx = $(this).attr("data-idx");
				var rid = topic.mushid + "." + idx;

				var editing = (Main.k.Manager.loadedreplies[rid] == true);

				// Create message object
				var reply = editing ? topic.replies[idx] : {};
				if (!reply) reply = {};

				// Neron or Hero ?
				var hero = "";
				if (!editing) {
					if ($(this).find(".neron").length != 0) {
						hero = "neron";
						Main.k.Manager.heroes[hero].mess++;
						Main.k.Manager.heroes[hero].av++;
					} else {
						hero = Main.k.GetHeroNameFromTopic($(this));
						if((!(hero in Main.k.Manager.heroes))){
							return true;
						}
						Main.k.Manager.heroes[hero].mess++;
					}

					reply.author = hero;
					reply.msg = "";
					$(this).find("p, ul").each(function() {
						reply.msg += "<" + $(this).prop("tagName") + ">" + $(this).html() + "</" + $(this).prop("tagName") + ">";
					});
					if(reply.msg == ''){
						reply.msg = $(this).find('.reply')
							.clone()		//clone the element
							.children()		//select all the children
							.remove()		//remove all the children
							.end()			//again go back to selected element
							.text();
					}
					reply.tid = topic.id;
					reply.id = idx;
				}

				reply.ago = $(this).find(".ago").html().trim();
				topic_ago = Main.k.minAgo(reply.ago, topic_ago);
				reply.read = !$(this).hasClass("not_read");
				if (topic.read && !reply.read) topic.read = false;
				if (!reply.read && !Main.k.hasTalkie) return;
				Main.k.Manager.loadedreplies[rid] = true;

				// Save message
				if (!editing) {
					topic.replies.push(reply);
					Main.k.Manager.replies.push(reply);
				}
			});

			Main.k.Manager.lastago = Main.k.maxAgo(topic_ago, Main.k.Manager.lastago);
		});
	};
	Main.k.Manager.parseTopic = function(topic, highlight) {
		var topicDOM = $("<div>").addClass("reply bubble unit");
		if (Main.k.Options.cbubbles) topicDOM.addClass("bubble_" + topic.author);
		if (Main.k.Options.cbubblesNB) topicDOM.addClass("custombubbles_nobackground");
		var isneron = (topic.author == "neron");

		// Author
		var authdiv = $("<div>").addClass(isneron ? topic.author : "char " + topic.author).appendTo(topicDOM);
		if (topic.author == "neron") authdiv.html('<img src="/img/icons/ui/neron.png">');

		// Buddy
		$("<span>").addClass("buddy").html(isneron ? " NERON : " : " " + Main.k.COMPLETE_SURNAME(topic.author) + " : ").appendTo(topicDOM);

		// Content
		var msg = topic.msg;
		if (highlight) {
			for (var i=0; i<highlight.length; i++) {
				var reg = new RegExp(highlight[i], "gi");
				msg = msg.replace(reg, "<span class='highlight'>" + highlight[i] + "</span>");
			}
		}
		$("<div>").css("display", "inline").html(msg).appendTo(topicDOM);

		// Ago
		$("<span>").addClass("ago").html(topic.ago).appendTo(topicDOM);

		return topicDOM;
	};
	Main.k.Manager.displayedTopic = null;
	Main.k.Manager.displayTopic = function(ti, lwords) {
		var displaymore = true; // TEMP

		// Clear currtopic
		var currtopic = $("#tabtopic_content").empty();

		// Parse topic
		var topic = Main.k.Manager.topics[ti];
		var mainsaid = Main.k.Manager.parseTopic(topic, lwords);
		Main.k.Manager.displayedTopic = topic.mushid;
		mainsaid.attr("class", "bubble mainmessage mainsaid");
		if (topic.author == "neron") {
			mainsaid.find("img").remove();
			mainsaid.addClass("neron_talks");
		}
		mainsaid.css({
			"padding-bottom": "20px",
			"z-index": "10"
		}).appendTo(currtopic);
		if (Main.k.Options.cbubbles) {
			mainsaid.addClass("bubble_" + topic.author);
			if (Main.k.Options.cbubblesNB) mainsaid.addClass("custombubbles_nobackground");
		} else {
			mainsaid.css("background", "rgba(255,255,255,0.8)");
		}

		// Mark as read
		if (!topic.realread) {
			mainsaid.addClass("not_read");
			mainsaid.prepend($('<img>').addClass("recent").attr("src", "/img/icons/ui/recent.png"));
			mainsaid.attr("data-k", topic.mushid);
			mainsaid.on("mouseover", function() {
				ArrayEx.pushBack(Main.checkedWallPost,$(this).attr("data-k"));
				haxe.Timer.delay(Main.sendWallChecked,1000);

				$(this).find(".recent").remove();
				$(this).removeClass("not_read");
				$(this).off('onmouseover');
			});
		}

		// Display read messages
		// TODO: do not display if no read messages
		if (topic.replies.length > 10 && !displaymore) {
			$("<a>").addClass("displaymore").attr("href", "#").on("click", Main.k.Manager.displayAllReplies)
			.html("Afficher les " + topic.replies.length + " messages").appendTo(currtopic);
		}

		// Display replies
		var replytable = $("<table>").addClass("treereply").appendTo(currtopic);
		var tbody = $("<tbody>").appendTo(replytable);

		for (var i=0; i<topic.replies.length; i++) {
			var reply = topic.replies[i];

			var tr = $("<tr>").addClass("cdRepl").appendTo(tbody);
			if (topic.replies.length > 10 && reply.read && !displaymore) tr.addClass("messread");
			if (!reply.read) tr.addClass("not_read");

			var _class = "tree" + (i == (topic.replies.length -1) ? " treelast" : "");
			$("<td>").addClass(_class).appendTo(tr);
			var td2 = $("<td>").appendTo(tr);

			var replyDOM = Main.k.Manager.parseTopic(reply, lwords);
			replyDOM.removeClass("unit").appendTo(td2);
			replyDOM.prepend($('<div>').attr("class", "triangleup"));
			if (!reply.read) replyDOM.prepend($('<img>').addClass("recent").attr("src", "/img/icons/ui/recent.png"));

			// Mark as read
			if (true || !reply.read) {
				tr.attr("data-k", topic.mushid);
				tr.attr("data-idx", reply.id);
				tr.on("mouseover", function() {
					ArrayEx.pushBack(Main.checkedWallPost, $(this).attr("data-k") + "#" + $(this).attr("data-idx"));
					haxe.Timer.delay(Main.sendWallChecked,1000);

					$(this).find(".recent").remove();
					$(this).removeClass("not_read");
					$(this).off("mouseover");
				});
			}
		}
	};
	Main.k.Manager.displayAllReplies = function() {
		var $tabtopic_content = $("#tabtopic_content");
		$tabtopic_content.find(".messread").each(function() {
			$(this).removeClass("messread");
		});
		$tabtopic_content.find(".displaymore").addClass("messread");
	};
	Main.k.Manager.getTopicByTid = function(tid) {
		for (var i=0; i<Main.k.Manager.topics.length; i++) {
			var t = Main.k.Manager.topics[i];
			if (t.mushid == tid) return t;
		}
		return false;
	};
	Main.k.Manager.clearSess = function() {
		// Clear sid cookie
		js.Cookie.set("sid", "", -42, "/", "."+Main.k.domain+"");
		Main.k.showLoading();
		// Reload session
		$('<iframe>', {
			src: Main.k.mushurl+'/me',
			id: 'sessionframe',
			scrolling: 'no'
		}).css({
			width: 0,
			height: 0,
			display: "none",
			position: "absolute"
		}).appendTo('body').load(function() {
			window.location.reload();
		});
	};
	Main.k.Manager.updateHeroes = function() {
		Main.k.Manager.initHeroes();

		for (var i=0; i<Main.k.Manager.topics.length; i++) {
			var topic = Main.k.Manager.topics[i];
			Main.k.Manager.heroes[topic.author].topic++;
			Main.k.Manager.heroes[topic.author].mess++;

			for (var j=0; j<topic.replies.length; j++) {
				var reply = topic.replies[j];
				Main.k.Manager.heroes[reply.author].mess++;
			}
		}
	};
	Main.k.Manager.sortedheroes = [];
	Main.k.Manager.sortHeroes = function() {
		// Init
		Main.k.Manager.sortedheroes = [];
		for (var h in Main.k.Manager.heroes) {
			if(Main.k.Manager.heroes.hasOwnProperty(h)) {
				var hero = Main.k.Manager.heroes[h];
				if (!hero || hero.mess == undefined) continue;

				Main.k.Manager.sortedheroes.push(h);
			}
		}

		// Sort
		Main.k.Manager.sortedheroes.sort(function(b,a) {
			a = Main.k.Manager.heroes[a];
			b = Main.k.Manager.heroes[b];

			var a1 = a.mess, b1 = b.mess;
			if (a1 == b1) {
				var a2 = a.topic, b2 = b.topic;
				if (a2 == b2) {
					var a3 = a.name, b3 = b.name;
					return a3 > b3 ? 1 : -1;
				}
				return a2 > b2 ? 1 : -1;
			}
			return a1 > b1 ? 1 : -1;
		});
	};
	Main.k.Manager.loadingMessages = function() {
		var $recap_div = $("#recap_div");
		$recap_div.empty();
		$("<p>").addClass("warning").html(Main.k.text.gettext("Chargement en cours...")).appendTo($recap_div);
	};
	Main.k.Manager.fillStats = function() {
		var tab = $("#tabstats_content").empty();
		tab.css({
			color: "rgb(9, 10, 97)"
		});

		var warn = $("<div>").addClass("warning").html(Main.k.text.gettext("Gérez le nombre de messages chargés."+
		"Le manager est plus complet lorsque tous les messages sont chargés, "+
		"mais le jeu devient beaucoup plus lent à cause du chargement de ces messages à chaque action (particularité de mush...)."))
		.css("background-position", "7px 15px")
		.appendTo(tab);

		// Actions
		var actions = $("<div>").css({
			"text-align": "center",
			"margin-top": "8px"
		}).appendTo(warn);

		// Action : load all
		Main.k.MakeButton("<img src='/img/icons/ui/wall.png' class='alerted' /><img src='/img/icons/ui/onceplus.png' class='alert' /> "+Main.k.text.gettext("Tout charger"),null,function() {
			Main.k.Manager.loadingMessages();
			Main.k.Manager.loadWholeWall();
		})
		.appendTo(actions)
		.find("a")
		.attr("_title", Main.k.text.gettext("Charger tous les messages")).attr("_desc", Main.k.text.gettext("Chargez tous les messages pour profiter pleinement du manager : recherches dans tous les messages depuis le début de la partie, nouveaux messages manqués à cause du bug de mush, statistiques complètes, etc.</p><p><strong>Cette action peut prendre un certain temps, suivant le nombre de messages postés sur votre vaisseau.</strong>"))
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.k.hideTip);

		// Action : unload
		Main.k.MakeButton("<img src='/img/icons/ui/wall.png' class='alerted' /><img src='/img/icons/ui/bin.png' class='alert' /> "+Main.k.text.gettext("Décharger"),null,function() {
			Main.k.Manager.loadingMessages();
			Main.k.Manager.clearSess();
		})
		.appendTo(actions)
		.find("a")
		.attr("_title", Main.k.text.gettext("Décharger les messages")).attr("_desc", Main.k.text.gettext("Déchargez la liste de messages pour alléger le jeu. Lorsque vous chargez des messages (en scrollant sur le chat, par exemple), ceux-ci restent chargés. Mush chargeant toute la page (dont les messages) à chaque action, votre jeu est grandement ralenti lorsque le nombre de messages chargés est conséquent.</p><p><strong>Cette action fermera le Message Manager et rafraîchira la page.</strong>"))
		.on("mouseover", Main.k.CustomTip)
		.on("mouseout", Main.k.hideTip);

		// Fix actions
		actions.find(".but").css({
			display: "inline-block",
			margin: "0 2px"
		});

		// Print recap
		var recap = $("<div>").attr("id", "recap_div").addClass("recap").appendTo(tab);
		Main.k.Manager.updateHeroes();
		Main.k.Manager.sortHeroes();

		var topic_nb = Main.k.Manager.topics.length;
		var answer_nb = Main.k.Manager.replies.length;
		var total_msg = topic_nb + answer_nb;
		//A continuer ici
		var recap_p = $("<p>").html(Main.k.text.strargs(Main.k.text.ngettext("Total : <b>%1</b> message chargé","Total : <b>%1</b> messages chargés",total_msg),[total_msg])

		+ " "+ Main.k.text.strargs(Main.k.text.ngettext("en <b>%1</b> topic. <br/> (depuis %2)","en <b>%1</b> topics. <br/> (depuis %2)",topic_nb),[topic_nb,Main.k.extendAgo(Main.k.Manager.lastago)])).appendTo(recap);

		// Hero count
		var popup_recap_char = $("<div>").addClass("chars").appendTo(recap);
		var popup_msg = "//" + Main.k.text.strargs(Main.k.text.ngettext("Total : %1 message","Total : %1 messages",total_msg),[total_msg])+"//";
		var max_highlighted = 6;
		for (var i=0; i<Main.k.Manager.sortedheroes.length; i++) {
			var hero = Main.k.Manager.heroes[Main.k.Manager.sortedheroes[i]];
			if (!hero || hero.mess == undefined) continue;
			if (i == max_highlighted) $("<br/>").appendTo(popup_recap_char);

			var heroDiv = $("<div>").addClass("hero _" + hero.name).attr("_title", Main.k.COMPLETE_SURNAME(hero.name)).css("cursor", "help").appendTo(popup_recap_char);
			if (i < max_highlighted) heroDiv.addClass("highlight");
			if (hero.name == "neron") {
				heroDiv.attr("_desc", Main.k.text.strargs(Main.k.text.ngettext("<b>%1</b> message","<b>%1</b> messages",hero.mess),[hero.mess])); // dont <b>" + hero.a + "</b> annonces officielles et <b>" + hero.av + "</b> annonces vocodées.");
			} else {
				heroDiv.attr("_desc", Main.k.text.strargs(Main.k.text.ngettext("<b>%1</b> message","<b>%1</b> messages",hero.mess),[hero.mess])

				+ " "+Main.k.text.strargs(Main.k.text.ngettext("dont <b>%1</b> topic.","dont <b>%1</b> topics.",hero.topic),[hero.topic]));
			}
			heroDiv.on("mouseover", Main.k.CustomTip);
			heroDiv.on("mouseout", Main.k.hideTip);
			heroDiv.on("click", Main.k.Manager.searchHero);

			$("<img>").attr("src", "/img/icons/ui/" + hero.name.replace("_", "") + ".png").appendTo(heroDiv);
			var msg = (i < max_highlighted) ? hero.mess + "&nbsp;messages" : hero.mess;
			$("<span>").html(msg).appendTo(heroDiv);

			/* Translators: %1 = character name, %2 = message count */
			popup_msg += "\n"+Main.k.text.strargs(Main.k.text.ngettext("**%1 : ** //%2// message","**%1 : ** //%2// messages",hero.mess),[Main.k.COMPLETE_SURNAME(hero.name),hero.mess]);
		}

		// Code for sharing msg count
		$("<textarea>").val(popup_msg).appendTo(recap);
	};
	Main.k.Manager.fillNewFav = function() {
		var topic, topicDOM, actions;
		var active_topics = $("#tabnew_content").empty().css("color", "rgb(9, 10, 97)");
		var favtopics = $("#tabfav_content").empty().css("color", "rgb(9, 10, 97)");

		var allread = true;
		var favorites = [];
		for (var i=0; i<this.topics.length; i++) {
			topic = this.topics[i];

			if (topic.fav) favorites.push(topic);
			if (!topic.read) {
				allread = false;
				topicDOM = this.parseTopic(topic);
				if (topic.author == "neron") {
					topicDOM.find("img").remove();
					topicDOM.addClass("mainmessage neron_talks");
				}
				active_topics.append(topicDOM);


				// Unread replies
				var unread = 0;
				if (!topic.realread) unread++;
				for (var j=0; j<topic.replies.length; j++) {
					var m = topic.replies[j];
					if (!m.read) unread++;
				}

				// Actions
				actions = $("<a>").addClass("topicact").attr("href", "#topic" + i)
				.on("click", function() { Main.k.Manager.displayTopic(parseInt(/([0-9]+)/.exec(this.href)[1])); return false; })
				.html(Main.k.text.strargs(Main.k.text.ngettext("%1 réponse","%1 réponses",topic.replies.length),[topic.replies.length])+ " - " + Main.k.text.strargs(Main.k.text.ngettext("%1 message non lu","%1 messages non lus",unread),[unread]))
				.appendTo(active_topics);
			}
		}
		if (allread) $("<p>").addClass("warning").html(Main.k.text.gettext("Aucun message non lu.")).appendTo(active_topics);

		if (favorites.length == 0) $("<p>").addClass("warning").html(Main.k.text.gettext("Vous n'avez pas de favoris.")).appendTo(active_topics);
		for (i=0; i<favorites.length; i++) {
			topic = favorites[i];

			topicDOM = this.parseTopic(topic);
			if (topic.author == "neron") {
				topicDOM.find("img").remove();
				topicDOM.addClass("mainmessage neron_talks");
			}
			favtopics.append(topicDOM);

			// Actions
			actions = $("<a>").addClass("topicact").attr("href", "#topic" + topic.id)
			.on("click", function() { Main.k.Manager.displayTopic(parseInt(/([0-9]+)/.exec(this.href)[1])); return false; })
			.html(Main.k.text.strargs(Main.k.text.ngettext("%1 réponse","%1 réponses",topic.replies.length),[topic.replies.length]))
			.appendTo(favtopics);
		}
	};
	Main.k.Manager.fillWall = function() {
		var wall = $("#tabwall_content").empty().css("color", "rgb(9, 10, 97)");
		for (var i=0; i<this.topics.length; i++) {
			var topic = this.topics[i];

			var topicDOM = this.parseTopic(topic);
			if (topic.author == "neron") {
				topicDOM.find("img").remove();
				topicDOM.addClass("mainmessage neron_talks");
			}
			wall.append(topicDOM);

			// Unread replies
			var unread = 0;
			if (!topic.realread) unread++;
			for (var j=0; j<topic.replies.length; j++) {
				var m = topic.replies[j];
				if (!m.read) unread++;
			}

			// Actions
			var actions = $("<a>").addClass("topicact").attr("href", "#topic" + i)
			.on("click", function() { Main.k.Manager.displayTopic(parseInt(/([0-9]+)/.exec(this.href)[1])); return false; })
			.html(Main.k.text.strargs(Main.k.text.ngettext("%1 réponse","%1 réponses",topic.replies.length),[topic.replies.length]))
			.appendTo(wall);
		}
	};
	Main.k.Manager.fillSearch = function() {
		var search = $("#tabsearch_content").empty().css("color", "rgb(9, 10, 97)");

		// Search tools
		var searchbar = $("<div>").addClass("bar").appendTo(search);
		$("<input>").css("padding-bottom", "2px").attr("type", "text").attr("id", "searchfield").on("keypress", function(event) {
			if(event.keyCode == 13) Main.k.Manager.search();
		}).appendTo(searchbar);

		$("<a>").css({
			cursor: "pointer",
			position: "absolute",
			top: "4px",
			left: "4px"
		}).addClass("butmini")
		.html('<img src="/img/icons/ui/guide.png"/>')
		.appendTo(searchbar)
		.on("click", Main.k.Manager.fillSearch);

		$("<a>").css("cursor", "pointer").addClass("butmini")
		.html('<img src="http://twinoid.com/img/icons/search.png"/>')
		.appendTo(searchbar)
		.on("click", Main.k.Manager.search);

		var results = $("<div>").attr("id", "searchresults").appendTo(search);
		$("<h4>").html(Main.k.text.gettext("Fonction de recherche")).appendTo(results);
		$("<p>").addClass("help").html(Main.k.text.gettext("- Vous pouvez rechercher plusieurs mots, dans le désordre, complets ou non, qu'importe le contenu entre eux dans le message.")).appendTo(results);
		$("<p>").addClass("help").html(Main.k.text.gettext("- Pour rechercher les messages d'un joueur en particulier, utilisez <i>@personnage</i> (le prénom en minuscule, avec un _ pour kuan_ti et jin_su).")).appendTo(results);
		$("<p>").addClass("help").html(Main.k.text.gettext("- Pour rechercher uniquement dans le premier message des topics, utilisez <i>@topic</i>.")).appendTo(results);
	};
	Main.k.Manager.search = function() {
		var word, reg, res, res1;
		var val = $("#searchfield").val().trim();
		var results = [];
		var max_results = 500;
		var topiconly = false;
		var $searchresults = $("#searchresults");
		// Clear results
		$searchresults.empty();

		// Get searched words
		var tmp = val.split(/\s+/);
		var lwords = [];
		var iwords = [];
		var authors = [];
		for (var i=0; i<tmp.length; i++) {
			// Topics only?
			if (tmp[i] == "@topic") {
				topiconly = true;
				continue;
			}

			// Search by author
			if (tmp[i][0] == "@") {
				var author = tmp[i].replace("@", "");
				authors.push(author);
				continue;
			}

			// Ignored keyword
			if (tmp[i][0] == "!") {
				word = tmp[i].replace(/([^a-z0-9-éèêëàâœôöîïüûùç'%_]+)/gi, "");
				if (word.length > 2) iwords.push(word);
				continue;
			}

			// Keyword
			word = tmp[i].replace(/([^a-z0-9-éèêëàâœôöîïüûùç'%_]+)/gi, "");
			if (word.length > 2) lwords.push(word);
		}

		// Delete doubles
		lwords = Main.k.EliminateDuplicates(lwords);
		iwords = Main.k.EliminateDuplicates(iwords);
		authors = Main.k.EliminateDuplicates(authors);

		// Search
		if (authors.length >= 1 || lwords.length >= 1 || iwords.length >= 1) {
			var words = "(" + lwords.join("|") + ")";
			var nwords = lwords.length;
			var matched_topics = 0;

			for (i=0; i<Main.k.Manager.topics.length && matched_topics < max_results; i++) {
				topic = Main.k.Manager.topics[i];
				var matched = false;
				var autmatched = false;
				var imatched = false;

				// Search by author
				if (authors.length > 0) {
					for (var k=0; k<authors.length; k++) {
						if (topic.author == authors[k]) {
							autmatched = true;

							if (nwords == 0) matched = true;
						}
					}
				}

				// Ignored keywords
				if (iwords.length > 0) {
					var ireg = new RegExp( "(" + iwords.join("|") + ")", "gi");
					if (topic.msg.match(ireg)) {
						matched = false;
						imatched = true;
					}
				}

				// Search by keywords
				if (!imatched && lwords.length > 0 && (authors.length == 0 || autmatched)) {
					reg = new RegExp(words, "gi");
					res = topic.msg.match(reg);
					if (res && res.length >= nwords) {
						res1 = Main.k.EliminateDuplicates(res);
						if (res.length == res1.length) matched = true;
					}
				}

				// Search in replies
				for (var j=0; j<topic.replies.length && !matched && !topiconly; j++) {
					var m = topic.replies[j];
					autmatched = false;
					imatched = false;

					// Search by author
					if (authors.length > 0) {
						for (var l=0; l<authors.length; l++) {
							if (m.author == authors[l]) {
								autmatched = true;

								if (nwords == 0) matched = true;
							}
						}
					}

					// Ignored keywords
					if (iwords.length > 0) {
						reg = new RegExp( "(" + iwords.join("|") + ")", "gi");
						if (m.msg.match(reg)) {
							matched = false;
							imatched = true;
						}
					}

					// Search by keywords
					if (!imatched && lwords.length > 0 && (authors.length == 0 || autmatched)) {
						reg = new RegExp(words, "gi");
						res = m.msg.match(reg);
						if (res && res.length >= nwords) {
							res1 = Main.k.EliminateDuplicates(res);
							if (res.length == res1.length) matched = true;
						}
					}
				}

				if (matched) {
					matched_topics++;
					results.push(topic);
				}
			}
		}

		// Display results
		if (results.length > 0) {
			// Récap'
			$("<p>").addClass("warning").html(Main.k.text.strargs(Main.k.text.ngettext("%1 résultat (maximum : %2).","%1 résultats (maximum : %2).",results.length),[results.length,max_results]))
			.appendTo($searchresults);

			// Display topics
			for (i=0; i<results.length; i++) {
				var topic = results[i];

				var topicDOM = Main.k.Manager.parseTopic(topic, lwords);
				$searchresults.append(topicDOM);

				// Actions
				$("<a>").addClass("topicact").attr("href", "#topic" + topic.id)
				.on("click", function() { Main.k.Manager.displayTopic(parseInt(/([0-9]+)/.exec(this.href)[1]), lwords); return false; })
				.html(Main.k.text.strargs(Main.k.text.ngettext("%1 réponse","%1 réponses",topic.replies.length),[topic.replies.length])).appendTo($searchresults);
			}

		} else if (authors.length >= 1 || lwords.length >= 1 || iwords.length >= 1) {
			$("<p>").addClass("warning").html(Main.k.text.gettext("Aucun résultat.")).appendTo($searchresults);
		} else {
			$("<p>").addClass("warning").html(Main.k.text.gettext("Le texte recherché est trop court.")).appendTo($searchresults);
		}
	};
	Main.k.Manager.searchHero = function(event) {
		var tgt = $(event.target);
		if (!tgt.attr("class")) tgt = tgt.parent();
		var hero = tgt.attr("class").replace("hero _" , "").replace("highlight", "");

		Main.k.Manager.selectTab($("#tabsearch"));
		$("#searchfield").val("@" + hero);
		Main.k.Manager.search();
	};

	Main.k.Manager.replyloaded = false;
	Main.k.Manager.fillReply = function() {
		if (Main.k.Manager.replyloaded) {
			// Update message content
			if (Main.k.Manager.replywaiting != "") {
				 $("#tabreply_content").find(".tid_wallPost").val(Main.k.Manager.replywaiting);
				Main.k.Manager.replywaiting = "";
			}
		} else {
			var newpost = $("#tabreply_content").empty();
			newpost.html("<div class='loading'><img src='http://twinoid.com/img/loading.gif' alt='Chargement' /> "+Main.k.text.gettext("Chargement…")+"</div>");
			Main.k.LoadJS('/mod/wall/post', {_id: "tabreply_content"}, function() {
				Main.k.Manager.replyloaded = true;

				// Remove inactive tags
				var $tabreply_content = $("#tabreply_content");
				$tabreply_content.find(".tid_advanced").remove();
				$tabreply_content.find(".tid_button").remove();
				$tabreply_content.find(".tid_options").remove();
				$tabreply_content.find(".tid_editorBut_question").remove();
				$tabreply_content.find(".tid_editorBut__user").remove();
				// TODO: remove inactive tags in main chat

				$tabreply_content.find(" #tid_wallPost_preview").attr("id", "").addClass("tid_wallPost_preview");
				$tabreply_content.find(" #tid_wallPost").attr("id", "").addClass("tid_wallPost");

				var preview = $tabreply_content.find(".tid_wallPost_preview").attr("id", "").addClass("reply bubble");
				if (Main.k.Options.cbubbles) preview.addClass("bubble_" + Main.k.ownHero);
				if (Main.k.Options.cbubblesNB) preview.addClass("custombubbles_nobackground");

				var bubble = Main.k.ownHero;
				$("<div>").addClass("char " + bubble).appendTo(preview);
				$("<span>").addClass("buddy").html(Main.k.ownHero.replace('_',' ').capitalize() + " : ").appendTo(preview);
				$("<p>").addClass("tid_preview tid_editorContent tid_wallPost_preview").appendTo(preview);
				$("<div>").addClass("clear").appendTo(preview);

				// Actions
				var buttons = $("<div>").addClass("tid_buttons").appendTo($tabreply_content);
				var answer = Main.k.MakeButton("<img src='http://twinoid.com/img/icons/reply.png' /> "+ Main.k.text.gettext("Répondre au topic"),null,function() {
					var $tid_wallPost = $tabreply_content.find(".tid_wallPost");
					var val = $tid_wallPost.val();
					var k = Main.k.Manager.displayedTopic;
					Main.k.postMessage(k, val, Main.k.Manager.update);
					$tid_wallPost.val("");

					Main.k.Manager.waitingforupdate = true;
					setTimeout(function() {
						if (Main.k.Manager.waitingforupdate) Main.k.Manager.update();
					}, 5000);
				})
				.css({display: "inline-block", margin: "4px 4px 8px"})
				.appendTo(buttons)
				.find("a")
				.attr("_title", "Répondre").attr("_desc", Main.k.text.gettext("Envoyer ce message en tant que réponse au topic affiché ci-contre."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

				var newtopic = Main.k.MakeButton("<img src='http://twinoid.com/img/icons/reply.png' /> " + Main.k.text.gettext("Nouveau topic"),null,function() {
					var $tid_wallPost = $tabreply_content.find(".tid_wallPost");
					var val = $tid_wallPost.val();
					Main.k.newTopic(val, Main.k.Manager.update);
					$tid_wallPost.val("");
				})
				.css({display: "inline-block", margin: "4px 4px 8px"})
				.appendTo(buttons)
				.find("a")
				.attr("_title", "Nouveau topic").attr("_desc", Main.k.text.gettext("Poster ce message en tant que nouveau topic."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);


				if(typeof(js.Lib.window["editor_tid_wallPost"]) == 'undefined'){
					js.Lib.window["editor_tid_wallPost"] = {};
				}
				// Modify preview
				js.Lib.window["editor_tid_wallPost"].preview = preview;

				// Remove inactive icons
				js.Lib.window["editor_tid_wallPost"].loadSmileys = function(q) {
					var k;
					var _g = this;
					this.initIcons();
					if(this.smileysPanel.find(".tid_active").removeClass("tid_active")["is"](q)) return this.hideSmileys(true);
					this.hideSmileys(false);
					var cid = q.attr("tid_cat");
					var cat = null;
					if(cid != "_funtag") {
						var $it0 = this.config.icons.iterator();

						while( $it0.hasNext() ) {
							/** @type {{category:string}} **/
							var c = $it0.next();
							if(c.category == cid) {
								cat = c;
								break;
							}
						}
						if(cat == null) return false;
					}
					var s = new StringBuf();
					s.b += "<div class=\"tid_smileyPopUp\">";
					if(cid == "_funtag") {
						s.b += Std.string("<div class=\"tid_title\">" + this.config.funTitle + "</div>");
						var keys = [];
						var $it1 = this.config.fun.keys();
						while( $it1.hasNext() ) {
							k = $it1.next();
							keys.push(k);
						}
						keys.sort(function(a,b) {
							return Reflect.compare(a,b);
						});
						var _g1 = 0;
						while(_g1 < keys.length) {
							k = keys[_g1];
							++_g1;
							s.b += Std.string("<a class=\"tid_fun\" href=\"#\" tid_s=\"" + StringTools.htmlEscape("{" + k + "}") + "\"><img src=\"http://" + _tid.host + "/img/icons/" + this.config.fun.get(k).i + ".png\" alt=\"" + k + "\" title=\"" + StringTools.htmlEscape(this.config.fun.get(k).n) + "\"/>" + StringTools.htmlEscape(this.config.fun.get(k).n) + "</a>");
						}
					} else {
						s.b += Std.string("<div class=\"tid_title\">" + cat.category + "</div>");
						s.b += "<div class=\"tid_wrapper\">";
						var $it2 = cat.icons.iterator();
						var a = true;
						while( $it2.hasNext() ) {
							var i = $it2.next();

							// Ignore incorrect icons
							if (cat.category == "Mush") {
								// Delete inactive icons
								if (i.image == "/ui/o2.png") continue;
								if (i.tag == ":mush_pa_gen:") continue;
								if (i.tag == ":mush_pa_mov:") continue;
								if (i.tag == ":mush_planet:") continue;

								// Modify incorrect icons
								if (i.tag == ":mush_pa:") {
									i.tag = ":pa:";
									i.image = "/img/icons/ui/pa_slot1.png";
								} else if (i.tag == ":mush_pm:") {
									i.tag = ":pm:";
									i.image = "/img/icons/ui/pa_slot2.png";
								} else if (i.tag == ":mush_exp:") {
									i.tag = ":xp:";
									i.image = "/img/icons/ui/xp.png";
								}
							}

							var str = i.tag;
							var desc = i.tag;
							if(i.alt != null) {
								str = i.alt;
								desc = i.alt + ", " + i.tag;
							}
							var mh = "";
							if(i.max != null) mh += "<span class=\"tid_max tid_max_" + i.tag.split(":").join("") + "\">" + i.max + "</span>";
							s.b += Std.string("<a class=\"tid_smiley\" href=\"#\">" + mh + "<img src=\"" + cat.url + i.image + "\" tid_s=\"" + StringTools.htmlEscape(str) + "\" title=\"" + StringTools.htmlEscape(desc) + "\"/></a>");
						}
						s.b += "</div>";
					}
					s.b += "<div class=\"tid_clear\"></div>";
					s.b += "</div>";
					q.addClass("tid_active");
					var pop = $(s.b);
					q.parent().append(pop);
					pop.hide().slideDown(200);
					if(cid == "_funtag") pop.find("a.tid_fun").click(function() {
						_g.insert($(this).attr("tid_s"));
						return false;
					}); else pop.find("a.tid_smiley").click(function() {
						var m = $(this).find(".tid_max");
						if(m.length > 0 && Std.parseInt(m.html()) == 0) return false;
						_g.insert($(this).find("img").attr("tid_s"));
						return false;
					});
					return false;
				};

				// Auto-load Mush icons
				//$("#editor_tid_wallPost").loadSmileys($("#editor_tid_wallPost a.tid_smcat[tid_cat='Mush']"));

				// Update message content
				if (Main.k.Manager.replywaiting != "") {
					$tabreply_content.find(".tid_wallPost").val(Main.k.Manager.replywaiting);
					Main.k.Manager.replywaiting = "";
				}
			});
		}
	};

	Main.k.Manager.customloaded = false;
	Main.k.Manager.fillCustom = function() {
		if (Main.k.Manager.customloaded) {
			// Update message content
			if (Main.k.Manager.replywaiting != "") {
				$("#tabcustom_content").find(".tid_wallPost").val(Main.k.Manager.replywaiting);
				Main.k.Manager.replywaiting = "";
			}
		} else {

			var newpost = $("#tabcustom_content").empty();
			newpost.html("<div class='loading'><img src='http://twinoid.com/img/loading.gif' alt='Chargement' /> "+Main.k.text.gettext("Chargement…")+"</div>");
			Main.k.LoadJS('/mod/wall/post', {_id: "tabcustom_content"}, function() {
				Main.k.Manager.customloaded = true;

				// Remove inactive tags
				var $tabcustom_content = $("#tabcustom_content");
				$tabcustom_content.find(".tid_advanced").remove();
				$tabcustom_content.find(".tid_button").remove();
				$tabcustom_content.find(".tid_options").remove();
				$tabcustom_content.find(".tid_editorBut_question").remove();
				$tabcustom_content.find(".tid_editorBut__user").remove();
				// TODO: remove inactive tags in main chat

				$tabcustom_content.find("#tid_wallPost_preview").attr("id", "").addClass("tid_wallPost_preview");
				$tabcustom_content.find("#tid_wallPost").attr("id", "").addClass("tid_wallPost");

				var preview = $tabcustom_content.find(".tid_wallPost_preview").addClass("reply bubble");
				if (Main.k.Options.cbubbles) preview.addClass("bubble_" + Main.k.ownHero);
				if (Main.k.Options.cbubblesNB) preview.addClass("custombubbles_nobackground");

				var bubble = Main.k.ownHero.replace(/(\s)/g, "_").toLowerCase();
				$("<div>").addClass("char " + bubble).appendTo(preview);
				$("<span>").addClass("buddy").html(Main.k.ownHero.capitalize() + " : ").appendTo(preview);
				$("<p>").addClass("tid_preview tid_editorContent tid_wallPost_preview").appendTo(preview);
				$("<div>").addClass("clear").appendTo(preview);

				// Actions
				var buttons = $("<div>").addClass("tid_buttons").appendTo($tabcustom_content);
				var answer = Main.k.MakeButton("<img src='http://twinoid.com/img/icons/reply.png' /> "+ Main.k.text.gettext("Répondre au topic"),null,function() {
					var $tid_wallPost = $tabcustom_content.find(".tid_wallPost");
					var val = $tid_wallPost.val();
					var k = Main.k.Manager.displayedTopic;
					Main.k.postMessage(k, val, Main.k.Manager.update);
					$tid_wallPost.val("");

					Main.k.Manager.waitingforupdate = true;
					setTimeout(function() {
						if (Main.k.Manager.waitingforupdate) Main.k.Manager.update();
					}, 5000);
				})
				.css({display: "inline-block", margin: "4px 4px 8px"})
				.appendTo(buttons)
				.find("a")
				.attr("_title", "Répondre").attr("_desc", Main.k.text.gettext("Envoyer ce message en tant que réponse au topic affiché ci-contre."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

				var newtopic = Main.k.MakeButton("<img src='http://twinoid.com/img/icons/reply.png' /> " + Main.k.text.gettext("Nouveau topic"),null,function() {
					var $tid_wallPost = $tabcustom_content.find(".tid_wallPost");
					var val = $tid_wallPost.val();
					Main.k.newTopic(val, Main.k.Manager.update);
					$tid_wallPost.val("");
				})
				.css({display: "inline-block", margin: "4px 4px 8px"})
				.appendTo(buttons)
				.find("a")
				.attr("_title", "Nouveau topic").attr("_desc", Main.k.text.gettext("Poster ce message en tant que nouveau topic."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

				var addmsg = Main.k.MakeButton("<img src='http://mush.vg/img/icons/ui/fav.png' /> " + Main.k.text.gettext("Ajouter aux favoris"),null,function() {
					var $tid_wallPost = $tabcustom_content.find(".tid_wallPost");
					var message = $tid_wallPost.val();
					Main.k.CreateNeronPrompt();
					$("#validate").click(function(){
						var title = $("#neron_alert_content").find("input").val();
						Main.k.ClosePopup();
						try{
							Main.k.Manager.addMsgPrerecorded(title,message);
						}
						catch(e){
							if(e.name == "MessageAlreadyExist"){
								Main.k.CreateNeronAlert(Main.k.text.gettext("Le message existe déjà."));
							}
							else if(e.name == "TitleEmpty"){
								Main.k.CreateNeronAlert(Main.k.text.gettext("Le titre est vide."));
							}
							else if(e.name == "MessageEmpty"){
								Main.k.CreateNeronAlert(Main.k.text.gettext("Le message est vide."));
							}
							else if(Main.k.debug){
								Main.k.treatingBug(e);
							}
						}
					});

				})
				.css({display: "inline-block", margin: "4px 4px 8px"})
				.appendTo(buttons)
				.find("a")
				.attr("_title", "Ajouter aux favoris").attr("_desc", Main.k.text.gettext("Ajouter un message à votre liste des messages pré-enregistrés."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

				var delmsg = Main.k.MakeButton("<img src='http://mush.vg/img/icons/ui/bin.png' /> " + Main.k.text.gettext("Supprimer un favori"),null,function() {
					try{
						var title = $tabcustom_content.find(".array_messages_prerecorded .selected").text();
						Main.k.Manager.delMsgPrerecorded( title );
					}
					catch(e){
						if(e.name == "MessageNotExist"){
							Main.k.CreateNeronAlert(Main.k.text.gettext("Le message que vous voulez supprimer n'existe pas."));
						}
						else if(Main.k.debug){
							Main.k.treatingBug(e);
						}
					}
				})
				.css({display: "inline-block", margin: "4px 4px 8px"})
				.appendTo(buttons)
				.find("a")
				.attr("_title", "Supprimer un favori").attr("_desc", Main.k.text.gettext("Supprimer une message de votre liste des messges pré-enregistrés."))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

				if(typeof(js.Lib.window["editor_tid_wallPost"]) == 'undefined'){
					js.Lib.window["editor_tid_wallPost"] = {};
				}
				// Modify preview
				js.Lib.window["editor_tid_wallPost"].preview = preview;

				// Remove inactive icons
				js.Lib.window["editor_tid_wallPost"].loadSmileys = function(q) {
					var k;
					var _g = this;
					this.initIcons();
					if(this.smileysPanel.find(".tid_active").removeClass("tid_active")["is"](q)) return this.hideSmileys(true);
					this.hideSmileys(false);
					var cid = q.attr("tid_cat");
					var cat = null;
					if(cid != "_funtag") {
						var $it0 = this.config.icons.iterator();

						while( $it0.hasNext() ) {
							/** @type {{category:string}} **/
							var c = $it0.next();
							if(c.category == cid) {
								cat = c;
								break;
							}
						}
						if(cat == null) return false;
					}
					var s = new StringBuf();
					s.b += "<div class=\"tid_smileyPopUp\">";
					if(cid == "_funtag") {
						s.b += Std.string("<div class=\"tid_title\">" + this.config.funTitle + "</div>");
						var keys = [];
						var $it1 = this.config.fun.keys();
						while( $it1.hasNext() ) {
							k = $it1.next();
							keys.push(k);
						}
						keys.sort(function(a,b) {
							return Reflect.compare(a,b);
						});
						var _g1 = 0;
						while(_g1 < keys.length) {
							k = keys[_g1];
							++_g1;
							s.b += Std.string("<a class=\"tid_fun\" href=\"#\" tid_s=\"" + StringTools.htmlEscape("{" + k + "}") + "\"><img src=\"http://" + _tid.host + "/img/icons/" + this.config.fun.get(k).i + ".png\" alt=\"" + k + "\" title=\"" + StringTools.htmlEscape(this.config.fun.get(k).n) + "\"/>" + StringTools.htmlEscape(this.config.fun.get(k).n) + "</a>");
						}
					} else {
						s.b += Std.string("<div class=\"tid_title\">" + cat.category + "</div>");
						s.b += "<div class=\"tid_wrapper\">";
						var $it2 = cat.icons.iterator();
						var a = true;
						while( $it2.hasNext() ) {
							var i = $it2.next();

							// Ignore incorrect icons
							if (cat.category == "Mush") {
								// Delete inactive icons
								if (i.image == "/ui/o2.png") continue;
								if (i.tag == ":mush_pa_gen:") continue;
								if (i.tag == ":mush_pa_mov:") continue;
								if (i.tag == ":mush_planet:") continue;

								// Modify incorrect icons
								if (i.tag == ":mush_pa:") {
									i.tag = ":pa:";
									i.image = "/img/icons/ui/pa_slot1.png";
								} else if (i.tag == ":mush_pm:") {
									i.tag = ":pm:";
									i.image = "/img/icons/ui/pa_slot2.png";
								} else if (i.tag == ":mush_exp:") {
									i.tag = ":xp:";
									i.image = "/img/icons/ui/xp.png";
								}
							}

							var str = i.tag;
							var desc = i.tag;
							if(i.alt != null) {
								str = i.alt;
								desc = i.alt + ", " + i.tag;
							}
							var mh = "";
							if(i.max != null) mh += "<span class=\"tid_max tid_max_" + i.tag.split(":").join("") + "\">" + i.max + "</span>";
							s.b += Std.string("<a class=\"tid_smiley\" href=\"#\">" + mh + "<img src=\"" + cat.url + i.image + "\" tid_s=\"" + StringTools.htmlEscape(str) + "\" title=\"" + StringTools.htmlEscape(desc) + "\"/></a>");
						}
						s.b += "</div>";
					}
					s.b += "<div class=\"tid_clear\"></div>";
					s.b += "</div>";
					q.addClass("tid_active");
					var pop = $(s.b);
					q.parent().append(pop);
					pop.hide().slideDown(200);
					if(cid == "_funtag") pop.find("a.tid_fun").click(function() {
						_g.insert($(this).attr("tid_s"));
						return false;
					}); else pop.find("a.tid_smiley").click(function() {
						var m = $(this).find(".tid_max");
						if(m.length > 0 && Std.parseInt(m.html()) == 0) return false;
						_g.insert($(this).find("img").attr("tid_s"));
						return false;
					});
					return false;
				};

				// Auto-load Mush icons
				//$("#editor_tid_wallPost").loadSmileys($("#editor_tid_wallPost a.tid_smcat[tid_cat='Mush']"));


				var array_msg = $("<p>").addClass("array_messages_prerecorded").prependTo( $tabcustom_content );

				var messages_prerecorded = [];
				if(Main.k.Manager.msgs_prerecorded != undefined ){
					messages_prerecorded = Main.k.Manager.msgs_prerecorded;
				}

				for(var idMsg = 0;idMsg<messages_prerecorded.length;idMsg++){
					$("<span>"+ messages_prerecorded[idMsg][0] +"</span>").addClass("message_prerecorded")
					.appendTo(array_msg)
					.click(function(){
							if($(this).is(".selected")){
								$tabcustom_content.find(".array_messages_prerecorded .selected").removeClass("selected");
								$tabcustom_content.find(".tid_wallPost").val("");
							}else {
								$tabcustom_content.find(".array_messages_prerecorded .selected").removeClass("selected");
								$(this).addClass("selected");

								var msgPrerecorded = "";
								try{
									msgPrerecorded = Main.k.Manager.getMsgPrerecorded($(this).text());
								}catch(e){
									if(Main.k.debug){
										Main.k.treatingBug(e);
									}
								}
								$tabcustom_content.find(".tid_wallPost").val(msgPrerecorded);
							}
					});
				}
			});

				// Update message content
				if (Main.k.Manager.replywaiting != "") {
					newpost.find(".tid_wallPost").val(Main.k.Manager.replywaiting);
					Main.k.Manager.replywaiting = "";
				}
		}
	};

	Main.k.Manager.initHeroes = function() {
		Main.k.Manager.heroes["neron"] = { name: "neron", mess: 0, av: 0, a: 0 };
		for (var i=0; i<Main.k.HEROES.length; i++) {
			Main.k.Manager.heroes[Main.k.HEROES[i]] = { name: Main.k.HEROES[i], mess: 0, topic: 0 };
		}
	};
	Main.k.Manager.waitingforupdate = false;
	Main.k.Manager.update = function() {
		Main.k.Manager.waitingforupdate = false;
		Main.k.Manager.initHeroes();
		Main.k.Manager.parseWall($(".cdWallChannel"));
		Main.k.Manager.fillStats();
		Main.k.Manager.fillNewFav();
		Main.k.Manager.fillWall();
		Main.k.Manager.fillSearch();
		Main.k.Manager.fillReply();
		Main.k.Manager.fillCustom();

		// Update current displayed topic
		if (Main.k.Manager.displayedTopic) {
			Main.k.Manager.displayTopic(Main.k.Manager.getTopicByTid(Main.k.Manager.displayedTopic).id);
		}
	};
	Main.k.Manager.selectTopic = function(k) {
		var tid = Main.k.Manager.getTopicByTid(k).id;
		Main.k.Manager.displayTopic(tid);
	};

	Main.k.Manager.msgs_prerecorded = [];
	Main.k.Manager.getMsgPrerecorded = function(title){
		var messages_prerecorded = [];
		if(this.msgs_prerecorded != undefined){
			messages_prerecorded = this.msgs_prerecorded ;
		}

		for(var idMsg = 0;idMsg < messages_prerecorded.length;idMsg++){
			if(title == messages_prerecorded[idMsg][0]){
				return messages_prerecorded[idMsg][1];
			}
		}

		throw new this.Exception("MessageNotExist");
	};
	Main.k.Manager.addMsgPrerecorded = function(title, message) {
		if(title == "" || title == undefined){
			throw new this.Exception("TitleEmpty");
		}
		else if(message == ""){
			throw new this.Exception("MessageEmpty");
		}

		var messages_prerecorded = [];
		if(this.msgs_prerecorded != undefined){
			messages_prerecorded = this.msgs_prerecorded ;
		}

		for(var idMsg = 0;idMsg < messages_prerecorded.length;idMsg++){
			if(title == messages_prerecorded[idMsg][0]){
				throw new this.Exception("MessageAlreadyExist");
			}
		}

		messages_prerecorded.push([title,message]);
		this.msgs_prerecorded = messages_prerecorded;
		this.saveMsgsPrerecorded();
		this.customloaded = false;
		this.fillCustom();
	};
	Main.k.Manager.delMsgPrerecorded = function(title) {
		var messages_prerecorded = [];
		var isFound = false;
		if(this.msgs_prerecorded != undefined){
			messages_prerecorded = this.msgs_prerecorded ;
		}
		for(var idMsg = 0;idMsg < messages_prerecorded.length;idMsg++){
			if(title == messages_prerecorded[idMsg][0]){
				messages_prerecorded.splice(idMsg,1);
				isFound = true;
			}
		}

		if(isFound){
			this.msgs_prerecorded = messages_prerecorded;
			this.saveMsgsPrerecorded();
			this.customloaded = false;
			this.fillCustom();
		}
		else{
			throw new this.Exception("MessageNotExist");
		}
	};
	Main.k.Manager.loadMsgsPrerecorded = function(msgs_prerecorded,json) {
		var msgs_prerecorded_json;
		if(typeof(msgs_prerecorded) != 'undefined') {
			if (typeof(json) != 'undefined' && !json) {
				msgs_prerecorded_json = JSON.stringify(msgs_prerecorded);
			} else {
				msgs_prerecorded_json = msgs_prerecorded;
				msgs_prerecorded = JSON.parse(msgs_prerecorded);
			}
			this.msgs_prerecorded = msgs_prerecorded;
			localStorage.setItem("ctrlw_msgs_prerecorded", msgs_prerecorded_json);
		}else{
			msgs_prerecorded_json = localStorage.getItem("ctrlw_msgs_prerecorded");
			if(msgs_prerecorded_json != null){
				this.msgs_prerecorded = JSON.parse(msgs_prerecorded_json);
			}
		}
	};
	Main.k.Manager.saveMsgsPrerecorded = function() {
		localStorage.setItem("ctrlw_msgs_prerecorded",JSON.stringify(Main.k.Manager.msgs_prerecorded));
		callbacks_storage_sync.fire();
	};

	Main.k.Manager.Exception = function(name){
		this.name = name;
	};
	// == /MessageManager =========================================




	Main.k.AliveHeroes = [];
	Main.k.MushInit = function() {
		console.log('MushInit');
		var cook_session = js.Cookie.get("ctrlwsession");
		var sid = js.Cookie.get("sid");
		if(typeof(sid) == 'undefined'){
			sid = js.Cookie.get("mush_sid");
		}
		if(typeof(cook_session) == 'undefined' || sid.hashCode() != cook_session){
			Main.k.Sync.pull();
			localStorage.removeItem('ctrlw_newgame');
		}
		js.Cookie.set("ctrlwsession",sid.hashCode(),420000000);

		Main.k.Profiles.load();
		Main.k.Manager.loadMsgsPrerecorded();
		Main.k.AliveHeroes = [];
		Main.k.GameInfos.init();

		var $content = $("#content");
		// Handle Mush Logo (option)
		if (Main.k.Options.dlogo) {
			$content.css({ position: "absolute", top: "120px", left: "125px" });
			$content.find("[class^=logo]").css({ top: "-100px" });
			$("body").css("background-position", "50% 20px");
		} else {
			$content.css({ position: "absolute", top: "40px", left: "125px" });
			$content.find("[class^=logo]").css({ display: "none" });
		}
		var vending = $(".butmini.distr").css("display", "none");
		if (vending.length > 0) {
			$("#vendingmenu").css("display", "inline");
		}

		// Add left bar
		// ----------------------------------- //
		var leftbar = $("<div>").addClass("usLeftbar").insertBefore($content);
		Main.k.MakeButton("<img src='" + Main.k.servurl + "/img/ctrlw_sml.png' height='16' /> " + Main.k.version, null, Main.k.About.open, Main.k.text.gettext("à propos").capitalize(), Main.k.text.gettext("Cliquez ici pour plus d'informations sur le script.")).css({
			display: "inline-block",
			margin: "0 auto 10px"
		}).appendTo($("<div>").css("text-align", "center").appendTo(leftbar));
		// ----------------------------------- //

		// Sync Push on leave
		// ----------------------------------- //
		$(window).bind('beforeunload', function(event){
			console.warn('beforeunload',Main.k.Sync.push_timer);
			if(Main.k.Sync.push_timer != null){
				return Main.k.text.gettext("CTRL+W : Veuillez attendre la fin de la synchronisation avant de quitter cette page.");
			}

		});
		// ----------------------------------- //

		// Misc tools
		// ----------------------------------- //
		$("<h3>").addClass("first").html(Main.k.text.gettext("outils").capitalize()).appendTo(leftbar);

		// Update Manager
		Main.k.MakeButton("<img src='http://twinoid.com/img/icons/new.png' /> " + Main.k.text.gettext("Mise à jour"), null, null, Main.k.text.gettext("Mise à jour du script"),
			"Une nouvelle version du script CTRL+W est disponible.")
			.appendTo(leftbar).attr("id", "updatebtn").css("display", "none").find("a").on("mousedown", Main.k.UpdateDialog);


		//Integration with others scripts
		$(window).load(function () {
			setTimeout(function () {
				var $mushUSMenu = $('#mushUSMenu');
				//Mush Helper script
				if ($mushUSMenu.length > 0) {
					var wrapper_mhs = $mushUSMenu.parents(":eq(2)");
					wrapper_mhs.css('left', '-' + (wrapper_mhs.width()) + 'px');
					var arrow = wrapper_mhs.find('.arrowright');
					arrow.attr('class', 'arrowleft');
					arrow.off('click');
					arrow.toggle(function () {
						wrapper_mhs.animate({left: 0}, 500);
					}, function () {
						wrapper_mhs.animate({left: '-' + wrapper_mhs.width() + 'px'}, 500);
					});

					Main.k.MakeButton("<img src='http://mush.twinoid.com/img/icons/ui/talkie.png' style='vertical-align: -20%' /> " + 'MHS', null, null, 'Mush Helper Script'
					).insertAfter($('#updatebtn')).find("a").on("mousedown", function () {
							wrapper_mhs.find('.arrowleft').trigger('click');
						});
				}

				var s_astro_icon = '';
				if ($('#astro_maj_inventaire').length > 0) {
					var img_astro = $('<img class="" src="/img/icons/ui/pa_comp.png" height="14"/>');
					var $share_inventory_button = $('#share-inventory-button');
					$share_inventory_button.find('a img').remove();
					$share_inventory_button.find('a').prepend(img_astro);
					img_astro.addClass('blink-limited');

				}

			}, 10);

		});

		// Message Manager
		Main.k.MakeButton("<img src='http://twinoid.com/img/icons/archive.png' style='vertical-align: -20%' /> "+ Main.k.text.gettext("Msg Manager"), null, null, Main.k.text.gettext("Message Manager"),
			Main.k.text.gettext("Ne manquez plus de messages ! Tous les topics avec des messages non lus seront mis en évidence, et vous pourrez effectuer des recherches par auteur ou contenu."))
		.appendTo(leftbar).find("a").on("mousedown", Main.k.Manager.open);

		// Options Manager
		Main.k.MakeButton("<img src='/img/icons/ui/pa_eng.png' style='vertical-align: -20%' /> "+ Main.k.text.gettext("Options"), null, null, Main.k.text.gettext("Gérer les options"), Main.k.text.gettext("Certaines fonctionnalitées de Ctrl+W sont configurables. Cliquez ici pour spécifier vos préférences."))
		.appendTo(leftbar).find("a").on("mousedown", Main.k.Options.open);

		// Sync Manager
		Main.k.MakeButton("<img src='/img/icons/ui/comm.png' style='vertical-align: -20%' class=\"ctrlw_normal\"/>" +
				"<img src='http://imgup.motion-twin.com/twinoid/a/c/1d84a74e_4030.jpg' style='vertical-align: -20%;display:none' class=\"ctrlw_down\" />" +
				"<img src='http://imgup.motion-twin.com/twinoid/8/f/0c596094_4030.jpg' style='vertical-align: -20%;display:none' class=\"ctrlw_up\" /> "+
				"<img src='http://imgup.motion-twin.com/twinoid/3/a/830c06f5_4030.jpg' style='vertical-align: -20%;display:none' class=\"ctrlw_wheels\" /> "+
				'<span class="txt">' + Main.k.text.gettext("Sync") + '</span> <span class="counter"></span>', null, null, Main.k.text.gettext("Sync"), Main.k.text.gettext("Permet de synchroniser les données du script entre vos différents navigateurs")
			)
			.attr('id','ctrlw_sync_button')
			.appendTo(leftbar).find("a").on("mousedown", Main.k.Sync.display);

		// Page reloader
		Main.k.MakeButton("<img src='http://twinoid.com/img/icons/refresh.png' style='vertical-align: -20%' /> "+ Main.k.text.gettext("Actualiser"), null, null, Main.k.text.gettext("Actualiser"),
			Main.k.text.gettext("Actualiser la page sans tout recharger. <strong>Fonctionnalité en cours d'optimisation.</strong>"))
		.appendTo(leftbar).find("a").on("mousedown", function() {
			// TODO: loading screen -- Optimize

			Main.refreshChat();
			Main.acListMaintainer.refresh(true);
			Main.syncInvOffset(null,true);
			Main.doChatPacks();
			Main.topChat();
			Main.onChanDone(ChatType.Local[1],true)
		});

		Main.k.MakeButton(Main.k.text.gettext("Nouvelle partie ?"), null, null, Main.k.text.gettext("Nouvelle partie"),
		Main.k.text.gettext("Vous venez de commencer une nouvelle partie ? Utilisez ce bouton pour supprimer les informations de votre ancienne partie"))
		.attr('id', 'button_new_game')
		.appendTo(leftbar).find("a").on("mousedown", function () {
			if (confirm(Main.k.text.gettext("Êtes vous sûr de vouloir effacer les informations de la partie précédente ?"))) {
				localStorage.removeItem('ctrlw_newgame');
				Main.k.Profiles.clear();
				Main.k.GameInfos.clear();
				Main.k.MushUpdate();
				//$('#button_new_game').remove();
			}

		});
		// ----------------------------------- //

		// Exploration
		// ----------------------------------- //
		$("<div>").attr("id", "expblock").appendTo(leftbar);
		// ----------------------------------- //

		// Heroes' titles
		// ----------------------------------- //
		var t = $('<h3 class="titles_title"></h3>').html(Main.k.text.gettext("titres").capitalize()).appendTo(leftbar);
		$("<span>").addClass("displayless").attr("_target", "#titles_list").appendTo(t).on("click", Main.k.ToggleDisplay);
		$("<div>").addClass("titles_list").attr("id", "titles_list").appendTo(leftbar);
		// ----------------------------------- //


		// Heroes
		// ----------------------------------- //
		t = $("<h3>").html(Main.k.text.gettext("Présent(s)").capitalize()).appendTo(leftbar);
		$("<span>").addClass("displaymore").attr("_target", "#heroes_list").appendTo(t).on("click", Main.k.ToggleDisplay);
		$("<div>").attr("id", "heroes_list").css("display", "none").appendTo(leftbar);
		t = $("<h3>").addClass("ctrlw-sidebar-title-crew").html(Main.k.text.gettext("équipage").capitalize()).appendTo(leftbar);
		$("<span>").addClass("displayless").attr("_target", "#crew_list").appendTo(t).on("click", Main.k.ToggleDisplay);
		$("<div>").attr("id", "crew_list").css("display", "block").appendTo(leftbar);
		// ----------------------------------- //


		// Inventory
		// ----------------------------------- //
		t = $("<h3>").html(Main.k.text.gettext("inventaire").capitalize()).appendTo(leftbar);
		$("<span>").addClass("displaymore").attr("_target", ".kobject_list").appendTo(t).on("click", Main.k.ToggleDisplay);
		$("<div>").addClass("inventory kobject_list").css("display", "none").appendTo(leftbar);
		$("<div>").css({"clear": "both", "height": "5px"}).appendTo(leftbar);

		// Inventory actions
		Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> " + Main.k.text.gettext("Partager") , null, null, Main.k.text.gettext("Partager l'inventaire"),
			Main.k.text.gettext("<p>Insère l'inventaire de la pièce dans la zone de texte active, de la forme&nbsp;:</p><p><strong>Couloir central :</strong> <i>Combinaison</i>, <i>Couteau</i>, <i>Médikit</i>, <i>Extincteur</i></p><p><strong>Partage aussi sur Astropad si celui-ci est installé.</strong></p>")
		).appendTo(leftbar)
		.attr('id','share-inventory-button')
		.find("a").on("mousedown", function(e) {
			Main.k.SyncAstropad(e);
			$('textarea:focus').each(function(e) {
				var txt = Main.k.FormatInventory();
				$(this).insertAtCaret(txt);
			});
			return false;
		});
		Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> "+ Main.k.text.gettext("Consommables"), null, null, Main.k.text.gettext("Partager les effets des consommables"),
			Main.k.text.gettext("Insère la liste des consommables avec leurs effets dans la zone de texte active, de la forme&nbsp;:</p><p>TODO: aperçu</p>"))
		.attr("id", "pharmashare").css("display", "none").appendTo(leftbar)
		.find("a").on("mousedown", function(e) {
			$('textarea:focus').each(function(e) {
				var txt = Main.k.FormatPharma();
				$(this).insertAtCaret(txt);
			});
			return false;
		});
		//Main.k.MakeButton("<img src='/img/icons/ui/notes.gif' /> Daedalus", null, null, Main.k.text.gettext("Inventaire complet"),
		//	"Affiche l'inventaire complet du Daedalus, pièce par pièce.</p><p><strong>/!&#92; Fonctionnalité non codée</strong>").appendTo(leftbar);
		// ----------------------------------- //

		// Fix "o²"
		var $spaceshipstatus_li = $(".spaceshipstatus li");
		$spaceshipstatus_li.first().attr("onmouseover", $spaceshipstatus_li.first().attr("onmouseover").replace(/\(o²\)\s+/g, ""));

		// Lab - Nexus - Pilgred - Plants - Planets
		// ----------------------------------- //
		$("<div>").attr("id", "project_list").appendTo(leftbar);
		// ----------------------------------- //
	};
	Main.k.MushAfterInit = function() {
		console.info('Main.k.MushAfterInit',$().jquery);

		// Fix dimensions
		Main.k.Resize();
		$(window).resize(Main.k.Resize);
		$("#chatBlock").on("resize", Main.k.Resize);
	};

	Main.k.MushUpdate = function() {
		console.log('mushupdate');
		Main.k.MushInitHeroes();
		// Events
		// ----------------------------------- //
		$('#swf_ISO_MODULE').off('mousedown');
		$('#swf_ISO_MODULE').on('mousedown',function(){
			$('.kobject_list .selected').remove();
			if($('#cdInventory').is('.placard_on')){
				Main.closet.hide();
			}
		});

		var $wall_chatbox = $('#wall').find('.chatbox');
		$wall_chatbox.off('focus');
		$wall_chatbox.on('focus',function(){
			Main.k.extend.onChatFocus($(this),$(this).attr('id').replace(/[^0-9]+/,""));
		});

		var $wall_replybox = $('.cdReplyBlock .chatbox');
		$wall_replybox.off('focus');
		$wall_replybox.on('focus',Main.k.extend.onWallFocus);
		$wall_replybox.off('keydown input');
		$wall_replybox.removeAttr('onkeydown');
		$wall_replybox.on('keydown', Main.k.extend.onWallInput);
		$wall_replybox.on('input', function(){
			Tools.send2Store("mush_wallReply_" + $(this).attr("id"),$(this).val());
		});

		var $chatbox = $('#privateform .chatbox, #wall .chatbox');
		$chatbox.off('keydown input');
		$chatbox.removeAttr('onkeydown');
		$chatbox.on('keydown', Main.k.extend.onChatInput);
		$chatbox.on('input', function(){
			Tools.send2Store("mush_chatContent_" + $(this).attr("id"),$(this).val());
		});

		var $chatBlock = $('#chatBlock');
		$chatBlock.off('scroll');
		$chatBlock.on('scroll',Main.k.extend.onChatScroll);

		/** @type {{surname:string,statuses:List, titles:List, dev_surname:string, spores:string}} **/
		var hero;
		var bubble, t, i, j;
		var $usLeftbar = $(".usLeftbar");
		Main.k.hasTalkie = $("#walltab").length > 0;

		// Never hide unread msg
		$("table.treereply tr.not_read.cdRepl").css("display", "table-row");

		// Day and cycle save
		var cycle_time = $('.cycletime');
		if(cycle_time.length > 0){
			var regex = new RegExp("\\D+([0-9]{1,2}).*-.*([0-9]{1})");
			var result = regex.exec(cycle_time.text());
			if(result != null){
				Main.k.Game.updateDayAndCycle(result[1],result[2]);
			}


		}

		// Script updates
		// ----------------------------------- //
		Main.k.UpdateCheck();
		// ----------------------------------- //
		var $player_status = $('#player_status');
		if($player_status.length == 0){
			$player_status = $('<div id="player_status" style="position: absolute;right:6px;bottom:0"><img src="'+Main.k.statusImages['bronze']+'" alt="Bronze" title="Bronze" /></div>').appendTo('.sheetmain');
		}
		$player_status.html('<img src="'+Main.k.statusImages[Main.k.Game.data.player_status]+'" alt="'+Main.k.Game.data.player_status.capitalize()+'" title="'+Main.k.Game.data.player_status.capitalize()+'" />');
		Main.k.displayRemainingCyclesToNextLevel();

		// Titles
		// ----------------------------------- //
		/** @type {{skills:List}} **/
		// Display title list
		var o_hero;
		var maxshown = 4;
		var titles_list = $("#titles_list");
		titles_list.empty();

		// Commanders
		var commanders = $("<div>").appendTo(titles_list);
		$("<img>").addClass("icon").attr("src", "/img/icons/ui/title_01.png")
			/* Translators: This translation must be copied from the game. */
			.attr("_title", Main.k.text.gettext("Commandant"))
			/* Translators: This translation must be copied from the game. */
			.attr("_desc", Main.k.text.gettext("Le Commandant décide des planètes que le Daedalus explorera."))
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.k.hideTip)
			.appendTo(commanders);
		var commander_nb = 0;
		for (i=0; commander_nb<maxshown && i<Main.k.COMMANDERS.length; i++) {
			hero = Main.k.COMMANDERS[i];
			if($.inArray(hero,Main.k.HEROES) != -1) {
				o_hero = Main.k.Profiles.get(hero);
				if (!Main.k.Profiles.hasStatusWhichRemoveTitle(o_hero)) {
					commander_nb++;
					$("<img>")
						.addClass("body " + hero)
						.attr("src", "/img/design/pixel.gif")
						.css("cursor", "pointer")
						.data('dev_surname',hero)
						.on('click',function(){
							Main.k.Profiles.display($(this).data('dev_surname'));
						})
						.appendTo(commanders);
				}
			}
		}

		// Admins
		var admins = $("<div>").appendTo(titles_list);
		$("<img>").addClass("icon").attr("src", "/img/icons/ui/title_02.png")
			/* Translators: This translation must be copied from the game. */
			.attr("_title", Main.k.text.gettext("Administrateur NERON"))
			/* Translators: This translation must be copied from the game. */
			.attr("_desc", Main.k.text.gettext("Le responsable NERON semble avoir une certaine influence auprès de l'ordinateur de bord. Il est notamment le seul à avoir la possibilité de transmettre des messages à tout l'équipage."))
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.k.hideTip)
			.appendTo(admins);
		var admin_nb = 0;
		for (i=0; admin_nb<maxshown && i<Main.k.ADMINS.length; i++) {
			hero = Main.k.ADMINS[i];
			if($.inArray(hero,Main.k.HEROES) != -1) {
				o_hero = Main.k.Profiles.get(hero);
				if (!Main.k.Profiles.hasStatusWhichRemoveTitle(o_hero)) {
					admin_nb++;
					$("<img>")
						.addClass("body " + hero)
						.attr("src", "/img/design/pixel.gif")
						.css("cursor", "pointer")
						.data('dev_surname',hero)
						.on('click',function(){
							Main.k.Profiles.display($(this).data('dev_surname'));
						})
						.appendTo(admins);
				}
			}
		}

		// Comms manager
		var comms = $("<div>").appendTo(titles_list);
		$("<img>").addClass("icon").attr("src", "/img/icons/ui/title_03.png")
			/* Translators: This translation must be copied from the game. */
			.attr("_title", Main.k.text.gettext("Responsable de Communications"))
			/* Translators: This translation must be copied from the game. */
			.attr("_desc", Main.k.text.gettext("Le Responsable de Communications est la seule personne habilitée à décider quels seront les téléchargements prioritaires du Centre de Communication."))
			.on("mouseover", Main.k.CustomTip)
			.on("mouseout", Main.k.hideTip)
			.appendTo(comms);
		var comms_nb = 0;
		for (i=0; comms_nb<maxshown && i<Main.k.COMMS.length; i++) {
			hero = Main.k.COMMS[i];
			if($.inArray(hero,Main.k.HEROES) != -1){
				o_hero = Main.k.Profiles.get(hero);
				if(!Main.k.Profiles.hasStatusWhichRemoveTitle(o_hero)) {
					comms_nb++;
					$("<img>")
						.addClass("body " + hero)
						.attr("src", "/img/design/pixel.gif")
						.css("cursor", "pointer")
						.data('dev_surname',hero)
						.on('click',function(){
							Main.k.Profiles.display($(this).data('dev_surname'));
						})
						.appendTo(comms);
				}
			}
		}
		// ----------------------------------- //

		// Heroes
		// ----------------------------------- //

		if(Main.k.GameInfos.data.heroes_list.length == 0){
			if($('#ctrlw-warning-crew-list').length == 0){
				var $alert_crew_list = $('<img id="ctrlw-warning-crew-list" style="margin-left:10px;position: relative;top:5px;cursor:pointer" src="/img/icons/ui/broken.png" ' +
					'_title="'+Main.k.text.gettext("Attention")+'" ' +
					'_desc="'+Main.k.text.gettext("Pour avoir une liste d'équipage correcte, vous devez mettre à jour cette liste via le module Cryo. <br/>" +
						"Pour ce faire, veuillez vous rendre au labo, listez l'équipage via le module Cryo et cliquez sur le bouton au bas de la liste des personnages.<br/>" +
						"Attention, le bouton n'apparait que lorsque l'équipage est au complet." +
						"<p><strong>"+Main.k.text.gettext("Vous pouvez aussi modifier le duo Andrek/Chaola en cliquant sur l'icone")+"</strong></p>")+'"/>')
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip)
					.on('click', function(){
						Main.k.GameInfos.data.andrek = !Main.k.GameInfos.data.andrek;
						Main.k.GameInfos.save();
						Main.k.HEROES = Main.k.HEROES_ALL.slice();
						Main.k.MushUpdate();
						
					});
				$alert_crew_list.appendTo($('.ctrlw-sidebar-title-crew'));
			}
		}else{
			$('#ctrlw-warning-crew-list').remove();
		}
		var heroes_list = $("#heroes_list").empty();

		// Display players' skills & statuses
		var $it = Main.heroes.iterator();
		var missingheroes = [];
		while ($it.hasNext()) {
			hero = $it.next();
			var display = false;
			bubble = hero.dev_surname;
			var $save = $('<a href="#"><img src="/img/icons/ui/awake.png" /></a>')
				.css({
					'font-size': 0,
					position: 'absolute',
					right: 0,
					bottom: 0
				})
				.attr("_title", Main.k.text.gettext("Espionnage"))
				.attr("_desc", Main.k.text.gettext("<p>Vous êtes dans la même pièce que cette personne ; vous pouvez donc l'examiner de plus près.</p><p><strong>Cliquez ici pour enregistrer les compétences visibles, statuts publiques et titres de ce personnage.</strong></p>"))
				.data('dev_surname',bubble)
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip)
				.click(function(e){
					e.preventDefault();
					var dev_surname = $(this).data('dev_surname');
					Main.k.Profiles.set(dev_surname);
					Main.k.Profiles.display(dev_surname);
				});


			var statuses = $("<div>").addClass("icons statuses");
			if (hero.statuses) {
				var $_statuses = hero.statuses.iterator();
				while( $_statuses.hasNext() ) {
					display = true;
					/** @type {{img:string,desc:string}} **/
					var status = $_statuses.next();

					$("<img>").attr("src", "/img/icons/ui/status/" + status.img + ".png")
					.attr("height", "14").attr("alt", status.img)
					.attr("_title", status.name)
					.attr("_desc", status.desc)
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip)
					.appendTo(statuses);
				}
			}
			if (hero.spores) {
				var $spores = $('<div>')
					.css({
						position: 'relative',
						display: 'inline-block',
						'margin-left': '2px',
						top: '2px'
					})
					.appendTo(statuses);

				$("<img>").attr("src", "/img/icons/ui/spore.png")
					.attr("height", "16").attr("alt", hero.spores.name)
					.attr("_title", hero.spores.name)
					.attr("_desc", hero.spores.desc)
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip)
					.appendTo($spores);

				$('<span>')
					.text(hero.spores.nb)
					.css({
						'font-size': "10px",
						position: 'absolute',
						left: '4px',
						top: '3px',
						opacity: 0.7,
						'pointer-events': 'none'

					})
					.appendTo($spores);
			}

			var skills = $("<div>").addClass("icons skills");
			if (hero.skills) {
				var $_skills = hero.skills.iterator();
				while( $_skills.hasNext() ) {
					display = true;
					var skill = $_skills.next();
					var skilldom = $("<span>").addClass("skill").appendTo(skills);

					$("<img>").attr("src", "/img/icons/skills/" + skill.img + ".png")
					.attr("height", "19").attr("alt", skill.img)
					.attr("_title", skill.name)
					.attr("_desc", skill.desc + (Main.k.compInactiveMush[skill.img] ? "<p><strong>"+Main.k.text.gettext("Compétence inactive mush")+"</strong></p>" : ""))
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip)
					.appendTo(skilldom);

					if (Main.k.compInactiveMush[skill.img]) {
						$("<img>").attr("src", Main.k.servurl + "/img/non-mush.png").addClass("actmush")
						.attr("width", "10").attr("height", "10")
						.attr("_title", Main.k.text.gettext("Compétence inactive mush"))
						.attr("_desc", Main.k.text.gettext("Cette compétence est inactive quand on est mush (source : Twinpedia)."))
						.on("mouseover", Main.k.CustomTip)
						.on("mouseout", Main.k.hideTip)
						.appendTo(skilldom);
					}
				}
			}

			var titles = $("<div>").addClass("titles");
			if (hero.titles) {
				var $_titles = hero.titles.iterator();
				while( $_titles.hasNext() ) {
					var title = $_titles.next();

					$("<img>").attr("src", "/img/icons/ui/" + title.img + ".png")
					.attr("alt", title.img)
					.attr("_title", title.name)
					.attr("_desc", title.desc)
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip)
					.appendTo(titles);
				}
			}
			var heroDiv = $("<div>").addClass("hero").appendTo(heroes_list);
			$("<img>")
				.addClass("body " + bubble)
				.attr("src", "/img/design/pixel.gif")
				.css("cursor", "pointer")
				.attr("data-dev_surname", hero.dev_surname)
				.addHeroDescToolTip(hero.dev_surname)
				.on("click", function() {
					console.warn($(this).attr("data-dev_surname"));
					Main.k.Profiles.display($(this).attr("data-dev_surname"));
				})
				.appendTo(heroDiv);

			heroDiv.append(skills);
			heroDiv.append(statuses);
			heroDiv.append(titles);
			heroDiv.append($save);

		}
		var crew_list = $("#crew_list").empty();
		// Display all heroes
		var missingDiv = $("<div>").addClass("missingheroes").appendTo(crew_list);
		j=0;
		var $div_hero;
		var a_divs_heroes = {
			'alive': [],
			'inactive': [],
			'dead': []
		};
		var inactive_status;
		for (i=0; i<Main.k.HEROES.length; i++) {
				inactive_status = null;
				var hero = Main.k.HEROES[i];
				if(hero == Main.k.ownHero){
					continue;
				}
				var h = Main.k.h[hero];
				if (j % 5 == 0) $("<br/>").appendTo(missingDiv);
				j++;
				bubble = hero.replace(/(\s)/g, "_").toLowerCase();
				o_hero = Main.k.Profiles.get(hero);
				$div_hero = $('<div>').css({
						display: 'inline-block',
						position: 'relative'
					})
					.append(
						$("<img>").addClass("body " + bubble)
							.attr("src", "/img/design/pixel.gif")
							.css("cursor", "pointer")
							.addHeroDescToolTip(hero)
							.data('dev_surname',hero)
							.on("click", function () {
								Main.k.Profiles.display($(this).data('dev_surname'));
							})
					);
				if(o_hero.dead == true){
					a_divs_heroes['dead'].push($div_hero);
					$('<img>').attr({
							src: '/img/icons/ui/dead.png'
						})
						.css({
							position: 'absolute',
							bottom: '-6px',
							right: '-2px',
							'pointer-events': 'none'
						})
						.appendTo($div_hero);
				}else {
					if(Main.k.Profiles.hasAttr(o_hero,'statuses',Main.k.statuses['mush']['img'])){
						$('<img>').attr({
							src: '/img/icons/ui/mush.png'
						})
							.css({
								position: 'absolute',
								bottom: '-6px',
								right: '-2px',
								'pointer-events': 'none'
							})
							.appendTo($div_hero);
					}
					for( var inc = 0; inc < o_hero.statuses.length; inc ++){
						/** @type {{desc:string,img:string, name:string}} **/
						status = o_hero.statuses[inc];
						if(status.img)
							if($.inArray(status.img,['sleepy','noob']) != -1){
								inactive_status = status.img;
							}
					}
					if (inactive_status != null) {
						a_divs_heroes['inactive'].push($div_hero);
						$('<img>').attr({
							src: '/img/icons/ui/' + inactive_status + '.png'
						})
							.css({
								position: 'absolute',
								bottom: '-6px',
								right: '-2px',
								'pointer-events': 'none'
							})
							.appendTo($div_hero);
					} else {
						a_divs_heroes['alive'].push($div_hero);
					}
				}
		}
		$.each(a_divs_heroes,function(k,a){
			$.each(a, function(key,$div){
				missingDiv.append($div);
			});

		});
		var cryo_table = $('.what_happened .table').first();
		if(cryo_table.length > 0 && cryo_table.find('.ctrlw-save-cryo').length == 0){
			cryo_table.find('tr').last().after('<tr><td colspan="2" class="ctrlw-save-cryo" style="font-style:normal"></td></tr>');
			/* Translators: Text for Cryogenized people from CryoModule  Useless to translate in English*/
			if(cryo_table.find(':contains("'+Main.k.text.gettext("Cryo")+'")').length > 0){
				cryo_table.find('.ctrlw-save-cryo').append(Main.k.text.gettext("Tout le monde doit être décryogénisé pour pouvoir mettre à jour la liste d'équipage"));
			}else{
				Main.k.MakeButton("<img src='/img/icons/ui/notes.gif' /> "+Main.k.text.gettext("Mettre à jour la liste d'équipage"), null, null, Main.k.text.gettext("Mettre à jour la liste d'équipage"),Main.k.text.gettext("Cliquer ici pour mettre à jour la liste d'équipage de CTRL+W")
				).appendTo(cryo_table.find('.ctrlw-save-cryo'))
				.find("a").on("mousedown", function(e) {
					var tds,bubble,status,add_bool;
					var heroes_list = [];
					var status_to_str = {
						/* Translators: Text for idle people from CryoModule. Regex allowed*/
						'inactive': Main.k.text.gettext('Inactive'),
						/* Translators: Text for awake people from CryoModule. Regex allowed*/
						'awake' : Main.k.text.gettext('Eveillée?'),
						/* Translators: Text for dead people from CryoModule. Regex allowed*/
						'dead' :  Main.k.text.gettext('Morte?')//Dead
					};
					console.info('status_to_str',status_to_str);
					cryo_table.find('tr').each(function(){
						tds = $(this).find('td');
						if(tds.length == 2){
							status = null;
							bubble = Main.k.surnameToBubble(tds.first().text().trim());
							$.each(status_to_str,function(key,regex){
								regex = new RegExp(regex);
								if(regex.exec(tds.last().text().trim()) != null){
									status = key;
								}
							});
							if(status == null){
								console.error('Statut inconnu :', tds.last().text().trim());
								return true;
							}
							console.log(bubble,status);
							heroes_list.push(bubble);
							profile = Main.k.Profiles.get(bubble);
							if(status == 'inactive'){
								add_bool = true
								$.each(profile.statuses,function(index,status){
									if(status.img == "sleepy"){
										add_bool = false;
										return false;
									}
								});
								if(add_bool){
									profile.statuses.push(Main.k.statuses['inactive']);
								}
								profile.dead = false;
							}else if (status == 'awake'){
								profile.dead = false;
								$.each(profile.statuses,function(index,current_status){
									if(current_status.img == "sleepy"){
										console.log('is sleepy');
										profile = Main.k.Profiles.removeAttrFromProfile(profile,'statuses',Main.k.statuses['inactive']['img']);
										profile = Main.k.Profiles.removeAttrFromProfile(profile,'statuses',Main.k.statuses['hinactive']['img']);
										return false;
									}
								});
							}else if(status == 'dead'){
								profile.dead = true;
							}
							Main.k.Profiles.set(profile,false);

						}
					});
					/** To detect crew list update **/
					Main.k.HEROES = Main.k.HEROES_ALL.slice();
					Main.k.GameInfos.data.heroes_list = heroes_list;
					Main.k.GameInfos.save();
					Main.k.Profiles.save();
					Main.k.MushUpdate();
					return false;
				});
			}

		}
		// ----------------------------------- //


		// Exploration
		// ----------------------------------- //
		var exploring = $(".exploring .exploring2");
		$("#expblock").empty();
		if (exploring.length > 0) {
			t = $("<h3>").html("Exploration").appendTo("#expblock");
			$("<span>").addClass("displayless").attr("_target", "#expblockdiv").appendTo(t).on("click", Main.k.ToggleDisplay);
			var expblock = $("<div>").attr("id", "expblockdiv").appendTo("#expblock");

			i = 0;
			var planetname = "";
			var back = "";
			exploring.find("li").each(function() {
				var li = $(this).clone();
				li.find("span").remove();
				var imgsrc = "";

				//noinspection FallThroughInSwitchStatementJS
				switch(i) {
					case 1:
						var players = $("<div>").addClass("missingheroes").appendTo(expblock);
						var p = li.html().split(",");
						for (var j=0; j<p.length; j++) {
							var hero = p[j].trim();
							var bubble = hero.replace(/(\s)/g, "_").toLowerCase();
							var h = Main.k.h[bubble];

							$("<img>").addClass("body " + bubble)
							.attr("src", "/img/design/pixel.gif")
							.attr("_title", hero)
							.attr("_desc", h.short_desc)
							.on("mouseover", Main.k.CustomTip)
							.on("mouseout", Main.k.hideTip)
							.appendTo(players);
						}
						break;

					case 0:
						imgsrc = "planet";
					case 2:
						if (imgsrc == "") imgsrc = "casio";
						$("<p>").css({
							color: "#DDD",
							"font-size": "12px",
							margin: "-6px 0 0",
							"text-align": "center"
						}).html("<img src='/img/icons/ui/" + imgsrc + ".png' /> " + li.html().trim()).appendTo(expblock)
						.find("img").css({
							position: "relative",
							top: "4px"
						});
						break;
				}

				i++;
			});
		}
		// ----------------------------------- //


		// Inventory
		// ----------------------------------- //
		var hasPlants = false;
		var hasPharma = false;
		var mwidth = 120; //$(".usLeftbar").width();
		//$("#room").addClass("roominventory"); // New class used for cancelSelection
		$(".kobject_list").empty();
		var $room = $("#room");
		if ($room.find("[data-id='TREE_POT']").size()) hasPlants = true;
		$room.find("li").not(".cdEmptySlot").not("[data-id='TREE_POT']").each(function() {
			var $this = $(this);
			var li = $("<li>")
				.addClass("item fakeitem")
				.attr("serial_fake", $(this).attr("serial"))
				.attr("data-name", $(this).attr("data-name"))
				.attr("data-id", "TREE_POT")
				.css("list-style-type", "none")
				.html($(this).html())
				.on("click", function() {
					if(!$('#cdInventory').hasClass('placard_on')){
						Main.closet.show();
					}
					$(this).siblings().find('.selected').remove();
					$(this).prepend('<div class="selected"></div>');
					mush_jquery('[serial="'+$this.attr('serial')+'"]').trigger('click') ;
				})
				.appendTo(".kobject_list")
				.find("td")
				.attr("_title", $(this).attr("data-name").split("\\'").join("'"))
				.attr("_desc", $(this).attr("data-desc").split("\\'").join("'"))
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);

			// Loads
			var name = $(this).attr("data-name");
			var reg = /\/>x([0-9]+)$/;
			if (reg.test(name)) {
				var charges = reg.exec(name)[1];
				$("<span>")
					.addClass("charges")
					.html("x" + charges)
					.appendTo(li.find("tr"));
			}

			// Broken?
			var broken = "/img/icons/ui/broken.png";
			if (name.indexOf(broken) > -1) {
				$("<img>").attr("src", broken).addClass("broken").appendTo(li.find("tr"));
			}
			// Pharma?
			if ($(this).attr("data-desc").indexOf("Effets") != -1 || $(this).data('id') == 'CONSUMABLE') hasPharma = true;
		});
		$(".usLeftbar .inventory").css("max-width", mwidth + "px").css("margin-left", "0px");
		// Pharma
		$("#pharmashare").css("display", !hasPharma ? "none" : "block");
		// ----------------------------------- //


		// Lab - Nexus - Pilgred - Plants - Planets
		// ----------------------------------- //
		var project_list = $("#project_list").empty();
		var $cdModuleContent = $("#cdModuleContent");
		var projects = $cdModuleContent.find("ul.dev li.cdProjCard");
		var projectsdiv;
		var $research_module = $("#research_module");
		var pattcore = new RegExp(Main.k.text.gettext("Coeur de NERON"),"i");
		// Research
		if ($research_module.length > 0 && projects.length > 0) {
			t = $("<h3>").html(Main.k.text.gettext("Laboratoire")).appendTo(project_list);
			$("<span>").addClass("displayless").attr("_target", "#projectspreview")
			.on("click", Main.k.ToggleDisplay).appendTo(t);

			projectsdiv = $("<div>").addClass("projectspreview labpreview").attr("id", "projectspreview").appendTo(project_list);
			projects.each(function(i) {
				var projectdiv = $("<div>").addClass("projectpreview").appendTo(projectsdiv);

				// Project card
				$("<img>").addClass("projectimg")
				.attr("src", $(this).find("img.devcard").attr("src"))
				.appendTo(projectdiv);

				// Completion %
				$("<div>").addClass("projectpct")
				.html($(this).find("span").html().trim())
				.appendTo(projectdiv);

				// Bonuses
				var projectbonus = $("<div>").addClass("projectbonus").appendTo(projectdiv);
				$(this).find("div.suggestprogress ul li img").each(function(i) { $(this).clone().appendTo(projectbonus); });

				// Tooltip
				var h3 = $(this).find("h3").clone();
				h3.find("em").remove();

				projectdiv.attr("_title", h3.html().trim())
				.attr("_desc",
					$(this).find("div.desc").html().trim() + "</p><p>" +
					$(this).find("p.efficacity").html().trim()
				)
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);
			});

			// Research actions
			Main.k.MakeButton("<img src='/img/icons/ui/guide.png' /> "+Main.k.text.gettext("Partager"), null, null, Main.k.text.gettext("Partager les recherches"),
				Main.k.text.gettext("<p>Insère la liste de recherches dans la zone de texte active, de la forme&nbsp;:</p><p>" +
				"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>" +
				"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li>" +
				"<li><strong>Nom de la recherche</strong> - 0%<br/>Description de la recherche<br/>Bonus : <i>Biologiste</i>, <i>Médecin</i></li></p>")
			).appendTo(project_list)
			.find("a").addClass("shareresearchbtn").on("mousedown", function(e) {
				$('textarea:focus').each(function(e) {
					var txt = Main.k.FormatResearch();
					$(this).insertAtCaret(txt);
				});
				return false;
			});

			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> "+Main.k.text.gettext("Partager v2"), null, null, Main.k.text.gettext("Partager les recherches"),
				Main.k.text.gettext("<p>Insère la liste de recherches dans la zone de texte active, de la forme&nbsp;:</p><p>" +
					"<li><strong>Nom de la recherche</strong> - 0%</li>" +
					"<li><strong>Nom de la recherche</strong> - 0%</li>" +
					"<li><strong>Nom de la recherche</strong> - 0%</li></p>")
			).appendTo(project_list)
				.find("a").addClass("shareresearchbtn").on("mousedown", function(e) {
					$('textarea:focus').each(function(e) {
						var txt = Main.k.FormatResearch(true);
						$(this).insertAtCaret(txt);
					});
					return false;
				});
			/*console.warn('item research',$research_module.find(" ul.inventory li.item"));
			console.log($('.heroSerialActions div').length)
			$research_module.find(" ul.inventory").html($('#room').html());
			var $roomActions = $('.roomItemActions').children().clone();
			console.log($('.roomItemActions').children().length,$('.roomItemActions').children());
			//$roomActions.attr('webdata',$roomActions.attr('serial'));
			$('.heroSerialActions').append($roomActions);
			console.log($('.heroSerialActions div').length);*/
			var tgt = $(".cdActionList");
			var src = $(".cdActionRepository .heroRoomActions").children().clone();
			tgt.html(src);
			$(".cdActionList .move").hide();
			mush_jquery('#char_col #myInventory > li').removeAttr('onclick');
			$('#char_col #myInventory > li').on('click',function(){
				Main.k.CreateNeronAlert(Main.k.text.gettext("Veuillez utiliser l'inventaire du labo s'il vous plaît"));
			});
			$research_module.find(" ul.inventory li.item").off('click');
			$research_module.find(" ul.inventory li.item").on("click", function(){
				console.log('select',$(this));
				serial = $(this).attr('serial');
				var jMe = $("[serial='" + serial + "']");
				console.log('avant cookie');
				js.Cookie.set(CrossConsts.COOK_SEL,StringTools.urlEncode(serial),3600);
				console.log('apres cookie');
				var parentId = "";
				var parent;
				realJMe = $(this);
//				jMe.each(function() {
//					if ($(this).parent().attr("id") != undefined && !$(this).parents('#char_col')) {
//						realJMe = $(this);
//						parent = $(this).parent();
//						parentId = parent.attr("id");
//					}
//				});
//				if (parentId == "myInventory") {
					if (realJMe.hasClass("fakeselected")) {
// Clear selection
						realJMe.removeClass("fakeselected");
						$("#cdActionList div").not(".move").remove();
						//Main.cancelSelection(mush_jquery(realJMe[0]));
						$("#myInventory .selected").parent().removeClass("on");
						$("#myInventory .selected").remove();
						Main.sel.currentInvSelection = null;
						return;
					}
					realJMe.addClass("on");
					console.warn('realJMe',realJMe);
					var allItems = $("#myInventory .item").not(".cdEmptySlot").add("[serverselected=true]");
					$(".cdCharColSel").remove();
					$("#myInventory .selected").parent().removeClass("on");
					$("#myInventory .selected").remove();
					$("#myInventory .fakeselected").removeClass('fakeselected');
					realJMe.addClass("fakeselected");
					var $div = $('<div>').prependTo(realJMe).addClass('selected');
					console.log('selected_parent',$div.parent());
					var realJMe = $("[data-tip='" + realJMe.attr("data-tip") + "']").not("[serial='" + serial + "']");
					console.warn('realJMe',realJMe);
					var serial = realJMe.attr("serial");
					Main.sel.currentInvSelection = null;
					console.warn(1,$('#myInventory .selected'));
					//Main.cancelSelection(mush_jquery(realJMe[0]));
					console.warn(2,$('#myInventory .selected'));
					Main.acListMaintainer.heroWorking = true;
					Main.sel.currentInvSelection = serial;
//					Main.acListMaintainer.refreshHeroInv();
					Main.acListMaintainer.heroWorking = true;
					//this.currentInvSelection = serial;
					Main.acListMaintainer.refreshHeroInv();
					console.warn($('#myInventory .selected'));
					var actions = $("div[webdata='" + serial + "']");
					console.log('actions',actions);
					$("#cdActionList").find("div").hide();
					actions.each(function () {
						$(this).clone().appendTo("#cdActionList");
					});
					$("<div class='action stSel'> " + realJMe.attr("data-name").split("\\'").join("'") + " :</div>").prependTo("#cdActionList");
//				}
			});

		// Projects
		} else if (projects.length > 0 && pattcore.test($cdModuleContent.find("h2").html().trim())) {
			t = $("<h3>").html("Projets Neron").appendTo(project_list);
			$("<span>").addClass("displayless").attr("_target", "#projectspreview")
			.on("click", Main.k.ToggleDisplay).appendTo(t);

			projectsdiv = $("<div>").addClass("projectspreview").attr("id", "projectspreview").appendTo(project_list);
			projects.each(function(i) {
				var projectdiv = $("<div>").addClass("projectpreview").appendTo(projectsdiv);

				// Project card
				$("<img>").addClass("projectimg").attr("src", $(this).find("img").attr("src")).appendTo(projectdiv);

				// Completion %
				$("<div>").addClass("projectpct").html($(this).find("span").html().trim()).appendTo(projectdiv);

				// Bonuses
				var projectbonus = $("<div>").addClass("projectbonus").appendTo(projectdiv);
				$(this).find("div.suggestprogress ul li img").each(function(i) { $(this).clone().appendTo(projectbonus); });

				// Tooltip
				projectdiv.attr("_title", $(this).find("h3").html().trim())
				.attr("_desc",
					$(this).find("div.desc").html().trim() + "</p><p>" +
					$(this).find("p.efficacity").html().trim()
				)
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);
			});

			// Projects actions
			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> "+Main.k.text.gettext("Partager"), null, null, Main.k.text.gettext("Partager les projets"),
				Main.k.text.gettext("<p>Insère la liste de projets dans la zone de texte active, de la forme&nbsp;:</p><p>" +
				"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>" +
				"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li>" +
				"<li><strong>Nom du projet</strong> - 0%<br/>Description du projet<br/>Bonus : <i>Tireur</i>, <i>Pilote</i></li></p>")
			).appendTo(project_list)
			.find("a").addClass("shareprojectbtn").on("mousedown", function(e) {
				$('textarea:focus').each(function(e) {
					var txt = Main.k.FormatProjects();
					$(this).insertAtCaret(txt);
				});
				return false;
			});

		// Astro
		} else if ($("#navModule").length > 0) {
			var nav = $("#navModule");
			var planets = nav.find(".planet").not(".planetoff");
			if (planets.length > 0) {
				t = $("<h3>").html(Main.k.text.gettext("Planètes")).appendTo(project_list);
				$("<span>").addClass("displayless").attr("_target", "#projectspreview")
				.on("click", Main.k.ToggleDisplay).appendTo(t);

				projectsdiv = $("<div>").addClass("projectspreview planetpreview").attr("id", "projectspreview").appendTo(project_list);
				planets.each(function(i) {
					// Print planet
					var planet = $("<div>").addClass("planetpreview").appendTo(projectsdiv);
					$("<img>").attr("width", "40")
					.attr("src", $(this).find("img.previmg").attr("src"))
					.css({'cursor':'pointer'})
					.on("mousedown", function(e) {
						$('textarea:focus').each(function(e) {
							var txt = Main.k.FormatPlanets(i);
							$(this).insertAtCaret(txt);
						});
						return false;
					})
					.appendTo(planet);
					if($(this).find('.share-planet').length == 0){
						var $button_share_planet = Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> ", null, null, Main.k.text.gettext("Partager la planète"),
							Main.k.text.gettext("Partage uniquement cette planète dans l'inventaire")
						)
						.addClass('share-planet');
						$button_share_planet.find("a").on("mousedown", function(e) {
							$('textarea:focus').each(function(e) {
								var txt = Main.k.FormatPlanets(i);
								$(this).insertAtCaret(txt);
							});
							return false;
						});
						$('<td>').append($button_share_planet).insertAfter($(this).find('.buttons td:last-child'));
					}
				});

				// Planets actions
				Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> "+Main.k.text.gettext("Partager"), null, null, Main.k.text.gettext("Partager les planètes"),
					Main.k.text.gettext("Insère la liste de planètes dans la zone de texte active, de la forme&nbsp;:</p><p>" +
					"TODO: aperçu")
				).appendTo(project_list)
				.find("a").on("mousedown", function(e) {
					$('textarea:focus').each(function(e) {
						var txt = Main.k.FormatPlanets(null);
						$(this).insertAtCaret(txt);
					});
					return false;
				});
			}

		// BIOS
		} else if ($("#biosModule").length > 0) {
			$("<h3>").html("BIOS NERON").appendTo(project_list);


			// Share params
			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> "+Main.k.text.gettext("Partager"), null, null, Main.k.text.gettext("Partager les paramètres"),
				Main.k.text.gettext("Insère la liste de paramètres BIOS Neron dans la zone de texte active, de la forme&nbsp;:</p><p>" +
				"TODO: aperçu")
			).appendTo(project_list)
			.find("a").on("mousedown", function(e) {
				$('textarea:focus').each(function(e) {
					var txt = Main.k.FormatBIOS();
					$(this).insertAtCaret(txt);
				});
				return false;
			});
			//Comm
		}else if ($("#trackerModule").length > 0){
			var t = $("<h3>").html(Main.k.text.gettext("Com.")).appendTo(project_list);
			$("<span>").addClass("displayless").attr("_target", ".commPreview")
				.on("click", Main.k.ToggleDisplay).appendTo(t);
			var nav = $("#trackerModule");
			var comm = $("<div>").addClass("commPreview").css({'text-align':'center','cursor':'pointer'}).appendTo(project_list);
			var $img_com = $("<img>")
					.attr("src", "/img/design/sensor01.png")
					.on("mousedown", function(e) {
					$('textarea:focus').each(function(e) {
						var txt = Main.k.FormatComm();
						$(this).insertAtCaret(txt);
					});
					return false;
					}).appendTo(comm);
			setInterval(function(){
				$img_com.attr('src',$('#trackerModule').find('.sensors img').attr('src'));
			},100);
			//TODO multi
			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> "+Main.k.text.gettext("Partager"), null, null, null,
					"TODO: aperçu"
				).appendTo(project_list)
				.find("a").on("mousedown", function(e) {
					$('textarea:focus').each(function(e) {
						var txt = Main.k.FormatComm();
						$(this).insertAtCaret(txt);
					});
					return false;
				});
		}

		// Plants
		$usLeftbar.find("#plantmanager").remove();
		if (hasPlants) {
			// Create div
			var plantsDIV = $("<div>").attr("id", "plantmanager").appendTo($usLeftbar);
			t = $("<h3>").html(Main.k.text.gettext("Plantes")).appendTo(plantsDIV);
			$("<span>").addClass("displayless").attr("_target", ".kplantlist").appendTo(t).on("click", Main.k.ToggleDisplay);

			// List plants
			var plantlist = $("<div>").addClass("kplantlist plants inventory").css("max-width", mwidth + "px").appendTo(plantsDIV);
			$room.find("[data-id='TREE_POT']").each(function() {
				var $this = $(this);
				$("<li>")
					.addClass("item fakeitem")
					.attr("serial_fake", $(this).attr("serial"))
					.attr("data-name", $(this).attr("data-name"))
					.attr("data-id", "TREE_POT")
					.css("list-style-type", "none")
					.html($(this).html())
					.on("click", function() {
						if(!$('#cdInventory').hasClass('placard_on')){
							Main.closet.show();
						}
						mush_jquery('[serial="'+$this.attr('serial')+'"]').trigger('click') ; })
					.appendTo(plantlist)
					.find("td")
					.attr("_title", $(this).attr("data-name").split("\\'").join("'"))
					.attr("_desc", $(this).attr("data-desc").split("\\'").join("'"))
					.on("mouseover", Main.k.CustomTip)
					.on("mouseout", Main.k.hideTip);
			});

			// Plants actions
			$("<div>").css("clear", "both").css("height", "5px").appendTo(plantsDIV);
			Main.k.MakeButton("<img src='/img/icons/ui/talk.gif' /> "+Main.k.text.gettext("Partager"), null, null, Main.k.text.gettext("Plantes"), Main.k.text.gettext("Partager l'état des plantes."))
			.appendTo(plantsDIV)
			.find("a").on("mousedown", function(e) {
				$('textarea:focus').each(function(e) {
					var txt = Main.k.FormatPlants();
					$(this).insertAtCaret(txt);
				});
				return false;
			});
		}
		// ----------------------------------- //


		// Enhance alerts
		// ----------------------------------- //
		var $topinfo_bar = $("#topinfo_bar");
		var alarm = $topinfo_bar.find(".alarm");
		if (alarm.length > 0) {
			alarm.find(".alertnb").remove();
			var alarm_equip = "/img/icons/ui/alert.png";
			var alarm_door = "/img/icons/ui/door.png";
			var alarm_hunter = "/img/icons/ui/hunter.png";
			var alarm_fire = "/img/icons/ui/fire.png";

			alarm.find("img").each(function() {
				var _alarm = $(this).attr("src").toLowerCase();
				var alarm_nb = 0;
				var omo = $(this).parent().attr("onmouseover");

				switch (_alarm) {
					case alarm_equip:
						alarm_nb = parseInt(/>([0-9]+)/.exec(omo)[1]);
						break;
					case alarm_door:
						alarm_nb = parseInt(/>([0-9]+)/i.exec(omo)[1]);
						break;
					case alarm_hunter:
						var patt = new RegExp(Main.k.text.gettext("([0-9]+|un|a)+ appareil"), "i");
						if (patt.test(omo)) {
							alarm_nb = patt.exec(omo)[1];
						} else if (/>([0-9]+|un|a)/i.test(omo)) {
							alarm_nb = />([0-9]+|un|a)/i.exec(omo)[1];
						}
						if (alarm_nb) alarm_nb = (alarm_nb.toLowerCase() == "un" || alarm_nb.toLowerCase() == "a") ? 1 : parseInt(alarm_nb);
						break;
					case alarm_fire:
						alarm_nb = parseInt(/>([0-9]+)/i.exec(omo)[1]);
						break;
				}

				// Display nb if needed
				if (alarm_nb!=0) {
					var updatebg = true;

					$(this).css({
						position: "relative",
						"z-index": "5"
					});
					$(this).parent().css("position", "relative");

					var wrap = $("<div>").addClass("alertnbwrapper")
					.css("left", parseInt(($(this).parent().width() - 20) / 2) + "px")
					.appendTo($(this).parent());

					$("<div>").addClass("alertnb").html(alarm_nb).appendTo(wrap);
				}



			});


			$topinfo_bar.find(".alarm_on").css("background-image", "url(" + Main.k.servurl + "/img/alertpleft.gif)");
			$topinfo_bar.find(".alarm_right_on").css("background-image", "url(" + Main.k.servurl + "/img/alertpright.gif)");
			$topinfo_bar.find(".alarm_bg_on").css("background-image", "url(" + Main.k.servurl + "/img/alertbg.gif)");
		}
		//Display shield is needed
		var spaceshipstatus = $topinfo_bar.find(".spaceshipstatus");
		if (spaceshipstatus.length > 0) {
			spaceshipstatus.find(".spaceshipstatus-info").remove();
			spaceshipstatus.find("img").each(function() {
				var regex = /\/([a-z]+)\.png$/;
				var matches = regex.exec($(this).attr('src'));
				if(matches != null){
					switch (matches[1]) {
						case 'shield':
							if(/: *[0-9]+<br\/>.+: *([0-9]+)<br\/>/.test($(this).parent().attr('onmouseover'))){
								var wrap = $('<div class="spaceshipstatus-info" style="font-size:10px;text-align:center;">'+RegExp.$1+'&nbsp;<img src="http://'+Main.k.domain+'/img/icons/ui/plasma.png" width="11"></div>').appendTo($(this).parent());

							}
						break;
					}
				}
			});
		}

		// ----------------------------------- //


		// Enhance private chats
		// ----------------------------------- //
		for (i=0; i<3; i++) {
			var tab = $("#cdTabsChat").find(".cdPrivateTab" + i);
			var tabcontent = $("#cdPrivate" + i);
			if (tab.length > 0 && tabcontent.length > 0) {
				var tip = "";
				var heroes = tabcontent.find(".mini_priv");
				for (j=0; j<heroes.length; j++) {
					var mouseover = $(heroes[j]).attr("onmouseover");
					var name = /<h1>([^<]+)<\/h1>/.exec(mouseover)[1];
					var co = /[a-zA-Z]+\s?:\s([^<]+)/.exec(mouseover)[1].toLowerCase();
					tip += "<strong>" + name + "</strong> - "+Main.k.text.gettext("connecté(e)")+" " + co + "<br/>";
				}

				tab.find("img").off("mouseover").off("mouseout")
				.attr("_title", Main.k.text.gettext("Canal privé")+ " #" + (i+1))
				.attr("_desc", tip)
				.on("mouseover", Main.k.CustomTip)
				.on("mouseout", Main.k.hideTip);
			}
		}
		// ----------------------------------- //

		// Update manager?
		if (Main.k.Manager.opened) Main.k.Manager.update();

		Main.k.Profiles.update();

		// Options
		Main.k.updateBottom();
		Main.k.customBubbles();

		// Fix PAbis
		$("#cdPaBloc").find("img[src='/img/design/pa1bis.png']").attr("src", Main.k.servurl + "/img/pa1bis.png");

		// Fix dimensions
		Main.k.Resize();

		// Last sent message lost ?
		var cook = js.Cookie.get("lastsentmsg");
		if (cook) {
			Main.k.displayLastSent(true);
		} else {
			//Main.k.displayLastSent(false);
		}
	};
	exportFunction(Main.k.MushUpdate, unsafeWindow.Main.k, {defineAs: "MushUpdate"});
	Main.k.MushInitHeroes = function(){
		Main.k.heroes = {};
		Main.k.heroes_same_room = [];
		var $it = Main.heroes.iterator();
		var heroes = "";
		var tab_heroes = jQuery.extend([], Main.k.HEROES);
		var tab_heroes_same_room = [];
		while ($it.hasNext()) {
			(function() {
				/** @type {{surname:string}} **/
				var hero = $it.next();

				//Main.k.heroes[hero.dev_surname] = Main.k.convertHeroToSimpleHero(hero,null);

				tab_heroes_same_room.push(Main.k.surnameToBubble(hero.surname));
				tab_heroes = jQuery.grep(tab_heroes, function (value) {
					return value != Main.k.surnameToBubble(hero.surname);
				});
			})();

		}
		Main.k.heroes_same_room = tab_heroes_same_room;

		if(Main.k.HEROES_ALL.length == Main.k.HEROES.length){
			
//			console.log('check heroes list',Main.k.GameInfos.data.heroes_list);
			if(Main.k.GameInfos.data.heroes_list.length > 0){
				Main.k.HEROES = Main.k.GameInfos.data.heroes_list;
			}else{
				var heroes_replace = jQuery.extend({}, Main.k.HEROES_REPLACE);
				if(Main.k.GameInfos.data.andrek){
					heroes_replace = Main.k.InvertObject(heroes_replace);
				}
				//replace heroes
				$.each(heroes_replace, function(k,v){
					var index = $.inArray(v,Main.k.HEROES);
					Main.k.HEROES.splice(index,1);
				});
			}
		}

	};
	Main.k.MushInit();
	Main.k.MushUpdate();
	Main.k.MushAfterInit();

	// TODO: fix for chrome
	$(document).keypress(function(e){
		if (e.keyCode === 27) Main.k.ClosePopup();
	});
};
Main.k.tabs.ranking = function() {

	Main.k.SwitchRankingTab = function(event) {
		var selectedtab = $(event.target).attr("id");
		$("div.bgtablesummar").addClass("hide");
		$("ul.tablefilter li").addClass("off");
		$(event.target).removeClass("off");

		switch (selectedtab) {
			case "cdTabFriends":
				$("div.cdFriends").removeClass("hide");
				break;

			case "cdTabContacts":
				$("div.cdContacts").removeClass("hide");
				break;

			case "cdTabAll":
				$("div.cdGlobal").removeClass("hide");
				break;
		}
	};

	$("<style>").attr("type", "text/css").html("\
	span.rankhead {\
		display: block;\
		position: absolute;\
		top: 30px; left: 250px;\
		bottom: 30px; right: 10px;\
		font-size: 24pt;\
		color: #FFF;\
		text-align: left;\
		font-family: 'PT Sans Caption','Arial','Segoe UI','Lucida Grande','Trebuchet MS','lucida sans unicode',sans-serif;\
		text-shadow: -1px 0px 2px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.3), 1px 0px 2px rgba(0, 0, 0, 0.3);\
		text-transform: uppercase;\
	}\
	").appendTo($("head"));

	var $cat_triumph_nova = $("#category_triumph, #category_nova");
	$cat_triumph_nova.css({
		margin: "0",
		width: "50%",
		float: "left",
		display: "block"
	});

	$("th").each(function() {
		var txt = $(this).html().trim();
		if (txt == "Héros Favori") $(this).html("");
	});

	$("ul.tablefilter").first().clone().css({
		float: "right",
		width: "auto"
	}).prependTo("#ranking").find("li").attr("onclick", "").on("click", Main.k.SwitchRankingTab);
	$cat_triumph_nova.find(".tablefilter, .clear").remove();
	$("#ranking").find("th.distinctions").css("width", "auto");
	$(".bgtablesummar").css("margin", "0 5px");
	$("table.summar").css("width", "100%");
	$("table.summar tr.top td").css("font-size", "12pt");
	$(".pages").css("display", "none");//TEMP
	$("ul.category").css("display", "none");
	$("tr.cdRhtTr").css("display", "table-row");
	$("<div>").addClass("clear").appendTo("#ranking");
	$("<div>").addClass("clear").insertBefore("#category_triumph");

	var headers = $("<div>").css({"margin": "20px auto 10px", "text-align": "center", position: "relative"}).prependTo("#category_triumph, #category_nova");
	headers.first().html("<span class='rankhead'>Triomphe</span><img alt='Triomphe' src='" + Main.k.servurl + "/img/rank_triumph.png' />");
	headers.last().html("<span class='rankhead'>Super NOVA</span><img alt='NOVA' src='" + Main.k.servurl + "/img/rank_nova.png' />");
};

// Script initialization
GM_addStyle(GM_getResourceText ('css:jgrowl'));
eval(GM_getResourceText('jgrowl'));
$.jGrowl.defaults.closerTemplate = '';
$.jGrowl.defaults.theme = 'ctrl-w';
$.jGrowl.defaults.themeState = '';

eval(GM_getResourceText('mush'));

Main.k.init();

// If ingame
if (Main.k.playing && $("#topinfo_bar").length > 0) {
	Main.k.tabs.playing();

// Fix ending messages
} else if ($("#credits").length > 0) {
	Main.k.tabs.credits();

// Fix account page
} else if ($("#profile.cdTabTgt").length > 0) {
	Main.k.tabs.playerProfile();

// Fix rankings
} else if ($("#ranking").length > 0) {
	Main.k.tabs.ranking();

// ExpPerma
} else if (Main.k.window.location.href.indexOf("expPerma") != -1) {
	Main.k.tabs.expPerma();

// Game over
} else if ($("#gameover").length > 0) {
	Main.k.tabs.gameover();

// Home
} else if ($("#mediaShow").length > 0) {
	$("#maincontainer, .boxcontainer").css("margin", "0 auto 0");
	$(".kmenu").css({
		position: "relative",
		top: "180px"
	});
	$("a.logostart").css("top", "20px");
//new game
}else if($('.choosehero2').length > 0){
	Main.k.Game.clear();
	localStorage.setItem('ctrlw_newgame',1);
}

if (Main.k.debug) {Main.k.displayBug();}
