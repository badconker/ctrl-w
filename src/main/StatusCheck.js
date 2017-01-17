Main.k.statusCheck = function(){ 

	Main.k.refreshAll();

	var _now = new Date();
	var _elapsed = _now.getTime() - Main.tData.clientNow.getTime();
	var _timeToGo = (Main.tData.timeToCycle - _elapsed) / 1000.0 | 0;

	var _diffHI = parseInt(_timeToGo / 3600.0 | 0);
	var _diffMI = parseInt(Math.abs(_timeToGo / 60.0 % 60.0));
	var _diffSI = parseInt(Math.abs(_timeToGo % 60));

	var _unreads = 0;

	$('.cdNbNotRead').each(function(i, notReadEl ) {
		_unreads += parseInt( $( notReadEl ).text() );
	});

	if(_unreads > 0) {
		Main.k.browserNotice("You have " + _unreads + " unread messages");
	}

	if(_diffHI == 0 && _diffMI < 3) {
		Main.k.browserNotice("Cycle change about to happen");
	}

	if(_diffHI == 2 && _diffMI > 55) {
		Main.k.browserNotice("Cycle change just happened");
	}

	// TODO : Make this configurable?
	// TODO : Increase timer if long time in inactive tab

	// Check every minute
	var timeout = 60000;
	// If in hidden tab, check every 5 minutes
	if(!Main.k.windowFocus) timeout = 300000;

	setTimeout(Main.k.statusCheck, timeout);

}