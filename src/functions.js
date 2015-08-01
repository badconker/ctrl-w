String.prototype.htmlEncode = function() {
	return $('<div/>').text(this).html();
};
String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) {
		return a.toUpperCase();
	});
};
String.prototype.replaceFromObj = function(obj) {
  var retStr = this;
  for (var x in obj) {
	if(obj.hasOwnProperty(x)){
		retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
	}
  }
  return retStr;
};
String.prototype.hashCode = function() {
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};
RegExp.escape = function(s) {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
function addFctToPage (text, name) {
	var D                                   = document;
	var scriptNode                          = D.createElement ('script');
	scriptNode.type                         = "text/javascript";
	if (text)       scriptNode.textContent  = text;
	if (name)		scriptNode.textContent  = name + ' = ' + text;

	var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
	targ.appendChild (scriptNode);
}