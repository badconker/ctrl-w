Main.k.browserNotice = function(msg){

	// Let's check if the browser supports notifications
	if (!("Notification" in window)) {
		Main.k.quickNoticeError("This browser does not support desktop notifications");
	}

	// Let's check if the user is okay to get some notification
	else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		// If window currently in focus, don't notify
		if ( Main.k.windowFocus ) return;
		Main.k.browserNotify(msg);
	}

	// Otherwise, we need to ask the user for permission
	// Note, Chrome does not implement the permission static property
	// So we have to check for NOT 'denied' instead of 'default'
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {

			// Whatever the user answers, we make sure we store the information
			if(!('permission' in Notification)) {
				Notification.permission = permission;
			}

			// If the user is okay, let's create a notification
			if (permission === "granted") {
				// If window currently in focus, don't notify
				if ( Main.k.windowFocus ) return;
				Main.k.browserNotify(msg);
			}
		});
	}

	// At last, if the user already denied any notification, and you 
	// want to be respectful there is no need to bother him any more.
};

Main.k.browserNotify = function(msg) {
	var options = {
		body: msg,
		icon: Main.k.servurl + "/img/icons/ui/mush.png"
	}

	var notification = new Notification("Mush", options);
	notification.onclick = function() {
		window.focus();
		this.close();
	}

}