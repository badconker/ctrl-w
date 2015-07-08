Main.k.CreatePopup = function() {
    var popup = {};

    popup.dom = $("<td>").attr("id", "usPopup").addClass("usPopup chat_box");
    popup.mask = $("<div>").addClass("usPopupMask").attr('onclick','Main.k.ClosePopup();').appendTo(popup.dom);
    popup.content = $("<div>").addClass("usPopupContent chattext").css({
        "width": (Main.k.window.innerWidth - 300) + "px",
        "height": (Main.k.window.innerHeight - 100) + "px"
    }).appendTo(popup.dom);

    return popup;
};

Main.k.OpenPopup = function(popup) {
    $("body").append(popup);
};

Main.k.ClosePopup = function() {
    var popup = $("#usPopup");
    if (!popup.get()) return;

    popup.remove();
    var tgt = $("#formattingpopuptgt");
    if (tgt.get()) {
        tgt.focus();
        tgt.attr("id", "");
    }
};
exportFunction(Main.k.ClosePopup, unsafeWindow.Main.k, {defineAs: "ClosePopup"});