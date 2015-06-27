Main.k.css.bubbles = function() {
    var d = "3px";
    var custombubbles_glow = "text-shadow: 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF;";

    $("head").append(
        $(document.createElement("link")).attr({rel: "stylesheet", type: "text/css", href: Main.k.servhost+'/css/bubbles.css'})
    );

    //$("<link rel='stylesheet' type='text/css'>")
    //    .attr('src', Main.k.servhost+'/css/bubbles.css')
    //    .appendTo("head");
};