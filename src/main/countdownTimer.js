Main.k.countdownTimer = {};
Main.k.countdownTimer.counters = {};
Main.k.countdownTimer.go = function(seconds, id, callback){
	var count = seconds;
	var $this = this;
	this.counters[id] = setInterval(function(){
		count--;
		callback(count);
		if(count <= 0){
			clearInterval($this.counters[id]);
		}
	}, 1000); //1000 will  run it every 1 second
};

Main.k.countdownTimer.stop = function (id){
	if(typeof(this.counters[id]) != "undefined"){
		clearInterval(this.counters[id]);
	}
};