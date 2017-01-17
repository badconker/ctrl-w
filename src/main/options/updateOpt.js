Main.k.Options.updateOpt = function(key, val) {
	switch(key) {
		case "custombubbles":
		case "cbubbles":
			Main.k.Options.cbubbles = (val == "y");
			Main.k.Options.options.cbubbles.option = (val == "y");
			break;
		case "custombubbles_nobackground":
		case "cbubblesNB":
			Main.k.Options.cbubblesNB = (val == "y");
			Main.k.Options.options.cbubblesNB.option = (val == "y");
			break;
		case "displaylogo":
		case "dlogo":
			Main.k.Options.dlogo = (val == "y");
			Main.k.Options.options.dlogo.option = (val == "y");
			break;
		case "splitpjt":
			Main.k.Options.splitpjt = (val == "y");
			Main.k.Options.options.splitpjt.option = (val == "y");
			break;
		//case "altpa":
		//	Main.k.Options.altpa = (val == "y");
		//	Main.k.Options.options.altpa.option = (val == "y");
		//	break;
		case "browserNot":
			Main.k.Options.browserNot = (val == "y");
			Main.k.Options.options.browserNot.option = (val == "y");
			break;
	}
};