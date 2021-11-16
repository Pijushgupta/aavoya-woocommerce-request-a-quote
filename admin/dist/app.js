(function ($) {

    /**
	 * main tab 
	 * Left hand side tab switching mechanism   
	 */
    jQuery(".aavoya-wraq-tab").on("click", function () {
        jQuery(".aavoya-wraq-tab").each(function () {
            if (jQuery(this).hasClass("active")) {
                jQuery(this).removeClass("active");
            }
        });

        jQuery(this).addClass("active");

        var body_to_show = jQuery(this).attr("data-target");
        jQuery(".tab-body-area").each(function () {
            if (!jQuery(this).is("#" + body_to_show)) {
                jQuery(this).addClass("hidden");
            } else {
                jQuery(this).removeClass("hidden");
            }
        });
    });

    /**
	 * This to show hide button setting, if the main checkbox is checked or not
	 */
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

		var buttonSelected =  jQuery(this).parent().parent().find(".button-selected").find(":selected").val();
		var productId = jQuery(this).parent().parent().attr('pid');
		var status = jQuery(this).prop('checked');

		saveStatus = updateButtonToProduct(productId, buttonSelected, status);

	});


	/**
	 * event driven
	 * @desc dropdown(select and options) button on woo page : assigning button data and on/off bool to product
	 */
	jQuery('.woo-appender').on("change", ".button-selected", function () {
		var selectedButton = jQuery(this).find("option:selected").val();
		var parentDiv = jQuery(this).parent().parent();
		var productId = parentDiv.attr('pid');
		var status = parentDiv.find('.psave').prop('checked');

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
		
		var drawer = jQuery(this).parent().next(".drawer");

		if (drawer.hasClass("hidden")) {
			
			drawer.removeClass("hidden");
			jQuery(this).find("svg").addClass("transform rotate-90");

			
			
		} else {
			
			drawer.addClass("hidden");
			jQuery(this).find("svg").removeClass("transform rotate-90");
			
        }
    });

    /**
	 * msg close button action
	 */
    jQuery(".no-msg").on("click", function () {
        jQuery(".msg-area").fadeOut(500);
    });



	/**
	 * This reposible for collecting the data after clicking the save button
	 * and then it pass the data to "sendSettingsData" method for processing
	 */
	jQuery(".wp-appender").on("click", ".save", function () {

		var alldata = jQuery(this).parent().parent().parent();
		var nodeId = alldata.attr('id');
		var contact7form		= alldata.parent().find(".contact-7-selected").val();
		var borderRadiusValue 	= alldata.find(".borderradius").val();
		var paddingXValue 		= alldata.find(".paddingx").val();
		var paddingYValue 		= alldata.find(".paddingy").val();
		var buttonBgColor 		= alldata.find(".bgcolor").val();
		var buttonTextColor 	= alldata.find(".textcolor").val();
		var buttonText 			= alldata.find(".bottontext").val(); 
		var buttonTracking 		= alldata.find(".buttontracking").val();
		var buttonFontSize 		= alldata.find(".buttonfontsize").val();
		var buttonCssClass 		= alldata.find(".cssclass").val();
		
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
				
                if(response == true){
                    createPositiveMessage('Button Saved!');
                }else{
                    createNegativeMessage('Unable to save the Button!');
                }
			},
		});
		
	}

	 
	// TODO: in the next version please remember to replace jquery with react

	/**
	 * this variable is used to maintain state
	 */
	var proceed = true;

	/**
	 * This is for "Delete" button action
	 */
	jQuery(".wp-appender").on("click", ".delete", function () {

		var alldata = jQuery(this).parent().parent().parent();

		/**
		 * getting the post id from the DOM
		 */
		var nodeId = alldata.attr('id');

		/**
		 * checking the state if its ok to proceed
		 */
		if (proceed == true) {

			/**
			 * adding post id to the popup window
			 */
			jQuery('.deletewarning').attr('postid', nodeId);

			/**
			 * removing hidden class from the popup
			 */
			jQuery('.deletewarning').removeClass('hidden');
		} 	
	});

	/**
	 * this for close button
	 */
	jQuery(".close").on("click", function () {
		
		/**
		 * adding hidden class
		 */
		jQuery(this).parent().parent().addClass("hidden");
		
		/**
		 * altering state to true for next cycle
		 */
		proceed = true;
	});



	/**
	 * @desc Event Driven
	 * This is for the action of "Yes" button event on notification, after clicking "Delete" button
	 */
	jQuery(".del-yes").on("click", function () {
		
		/**
		 * the code for state detection
		 */
		if (proceed == false) {

			return;

		} else {

			proceed = false;
			var popup = jQuery(this).parent().parent().parent().parent().parent();
			var postid = popup.attr("postid");

			popup.addClass('hidden');
			deleteSettingData(postid);
			/**
			 * lastly this resets the state
			 */
			proceed = true;

		}


	});



	/**
	 * event driven. 
	 * @desc This copy shortcode to clipboard on click 
	*/
	jQuery(".wp-appender").on("click", ".copier", function () {
		
		var shortCodeDiv = jQuery(this).parent();
		
		var shortcodeText = shortCodeDiv.find(".toclipboard");
		var shortCodeToolTipDiv = shortCodeDiv.find(".tool-tip");
		
		/**
		 * copying to clicpboard
		 */

		try {
			navigator.clipboard.writeText(shortcodeText.val());
			
			shortCodeToolTipDiv.html('Copied!');
			shortCodeToolTipDiv.addClass('inline');
			shortCodeToolTipDiv.removeClass('hidden');

			setTimeout(function () {
				shortCodeToolTipDiv.removeClass('inline');
				shortCodeToolTipDiv.addClass('hidden');
			} ,2000);

		} catch (exc) {
			
			shortCodeToolTipDiv.html('SSL issue!');
			shortCodeToolTipDiv.addClass('inline');
			shortCodeToolTipDiv.removeClass('hidden');
			setTimeout(function () {
				shortCodeToolTipDiv.removeClass('inline');
				shortCodeToolTipDiv.addClass('hidden')
			} ,2000);
			
		}



		
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
			error: function (xhr, textStatus, errorThrown) { console.log("Ajax error during deleting data"); },
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
		var divselector = '.row'+postid;
		jQuery(divselector).fadeOut(300,function(){
			jQuery(this).remove();
		});
	}
	
	/**
     * Create positive message with deep blue color
     * @param textToShow - this to have message text that will get added
     */
	 function createPositiveMessage(textToShow) {
        var message = '<div class="modal z-40 bottom-0 right-0 fixed  overflow-y-auto w-96">'+
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
        var message = '<div class="modal z-40 bottom-0 right-0 fixed  overflow-y-auto w-96">'+
            '<div class="bg-white border border-gray-100  m-4 rounded shadow ">'+
            '<svg class="w-8 h-8 text-red-600 float-right -mr-3 -mt-3 bg-white rounded-full close cursor-pointer shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'+
            '<div class="modal-body  modal-body overflow-hidden rounded "><div class="border-l-8 border-red-600 p-4"><span class="block">'+ textToShow + '</span></div></div>'+
            '</div><script>jQuery(".close").on("click",function(){jQuery(this).parent().parent().remove();});</script>' +
            '</div>';
        jQuery('.message-area').prepend(message);
    }



})(jQuery);

(function ($) {
    //this to live update the border radius of the sample button by the movement of slider
    jQuery(".wp-appender").on("change", ".borderradius", function () {
        let borderRadius = jQuery(this).val();
        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css("border-radius", borderRadius + "px");
    });

    // this to live update the padding x while using the slider
    jQuery(".wp-appender").on("change", ".paddingx", function () {
        let paddingX = jQuery(this).val();
        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css({
                "padding-left": paddingX + "px",
                "padding-right": paddingX + "px",
            });
    });

    //this to live update the padding y while using the slider
    jQuery(".wp-appender").on("change", ".paddingy", function () {
        let paddingY = jQuery(this).val();
        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css({
                "padding-top": paddingY + "px",
                "padding-bottom": paddingY + "px",
            });
    });

    //this to live update the button text
    jQuery(".wp-appender").on("keyup", ".bottontext", function () {
        let buttonText = jQuery(this).val();

        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .html(buttonText);
    });

    //this to live update the button text tracking
    jQuery(".wp-appender").on("change", ".buttontracking", function () {
        let buttonTracking = jQuery(this).val();

        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css({"letter-spacing": buttonTracking + "px"});
    });

    //this to live update the button text size
    jQuery(".wp-appender").on("change", ".buttonfontsize", function () {
        let buttonFontSize = jQuery(this).val();

        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css({"font-size": buttonFontSize + "px"});
    });

    //this to live update the button background color
    jQuery(".wp-appender").on("change",".bgcolor", function(){
        let buttonBgcolor = jQuery(this).val();
        //console.log(buttonBgcolor);
        jQuery(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css({"background-color":buttonBgcolor});
    });

    //this to live update the button color
    jQuery(".wp-appender").on("change",".textcolor", function(){
        let buttonColor = jQuery(this).val();
        //console.log(buttonColor);
        jQuery(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css({"color":buttonColor});
	});
	
})(jQuery);
(function($){
    //This to add new row for shortcode for wordpress setting area
    jQuery(".wpadder").on("click", function () {

        jQuery.ajax({
            url: ajaxurl,
            type: "post",
            dateType: "json",
            data: {
                action: "get_new_button_data",
                nonce: jQuery("#awraqnonce").val(),
            },

            error: function (xhr, textStatus, errorThrown) {
                console.log("Ajax Error");
            },

            success: function (response) {
                response = JSON.parse(response);
                //console.log(response);
				forms_select_obj = response.forms;
				
				console.log(response.defaultstyle);
                var forms_select_options = "";

                for (const [key, value] of Object.entries(forms_select_obj)) {
                    forms_select_options +=
                        '<option value="' + key + '">' + key + " - " + value + "</option>";
                }
				var inlineCssStyle = 'border-radius:' + response.defaultstyle.globalCorner + 'px; padding:' + response.defaultstyle.globalPaddingY + 'px ' + response.defaultstyle.globalPaddingX + 'px; background-color:' + response.defaultstyle.globalBgColor + '; color:' + response.defaultstyle.globalTextColor + '; letter-spacing:' + response.defaultstyle.globalTracking + 'px; text-size:' + response.defaultstyle.globalSize + 'px;';
                var row =
                    '<div class="row  w-full flex  relative z-50 rounded-sm shadow mt-2 items-center bg-white row'+response.id+'" >' +
					'<div class="table-def text-center shortcode"><input type="text" name="sshortcode" class="bg-gray-200 rounded px-6 py-2 toclipboard" value=\''+ response.short_code +'\'><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-2 text-gray-400 cursor-pointer copier" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg><div class="tool-tip hidden"></div></div>' +
                    '<div class="table-def text-center">' +
                    '<select name="selected_form" class="contact-7-selected">' + forms_select_options + "</select>" +
                    "</div>" +
                    '<div class="p-2 drawer-handle cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current w-4 h-4 text-gray-400 duration-100"><path d="M10 0a10 10 0 110 20 10 10 0 010-20zM2 10a8 8 0 1016 0 8 8 0 00-16 0zm10.54.7L9 14.25l-1.41-1.41L10.4 10 7.6 7.17 9 5.76 13.24 10l-.7.7z"/></svg>' +
                    "</div></div>" +
                    '<div class="drawer  shadow rounded-sm p-2 -mt-1 pt-4 hidden transform duration-100 row'+response.id+'" id="' + response.id + '">'+
                    '<div class="w-full flex">'+
                    '<div class="w-full py-4">'+
                    '<button class="block  border buttonborderradius '+response.defaultstyle.globalCssClass+'" id="button' + response.id + '" style="'+inlineCssStyle+'" >'+response.defaultstyle.globalText+'</button>' +
                    '</div></div>'+
                    '<div class="w-full flex bg-gray-100 p-2 rounded">' +
                    '<div class="w-1/2 px-2 text-xs tracking-wide font-medium">' +
                    '<label class="" for="borderradius' + response.id +  '"> Corners</label>' +
                    '<input type="range" min="0" max="100" value="'+response.defaultstyle.globalCorner+'" class="slider block w-full my-2 borderradius" id="borderradius' + response.id + '">' +
                    '<label class="" for="paddingx' +  response.id + '"> Padding X</label>' +
                    '<input name="paddingx" type="range" min="0" max="75" value="'+response.defaultstyle.globalPaddingX+'" class="slider block w-full my-2 paddingx" id="paddingx' + response.id + '">' +
                    '<label class="" for="paddingy' + response.id + '"> Padding Y</label>' +
                    '<input name="paddingy" type="range" min="0" max="75" value="'+response.defaultstyle.globalPaddingY+'" class="slider block w-full my-2 paddingy" id="paddingy' + response.id + '">' +
                    '<div class="flex"><div class="w-1/2">'+
                    '<lable class="block mb-2" for="color-' + response.id + '">Background Colour</lable>' +
                    '<input class="bgcolor" id="color-' + response.id + '" name="color-' + response.id + '" value="'+response.defaultstyle.globalBgColor+'" type="color">' +
                    '</div><div class="w-1/2">'+
                    '<lable class="block mb-2" for="tcolor-' + response.id + '">Text Colour</lable>' +
                    '<input  class="textcolor" id="tcolor-' + response.id + '" name="tcolor-' + response.id + '" value="'+response.defaultstyle.globalTextColor+'" type="color">' +
                    "</div></div></div>" +
                    '<div class="w-1/2 px-2 text-xs tracking-wide font-medium">'+
                    '<lable class="block mb-2" for="bottontext' + response.id + '">Text</lable>' +
                    '<input name="buttontext" class="border p-2 bottontext rounded w-full " value="'+response.defaultstyle.globalText+'" id="bottontext' + response.id + '">' +
                    '<lable class="block my-2" for="buttontracking' + response.id + '">Tracking</lable>' +
                    '<input name="buttontracking" min="0" max="40" value="'+response.defaultstyle.globalTracking+'" class="slider block w-full my-2 buttontracking" type="range" value="" id="buttontracking' + response.id + '">' +
                    '<lable class="block my-2" for="buttonfontsize' + response.id + '">Size</lable>' +
                    '<input name="buttonfontsize" min="10" max="65"  class="slider block w-full my-2 buttonfontsize" type="range" value="'+response.defaultstyle.globalSize+'" id="buttonfontsize' + response.id + '">' +
                    '<label class="mb-2" for="cssclass' + response.id + '">Css Class (Optional)</label>'+
                    '<input type="text" name="cssclass" class="w-full cssclass" id="cssclass' + response.id + '" value="'+response.defaultstyle.globalCssClass+'">'+
                    "</div></div>" +
                    '<div class="w-full text-xs tracking-wide front-medium flex justify-end">' +
                    '<div class="mr-2"><button class="rounded flex ml-auto mr-0 px-8 py-2 mt-2 bg-blue-900 text-white text-xs tracking-wide font-medium delete" id="delete'+ response.id +'">Delete</button></div>' +
                    '<div class=""><button class="rounded flex ml-auto mr-0 px-8 py-2 mt-2 bg-blue-900 text-white text-xs tracking-wide font-medium save" id="save'+ response.id +'">Save</button></div>' +
                    '</div>' +
                    '<div class="w-full px-2 text-xs tracking-wide front-medium"></div>'+
                    "</div></div>";

                jQuery("#wordpress-default-setting-area .wp-appender").prepend(row);
            },
        });
    });

    // Get all the shortcodes and Print it
    jQuery.ajax({
        url: ajaxurl,
        type: "post",
        dateType: "json",
        data: {
            action: "get_all_shortcodes",
            nonce: jQuery("#awraqnonce").val(),
        },

        error: function (xhr, textStatus, errorThrown) {
            console.log("Ajax Error");
        },

        success: function (response) {
            response = JSON.parse(response);
            

            //TODO: add a conditional block to check if the response is null or not , if not null then show the data

            response.forEach(function (value, index, array) {
                
                var forms = value["forms"];
                var forms_select_options = "";

                for (const [key, value] of Object.entries(forms)) {
                    forms_select_options +=
                        '<option value="' + key + '">' + key + " - " + value + "</option>";
                }

                var postmeta = value["postmeta"];
               

                //preparing the data



                var style = 'border-radius:'+postmeta.borderradiusvalue+'px;'+
                    'padding:'+ postmeta.paddingyvalue+'px '+ postmeta.paddingxvalue +'px;'+
                    'background-color:'+ postmeta.buttonbgcolor +';'+
                    'color:'+postmeta.buttontextcolor+';'+
                    'letter-spacing:' + postmeta.buttontracking + 'px;'+
                    'font-size:' +postmeta.buttonfontsize +'px;';
                var buttonTextPrep;
                if(postmeta.buttontext){
                    buttonTextPrep = postmeta.buttontext;
                }else{
                    buttonTextPrep = 'Button';
                }

				
                var row =
                    '<div class="row  w-full flex  relative z-30 rounded-sm shadow mt-2 items-center bg-white row'+ value.id +'" >' +
					'<div class="table-def text-center shortcode"><input type="text" name="sshortcode" class="bg-gray-200 rounded px-6 py-2 toclipboard" value=\''+ value.short_code +'\'><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline ml-2 text-gray-400 cursor-pointer copier" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg><div class="tool-tip hidden"></div></div>' +
					
                    '<div class="table-def text-center">' +
                    '<select name="selected_form" class="contact-7-selected">' + forms_select_options + "</select>" +
                    "</div>" +
                    '<div class="p-2 drawer-handle cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current w-4 h-4 text-gray-400 duration-100"><path d="M10 0a10 10 0 110 20 10 10 0 010-20zM2 10a8 8 0 1016 0 8 8 0 00-16 0zm10.54.7L9 14.25l-1.41-1.41L10.4 10 7.6 7.17 9 5.76 13.24 10l-.7.7z"/></svg>' +
                    "</div></div>" +
                    '<div class="drawer  shadow rounded-sm p-2 -mt-1 pt-4 hidden transform duration-100 row'+ value.id +'" id="' + value.id + '">'+
                    '<div class="w-full flex">'+
                    '<div class="w-full py-4">'+
                    '<button class="block px-8 py-4 border buttonborderradius" id="button' + value.id + '" style="'+style+'">'+ buttonTextPrep +'</button>' +
                    '</div></div>'+
                    '<div class="w-full flex bg-gray-100 p-2 rounded">' +
                    '<div class="w-1/2 px-2 text-xs tracking-wide font-medium">' +
                    '<label class="" for="borderradius' + value.id +  '"> Corners</label>' +
                    '<input type="range" min="0" max="100" value="'+postmeta.borderradiusvalue+'" class="slider block w-full my-2 borderradius" id="borderradius' + value.id + '">' +
                    '<label class="" for="paddingx' +  value.id + '"> Padding X</label>' +
                    '<input name="paddingx" type="range" min="0" max="75" value="'+postmeta.paddingxvalue+'" class="slider block w-full my-2 paddingx" id="paddingx' + value.id + '">' +
                    '<label class="" for="paddingy' + value.id + '"> Padding Y</label>' +
                    '<input name="paddingy" type="range" min="0" max="75" value="'+postmeta.paddingyvalue+'" class="slider block w-full my-2 paddingy" id="paddingy' + value.id + '">' +
                    '<div class="flex"><div class="w-1/2">'+
                    '<lable class="block mb-2" for="color-' + value.id + '">Background Colour</lable>' +
                    '<input  class="bgcolor" id="color-' + value.id + '" name="color-' + value.id + '" value="'+postmeta.buttonbgcolor+'" type="color">' +
                    '</div><div class="w-1/2">'+
                    '<lable class="block mb-2" for="tcolor-' + value.id + '">Text Colour</lable>' +
                    '<input  class="textcolor" id="tcolor-' + value.id + '" name="tcolor-' + value.id + '" value="'+postmeta.buttontextcolor+'" type="color">' +
                    "</div></div></div>" +
                    '<div class="w-1/2 px-2 text-xs tracking-wide font-medium">' +
                    '<lable class="block mb-2" for="bottontext' + value.id + '">Text</lable>' +
                    '<input name="buttontext" class="border p-2 bottontext rounded w-full " value="'+postmeta.buttontext+'" id="bottontext' + value.id + '">' +
                    '<lable class="block my-2" for="buttontracking' + value.id + '">Tracking</lable>' +
                    '<input name="buttontracking" min="0" max="40" value="'+postmeta.buttontracking+'" class="slider block w-full my-2 buttontracking" type="range" value="" id="buttontracking' + value.id + '">' +
                    '<lable class="block my-2" for="buttonfontsize' + value.id + '">Size</lable>' +
                    '<input name="buttonfontsize" min="10" max="65"  class="slider block w-full my-2 buttonfontsize" type="range" value="'+postmeta.buttonfontsize+'" id="buttonfontsize' + value.id + '">' +
                    '<label class="mb-2" for="cssclass' + value.id + '">Css Class (Optional)</label>'+
                    '<input type="text" name="cssclass" class="w-full cssclass" id="cssclass' + value.id + '" value="'+postmeta.buttoncssclass+'">' +
                    "</div></div>" +
                    '<div class="w-full text-xs tracking-wide front-medium flex justify-end">' +
                    '<div class="mr-2"><button class="rounded flex ml-auto mr-0 px-8 py-2 mt-2 bg-blue-900 text-white text-xs tracking-wide font-medium delete" id="delete'+ value.id +'">Delete</button></div>' +
                    '<div class=""><button class="rounded flex ml-auto mr-0 px-8 py-2 mt-2 bg-blue-900 text-white text-xs tracking-wide font-medium save" id="save'+ value.id +'">Save</button></div>' +
                    '</div>' +
                    "</div></div>";

                jQuery("#wordpress-default-setting-area .wp-appender").append(row);
            });
        },
    });

    /**
     * This to auto-load all the products and associate button list on woo section 
     */
    jQuery.ajax({

        url: ajaxurl,
        type: "post",
        dateType: "json",
        data: {
            action: "get_all_products",
            nonce: jQuery("#awraqnonce").val(),
        },

        error: function (xhr, textStatus, errorThrown) {
            console.log("Ajax Error");
        },

        success: function(presponse){

            presponse = JSON.parse(presponse);

            if(presponse != false){
				
                presponse.forEach(function(value, index, array){

                    var buttons = value["options"];
                    var selectOptions = "";
					var isChecked = '';

					

					if (value.button != false) {
						buttonSelected = parseInt(value.button.buttonid);
						if (value.button.buttonstatus == true) {
							isChecked = 'checked';
						}
					} else {
						buttonSelected = false;
					}

					

					for (const [key, value] of Object.entries(buttons)) {
						var selected = '';

						if (value.id == buttonSelected) {
							selected = 'selected';
						}

                        selectOptions +='<option value="'+value.id+'"'+selected+'>' + value.short_code + '</option>';
                    }


				



                    var row =
                        '<div class="row  w-full flex  relative z-30 rounded-sm shadow mt-2 items-center items-center bg-white row'+ value.id +'"  pid="'+ value.id +'">' +
                        '<div class="md:w-2/5 p-2 text-left product-title"><span class="rounded-full bg-blue-100 text-blue-900 font-bold px-2 mr-1 py-1">'+value.id+'</span>' + value.title + "</div>" +
                        '<div class="md:w-1/5 text-center">' +
                        '<select name="selected_button" class="w-full code button-selected border border-gray-500 ">' + selectOptions + "</select>" +
                        '</div>' +
                      
                        '<div class=" md:w-1/5 p-2 drawer-handle cursor-pointer text-center"><input type="checkbox"  class="rounded flex ml-auto mr-0 px-8 py-2 mt-2 bg-blue-900 text-white text-xs tracking-wide font-medium psave p-'+value.id+'" '+isChecked+'>'
                        '</div></div>';
                    jQuery("#woo-default-setting-area .woo-appender").append(row);
                });

            }
        }
    });

})(jQuery);
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