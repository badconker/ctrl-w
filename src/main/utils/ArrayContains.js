/**
 *
 * @param arr
 * @param o
 * @returns {boolean}
 */
Main.k.ArrayContains = function(arr, o) {
	for (var a in arr) {
		if (a == o) return true;
	}
	for (var i=0; i<arr.length; i++) {
		if (arr[i] == o) return true;
	}
	return false;
};