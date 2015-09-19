Main.k.css.bubbles = function() {
	var d = "3px";
	var custombubbles_glow = "text-shadow: 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF, 0 0 " + d + " #FFF;";

	$("<style>").attr("type", "text/css").html("\
	.bubble_stephen {\
		background: url(" + Main.k.servurl + "/img/tile_stephen.png) center repeat #FFF! important;\
		border: 1px solid #b48d75;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_hua {\
		background: url(" + Main.k.servurl + "/img/tile_hua.png) center repeat #FFF! important;\
		border: 1px solid #6c543e;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_frieda {\
		background: url(" + Main.k.servurl + "/img/tile_frieda.png) center repeat #FFF! important;\
		border: 1px solid #204563;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_roland {\
		background: url(" + Main.k.servurl + "/img/tile_roland.png) center repeat #FFF! important;\
		border: 1px solid #dc3d8d;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_paola {\
		background: url(" + Main.k.servurl + "/img/tile_paola.png) center repeat #FFF! important;\
		border: 1px solid #792b70;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_jin_su {\
		background: url(" + Main.k.servurl + "/img/tile_jin_su.png) center repeat #FFF! important;\
		border: 1px solid #a41834;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_chao {\
		background: url(" + Main.k.servurl + "/img/tile_chao.png) center repeat #FFF! important;\
		border: 1px solid #5457b0;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_derek {\
		background: url(" + Main.k.servurl + "/img/tile_chao.png) center repeat #FFF! important;\
		border: 1px solid #5457b0;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_finola {\
		background: url(" + Main.k.servurl + "/img/tile_finola.png) center repeat #FFF! important;\
		border: 1px solid #35adbc;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_andie {\
		background: url(" + Main.k.servurl + "/img/tile_finola.png) center repeat #FFF! important;\
		border: 1px solid #35adbc;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_kuan_ti {\
		background: url(" + Main.k.servurl + "/img/tile_kuan_ti.png) center repeat #FFF! important;\
		border: 1px solid #e89413;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_ian {\
		background: url(" + Main.k.servurl + "/img/tile_ian.png) center repeat #FFF! important;\
		border: 1px solid #647c27;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_eleesha {\
		background: url(" + Main.k.servurl + "/img/tile_eleesha.png) center repeat #FFF! important;\
		border: 1px solid #dca312;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_terrence {\
		background: url(" + Main.k.servurl + "/img/tile_terrence.png) center repeat #FFF! important;\
		border: 1px solid #55141c;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_janice {\
		background: url(" + Main.k.servurl + "/img/tile_janice.png) center repeat #FFF! important;\
		border: 1px solid #df2b4e;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_raluca {\
		background: url(" + Main.k.servurl + "/img/tile_raluca.png) center repeat #FFF! important;\
		border: 1px solid #4c4e4c;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_chun {\
		background: url(" + Main.k.servurl + "/img/tile_chun.png) center repeat #FFF! important;\
		border: 1px solid #3aa669;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.bubble_gioele {\
		background: url(" + Main.k.servurl + "/img/tile_gioele.png) center repeat #FFF! important;\
		border: 1px solid #cb5b29;" + custombubbles_glow + "\
		padding: 3px 5px! important;\
	}\
	.custombubbles_nobackground {\
		background: #FFF! important;\
	}\
	.bubble_stephen span.buddy, .colored_stephen { color: #b48d75! important; }\
	.bubble_hua span.buddy, .colored_hua { color: #6c543e! important; }\
	.bubble_frieda span.buddy, .colored_frieda { color: #204563! important; }\
	.bubble_roland span.buddy, .colored_roland { color: #dc3d8d! important; }\
	.bubble_paola span.buddy, .colored_paola { color: #792b70! important; }\
	.bubble_jin_su span.buddy, .colored_jin_su { color: #a41834! important; }\
	.bubble_chao span.buddy, .colored_chao { color: #5457b0! important; }\
	.bubble_derek span.buddy, .colored_derek { color: #5457b0! important; }\
	.bubble_finola span.buddy, .colored_finola { color: #35adbc! important; }\
	.bubble_andie span.buddy, .colored_andie { color: #35adbc! important; }\
	.bubble_kuan_ti span.buddy, .colored_kuan_ti { color: #e89413! important; }\
	.bubble_ian span.buddy, .colored_ian { color: #647c27! important; }\
	.bubble_eleesha span.buddy, .colored_eleesha { color: #dca312! important; }\
	.bubble_terrence span.buddy, .colored_terrence { color: #55141c! important; }\
	.bubble_janice span.buddy, .colored_janice { color: #df2b4e! important; }\
	.bubble_raluca span.buddy, .colored_raluca { color: #4c4e4c! important; }\
	.bubble_chun span.buddy, .colored_chun { color: #3aa669! important; }\
	.bubble_gioele span.buddy, .colored_gioele { color: #cb5b29! important; }\
	.bubble .replybuttons { text-shadow: none! important; }\
	.bubble ::-moz-selection {\
		text-shadow: none! important;\
		background: #38F;\
		color: #fff;\
	}\
	.bubble ::-webkit-selection {\
		text-shadow: none! important;\
		background: #38F;\
		color: #fff;\
	}\
	.bubble ::selection {\
		text-shadow: none! important;\
		background: #38F;\
		color: #fff;\
	}\
	.planet .analyse .buttons .share-planet.but{\
		width:20px;\
	}\
	").appendTo("head");
};