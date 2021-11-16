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
function createDefaultData(){

	$globaldata['globalBgColor'] 	= '#1e3a8a';
	$globaldata['globalTextColor'] 	= '#ffffff';
	$globaldata['globalCorner'] 	= 8;
	$globaldata['globalPaddingX'] 	= 30;
	$globaldata['globalPaddingY'] 	= 10;
	$globaldata['globalSize'] 		= 21;
	$globaldata['globalTracking'] 	= 6;
	$globaldata['globalText'] 		= 'Button';
	$globaldata['globalCssClass'] 	= 'aavoya-wraq-btn';

	return serialize($globaldata);
}
