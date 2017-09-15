
(function($) {
    $.fn.niceSelectEvents = function() {

        // Unbind existing events in case that the plugin has been initialized before
        $(document).off('.nice_select');


        $(document).on('click.nice_select', '.nice-select input.current', function(event) {
            event.stopPropagation();
        });

        // Open/close
        $(document).on('click.nice_select', '.nice-select', function(event) {
            var $dropdown = $(this);

            $('.nice-select').not($dropdown).removeClass('open');
            $dropdown.toggleClass('open');

            if ($dropdown.hasClass('open')) {
                $dropdown.find('.option');
                $dropdown.find('.focus').removeClass('focus');
                $dropdown.find('.selected').addClass('focus');
            } else {
                $dropdown.focus();
            }
        });

        // Close when clicking outside
        $(document).on('click.nice_select', function(event) {
            if ($(event.target).closest('.nice-select').length === 0) {
                $('.nice-select').removeClass('open').find('.option');
            }
        });

        // Keyboard events
        $(document).on('keydown.nice_select', '.nice-select', function(event) {
            var $dropdown = $(this);
            var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));

            // Enter
            if (event.keyCode == 13) {
                if ($dropdown.hasClass('open')) {
                    $focused_option.trigger('click');
                } else {
                    $dropdown.trigger('click');
                }
                return false;
                // Down
            } else if (event.keyCode == 40) {
                if (!$dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                } else {
                    var $next = $focused_option.nextAll('.option:not(.disabled)').first();
                    if ($next.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $next.addClass('focus');
                    }
                }
                return false;
                // Up
            } else if (event.keyCode == 38) {
                if (!$dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                } else {
                    var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
                    if ($prev.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $prev.addClass('focus');
                    }
                }
                return false;
                // Esc
            } else if (event.keyCode == 27) {
                if ($dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                }
                // Tab
            } else if (event.keyCode == 9) {
                if ($dropdown.hasClass('open')) {
                    return false;
                }
            }
        });
    }
})(jQuery);

jQuery(document).niceSelectEvents();
