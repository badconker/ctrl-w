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


		for (var optname in Main.k.Options.options) {
			var opt = Main.k.Options.options[optname];
			var html = opt.text;
			if (!!opt.refresh) html += " "+Main.k.text.gettext("Nécessite un rechargement de la page.");

			var p = $("<p>").css({
				color: "#EEE",
				padding: "5px",
				border: "1px dashed #EEE",
				background: "rgba(255,255,255,0.1)",
				margin: "10px 20px",
				clear: "both"
			})
			.html('<label style="margin-left: 30px;display:block" for="ctrlw_'+optname+'">' + html + '</label>')
			.appendTo(td);

			var chk = $("<input>").css({
				"float": "left"
			})
			.attr("type", "checkbox")
			.attr("optname", optname)
			.attr("id", 'ctrlw_'+optname)
			.on("change", Main.k.Options.update)
			.prependTo(p);
			if (opt.option) chk.attr("checked", "checked");
		}

		Main.k.MakeButton("<img src='/img/icons/ui/reported.png' style='vertical-align: -20%' /> "+ Main.k.text.gettext("Vider le cache du script"), null, null, Main.k.text.gettext("Vider le cache du script"),
			Main.k.text.gettext("Ce bouton vous permet de vider le cache du script pour, par exemple, prendre en compte tout de suite votre mode Or ou forcer une vérification de mise à jour. A utiliser avec parcimonie svp."))
		.appendTo(td).find("a").on("mousedown", function(){
			Main.k.clearCache();
		});
	}

	Main.k.folding.display([null,null, "#options_col"], "options");
};