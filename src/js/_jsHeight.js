import $ from "jquery";

function getHeight() {
	$(this).height(
		$(this)
			.parent()
			.first()
			.height()
	);
}

function initJsHeight() {
	$(".js-height-full").height($(window).height());
	$(".js-height-parent").each(getHeight());
}

export default initJsHeight;
