/**
 * Area.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* pin */
    $.fn.area = function(pdocarea,pdocImage) { return new $.area(this,pdocarea,pdocImage) } ;
	$.area = function (e,pdocarea,pdocImage) {

		this.chtmlElement = $(e);
		this.docTag= pdocarea;
		this.Image = pdocImage;
		this.htmlTag;
		this.htmlBorderDiv;
		this.htmlFormContent;

		this.cpSetup();
		this.setWithImage();

		return this;
   }
    				
    $.area.fn = $.area.prototype = {area: '0.0.1'};
	$.area.fn.extend = $.area.extend = $.extend;
	$.area.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		
			$('#ImageContent').after(String.format(
			'<div id="area{0}" style="position:absolute" >'+
			'<div class="areaboder"></div>'+
					'<div id="formContent" class="form areaSet">'+
					'</div>'+
			'</div>',this.docTag.Tag_id));
			
			
			this.htmlTag = $(String.format('#area{0}',this.docTag.Tag_id));
			this.htmlFormContent = $('#formContent',this.htmlTag);
			this.htmlBorderDiv = $('.areaboder',this.htmlTag);

			$(this.htmlTag).bind('mouseenter', function(event){self.htmlTag_mouseenter(event)});
			$(this.htmlTag).bind('mouseleave', function(event){self.htmlTag_leave(event)});
			$(this.htmlTag).bind('mousewheel', function(event,delta){self.htmlTag_scrollTop(event,delta)});
			$('.areaboder',this.htmlTag).bind('click', function(event){self.htmlTag_click(event)});
			
	},
	
	setWithImage : function()
	{
	var self = this;

		var parentOffset = $(this.chtmlElement).offset(); 

		varXY1 = this.getXYforCurrentImage(this.docTag.area_x1,this.docTag.area_y1);
		varXY2 = this.getXYforCurrentImage(this.docTag.area_x2,this.docTag.area_y2);
		
		_left = varXY1.current_x  + parseInt(parentOffset.left) + 5;//5px image content border width
		_top = varXY1.current_y + parseInt(parentOffset.top)+ 5;//5px image content border width
		
		width = varXY2.current_x - varXY1.current_x;
		height = varXY2.current_y - varXY1.current_y;
		(this.htmlTag).stop();
		     $(this.htmlTag).animate({         
			"left": _left,
			"top": _top
            },400);
		(this.htmlBorderDiv).stop();	
			$(this.htmlBorderDiv).animate({
            "width": width,           
			"height":height
            },400);

		},
	
	getXYforCurrentImage : function(_x,_y)
	{
		var img = new Image();
        img.src = $('#tagImg').attr('src');
		this.OriginalImage_W = img.width;
		this.OriginalImage_H = img.height;

		var Hrai= parseFloat(this.OriginalImage_H/this.Image.currntHeight);
		
		var vpoint_X = parseFloat(_x/ Hrai);
		var vpoint_Y = parseFloat(_y/Hrai); 
		
		var pointx;
		var pointy;	
		
	    var parentOffset = $(this.chtmlElement).offset(); 
		
		var xx =	parseInt(vpoint_X) //+ parseInt(parentOffset.left)
		var yy =	parseInt(vpoint_Y)// + parseInt(parentOffset.top)
			
		if(parseInt(this.Image.currntLeft) < 0)
		pointx = parseInt(xx) - Math.abs(this.Image.currntLeft);
		else
		pointx = parseInt(xx) + Math.abs(this.Image.currntLeft);
		
		if(parseInt(this.Image.currntTop) < 0)
		pointy = parseInt(yy) - Math.abs(this.Image.currntTop);
		else
		pointy = parseInt(yy) + Math.abs(this.Image.currntTop);
		
		obj = {};
		obj.current_x = pointx;
		obj.current_y = pointy;
		
		return obj;
	},
	
	
	htmlTag_click : function()
	{
		$(this).trigger('Tagclick',[this]);
	},

	htmlTag_mouseenter : function()
	{
		$('body').css({'overflow':'hidden'});
	},
	
	htmlTag_leave : function()
	{
		$('body').css({'overflow':'auto'});
	},
	htmlTag_scrollTop : function(event,delta)
	{
		$(this).trigger('scroll',[delta]);
	}
	
	
	});
})(jQuery)	