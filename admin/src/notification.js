
/**
     * Create positive message with deep blue color
     * @param textToShow - this to have message text that will get added
     */
 function createPositiveMessage(textToShow) {
	var message = '<div class="modal z-40 bottom-0 right-0 fixed  overflow-y-auto w-96">'+
		'<div class="bg-white border border-gray-100  m-4 rounded shadow ">'+
		'<svg class="w-8 h-8 text-blue-800 float-right -mr-3 -mt-3 bg-white rounded-full close cursor-pointer shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'+
		'<div class="modal-body  modal-body overflow-hidden rounded "><div class="border-l-8 border-blue-900 p-4"><span class="block">'+ textToShow +'</span></div></div>'+
		'</div><script>jQuery(".close").on("click",function(){jQuery(this).parent().parent().remove();});</script>' +
		'</div>';

	jQuery('.message-area').prepend(message);

}

/**
 * Create negative message with red colors
 * @param textToShow - this to have message text that will get added
 */
function createNegativeMessage(textToShow){
	var message = '<div class="modal z-40 bottom-0 right-0 fixed  overflow-y-auto w-96">'+
		'<div class="bg-white border border-gray-100  m-4 rounded shadow ">'+
		'<svg class="w-8 h-8 text-red-600 float-right -mr-3 -mt-3 bg-white rounded-full close cursor-pointer shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'+
		'<div class="modal-body  modal-body overflow-hidden rounded "><div class="border-l-8 border-red-600 p-4"><span class="block">'+ textToShow + '</span></div></div>'+
		'</div><script>jQuery(".close").on("click",function(){jQuery(this).parent().parent().remove();});</script>' +
		'</div>';
	jQuery('.message-area').prepend(message);
}

