
(function ($) {

	const debug = false;

    /* main tab  */
    jQuery(".aavoya-wraq-tab").on("click", function () {
        jQuery(".aavoya-wraq-tab").each(function () {
            if (jQuery(this).hasClass("active")) {
                jQuery(this).removeClass("active");
            }
        });

        jQuery(this).addClass("active");

        let body_to_show = jQuery(this).attr("data-target");
        jQuery(".tab-body-area").each(function () {
            if (!jQuery(this).is("#" + body_to_show)) {
                jQuery(this).addClass("hidden");
            } else {
                jQuery(this).removeClass("hidden");
            }
        });
    });

    // This to show hide wordpress setting, if the main checkbox is checked or not
    jQuery("#enable-wordpress-id").change(function () {
        if (jQuery(this).is(":checked")) {
            jQuery("#wordpress-default-setting-area").show();
			updateFormAreatoggleInformation('wp',true);
        } else {
            jQuery("#wordpress-default-setting-area").hide();
			updateFormAreatoggleInformation('wp',false);
        }
    });

    // This to show hide woocommerce setting, if the main checkbox checked or not
    jQuery("#enable-woo-id").change(function(){
		if (jQuery(this).is(":checked")) {
			jQuery("#woo-default-setting-area").show();
			updateFormAreatoggleInformation('wo',true);
		} else {
			jQuery("#woo-default-setting-area").hide();
			updateFormAreatoggleInformation('wo',false);
		}
	});


	/**
	 * updateFormAreatoggleInformation
	 * This function will update the status toggle button for wp and woo page
	 * @desc This will be used as direct on/off button to show or not RAQ form and button on the frontend 
	 * @param {string} belongsTo
	 * @param {bool} state
	 */
    function updateFormAreatoggleInformation( belongsTo = null, state = null){
    	if(state == null ){return false;}
    	if(belongsTo == null){return false;}


    	jQuery.ajax({
			url:ajaxurl,
			type:"post",
			dataType:"json",
			data:{
				action:"update_form_toggle_infomation",
				nonce:jQuery("#awraqnonce").val(),
				state:state,
				belongsto:belongsTo,
			},
			error: function(xhr, textStatus, errorThrown){
				console.log("Ajax error form 'updateFormAreatoggleInformation' function!");
			}
		});
	}


	/**
	 * event driven 
	 * @desc save checkbox : assigning button data and on/off bool to product
   	 */
	jQuery(".woo-appender").on("change",".psave",function(){

		let buttonSelected =  jQuery(this).parent().parent().find(".button-selected").find(":selected").val();
		let productId = jQuery(this).parent().parent().attr('pid');
		let status = jQuery(this).prop('checked');

		saveStatus = updateButtonToProduct(productId, buttonSelected, status);

	});


	/**
	 * event driven
	 * @desc dropdown(select and options) button on woo page : assigning button data and on/off bool to product
	 */
	jQuery('.woo-appender').on("change", ".button-selected", function () {
		let selectedButton = jQuery(this).find("option:selected").val();
		let parentDiv = jQuery(this).parent().parent();
		let productId = parentDiv.attr('pid');
		let status = parentDiv.find('.psave').prop('checked');

		saveStatus = updateButtonToProduct(productId, selectedButton, status);

		
	});


	
	/**
	 * updateButtonToProduct
	 * @desc This method will update the product meta aka button data(button id) and on/off status to product meta 
	 * @param {integer} productId 
	 * @param {integer} buttonId 
	 * @param {boolean} status 
	 * @returns {boolean} 
	 */
	function updateButtonToProduct(productId = null , buttonId = null , status = null ){
		if(productId == null || buttonId == null || status == null){return false;}
		
		jQuery.ajax({
			url:ajaxurl,
			type:"post",
			dataType:"json",
			data:{
				action:"save_button_as_product_meta",
				nonce:jQuery("#awraqnonce").val(),
				productid: productId,
				buttonid: buttonId,
				status: status
			},

			error:function(){return false},
			success:function(response) {
				response = JSON.parse(response);
				if(typeof(response) == 'boolean'){
					return response;
				}
			}
		});

	}




	/**
	 * event driven
	 * @desc This to show/hide the button customization area when clicked on the row wordpress area
	 */
    jQuery(".wp-appender").on("click", ".drawer-handle", function () {
        if (
            jQuery(this)
                .parent()
                .next(".drawer")
                .hasClass("hidden")
        ) {
            jQuery(this)
                .parent()
                .next(".drawer")
                .removeClass("hidden");
        } else {
            jQuery(this)
                .parent()
                .next(".drawer")
                .addClass("hidden");
        }
    });

    //msg close button action
    jQuery(".no-msg").on("click", function () {
        jQuery(".msg-area").fadeOut(500);
    });



	/**
	 * This reposible for collecting the data after clicking the save button
	 * and then it pass the data to "sendSettingsData" method for processing
	 */
	jQuery(".wp-appender").on("click", ".save", function () {

		let alldata = jQuery(this).parent().parent().parent();
		let nodeId = alldata.attr('id');
		let contact7form		= alldata.parent().find(".contact-7-selected").val();
		let borderRadiusValue 	= alldata.find(".borderradius").val();
		let paddingXValue 		= alldata.find(".paddingx").val();
		let paddingYValue 		= alldata.find(".paddingy").val();
		let buttonBgColor 		= alldata.find(".bgcolor").val();
		let buttonTextColor 	= alldata.find(".textcolor").val();
		let buttonText 			= alldata.find(".bottontext").val(); 
		let buttonTracking 		= alldata.find(".buttontracking").val();
		let buttonFontSize 		= alldata.find(".buttonfontsize").val();
		let buttonCssClass 		= alldata.find(".cssclass").val();
		
		sendSettingsData(
			nodeId,
			contact7form,
			borderRadiusValue,
			paddingXValue,
			paddingYValue,
			buttonBgColor,
			buttonTextColor,
			buttonText,
			buttonTracking,
			buttonFontSize,
			buttonCssClass);
		
	});

	/**
	 * This is to save button data , via Ajax
	 * TODO: add selected form id, to save
	 * @param nodeId
	 * @param contact7form
	 * @param borderRadiusValue
	 * @param paddingXValue
	 * @param paddingYValue
	 * @param buttonBgColor
	 * @param buttonTextColor
	 * @param buttonText
	 * @param buttonTracking
	 * @param buttonFontSize
	 * @param buttonCssClass
	 */
	function sendSettingsData(
		nodeId,
		contact7form,
		borderRadiusValue,
		paddingXValue,
		paddingYValue,
		buttonBgColor,
		buttonTextColor,
		buttonText,
		buttonTracking,
		buttonFontSize,
		buttonCssClass) {
		
		jQuery.ajax({
			url: ajaxurl,
			type: "post",
			dataType: "json",
			data: {
				action: "save_button_data",
				nodeid: nodeId,
				contact7form:contact7form,
				borderradius: borderRadiusValue,
				paddingx: paddingXValue,
				paddingy: paddingYValue,
				buttonbgcolor: buttonBgColor,
				buttontextcolor: buttonTextColor,
				buttontext: buttonText,
				buttontracking: buttonTracking,
				buttonfontsize: buttonFontSize,
				buttoncssclass: buttonCssClass,
				nonce:jQuery("#awraqnonce").val(),
			},
			error: function (xhr, textStatus, errorThrown) { console.log("Ajax error during saving the setting data"); },
			success: function (response) {
				response = JSON.parse(response);
				//console.log(response);
                if(response == true){
                    createPositiveMessage('Button Saved!');
                }else{
                    createNegativeMessage('Unable to save the Button!');
                }
			},
		});
		
	}

	// this variable is used to maintain state 
	// TODO: in the next version please remember to replace jquery with react
	let proceed = true;

	/**
	 * This is for "Delete" button action
	 */
	jQuery(".wp-appender").on("click", ".delete", function () {

		let alldata = jQuery(this).parent().parent().parent();

		//getting the post id from the DOM
		let nodeId = alldata.attr('id');

		//cheking the state if its ok to procced 
		if (proceed == true) {

			// adding post id to the popup window
			jQuery('.deletewarning').attr('postid', nodeId);

			//removing hidden class from the popup
			jQuery('.deletewarning').removeClass('hidden');
		} 	
	});

	//this for close button 
	jQuery(".close").on("click", function () {
		
		//adding hidden class
		jQuery(this).parent().parent().addClass("hidden");
		
		//altering state to true for next cycle 
		proceed = true;
	});



	/**
	 * @desc Event Driven
	 * 
	 * This is for the action of "Yes" button event on notification, after clicking "Delete" button
	 */
	jQuery(".del-yes").on("click", function () {
		
		//the code for state detection 
		if (proceed == false) {

			return;

		} else {

			proceed = false;
			let popup = jQuery(this).parent().parent().parent().parent().parent();
			let postid = popup.attr("postid");

			popup.addClass('hidden');
			deleteSettingData(postid);
			//lastly this resets the state
			proceed = true;

		}


	});


	jQuery(".wp-appender").on("click", ".copier", function () {

		let shortcodeText = jQuery(this).parent().find(".toclipboard").text();
		

		/**
		 * copying to clicpboard
		 */
		 navigator.clipboard.writeText(shortcodeText);
		
	});

	/**
	 * This initiate ajax request to the php code to delete a post(button)
	 * @param postid - refers to the post id . Since each button is actually a post
	 */
	function deleteSettingData(postid) {

		jQuery.ajax({
			url: ajaxurl,
			type: "post",
			dataType: "json",
			data:{
				action: "delete_button_data",
				nodeid: postid,
				nonce:jQuery("#awraqnonce").val(),
			},
			error: function (xhr, textStatus, errorThrown) { console.log("Ajax error during deleting data 1"); },
			success: function (response) {
				response = JSON.parse(response);
				if (response == true) {
					//show user notification
					createPositiveMessage('Button Deleted');
					removeARow(postid);
				} else {
					//show user notification
					createNegativeMessage('Unable to delete the button');
				}
			},
		});
	}



	/**
	 * This to remove row from DOM only, not from database
	 * @param postid - the postId as row id
	 * @returns {boolean}
	 */
	function removeARow(postid = null){
		if(postid == null){
			return false;
		}
		let divselector = '.row'+postid;
		jQuery(divselector).fadeOut(300,function(){
			jQuery(this).remove();
		});
	}
	
	/**
     * Create positive message with deep blue color
     * @param textToShow - this to have message text that will get added
     */
	 function createPositiveMessage(textToShow) {
        let message = '<div class="modal z-40 bottom-0 right-0 fixed  overflow-y-auto w-96">'+
            '<div class="bg-white border border-gray-100  m-4 rounded shadow ">'+
            '<svg class="w-8 h-8 text-blue-800 float-right -mr-3 -mt-3 bg-white rounded-full close cursor-pointer shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'+
            '<div class="modal-body  modal-body overflow-hidden rounded "><div class="border-l-8 border-blue-900 p-4"><span class="block">'+ textToShow +'</span></div></div>'+
            '</div><script>jQuery(".close").on("click",function(){jQuery(this).parent().parent().remove();});</script>' +
            '</div>';

        jQuery('.message-area').prepend(message);

    }

    /**
     * Create negative message with red colors
     * @param textToShow - this to have message text that will get added
     */
    function createNegativeMessage(textToShow){
        let message = '<div class="modal z-40 bottom-0 right-0 fixed  overflow-y-auto w-96">'+
            '<div class="bg-white border border-gray-100  m-4 rounded shadow ">'+
            '<svg class="w-8 h-8 text-red-600 float-right -mr-3 -mt-3 bg-white rounded-full close cursor-pointer shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'+
            '<div class="modal-body  modal-body overflow-hidden rounded "><div class="border-l-8 border-red-600 p-4"><span class="block">'+ textToShow + '</span></div></div>'+
            '</div><script>jQuery(".close").on("click",function(){jQuery(this).parent().parent().remove();});</script>' +
            '</div>';
        jQuery('.message-area').prepend(message);
    }



})(jQuery);
