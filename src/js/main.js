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
