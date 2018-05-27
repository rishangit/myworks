/**
 * ctrlImageTag.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlImageTag */
    $.fn.ctrlImageTag = function(pElement) { return new $.ctrlImageTag(this, pElement) } ;
	$.ctrlImageTag = function (e,pElement) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementInputctrl;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.chtmlImgContent;
		this.chtmlResultContent;
		
		this.chtmlzoomPlus;
		this.chtmlzoomMin;
		
		this.cDocumentElement = pElement;
		this.chtmlElementClose;

		
		this.cpSetup();
		this.cpRedrow();
		
		return this;
   }
    				
	/* EXTEND ctrlInput */
    $.ctrlImageTag.fn = $.ctrlImageTag.prototype = {ctrlImageTag: '0.0.1'};
	$.ctrlImageTag.fn.extend = $.ctrlImageTag.extend = $.extend;
	$.ctrlImageTag.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		this.chtmlElement.html(
		"<div id='close' class='aa-close aa-div-hide'></div><div id='copy' class='aa-copy aa-div-hide'></div>"+
		"<div id='ctrlwrap' class='af-element-content'>"+
			"<div id='Label'> </div>"+
			"<div id='ctrlcontent' style='width:auto;'>"+
			    "<div id='ImageContent' class='af-img-div'><div ='imgBackContent' class='af-img-backdiv'><div id='dragdiv'><img id='tagImg' src='http://desktopbackgrounds1.com/wp-content/uploads/2012/10/car-wallpapers-5.jpg' height='250'/></div></div></div>"+
			    "<div id='zoomPuls'>+</div>"+
			    "<div id='zoomMinus'>-</div>"+
			    "<div id='resultContent' class='af-result-div'></div>"+
			"</div>"+
		"</div>");
		
		
		this.chtmlElementLable = $('#Label',this.chtmlElement);
		this.chtmlElementContent = $('#ctrltextbox',this.chtmlElement);
		this.chtmlElementCtrlContent = $('#ctrlcontent',this.chtmlElement);
		this.chtmlImgContent = $('#ImageContent',this.chtmlElement);
		this.chtmlResultContent = $('#resultContent',this.chtmlElement);
		this.chtmlzoomPlus = $('#zoomPuls',this.chtmlElement);
		this.chtmlzoomMin = $('#zoomMinus',this.chtmlElement);
		
		var elementclose = $('#close',this.chtmlElement);
		var elementcopy = $('#copy',this.chtmlElement);
		
		elementclose.unbind('click');
		elementclose.bind('click', function(event){self.elementclose_click(event);});
		
        elementcopy.unbind('click');
		elementcopy.bind('click', function(event){self.elementcopy_click(event);});
		
		
		this.chtmlzoomPlus.unbind('click');
		this.chtmlzoomPlus.bind('click', function(event){self.chtmlzoomPlus_click(event);});
		this.chtmlzoomMin.unbind('click');
		this.chtmlzoomMin.bind('click', function(event){self.chtmlzoomMin_click(event);});
				
				
		$('#ImageContent',this.chtmlElement).bind('mousewheel', function(event,delta){self.tagImg_scrollTop(event,delta);});	
				
		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		$('#ImageContent',this.chtmlElement).bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
		$('#ImageContent',this.chtmlElement).bind('mouseleave', function(event){self.chtmlElement_leave(event)});
		
		
		buildDraggable = function() {
        $("#dragdiv").draggable({
        containment: '#imgBackContent',
        drag: function(event) {

            },
        });
    }
				
	},
	
	chtmlzoomPlus_click : function()
	{
	        $("#tagImg").stop();
	        var width = $("#tagImg").css("width");
	        var height = $("#tagImg").css("height");
            width =parseInt(width) + 100;
            height =parseInt(height) + 100;
            
            $("#tagImg").animate({
            "width": width,
            "height":height,
            //"marginLeft": distance
            },700);
	},
	
	chtmlzoomMin_click : function()
	{
	        $("#tagImg").stop();
	    	var width = $("#tagImg").css("width");
	        var height = $("#tagImg").css("height");
            width =parseInt(width) - 100;
            height =parseInt(height) - 100;
            
            $("#tagImg").animate({
            "width": width,
            "height":height,
            //"marginLeft": distance
            },700);
	},
		
		
	tagImg_scrollTop : function(event,delta)
	{
	var self = this;
	$("#tagImg").stop();

	   //$('#ImageContent',this.chtmlElement).unbind('mousewheel');	

	   var width = $("#tagImg").css("width");
	   var height = $("#tagImg").css("height");
	   if(delta > 0)
	   {
	        width =parseInt(width) + 100;
            height =parseInt(height) + 100;
	   }
	   else{
	        width =parseInt(width)- 100;
            height =parseInt(height) - 100;
	   }
	   
	        $("#tagImg").animate({
            "width": width,
            "height":height,
            //"marginLeft": distance
            },700,
            function() {

            //$('#ImageContent',this.chtmlElement).bind('mousewheel', function(event,delta){self.tagImg_scrollTop(event,delta);});	

            });
	},
		
		
	cpRedrow : function()
	{
        setElementAlign(this.cDocumentElement,this.chtmlElementLable,this.chtmlElementCtrlContent,this.chtmlElementContent);
        
 		this.chtmlElementLable = $('#Label',this.chtmlElement);
		this.chtmlElementInputctrl = $('#ctrl',this.chtmlElement);
		this.chtmlElementContent = $('#ctrltextbox',this.chtmlElement);
		this.chtmlElementCtrlContent = $('#ctrlcontent',this.chtmlElement);
		
		this.chtmlElementInputctrl.removeClass();
		switch (this.cDocumentElement.cSElementSize)
		{
		case '0':
			this.chtmlElementInputctrl.addClass('af-InputBoxSmall-st0');
		break;
		case '1':
    		this.chtmlElementInputctrl.addClass('af-InputBoxMedium-st1');
		break;
		case '2':
			this.chtmlElementInputctrl.addClass('af-InputBoxLarge-st2');
		break;
		default:
			this.chtmlElementInputctrl.addClass('af-InputBoxMedium-st1');
		break;
		}
		

		
	},
	
	chtmlElement_click : function()
	{
		$(this).trigger('elementselect',[this]);
	},
	chtmlElement_mouseenter : function()
	{
		$('body').css({'overflow':'hidden'});
		$(this).trigger('elementmouseenter',[this]);
	},
	
	chtmlElement_leave : function()
	{
		$('body').css({'overflow':'auto'});
		$(this).trigger('elementmouseenter',[this]);
	},
	elementclose_click : function(event)
	{
	    $(this).trigger('elementclose',[this]);
	},
	elementcopy_click : function(event)
	{
	    $(this).trigger('elementcopy',[this]);
	}
	
	
	
	});
})(jQuery)