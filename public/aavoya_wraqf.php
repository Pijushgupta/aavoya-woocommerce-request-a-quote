<?php
if (!defined('ABSPATH')) {
	exit;
}
class aavoya_wraqf
{

	public function __construct()
	{
	}


	/**
	 * araqgpm
	 * Provides unserialize post meta of custom post type "aavoya_wraq"
	 * @return void
	 */
	public function araqgpm($post_id = null)
	{

		if ($post_id == null) {
			return false;
		}

		$args = array('post_type' => 'aavoya_wraq', 'p' => $post_id);
		$button = get_posts($args);

		if (!empty($button)) {
			return unserialize(get_post_meta($post_id, 'aavoya_wraq_meta_key', true));
		}
	}

	/**
	 * araqcatc
	 * This to create css from the provided array
	 * @param  mixed $args
	 * @return string $cssAsString
	 */
	public function araqcatc($args = null)
	{
		if ($args == null) {
			return false;
		}

		if (!empty($args) and is_array($args)) {

			$cssAsString = '';

			foreach ($args as $property => $value) {
				switch ($property) {

					case 'borderradiusvalue':
						$cssAsString .= 'border-radius:' . $value . 'px;';
						break;
					case 'paddingxvalue':
						$cssAsString .= 'padding-right:' . $value . 'px;';
						$cssAsString .= 'padding-left:' . $value . 'px;';
						break;
					case 'paddingyvalue':
						$cssAsString .= 'padding-top:' . $value . 'px;';
						$cssAsString .= 'padding-bottom:' . $value . 'px;';
						break;
					case 'buttonbgcolor':
						$cssAsString .= 'background-color:' . $value . ';';
						break;
					case 'buttontextcolor':
						$cssAsString .= 'color:' . $value . ';';
						break;
					case 'buttontext':
						break;
					case 'buttontracking':
						$cssAsString .= 'letter-spacing:' . $value . 'px;';
						break;
					case 'buttonfontsize':
						$cssAsString .= 'font-size:' . $value . 'px;';
						break;
					case 'buttoncssclass':
						break;
					default:
						break;
				}
			}
			return $cssAsString;
		}

		return false;
	}

	/**
	 * araqch
	 * This to create required html of button and popup form 
	 * @return void
	 */
	public function araqch($inlineCss = null, $cssClass = null, $randomValueForJs = null, $buttonText = null, $contact7form = null)
	{

		if ($inlineCss == null  or $randomValueForJs == null or $buttonText == null or $contact7form == null) {
			return false;
		}
		$html = '<p><button style="' . $inlineCss . '" class="ainipopup ' . $cssClass . '" popuptoopen="araq' . $randomValueForJs . '">' . $buttonText . '</button></p>';
		$html .= '<div class="modal contact-7-popup md:w-1/3 w-full  hidden" id="araq' . $randomValueForJs . '"> <div class="bg-white border border-gray-100  m-4 rounded shadow "> <svg class="w-8 h-8 text-red-600 float-right -mr-3 -mt-3 bg-white rounded-full aavoyaclose cursor-pointer shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <div class="modal-body  modal-body overflow-hidden rounded "> <div class="p-4"> ' . do_shortcode('[contact-form-7 id="' . $contact7form . '"]') . '<div class="flex justify-between items-center mt-1"> </div> </div> </div> </div> </div>';

		return $html;
	}
}
