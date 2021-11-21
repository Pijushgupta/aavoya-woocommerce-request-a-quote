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
	//TODO: fix the nemes accondingly local vars
	//


	$globaldata['globalbuttonbgcolor']			= '#1e3a8a';
	$globaldata['globalbuttontextcolor']		= '#ffffff';
	$globaldata['globalborderradiusvalue']		= 8;
	$globaldata['globalpaddingxvalue']			= 30;
	$globaldata['globalpaddingyvalue']			= 10;
	$globaldata['globalbuttonfontsize']			= 21;
	$globaldata['globalbuttontracking']			= 6;
	$globaldata['globalbuttontext']				= 'Button';
	$globaldata['globalbuttoncssclass']			= 'aavoya-wraq-btn';

	return serialize($globaldata);
}
