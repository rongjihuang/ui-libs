/*
 * Sliding Tabs 1.1.7 jQuery Plugin - http://codecanyon.net/item/sliding-tabs-jquery-plugin/141774
 * 
 * Copyright 2011, Christian André
 * All rights reserved.
 *
 * You need to purchase a license if you want to use this script.
 * http://codecanyon.net/wiki/buying/howto-buying/licensing/
 *
 */
(function($) {
	$.fn.slideTabs = function(option) {
		var defaultOption = {
			autoplay : false,
			autoplayClickStop : false,
			autoplayInterval : 4000,
			autoHeight : false,
			autoHeightTime : 0,
			buttonsFunction : 'slide',
			classBtnDisabled : 'st_btn_disabled',
			classBtnNext : 'st_next',
			classBtnPrev : 'st_prev',
			classExtLink : 'st_ext',
			classTab : 'st_tab',
			classTabActive : 'st_tab_active',
			classTabsContainer : 'st_tabs_container',
			classTabsList : 'st_tabs',
			classView : 'st_view',
			classViewActive : 'st_active_view',
			classViewContainer : 'st_view_container',
			contentAnim : 'slideH',
			contentAnimTime : 600,
			contentEasing : 'easeInOutExpo',// 'easeOutBounce',
			offsetBR : 0,
			offsetTL : 0,
			orientation : 'horizontal',
			tabSaveState : false,
			tabsAnimTime : 300,
			tabsEasing : '',
			tabsScroll : true,
			tabsSlideLength : 0,
			totalHeight : '',
			totalWidth : '',
			urlLinking : true
		};
		var conf = $.extend(true, {}, defaultOption, option);
		return this.each(function() {
			var a = new SlideTabs($(this), conf);
			a.init();
		})
	};
	function SlideTabs(d, option) {
		var f = d.find('.' + option.classTabsContainer);
		var $tabsInnerCont = f.children('div').first();
		var $tabs = f.find('.' + option.classTabsList);
		var $a = $tabs.children('li').find('a');
		var $contentCont = d.find('.' + option.classViewContainer);
		var $content = $contentCont.find('.' + option.classView);
		var $prev = d.find('.' + option.classBtnPrev).click(function() {
			tabs[option.buttonsFunction + 'Prev'](val);
			return false;
		});
		var $next = d.find('.' + option.classBtnNext).click(function() {
			tabs[option.buttonsFunction + 'Next'](val);
			return false;
		});
		var $tab, $activeTab = [], $li, $lastElem, $view, $activeView, val = {}, margin = 0;
		this.init = function() {
			if (option.orientation == 'horizontal') {
				$tabsInnerCont.css('overflow', 'hidden');
				val.func = 'outerWidth';
				val.obj = 'left';
				val.attr = 'marginLeft';
			} else {
				val.func = 'outerHeight';
				val.obj = 'top';
				val.attr = 'marginTop';
				val.prevBtnH = $prev.outerHeight();
				val.nextBtnH = $next.outerHeight();
				(val.prevBtnH >= val.nextBtnH) ? val.buttonsH = val.prevBtnH
						: val.buttonsH = val.nextBtnH;
			}
			if (option.totalWidth.length > 0) {
				g.width();
			}
			if (option.totalHeight.length > 0) {
				g.height();
			}
			tabs.init();
			if (option.autoplay == true) {
				autoplay.init();
			}
		};
		var g = {
			width : function() {
				if (option.totalWidth == 'auto') {
					d.css('width', '100%');
				} else {
					d.css('width', option.totalWidth + 'px');
				}
			},
			height : function() {
				var a = ($contentCont.outerHeight(true) - $contentCont.height());
				if (option.orientation == 'vertical') {
					var b = (f.outerHeight() - f.height());
					f.css('height', (option.totalHeight - b) + 'px');
					$contentCont.css('height', (option.totalHeight - a) + 'px');
				} else {
					$contentCont.css('height', (option.totalHeight - (f
							.outerHeight(true) + a))
							+ 'px');
				}
			}
		};
		var tabs = {
			animated : '#' + d.attr('id') + ' .' + option.classTabsList
					+ ':animated',
			init : function() {
				this.setSlideLength();
				this.posActive();
				this.bind();
			},
			setSlideLength : function() {
				if (option.tabsSlideLength == 0) {
					if (option.orientation == 'horizontal') {
						val.tabsSlideLength = $tabsInnerCont.width();
					} else {
						val.tabsSlideLength = (f.height() - val.buttonsH);
					}
				} else {
					val.tabsSlideLength = option.tabsSlideLength;
				}
			},
			bind : function() {
				if (option.totalWidth == 'auto') {
					var c = null;
					$(window).resize(function() {
						if (c) {
							clearTimeout(c);
						}
						c = setTimeout(function() {
							if (option.orientation == 'horizontal') {
								tabs.setAutoWidth()
							}
							if (option.autoHeight == true) {
								content.adjustHeight()
							}
						}, 100);
					});
				}
				$tabs.delegate('li a.' + option.classTab, 'click', function() {
					tabs.click(this, true);
					return false;
				});
				if ($.fn.mousewheel && option.tabsScroll == true) {
					$tabs.mousewheel(function(a, b) {
						(b > 0) ? tabs.slidePrev(val) : tabs.slideNext(val);
						return false;
					});
				}
				$('a.' + option.classExtLink).each(
						function() {
							if ($(this).attr('rel') == d.attr('id')) {
								$(this).click(
										function() {
											$tab = tabs.findByRel($(this).attr(
													'href').slice(1));
											tabs.click($tab);
											return false;
										});
							}
						});
			},
			setAutoWidth : function() {
				val.tabsSlideLength = $tabsInnerCont.width();
				var a = ($lastElem.outerWidth(true) + $lastElem.position().left), tabsContOW = f
						.outerWidth(true), buttonsW = ($prev.outerWidth(true) + $next
						.outerWidth(true));
				if (a > tabsContOW) {
					f.addClass('st_sliding_active');
					val.tabsSlideLength = $tabsInnerCont.width();
					tabs.initButtons();
					tabs.showButtons();
				} else {
					if (-+margin < (0 + option.offsetBR)) {
						if (a < $tabsInnerCont.width()) {
							var b = (val.tabsSlideLength - a);
							margin = (margin - b);
							if ((margin + 1) < (buttonsW + option.offsetBR)) {
								margin = (0 + option.offsetBR);
								tabs.hideButtons();
								val.tabsSlideLength = tabsContOW;
							}
							tabs.initButtons();
						} else if (a <= (tabsContOW - margin)) {
							margin = (0 + option.offsetBR);
							tabs.hideButtons();
							val.tabsSlideLength = tabsContOW;
						}
						$tabs.animate({
							'marginLeft' : -+margin
						}, 150);
					} else if (margin == (0 + option.offsetBR)
							&& a <= tabsContOW) {
						tabs.hideButtons();
						val.tabsSlideLength = tabsContOW;
					}
				}
			},
			posActive : function() {
				this.getActive();
				content.showActive();
				$lastElem = $tabs.children('li:last');
				$tab = $activeTab;
				$activeTab = $activeTab.parents('li');
				if (($lastElem[val.func](true) + $lastElem.position()[val.obj]) > val.tabsSlideLength) {
					f.addClass('st_sliding_active');
					this.setSlideLength();
					val.elemD = $activeTab[val.func](true);
					val.elemP = $activeTab.position()[val.obj];
					if (val.elemP > val.tabsSlideLength) {
						margin += (val.elemD + (val.elemP - val.tabsSlideLength));
						margin = (margin + option.offsetBR);
					} else if ((val.elemP + val.elemD) > val.tabsSlideLength) {
						margin += (val.elemD - (val.tabsSlideLength - val.elemP));
						margin = (margin + option.offsetBR);
					} else {
						margin = (margin - option.offsetTL);
					}
					$tabs.css(val.attr, -+margin);
					this.initButtons();
					this.showButtons();
				}
			},
			initButtons : function() {
				if (option.buttonsFunction == 'slide') {
					if ($tabs.children('li:first').position()[val.obj] == (0 + option.offsetTL)) {
						this.disableButton($prev);
					} else {
						this.enableButton($prev);
					}
					if (($lastElem.position()[val.obj] + $lastElem[val.func]
							(true)) <= (val.tabsSlideLength - option.offsetBR)) {
						this.disableButton($next);
					} else {
						this.enableButton($next);
					}
				} else {
					this.setButtonState();
				}
			},
			enableButton : function(a) {
				a.removeClass(option.classBtnDisabled);
			},
			disableButton : function(a) {
				a.addClass(option.classBtnDisabled);
			},
			showButtons : function() {
				$prev.show();
				$next.show();
			},
			hideButtons : function() {
				f.removeClass('st_sliding_active');
				$prev.hide();
				$next.hide();
			},
			click : function(a, b) {
				if ($(content.animated).length) {
					return false;
				}
				$tab = $(a);
				if ($tab.hasClass(option.classTabActive)) {
					return false
				}
				$li = $tab.parents('li');
				this.setActive();
				if (option.autoplay == true) {
					if (option.autoplayClickStop == true && b == true) {
						option.autoplay = false;
						autoplay.clearInterval();
					} else {
						val.index = $tab.parents('li').index();
						autoplay.setInterval();
					}
				}
				val.elemP = $li.position();
				val.activeElemP = $activeTab.position();
				val.hash = this.getHash($tab);
				this.slideClicked(val);
				$activeView = $content
						.children('div.' + option.classViewActive).removeClass(
								option.classViewActive);
				$view = $content.children('div#' + val.hash).addClass(
						option.classViewActive);
				if (option.autoHeight == true) {
					content.adjustHeight();
				}
				if (option.contentAnim.length > 0) {
					content[option.contentAnim](val);
				} else {
					$activeView.hide();
					$view.show();
				}
			},
			clickPrev : function() {
				if ($(content.animated).length) {
					return false;
				}
				val.$prevTab = this.find('prev');
				if (val.$prevTab.length) {
					this.click(val.$prevTab);
				}
			},
			clickNext : function() {
				if ($(content.animated).length) {
					return false;
				}
				val.$nextTab = this.find('next');
				if (val.$nextTab.length) {
					this.click(val.$nextTab);
				}
			},
			find : function(a) {
				return $tab.parents('li')[a]().find('a.' + option.classTab);
			},
			findByRel : function(a) {
				return $tabs.find('[rel=' + a + ']');
			},
			getHash : function(a) {
				val.hash = a.attr('hash');
				if (val.hash) {
					return val.hash;
				} else {
					return a.prop('hash');
				}
			},
			getActive : function() {
				if (option.urlLinking == true && location.hash) {
					$activeTab = this.findByRel(location.hash.slice(1));
				}
				if (!$activeTab.length) {
					if ($.cookie) {
						var a = $.cookie(d.attr('id'));
					}
					if (a) {
						this.removeActive();
						$activeTab = $a.eq(a).addClass(option.classTabActive);
					} else {
						$activeTab = $tabs.children('li').find(
								'.' + option.classTabActive);
						if (!$activeTab.length) {
							$activeTab = $tabs.find('a:first').addClass(
									option.classTabActive);
						}
					}
				} else {
					this.removeActive();
					$activeTab.addClass(option.classTabActive);
				}
				this.saveActive($activeTab);
			},
			removeActive : function() {
				$tabs.children('li').find('.' + option.classTabActive)
						.removeClass(option.classTabActive);
			},
			setActive : function() {
				$activeTab = $tabs.children('li').find(
						'a.' + option.classTabActive).removeClass(
						option.classTabActive);
				$tab.addClass(option.classTabActive);
				this.saveActive($tab);
			},
			saveActive : function(a) {
				if (option.tabSaveState == true) {
					$.cookie(d.attr('id'), a.parents('li').index());
				}
			},
			slideClicked : function(a) {
				a.elemP = a.elemP[a.obj];
				a.elemD = $li[a.func](true);
				a.nextElemPos = ($li.next().length == 1) ? $li.next()
						.position()[a.obj] : 0;
				if (a.elemP < (0 + option.offsetTL)) {
					a.elemHidden = (a.elemD - a.nextElemPos);
					margin = (margin - (a.elemHidden + option.offsetTL));
					this.enableButton($next)
				} else if ((a.elemD + a.elemP) > (a.tabsSlideLength - option.offsetBR)) {
					margin += (a.elemD - (a.tabsSlideLength - (a.elemP + option.offsetBR)));
					this.enableButton($prev);
				}
				this.animate();
				this.setButtonState();
			},
			slidePrev : function(a) {
				if ($(tabs.animated).length) {
					return false;
				}
				$tabs.children('li').each(function() {
					$li = $(this);
					a.elemP = $li.position()[a.obj];
					if (a.elemP >= (0 + option.offsetTL)) {
						a.elemHidden = ($li.prev()[a.func](true) - a.elemP);
						margin = ((margin - a.elemHidden) - option.offsetTL);
						$li = $li.prev();
						tabs.animate();
						tabs.setButtonState($next);
						return false;
					}
				})
			},
			slideNext : function(a) {
				if ($(tabs.animated).length) {
					return false;
				}
				$tabs
						.children('li')
						.each(
								function() {
									$li = $(this);
									a.elemD = $li[a.func](true);
									a.elemP = $li.position()[a.obj];
									if ((a.elemD + a.elemP) > (a.tabsSlideLength - option.offsetBR)) {
										a.elemHidden = (a.tabsSlideLength - a.elemP);
										margin += ((a.elemD - a.elemHidden) + option.offsetBR);
										tabs.animate();
										tabs.setButtonState($prev);
										return false;
									}
								});
			},
			animate : function() {
				if (option.orientation == 'horizontal') {
					$tabs.animate({
						'marginLeft' : -+margin
					}, option.tabsAnimTime, option.tabsEasing);
				} else {
					$tabs.animate({
						'marginTop' : -+margin
					}, option.tabsAnimTime, option.tabsEasing);
				}
			},
			setButtonState : function(a) {
				if (option.buttonsFunction == 'click') {
					$li = $tab.parents('li');
				}
				if ($li.is(':first-child')) {
					this.disableButton($prev);
					this.enableButton($next);
				} else if ($li.is(':last-child')) {
					this.disableButton($next);
					this.enableButton($prev);
				} else {
					if (a) {
						this.enableButton(a);
					} else if (option.buttonsFunction == 'click') {
						this.enableButton($prev);
						this.enableButton($next);
					}
				}
			}
		};
		var content = {
			animated : '#' + d.attr('id') + ' :animated',
			showActive : function() {
				$view = $content.children($activeTab.attr('href')).addClass(
						option.classViewActive);
				$content.children('div').css('position', 'absolute').show()
						.not('div.' + option.classViewActive).hide();
				if (option.autoHeight == true) {
					$content.css('height', $view.height()).parent().css(
							'height', 'auto');
				}
			},
			adjustHeight : function() {
				if (option.autoHeightTime > 0) {
					$content.animate({
						'height' : $view.height()
					}, option.autoHeightTime);
				} else {
					$content.css('height', $view.height());
				}
			},
			fade : function() {
				$activeView.fadeOut(option.contentAnimTime);
				$view.fadeIn(option.contentAnimTime);
			},
			fadeOutIn : function() {
				$activeView.fadeOut(option.contentAnimTime, function() {
					$view.fadeIn(option.contentAnimTime);
				})
			},
			slideH : function(a) {
				a.wh = d.outerWidth(true);
				this.setSlideValues(a);
				$activeView.animate({
					'left' : a.animVal
				}, option.contentAnimTime, option.contentEasing);
				$view.css({
					'display' : 'block',
					'left' : a.cssVal
				}).animate({
					'left' : '0px'
				}, option.contentAnimTime, option.contentEasing, function() {
					$activeView.css('display', 'none')
				});
			},
			slideV : function(a) {
				a.wh = d.outerHeight(true);
				this.setSlideValues(a);
				$activeView.animate({
					'top' : a.animVal
				}, option.contentAnimTime, option.contentEasing);
				$view.css({
					'display' : 'block',
					'top' : a.cssVal
				}).animate({
					'top' : '0px'
				}, option.contentAnimTime, option.contentEasing, function() {
					$activeView.css('display', 'none')
				});
			},
			setSlideValues : function(a) {
				if (a.elemP > a.activeElemP[a.obj]) {
					a.animVal = -a.wh;
					a.cssVal = a.wh;
				} else {
					a.animVal = a.wh;
					a.cssVal = -a.wh;
				}
			}
		};
		var autoplay = {
			init : function() {
				val.index = 0;
				this.setInterval();
			},
			setInterval : function() {
				this.clearInterval();
				val.intervalId = setInterval(function() {
					autoplay.play();
				}, option.autoplayInterval);
			},
			clearInterval : function() {
				clearInterval(val.intervalId);
			},
			play : function() {
				val.index++;
				if (val.index == $a.length) {
					val.index = 0;
				}
				tabs.click($a[val.index]);
			}
		};
	}
})(jQuery);
