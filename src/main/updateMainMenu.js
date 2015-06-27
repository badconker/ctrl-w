Main.k.updateMainMenu = function (){
    var casting = $('#ctrlw-main-menu-castings');

    // ************ CASTING SUBMENU ************
    var casting_ss = casting.find(' > ul');
    if(casting_ss.length > 0){
        casting_ss.remove();
    }
    casting_ss = $("<ul>").appendTo(casting);

    var castings = Main.k.Game.data.castings;

    if(!$.isEmptyObject(castings)) {	// Check having casting
        var casting_menu, cast_ss;
        $.each(castings,function(id, casting){
            casting_menu = $("<li></li>")
                .appendTo(casting_ss);

            var a = $("<a class='kssmenuel' href='"+Main.k.mushurl+"/group/"+casting.id+"'><img src='"+casting.icon+"' />"+casting.short_name+"</a>")
                .appendTo(casting_menu);

            if(casting.long_name != casting.short_name){
                a
                    .attr("_title", Main.k.text.gettext("Nom complet"))
                    .attr("_desc", "<strong>"+casting.long_name+"</strong>")
                    .on("mouseover", Main.k.CustomTip)
                    .on("mouseout", Main.k.hideTip)
            }

            cast_ss = $("<ul>").appendTo(casting_menu);
            $("<li><a href='"+Main.k.mushurl+"/group/page/"+casting.id+"'><img src='" + Main.k.mushurl + "/img/icons/skills/conceptor.png' />"+Main.k.text.gettext("Mémoire")+"</a></li>").appendTo(cast_ss); // Pages
            $("<li><a href='"+Main.k.mushurl+"/group/nexus/"+casting.id+"'><img src='" + Main.k.mushurl + "/img/icons/skills/logistics.png' />"+Main.k.text.gettext("Nexus")+"</a></li>").appendTo(cast_ss); // Nexus
            $("<li><a href='"+Main.k.mushurl+"/group/forum/"+casting.id+"'><img src='" + Main.k.servurl + "/img/radioh.png' />"+Main.k.text.gettext("Forum")+"</a></li>").appendTo(cast_ss); // Forum
            $("<li><a href='"+Main.k.mushurl+"/group/members/"+casting.id+"'><img src='" + Main.k.mushurl + "/img/icons/skills/optimistic.png' />"+Main.k.text.gettext("Membres")+"</a></li>").appendTo(cast_ss); // Members
            $("<li><a href='"+Main.k.mushurl+"/group/history/"+casting.id+"'><img src='" + Main.k.mushurl + "/img/icons/skills/hunt.png' />"+Main.k.text.gettext("Historique")+"</a></li>").appendTo(cast_ss); // History
        });
        $("<li style='height:2px'>&nbsp</li>").appendTo(casting_ss);
    }
    $("<li><a href='http://mtrg.kubegb.fr/' class='kssmenuel ext' title='Mush Triumph Remap Generator'><img src='"+Main.k.mushurl+"/img/icons/ui/triumph.png' />MTRG</a></li>").appendTo(casting_ss); // Mush Triumph Remap Generator
    // ************ NEW: CASTING SUBMENU ************
};