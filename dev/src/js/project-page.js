/* ---------------------------------------------
 Scripts initialization
 --------------------------------------------- */
// window - load
$(window).on('load', () => {
	$('body').imagesLoaded(
		{
			background: true,
		},
		() => {
			$('.page-loader div').fadeOut();
			$('.page-loader')
				.delay(200)
				.fadeOut('slow');
		}
	);
	$(window).trigger('scroll');
	$(window).trigger('resize');

	// Hash menu forwarding
	if (window.location.hash && $(window.location.hash).length) {
		const hashOffset = $(window.location.hash).offset().top;
		$('html, body').animate({
			scrollTop: hashOffset,
		});
	}
});

// document - ready
$(() => {
	$(window).trigger('resize');
	initSmoothScroll();
	initProjectColors();
});

$(window).on('resize', () => {
	initJsHeight();
});

/* ---------------------------------------------
 Smooth Scroll
 --------------------------------------------- */
function initSmoothScroll() {
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
				location.hostname === this.hostname
			) {
				// Figure out element to scroll to
				let target = $(this.hash);
				target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate(
						{
							scrollTop: target.offset().top,
						},
						1000,
						() => {
							// Callback after animation
							// Must change focus!
							const $target = $(target);
							$target.focus();
							if ($target.is(':focus')) {
								// Checking if the target was focused
								return false;
							}
							$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						}
					);
				}
			}
		});
}

/* ---------------------------------------------
 JS Full Height
 --------------------------------------------- */
function initJsHeight() {
	(function($) {
		$('.js-height-full').height($(window).height());
		$('.js-height-parent').each(function() {
			$(this).height(
				$(this)
					.parent()
					.first()
					.height()
			);
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

function initProjectColors() {
	$('.project-colors__text').each(function() {
		const color = $(this).text();
		$(this)
			.prev()
			.css('background', color);
	});
}
