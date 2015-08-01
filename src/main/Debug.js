// BUG
Main.k.treatingBug = function(e){
	Main.k.errorList += e;
};
Main.k.displayBug = function(e){
	var displayBug = "";
	var error = [];
	if(Main.k.errorList != undefined){
		error = Main.k.errorList;
	}

	for(var idBug = 0;idBug < error.length;idBug++){
		displayBug += "Name : "+error[idBug].name+"Message : "+error[idBug].message+"\n";
	}
	if(error.length > 0) {alert("nbError : "+error.length+"\n\n"+displayBug);}
};