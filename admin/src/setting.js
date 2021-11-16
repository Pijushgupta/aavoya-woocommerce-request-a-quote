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
	 * @desc event driven - On page load it load global settings data
	 */
	jQuery().ready(function () {
		
		jQuery.ajax({
			url: ajaxurl,
			type: "POST",
			dataType: "json",
			data: {
				action: "get_global_setting",
				nonce: jQuery("#awraqnonce").val()
			},
			error: function (xhr, textStatus, errorThrown) { console.log(errorThrown) },
			success: function (response) {
				
				console.log(response);
			}
		});
	});

})(jQuery);