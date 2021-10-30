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
					<div class="my-2 border-b py-3 px-6 flex items-center justify-between">
						<label class="text-xs tracking-wide font-medium" for="enable-wordpress-id"><span>' . __('Enable for Wordpress Pages and Posts.', 'aavoya-woocommerce-request-a-quote') . '</label>
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
	 * @return mixed
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
					<div class="my-2 border-b py-3 px-6 flex items-center justify-between">
						<label class="text-xs tracking-wide font-medium" for="enable-woo-id"><span>' . __('Enable for Woocommerce.', 'aavoya-woocommerce-request-a-quote') . '</label>
						<input class="enable-woo-class" id="enable-woo-id" name="enable-woo" type="checkbox"' . $checked . '>
					</div>
					<div class="py-2 px-2 woo-form-map-table">
						<div id="woo-default-setting-area" class="' . $hidden . ' relative ">
							<div class="woo-appender">';
		if (aavoyaWooCom != true) {
			$html .= 'Woo Not Installed';
		}

		$html .= '</div></div></div></div>';

		return $html;
	}
}
