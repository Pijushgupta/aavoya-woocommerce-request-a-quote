<?php

if (!defined('ABSPATH')) {
	exit;
}

class aavoya_wraqui extends base
{

	/**
	 * __construct
	 * Simple Constructor to init methods on object creation 
	 * @return void
	 */
	public function __construct()
	{


		add_action('admin_enqueue_scripts', array($this, 'aavoya_woocommerce_request_a_quote_add_css_js'));
		/* Adding admin menu pages  */
		add_action('admin_menu', array($this, 'aavoya_woocommerce_request_a_quote_admin_menu'));
	}

	/**
	 * aavoya_woocommerce_request_a_quote_add_css_js
	 * Adding Assets like javascript and css
	 * @param  mixed $hook
	 * @return void
	 */
	public function aavoya_woocommerce_request_a_quote_add_css_js($hook)
	{
		if ($hook != 'toplevel_page_aavoya_woocommerce_request_a_quote_setting') {
			return;
		}

		wp_enqueue_style('wordpress-form-css', aavoyaWraqRelative . '/admin/dist/app.css', '', '1', 'all');

		wp_enqueue_script('wordpress-form-js', aavoyaWraqRelative . '/admin/dist/app.js', array('jquery'), '1', true);
	}

	/**
	 * aavoya_woocommerce_request_a_quote_admin_menu
	 * Creting the admin menu
	 * @return void
	 */
	public function aavoya_woocommerce_request_a_quote_admin_menu()
	{

		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have sufficient permissions to access this page.', 'aavoya-woocommerce-request-a-quote'));
		}

		add_menu_page(
			__('Hyper Request a Quote', 'aavoya-woocommerce-request-a-quote'),
			__('Hyper RAQ', 'aavoya-woocommerce-request-a-quote'),
			'manage_options',
			'aavoya_woocommerce_request_a_quote_setting',
			array($this, 'aavoya_woocommerce_request_a_quote_show_default_page'),
			'dashicons-clipboard',
			20
		);
	}

	/**
	 * aavoya_woocommerce_request_a_quote_show_default_page
	 * Adding items to the default backend page 
	 * @return void
	 */
	public function aavoya_woocommerce_request_a_quote_show_default_page()
	{
		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have sufficient permissions to access this page.', 'aavoya-woocommerce-request-a-quote'));
		}

?>
		<input type="hidden" name="awraq_nonce" id="awraqnonce" value="<?php echo wp_create_nonce("awraq_nonce"); ?>">
		<header class="header">
			<div class="header-item">
				<svg xmlns="http://www.w3.org/2000/svg" class="fill-current h-8 w-8 text-white mr-3" viewBox="0 0 490.163 490.163">
					<path d="M418.381 71.783C372.091 25.494 310.546 0 245.082 0 179.617 0 118.073 25.494 71.783 71.783 25.494 118.073 0 179.618 0 245.082S25.494 372.09 71.783 418.38c46.29 46.289 107.834 71.782 173.299 71.782 65.464 0 127.009-25.493 173.299-71.782 46.289-46.29 71.782-107.835 71.782-173.299S464.67 118.073 418.381 71.783zm-173.299 358.38C143.028 430.163 60 347.135 60 245.082S143.028 60 245.082 60c102.054 0 185.081 83.027 185.081 185.081 0 102.054-83.027 185.082-185.081 185.082z" />
					<path d="M291.562 215.082h-92.96v-69.997h-60v199.993h60v-69.996h92.96v69.996h60V145.085h-60z" />
				</svg>
				<span class="title"><strong class="font-bold">Hyper</strong> Request a Quote</span>
			</div>

		</header>

		<!-- this to show warning message -->
		<div class="modal z-40 bottom-0 right-0 fixed  overflow-y-auto w-96 hidden deletewarning" postid="">
			<div class="bg-white border border-gray-100  m-4 rounded shadow ">
				<svg class="w-8 h-8 text-red-600 float-right -mr-3 -mt-3 bg-white rounded-full close cursor-pointer shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				<div class="modal-body  modal-body overflow-hidden rounded ">
					<div class="border-l-8 border-red-600 p-4">

						<div class="flex justify-between items-center mt-1">
							<span class="block text-xs tracking-wide font-medium">Are you sure ?</span>
							<button class="del-yes rounded px-8 py-2  bg-red-500 text-white">Yes</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- ends -->

		<div class="msg-area flex items-center mx-auto max-w-screen-lg py-4 px-4 bg-white shadow mt-4 hidden">
			<div class="p-3 rounded-full bg-blue-200 mr-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="fill-current h-5 w-5 text-blue-900 " viewBox="0 0 408.576 408.576">
					<path d="M204.288 0C91.648 0 0 91.648 0 204.288s91.648 204.288 204.288 204.288 204.288-91.648 204.288-204.288S316.928 0 204.288 0zm114.176 150.528l-130.56 129.536c-7.68 7.68-19.968 8.192-28.16.512L90.624 217.6c-8.192-7.68-8.704-20.48-1.536-28.672 7.68-8.192 20.48-8.704 28.672-1.024l54.784 50.176L289.28 121.344c8.192-8.192 20.992-8.192 29.184 0s8.192 20.992 0 29.184z" />
				</svg>
			</div>
			<div class="text-xs tracking-wide font-medium ">Please <a href="" class="hyperlink">Purchase the Pro</a> version for Unlimited forms and google calender sync</div>

			<div class="ml-auto">
				<svg xmlns="http://www.w3.org/2000/svg" class="no-msg fill-current h-5 w-5 text-blue-900 cursor-pointer" viewBox="0 0 20 20">
					<path d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z" />
				</svg>
			</div>
		</div>
		<div class="message-area">

		</div>

		<div class="container body flex flex-row">
			<div class="top-bar w-1/5 pr-2">
				<ul>
					<li data-target="aavoya-wraq-wordpress" class="aavoya-wraq-tab active ">
						<svg xmlns="http://www.w3.org/2000/svg" class="svg-class" viewBox="0 0 31.125 31.125">
							<path d="M.001 15.563c0 6.159 3.579 11.483 8.771 14.007L1.348 9.23a15.533 15.533 0 00-1.347 6.333zm26.068-.787c0-1.923-.69-3.255-1.283-4.291-.787-1.284-1.528-2.366-1.528-3.649 0-1.429 1.086-2.762 2.613-2.762.068 0 .134.008.203.011A15.513 15.513 0 0015.565 0C10.127 0 5.345 2.79 2.562 7.016c.365.011 3.153-.094 3.153-.094l5.981 18.2 3.406-10.213-2.776-8.073h5.146l5.859 18.158 1.555-5.188c.787-2.022 1.183-3.697 1.183-5.03zm-10.233 2.149l-4.67 13.566a15.59 15.59 0 009.565-.247 1.51 1.51 0 01-.113-.215l-4.782-13.104zm13.382-8.829c.068.496.105 1.027.105 1.602 0 1.578-.297 3.353-1.186 5.572l-4.752 13.743c4.627-2.698 7.737-7.709 7.737-13.45a15.448 15.448 0 00-1.904-7.467z" />
						</svg>
						Buttons
					</li>

					<li data-target="aavoya-wraq-woocommerce" class="aavoya-wraq-tab ">
						<svg xmlns="http://www.w3.org/2000/svg" class="svg-class" viewBox="0 0 456.029 456.029">
							<path d="M345.6 338.862c-29.184 0-53.248 23.552-53.248 53.248 0 29.184 23.552 53.248 53.248 53.248 29.184 0 53.248-23.552 53.248-53.248-.512-29.184-24.064-53.248-53.248-53.248zM439.296 84.91c-1.024 0-2.56-.512-4.096-.512H112.64l-5.12-34.304C104.448 27.566 84.992 10.67 61.952 10.67H20.48C9.216 10.67 0 19.886 0 31.15c0 11.264 9.216 20.48 20.48 20.48h41.472c2.56 0 4.608 2.048 5.12 4.608l31.744 216.064c4.096 27.136 27.648 47.616 55.296 47.616h212.992c26.624 0 49.664-18.944 55.296-45.056l33.28-166.4c2.048-10.752-5.12-21.504-16.384-23.552zM215.04 389.55c-1.024-28.16-24.576-50.688-52.736-50.688-29.696 1.536-52.224 26.112-51.2 55.296 1.024 28.16 24.064 50.688 52.224 50.688h1.024c29.184-1.536 52.224-26.112 50.688-55.296z" />
						</svg>
						Woocommerce
					</li>

					<li data-target="aavoya-setting" class="aavoya-wraq-tab">
						<svg xmlns="http://www.w3.org/2000/svg" class="svg-class" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
						</svg>
						Settings
					</li>

				</ul>
			</div>
			<div class=" w-4/5 aavoya-wraq-tab-body">

				<?php $wordpress_hraq_form_object = $this->load('aavoya_wraquif'); ?>

				<div id="aavoya-wraq-wordpress" class="tab-body-area border w-full  bg-white">
					<?php echo $wordpress_hraq_form_object->form(); ?>
				</div>

				<div id="aavoya-wraq-woocommerce" class="hidden tab-body-area border w-full  bg-white">
					<?php echo $wordpress_hraq_form_object->woo_form(); ?>
				</div>
				<div id="aavoya-setting" class="hidden tab-body-area border w-full  bg-white">
					<?php echo $wordpress_hraq_form_object->awarq_setting(); ?>
				</div>


			</div>


		</div>

<?php
	}
}

$aavoya_woocommerce_request_a_quote_user_interface = new aavoya_wraqui();
