<?php

if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}


if (!class_exists('base')) {
	require_once plugin_dir_path(__FILE__) . 'includes/base.php';
}

class aavoya_do_uninstall extends base{

	public function __construct(){
		$this->aavoya_delete_init();
	}

	public function aavoya_delete_init(){
		
		/**
		 * creating object with the help load method 
		 */
		$avoya_wraq_unistall_steps = $this->load('aavoya_wraquninstall');

		/**
		 * Deleting all posts(Buttons)
		 */
		$avoya_wraq_unistall_steps->delete_aavoya_wraq_posts();

		/**
		 * removing button post type 
		 */
		$avoya_wraq_unistall_steps->delete_aavoya_wraq_post_type();
		
		/**
		 * removing global setting data(button styling)
		 */
		$avoya_wraq_unistall_steps->delete_aavoya_global_settings();

		
	}



}
/**
 * create a object of above class to invoke the constructor function 
 */
$aavoya_do_uninstall = new aavoya_do_uninstall();
