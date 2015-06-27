Main.k.Options.updateOpt = function(key, val) {
    switch(key) {
        case "custombubbles":
        case "cbubbles":
            Main.k.Options.cbubbles = (val == "y");
            Main.k.Options.options[0][1] = (val == "y");
            break;
        case "custombubbles_nobackground":
        case "cbubblesNB":
            Main.k.Options.cbubblesNB = (val == "y");
            Main.k.Options.options[1][1] = (val == "y");
            break;
        case "displaylogo":
        case "dlogo":
            Main.k.Options.dlogo = (val == "y");
            Main.k.Options.options[2][1] = (val == "y");
            break;
        case "splitpjt":
            Main.k.Options.splitpjt = (val == "y");
            Main.k.Options.options[3][1] = (val == "y");
            break;
        //case "altpa":
        //	Main.k.Options.altpa = (val == "y");
        //	Main.k.Options.options[4][1] = (val == "y");
        //	break;
    }
};