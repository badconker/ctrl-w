Main.k.MakeButton = function(content, href, onclick, tiptitle, tipdesc) {
	var but = $("<div>").addClass("action but");
	var butbr = $("<div>").addClass("butright").appendTo(but);
	var butbg = $("<div>").addClass("butbg").appendTo(butbr);

	var buta = $("<a>").attr("href", href ? href : "#").html(content).appendTo(butbg)
	.on("click", onclick ? onclick : href ? null : function() { return false; });

	/* Translators: domain name*/
	if(href !=null && href.indexOf(Main.k.text.gettext('mush.vg'))){
		buta.attr('target','_blank');
	}

	if (tiptitle || tipdesc) {
		if (tiptitle) buta.attr("_title", tiptitle);
		if (tipdesc) buta.attr("_desc", tipdesc);
		buta.on("mouseover", Main.k.CustomTip);
		buta.on("mouseout", Main.k.hideTip);
	}

	return but;
};