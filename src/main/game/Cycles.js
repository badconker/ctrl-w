// Shows the actual number of remaining cycles
Main.k.displayRemainingCyclesToNextLevel = function (){
	$('.levelingame').each(function(){
		var attr, xp_by_cycle;
		var regex = /(<p>.*>[^0-9]?)([0-9]+)([a-zA-Z ]*)(<)(.*<\/p>)/;
		if($(this).attr('onmouseover_save') !== undefined){
			attr = $(this).attr('onmouseover_save');
		}else{
			attr = $(this).attr('onmouseover');
			$(this).attr('onmouseover_save',attr);
		}
		if(regex.exec(attr) != null){
			if(Main.k.Game.data.player_status == 'gold'){
				xp_by_cycle = 2;
			}else{
				xp_by_cycle = 1;
			}
			var i_cycles = RegExp.$2;
			var i_cycles_save = localStorage.getItem('ctrlw_remaining_cycles');
			localStorage.setItem('ctrlw_remaining_cycles',i_cycles);
			if(i_cycles_save != i_cycles && i_cycles_save != null){
				Main.k.Game.updatePlayerInfos();
			}
			var remaining_cycles = Math.ceil(i_cycles - Main.k.Game.data.xp / xp_by_cycle);
			var i_daily_cycle = 8;
			if($('.miniConf img[src*="fast_cycle"]').length > 0){
				i_daily_cycle = 12;
			}else if($('.miniConf img[src$="blitz_cycle.png"]').length > 0){
				i_daily_cycle = 24;
			}

			var nb_days = Math.round(remaining_cycles / i_daily_cycle);
			var s_days = '';
			if(nb_days > 0){
				s_days = Main.k.text.strargs(Main.k.text.ngettext("(~%1 jour)","(~%1 jours)",nb_days),[nb_days]);
				s_days = ' '+s_days;
			}
			$(this).attr('onmouseover',attr.replace(regex,"$1"+remaining_cycles+"$3"+s_days+"$4"+"$5"));
		}
	});
	if($('.levelingame_no_anim').length > 0){
		localStorage.setItem('ctrlw_remaining_cycles',0);
	}
};
Main.k.onCycleChange = function(){
	// Script updates
	// ----------------------------------- //
	localStorage.removeItem('ctrlw_update_cache');
	localStorage.removeItem('ctrlw_remaining_cycles',0);
	// ----------------------------------- //
};