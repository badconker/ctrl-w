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