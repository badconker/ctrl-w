Main.k.Game.init = function() {
    var ctrlw_game = localStorage.getItem("ctrlw_game");
    if (ctrlw_game == null){
        return;
    }
    Main.k.Game.data = JSON.parse(ctrlw_game);
};