Main.k.css.customMenu = function() {
	$("<style>").attr("type", "text/css").html("\
	body.gold #maincontainer{margin-top:543px !important;}\
	#menuBar { display: none; }\
	.mxhead a[class^=logo] { position: relative! important; display: block; }\
	.mxhead {padding:0}\
	.kmenu {\
		margin: 10px auto 20px;\
		text-align: center;\
	}\
	.kmenuel {\
		position: relative;\
		display: inline-block;\
		border: 1px solid rgba(19,32,85,0.8);\
		border-left: none;\
		background: #003baf;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px -15px 15px -10px rgba(0,0,0,0.5);\
	}\
	.kmenuel a {\
		display: block;\
		width: 160px;\
		height: 24px;\
		padding: 4px 5px;\
		color: #DDD! important;\
		text-decoration: none! important;\
		text-shadow: 0 0 3px #000;\
	}\
	.kmenuel:hover a { color: #FFF! important; }\
	.kmenuel a:hover { color: rgb(255, 78, 100)! important; }\
	.kmenuel a:hover li {\
		color: #FFF! important;\
		text-shadow: 0 0 1px #000;\
	}\
	.kmenuel:hover {\
		border-color: rgb(19,32,85);\
		background: #0044bd;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px 5px 15px 0px rgba(0,0,0,0.4);\
	}\
	.kmenuel.first {\
		border-left: 1px solid rgba(19,32,85,0.8);\
		border-top-left-radius: 8px;\
		border-bottom-left-radius: 8px;\
	}\
	.kmenuel.last {\
		border-top-right-radius: 8px;\
		border-bottom-right-radius: 8px;\
	}\
	.kmenuel ul { display: none; }\
	.kmenuel ul a { display: block; width: auto; padding: 0px 5px }\
	.kmenuel:hover > ul {\
		display: block;\
		position: absolute;\
		width: 100%;\
		top: 33px;\
		left: 0;\
		text-align: right;\
		z-index: 30;\
		padding: 0;\
	}\
	.kmenuel ul li:hover ul {\
		display: block;\
		position: absolute;\
		width: 100%;\
		text-align: right;\
		z-index: 30;\
		padding: 0;\
	}\
	.kmenuel ul li {\
		text-align: left;\
		margin: 0 3px;\
		display: block! important;\
		border: 1px solid rgb(2,16,66);\
		border-top: none! important;\
		height: auto;\
		background: #0071e3;\
		color: #EEE;\
		text-shadow: 0 0 1px #000;\
		text-decoration: none! important;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px -8px 8px -5px rgba(0,0,0,0.3);\
	}\
	.kmenuel ul li:hover {\
		background: #0094ff;\
		text-shadow: 0 0 3px #000;\
		box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3), inset 0px 4px 8px 0px rgba(0,0,0,0.3);\
	}\
	.kmenuel ul li ul {\
		right: -160px;\
		top: 0px;\
	}\
	.kmenuel ul li img {\
		margin-right : 5px;\
		position: relative;\
		top: 2px;\
		height: 16px;\
	}\
	.kmenuel .kssmenuel{\
		display:block;\
		line-height: 22px;\
	}\
	").appendTo("head");
};