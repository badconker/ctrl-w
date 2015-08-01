
Main.k.tabs.gameover = function() {
    // Triumph logs
    var logs = $("#logtri li span, #logtri div div li");
    var logcount = {
        humanC: 0,			// 1
        researchMin: 0,		// 3
        research: 0,		// 6
        hunter: 0,			// 1
        expe: 0,			// 3
        planet: 0			// 5
    };

    var reg = /([0-9]+)\sx\s([^\(]+)\s\(\s(?:\+|-)\s([0-9]+)\s\)/;
    var $logtri = $("#logtri");
    $logtri.find("div").css("display", "block");
    $logtri.find(".rreadmore").css("display", "none");
    logs.each(function() {
        var counted = false;
        var data = reg.exec($(this).html());
        switch (data[2].trim()) {
            /* Translators: This translation must be copied from the game. */
            case Main.k.text.gettext("Cycle Humain"):
                counted = true;
                logcount.humanC += parseInt(data[1]);
                break;
            /* Translators: This translation must be copied from the game. */
            case Main.k.text.gettext("Recherche Mineur"):
                counted = true;
                logcount.researchMin += parseInt(data[1]);
                break;
            /* Translators: This translation must be copied from the game. */
            case Main.k.text.gettext("Recherche"):
                counted = true;
                logcount.research += parseInt(data[1]);
                break;
            /* Translators: This translation must be copied from the game. */
            case Main.k.text.gettext("Défenseur Du Daedalus"):
                counted = true;
                logcount.hunter += parseInt(data[1]);
                break;
            /* Translators: This translation must be copied from the game. */
            case Main.k.text.gettext("Expédition"):
                counted = true;
                logcount.expe += parseInt(data[1]);
                break;
            /* Translators: This translation must be copied from the game. */
            case Main.k.text.gettext("Nouvel Planète"):
                counted = true;
                logcount.planet += parseInt(data[1]);
                break;
        }

        if (counted) {
            var tgt = ($(this).tagName == "SPAN") ? $(this).parent() : $(this);
            tgt.css("display", "none");
        }
    });
    if (logcount.planet) {
        /* Translators: This translation must be copied from the game. */
        $("<li>").html(logcount.planet + " x "+Main.k.text.gettext("Nouvelle Planète") + " ( + " + logcount.planet * 5 + " )")
            .attr("_title", Main.k.text.gettext("Nouvelle Planète"))
            .attr("_desc", Main.k.text.gettext("Gagné à chaque planète (arrivée en orbite)."))
            .on("mouseover", Main.k.CustomTip)
            .on("mouseout", Main.k.hideTip)
            .prependTo("#logtri");
    }
    if (logcount.expe) {
        /* Translators: This translation must be copied from the game. */
        $("<li>").html(logcount.expe + " x "+ Main.k.text.gettext("Expédition") +" ( + " + logcount.expe * 3 + " )")
            .attr("_title", Main.k.text.gettext("Expédition"))
            .attr("_desc", Main.k.text.gettext("Gagné à chaque exploration."))
            .on("mouseover", Main.k.CustomTip)
            .on("mouseout", Main.k.hideTip)
            .prependTo("#logtri");
    }
    if (logcount.researchMin) {
        /* Translators: This translation must be copied from the game. */
        $("<li>").html(logcount.researchMin + " x "+ Main.k.text.gettext("Recherche Mineure") +" ( + " + logcount.researchMin * 3 + " )")
            .attr("_title", Main.k.text.gettext("Recherche Mineure"))
            .attr("_desc", Main.k.text.gettext("Gagné lorsque la recherche est terminée ainsi qu'une seconde fois lors du retour sur SOL."))
            .on("mouseover", Main.k.CustomTip)
            .on("mouseout", Main.k.hideTip)
            .prependTo("#logtri");
    }
    if (logcount.research) {
        /* Translators: This translation must be copied from the game. */
        $("<li>").html(logcount.research + " x "+ Main.k.text.gettext("Recherche") + " ( + " + logcount.research * 6 + " )")
            .attr("_title", Main.k.text.gettext("Recherche"))
            .attr("_desc", Main.k.text.gettext("Gagné lorsque la recherche est terminée ainsi qu'une seconde fois lors du retour sur SOL."))
            .on("mouseover", Main.k.CustomTip)
            .on("mouseout", Main.k.hideTip)
            .prependTo("#logtri");
    }
    if (logcount.hunter) {
        /* Translators: This translation must be copied from the game. */
        $("<li>").html(logcount.hunter + " x "+ Main.k.text.gettext("Défenseur du Daedalus") + " ( + " + logcount.hunter + " )")
            .attr("_title", Main.k.text.gettext("Défenseur du Daedalus"))
            .attr("_desc", Main.k.text.gettext("Gagné pour chaque Hunter abattu."))
            .on("mouseover", Main.k.CustomTip)
            .on("mouseout", Main.k.hideTip)
            .prependTo("#logtri");
    }
    if (logcount.humanC) {
        /* Translators: This translation must be copied from the game. */
        $("<li>").html(logcount.humanC + " x "+ Main.k.text.gettext("Cycle Humain") + " ( + " + logcount.humanC + " )")
            .attr("_title", Main.k.text.gettext("Cycle Humain"))
            .attr("_desc", Main.k.text.gettext("Gagné à chaque cycle."))
            .on("mouseover", Main.k.CustomTip)
            .on("mouseout", Main.k.hideTip)
            .prependTo("#logtri");
    }

    //Loading on like click
    $(document).on('click','a.like',function(){
        $(this).replaceWith('<img class="cdLoading" src="/img/icons/ui/loading1.gif" alt="loading..." />');
    });
};