Main.k.Game.updateDayAndCycle = function(day,cycle) {
    if(day != this.data.day || cycle != this.data.cycle){
        this.data.day = day;
        this.data.cycle = cycle;
        Main.k.onCycleChange();
        this.updatePlayerInfos();
        this.save();
    }
};