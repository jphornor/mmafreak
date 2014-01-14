/*jshint eqnull:true */
/*!
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($,document,undefined){var pluses=/\+/g;function raw(s){return s}function decoded(s){return decodeURIComponent(s.replace(pluses," "))}var config=$.cookie=function(key,value,options){if(value!==undefined){options=$.extend({},config.defaults,options);if(value===null)options.expires=-1;if(typeof options.expires==="number"){var days=options.expires,t=options.expires=new Date;t.setDate(t.getDate()+days)}value=config.json?JSON.stringify(value):String(value);return document.cookie=[encodeURIComponent(key),
"=",config.raw?value:encodeURIComponent(value),options.expires?"; expires="+options.expires.toUTCString():"",options.path?"; path="+options.path:"",options.domain?"; domain="+options.domain:"",options.secure?"; secure":""].join("")}var decode=config.raw?raw:decoded;var cookies=document.cookie.split("; ");for(var i=0,parts;parts=cookies[i]&&cookies[i].split("=");i++)if(decode(parts.shift())===key){var cookie=decode(parts.join("="));return config.json?JSON.parse(cookie):cookie}return null};config.defaults=
{};$.removeCookie=function(key,options){if($.cookie(key)!==null){$.cookie(key,null,options);return true}return false}})(jQuery,document);


(function($){
$(document).ready(function(){

  // If Cookie Exists
  // -----------------------
  var settings_cookie = $.cookie('nesia-live-settings'),
      settings_obj;
  if( settings_cookie !== null ) {
    settings_obj = $.parseJSON(settings_cookie);

    // Color Scheme
    if( settings_obj.color_scheme !== undefined ) {
      $('#nesia-alt-stylesheet').attr('href', settings_obj.color_scheme);
    }

    // Body Class
    if( settings_obj.bodyclass !== undefined ) {
      $('body').addClass( settings_obj.bodyclass.replace(/\+/g,' ') );
    }
  }


  // Color Skin Switcher
  // -----------------------
  $('.skin-switcher a').click(function(e){
    e.preventDefault();
    var $el         = $(this),
        $stylesheet = $('#nesia-alt-stylesheet'),
        style_url   = $el.attr('href');

    $el.addClass('active').siblings().removeClass('active');

    // Check if custom stylesheet exist
    if( $stylesheet.length > 0 ) {
      $stylesheet.attr('href', style_url);
    }

    $el.parent('div').find(':hidden').val(style_url);
  });

  // Body Class adder
  // -----------------------
  $('.control-checkbox input').change(function(){
    var $el = $(this),
        $body = $('body'),
        data_enabled = $el.data('enabled'),
        data_disabled = $el.data('disabled'),
        $parent = $el.parents('.control-checkbox'),
        input = $parent.find('input:hidden'),
        input_data;

    if ($el.prop('checked')) {
      input_data = data_enabled || '';
      if(data_enabled !== undefined) $body.addClass(data_enabled);
      if(data_disabled !== undefined) $body.removeClass(data_disabled);
    } else {
      input_data = data_disabled || '';
      if(data_enabled !== undefined) $body.removeClass(data_enabled);
      if(data_disabled !== undefined) $body.addClass(data_disabled);
    }

    input.val(input_data);
  });
  
  // Font Changer
  // -----------------------
  $('.font-changer').change(function(){
    var $el = $(this),
        $parent = $el.parents('.control-selectbox'),
        input = $parent.find('input:hidden');
    input.val( $el.val() );
  });


  // Apply Settings
  // -----------------------
  $('.nesia-live-settings .settings-button').click(function(e){
    e.preventDefault();
    $.ajax({
      url: window.location.href,
      type: 'post',
      data: $('.nesia-live-settings form').serialize() + '&nesia-settings=Apply Settings',
      success: function() {
        window.location.href = window.location.href;
      }
    })
  });

  // Header Pattern Changer
  // -----------------------
  $('.pattern-changer').change(function(){
    console.log($(this).val());
    $('.pat-a .pattern-container').css('background-image', 'url(' + $(this).val() + ')');
  });

  // Show hide settings
  // -----------------------
  $('.openclose-settings').click(function(){
    var $el = $(this),
        $parent = $el.parent();

    if( $parent.hasClass('display_hide') ) {
      $parent.animate({left: 0});
      $parent.removeClass('display_hide').addClass('display_show');
    } else {
      $parent.animate({left: $parent.outerWidth() * -1 });
      $parent.removeClass('display_show').addClass('display_hide');
    }
  });

  // Reset Settings
  // -----------------------
  $('.nesia-settings-reset').click(function(e){
    e.preventDefault();
    $.removeCookie('nesia-live-settings');
    window.location.href = window.location.href;
  });

});
})(jQuery);
