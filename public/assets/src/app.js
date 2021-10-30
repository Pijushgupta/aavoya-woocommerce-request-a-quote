(function ($) {
	//code for close button
	jQuery(".aavoyaclose").on("click", function () {
		let modal = jQuery(".aavoyaclose").parent().parent();
		if (!modal.hasClass("hidden")) {
			modal.addClass("hidden"); 
		}
	});

	//code to open popup
	jQuery(".ainipopup").each(function () {
		jQuery(this).on("click", function () {

			let popupModalId = jQuery(this).attr('popuptoopen');

			

			let popupModal = jQuery(document).find("#" + popupModalId);
			
			

			if (popupModal.hasClass("hidden")) {

				popupModal.removeClass("hidden");
			} 
		});
		
	});
	
 })(jQuery);