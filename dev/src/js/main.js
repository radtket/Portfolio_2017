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
  slick_slider();
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
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper__clients', {
    pagination: '.swiper__pagination',
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 48,
    setWrapperSize: true,

    slideClass: 'swiper__clients--item',
    nextButton: '.swiper__nav--next',
    prevButton: '.swiper__nav--prev',
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 36
        },
        800: {
            slidesPerView: 2,
            spaceBetween: 36
        },
        600: {
            slidesPerView: 1,
            spaceBetween: 24
        }
    }

  })
};




function slick_slider() {
  $('.slick__clients').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
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
          slidesToScroll: 1
        }
      }
    ]
  });


  $('.slick__testimonial').slick();
}
