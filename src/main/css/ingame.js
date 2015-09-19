Main.k.css.ingame = function() {
	Main.k.css.bubbles();

	$("<style>").attr("type", "text/css").html("\
	.tid_editorContent {\
	  visibility: visible;\
	 }\
	.blink-limited {\
		-moz-animation: blink 1s 3 linear;\
		-webkit-animation: blink 1s 3 linear;\
	}\
	@-moz-keyframes blink {\
		from { opacity: 1; }\
		50% { opacity: 0; }\
		to { opacity: 1; }\
	}\
	@-webkit-keyframes blink {\
		from { opacity: 1; }\
		50% { opacity: 0; }\
		to { opacity: 1; }\
	}\
	.but.loading{\
		overflow:hidden;\
	}\
	.but.loading:before{\
		background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.1) 95%, rgba(255,255,255,0) 100%); /* FF3.6+ */\
		background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(50%,rgba(255,255,255,0.65)), color-stop(95%,rgba(255,255,255,0.1)), color-stop(100%,rgba(255,255,255,0))); /* Chrome,Safari4+ */\
		background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.1) 95%,rgba(255,255,255,0) 100%); /* Chrome10+,Safari5.1+ */\
		background: -o-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.1) 95%,rgba(255,255,255,0) 100%); /* Opera 11.10+ */\
		background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.1) 95%,rgba(255,255,255,0) 100%); /* W3C */\
		content: '';\
		height: 21px;\
		left: 0;\
		position: absolute;\
		width: 70px;\
		-moz-animation: loading-button 1s infinite linear;\
		-webkit-animation: loading-button 1s infinite linear;\
	}\
	@-moz-keyframes loading-button{\
		from { margin-left: -70px; }\
		to {margin-left: 100%; }\
	}\
	@-webkit-keyframes loading-button{\
		from { margin-left: -70px; }\
		to {margin-left: 100%; }\
	}\
	.ctrlw_overlay_loading{\
		background-color: #4E5162;\
		background-image: url('http://data.twinoid.com/img/design/mask.png');\
		height : 100%;\
		left : 0;\
		opacity:0.9;\
		position : fixed;\
		top : 0;\
		width : 100%;\
		z-index:1000;\
	}\
	.ctrlw_loading_ball_wrapper{\
		position:fixed;\
		left:50%;\
		top:50%;\
		z-index:1001;\
	}\
	.ctrlw_loading_ball {\
		background-color: rgba(0,0,0,0);\
		border: 5px solid rgba(0,183,229,0.9);\
		opacity: 1;\
		border-top: 5px solid rgba(0,0,0,0);\
		border-left: 5px solid rgba(0,0,0,0);\
		border-radius: 50px;\
		box-shadow: 0 0 35px #2187e7;\
		width: 50px;\
		height: 50px;\
		margin: 0 auto;\
		-moz-animation: spin .5s infinite linear;\
		-webkit-animation: spin .5s infinite linear;\
	}\
	.ctrlw_loading_ball1 {\
		background-color: rgba(0,0,0,0);\
		border: 5px solid rgba(0,183,229,0.9);\
		opacity: 1;\
		border-top: 5px solid rgba(0,0,0,0);\
		border-left: 5px solid rgba(0,0,0,0);\
		border-radius: 50px;\
		box-shadow: 0 0 15px #2187e7;\
		width: 30px;\
		height: 30px;\
		margin: 0 auto;\
		position: relative;\
		top: -50px;\
		-moz-animation: spinoff .5s infinite linear;\
		-webkit-animation: spinoff .5s infinite linear;\
	}\
	@-moz-keyframes spin {\
		0% {\
			-moz-transform: rotate(0deg);\
		}\
		100% {\
			-moz-transform: rotate(360deg);\
		};\
	}\
	@-moz-keyframes spinoff {\
		0% {\
			-moz-transform: rotate(0deg);\
		}\
	\
		100% {\
			-moz-transform: rotate(-360deg);\
		};\
	}\
	@-webkit-keyframes spin {\
		0% {\
			-webkit-transform: rotate(0deg);\
		}\
		100% {\
			-webkit-transform: rotate(360deg);\
		};\
	}\
	@-webkit-keyframes spinoff {\
		0% {\
			-webkit-transform: rotate(0deg);\
		}\
		100% {\
			-webkit-transform: rotate(-360deg);\
		};\
	}\
	.mxhead { height: 0; }\
	.cdReadMeHook { display: none! important; }\
	.tabon { background-image: url(" + Main.k.servurl + "/img/tabon.png)! important; }\
	.taboff { background-image: url(" + Main.k.servurl + "/img/taboff.png)! important; }\
	.taboff:hover { background-image: url(" + Main.k.servurl + "/img/tabon.png)! important; }\
	td.chat_box .right {\
		position: relative;\
		background: url(" + Main.k.servurl + "/img/chatbgtop.png) no-repeat scroll right top;\
	}\
	td.chat_box .right:before {\
		content: '';\
		display: block;\
		position: absolute;\
		top: 0; left: 0; right: 6px;\
		height: 5px;\
		background: rgb(194, 243, 252);\
	}\
	td.chat_box .chattext .bubble .talks .from { background-image: url(" + Main.k.servurl + "/img/chat_from_left.png)! important; }\
	.customtabs li { margin-right: 3px; margin-bottom: 0! important; }\
	html { overflow-x: auto; width: 100%; }\
	body { background-position: 50% -100px; overflow-x: hidden! important; min-width: " + Main.k.BMAXWIDTH + "px; width: 100%; }\
	ul.mtabs li { margin-right: 5px! important; }\
	.helpguide { display: none; }\
	#tid_bar_down { clear: both; }\
	#cdMainChat { position: relative; }\
	#cdTabsChat { margin: 0; top: -24px; }\
	#topinfo_bar { margin-top: 5px; }\
	#tooltip { z-index: 100! important; }\
	#floating_ui_start { position: absolute; top: 42px; left: 5px; z-index: 20; }\
	.mtabs a { color: #FFF! important; }\
	#char_col .sheetmain { position: relative; }\
	#char_col .statuses { margin: 0! important; top: 10px; left: 7px; }\
	#char_col .skills { margin: 0! important; top: 0px; left: 177px; }\
	span.highlight {\
		background: #FF6;\
		padding: 0 2px;\
		margin: 0 -2px;\
	}\
	.exploring {\
		top: -30px! important;\
		right: 15px! important;\
		width: 200px! important;\
		height: 24px! important;\
		z-index: 20;\
		overflow: hidden! important;\
	}\
	.exploring .exploring2 {\
		height: 22px! important;\
	}\
	.exploring:hover {\
		width: auto! important;\
		height: auto! important;\
	}\
	.exploring:hover .exploring2 {\
		height: auto! important;\
	}\
	a.butmini { \
		outline: none! important; \
		position: relative;\
	}\
	a.butmini:after { \
		display: block;\
		content: '';\
		position: absolute;\
		top: 0px; bottom: 0px; left: 0px; right: 0px;\
		border: 1px solid #1D2028;\
		z-index: 3;\
	}\
	.customreply { \
		right: -7px! important;\
		bottom: 2px! important;\
		text-align: right;\
	}\
	.customreply a { \
		opacity: 0.8;\
	}\
	.customreply a:hover { \
		opacity: 1;\
	}\
	.chatformatbtn { \
		float: right;\
		margin-right: 5px! important;\
		margin-top: 7px! important;\
		width: auto! important;\
	}\
	.chatformatbtn img { \
		vertical-align: middle! important;\
	}\
	.alertnbwrapper { \
		position: absolute;\
		top: 16px;\
		left: -3px;\
		height: 17px;\
		width: 22px;\
		text-align: center;\
		overflow: visible;\
		cursor: default;\
		z-index: 1;\
	}\
	.alertnbwrapper .alertnb { \
		position: relative;\
		display: inline-block;\
		background: url(/img/design/alarm_on_bg.gif) repeat-x bottom;\
		color: rgb(255, 78, 100);\
		padding: 0 0px;\
		font-size: 10px;\
		line-height: 16px;\
		height: 17px;\
		min-width: 10px;\
	}\
	.alertnbwrapper .alertnb:before { \
		content: '';\
		display: block;\
		position: absolute;\
		left: -4px;\
		top: 0px;\
		bottom: 0px;\
		width: 4px;\
		background: url(" + Main.k.servurl + "/img/alertleft.gif) bottom left;\
	}\
	.alertnbwrapper .alertnb:after { \
		content: '';\
		display: block;\
		position: absolute;\
		right: -4px;\
		top: 0px;\
		bottom: 0px;\
		width: 4px;\
		background: url(" + Main.k.servurl + "/img/alertright.gif) bottom right;\
	}\
	.usLeftbar { \
		position: relative;\
		float: left;\
		background-color: #17195B;\
		background: url('/img/design/bg_right.png') right repeat-y;\
		border-right: 1px solid rgba(0,0,0,0.1);\
		box-shadow: 1px 0 3px 1px rgba(0,0,0,0.2);\
		min-height: 725px;\
		margin-right: 15px;\
		padding: 8px 0;\
		width: 125px;\
	}\
	.usLeftbar:before { \
		display: block;\
		content: '';\
		position: absolute;\
		top: 0; bottom: 0; right: 113px;\
		width: 10000px;\
		background-color: #17195B;\
		z-index: -1;\
	}\
	.usLeftbar h3 { \
		clear: both;\
		position: relative;\
		margin: 20px 0 10px;\
		padding: 0 16px 2px 4px;\
		color: rgba(255,255,255,0.8);\
		font-variant: small-caps;\
		font-size: 15px;\
		border-bottom: 1px solid rgba(255,255,255,0.6);\
	}\
	.usLeftbar h3:before { \
		display: block;\
		content: '';\
		position: absolute;\
		bottom: -3px; left: 0; right: 0;\
		border-bottom: 1px solid rgba(255,255,255,0.6);\
	}\
	.usLeftbar h3.first { \
		margin: 0 0 10px 0! important;\
	}\
	.usLeftbar h3 span { \
		position: absolute;\
		width: 16px;\
		height: 16px;\
		top: 1px; right: 4px;\
		cursor: pointer;\
		opacity: 0.4;\
	}\
	.usLeftbar h3 span:hover { \
		opacity: 1;\
	}\
	.usLeftbar h3 .displaymore { \
		background: url(/img/icons/ui/more.png);\
	}\
	.usLeftbar h3 .displayless { \
		background: url(/img/icons/ui/less.png);\
	}\
	.usLeftbar .hero { \
		position: relative;\
		clear: both;\
		margin: 10px 0;\
		height: 36px;\
		padding-right: 20px;\
		background: rgba(255,255,255,0.08);\
		border-top: 1px solid rgba(255,255,255,0.1);\
		border-bottom: 1px solid rgba(255,255,255,0.1);\
	}\
	.usLeftbar .missingheroes { \
		position: relative;\
		clear: both;\
		margin: 10px 0;\
		padding: 1px 3px 3px;\
		line-height: 0px;\
		background: rgba(255,255,255,0.08);\
		border-top: 1px solid rgba(255,255,255,0.1);\
		border-bottom: 1px solid rgba(255,255,255,0.1);\
	}\
	.usLeftbar img { \
		opacity: 0.7;\
	}\
	.butbg img.alerted {\
		vertical-align: -20%;\
		margin-right: -10px;\
	}\
	.butbg img.alert {\
		position: relative;\
		left: 0px;\
		top: 2px;\
		transform: scale(1);\
	}\
	.usLeftbar .inventory { \
		padding-left: 4px;\
	}\
	.usLeftbar .item { \
		position: relative;\
		transform: scale(0.5);\
		-webkit-transform: scale(0.5);\
		margin: -14px;\
	}\
	.usLeftbar .item img.broken { \
		position: absolute;\
		right: 2px; top: 1px;\
		transform: scale(1.2);\
		-webkit-transform: scale(1.2);\
		opacity: 1! important;\
	}\
	.usLeftbar .item span.charges { \
		position: absolute;\
		padding: 0px 2px;\
		left: 2px; bottom: 1px;\
		background: rgba(0,0,0,0.7);\
		transform: scale(1.2);\
		-webkit-transform: scale(1.2);\
	}\
	.usLeftbar .item span.charges img { \
		width: 12px; height: 12px;\
	}\
	.usLeftbar .body { \
		float: left;\
		position: relative;\
		opacity: 1;\
		left: -5px;\
		top: -5px;\
		width: 28px;\
		height: 44px;\
		background: url('/img/art/char.png') no-repeat;\
		z-index: 2;\
	}\
	.usLeftbar .missingheroes .body { \
		height: 24px;\
		opacity: 0.7;\
		position: static! important;\
		float: none! important;\
		margin: 0 -3px! important;\
	}\
	.usLeftbar .hero .icons{\
		white-space: nowrap;\
		position: relative;\
		left: -2px;\
	}\
	.usLeftbar img:hover { \
		opacity: 1 !important;\
	}\
	.usLeftbar .but,\
	.ctrlw.but{ \
		margin: 0 2px;\
	}\
	.usLeftbar .but img { \
		opacity: 1;\
	}\
	.usLeftbar .hero .skills { \
		top: 2px;\
	}\
	.usLeftbar .hero .skills span.skill { \
		position: relative;\
	}\
	.icons.skills .skill{\
		display: inline-block;\
		font-size: 0;\
		position: relative;\
	}\
	.icons.skills{\
		height: 18px;\
		margin-bottom:3px;\
	}\
	.usLeftbar .hero .skills span.skill img.actmush,\
	.icons.skills .skill img.actmush\
	 { \
		position: absolute;\
		bottom: -3px;\
		right: 0px;\
		opacity: 1! important;\
	}\
	.usLeftbar .hero .titles { \
		position: absolute;\
		top: -3px;\
		right: 2px;\
		width: 16px;\
		line-height: 12px;\
		z-index: 2;\
	}\
	.usLeftbar .titles_list .icon { \
		margin: 0px 5px 3px 4px;\
		opacity: 1;\
	}\
	.usLeftbar .titles_list .body { \
		height: 24px;\
		opacity: 0.5;\
		position: static! important;\
		float: none! important;\
		margin: 0 -3px! important;\
	}\
	.usLeftbar .projectspreview { \
		text-align: center;\
	}\
	.usLeftbar .labpreview { \
		max-width: 120px;\
	}\
	.usLeftbar .projectpreview { \
		display: inline-block;\
		position: relative;\
		margin: 0 1px;\
		width: 34px;\
		height: 43px;\
		overflow: hidden;\
		border: 1px solid #458ddf;\
	}\
	.usLeftbar .projectpreview img.projectimg { \
		position: absolute;\
		top: -15px;\
		left: -7px;\
		z-index: 1;\
	}\
	.usLeftbar .projectpreview:hover img.projectimg { \
		opacity: 1;\
	}\
	.usLeftbar .projectpreview .projectpct { \
		position: absolute;\
		top: 6px;\
		left: 0px;\
		width: 34px;\
		text-align: center;\
		font-weight: bold;\
		font-size: 14px;\
		text-shadow: 0 0 6px black;\
		cursor: default;\
		z-index: 3;\
	}\
	.usLeftbar .projectpreview .projectbonus { \
		position: absolute;\
		bottom: 0px;\
		left: 0px;\
		width: 34px;\
		height: 16px;\
		text-align: center;\
		z-index: 3;\
	}\
	.usLeftbar .projectpreview .projectbonus img { \
		height: 16px;\
		opacity: 1;\
	}\
	td.chat_box .chattext .wall .mainmessage.neron_talks {\
		background-color : #74CBF3! important;\
		font-variant: small-caps;\
	}\
	#tabreply_content .loading, #tabcustom_content .loading { \
		text-align: center;\
		margin-top: 42px;\
	}\
	#tabreply_content .wall, #tabcustom_content .wall { \
		resize: none;\
	}\
	#tabreply_content .tid_buttons, #tabcustom_content .tid_buttons { \
		width: 100%;\
		text-align: center;\
		margin: 5px 0;\
	}\
	#tabreply_content .tid_button, #tabcustom_content .tid_button { \
		min-width: 0! important;\
		display: inline-block;\
		margin: 10px 4px;\
		padding: 3px 8px;\
	}\
	#tabreply_content textarea, #tabcustom_content textarea, #tabreply_content .reply, #tabcustom_content .reply { \
		width: 95%;\
		height: 80px! important;\
		resize: none! important;\
		margin: 3px auto! important;\
		background-color: #fff;\
		box-shadow: inset 0 0 3px #aad4e5, 0px 1px 0px #fff;\
		border: 1px solid #aad4e5;\
		border-radius : 3px;\
		color: rgb(10,40,80);\
		padding: 3px 5px;\
		font-size: 10pt;\
		overflow: auto;\
		text-align: left;\
	}\
	#tabreply_content form, #tabcustom_content form  { \
		height: 100%! important;\
	}\
	#tabreply_content .tid_wrapper, #tabcustom_content .tid_wrapper { \
		height: 100%! important;\
		padding: 4px;\
	}\
	#tabreply_content .tid_smileyPanel, #tabcustom_content .tid_smileyPanel { \
		margin: 2px auto;\
	}\
	#tabreply_content .tid_smileyPopUp .tid_wrapper, #tabcustom_content .tid_smileyPopUp .tid_wrapper  { \
		max-height: 80px! important;\
	}\
	#tabcustom_content .array_messages_prerecorded { \
		padding: 10px 10px 10px 35px;\
		background-color: #e1f9fe;\
		border-bottom: 1px solid #aad4e5;\
		border-top: 1px solid #aad4e5;\
		text-align: center;\
	}\
	#tabcustom_content .message_prerecorded { \
		margin: 2px;\
		padding: 2px 4px;\
		box-shadow: inset 0 0 3px #aad4e5, 0px 1px 0px #fff;\
		border: 1px solid #aad4e5;\
		border-radius : 3px;\
		cursor:  pointer;\
	}\
	#tabcustom_content .selected{ \
		background-color: #a1c9ce;\
	}\
	.recap p { \
		border: 1px solid rgb(9,10,97);\
		background: rgba(255,255,255,0.3);\
		margin: 10px 20px;\
		padding: 2px;\
		text-align: center;\
	}\
	.recap .chars { \
		text-align: center;\
	}\
	.recap .chars .hero { \
		display: inline-block;\
		position: relative;\
		width: 26px;\
		height: 30px;\
	}\
	.recap .chars .hero img { \
		position: absolute;\
		top: 0; left: 4px;\
	}\
	.recap .chars .hero span { \
		position: absolute;\
		bottom: 0; left: 0;\
		width: 100%;\
		text-align: center;\
		font-size: 10px;\
	}\
	.recap .chars .highlight { \
		width: 105px;\
		height: 16px;\
		margin-bottom: 6px;\
	}\
	.recap .chars .highlight span { \
		top: 0px; left: 24px;\
		width: auto;\
		line-height: 16px;\
		text-align: left;\
		font-size: 12px;\
	}\
	.recap textarea { \
		display: block;\
		height: 40px;\
		width: 90%;\
		border: 1px solid rgb(10,40,80);\
		padding: 2px;\
		margin: 5px auto;\
		font-size: 10px;\
		color: rgb(10,40,80);\
		opacity: 0.4;\
		resize: none;\
	}\
	.recap textarea:active { \
		opacity: 1;\
	}\
	.recap textarea:focus { \
		opacity: 1;\
	}\
	#tabtopic_content .mainmessage { \
		margin: 3px 5px;\
	}\
	#tabtopic_content table.treereply { \
		width: 92%;\
	}\
	#tabtopic_content td.tree { \
		width: 15px;\
	}\
	#tabfav_content .reply, #tabsearch_content .reply, #tabnew_content .reply, #tabwall_content .reply { \
		max-height: 65px;\
		overflow-y: hidden! important;\
		width: 92%;\
		margin: 5px 5px 0! important;\
	}\
	#tabfav_content .topicact, #tabsearch_content .topicact, #tabnew_content .topicact, #tabwall_content .topicact { \
		display: block;\
		text-align: center;\
		color: rgb(150,22,12)! important;\
		margin: 0 20px 8px;\
	}\
	#tabsearch_content { \
		padding-top: 30px;\
		position: relative;\
	}\
	#tabsearch_content .bar { \
		position: absolute;\
		top: 0px;\
		left: 0px;\
		right: 0px;\
		text-align: center;\
		padding: 4px 0;\
		border-bottom: 1px solid #555;\
	}\
	#tabsearch_content .bar input[type=text] { \
		color: black;\
		padding: 1px 3px;\
		border: 1px solid #555;\
	}\
	#tabsearch_content .bar .butmini { \
		margin: 0px 2px -6px;\
		padding: 3px 4px;\
	}\
	#searchresults h4 { \
		margin: 4px 8px; \
		font-size: 14px; \
	}\
	#searchresults p.help { \
		margin: 4px 8px; \
	}\
	#searchresults p.help i { \
		color: rgb(80,10,10); \
	}\
	.usPopup { \
		display: block! important;\
		position: fixed;\
		top: 23px;\
		bottom: 0px;\
		left: 0px;\
		right: 0px;\
		z-index: 98;\
	}\
	.usPopup .usPopupMask { \
		position: absolute;\
		top: 0; bottom: 0; right: 0; left: 0;\
		background: rgba(0,0,0,0.8);\
		z-index: -1;\
	}\
	.usPopup .usPopupContent { \
		position: relative;\
		margin: 100px auto 0 auto;\
		background: rgba(28, 56, 126, 0.976);\
		box-shadow: 0px 0px 3px 3px rgba(57, 101, 251, 0.5), 0px 0px 3px 3px rgba(57, 101, 251, 0.5) inset;\
		resize: none! important;\
	}\
	.popup-content{\
		margin: 30px;\
	}\
	.popup-actions{\
		margin-bottom: 10px;\
		text-align: center;\
	}\
	.updatescontent { \
		margin: 30px;\
	}\
	.updatescontent ul.updateslist { \
		font-size: 12px;\
		margin: 10px;\
	}\
	.updatescontent ul.updateslist li { \
		margin-left: 20px;\
		list-style-type: square;\
	}\
	.updatesactions{ \
		text-align: center;\
		margin-bottom: 10px;\
	}\
	.updatesbtn { \
		display: inline-block;\
		margin: 0 3px;\
	}\
	#neron_alert_content {\
		padding: 10px;\
	}\
	#neron_alert_content .img_neron{\
		float:left;\
		height:45px;\
		margin:0 8px 5px 0;\
	}\
	#neron_alert_content p{\
		margin: 10px 0;\
	}\
	#neron_alert_content input{\
		color: black;\
		margin-bottom: 10px;\
	}\
	.neron_alert_buttons{\
		text-align: center;\
	}\
	#char_col, #room_col, #chat_col, #topics_col, #topic_col, #reply_col, #options_col, #about_col, #profile_col {\
		transition: all 200ms;\
		-webkit-transition: all 200ms;\
		-o-transition: all 200ms;\
	}\
	#profile_col .hero-details{\
		height: 95px;\
		margin-left: 95px;\
		margin-right: 5px;\
		position: relative;\
	}\
	.profile-custom-infos{\
		border-top: 1px solid #FFF;\
		bottom: 0;\
		padding-top: 3px;\
		position: absolute;\
		width: 100%;\
	}\
	.profile-custom-infos label{\
		margin-right: 10px;\
	}\
	#profile-notes{\
	}\
	#profile-notes textarea{\
		height:40px;\
		display: block;\
		margin-bottom: 12px;\
		margin-top: 5px;\
		resize: none;\
	}\
	#profile-notes textarea:last-child{\
		height:146px;\
		overflow: hidden;\
	}\
	#profile-notes .actions {\
		bottom: 3px;\
		left: 0;\
		position: absolute;\
		right: 0;\
		text-align: center;\
	}\
	#profile-notes .profile-content{\
		height: 260px;\
		overflow: hidden;\
		padding: 0 10px;\
	}\
	/** pour régler les probleme du au scale css3 sur firefox**/\
	#char_col .sheetbgcontent table td.two .extrapa{\
		position:relative;\
	}\
	#cdMainContent{\
		position:relative;\
	}\
	.ctrlw_col input,\
	.ctrlw_col textarea{\
		color: #090A61;\
	}\
	.ctrlw-row-options{\
		background: none repeat scroll 0 0 rgba(255, 255, 255, 0.1);\
		border: 1px dashed #EEEEEE;\
		clear: both;\
		color: #EEEEEE;\
		margin: 10px 20px;\
		padding: 5px;\
	}\
	.ctrlw_col{\
		color: rgb(9,10,97);\
	}\
	.ctrlw_col p{\
		margin: 10px 0;\
	}\
	").appendTo("head");
	if (navigator.userAgent.indexOf("Firefox")==-1) $(".usLeftbar .hero .icons").css("padding-right", "30px");
};