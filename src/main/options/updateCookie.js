Main.k.Options.updateCookie = function() {
	var cook = "";
	for (var i=0; i<Main.k.Options.options.length; i++) {
		if (i>0) cook += "|";
		cook += Main.k.Options.options[i][0] + ":";
		cook += Main.k.Options.options[i][1] ? "y" : "n";
	}

	js.Cookie.set("ctrlwoptions",cook,420000000);
};