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
	initNavMenu();
	initSliders();
	initSmoothScroll();
});

$(window).on('resize', () => {
	initJsHeight();
});

/* ---------------------------------------------
 Mobile Nav
 --------------------------------------------- */
function initNavMenu() {
	const hamburgerToggle = $('.hamburger').unbind();
	const navbarNav = $('.navbar__nav');

	navbarNav.removeClass('navigation-open');

	hamburgerToggle.on('click', e => {
		e.preventDefault();
		$('.hamburger').toggleClass('is-active');
		navbarNav.slideToggle(() => {
			if (navbarNav.is(':hidden')) {
				navbarNav.removeAttr('style');
				$('.hamburger').removeClass('is-active');
			}
		});
	});
}

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
 Page Sliders
 --------------------------------------------- */
function initSliders() {
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
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	});

	// Testimonial Slider
	$('.slick__testimonial').slick({
		responsive: [
			{
				breakpoint: 800,
				settings: {
					arrows: false,
				},
			},
		],
	});
}

/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
const $contactForm = $('#js-contact-form');
$contactForm.submit(function(e) {
	e.preventDefault();
	$.ajax({
		url: '//formspree.io/taylorradtke@gmail.com',
		method: 'POST',
		data: $(this).serialize(),
		dataType: 'json',
		beforeSend: () => {
			$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
		},
		success: data => {
			$contactForm.find('.alert--loading').hide();
			$contactForm.append('<div class="alert alert--success">Message sent!</div>');
		},
		error: err => {
			$contactForm.find('.alert--loading').hide();
			$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
		},
	});
});

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
 mixItUp
 --------------------------------------------- */
const mixItUpWrapper = document.querySelector('.works--wrap');

const mixer = mixitup(mixItUpWrapper, {
	selectors: {
		target: '.works--item',
	},
	classNames: {
		block: 'works',
		elementFilter: 'category',
		delineatorElement: '--',
		delineatorModifier: '__',
	},
});
