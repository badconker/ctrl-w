Main.k.SyncAstropad = function(tgt){
	if(typeof(Main.AstroPad) != 'undefined'){
		Main.AstroPad.updateInventory(false, Main.k.SyncAstropadNotice);
	}else{
		var $astro_maj_inventaire = $('#astro_maj_inventaire');
		if($astro_maj_inventaire.length > 0){
			$astro_maj_inventaire[0].click();
			Main.k.SyncAstropadNotice();
		}
	}
};
Main.k.SyncAstropadNotice = function(){
	Main.k.quickNotice(Main.k.text.gettext("Astropad synchronisé."));
};
exportFunction(Main.k.SyncAstropadNotice, unsafeWindow.Main.k, { defineAs: 'SyncAstropadNotice' });