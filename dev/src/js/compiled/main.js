'use strict';

/* ---------------------------------------------
 Scripts initialization
 --------------------------------------------- */

// window - load
$(window).on('load', function () {
  $('body').imagesLoaded({
    background: true
  }, function () {
    $(".page-loader div").fadeOut();
    $(".page-loader").delay(200).fadeOut("slow");
  });

  $(window).trigger('scroll');
  $(window).trigger('resize');
});

// document - ready
$(function () {
  $(window).trigger('resize');
  init_nav_menu();
  init_sliders();
  init_smooth_scroll();
});

$(window).on('resize', function () {
  js_height_init();
});

/* ---------------------------------------------
 Mobile Nav
 --------------------------------------------- */
function init_nav_menu() {
  var hamburger__toggle = $('.hamburger').unbind();
  var navbar__nav = $('.navbar__nav');

  navbar__nav.removeClass('navigation-open');

  hamburger__toggle.on('click', function (e) {
    e.preventDefault();
    $('.hamburger').toggleClass('is-active');
    navbar__nav.slideToggle(function () {
      if (navbar__nav.is(':hidden')) {
        navbar__nav.removeAttr('style');
        $('.hamburger').removeClass('is-active');
      }
    });
  });
};

/* ---------------------------------------------
 Smooth Scroll
 --------------------------------------------- */
function init_smooth_scroll() {
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]').not('[href="#0"]').click(function (event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
}

/* ---------------------------------------------
 Page Sliders
 --------------------------------------------- */
function init_sliders() {

  // Clients Slider
  $('.slick__clients').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }]
  });

  // Testimonial Slider
  $('.slick__testimonial').slick({
    responsive: [{
      breakpoint: 800,
      settings: {
        arrows: false
      }
    }]
  });
}

/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
var $contactForm = $('#js-contact-form');
$contactForm.submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: '//formspree.io/taylorradtke@gmail.com',
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: function beforeSend() {
      $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
    },
    success: function success(data) {
      $contactForm.find('.alert--loading').hide();
      $contactForm.append('<div class="alert alert--success">Message sent!</div>');
    },
    error: function error(err) {
      $contactForm.find('.alert--loading').hide();
      $contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
    }
  });
});

/* ---------------------------------------------
 JS Full Height
 --------------------------------------------- */
function js_height_init() {
  (function ($) {
    $(".js-height-full").height($(window).height());
    $(".js-height-parent").each(function () {
      $(this).height($(this).parent().first().height());
    });
  })(jQuery);
}

/* ---------------------------------------------
 mixItUp
 --------------------------------------------- */
var mixItUp__wrapper = document.querySelector('.works--wrap');

var mixer = mixitup(mixItUp__wrapper, {
  selectors: {
    target: '.works--item'
  },
  classNames: {
    block: 'works',
    elementFilter: 'category',
    delineatorElement: '--',
    delineatorModifier: '__'
  }
});
//# sourceMappingURL=main.js.map
