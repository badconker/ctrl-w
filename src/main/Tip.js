Main.k.CustomTip = function(e) {
    var tgt = (e || event).target;
    var title = tgt.getAttribute("_title");
    var desc = tgt.getAttribute("_desc");
    if (desc) desc = desc.replace(/(\\r|\\n)/g, "");
    var max = 3, current = 0, t = tgt;
    while (!title && !desc && current<max) {
        t = t.parentNode;
        title = t.getAttribute("_title");
        desc = t.getAttribute("_desc");
        if (desc) desc = desc.replace(/(\\r|\\n)/g, "");
        current++;
    }

    Main.showTip(tgt,
        "<div class='tiptop' ><div class='tipbottom'><div class='tipbg'><div class='tipcontent'>" +
        (title ? "<h1>" + title + "</h1>" : "") +
        (desc ? "<p>" + desc.replace("\n", "") + "</p>" : "") +
        "</div></div></div></div>"
    );
};

Main.k.hideTip = function(){
    Main.hideTip();
};