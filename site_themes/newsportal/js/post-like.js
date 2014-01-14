jQuery(document).ready(function() {

	jQuery("a.vote-it").click(function(){
	
		heart = jQuery(this);
	
		post_id = heart.data("post_id");
		
		jQuery.ajax({
			type: "post",
			url: nesia_ajax_var.url,
			data: "action=post-like&nonce="+nesia_ajax_var.nonce+"&post_like=&post_id="+post_id,
			success: function(count){
				if(count != "already"){
					heart.addClass("voted");
                                        heart.children('.count-voted').text(count);
				} else {
                                        alert(nesia_ajax_var.error_message);
                                }
			}
		});
		
		return false;
	});
});