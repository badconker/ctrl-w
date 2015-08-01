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

    $("<style>").attr("type", "text/css").html("\
	span.rankhead {\
		display: block;\
		position: absolute;\
		top: 30px; left: 250px;\
		bottom: 30px; right: 10px;\
		font-size: 24pt;\
		color: #FFF;\
		text-align: left;\
		font-family: 'PT Sans Caption','Arial','Segoe UI','Lucida Grande','Trebuchet MS','lucida sans unicode',sans-serif;\
		text-shadow: -1px 0px 2px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.3), 1px 0px 2px rgba(0, 0, 0, 0.3);\
		text-transform: uppercase;\
	}\
	").appendTo($("head"));

    var $cat_triumph_nova = $("#category_triumph, #category_nova");
    $cat_triumph_nova.css({
        margin: "0",
        width: "50%",
        float: "left",
        display: "block"
    });

    $("th").each(function() {
        var txt = $(this).html().trim();
        if (txt == "Héros Favori") $(this).html("");
    });

    $("ul.tablefilter").first().clone().css({
        float: "right",
        width: "auto"
    }).prependTo("#ranking").find("li").attr("onclick", "").on("click", Main.k.SwitchRankingTab);
    $cat_triumph_nova.find(".tablefilter, .clear").remove();
    $("#ranking").find("th.distinctions").css("width", "auto");
    $(".bgtablesummar").css("margin", "0 5px");
    $("table.summar").css("width", "100%");
    $("table.summar tr.top td").css("font-size", "12pt");
    $(".pages").css("display", "none");//TEMP
    $("ul.category").css("display", "none");
    $("tr.cdRhtTr").css("display", "table-row");
    $("<div>").addClass("clear").appendTo("#ranking");
    $("<div>").addClass("clear").insertBefore("#category_triumph");

    var headers = $("<div>").css({"margin": "20px auto 10px", "text-align": "center", position: "relative"}).prependTo("#category_triumph, #category_nova");
    headers.first().html("<span class='rankhead'>Triomphe</span><img alt='Triomphe' src='" + Main.k.servurl + "/img/rank_triumph.png' />");
    headers.last().html("<span class='rankhead'>Super NOVA</span><img alt='NOVA' src='" + Main.k.servurl + "/img/rank_nova.png' />");
};