/**
 * 主题切换
 *
 * @author rongjihuang@gmail.com
 * @date 2011-04-27
 * @dep jqueryUI
 * @ref http://jqueryui.com/themeroller/themeswitchertool/
 */

/* jQuery plugin themeswitcher
---------------------------------------------------------------------*/
$.fn.themeswitcher = function(settings){
	var options = jQuery.extend({
		loadTheme: null,
		initialText: '选择主题',
		width: 150,
		height: 200,
		buttonPreText: '主题: ',
		closeOnSelect: true,
		buttonHeight: 14,
		cookieName: 'jquery-ui-theme',
		onOpen: function(){},
		onClose: function(){},
		onSelect: function(){},
		root:''
	}, settings);

	//markup 
	var button = $('<a href="#" class="jquery-ui-themeswitcher-trigger">'
			+'<span class="jquery-ui-themeswitcher-icon"></span>'
			+'<span class="jquery-ui-themeswitcher-title">'
			+ options.initialText +'</span></a>');
	var RP=options.root;
	
	var kv=[];
	kv["ui-lightness"]="明 亮";
	kv["ui-darkness"]="黑 暗";
	kv["smoothness"]="平 滑";
	kv["start"]="起 点";
	kv["redmond"]="雷德蒙";
	kv["sunny"]="阳 光";
	kv["overcast"]="阴 天";
	kv["le-frog"]="老实的青蛙";
	kv["flick"]="浪 漫";
	//kv["pepper-grinder"]="";
	kv["eggplant"]="茄 子";
	kv["dark-hive"]="黑蜂窝";
	//kv["cupertino"]="";
	kv["south-street"]="南 街";
	kv["blitzer"]="闪 电";
	kv["humanity"]="仁 慈";
	//kv["hot-sneaks"]="溜得快";
	kv["excite-bike"]="刺激的自行车";
	kv["vader"]="维 达";
	kv["dot-luv"]="点 爱";
	kv["mint-choc"]="薄荷巧克力";
	kv["black-tie"]="黑领带";
	//kv["trontastic"]="";
	kv["swanky-purse"]="时髦包包";
	
	function buildThemeLI(themeName,label,icon){
		label = kv[themeName] || label;
		return '<li><a name="'+themeName+'" href="'+RP+'/ui-libs/jquery-ui/1.8.11/themes/'+themeName+'/jquery.ui.theme.css">'+
		'<img src="'+RP+'/ui-libs/jquery-ui/themeSwitcher/images/'+icon+'" alt="'+label+'" title="'+label+'" />'+
		'<span class="themeName">'+label+'</span></a></li>';
	}	
	var switcherpane = $('<div class="jquery-ui-themeswitcher">'+
		'<div id="themeGallery">'+
		'<ul>'+
			[buildThemeLI("ui-lightness","UI lightness","theme_90_ui_light.png"),
			 buildThemeLI("ui-darkness","UI Darkness","theme_90_ui_dark.png"),
			 buildThemeLI("smoothness","Smoothness","theme_90_smoothness.png"),
			 buildThemeLI("start","Start","theme_90_start_menu.png"),
			 buildThemeLI("redmond","Redmond","theme_90_windoze.png"),
			 buildThemeLI("sunny","Sunny","theme_90_sunny.png"),
			 buildThemeLI("overcast","Overcast","theme_90_overcast.png"),
			 buildThemeLI("le-frog","Le Frog","theme_90_le_frog.png"),
			 buildThemeLI("flick","Flick","theme_90_flick.png"),
			 buildThemeLI("pepper-grinder","Pepper Grinder","theme_90_pepper_grinder.png"),
			 buildThemeLI("eggplant","Eggplant","theme_90_eggplant.png"),
			 buildThemeLI("dark-hive","Dark Hive","theme_90_dark_hive.png"),
			 buildThemeLI("cupertino","Cupertino","theme_90_cupertino.png"),
			 buildThemeLI("south-street","South Street","theme_90_south_street.png"),
			 buildThemeLI("blitzer","Blitzer","theme_90_blitzer.png"),
			 buildThemeLI("humanity","Humanity","theme_90_hot_sneaks.png"),
			 buildThemeLI("hot-sneaks","Hot Sneaks","theme_90_hot_sneaks.png"),
			 buildThemeLI("excite-bike","Excite Bike","theme_90_excite_bike.png"),
			 buildThemeLI("vader","Vader","theme_90_black_matte.png"),
			 buildThemeLI("dot-luv","Dot Luv","theme_90_dot_luv.png"),
			 buildThemeLI("mint-choc","Mint Choc","theme_90_mint_choco.png"),
			 buildThemeLI("black-tie","Black Tie","theme_90_black_tie.png"),
			 buildThemeLI("trontastic","Trontastic","theme_90_trontastic.png"),
			 buildThemeLI("swanky-purse","Swanky Purse","theme_90_swanky_purse.png")
			].join("")+
		'</ul>'+
		'</div></div>').find('div').removeAttr('id');
	
	//button events
	button.click(
		function(){
			if(switcherpane.is(':visible')){ switcherpane.spHide(); }
			else{ switcherpane.spShow(); }
					return false;
		}
	);
	
	//menu events (mouseout didn't work...)
	switcherpane.hover(
		function(){},
		function(){if(switcherpane.is(':visible')){$(this).spHide();}}
	);

	//show/hide panel functions
	$.fn.spShow = function(){ $(this).css({top: button.offset().top + options.buttonHeight + 6, left: button.offset().left}).slideDown(50); button.css(button_active); options.onOpen(); }
	$.fn.spHide = function(){ $(this).slideUp(50, function(){options.onClose();}); button.css(button_default); }
	
		
	/* Theme Loading
	---------------------------------------------------------------------*/
	switcherpane.find('a').click(function(){
		updateCSS( $(this).attr('href') );
		var themeName = $(this).attr("name");
		button.find('.jquery-ui-themeswitcher-title').text( options.buttonPreText + $(this).find("span").text() );
		//alert("set themeName=" + themeName);
		$.cookie(options.cookieName, themeName);
		options.onSelect();
		if(options.closeOnSelect && switcherpane.is(':visible')){ switcherpane.spHide(); }
		return false;
	});
	
	//function to append a new theme stylesheet with the new style changes
	function updateCSS(locStr){
		//这个代码在ie8不行
		//var cssLink = $('<link href="'+locStr+'" type="text/css" rel="stylesheet"/>');//? i thing it's jquery bug
		//$("head").append(cssLink);
		
		//以下代码各浏览器通用
		var link=document.createElement("link");
		link.setAttribute("type","text/css");
		link.setAttribute("rel","stylesheet");
		link.setAttribute("href",locStr);
		link.setAttribute("class","ui-theme");
		document.getElementsByTagName("head")[0].appendChild(link);

		if( $("link.ui-theme").size() > 1){
			$("link.ui-theme:first").remove();
		}
	}	
	
	/* Inline CSS 
	---------------------------------------------------------------------*/
	var button_default = {
		fontFamily: 'Trebuchet MS, Verdana, sans-serif',
		fontSize: '11px',
		color: '#666',
		background: '#eee url('+options.root+'/ui-libs/jquery-ui/themeSwitcher/images/buttonbg.png) 50% 50% repeat-x',
		border: '1px solid #ccc',
		'-moz-border-radius': '6px',
		'-webkit-border-radius': '6px',
		textDecoration: 'none',
		padding: '3px 3px 3px 8px',
		width: options.width - 11,//minus must match left and right padding 
		display: 'block',
		height: options.buttonHeight,
		outline: '0'
	};
	var button_hover = {
		'borderColor':'#bbb',
		'background': '#f0f0f0',
		cursor: 'pointer',
		color: '#444'
	};
	var button_active = {
		color: '#aaa',
		background: '#000',
		border: '1px solid #ccc',
		borderBottom: 0,
		'-moz-border-radius-bottomleft': 0,
		'-webkit-border-bottom-left-radius': 0,
		'-moz-border-radius-bottomright': 0,
		'-webkit-border-bottom-right-radius': 0,
		outline: '0'
	};
	
	
	
	//button css
	button.css(button_default)
	.hover(
		function(){ 
			$(this).css(button_hover); 
		},
		function(){ 
		 if( !switcherpane.is(':animated') && switcherpane.is(':hidden') ){	$(this).css(button_default);  }
		}	
	)
	.find('.jquery-ui-themeswitcher-icon').css({
		float: 'right',
		width: '16px',
		height: '16px',
		background: 'url('+options.root+'/ui-libs/jquery-ui/themeSwitcher/images/icon_color_arrow.gif) 50% 50% no-repeat'
	});	
	//pane css
	switcherpane.css({
		position: 'absolute',
		float: 'left',
		fontFamily: 'Trebuchet MS, Verdana, sans-serif',
		fontSize: '12px',
		background: '#000',
		color: '#fff',
		padding: '8px 3px 3px',
		border: '1px solid #ccc',
		'-moz-border-radius-bottomleft': '6px',
		'-webkit-border-bottom-left-radius': '6px',
		'-moz-border-radius-bottomright': '6px',
		'-webkit-border-bottom-right-radius': '6px',
		borderTop: 0,
		zIndex: 999999,
		width: options.width-6//minus must match left and right padding
	})
	.find('ul').css({
		listStyle: 'none',
		margin: '0',
		padding: '0',
		overflow: 'auto',
		height: options.height
	}).end()
	.find('li').hover(
		function(){ 
			$(this).css({
				'borderColor':'#555',
				'background': 'url('+options.root+'/ui-libs/jquery-ui/themeSwitcher/images/menuhoverbg.png) 50% 50% repeat-x',
				cursor: 'pointer'
			}); 
		},
		function(){ 
			$(this).css({
				'borderColor':'#111',
				'background': '#000',
				cursor: 'auto'
			}); 
		}
	).css({
		width: options.width-30,
		height: '',
		padding: '2px',
		margin: '1px',
		border: '1px solid #111',
		'-moz-border-radius': '4px',
		clear: 'left',
		float: 'left'
	}).end()
	.find('a').css({
		color: '#aaa',
		textDecoration: 'none',
		float: 'left',
		width: '100%',
		outline: '0'
	}).end()
	.find('img').css({
		float: 'left',
		border: '1px solid #333',
		margin: '0 2px'
	}).end()
	.find('.themeName').css({
		float: 'left',
		margin: '3px 0'
	}).end();
	


	$(this).append(button);
	$('body').append(switcherpane);
	switcherpane.hide();
	if( $.cookie(options.cookieName) || options.loadTheme ){
		var themeName = $.cookie(options.cookieName) || options.loadTheme;
		switcherpane.find('a[name="'+ themeName +'"]').trigger('click');
	}

	return this;
};




/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};