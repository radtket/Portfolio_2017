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
	init_smooth_scroll();
	init_project_colors();
});

$(window).on('resize', function () {
	js_height_init();
});

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
 Background Video
 --------------------------------------------- */
$('.project-hero__video').coverVid(1920, 1080);

/* ---------------------------------------------
	Dynamic Theme Color Creator
 --------------------------------------------- */

function init_project_colors() {
	$('.project-colors__text').each(function () {
		var color = $(this).text();
		$(this).prev().css("background", color);
	});
}
//# sourceMappingURL=project-page.js.map
