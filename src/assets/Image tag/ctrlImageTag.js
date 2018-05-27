/**
 * ctrlImageTag.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlImageTag */
    $.fn.ctrlImageTag = function() { return new $.ctrlImageTag(this) } ;
	$.ctrlImageTag = function (e) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementInputctrl;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.chtmlImgContent;
		this.chtmlResultContent;
		
		this.chtmlzoomPlus;
		this.chtmlzoomMin;
		//this.chtmlmoveLeft; 
		//this.chtmlmoveRight;
		//this.chtmlmoveDown;
		//this.chtmlmoveUp;
		//this.chtmlmoveCenter;
		
		this.savewidth;
		this.saveHeight;
		this.saveLeft;
		this.saveTop;
		
		
		this.currntwidth;
		this.currntHeight;
		this.currntLeft;
		this.currntTop;
		
		this.OriginalImage_W;
		this.OriginalImage_H;
		
		this.chtmlPin;
		this.point_X;
		this.point_Y;
		
		this.DragStartX;
		this.DragStartY;
		
		this.isPointSelect = false;
		
		this.chtmlElementClose;

		this.cpSetup();

		this.pointset = false;
		return this;
   }
    				
	/* EXTEND ctrlInput */
    $.ctrlImageTag.fn = $.ctrlImageTag.prototype = {ctrlImageTag: '0.0.1'};
	$.ctrlImageTag.fn.extend = $.ctrlImageTag.extend = $.extend;
	$.ctrlImageTag.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
	/*	this.chtmlElement.html(
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
		*/

		this.chtmlElementLable = $('#Label',this.chtmlElement);
		this.chtmlElementContent = $('#ctrltextbox',this.chtmlElement);
		this.chtmlElementCtrlContent = $('#ctrlcontent',this.chtmlElement);
		this.chtmlImgContent = $('#ImageContent',this.chtmlElement);
		this.chtmlResultContent = $('#resultContent',this.chtmlElement);
		this.chtmlzoomPlus = $('#zoomPuls',this.chtmlElement);
		this.chtmlzoomMin = $('#zoomMinus',this.chtmlElement);
		

		//this.chtmlmoveLeft = $('#moveLeft',this.chtmlElement);
		//this.chtmlmoveRight = $('#moveRight',this.chtmlElement);
		//this.chtmlmoveDown = $('#moveDown',this.chtmlElement);
		//this.chtmlmoveUp = $('#moveUp',this.chtmlElement);
		//this.chtmlmoveCenter = $('#moveCenter',this.chtmlElement);	

		this.chtmlPin = $('#pinimg',this.chtmlElement);		
		
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
		//this.chtmlmoveLeft.unbind('click');
		//this.chtmlmoveRight.unbind('click');
		//this.chtmlmoveDown.unbind('click');
		//this.chtmlmoveUp.unbind('click');
		//this.chtmlmoveCenter.unbind('click');

		//this.chtmlmoveLeft.bind('click', function(event){self.chtmlmoveLeft_click(event);});
		//this.chtmlmoveRight.bind('click', function(event){self.chtmlmoveRight_click(event);});
		//this.chtmlmoveDown.bind('click', function(event){self.chtmlmoveDown_click(event);});
		//this.chtmlmoveUp.bind('click', function(event){self.chtmlmoveUp_click(event);});
		//this.chtmlmoveCenter.bind('click', function(event){self.chtmlmoveCenter_click(event);});
		
		
		
		this.chtmlPin.unbind('mousedown'); 
		this.chtmlPin.bind('mousedown', function(event){self.chtmlPin_click(event);});
		
		this.chtmlImgContent.bind('mouseup', function(event){self.chtmlImgContent_mouserelese(event)});
		this.chtmlImgContent.bind('mousedown', function(event){self.chtmlImgContent_mousedown(event)});
		
		$('#ImageContent',this.chtmlElement).bind('mousewheel', function(event,delta){self.tagImg_scrollTop(event,delta);});	
				
		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		$('#ImageContent',this.chtmlElement).bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
		$('#ImageContent',this.chtmlElement).bind('mouseleave', function(event){self.chtmlElement_leave(event)});
		
		
		
			$('#pinimg').draggable({
			helper: "clone",
			appendTo: "body",
			zIndex: 150,
			cursorAt :{top:-1, left:-1}
			});
			
			
			var dragstartX;
			var dragstartY;
			
			$('#tagImg').draggable({drag: function(event){
			
				movePinX =(parseInt(event.pageX) - parseInt(self.DragStartX));
				movePinY = (parseInt(event.pageY) - parseInt(self.DragStartY));
				self.DragStartX = event.pageX;
				self.DragStartY = event.pageY;
				//(".img-droped-pin").css("left",(parseInt(".img-droped-pin").css("left"))+ movePinX);
				
				var pin = $(String.format('#pin{0}',"1"));
		
				
				var _left = parseInt($(pin).css("left"))
				var _top = parseInt($(pin).css("top"))
				if( movePinX < 0)
				{
					var left =	_left - Math.abs(movePinX);
					$(pin).css("left", left);
				}
				else
				{
					var left =_left + Math.abs(movePinX);
					$(pin).css("left", left)
				}
				if( movePinY < 0)
				{
					var top = _top - Math.abs(movePinY);
					$(pin).css("top", top);
				}
				else
				{
					var top = _top + Math.abs(movePinY);
					$(pin).css("top", top);
				}
				
				
			}
			});
			
		  
			
           var img = new Image();
           img.src = $('#tagImg').attr('src');
			this.OriginalImage_W = img.width;
			this.OriginalImage_H = img.height;

	},
	
	
	chtmlPin_click : function()
	{
		this.isPointSelect = true;
	},
	
	assignValues : function()
	{
	
		this.currntwidth = parseInt($("#tagImg").css("width"));
		this.currntHeight = parseInt($("#tagImg").css("height"));
		this.currntLeft = parseInt($("#tagImg").css("left"));
		if(this.currntLeft == undefined || this.currntLeft == null)
			this.currntLeft = parseInt($("#tagImg").css("right"));
		
		this.currntTop = parseInt($("#tagImg").css("top"));
		
		if(this.currntTop == undefined || this.currntTop == null)
			this.currntTop = parseInt($("#tagImg").css("bottom"));

	},
	
	animateImage : function()
	{
			$("#tagImg").stop();

            $("#tagImg").animate({
            //"width": this.currntwidth,
            "height": this.currntHeight,
			"left": this.currntLeft,
			"top": this.currntTop,
            //"marginLeft": distance
            },400);
	
	this.setpin();

	},
	
	chtmlImgContent_mouserelese : function(event)
	{
	var self = this;
	
	
		if(this.isPointSelect == true)
		{
		   $("#tagImg").stop();
		   
		   var parentOffset = $(this.chtmlImgContent).offset(); 
			var img = new Image();
			img.src = $('#tagImg').attr('src');
			this.OriginalImage_W = img.width;
			this.OriginalImage_H = img.height;
		   
		   this.assignValues();

			
			$('#ImageContent').after(String.format('<div id="pin{0}" style="position:absolute"><img  src="images/drop-pin.png" class="img-droped-pin"><div id="tagForm" class="tagform "><div id="formContent" class="formContent">'+
			'<div>Name : <input id="data" type="text" class="inputbox"/></div>'+
			'<div class="btncontent"><div id="btnOk" class="btnclass">Ok</div><div id="btncancel" class="btnclass">Cancel</div></div>'+
			'</div></div></div>',"1"));
			var pin = $(String.format('#pin{0}',"1"));
			
			var relX = parseInt(event.pageX) - parseInt(parentOffset.left);
			var relY = parseInt(event.pageY) - parseInt(parentOffset.top);
			
			$(pin).css('left', event.pageX);//setleft);
			$(pin).css('top',event.pageY);//settop);	

			$(".img-droped-pin",pin).bind('click',{'id':"1"}, function(event){self.pin_click(event)});
			$("#btnOk",pin).bind('click',{'id':"1"}, function(event){self.btnOk_click(event)});
			$("#btncancel",pin).bind('click',{'id':"1"}, function(event){self.btncancel_click(event)});
			btnOk
			
			
			//alert("left : "+ this.currntLeft);
			//alert("Top : "+ this.currntTop);
			
			this.savewidth = this.currntwidth;
			this.saveHeight = this.currntHeight;
			this.saveLeft = this.currntLeft;
			this.saveTop = this.currntTop;
			
			
			var vpoint_X;
			var vpoint_Y;

		
			
			var Hrai= parseFloat(this.OriginalImage_H/this.currntHeight);
					
			this.point_X = parseInt(relX * Hrai);
			this.point_Y = parseInt(relY * Hrai);
			
			if(parseInt(this.currntLeft) < 0)
			this.point_X = parseInt(this.point_X) + Math.abs(this.currntLeft * Hrai);
			else
			this.point_X = parseInt(this.point_X) - Math.abs(this.currntLeft *  Hrai);
			
			if(parseInt(this.currntTop) < 0)
			this.point_Y  = parseInt(this.point_Y ) + Math.abs(this.currntTop * Hrai);
			else
			this.point_Y  = parseInt(this.point_Y ) - Math.abs(this.currntTop * Hrai);
				
			this.pointset= true
			
					$('#codinates').html(String.format("<div>Original_H: {0} | OriginalImage_W:{1} | Point X : {2} | Point Y : {3}</div>"+"<div> IMGcurrent_Left:{4} | IMGcurrent_Top:{5} | ImgcurrentHeight : {6}</div>",this.OriginalImage_H,this.OriginalImage_W,this.point_X,this.point_Y,this.currntLeft,this.currntTop, this.currntHeight));

		}
		this.isPointSelect = false;
	},
	
	btnOk_click : function(event)
	{
		var self = this;
		var pin = $(String.format('#pin{0}',event.data.id));			
		var form = $("#tagForm",pin);
		form.addClass('aa-div-hide');
	

		var _data = $("#data").val();
		$('#resultContent').append(String.format("<div id='result{0}' class='resultDiv'> {1}</div>",event.data.id,_data));
		
		var result = $(String.format('#result{0}',"1"));
		$(result).bind('click',{'id':"1"}, function(event){self.result_click(event)});
		//this.setpin();
	},
	
	btncancel_click : function(event)
	{
		var pin = $(String.format('#pin{0}',event.data.id));			
		var form = $("#tagForm",pin);
		form.addClass('aa-div-hide');
	},
	result_click : function(event)
	{
		var pin = $(String.format('#pin{0}',event.data.id));			
		var form = $("#tagForm",pin);

		
		
		
		
			this.currntwidth = this.savewidth;
			this.currntHeight = this.saveHeight;
			this.currntLeft = this.saveLeft;
			this.currntTop = this.saveTop;
			
			this.animateImage();
			
			$('.img-droped-pin',pin).animate({
            "width": 30,
            "height": 30,
			"left": -10,
			"top": -10,
            //"marginLeft": distance
            },400,function(){
			
			for(i=0; i<2;i++)
			{
				$('.img-droped-pin',pin).animate({
				"width": 20,
				"height": 20,
				"left": -0,
				"top": -0,
				//"marginLeft": distance
				},200);
							$('.img-droped-pin',pin).animate({
				"width": 30,
				"height": 30,
				"left": -10,
				"top": -10,
				//"marginLeft": distance
				},200);
				$('.img-droped-pin',pin).animate({
				"width": 20,
				"height": 20,
				"left": -0,
				"top": -0,
				//"marginLeft": distance
				},200);
			}
			
			});

			

			
	
	},
	
	
	pin_click : function(event)
	{
		var pin = $(String.format('#pin{0}',event.data.id));
			
		var form = $("#tagForm",pin);//.removeClass('aa-div-hide');
		
		if(form.hasClass('aa-div-hide'))
		{
			form.removeClass('aa-div-hide');
		}
		else
		{
			form.addClass('aa-div-hide');
		}
	},
	
	setpin : function()
	{
	var self = this;
	if(this.pointset== false)
	{
	return;
	}
	else
	{
	
	
	    var img = new Image();
        img.src = $('#tagImg').attr('src');
		this.OriginalImage_W = img.width;
		this.OriginalImage_H = img.height;

		var Hrai= parseFloat(this.OriginalImage_H/this.currntHeight);
		
		var vpoint_X = parseFloat(this.point_X/ Hrai);
		var vpoint_Y = parseFloat(this.point_Y/Hrai); 
		
		var pointx;
		var pointy;	
		
		var pin = $(String.format('#pin{0}',"1"));
	    var parentOffset = $(this.chtmlImgContent).offset(); 
		
		var xx =	parseInt(vpoint_X) + parseInt(parentOffset.left)
		var yy =	parseInt(vpoint_Y) + parseInt(parentOffset.top)
			
		if(parseInt(this.currntLeft) < 0)
		pointx = parseInt(xx) - Math.abs(this.currntLeft);
		else
		pointx = parseInt(xx) + Math.abs(this.currntLeft);
		
		if(parseInt(this.currntTop) < 0)
		pointy = parseInt(yy) - Math.abs(this.currntTop);
		else
		pointy = parseInt(yy) + Math.abs(this.currntTop);
		

		(pin).stop();
		     $(pin).animate({
            //"width": this.currntwidth,
            //
			"left": pointx,
			"top": pointy ,
            //"marginLeft": distance
            },400);
		

		
		}
				
		$('#codinates').html(String.format("<div>Original_H: {0} | OriginalImage_W:{1} | Point X : {2} | Point Y : {3}</div>"+"<div> IMGcurrent_Left:{4} | IMGcurrent_Top:{5} | ImgcurrentHeight : {6}</div>",this.OriginalImage_H,this.OriginalImage_W,pointx,pointy,this.currntLeft,this.currntTop, this.currntHeight));
	},
	
	
	/*chtmlmoveLeft_click : function()
	{
		this.assignValues();
		this.currntLeft = parseInt(this.currntLeft)- 100;
		this.animateImage();
	},
	chtmlmoveRight_click: function()
	{
		this.assignValues();
		this.currntLeft = parseInt(this.currntLeft)+ 100;
		this.animateImage();
	},	
	chtmlmoveDown_click : function()
	{
		this.assignValues();
		this.currntTop = parseInt(this.currntTop)+ 100;
		this.animateImage();
	},
	chtmlmoveUp_click : function()
	{
		this.assignValues();
		this.currntTop = parseInt(this.currntTop)- 100;
		this.animateImage();
	},
	*/
	chtmlzoomPlus_click : function()
	{	
		this.assignValues();
		//this.currntwidth = parseInt(this.currntwidth)+ 100;
		this.currntHeight = parseInt(this.currntHeight)+ 600;
		this.currntLeft = parseInt(this.currntLeft)- 300;
		this.currntTop = parseInt(this.currntTop)- 300;
		this.animateImage();	
	},
	
	chtmlzoomMin_click : function()
	{
		this.assignValues();
		//this.currntwidth = parseInt(this.currntwidth) - 100;
		this.currntHeight = parseInt(this.currntHeight) - 600;
		this.currntLeft = parseInt(this.currntLeft)+ 300;
		this.currntTop = parseInt(this.currntTop)+ 300;
		this.animateImage();
	},
		
		
	tagImg_scrollTop : function(event,delta)
	{
	

		var self = this;
		$("#tagImg").stop();
		   if(delta > 0)
		   {
			this.chtmlzoomPlus_click();
		   }
		   else{
			this.chtmlzoomMin_click();
		   }
	   
	},
		
	chtmlImgContent_mousedown : function(event)
	{
		$("#tagImg").stop();
			this.DragStartX = event.pageX;
			this.DragStartY = event.pageY;
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