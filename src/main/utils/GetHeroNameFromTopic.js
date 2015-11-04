/**
 * @param {object} topic
 * @return string
 */
Main.k.GetHeroNameFromTopic = function(topic) {
	var hero = '';
	var div = null;

	// First tries to get the character-specific css class name
	if (topic.find(".char,.tid_char").length >0) {
		div = topic.find(".char,.tid_char");
		hero = div.attr('class').replace("char ", "").replace("tid_char tid_", "");
	}

	// If it failed, compare the image position with custom outfits
	if (div != null && hero == '') {
		var sp = div.css('backgroundPosition').split(" ");
		var pos_y = sp[1];
		
		if(pos_y in Main.k.cssToHeroes){
			hero = Main.k.cssToHeroes[pos_y];
		}else{
			var storage = sessionStorage.getItem('ctrlw_css_outfit' + pos_y);
			if(storage == null){
				GM_xmlhttpRequest({
					method: 'POST',
					url: Main.k.servurl + "/misc/css-outfit",
					data: $.param({
						css: pos_y
					}),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				});
				sessionStorage.setItem('ctrlw_css_outfit' + pos_y,1);
			}
		}
	}
	return hero;
};