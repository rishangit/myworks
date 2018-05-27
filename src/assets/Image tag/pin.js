/**
 * pin.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* pin */
    $.fn.pin = function(pdocpin,pdocImage) { return new $.pin(this,pdocpin,pdocImage) } ;
	$.pin = function (e,pdocpin,pdocImage) {

		this.chtmlElement = $(e);
		this.docTag = pdocpin;
		this.Image = pdocImage;
		this.htmlTag;
		this.htmlFormContent;

		this.cpSetup();
		this.setWithImage();

		return this;
   }
    				
    $.pin.fn = $.pin.prototype = {pin: '0.0.1'};
	$.pin.fn.extend = $.pin.extend = $.extend;
	$.pin.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		
			$('#ImageContent').after(String.format(
			'<div id="pin{0}" style="position:absolute"><div class="img-dorp-content"><img  src="images/drop-pin.png" class="img-droped-pin"></div>'+
				//'<div id="tagForm" class="tagform ">'+
					'<div id="formContent" class="form pinSet">'+
						/*'<div>Name : <input id="data" type="text" class="inputbox"/></div>'+
						'<div class="btncontent">'+
							'<div id="btnOk" class="btnclass">Ok</div>'+
							'<div id="btncancel" class="btnclass">Cancel</div>'+
						'</div>'+*/
					'</div>'+
				//'</div>'+
			'</div>',this.docTag.Tag_id));
			
			
			this.htmlTag = $(String.format('#pin{0}',this.docTag.Tag_id));
			this.htmlFormContent = $('#formContent',this.htmlTag);
			
			$(this.htmlTag).css('left', this.docTag.pin_x);//setleft);
			$(this.htmlTag).css('top',this.docTag.pin_y);//settop);	

			//$(this.htmlTag).bind('mouseenter', function(event){self.htmlPin_mouseenter(event)});
			//$(this.htmlTag).bind('mouseleave', function(event){self.htmlPin_leave(event)});
			//$(this.htmlTag).bind('mousewheel', function(event,delta){self.htmlPin_scrollTop(event,delta)});
			$('.img-droped-pin',this.htmlTag).bind('click', function(event){self.htmlPin_click(event)});
			
	},
	
	setWithImage : function()
	{
	var self = this;
		
	    var img = new Image();
        img.src = $('#tagImg').attr('src');
		this.OriginalImage_W = img.width;
		this.OriginalImage_H = img.height;

		var Hrai= parseFloat(this.OriginalImage_H/this.Image.currntHeight);
		
		var vpoint_X = parseFloat(this.docTag.pin_x/ Hrai);
		var vpoint_Y = parseFloat(this.docTag.pin_y/Hrai); 
		
		var pointx;
		var pointy;	
		
	    var parentOffset = $(this.chtmlElement).offset(); 
		
		var xx =	parseInt(vpoint_X) + parseInt(parentOffset.left)
		var yy =	parseInt(vpoint_Y) + parseInt(parentOffset.top)
			
		if(parseInt(this.Image.currntLeft) < 0)
		pointx = parseInt(xx) - Math.abs(this.Image.currntLeft);
		else
		pointx = parseInt(xx) + Math.abs(this.Image.currntLeft);
		
		if(parseInt(this.Image.currntTop) < 0)
		pointy = parseInt(yy) - Math.abs(this.Image.currntTop);
		else
		pointy = parseInt(yy) + Math.abs(this.Image.currntTop);
		

		(this.htmlTag).stop();
		     $(this.htmlTag).animate({
            //"width": this.currntwidth,
            //
			"left": pointx -7,
			"top": pointy -7,
            //"marginLeft": distance
            },400);
		
		//$('#codinates').html(String.format("<div>Original_H: {0} | OriginalImage_W:{1} | Point X : {2} | Point Y : {3}</div>"+"<div> IMGcurrent_Left:{4} | IMGcurrent_Top:{5} | ImgcurrentHeight : {6}</div>",this.OriginalImage_H,this.OriginalImage_W,pointx,pointy,this.currntLeft,this.currntTop, this.currntHeight));
		
		},
	

	htmlPin_click : function()
	{
		$(this).trigger('pinclick',[this]);
	},

	htmlPin_mouseenter : function()
	{
		$('body').css({'overflow':'hidden'});
	},
	
	htmlPin_leave : function()
	{
		$('body').css({'overflow':'auto'});
	},
	htmlPin_scrollTop : function(event,delta)
	{
		$(this).trigger('scroll',[delta]);
	}
	
	
	});
})(jQuery)	