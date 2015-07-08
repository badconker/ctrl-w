Main.k.clearCache = function(){
    Main.k.showLoading();
    Main.k.Game.clear();
    localStorage.removeItem('ctrlw_update_cache');
    localStorage.removeItem('ctrlw_remaining_cycles');
    window.location.reload();
};