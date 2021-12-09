(function ($) {

	/**
	 * @desc - even driven function to save the settings
	 */
	jQuery(".save-settings").on("click", function () {
		var mainDiv = jQuery(this).parent().parent();

		const globalSettingData = {
									globalCorner: mainDiv.find("#global-corner").val(),
									globalText: mainDiv.find("#global-b-text").val(),
									globalPaddingX: mainDiv.find("#global-padding-x").val(),
									globalPaddingY: mainDiv.find("#global-padding-y").val(),
									globalSize: mainDiv.find("#global-size").val(),
									globalTracking: mainDiv.find("#global-tracking").val(),
									globalBgColor: mainDiv.find("#global-background-color").val(),
									globalTextColor: mainDiv.find("#global-text-color").val(),
									globalCssClass: mainDiv.find("#global-css-class").val()
		};
		
		jQuery.ajax({
			url: ajaxurl,
			type: "POST",
			dataType: "json",
			data: {
				action: "save_global_setting",
				nonce: jQuery("#awraqnonce").val(),
				globaldata: globalSettingData
			},
			error: function (xhr, textStatus, errorThrown) { console.log(errorThrown); },
			success: function (response) {
				console.log(response);
			}

		});
	
	});
	
	/**
	 * @desc - This to show and hide the button setting area 
	 */
	jQuery(".showhidebuttonsetting").on("click", function () {
		let showhidebuttonsettingarea = jQuery(this).attr("data-target");
		jQuery("." + showhidebuttonsettingarea).toggle();
		jQuery(this).find("svg").toggleClass("transform rotate-90");
	});


	/**
	 * Live css preview section start
	 */

	jQuery('#global-corner').on('change', function () {
		let globalCorner = jQuery(this).val();
		jQuery('.globalpreviewbutton').css({'border-radius': globalCorner + "px"});
	 });

	 jQuery('#global-b-text').on('change', function () {
		let globalBText = jQuery(this).val();
		 jQuery('.globalpreviewbutton').html(globalBText);
	 });
	
	jQuery('#global-padding-x').on('change', function () {
		let globalPaddingX = jQuery(this).val();
		jQuery('.globalpreviewbutton').css({'padding-left': globalPaddingX + "px", 'padding-right': globalPaddingX + "px"});
	 });
	
	jQuery('#global-padding-y').on('change', function () {
		let globalPaddingY = jQuery(this).val();
		jQuery('.globalpreviewbutton').css({'padding-top': globalPaddingY + "px", 'padding-bottom': globalPaddingY + "px"});
	 });
	
	jQuery('#global-size').on('change', function () {
		let globalSize = jQuery(this).val();
		jQuery('.globalpreviewbutton').css({'font-size': globalSize + "px"});
	});
	
	jQuery('#global-tracking').on('change', function () {
		let globalTracking = jQuery(this).val();
		jQuery('.globalpreviewbutton').css({'letter-spacing': globalTracking + "px"});
	});
	
	jQuery('#global-background-color').on('change', function () {
		let globalBgColor = jQuery(this).val();
		jQuery('.globalpreviewbutton').css({'background-color': globalBgColor});
	});

	jQuery('#global-text-color').on('change', function () {
		let globalTextColor = jQuery(this).val();
		jQuery('.globalpreviewbutton').css({'color': globalTextColor});
	});

	/**
	 * Live css preview section end
	 */



})(jQuery);