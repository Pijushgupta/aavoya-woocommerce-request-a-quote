<?php

class aavoya_wraquninstall(){

	function __construct(){

	}
	
	/**
	 * delete_aavoya_wraq_posts
	 * This method will delete all the posts created by this plugin
	 * @return void
	 */
	public function delete_aavoya_wraq_posts(){

		/**
		 * below array of arguments is used to get all shortcodes 
		 * from custom post type of "aavoya_wraq"
		 */
		$argument = array(
			'post_type' => 'aavoya_wraq',
			'post_per_page' => -1,
			'numberposts' => -1

		);

		/**
		 * getting all the buttons(posts)
		 */
		$shortcodes = get_posts($argument);

		/**
		 * deleting buttons
		 */
		foreach ($shortcodes as $shortcode) {
			wp_delete_post($shortcode->ID, true);
		}


	}

	
	/**
	 * delete_aavoya_wraq_post_type
	 * More information: https://developer.wordpress.org/reference/functions/unregister_post_type/
	 * @return boolean
	 */
	public function delete_aavoya_wraq_post_type(){
		return unregister_post_type('aavoya_wraq');
	}

	
	/**
	 * delete_aavoya_global_settings
	 * More information : https://developer.wordpress.org/reference/functions/delete_option/
	 * @return boolean
	 */
	public function delete_aavoya_global_settings(){
		return delete_option('aavoya_wraq_global_settings');
	}
}