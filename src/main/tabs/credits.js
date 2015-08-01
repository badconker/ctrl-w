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