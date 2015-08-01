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