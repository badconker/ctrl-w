Main.k.tabs.playerProfile = function() {

    /** Only on connected player profile page **/
    if($("#experience.cdTabTgt").length > 0){

        // Fix Experience
        $(".charboostbg ul.slots").css("display", "none");
        $("ul.boost li.charboost").css("height", "200px");

        // Fix menu
        $("#accountmenu").find("a").each(function() {
            $(this).on("click", function() {
                var r = /\?([a-z]+)$/;
                if (r.test(this.href)) {
                    $('.cdTabTgt').hide();
                    $("#" + r.exec(this.href)[1]).show();
                    var sel = $("#" + r.exec(this.href)[1] + "tab");
                    sel.addClass('active');
                    sel.siblings().removeClass('active');
                } else {
                    $('.cdTabTgt').hide();
                    $("#experience").show();
                    var $experiencetab = $("#experiencetab");
                    $experiencetab.addClass('active');
                    $experiencetab.siblings().removeClass('active');
                }
                return false;
            })
        });

        // Autoselect tab
        var url = Main.k.window.location;
        var r = /\?([a-z]+)$/;
        if (r.test(url)) {
            $('.cdTabTgt').hide();
            $("#" + r.exec(url)[1]).show();
            var sel = $("#" + r.exec(url)[1] + "tab");
            sel.addClass('active');
            sel.siblings().removeClass('active');
        }
    }

    /** For all profile pages **/
    /**** MY FILE ****/
    $('.cdTripEntry td .char').css('margin','5px 0');
    $('.cdTripEntry').each(function(){
        $(this).find('td').eq(-2).css('width','71px');
    });
    $('.cdTripEntry .new').remove();
    $('.cdTripPrevious').on('click',function(){
        if($('.cdTripPage').text() > 1){
            $('.cdTripPrevious').show();
        }
    });

};