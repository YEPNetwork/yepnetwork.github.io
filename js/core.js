(function($) {
  $(document).ready(function() {
    // Show upcoming events by default.
    // @see https://getbootstrap.com/docs/3.3/javascript/#tabs.
    // @see https://stackoverflow.com/a/40142438/871793.
    //$('#eventsTab a[href="#upcoming"]').tab('show') // Select tab by name

    // Events landing page.
    if ($("body").hasClass("events")) {
      len1 = $('.tab-content #menu1 .event-item').length;
      len2 = $('.tab-content #menu2 .event-item').length;

      if (len1 > 0) {
        $('.nav-tabs > li:first > a').append(' (' + len1 + ')');
        $('.nav-tabs > li:last > a').append(' (' + len2 + ')');
      }
    }
  });
})(jQuery);

