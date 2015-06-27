Main.k.init = function(){

    Main.k.initLang();
    Main.k.Options.init();
    Main.k.Game.init();
    Main.k.initData();
    Main.k.displayMainMenu();
    //Integration with others scripts
    $( window ).load(function() {

        //For scripts which use load event
        $('img[data-async_src]').each(function(){
            $(this).attr('src',$(this).attr('data-async_src'));
            $(this).removeAttr('data-async_src');
        });

    });
};

Main.k.getFullName = function(dev_surname) {
    return dev_surname.replace(/_/g, " ").capitalize();
};
Main.k.getHeroBySurname = function(dev_surname) {
    console.info('Main.heroes',Main.heroes);
    var $it = Main.heroes.iterator();
    while ($it.hasNext()) {
        var hero = $it.next();
        console.log(dev_surname,hero.dev_surname);
        if (hero.dev_surname == dev_surname) return hero;
    }
    return null;
};