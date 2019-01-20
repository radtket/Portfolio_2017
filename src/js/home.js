import $ from "jquery";
import "slick-carousel";
import mixitup from "mixitup";
import initSmoothScroll from "./_smooth-scroll";
import initJsHeight from "./_jsHeight";
import pageLoader from "./_pageloader";

/* ---------------------------------------------
 Mobile Nav
 --------------------------------------------- */
function initNavMenu() {
	const hamburgerToggle = $(".hamburger").unbind();
	const navbarNav = $(".navbar__nav");

	navbarNav.removeClass("navigation-open");

	hamburgerToggle.on("click", e => {
		e.preventDefault();
		$(".hamburger").toggleClass("is-active");
		navbarNav.slideToggle(() => {
			if (navbarNav.is(":hidden")) {
				navbarNav.removeAttr("style");
				$(".hamburger").removeClass("is-active");
			}
		});
	});
}

/* ---------------------------------------------
 Page Sliders
 --------------------------------------------- */
function initSliders() {
	// Clients Slider
	$(".slick__clients").slick({
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
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
	$(".slick__testimonial").slick({
		responsive: [
			{
				breakpoint: 800,
				settings: {
					arrows: false
				}
			}
		]
	});
}

/* ---------------------------------------------
 Contact form
 --------------------------------------------- */

// eslint-disable-next-line func-names
$("#js-contact-form").submit(function(e) {
	e.preventDefault();
	$.ajax({
		url: "//formspree.io/taylorradtke@gmail.com",
		method: "POST",
		data: $(this).serialize(),
		dataType: "json",
		beforeSend: () => {
			$(this).append(
				'<div class="alert alert--loading">Sending messageâ€¦</div>'
			);
		},
		success: () => {
			$(this)
				.find(".alert--loading")
				.hide();
			$(this).append('<div class="alert alert--success">Message sent!</div>');
		},
		error: () => {
			$(this)
				.find(".alert--loading")
				.hide();
			$(this).append(
				'<div class="alert alert--error">Ops, there was an error.</div>'
			);
		}
	});
});

/* ---------------------------------------------
 mixItUp
 --------------------------------------------- */
const mixItUpWrapper = document.querySelector(".works--wrap");

mixitup(mixItUpWrapper, {
	selectors: {
		target: ".works--item"
	},
	classNames: {
		block: "works",
		elementFilter: "category",
		delineatorElement: "--",
		delineatorModifier: "__"
	}
});

/* ---------------------------------------------
 Scripts initialization
 --------------------------------------------- */

// window - load
$(window).on("load", () => {
	pageLoader();

	$(window).trigger("scroll");
	$(window).trigger("resize");

	// Hash menu forwarding
	if (window.location.hash && $(window.location.hash).length) {
		const hashOffset = $(window.location.hash).offset().top;
		$("html, body").animate({
			scrollTop: hashOffset
		});
	}
});

// document - ready
$(() => {
	$(window).trigger("resize");
	initNavMenu();
	initSliders();
	initSmoothScroll();
});

$(window).on("resize", () => {
	initJsHeight();
});
