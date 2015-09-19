Main.k.quickNotice = function(msg,type){
	if(typeof(type) == 'undefined' || type == 'info'){
		$.jGrowl("<img src='http://imgup.motion-twin.com/twinoid/8/5/ab7aced9_4030.jpg' height='16' alt='notice'/> "+msg);
	}else if(type == 'error'){
		$.jGrowl("<img src='http://imgup.motion-twin.com/twinoid/9/a/8429c028_4030.jpg' height='16' alt='notice'/> "+msg,{
			theme:'ctrlw-error',
			life: 6000
		});
	}
};
Main.k.quickNoticeError = function(msg){
	Main.k.quickNotice(msg,'error');
};