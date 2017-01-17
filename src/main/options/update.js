Main.k.Options.update = function(e) {
	var tgt = $(e.target);
	var key = $(tgt).attr("optname");
	var val = $(tgt).is(":checked") ? "y" : "n";
	var optname = $(tgt).attr("optname");

	Main.k.Options.updateOpt(key,val);
	Main.k.Options.updateCookie();
	if (!!Main.k.Options.options[optname].after) Main.k.Options.options[optname].after();
};