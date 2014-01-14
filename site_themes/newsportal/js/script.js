/* Testing only */

function getQueryString() {
  var query   = {},
      hashes  = window.location.href.slice( window.location.href.indexOf('?') + 1 ).split('&'),
      hash;

  if( window.location.href.indexOf('?') !== -1 ) {
    for( var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      query[hash[0]] = hash[1];
    }
    return query;
  }
}

// Load Fonts
function loadFonts() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
};

// Define fonts
function defineFonts(name) {
  var fonts;
  switch(name) {
    case 'gentium':
      fonts = 'Gentium+Book+Basic:400,400italic,700,700italic:latin';
      break;
    case 'lora':
      fonts = 'Lora:400,700,400italic,700italic:latin';
  }

  return fonts;
}


var queryString = getQueryString();
if( typeof queryString !== 'undefined' && typeof queryString.bodyclass !== 'undefined' ) {
  var classname = queryString.bodyclass.replace(/\|/g,' ');
  document.body.className = document.body.className + ' ' + classname;
}

/* Change Color Scheme */
if( typeof queryString !== 'undefined' && typeof queryString.skins !== 'undefined' ) {
  $('<link rel="stylesheet" type="text/css" href="skins/'+queryString.skins+'.css">').appendTo('head');
}

/* Body Font */
if( typeof queryString !== 'undefined' && typeof queryString.font_body !== 'undefined' ) {
  document.body.className = document.body.className + ' body-' + queryString.font_body;
  var fonts = defineFonts(queryString.font_body);
  WebFontConfig = {
    google: { families: [ fonts ] }
  };
  loadFonts();
}

/* Heading Font */
if( typeof queryString !== 'undefined' && typeof queryString.font_heading !== 'undefined' ) {
  document.body.className = document.body.className + ' heading-' + queryString.font_heading;
  var fonts = defineFonts(queryString.font_heading);
  WebFontConfig = {
    google: { families: [ fonts ] }
  };
  loadFonts();
}




(function($) {

/* ===================================================================
  Custom Fonts Object
=================================================================== */
window.nesia_fonts = {
  define_fonts: function(fonts) {
    WebFontConfig = {
      google: { families: fonts.split(" ") }
    };
  },
  load_fonts: function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  }
}


/* ===================================================================
  Initiate pinterest=like layout
=================================================================== */
function initGrid() {
  var gridContainer = $('.post-grid'),
      gridItem = $('.entry-post', gridContainer),
      options = {
        autoResize: true,
        container: gridContainer,
        offset: 30
      };

      /* Options for IE9 and lower only */
      if( $('html').hasClass('lt-ie9') ) {
        options = {
          autoResize: true,
          offset: 20,
          container: gridContainer,
          itemWidth: 300
        }
      }

  window.wookmarkOpts = options;
  gridItem.wookmark(options);

  /* Fix item grid when window resized */
  $(window).bind('load resize', function(){
    var windowWidth = $(this).width();

    // For Large Monitor
    if( windowWidth >= 1200 ) {
      options = {
        autoResize: true,
        offset: 30,
        container: gridContainer,
        itemWidth: 270
      }
    } 

    // For default Desktop
    else if( windowWidth < 1200 && windowWidth > 979 ) {
      options = {
        autoResize: true,
        offset: 20,
        container: gridContainer,
        itemWidth: 300
      }
    } 

    // For Tablet portrait
    else if( windowWidth <= 979 && windowWidth >= 768 ) {
      options = {
        autoResize: true,
        offset: 20,
        container: gridContainer,
        itemWidth: 228
      }
    } 

    // For mobile Phone
    else if ( windowWidth <= 767 ) {
      options = {
        autoResize: false,
        offset: 20,
        container: gridContainer,
        itemWidth: 240
      }
    }

    // Only run this script if browser isn't IE
    if( !$('html').hasClass('lt-ie9') ) {
      gridItem.wookmark(options);
    }
  });

}
if( $('.post-grid').length > 0 ) {
  initGrid();
}


/* ===================================================================
  Headlines Slider
=================================================================== */
function headlineSlider() {
  var $slider = $('.headline-post-slider .headline-post');
  $slider.css('opacity', 0);

  // Create pager
  // ------------
  $('<nav class="headline-pager"></nav>').appendTo( $slider.parent() );
  $('<a href="#" class="nav-prev headline-nav">&lsaquo;</a>\
    <a href="#" class="nav-next headline-nav">&rsaquo;</a>').appendTo( $slider.parent() );
  
  $slider.imagesLoaded(function(){
    $slider.carouFredSel({
      circular: true,
      responsive: true,
      auto:     true,
      infinite: true,
      next: '.headline-post-wrapper .nav-next',
      prev: '.headline-post-wrapper .nav-prev',
      pagination: '.headline-pager',
      items: {
        visible: 1
      }
    }).animate({opacity: 1});
  });

}
if( $('.headline-post-slider').length > 0 ) {
  headlineSlider();
}


/* ===================================================================
  Headlines Side Tabs
=================================================================== */
function headlineSideTabs() {
  var $tabs       = $('.headline-post-tabs .headline-post'),
      $tabsItems  = $('.entry-post', $tabs),
      navStructure,
      $tabsNav,
      i;
  $tabs.css('opacity',0);

  // Lets build tabs side navigation
  // -------------------------------
  navStructure += '<div class="headline-tabs-nav span3">';
  navStructure += '<a class="headline-nav prev"><i class="icon-chevron-up"></i></a>';
  navStructure += '<ul>';
  for( i=0; i < $tabsItems.length; i++ ) {
    var $el   = $($tabsItems[i]),
        title = $('h2', $el).text(),
        thumb = $('.entry-top', $el).data('thumb');

    navStructure += '<li>';
    navStructure += '<a data-slideto="'+ i +'" href="#">';
    navStructure += '<img src="'+ thumb +'">';
    navStructure += '<h4>' + title + '</h4>';
    navStructure += '</a>';
    navStructure += '</li>';
  }
  navStructure += '</ul>';
  navStructure += '<a class="headline-nav next"><i class="icon-chevron-down"></i></a>';
  navStructure += '</div>';
  $(navStructure).insertAfter( $tabs.parent() );


  // Initiate tabs 
  // -------------
  $tabs.imagesLoaded(function(){
    $tabs.carouFredSel({
      circular: false,
      auto:     false,
      infinite: false,
      responsive: true,
      items: {
        visible: 1
      },
      scroll: {
        fx: 'fade',
        duration: 300
      }
    }).animate({opacity: 1});
  });


  // Initiate Tabs nav carousel
  // --------------------------
  $tabsNav = $('.headline-tabs-nav');
  $('ul', $tabsNav).imagesLoaded(function(){
    $(this).carouFredSel({
      circular: false,
      auto:     false,
      infinite: false,
      //responsive: true,
      direction:  'up',
      next: '.headline-tabs-nav .next',
      prev: '.headline-tabs-nav .prev',
      items: {
        minimum: 5,
        visible: 5
      },
      align: 'center'
    });
  });
  

  // Click event on tabs navigation
  // ------------------------------
  $('li a', $tabsNav).click(function(e){
    e.preventDefault();
    var $this = $(this);
    $tabs.trigger('slideTo', $this.data('slideto') );
    $this.parent().addClass('active').siblings().removeClass('active');
  });
  $('li:first', $tabsNav).addClass('active');

}
if( $('.headline-post-tabs').length > 0 ) {
  headlineSideTabs();
}


/* ===================================================================
  Headlines Post Slider variant 3
=================================================================== */
function headlineSliderFull() {
  var $slide      = $('.headline-full-slide .headline-post'),
      $slideItems = $('.entry-post', $slide),
      isScrolling = false,
      navStructure,
      $slideNav,
      i;
  $slide.css('opacity', 0);


  // Lets build slide navigation
  // -------------------------------
  navStructure += '<div class="headline-slide-nav">';
  navStructure += '<div class="headline-arrow-wrapper"><a class="headline-nav prev">&larr;</a>';
  navStructure += '<a class="headline-nav next">&rarr;</a></div>';
  navStructure += '<ul>';
  for( i=0; i < $slideItems.length; i++ ) {
    var $el   = $($slideItems[i]),
        title = $('h2', $el).text(),
        thumb = $('.entry-top img', $el).attr('src');

    navStructure += '<li>';
    navStructure += '<a data-slideto="'+ i +'" href="#">';
    navStructure += '<img src="'+ thumb +'" width="170" height="116">';
    navStructure += '</a>';
    navStructure += '</li>';
  }
  navStructure += '</ul>';
  navStructure += '</div>';
  $(navStructure).appendTo( $slide.parent() );


  // Initiate slider 
  // ---------------
  $slide.imagesLoaded(function(){
    $slide.carouFredSel({
      auto: 5000,
      infinite: false,
      responsive: true,
      items: 1,
      scroll: {
        pauseOnHover: true,
        duration    : 0,
        conditions  : function() {
          return (!isScrolling)
        },
        onBefore  : function(oldI, newI) {
          isScrolling = true;
          $(this).delay(400);

          oldI.find('.entry-container').animate({
            bottom: oldI.find('.entry-container').outerHeight() * -1
          },400, function(){
            oldI.find('.entry-top').animate({
              opacity: 0
            },400);
          });

          newI.find('.entry-container').css({
            bottom: newI.find('.entry-container').outerHeight() * -1
          });
          newI.find('.entry-top').css('opacity', 0);
        },
        onAfter  : function(oldI, newI) {

          var index = $(this).triggerHandler('currentPosition'),
              $slideNav = $('.headline-slide-nav ul');
          $slideNav.trigger('slideTo', index);
          $slideNav.find('a[data-slideto="'+index+'"]').parent().addClass('active').siblings().removeClass('active');

          newI.find('.entry-top').animate({
            opacity: 1
          },400, function(){
            newI.find('.entry-container').animate({
              bottom: 0
            },400);
            isScrolling = false;
          });

        }
      }
    }).animate({opacity: 1});
  });


  // Initiate Slide nav carousel
  // --------------------------
  $slideNav = $('.headline-slide-nav');
  $('ul', $slideNav).imagesLoaded(function(){
    $(this).carouFredSel({
      circular: false,
      auto:     false,
      infinite: false,
      //responsive: true,
      width: '100%',
      next: '.headline-slide-nav .next',
      prev: '.headline-slide-nav .prev',
      items: {
        visible: {
          min: 1,
          max: 4
        }
      },
      align: 'center'
    });
  });


  // Click event on slide navigation
  // ------------------------------
  $('li a', $slideNav).click(function(e){
    e.preventDefault();
    var $this = $(this);
    $slide.trigger('slideTo', $this.data('slideto') );
    //$this.parent().addClass('active').siblings().removeClass('active');
  });
  $('li:first', $slideNav).addClass('active');

}
if( $('.headline-full-slide').length > 0 ) {
  headlineSliderFull();
}



/* ===================================================================
  Featured Post Carousel
=================================================================== */
function featuredSlider() {
  var $slider = $('.featured-post-carousel .featured-post'),
      $sliderParent = $slider.parent(),
      sliderOptions;

  $('<nav class="nav-wrapper"></nav>').appendTo( $sliderParent );
  $('<a href="#" class="nav-prev">&larr;</a><a href="#" class="nav-next">&rarr;</a>').appendTo( $sliderParent.find('.nav-wrapper') );

  sliderOptions = {
    circular: false,
    auto:     false,
    infinite: false,
    //width:    '100%',
    responsive: true,
    next:     '.featured-post-wrapper .nav-next',
    prev:     '.featured-post-wrapper .nav-prev',
    items: {
      width: 320,
      minimum:  3,
      visible: {
        min: 1,
        max: 3
      }
    }
  };

  $slider.imagesLoaded(function(){
    if( $(window).width() <= 767 ) {
      sliderOptions.items.width = null;
      sliderOptions.items.visible = 1;
      sliderOptions.scroll = { fx: 'fade' };
      sliderOptions.responsive = true;
    }
    $(this).carouFredSel( sliderOptions );
  });

  $(window).bind('resize', function() {
    if( $(window).width() <= 767 ) {
      sliderOptions.items.width = null;
      sliderOptions.items.visible = 1;
      sliderOptions.scroll = { fx: 'fade' };
      sliderOptions.responsive = true;
      $slider.carouFredSel( sliderOptions )
    }
  });

}
if( $('.featured-post-carousel').length > 0 ) {
  featuredSlider();
}


/* ===================================================================
  Recommended Post Carousel
=================================================================== */
function recommendedSlider() {
  var $slider       = $('.recommended-post'),
      $sliderParent = $slider.parent(),
      sliderOptions = {
        circular: false,
        auto:     false,
        infinite: false,
        width:    '100%',
        align:    'left',
        next:     '.recommended-post-wrapper .nav-next',
        prev:     '.recommended-post-wrapper .nav-prev',
        items: {
          width:  300,
          minimum:  5,
          visible: {
            min:  1,
            max:  4
          }
        }
      };

  $('<nav class="nav-wrapper"></nav>').appendTo( $sliderParent );
  $('<a href="#" class="nav-prev">&larr;</a><a href="#" class="nav-next">&rarr;</a>').appendTo( $sliderParent.find('.nav-wrapper') );

  // When Window Resized
  $(window).bind('load resize', function(){
    var width = $(window).width();

    // Wide Screen
    if( width >= 1200 ) {
      sliderOptions.items.width = 270;
    // Normal Desktop
    } else if( width >= 980 ) {
      sliderOptions.items.width = 300;
    // Tablet
    } else if( width <= 979 && width >= 768) {
      sliderOptions.items.width = 230;
    // Mobile
    } else if( width <= 767 ) {
      sliderOptions.items.width = null;
      sliderOptions.items.visible = 1;
      sliderOptions.scroll = {
        fx: 'fade'
      };
      sliderOptions.responsive = true;
    }

    $slider.carouFredSel( sliderOptions );
  });

}
if( $('.recommended-post').length > 0 ) {
  recommendedSlider();
}


/* ===================================================================
  Single Post Gallery Slider
=================================================================== */
function entryGallery() {
  var $gallery      = $('.entry-top-gallery'),
      $galleryWrap  = $gallery.parent(),
      $galleryItem  = $gallery.children(),
      galleryLength = $galleryItem.length,
      galleryNav,
      oncreate,
      onscroll;
  $gallery.css('opacity', 0);

  // Give data-humber to each images
  // ------------------------------
  $galleryItem.each(function(i){
    $(this).data('number', i);
  });

  // Create navigation
  // -----------------
  galleryNav += '<nav class="entry-gallery-nav">';
  galleryNav += '<a href="#" class="nav-prev"><i class="icon-chevron-left"></i></a>';
  galleryNav += '<a href="#" class="nav-next"><i class="icon-chevron-right"></i></a>';
  galleryNav += '</nav>';
  $(galleryNav).appendTo( $galleryWrap );

  // On create callbacks
  // ------------------
  oncreate = function(items, sizes) {
    var index     = items.index()+1,
        infoText  = 'Viewing image <span>'+ index +'</span> of '+ galleryLength,
        galleryInfo = '';

    if( galleryLength > 1 ) {
      // create gallery info
      galleryInfo += '<div class="entry-gallery-info">';
      galleryInfo += '<div class="wp-caption-text">'+ infoText +'</div>';
      galleryInfo += '</div>';
      $(galleryInfo).insertAfter( $galleryWrap );
    }
  };

  // On Scroll Callback
  // ------------------
  onscroll = function(oldItems, newItems) {
    $gallery.trigger('currentPosition', function(i){
      $('.entry-gallery-info span').text( i + 1 );
    });
  };


  // Initiate gallery
  // ----------------
  $gallery.imagesLoaded(function(){
    $gallery.carouFredSel({
      infinite:   false,
      circular:   false,
      auto:       false,
      responsive: true,
      items:      1,
      onCreate:   oncreate,
      scroll:     { onBefore: onscroll },
      prev:       '.entry-gallery-nav .nav-prev',
      next:       '.entry-gallery-nav .nav-next'
    }).animate({opacity: 1});
  });
}
if( $('.entry-top-gallery').length > 0 ) {
  entryGallery();
}



/* ===================================================================
  Initiate Google Maps
=================================================================== */
function loadGmap() {

  // Load gmap script async
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.google.com/maps/api/js?sensor=false&async=2&callback=gmapInit";
  document.body.appendChild(script);

  // Google Map Callback
  window.gmapInit = function() {
    // Trigger custom event, to enable GMAP3 script
    $('body').trigger('googleload');
    
    var $gmap = $('.gmaps'),
        lat   = $gmap.data('latitude'),
        lng   = $gmap.data('longitude'),
        addr  = $gmap.data('address'),
        opts  = {
          action: 'addMarker',
          map: {
            center: true,
            zoom: 16
          }
        },
        shadow;

    // This will create shadow sorrounding the maps
    shadow = [
      '<div class="maps-shadow top"></div>',
      '<div class="maps-shadow right"></div>',
      '<div class="maps-shadow bottom"></div>',
      '<div class="maps-shadow left"></div>'
    ].join('\n');
    $(shadow).insertAfter( $gmap );

    // Fire gmap3 script
    if( lat !== '' && lng !== '' ) {
      opts.lat = lat;
      opts.lng = lng;
    } else {
      opts.address = addr;
    }
    $gmap.gmap3( opts );

  };    

}
$(window).bind('load', function(){
  if( $('.gmaps').length > 0 ) {
    loadGmap();
  }
});


/* ===================================================================
  Archive Timeline
=================================================================== */
function archiveTimeline() {
  var $timeline = $('.timeline-post');

  // Fire masonry script
  function runMasonry() {
    $('.timeline-post').masonry({
      itemSelector: '.entry-post'
    });
  }

  // Calculate time indicator position
  // and give class left-pos or right-pos
  window.calculatePos = function($target) {
    $target.each(function(i){
      var $el         = $(this),
          $indicator  = $el.find('.time-indicator'),
          $prevPost   = $target.eq(i-1),
          $currentPost= $target.eq(i);
          
      // Check position
      if( parseInt( $el.css('left') ) == 0 ) {
        $indicator.addClass('left-pos');
      } else {
        $indicator.addClass('right-pos');
      }

      // Check if entry post have same top position
      // and add some spacing for indicator
      if( i !== 0 && $currentPost.css('top') == $prevPost.css('top') )
      {
        $currentPost.find('.time-indicator').addClass('top-space');
      }
    });

    $('.time-indicator').fadeIn();
  }

  // Make sure images is loaded before 
  // fire masonry script
  $timeline.imagesLoaded(function(){
    runMasonry();
    calculatePos($('.timeline-post .entry-post'));
  });

  // Reload masonry when window resized
  $(window).bind('resize', function(){
    setTimeout(function(){
      $('.timeline-post').masonry('reload');
    }, 100);
  });

}
if( $('.timeline-post > article').length > 0 ) {
  archiveTimeline();
}



/* ===================================================================
  On Document Ready
=================================================================== */
$(document).ready(function() {

$('[rel="tooltip"]').tooltip();
$('.search-box select, .articles-filter').selectbox();
$('.search-box select').css('display', 'block');
$('#respond input[type="submit"]').addClass('btn btn-candygreen');
/* Placeholder Polyfill */
$('input, textarea').placeholder();

/* -------------------------------------------------------------------
  Dropdown Menu
------------------------------------------------------------------- */
$('.primary-nav .nav-collapse ul:first')
  .addClass('sf-menu')
  .superfish({
    dropShadows: false,
    onInit: function() {
      // Change dropdown arrow
      $(this).find('.sf-sub-indicator').html('<i class="icon-chevron-down"></i>');
      $(this).find('ul .sf-sub-indicator').html('<i class="icon-chevron-right"></i>');
    }
  });


/* -------------------------------------------------------------------
  Make widget categories list clickable
------------------------------------------------------------------- */
$('.widget_categories, .widget_product_categories li').click(function(e){
  window.location = $(this).find('a').attr('href');
});

/* -------------------------------------------------------------------
  Placeholder polyfill on subscribe section
------------------------------------------------------------------- */
var placeholderText = $('.subscribe-section :text').val();
$('.subscribe-section :text')
  .focus(function(){
    if( this.value == placeholderText ) {
      this.value = '';
    }
  })
  .blur(function(){
    if( this.value == '' ) {
      this.value = placeholderText;
    }
  });


/* ===================================================================
  Top Navigation Slide down
=================================================================== */
(function(){
  if( typeof $.browser.msie == "undefined" )
  {
    $('.primarynav-section').clone().addClass('mobilemenu').prependTo('.header-container');
    $('.topnav-section').clone().addClass('mobilemenu').prependTo('.header-container');
    
    var $selector   = $('.topnav-section.mobilemenu'),
        $btnTopmenu = $('.btn-topmenu'),
        $btnSidebar = $('.btn-sidebar');

    // Set the negative margin on the top menu for slide-menu pages
    if ($selector.length > 0) {
      $selector.hide();
      $(window).bind('load', function(){
        $selector.css("margin-top", $selector.height() * -1).show();
      });
    }

    // Watch for clicks to show the menu for slide-menu pages
    if ($btnTopmenu.length > 0)  {
      $btnTopmenu.click(function(e){
        e.preventDefault();
        $('body').toggleClass('active-menu');
      });
    }

    // Watch for clicks to show the menu for slide-menu pages
    if ($btnSidebar.length > 0)  {
      $btnSidebar.click(function(e){
        e.preventDefault();
        $('html').toggleClass('active-panel');
      });
    }

    // Adjust sidebars and sizes when resized
    $(window).resize(function() {
      $('body').removeClass('active');  
      if ($selector.length > 0) {
        $selector.css("margin-top", $selector.height() * -1);
      }
    });
  }
})();


/* ===================================================================
  Show/Hide Search box
=================================================================== */
$('.search-button a').click(function(e) {
  var $el = $(this);
  e.preventDefault();
  $el.parent().prev().toggleClass('slideup');
  $el.toggleClass('active');
});


/* ===================================================================
  Infinite Pagination
=================================================================== */
$('.post-list').infinitescroll({
  animate:       true,
  behavior:      'manual_trigger',
  navSelector  : "div.infinite-pagination",
  nextSelector : "div.infinite-pagination a:first",
  itemSelector : ".post-list article"
});

$('.timeline-post').infinitescroll({
  animate:       true,
  behavior:      'manual_trigger',
  navSelector  : "div.infinite-pagination",
  nextSelector : "div.infinite-pagination a:first",
  itemSelector : ".timeline-post article"
});


/* ===================================================================
  Twitter Widgets
=================================================================== */
(function(){
  var decorator = {
    tweetFeedDecorator: function(options) {
      return '<ul class="nesia-tweet-list"></ul>';
    },
    tweetDecorator: function(tweet, options) {
      return '<li class="nesia-tweet-list-item">' + options.tweetBodyDecorator(tweet, options) + '</li>';
    },
    tweetBodyDecorator: function(tweet, options) {
      var html = '';
      html += options.tweetTextDecorator(tweet, options); 
      html += options.tweetProfileImageDecorator(tweet, options);

      var screenName = getScreenName(tweet);
      html += '<div class="tweet-user-screenname">' +
              '<a href="http://twitter.com/' + screenName + '" target="_blank">' +
              '@' + screenName +
              '</a>' +
              '</div>';

      html += options.tweetTimestampDecorator(tweet, options);

      return html;
    }
  };
  

  $('.widget_nesia_twitter').each(function(){
    var $el = $(this),
        param = $el.find('.widget-inner-content').data(),
        opts = {
          count: param.counttweet || 5,
          tweetFeedDecorator: decorator.tweetFeedDecorator,
          tweetDecorator: decorator.tweetDecorator,
          tweetBodyDecorator: decorator.tweetBodyDecorator
        };

    // Check widget type
    if( typeof param.searchparam !== 'undefined' ) {
      opts.searchParams = 'q=' + param.searchparam;
    } else {
      opts.username = tweet;
    }

    $(this).find('.widget-tweets').jTweetsAnywhere(opts);
  });

})();


/* ===================================================================
  Flickr Photo Stream
=================================================================== */
function pull_flickr_image_request() {
  // Our very special jQuery JSON fucntion call to Flickr, gets details of the most recent 20 images
  // if you need to display group pool? http://api.flickr.com/services/feeds/groups_pool.gne
  $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=" + flickrid + "&lang=en-us&format=json&jsoncallback=?", displayImages);

  function displayImages(data) {
    // Randomly choose where to start. A random number between 0 and the number of photos we grabbed (20) minus 9 (we are displaying 9 photos).
    var iStart = Math.floor(Math.random()*(6));
    // Reset our counter to 0
    var iCount = 0;

    // Start putting together the HTML string
    var htmlString = "<ul>";

    // Now start cycling through our array of Flickr photo details
    $.each(data.items, function(i,item){

      // Let's display 9 photos (a 3x3 grid), starting from a random point in the feed
      if (iCount > iStart && iCount < (iStart + 7)) {

        // I only want the ickle square thumbnails
        var sourceSquare = (item.media.m).replace("_m.jpg", "_s.jpg");

        // Here's where we piece together the HTML
        htmlString += '<li><a href="' + item.link + '" target="_blank">';
        htmlString += '<img src="' + sourceSquare + '" alt="' + item.title + '" title="' + item.title + '"/>';
        htmlString += '</a></li>';
      }
      // Increase our counter by 1
      iCount++;
    });
  // Pop our HTML in the #images DIV
  $('.widget_photos .widget-inner-content').html(htmlString + "</ul>");

  // Close down the JSON function call
  }
}
// then fire the function above to execute
if( typeof flickrid !== 'undefined' ) {
  pull_flickr_image_request();
}


});


/* ===================================================================
  Check if iframe exists in single post
=================================================================== */
$(window).load(function(){

  $('.entry-content iframe').parent().addClass('entry-video');

});


})(jQuery);
