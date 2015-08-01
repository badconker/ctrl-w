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

		// Don't need to check if undefined thanks to the shield in the return
		hero = Main.k.cssToHeroes[pos_y];
	}

	// If no hero found (hero = "" or hero = undefined), use jin su
	return hero ? hero : "jin_su";
};