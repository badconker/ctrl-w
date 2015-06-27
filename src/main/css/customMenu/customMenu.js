Main.k.css.customMenu = function() {
    $("head").append(
        $(document.createElement("link")).attr({rel: "stylesheet", type: "text/css", href: Main.k.servhost+'/css/customMenu.css'})
    );

    //$("<link rel='stylesheet' type='text/css'>")
    //    .attr('src', Main.k.servhost+'/css/customMenu.css')
    //    .appendTo("head");
};