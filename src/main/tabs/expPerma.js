Main.k.tabs.expPerma = function() {
    if (Main.k.Options.cbubbles) {
        Main.k.css.bubbles();

        $("div.exploreevent p").each(function() {
            var heroes = [];
            var heroes_replace = [];
            $("ul.adventurers .char").each(function() {
                var hero = Main.k.GetHeroNameFromTopic($(this).parent());
                var herof = hero.replace("_", " ").capitalize();
                heroes_replace.push('<span class="colored_' + hero + '"><img src="/img/icons/ui/' + hero.replace("_", "") + '.png" /> ' + herof + '</span>');
                heroes.push(herof);
            });

            var html = $(this).html();
            for (var i=0; i<heroes.length; i++) {
                var regex = new RegExp(heroes[i],'g');
                html = html.replace(regex, heroes_replace[i]);
            }
            $(this).html(html);
        })
    }
};