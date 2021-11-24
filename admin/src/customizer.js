(function ($) {


    /**
	 * This to live update the border radius of the sample button by the movement of slider
	 */
    jQuery(".wp-appender").on("change", ".borderradius", function () {
        let borderRadius = jQuery(this).val();
        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css("border-radius", borderRadius + "px");
    });

    /**
	 * this to live update the padding x while using the slider
	 */
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

    /**
	 * this to live update the padding y while using the slider
	 */
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

    /**
	 * This to live update the button text
	 */
    jQuery(".wp-appender").on("keyup", ".bottontext", function () {
        let buttonText = jQuery(this).val();

        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .html(buttonText);
    });

    /**
	 * This to live update the button text tracking
	 */
    jQuery(".wp-appender").on("change", ".buttontracking", function () {
        let buttonTracking = jQuery(this).val();

        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css({"letter-spacing": buttonTracking + "px"});
    });

    /**
	 * this to live update the button text size
	 */
    jQuery(".wp-appender").on("change", ".buttonfontsize", function () {
        let buttonFontSize = jQuery(this).val();

        jQuery(this)
            .parent()
            .parent()
            .parent()
            .find(".buttonborderradius")
            .css({"font-size": buttonFontSize + "px"});
    });

    /**
	 * This to live update the button background color
	 */
    jQuery(".wp-appender").on("change",".bgcolor", function(){
		let buttonBgcolor = jQuery(this).val();

		
		//rgb2hex('rgb(255,251,250)')
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