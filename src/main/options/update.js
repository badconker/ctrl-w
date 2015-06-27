Main.k.Options.update = function(e) {
    var tgt = $(e.target);
    var key = $(tgt).attr("optname");
    var val = $(tgt).is(":checked") ? "y" : "n";
    var i = $(tgt).attr("opti");

    Main.k.Options.updateOpt(key,val);
    Main.k.Options.updateCookie();
    if (Main.k.Options.options[i][3]) Main.k.Options.options[i][3]();
};