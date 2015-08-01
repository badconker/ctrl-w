Main.k.Game.updatePlayerInfos = function() {
	var $this = this;
	console.info('Mise à jour des infos joueurs - envoi');
	Tools.ping('/me',function(content) {
		console.group('Mise à jour des infos joueurs - retour');
		var body = '<div id="body-mock">' + content.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') + '</div>';
		var jobject = $(body);
		console.log('récupération de l\'xp');
		if(jobject.find('#cdActualXp').length > 0){
			$this.data.xp = jobject.find('#cdActualXp').text();
			console.log('xp',$this.data.xp);
		}
		console.log('récupération du statut du joueur');
		if(jobject.find('#experience .bought.goldactive').length > 0){
			$this.data.player_status = 'gold';
			console.log('le joueur est gold');
		}else if(jobject.find('#experience .bought').length > 0){
			$this.data.player_status = 'silver';
			console.log('le joueur est silver');
		}else{
			$this.data.player_status = 'bronze';
			console.log('le joueur est bronze');
		}

		$this.data.castings = {};
		jobject.find('#profile .bgtablesummar:last li').each(function(index, element) {
			var casting = {};
			casting.id = $(this).find('a').attr('href').replace('/group/','');
			casting.icon = $(this).find('img').attr('src');
			var str = jobject.find('.nameCast a:eq('+index+')').text();
			casting.long_name = casting.short_name = str;
			if(str.length > 18){
				casting.short_name = str.match(/\b(\w)/g).join('.').concat('.');
			}
			$this.data.castings[casting.id] = casting;
		});

		$this.save();
		Main.k.MushUpdate();
		Main.k.updateMainMenu();
		Main.k.quickNotice(Main.k.text.gettext('Infos du joueur mises à jour.'));
	});
};