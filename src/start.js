
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
