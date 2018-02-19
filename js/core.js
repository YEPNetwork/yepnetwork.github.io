(function($) {
  $(document).ready(function() {
    // Show upcoming events by default.
    // @see https://getbootstrap.com/docs/3.3/javascript/#tabs.
    // @see https://stackoverflow.com/a/40142438/871793.

    // Events landing page.
    if ($("body").hasClass("events")) {
      len1 = $('.tab-content #menu1 .event-item').length;
      len2 = $('.tab-content #menu2 .event-item').length;

      if (len1 > 0) {
        $('.nav-tabs > li:first > a').append(' (' + len1 + ')');
        $('.nav-tabs > li:last > a').append(' (' + len2 + ')');
      } else {
        // Setting timeout just for kicks; may not be necessary.
        setTimeout(
          function() {
            $('.nav-tabs > li > a[href="#menu2"]').tab("show");
            $('.nav-tabs > li:first > a').attr("disabled", true);
          },
        5);
      }
    }
  });
})(jQuery);

