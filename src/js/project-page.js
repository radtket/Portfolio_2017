import $ from "jquery";
import coverVid from "./_coverVid";
import initSmoothScroll from "./_smooth-scroll";
import initJsHeight from "./_jsHeight";
import pageLoader from "./_pageloader";

// provide jQuery argument

/* ---------------------------------------------
 Background Video
 --------------------------------------------- */

const $video = $(".project-hero__video").on("playing", event => {
	$(event.target).addClass("is-playing");
});
coverVid($video[0], 1920, 1080);

function initProjectColors() {
	$(".project-colors__text").each(function() {
		$(this)
			.prev()
			.css("background", $(this).text());
	});
}

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
	initSmoothScroll();
	initProjectColors();
});

$(window).on("resize", () => {
	initJsHeight();
});
