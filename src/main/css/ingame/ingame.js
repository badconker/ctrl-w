Main.k.css.ingame = function() {
    Main.k.css.bubbles();

    $("head").append(
        $(document.createElement("link")).attr({rel: "stylesheet", type: "text/css", href: Main.k.servhost+'/css/ingame.css'})
    );

    //$("<link rel='stylesheet' type='text/css'>")
    //    .attr('src', Main.k.servhost+'/css/ingame.css')
    //    .appendTo("head");

    if (navigator.userAgent.indexOf("Firefox")==-1) {
        $(".usLeftbar .hero .icons").css("padding-right", "30px");
    }
};