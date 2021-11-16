<?php
if (!defined('ABSPATH')) {
	exit;
}

class aavoya_wraquif extends base
{


	public function __construct()
	{
	}

	/**
	 * form
	 * 
	 * @return mixed
	 */
	public function form()
	{
		if (get_option('wraqwp') == true) {
			$checked = 'checked';
			$hidden = '';
		} else {
			$checked = '';
			$hidden = 'hidden';
		}

		return '<div class="wordpress-form-area">
					<div class="mt-2 border-b border-gray-100 py-3 px-6 flex items-center justify-between">
						<label class="text-xs tracking-wide font-medium" for="enable-wordpress-id"><span>' . __('Enable Buttons.', 'aavoya-woocommerce-request-a-quote') . '</label>
						<input class="enable-wordpress-class" id="enable-wordpress-id" name="enable-wordpress" type="checkbox" ' . $checked . '>
					</div>
					<div class="py-2 px-2 wp-form-map-table">
						<div id="wordpress-default-setting-area" class="' . $hidden . ' relative ">

							<div class="wp-appender">
							</div>
							
							<button class="wpadder rounded flex ml-auto mr-0 px-8 py-2 mt-2 bg-blue-900 text-white text-xs tracking-wide font-medium ">Add New</button>
						</div>
						
					</div>
				</div>';
	}

	/**
	 * woo_form
	 * 
	 * @return mixed $html
	 */
	public function woo_form()
	{
		if (get_option('wraqwo')) {
			$checked = 'checked';
			$hidden = '';
		} else {
			$checked = '';
			$hidden = 'hidden';
		}
		$html =  '<div class="woo-form-area">
					<div class="mt-2 border-b border-gray-100 py-3 px-6 flex items-center justify-between">
						<label class="text-xs tracking-wide font-medium" for="enable-woo-id"><span>' . __('Enable for Woocommerce.', 'aavoya-woocommerce-request-a-quote') . '</label>
						<input class="enable-woo-class" id="enable-woo-id" name="enable-woo" type="checkbox"' . $checked . '>
					</div>
					<div class="py-2 px-2 woo-form-map-table">
						<div id="woo-default-setting-area" class="' . $hidden . ' relative ">
							<div class="woo-appender">';
		if (aavoyaWooCom != true) {
			$html .= 'WooCommerce Not Installed';
		}

		$html .= '</div></div></div></div>';

		return $html;
	}

	/**
	 * awarq_setting
	 * This method to provide a global setting area  
	 * 
	 * @return mixed $html
	 */
	public function awarq_setting()
	{
		$globalStyleArray = aavoya_get_global_data();

		$html = '<div class="setting-area">

					<div class="mt-2 border-b border-gray-100 py-3 px-6 flex items-center justify-between">
						<label class="text-xs tracking-wide font-medium" for="enable-woo-id"><span>' . __('Settings', 'aavoya-woocommerce-request-a-quote') . '</label>
					</div>

					<div class="py-2 px-2 woo-form-map-table">
						<div id="woo-default-setting-area" class="relative ">
							<div class="setting-appender">
								<div class="w-full flex flex-row realtive z-30 rounded-sm flex-wrap mt-2 bg-white setting-row">
									<div class="setting-col p-1 md:w-1/2">
										<lebel for="global-corner">' . __('Corners', 'aavoya-woocommerce-request-a-quote') . '</lebel>
										<input type="range" name="corners" id="global-corner" max="100" mix="0" value="' . $globalStyleArray['globalCorner'] . '">
									</div>
									<div class="setting-col p-1 md:w-1/2">
										<label class="block" for="global-b-text">' . __('Text', 'aavoya-woocommerce-request-a-quote') . '</label>
										<input class="w-full" type="text" id="global-b-text" name="buttontext" value="' . $globalStyleArray['globalText'] . '">
									</div>
									<div class="setting-col p-1 md:w-1/2">
										<label for="global-padding-x">' . __('Padding X', 'aavoya-woocommerce-request-a-quote') . '</label>
										<input type="range" name="global-padding-x" id="global-padding-x" max="100" mix="0" value="' . $globalStyleArray['globalPaddingX'] . '">
									</div>
									<div class="setting-col p-1 md:w-1/2">
										<label for="global-padding-y">' . __('Padding Y', 'aavoya-woocommerce-request-a-quote') . '</label>
										<input type="range" name="global-padding-y" id="global-padding-y" max="100" mix="0" value="' . $globalStyleArray['globalPaddingY'] . '">
									</div>
									
									<div class="setting-col p-1 md:w-1/2">
										<label for="global-size">' . __('Size', 'aavoya-woocommerce-request-a-quote') . '</lebel>
										<input type="range" name="global-size" id="global-size" max="100" mix="0" value="' . $globalStyleArray['globalSize'] . '"> 
									</div>
									<div class="setting-col p-1 md:w-1/2">
										<label for="global-tracking">' . __('Tracking', 'aavoya-woocommerce-request-a-quote') . '</lebel>
										<input type="range" name="global-tracking" id="global-tracking" max="100" mix="0" value="' . $globalStyleArray['globalTracking'] . '"> 
									</div>
									<div class="setting-col p-1 md:w-1/2 flex flex-wrap flex-row">
										<div class="sub-setting-col  md:w-1/2">
											<label class="block" forn="global-background-color">' . __('Background Color', 'aavoya-woocommerce-request-a-quote') . '</label>
											<input type="color" name="global-background-color" id="global-background-color" value="' . $globalStyleArray['globalBgColor'] . '">
										</div>
										<div class="sub-setting-col md:w-1/2">
											<label class="block" for="global-text-color">' . __('Text color', 'aavoya-woocommerce-request-a-quote') . '</label>
											<input type="color" name="global-text-color" id="global-text-color" value="' . $globalStyleArray['globalTextColor'] . '">
										</div>
									</div>
									<div class="setting-col p-1 md:w-1/2">
										<label class="block" for="global-css-class">' . __('Css class', 'aavoya-woocommerce-request-a-quote') . '</label>
										<input class="w-full" type="text" name="global-css-class" id="global-css-class" value="' . $globalStyleArray['globalCssClass'] . '">
									</div>
								</div>
								<div class="w-full mt-2 border-t border-gray-100">
									<button class="save-settings rounded flex ml-auto mr-0 px-8 py-2 mt-2 bg-blue-900 text-white text-xs tracking-wide font-medium">' . __('Save', 'aavoya-woocommerce-request-a-quote') . '</button>
								</div>
							</div>
						</div>
					</div>

				</div>';

		return $html;
	}
}
