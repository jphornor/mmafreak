/**
 * This file holds the main javascript functions needed to improve the nesia mega menu backend
 *
 * @author	Onnay Okheng
 * @copyright	Copyright ( c ) Onnay Okheng
 * @link	http://onnayokheng.com
 * @link	http://nesia.me
 * @since	Version 1.0
 * @package 	NesiaFramework
 */

(function($)
{
	var nesia_mega_menu = {
	
		recalcTimeout: false,
	
		// bind the click event to all elements with the class nesia_uploader 
		bind_click: function()
		{
			var megmenuActivator = $('.menu-item-nesia-megamenu', '#menu-to-edit');
				
				megmenuActivator.live('click', function()
				{	
					var checkbox = $(this),
						container = checkbox.parents('.menu-item:eq(0)');
				
					if(checkbox.is(':checked'))
					{
						container.addClass('nesia_mega_active');
					}
					else
					{
						container.removeClass('nesia_mega_active');
					}
					
					//check if anything in the dom needs to be changed to reflect the (de)activation of the mega menu
					nesia_mega_menu.recalc();
					
				});
		},
		
		recalcInit: function()
		{
			$( ".menu-item-bar" ).live( "mouseup", function(event, ui) 
			{
				if(!$(event.target).is('a'))
				{
					clearTimeout(nesia_mega_menu.recalcTimeout);
					nesia_mega_menu.recalcTimeout = setTimeout(nesia_mega_menu.recalc, 500);  
				}
			});
		},
		
		
		recalc : function()
		{
			menuItems = $('.menu-item', '#menu-to-edit');
			
			menuItems.each(function(i)
			{
				var item = $(this),
					megaMenuCheckbox = $('.menu-item-nesia-megamenu', this);
				
				if(!item.is('.menu-item-depth-0'))
				{
					var checkItem = menuItems.filter(':eq('+(i-1)+')');
					if(checkItem.is('.nesia_mega_active'))
					{
						item.addClass('nesia_mega_active');
						megaMenuCheckbox.attr('checked','checked');
					}
					else
					{
						item.removeClass('nesia_mega_active');
						megaMenuCheckbox.attr('checked','');
					}
				}				
				
				
				
				
				
			});
			
		},
		
		//clone of the jqery menu-item function that calls a different ajax admin action so we can insert our own walker
		addItemToMenu : function(menuItem, processMethod, callback) {
			var menu = $('#menu').val(),
				nonce = $('#menu-settings-column-nonce').val();

			processMethod = processMethod || function(){};
			callback = callback || function(){};

			params = {
				'action': 'nesia_ajax_switch_menu_walker',
				'menu': menu,
				'menu-settings-column-nonce': nonce,
				'menu-item': menuItem
			};

			$.post( ajaxurl, params, function(menuMarkup) {
				var ins = $('#menu-instructions');
				processMethod(menuMarkup, params);
				if( ! ins.hasClass('menu-instructions-inactive') && ins.siblings().length )
					ins.addClass('menu-instructions-inactive');
				callback();
			});
		}

};
	

	
	$(function()
	{
		nesia_mega_menu.bind_click();
		nesia_mega_menu.recalcInit();
		nesia_mega_menu.recalc();
		if(typeof wpNavMenu != 'undefined'){ wpNavMenu.addItemToMenu = nesia_mega_menu.addItemToMenu; }
 	});

	
})(jQuery);	 