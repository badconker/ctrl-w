Main.k.Options.updateCookie = function() {
	var cook = "";
	for (var optname in Main.k.Options.options) {
		if (cook != "") cook += "|";

		cook += optname + ":";
		cook += Main.k.Options.options[optname].option ? "y" : "n";
		
	}

	js.Cookie.set("ctrlwoptions",cook,420000000);
};