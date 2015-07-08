Main.k.tabs.ranking = function() {

    Main.k.SwitchRankingTab = function(event) {
        var selectedtab = $(event.target).attr("id");
        $("div.bgtablesummar").addClass("hide");
        $("ul.tablefilter li").addClass("off");
        $(event.target).removeClass("off");

        switch (selectedtab) {
            case "cdTabFriends":
                $("div.cdFriends").removeClass("hide");
                break;

            case "cdTabContacts":
                $("div.cdContacts").removeClass("hide");
                break;

            case "cdTabAll":
                $("div.cdGlobal").removeClass("hide");
                break;
        }
    };

    Main.k.css.ranking();

    $("ul.tablefilter")
        .first()
        .clone()
        .prependTo("#ranking")
        .find("li")
        .attr("onclick", "")
        .on("click", Main.k.SwitchRankingTab);

    $cat_triumph_nova
        .find(".tablefilter, .clear")
        .remove();

    $("<div>")
        .addClass("clear")
        .appendTo("#ranking");

    $("<div>")
        .addClass("clear")
        .insertBefore("#category_triumph");

    $("<div>")
        .html("<span class='rankhead'>Triomphe</span><img alt='Triomphe' src='" + Main.k.servurl + "/img/rank_triumph.png' />")
        .prependTo("#category_triumph");

    $("<div>")
        .html("<span class='rankhead'>Super NOVA</span><img alt='NOVA' src='" + Main.k.servurl + "/img/rank_nova.png' />")
        .prependTo("#category_nova");
};