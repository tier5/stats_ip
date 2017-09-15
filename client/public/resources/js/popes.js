$(document).ready(function(){
    popesInit();
});

function popesInit() {
    $("body").append('<div class="popes-wrap"></div><div class="popes"><div class="popes-inner"></div></div>');  
    $(".popes").click(function(e) {
        event.preventDefault();
    });   
    popesInitEvents();
}

function popesClose() {
    var div = $(".popes-inner").data("popid");
    $("#"+div).slideUp('slow', function() {
        $("#"+div).appendTo($("a[data-popid="+div+"]").parent());        
    });
    $(".popes").slideUp('slow');
    $(".popes-wrap").fadeOut(500);
    $("body").off();
}

function popesOpen(div) {
    $("#"+div).appendTo(".popes-inner").show();
    $(".popes-inner").data("popid", div);
    $(".popes-wrap").fadeIn(200);
    $(".popes").slideDown('slow', function(){
        $(document).keyup(function(e) {
            if (e.which === 27) {
                popesClose();
            }
        });
    });
    $("body, html").animate({'scrollTop': 0}, 'slow');
}

function popesInitEvents() {
    $(document).off('click.popes-open');
    $(document).on('click.popes-open', ".popes-open", function() {
        popesOpen($(this).data("popid"));
    });

    $(document).off('click.popes-close');
    $(document).on('click.popes-close', ".popes-close", function() {
        popesClose();
    });   
    $(document).on('click.popes-close', ".popes-wrap", function() {
        popesClose();
    });    
}