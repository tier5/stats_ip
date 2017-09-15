function seh() {
    $(".seh").off("click");
    $(".seh").click(function () {
        $(this).toggleClass('clicked');
        var seh_div = $(this).attr("data-seh");
        $(".hes").each(function () {
            if ($(this).attr("id") != seh_div)
                $(this).slideUp(300);
        });
        var btn = $(this);
        $("#" + seh_div).slideToggle(300, function () {
                if ($(this).is(':visible')) {
                    $(this).css('display', 'inline-block');
                } else if (btn.hasClass("seh-focus")) {
                    var div = btn.data("seh");
                    var focus = btn.data("seh-focus");
                    $("body,html").animate({scrollTop: ($("#" + focus).offset().top - 100 ) + "px"}, 'slow');
                }
            }
        );
    });
}

function seh2() {
    $(".seh2").off("click");
    $(".seh2").click(function () {
        $(this).toggleClass('clicked');
        var seh_div = $(this).attr("data-seh");
        $(".hes2").each(function () {
            if ($(this).attr("id") != seh_div)
                $(this).slideUp(300);
        });
        var btn = $(this);
        $("#" + seh_div).slideToggle(300, function () {
                if ($(this).is(':visible')) {
                    $(this).css('display', 'inline-block');
                } else if (btn.hasClass("seh-focus")) {
                    var div = btn.data("seh");
                    var focus = btn.data("seh-focus");
                    $("body,html").animate({scrollTop: ($("#" + focus).offset().top - 100 ) + "px"}, 'slow');
                }
            }
        );
    });
}

function sehmenu() {
    $(".sehmenu").off("click");
    $(".sehmenu").click(function () {
        var seh_div = $(this).attr("data-seh");
        $(".hesmenu").each(function () {
            if ($(this).attr("id") != seh_div)
                $(this).slideUp(300);
        });
        var btn = $(this);
        $("#" + seh_div).slideToggle(300, function () {
                if ($(this).is(':visible')) {
                    $(this).css('display', 'inline-block');
                } else if (btn.hasClass("seh-focus")) {
                    var div = btn.data("seh");
                    var focus = btn.data("seh-focus");
                    $("body,html").animate({scrollTop: ($("#" + focus).offset().top - 100 ) + "px"}, 'slow');
                }
            }
        );
    });
}

$(document).ready(function () {
    seh();
    seh2();
    sehmenu();
});