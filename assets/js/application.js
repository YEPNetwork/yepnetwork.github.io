!function ($) {

  $(function(){

    // social popups
    $('.social-icons .social-icon.facebook a').each(function() {
      var share_url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(social_page_url);
      $(this).attr('href', share_url);
      $(this).openWindow();
    });
    $('.social-icons .social-icon.twitter a').each(function() {
      var base_url = 'https://twitter.com/intent/tweet?';
      var via = 'YEPnetworks';
      var share_url = base_url + 'text=' + twitter_text + '&url=' + encodeURIComponent(social_page_url) + '&via=' + via;
      $(this).attr('href', share_url);
      $(this).openWindow();
    });
    $('.social-icons .social-icon.google-plus a').each(function() {
      var base_url = 'https://plus.google.com/share?';
      var share_url = base_url + 'url=' + encodeURIComponent(social_page_url);
      $(this).attr('href', share_url);
      $(this).openWindow();
    });

    $('.ellipsize').expander({
      slicePoint: 220,
      expandText: 'Read more...',
      expandEffect: 'show',
      expandSpeed: 0,
      collapseEffect: 'hide',
      collapseSpeed: 0,
      userCollapseText: 'Read less...'
    });

    $('.ellipsize-sm').expander({
      slicePoint: 200,
      expandText: 'Expand',
      expandEffect: 'show',
      expandSpeed: 0,
      afterExpand: function() {
        $('.read-less a',this).addClass('btn btn-lg btn-expander open').html('Collapse <span class="glyphicon glyphicon-minus"></span>');
      },
      collapseEffect: 'hide',
      collapseSpeed: 0,
      userCollapseText: 'Collapse',
      afterCollapse: function() {
        $('.read-more a',this).addClass('btn btn-lg btn-expander closed').html('Expand <span class="glyphicon glyphicon-plus"></span>');
      },
      onSlice: function() {
        setTimeout(function(){
          $('.ellipsize-sm .read-more a').addClass('btn btn-lg btn-expander closed').html('Expand <span class="glyphicon glyphicon-plus"></span>');
        }, 1000);
      }
    });

    // request circle modal
    // initial hide locations
    if ($('#circleCountry').val() == "US") {
      $('#circleStateGroup').show(); $('#circleProvinceGroup, #circleProvinceGroup').hide(); $('#circleProvince').val(''); $('#circleRegion').val('');
    } else if ($('#circleCountry').val() == "CA") {
      $('#circleProvinceGroup').show(); $('#circleRegionState, #circleStateGroup').hide(); $('#circleState').val(''); $('#circleRegion').val('');
    } else {
      $('#circleRegionGroup').show(); $('#circleStateGroup, #circleProvinceGroup').hide(); $('#circleState').val(''); $('#circleProvince').val('');
    }

    //show/hide location inputs on click
    $('#circleCountry').on('change',function(e){
      e.preventDefault();
      if ($(this).val() == "US") {
        $('#circleStateGroup').show(); $('#circleProvinceGroup, #circleRegionGroup').hide(); $('#circleProvince').val(''); $('#circleRegion').val('');
      } else if ($(this).val() == "CA") {
        $('#circleProvinceGroup, #circleStateGroup').show(); $('#circleStateGroup, #circleRegionGroup').hide(); $('#circleState').val(''); $('#circleRegion').val('');
      } else {
        $('#circleRegionGroup').show();
        $('#circleProvinceGroup, #circleStateGroup').hide(); $('#circleState').val(''); $('#circleProvince').val('');
      }
      return false;
    });

    // event js
    // initially hide location inputs
    if ($('#selCountry').val() == "United States") {
      $('#selState, #lblState').show();
      $('#selProvince, #lblProvince').hide();
      $('#selProvince').val('');
      $('#region, #lblRegion').hide();
      $('#region').val('');
    } else if ($('#selCountry').val() == "Canada") {
      $('#selProvince, #lblProvince').show();
      $('#selState, #lblState').hide();
      $('#selState').val('');
      $('#region, #lblRegion').hide();
      $('#region').val('');
    } else {
      $('#region, #lblRegion').show();
      $('#selProvince, #lblProvince').hide();
      $('#selState, #lblState').hide();
      $('#selState').val('');
      $('#selProvince').val('');
    }

    //show hide location inputs
    $('#selCountry').on('change',function(e){
      e.preventDefault();
      if ($(this).val() == "United States") {
        $('#selState, #lblState').show();
        $('#selProvince, #lblProvince').hide();
        $('#selProvince').val('');
        $('#region, #lblRegion').hide();
        $('#region').val('');
      } else if ($(this).val() == "Canada") {
        $('#selProvince, #lblProvince').show();
        $('#selState, #lblState').hide();
        $('#selState').val('');
        $('#region, #lblRegion').hide();
        $('#region').val('');
      } else {
        $('#region, #lblRegion').show();
        $('#selProvince, #lblProvince').hide();
        $('#selState, #lblState').hide();
        $('#selState').val('');
        $('#selProvince').val('');
      }
      return false;
    });


      if ($('body').hasClass('event-notifications')) {
        $(function(){
          var ensGeocoder = new google.maps.Geocoder();
          $("#ensLocation").keypress(function(e){
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13' || keycode == '9') {
              e.preventDefault();
              e.stopPropagation();
            }
          });
          $("#ensLocation").autocomplete({
            autoFocus: false,
            source: function(request, response) {
              //console.log(request);
              //ensGeocoder.geocode( {'address': request.term, "componentRestrictions":{"administrativeArea":"California","country":"US",} }, function(results, status) {
              ensGeocoder.geocode( {'address': request.term }, function(results, status) {
                response($.map(results, function(item) {
                  // console.log(item);
                  return {
                    label: item.formatted_address,
                    value: item.formatted_address,
                    latitude: item.geometry.location.lat(),
                    longitude: item.geometry.location.lng(),
                    arrAddress: item.address_components
                  }
                })
              );
              })
            },
            select: function(event, ui) {

              var lat =                  $('#ensLat'),
                  lng =                  $('#ensLng'),
                  streetNumber =         $('#ensStreetNumber'),
                  streetRoute =          $('#ensStreetRoute'),
                  country =              $('#ensCountry'),
                  cityTown =             $('#ensCityTown'),
                  stateProvinceRegion =  $('#ensStateProvinceRegion'),
                  county =               $('#ensCounty'),
                  postcode =             $('#ensPostcode'),
                  formattedAddress =     $('#ensFormattedAddress')

              //reset fields if the autocomplete already run
              lat.val('');lng.val('');streetNumber.val('');streetRoute.val('');country.val('');cityTown.val('');stateProvinceRegion.val('');county.val('');postcode.val('');formattedAddress.val('');

              lat.val(ui.item.latitude);
              lng.val(ui.item.longitude);
              formattedAddress.val(ui.item.value);

              $.each(ui.item.arrAddress, function(i, address_component){
                // console.log(address_component);
                // console.log(address_component.types[0]);
                //TODO: should we consider
                //neighborhood, natural_feature, airport, park

                if (address_component.types[0] == "street_number"){ // street number
                  streetNumber.val(address_component.long_name);
                }
                if (address_component.types[0] == "route"){ // street name
                  streetRoute.val(address_component.long_name);
                }
                if (address_component.types[0] == "country"){ // country
                  country.val(address_component.long_name);
                }
                if (address_component.types[0] == "locality"){ // city/town
                  cityTown.val(address_component.long_name);
                }
                if (address_component.types[0] == "administrative_area_level_1"){ // state/province/provincia/region
                  stateProvinceRegion.val(address_component.long_name);
                }
                if (address_component.types[0] == "administrative_area_level_2"){ // county
                  county.val(address_component.long_name);
                }
                if (address_component.types[0] == "postal_code"){ // postcode/postal code/zip code
                  postcode.val(address_component.long_name);
                }
              });
            },
            change: function(event, ui) {
              if (!ui.item) {
                $(this).val('');
                $('#ensLat').val('');
                $('#ensLng').val('');
                $('#ensCityTown').val('');
                $('#ensStateProvinceRegion').val('');
                $('#ensCounty').val('');
                $('#ensPostcode').val('');
                $('#ensStreetNumber').val('');
                $('#ensStreetRoute').val('');
                $('#ensFormattedAddress').val('');
              }
            }
          });
        });
      } //.event-notifications
      $('body').popover({ selector: '[data-toggle=popover]' });
  });

}(window.jQuery)


///////////////////////////
//Youtube video tracking //
///////////////////////////

//load asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var queue1,
    queue2;


function onYouTubeIframeAPIReady() {

  player1 = new YT.Player('player1', {
    width: '560',
    height: '341',
    videoId: 'T3B9s9pOIrc',
    events: {
      'onReady': onPlayer1Ready,
      'onStateChange': onPlayer1StateChange
    }
  });

  player2 = new YT.Player('player2', {
    width: '396',
    height: '223',
    videoId: 'NzplhYY4XIc',
    events: {
      'onReady': onPlayer2Ready,
      'onStateChange': onPlayer2StateChange
    }
  });

}

//The API will call this function when the video player is ready.
function onPlayer1Ready(e) {}

function onPlayer2Ready(e) {}

// The API calls this function when the player's state changes.

function onPlayer1StateChange(event) {
  if (event.data == 1) {
    mixpanel.track('ATD Video Played', {'Video Type' : 'You Tube'});
  }
  if (event.data == 0) {
    mixpanel.track('ATD Video Finished', {'Video Type' : 'You Tube'});
  }
  if (event.data == 2 ) {
    if (!queue1) {

      // queue2 track for 2 seconds to avoid repleated calls when video pause is scrubbed
      queue1 = setTimeout(function() {
        var duration = player1.getDuration(),
          currTime = player1.getCurrentTime(),
          percent = currTime/duration;

        mixpanel.track('ATD Video Paused', {'Video Type' : 'You Tube', 'Progress' : percent });
        queue1 = null;
      }, 2000);
    }
  }
}

function onPlayer2StateChange(event) {
  if (event.data == 1) {
    mixpanel.track('Testimonials Video Played', {'Video Type' : 'You Tube'});
  }
  if (event.data == 0) {
    mixpanel.track('Testimonials Video Finished', {'Video Type' : 'You Tube'});
  }
  if (event.data == 2 ) {
    if (!queue2) {

      // queue2 track for 2 seconds to avoid repleated calls when video pause is scrubbed
      queue2 = setTimeout(function() {
        var duration = player2.getDuration(),
          currTime = player2.getCurrentTime(),
          percent = currTime/duration;

        mixpanel.track('Testimonials Video Paused', {'Video Type' : 'You Tube', 'Progress' : percent });
        queue2 = null;
      }, 2000);
    }
  }
}

// find modals with data-theVideo tag and add auto-play video
function autoPlayYouTubeModal() {
  var trigger = $("body").find('[data-toggle="modal"]');
  trigger.click(function () {
    var theModal = $(this).data("target"),
    videoSRC = $(this).attr("data-theVideo"),
    videoSRCauto = videoSRC + "?autoplay=1&showinfo=0";

    $(theModal + ' iframe').attr('src', videoSRCauto);
    $(theModal).on('hide.bs.modal', function (){
      $(theModal + ' iframe').attr('src', videoSRC);
    });
  });
}
//init
autoPlayYouTubeModal();



function equalizer() {
  var row=$('.equalize');
  $.each(row, function() {
    var maxh=0;
    $.each($(this).find('div[class^="col-"]'), function() {
      if ( $(this).height() > maxh)
      maxh=$(this).height();
    });
    $.each($(this).find('div[class^="col-"]'), function() {
      $(this).height(maxh);
    });
  });
}

//init column eqalizer
equalizer();
