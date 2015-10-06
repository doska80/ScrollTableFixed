/*! table.scrollfix.js 1.0.0
 * https://github.com/doska80/ScrollTableFixed
 * http://responsive-nav.com
 *
 * Copyright (c) 2015 @doska80
 * Available under the MIT license
 */
 
var fsca;
var doit;
var time = 0;
(function (fsca, $) {
    (function (ScrollTableFix) {

        ScrollTableFix = function (element, options) {
            this.options = $.extend({}, ScrollTableFix.defaults, options);
            this.options.table = element;
            this.options.uniqueId = guid(); 
        };

        ScrollTableFix.defaults = {
			fixHeaderClass: 'scroll-fix',
			scrollTableClass: 'scroll-table',
			target: null,
			table : null,
			uniqueId : null
        };

        ScrollTableFix.prototype = {
            tableHeader: null,
            tableWidth: null,
            target_children: null,
            tr: null,
            menu : null,
            color : null,
            init: function () {
				if (this.options.table.length) {
					tableHeader = this.options.table.find("tr:first");
					color = tableHeader.css('background-color');
					tableWidth = tableHeader.outerWidth();
					target_children = tableHeader.children();
					tr = tableHeader.clone();
					tr.height(tableHeader.height());
					tr.attr("class",this.options.table.find("tr:first").attr("class"));
					tr.attr("style",this.options.table.find("tr:first").attr("style"));
					this.updateWidth();
					this.scroll();			
				}
				this.resize();					
            },


            resize: function () {
            	
            	var that = this;
                clearTimeout(doit);
                doit = setTimeout( function(){
                	   return that.resizeEnd();
                      }, 200);
                
				if (this.options.table.length) {
					
				    var tablePositionLeft = $(document).scrollLeft() - this.options.table.position().left;
					$(".tableHeaderFixed_" +  this.options.uniqueId).css("min-width", this.options.table.outerWidth());
					$(".tableHeaderFixed_" +  this.options.uniqueId).css("max-width", this.options.table.outerWidth());
					$(".tableHeaderFixed_" +  this.options.uniqueId).css("left", (tablePositionLeft * -1) + "px");
				    this.updateWidth();
				    if(typeof menu == 'undefined' || menu == null || menu === 'undefined' || menu.length == 0) return;
					var menuPosition = menu.offset().top + menu.height();
					var tablePosition = this.options.table.offset().top;
					if (tablePosition < menuPosition && ($(document).scrollTop() < (tablePosition + this.options.table.height() - (tableHeader.height() * 2)))) {					
					} else {
						$(".tableHeaderFixed_" +  this.options.uniqueId).remove();
					}				    
				}				
            },
			resizeEnd : function() {
				
				this.removeTable();
				this.scroll();
 
				if ($(".tableHeaderFixed_" + this.options.uniqueId).length > 0) {
					$('.menu-app').css("width", $(window).width())
				}

				$("table[id*='tableHeaderFixed']").hide();
				setTimeout(function() {
					$("table[id*='tableHeaderFixed']").css("top", $(".menu-app").first().height());
					$("table[id*='tableHeaderFixed']").show();
				}, 500);
			},
            updateWidth: function () {
				if (this.options.table.length) {
				   var widths = [];
					tableHeader.children("td,th").each(function( index ) {					
					 widths.push($(this).css("width"));
					});		
					tr.children("td,th").each(function( index ) {
					 $(this).css("width", widths[index]);
					 $(this).addClass("cloneCol");
					});	
				}
            },

            scroll: function () {
            	if( $(document).scrollTop() == 0){
            		$(".tableHeaderFixed_" +  this.options.uniqueId).remove();
            		return;
            	}
				if (this.options.table.length) {
					menu = $("."+this.options.fixHeaderClass);
				    if (menu.length == 0 ) {
				        return
				    }
					var menuPosition = menu.offset().top + menu.outerHeight();
					var tablePosition = this.options.table.offset().top;
					if (tablePosition < menuPosition && ($(document).scrollTop() < (tablePosition + this.options.table.height() - (tableHeader.height() * 2)))) {
						var tablePositionLeft = $(document).scrollLeft() - this.options.table.position().left
						$(".tableHeaderFixed_" +  this.options.uniqueId).css("left", (tablePositionLeft * -1))
						if ($(".tableHeaderFixed_" +  this.options.uniqueId).length == 0) {
						    var c = this.options.table.attr("class");
						    var style = this.options.table.attr("style");
						    if(style == null){
						    	style = "";
						    }
						    
						    c = c.replace("table-striped","");
						    var table= "<table id='tableHeaderFixed' class='tableHeaderFixed_"+ this.options.uniqueId +" " + c + "' style='background-color:"+color+" !important;position:fixed;top:" 
							+ menu.outerHeight() + "px;left:" + (tablePositionLeft * -1) + "px;min-width:" + this.options.table.outerWidth() + "px;z-index:9999999999;max-width:" + this.options.table.outerWidth() + "px;"+style+"'>" + tr.html() + "</table>";
						    
						    if( this.options.target != null){
						    	 $("#" + this.options.target).append(table);
						    } else {
						    	this.options.table.after(table)
						    }
						    							
							$(".tableHeaderFixed_" +  this.options.uniqueId).find("tr:first").attr("class",this.options.table.find("tr:first").attr("class"));
					        $(".tableHeaderFixed_" +  this.options.uniqueId).find("tr:first").attr("style",this.options.table.find("tr:first").attr("style"));
					        
	                		var all = $(".selectAll").map(function() {
	                		    return this;
	                		}).get();
	                		
	                		if(all.length > 0){
	                		    if($(all[0]).children().is(":checked")){
	                		    	$(".tableHeaderFixed_" +  this.options.uniqueId).find(":input:checkbox").attr( 'checked', '' );
	                		    } else {           		    	
	                		    	$(".tableHeaderFixed_" +  this.options.uniqueId).find(":input:checkbox").removeAttr('checked');             		    	
	                		    }          		    
	                		} 
	                		
						}
					} else {
					    var tablePositionLeft = $(document).scrollLeft() - this.options.table.position().left
						$(".tableHeaderFixed_" +  this.options.uniqueId).css("min-width", this.options.table.outerWidth());
						$(".tableHeaderFixed_" +  this.options.uniqueId).css("max-width", this.options.table.outerWidth());
						var menuPosition = menu.offset().top + menu.outerHeight();
						var tablePosition = this.options.table.offset().top;
						if (tablePosition < menuPosition && ($(document).scrollTop() < (tablePosition + this.options.table.height() - (tableHeader.height() * 2)))) {					
						} else {
							$(".tableHeaderFixed_" +  this.options.uniqueId).remove();
						}
					}
				}
            },
            scrollTable: function () {
				if (this.options.table.length > 0 && $(".tableHeaderFixed_" +  this.options.uniqueId).length > 0)  {
						var tablePositionLeft = $(document).scrollLeft() - this.options.table.position().left
						$(".tableHeaderFixed_" +  this.options.uniqueId).css("left", (tablePositionLeft * -1))
				}
            },
            removeTable: function () {
            	$(".tableHeaderFixed_" +  this.options.uniqueId).remove();
            },
            clickTable: function (e) {
            	var d = new Date();
            	var n = d.getTime();
            	if((n - time) < 200) {
            		return;
            	}
            	time = n;
            	if(e.target.tagName != 'INPUT'){
            		var target = null;
            		if (e.target.tagName != "th"){
            			target = $(e.target).closest( "th" );
            		} else {
            			target = e.target; 
            		}
            		if($(target).attr('class') == null){
            			return;
            		}
            		var clazz = $(target).attr('class');
            		var arrClass = clazz.split(' ');
            		if(arrClass.length <= 1 || clazz.indexOf("cloneCol") == -1){
            			return;
            		}          		
            		var field= arrClass[0];
            		var all = $("."+field).map(function() {
            		    return this;
            		}).get();
            		
            		if(all.length > 0){
            		    $(all[0]).click();
            		} 
            	} else if($(e.target).is('input:checkbox')){
            		if($(e.target).parent().hasClass("selectAll") && $(e.target).closest( "th" ).hasClass("cloneCol")){
                		var all = $(".selectAll").map(function() {
                		    return this;
                		}).get();
                		
                		if(all.length > 0){           			
                		    if($(all[0]).children().is(":checked")){            		    	
                		    	$("table[id*='tt'] :input:checkbox").prop( "checked", false);             
                		    } else {
                		    	$("table[id*='tt'] :input:checkbox").prop( "checked", true);            		    	
                		    }  
                		    e.stopPropagation();
                		} 
            		}
            	}
            },
           
            attach: function () {
                if (this.attached) {
                    throw new Error('Already attached');
                }

                var that = this;

                this.updateScrollHandler = function () {
                    that.scroll();
                };

                this.updaterResizeHandler = function () {
                    that.resize();
                };

                this.updateScrollTableHandler = function () {
                    that.scrollTable();
                };
                this.clickTableHandler = function (e) {
                    that.clickTable(e);
                };

                $(window)
                    .scroll(this.updateScrollHandler)
                    .resize(this.updaterResizeHandler);
   
                $("."+this.options.scrollTableClass)
                    .scroll(this.updateScrollTableHandler)
                	.click(this.clickTableHandler);

                this.attached = true;
                this.init();
            },


            detach: function () {
                if (!this.attached) {
                    throw new Error('Not attached');
                }

                $(window)
                    .unbind('scroll', this.updateScrollHandler)
                    .unbind('resize', this.updaterResizeHandler)
                ;

                this.attached = false;
            }
        };
        
        function guid() {
        	  function s4() {
        	    return Math.floor((1 + Math.random()) * 0x10000)
        	      .toString(16)
        	      .substring(1);
        	  }
        	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        	    s4() + '-' + s4() + s4() + s4();
        }
        
        $.fn.headerScrollFix = function (options) {

			$(this).each(function( index ) {
                new ScrollTableFix($(this), options).attach();				
			});

            return true;
        };
    })(fsca.ScrollTableFix || (fsca.ScrollTableFix = {}));
})(fsca || (fsca = {}), jQuery);
