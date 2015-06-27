Main.k.displayMainMenu = function() {
    Main.k.css.customMenu();

    // Fix position
    var fix = $("ul.mtabs").length > 0 ? 70 : 20;
    $("#maincontainer, .boxcontainer").css("margin", fix + "px auto 0");

    Main.k.ownHero = ($(".hero h1.who").length > 0 ) ? $(".who").html().toLowerCase().trim().replace(/(\s)/g, "_") : false;
    Main.k.silver = true; //TODO
    Main.k.fds = ($("a.butmini[href='/fds']").length > 0);
    var menu = $("<ul>").addClass("kmenu").insertBefore("#maincontainer, .boxcontainer");
    var play = $("<li class='kmenuel active first'><a href='"+Main.k.mushurl+"/chooseHero'>"+Main.k.text.gettext("Jouer")+"</a></li>").appendTo(menu);
    var account = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/me'>"+Main.k.text.gettext("Mon compte")+"</a></li>").appendTo(menu);

    if(Main.k.text.gettext("ForumCastingsId") != "ForumCastingsId") {
        var casting = $("<li class='kmenuel' id='ctrlw-main-menu-castings'><a href='"+Main.k.mushurl+"/group/list'>"+Main.k.text.gettext("Castings")+"</a></li>").appendTo(menu);

    }
    var rankings = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/ranking'>"+Main.k.text.gettext("Classements")+"</a></li>").appendTo(menu);
    var forum = $("<li class='kmenuel'><a href='"+Main.k.mushurl+"/tid/forum'>"+Main.k.text.gettext("Forum")+"</a></li>").appendTo(menu);
    var help = $("<li class='kmenuel last'><a href='"+Main.k.mushurl+"/help'>"+Main.k.text.gettext("Aide")+"</a></li>").appendTo(menu);


    var account_ss = $("<ul>").attr("id", "accountmenu").appendTo(account);
    $("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/me'><img src='/build/img/icons/skills/persistent.png' />"+Main.k.text.gettext("Expérience")+"</a></li>").appendTo(account_ss);
    $("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/me?profile'><img src='/build/img/icons/skills/opportunist.png' />"+Main.k.text.gettext("Ma fiche")+"</a></li>").appendTo(account_ss);
    $("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/me?config'><img src='/build/img/icons/skills/engineer.png' />"+Main.k.text.gettext("Mes réglages")+"</a></li>").appendTo(account_ss);
    $("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/me?news'><img src='/build/img/icons/skills/radio_expert.png' />"+Main.k.text.gettext("News")+"</a></li>").appendTo(account_ss);

    var rankings_ss = $("<ul>").appendTo(rankings);
    $("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/ranking'><img src='/build/img/icons/skills/persistent.png' />"+Main.k.text.gettext("Classements")+"</a></li>").appendTo(rankings_ss);
    $("<li><a class='kssmenuel ext' href='http://twinorank.kubegb.fr/jeux/Mush' target='_blank'><img src='/build/img/icons/skills/persistent.png' />Twin-O-Rank</a></li>").appendTo(rankings_ss);

    var forum_ss = $("<ul>").appendTo(forum);
    if(Main.k.text.gettext("ForumDiscussionId") != "ForumDiscussionId") {
        /* Translators: Forum Discussion id */
        $("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumDiscussionId")+
            /* Translators: Forum Discussion label */
        "'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Discussion")+"</a></li>").appendTo(forum_ss);
    }
    if(Main.k.text.gettext("ForumAdviceId") != "ForumAdviceId") {
        /* Translators: Forum Advice id */
        $("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumAdviceId")+
            /* Translators: Forum Advice label */
        "'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Entraide")+"</a></li>").appendTo(forum_ss);
    }
    if(Main.k.text.gettext("ForumLoungeId") != "ForumLoungeId") {
        /* Translators: Forum Lounge id */
        $("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumLoungeId")+
            /* Translators: Forum Lounge label */
        "'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Détente")+"</a></li>").appendTo(forum_ss);
    }
    if(Main.k.text.gettext("ForumCastingsId") != "ForumCastingsId") {
        /* Translators: Forum Castings id */
        $("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumCastingsId")+
            /* Translators: Forum Castings label */
        "'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Castings")+"</a></li>").appendTo(forum_ss);
    }
    if(Main.k.text.gettext("ForumOfficersId") != "ForumOfficersId") {
        /* Translators: Forum Officers id */
        $("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumOfficersId")+"'><img src='/build/img/icons/skills/rebel.png' />"+Main.k.text.gettext("Officiers")+"</a></li>").appendTo(forum_ss);
    }

    var help_ss = $("<ul>").appendTo(help);
    $("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/help'><img src='/build/img/icons/skills/genius.png' />"+Main.k.text.gettext("Aide Mush")+"</a></li>").appendTo(help_ss);
    $("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/patchlog'><img src='/build/img/icons/skills/persistent.png' />"+Main.k.text.gettext("Patchlog")+"</a></li>").appendTo(help_ss);

    if (Main.k.ownHero && typeof(Main.k.h[Main.k.ownHero]) != 'undefined') {
        var charname = Main.k.ownHero.replace("_", "");
        $("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumAdviceId")+"|thread/" + Main.k.h[Main.k.ownHero].tutorial + "'><img src='/img/icons/ui/" + charname + ".png' />" + Main.k.text.strargs(Main.k.text.gettext("Tuto %1"), [Main.k.ownHero.capitalize()]) + "</a></li>").appendTo(help_ss);
    }
    /* Translators: Wiki url */
    $("<li><a class='kssmenuel ext' target='_blank' href='"+Main.k.text.gettext("http://www.twinpedia.com/mush")+
        /* Translators: Wiki favicon url */
    "'><img data-async_src='"+Main.k.text.gettext("http://www.twinpedia.com/_media/favicon.ico")+"' />"+Main.k.text.gettext("Twinpedia")+"</a></li>").appendTo(help_ss);
    $("<li><a class='kssmenuel ext' href='http://pictoid.fr/mush/picto' target='_blank'><img data-async_src='http://pictoid.fr/favicon.png' />Pictoid</a></li>").appendTo(help_ss);

    if (Main.k.fds) {
        $("<li><a class='kssmenuel ext' href='"+Main.k.mushurl+"/tid/forum#!view/"+Main.k.text.gettext("ForumFDSId")+"'><img src='/build/img/icons/skills/juge.png' />"+Main.k.text.gettext("Magistrature")+"</a></li>").appendTo(forum_ss);

        $("<li><a class='kssmenuel' href='"+Main.k.mushurl+"/fds'><img src='/build/img/icons/skills/juge.png' />FDS</a></li>").appendTo(play_ss);
    }
    Main.k.updateMainMenu();
};