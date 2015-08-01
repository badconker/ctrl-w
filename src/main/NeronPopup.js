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
