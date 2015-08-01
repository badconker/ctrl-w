Main.k.showLoading = function(){
	if($('.ctrlw_overlay_loading').length == 0){
		var overlay = $('<div class="ctrlw_overlay_loading"></div>');
		$('body').append(overlay);
		overlay.after('<div class="ctrlw_loading_ball_wrapper"><div class="ctrlw_loading_ball"></div><div class="ctrlw_loading_ball1"></div></div>');

	}
};
Main.k.hideLoading = function(){
	$('.ctrlw_overlay_loading,.ctrlw_loading_ball_wrapper').remove();
};