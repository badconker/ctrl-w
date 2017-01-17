Main.k.Options.init = function() {

	Main.k.Options.options = {};

	/**

	Option format :

	Main.k.Options.options.OPTIONNAME = {
		option:		Main.k.Options.OPTIONNAME,			// Option value to change
		text:		Main.k.text.gettext("description"), // Description text
		after:		callback,							// (Optional) After option changed, call this function
		refresh: 	true,								// (Optional) Page refresh needed after option change?
	};

	*/

	Main.k.Options.options.cbubbles = {
		option:		Main.k.Options.cbubbles,
		after:		Main.k.customBubbles,
		text:		Main.k.text.gettext("Activer la mise en forme personnalisée des messages (bordure + couleur nom + image de fond)."),
	};

	Main.k.Options.options.cbubblesNB = {
		option:		Main.k.Options.cbubblesNB,
		after:		Main.k.customBubbles,
		text:		Main.k.text.gettext("Simplifier la mise en forme personnalisée des messages (suppression de l'image de fond)."),
	};

	Main.k.Options.options.dlogo = {
		option:		Main.k.Options.dlogo,	
		refresh:	true,
		text:		Main.k.text.gettext("Afficher le logo Mush au dessus des onglets."),
	};

	Main.k.Options.options.splitpjt = {
		option:		Main.k.Options.splitpjt,
		after:		Main.k.updateBottom,
		text:		Main.k.text.gettext("Séparer les projets / recherches / pilgred sous la zone de jeu."),
	};

	// Main.k.Options.options.altpa = {
	// 	option:		Main.k.Options.altpa,	
	// 	refresh:	true,
	// 	text:		"Utiliser des images alternatives pour les pa / pm."
	// };

	Main.k.Options.options.browserNot = {
		option:		Main.k.Options.browserNot,
		after:		Main.k.statusCheck,	
		text:		Main.k.text.gettext("Show browser notifications when tab is inactive.")
	};

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