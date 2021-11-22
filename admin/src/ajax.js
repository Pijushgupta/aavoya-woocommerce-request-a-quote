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
				
				console.log(response.style);
                var forms_select_options = "";

                for (const [key, value] of Object.entries(forms_select_obj)) {
                    forms_select_options +=
                        '<option value="' + key + '">' + key + " - " + value + "</option>";
                }
				var inlineCssStyle = 'border-radius:' + response.style.borderradiusvalue + 'px; padding:' + response.style.paddingyvalue + 'px ' + response.style.paddingxvalue + 'px; background-color:' + response.style.buttonbgcolor + '; color:' + response.style.buttontextcolor + '; letter-spacing:' + response.style.buttontracking + 'px; text-size:' + response.style.buttonfontsize + 'px;';
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
                    '<button class="block  border buttonborderradius '+response.style.buttoncssclass+'" id="button' + response.id + '" style="'+inlineCssStyle+'" >'+response.style.buttontext+'</button>' +
                    '</div></div>'+
                    '<div class="w-full flex bg-gray-100 p-2 rounded">' +
                    '<div class="w-1/2 px-2 text-xs tracking-wide font-medium">' +
                    '<label class="" for="borderradius' + response.id +  '"> Corners</label>' +
                    '<input type="range" min="0" max="100" value="'+response.style.borderradiusvalue+'" class="slider block w-full my-2 borderradius" id="borderradius' + response.id + '">' +
                    '<label class="" for="paddingx' +  response.id + '"> Padding X</label>' +
                    '<input name="paddingx" type="range" min="0" max="75" value="'+response.style.paddingxvalue+'" class="slider block w-full my-2 paddingx" id="paddingx' + response.id + '">' +
                    '<label class="" for="paddingy' + response.id + '"> Padding Y</label>' +
                    '<input name="paddingy" type="range" min="0" max="75" value="'+response.style.paddingyvalue+'" class="slider block w-full my-2 paddingy" id="paddingy' + response.id + '">' +
                    '<div class="flex"><div class="w-1/2">'+
                    '<lable class="block mb-2" for="color-' + response.id + '">Background Colour</lable>' +
                    '<input class="bgcolor" id="color-' + response.id + '" name="color-' + response.id + '" value="'+response.style.buttonbgcolor+'" type="color">' +
                    '</div><div class="w-1/2">'+
                    '<lable class="block mb-2" for="tcolor-' + response.id + '">Text Colour</lable>' +
                    '<input  class="textcolor" id="tcolor-' + response.id + '" name="tcolor-' + response.id + '" value="'+response.style.buttontextcolor+'" type="color">' +
                    "</div></div></div>" +
                    '<div class="w-1/2 px-2 text-xs tracking-wide font-medium">'+
                    '<lable class="block mb-2" for="bottontext' + response.id + '">Text</lable>' +
                    '<input name="buttontext" class="border p-2 bottontext rounded w-full " value="'+response.style.buttontext+'" id="bottontext' + response.id + '">' +
                    '<lable class="block my-2" for="buttontracking' + response.id + '">Tracking</lable>' +
                    '<input name="buttontracking" min="0" max="40" value="'+response.style.buttontracking+'" class="slider block w-full my-2 buttontracking" type="range" value="" id="buttontracking' + response.id + '">' +
                    '<lable class="block my-2" for="buttonfontsize' + response.id + '">Size</lable>' +
                    '<input name="buttonfontsize" min="10" max="65"  class="slider block w-full my-2 buttonfontsize" type="range" value="'+response.style.buttonfontsize+'" id="buttonfontsize' + response.id + '">' +
                    '<label class="mb-2" for="cssclass' + response.id + '">Css Class (Optional)</label>'+
                    '<input type="text" name="cssclass" class="w-full cssclass" id="cssclass' + response.id + '" value="'+response.style.buttoncssclass+'">'+
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
                        '<div class="row  w-full flex  justify-between relative z-30 rounded-sm shadow mt-2 items-center items-center bg-white row'+ value.id +'"  pid="'+ value.id +'">' +
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