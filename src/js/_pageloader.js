import $ from "jquery";
import imagesLoaded from "imagesloaded";

// provide jQuery argument
imagesLoaded.makeJQueryPlugin($);

function pageLoader() {
	$("body").imagesLoaded(
		{
			background: true
		},
		() => {
			$(".page-loader div").fadeOut();
			$(".page-loader")
				.delay(200)
				.fadeOut("slow");
		}
	);
}
export default pageLoader;
