Main.k.SyncAstropad = function(tgt){
    var $astro_maj_inventaire = $('#astro_maj_inventaire');
    if($astro_maj_inventaire.length > 0){
        $astro_maj_inventaire[0].click();
        Main.k.quickNotice(Main.k.text.gettext("Astropad synchronisé."));
        Main.showTip(tgt,
            "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'>" +
            Main.k.text.gettext("Astropad synchronisé.") +
            "</div></div></div></div>"
        );
    }
};