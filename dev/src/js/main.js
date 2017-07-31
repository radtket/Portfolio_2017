/* ---------------------------------------------
 Scripts initialization
 --------------------------------------------- */

// window - load
$(window).on('load', function(){
  $(window).trigger('scroll');
  $(window).trigger('resize');
});

// document - ready
$(function() {
  $(window).trigger('resize');
  init_nav_menu();
  init_sliders();
});

$(window).on('resize', function() {

});




// Mobile Nav
function init_nav_menu() {
	var hamburger__toggle = $('.hamburger').unbind();
	var navbar__nav = $('.navbar__nav');

	navbar__nav.removeClass('navigation-open');

	hamburger__toggle.on('click', function(e) {
		e.preventDefault();
		$('.hamburger').toggleClass('is-active');
		navbar__nav.slideToggle(function() {
			if (navbar__nav.is(':hidden')) {
				navbar__nav.removeAttr('style');
				$('.hamburger').removeClass('is-active');
			}
		});
	})
};








function init_sliders() {

  // Clients Slider
  $('.slick__clients').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  });

  // Testimonial Slider
  $('.slick__testimonial').slick({

  });
}
