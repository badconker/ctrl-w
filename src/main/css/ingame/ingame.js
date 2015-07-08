Main.k.css.ingame = function() {
    Main.k.css.bubbles();
    $("<link rel='stylesheet' type='text/css'>")
        .attr('href', Main.k.servhost+'/build/css/ingame.css')
        .appendTo("head");

    if (navigator.userAgent.indexOf("Firefox")==-1) {
        $(".usLeftbar .hero .icons").css("padding-right", "30px");
    }
};