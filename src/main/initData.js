Main.k.initData = function() {
	// Define if we are ingame
	Main.k.playing = Main.heroes.iterator().hasNext();

	Main.k.BMAXWIDTH = 1160;
	//this variable can be modified during script execution
	Main.k.HEROES =   ["jin_su", "frieda", "kuan_ti", "janice", "roland", "hua", "paola", "chao", "finola", "stephen", "ian", "chun", "raluca", "gioele", "eleesha", "terrence", "andie", "derek"];
	Main.k.HEROES_ALL = Main.k.HEROES.slice();
	Main.k.COMMANDERS = ["jin_su", "chao", "gioele", "stephen", "frieda", "kuan_ti", "hua", "derek", "roland", "raluca", "finola", "paola", "terrence", "eleesha", "andie", "ian", "janice", "chun"];
	Main.k.COMMS = ["paola", "eleesha", "andie", "stephen", "janice", "roland", "hua", "derek", "jin_su", "kuan_ti", "gioele", "chun", "ian", "finola", "terrence", "frieda", "chao", "raluca"];
	Main.k.ADMINS =   ["janice", "terrence", "eleesha", "raluca", "finola", "andie", "frieda", "ian", "stephen", "paola", "jin_su", "hua", "kuan_ti", "gioele", "chun", "roland", "chao", "derek"];

	Main.k.HEROES_REPLACE = {
		finola:'andie',
		chao:'derek'
	};
	Main.k.h = {
		mush:{
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:mush")
		},
		jin_su:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Commandant suprême du Daedalus."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:jin_su"),
			dev_surname_long:'kim_jin_su'
		},
		frieda:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Scientifique millénaire."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:frieda"),
			dev_surname_long:'frieda_bergmann'
		},
		kuan_ti:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Grand architecte du Daedalus."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:kuan_ti"),
			dev_surname_long:'lai_kuan_ti'
		},
		janice:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Psychologue Digitale aux atouts certains."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:janice"),
			dev_surname_long:'janice_kent'
		},
		roland:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Humoriste pilote de chasse à ses heures."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:roland"),
			dev_surname_long:'roland_zuccali'
		},
		hua:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Exploratrice de l'EXTRÊME."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:hua"),
			dev_surname_long:'jiang_hua'
		},
		paola:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Officier principal des Communications du Daedalus."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:paola"),
			dev_surname_long:'paola_rinaldo'
		},
		chao:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Chef de la sécurité du Daedalus."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:chao"),
			dev_surname_long:'wang_chao'
		},
		finola:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Biologiste de renommée internationale, pionnière dans l'étude du Mush."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:finola"),
			dev_surname_long:'finola_keegan'
		},
		stephen:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Cuisinier le plus dangereux de la galaxie."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:stephen"),
			dev_surname_long:'stephen_seagull'
		},
		ian:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Chercheur frugivore flexible."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:ian"),
			dev_surname_long:'ian_soulton'
		},
		chun:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Dernier espoir de l'Humanité."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:chun"),
			dev_surname_long:'zhong_chun'
		},
		raluca:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Génie de la physique quantique félinophile."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:raluca"),
			dev_surname_long:'raluca_tomescu'
		},
		gioele:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Armateur philantrophobe."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:gioele"),
			dev_surname_long:'gioele_rinaldo'
		},
		eleesha:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Investigatrice déchue de premier plan."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:eleesha"),
			dev_surname_long:'eleesha_williams'
		},
		terrence:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Technophile motorisé."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:terrence"),
			dev_surname_long:'terrence_archer'
		},
		andie:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Fayot de la fédération."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:andie"),
			dev_surname_long:'andie_graham'
		},
		derek:{
			/* Translators: This translation must be copied from the game. */
			short_desc:Main.k.text.gettext("Héros malgré lui."),
			/* Translators: Thread id for this character's tutorial. */
			tutorial:Main.k.text.gettext("tutorial_id:derek"),
			dev_surname_long:'derek_hogan'
		}

	};
	$.each(Main.k.h,function(k,h){
		var $this = $(this)[0];
		if(typeof($this.dev_surname_long) != 'undefined'){
			$this.name = $this.dev_surname_long.replace("_", " ").capitalize();
		}
	});

	Main.k.cssToHeroes = [];
	Main.k.cssToHeroes["-1056px"] = "roland";
	Main.k.cssToHeroes["-1185px"] = "janice";
	Main.k.cssToHeroes["-1233px"] = "ian";
	Main.k.cssToHeroes["-1282px"] = "chao";
	Main.k.cssToHeroes["-1335px"] = "eleesha";
	Main.k.cssToHeroes["-1391px"] = "raluca";
	Main.k.cssToHeroes["-1444px"] = "terrence";
	Main.k.cssToHeroes["-1499px"] = "jin_su";
	Main.k.cssToHeroes["-1554px"] = "hua";
	Main.k.cssToHeroes["-1604px"] = "jin_su";
	Main.k.cssToHeroes["-1681px"] = "stephen";
	Main.k.cssToHeroes["-1728px"] = "paola";
	Main.k.cssToHeroes["-1875px"] = "kuan_ti";
	Main.k.cssToHeroes["-1921px"] = "finola";
	Main.k.cssToHeroes["-1970px"] = "gioele";
	Main.k.cssToHeroes["-2017px"] = "chun";
	Main.k.cssToHeroes["-2063px"] = "frieda";

	Main.k.compActiveMush = [];

	Main.k.compInactiveMush = [];
	Main.k.compInactiveMush["cold_blood"] = true;
	Main.k.compInactiveMush["opportunist"] = true;
	Main.k.compInactiveMush["optimistic"] = true;
	Main.k.compInactiveMush["mycologist"] = true;
	Main.k.compInactiveMush["panic"] = true;
	Main.k.compInactiveMush["caffeinomaniac"] = true;
	Main.k.compInactiveMush["frugivore"] = true;

	Main.k.researchGlory = [];
	Main.k.researchGlory["drug_dispenser"] = 0;//
	Main.k.researchGlory["healing_ointmant"] = 0;//
	Main.k.researchGlory["natamy_gun"] = 0;//
	Main.k.researchGlory["ncc_lens"] = 0;//
	Main.k.researchGlory["spore_extractor"] = 0;//
	Main.k.researchGlory["steroids"] = 0;//
	Main.k.researchGlory["tesla_sup2x"] = 0;//
	Main.k.researchGlory["antispore_gaz"] = 3;//
	Main.k.researchGlory["constipaspore_serum"] = 3;//
	Main.k.researchGlory["fungus_scrambler"] = 3;//
	Main.k.researchGlory["infinite_water"] = 3;//
	Main.k.researchGlory["mushicide_soap"] = 3;
	Main.k.researchGlory["mushophage_bacteria"] = 3;//
	Main.k.researchGlory["myco_alarm"] = 3;//
	Main.k.researchGlory["mycoscan"] = 3;//
	Main.k.researchGlory["patuline_scrambler"] = 3;//
	Main.k.researchGlory["pheromodem"] = 3;//
	Main.k.researchGlory["mush_breeding_system"] = 6;//
	Main.k.researchGlory["mush_breeds"] = 6;//
	Main.k.researchGlory["myco_dialect"] = 6;//
	Main.k.researchGlory["mush_predator"] = 6;//
	Main.k.researchGlory["anti_mush_serum"] = 16;//

	Main.k.statusImages = [];
	Main.k.statusImages['bronze'] = 'http://imgup.motion-twin.com/twinoid/6/b/8b8ae4d5_4030.jpg';
	Main.k.statusImages['silver'] = 'http://imgup.motion-twin.com/twinoid/a/e/3c341777_4030.jpg';
	Main.k.statusImages['gold'] = 'http://imgup.motion-twin.com/twinoid/c/1/4e43e15c_4030.jpg';

	Main.k.statuses = {
		'inactive': {
			/* Translators: This translation must be copied from the game. */
			'desc' : Main.k.text.gettext('Vous ne vous êtes pas connecté depuis 24h. Bonne chance pour la suite...'),
			'img' : 'sleepy',
			/* Translators: This translation must be copied from the game. */
			'name' : Main.k.text.gettext('Inactif')
		},
		'hinactive': {
			/* Translators: This translation must be copied from the game. */
			'desc' : Main.k.text.gettext('Description grand inactif'),
			'img' : 'noob',
			/* Translators: This translation must be copied from the game. */
			'name' : Main.k.text.gettext('Grand inactif')
		},
		'mush': {
			/* Translators: This translation must be copied from the game. */
			'desc' : Main.k.text.gettext('Vous faites partie du Mush.'),
			'img' : 'mush',
			/* Translators: This translation must be copied from the game. */
			'name' : Main.k.text.gettext('Mush')
		}
	};
};