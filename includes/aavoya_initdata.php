<?php
if (!defined('ABSPATH')) {
	exit;
}

/**
 * adding default data(option - css) incase its not present in database.
 */
if (get_option('aavoya_wraq_global_settings', false) == false) {
	update_option('aavoya_wraq_global_settings', createDefaultData());
}


/**
 * preparing default data
 */
function createDefaultData()
{
	$globaldata['globalbuttonbgcolor']			= sanitize_hex_color('#1e3a8a');
	$globaldata['globalbuttontextcolor']		= sanitize_hex_color('#ffffff');
	$globaldata['globalborderradiusvalue']		= intval(8);
	$globaldata['globalpaddingxvalue']			= intval(30);
	$globaldata['globalpaddingyvalue']			= intval(10);
	$globaldata['globalbuttonfontsize']			= intval(21);
	$globaldata['globalbuttontracking']			= intval(6);
	$globaldata['globalbuttontext']				= sanitize_text_field('Button');
	$globaldata['globalbuttoncssclass']			= sanitize_html_class('aavoya-wraq-btn');

	return serialize($globaldata);
}
