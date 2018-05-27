/**
 * ctrlImageTag.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlImageTag */
    $.fn.ctrlImageTag = function(pPinArray,pSections) { return new $.ctrlImageTag(this,pPinArray,pSections) } ;
	$.ctrlImageTag = function (e,pPinArray,pSections) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementInputctrl;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.chtmlImgContent;
		this.chtmlResultContent;
		
		this.ResultsArray = new Array();
		this.h_ResultsArray = new Hashtable();
		
		this.h_htmlpinsArray = new Hashtable();
		this.pinsArray = pPinArray;
		this.htmlpinsArray = new Array();
		
		this.sections = pSections;
		
		this.chtmlzoomPlus;
		this.chtmlzoomMin;
		//this.chtmlmoveLeft; 
		//this.chtmlmoveRight;
		//this.chtmlmoveDown;
		//this.chtmlmoveUp;
		//this.chtmlmoveCenter;
		
		//this.savewidth;
		//this.saveHeight;
		//this.saveLeft;
		//this.saveTop;
		
		
		this.currntwidth;
		this.currntHeight;
		this.currntLeft;
		this.currntTop;
		
		this.OriginalImage_W;
		this.OriginalImage_H;
		this.OriginalImage_R;
		
		this.chtmlPin;
		this.point_X;
		this.point_Y;

		this.chtmlArea;
		
		this.DragStartX;
		this.DragStartY;
		this.isPointSelect = false;
		this.isareaSelect = false;
		
		this.htmlsectionContent;
	
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
		
	/*	if(this.pinsArray != undefined && this.pinsArray != null && this.pinsArray.length > 0)
		{
			$.each(this.pinsArray, function(index, value){
			
				self.h_Pins.put(value.Tag_id,value);
			
			});
		}
	*/	
		//this.htmlsectionContent = $('#SecContent').sectionContain(this.sections);


		
		//this.chtmlElementLable = $('#Label',this.chtmlElement);
		//this.chtmlElementContent = $('#ctrltextbox',this.chtmlElement);
		//this.chtmlElementCtrlContent = $('#ctrlcontent',this.chtmlElement);
		this.chtmlImgContent = $('#ImageContent',this.chtmlElement);
		this.chtmlResultContent = $('#resultContent',this.chtmlElement);
		this.chtmlzoomPlus = $('#zoomPuls',this.chtmlElement);
		this.chtmlzoomMin = $('#zoomMinus',this.chtmlElement);
		this.chtmlPin = $('#pinimg',this.chtmlElement);	//pin
		this.chtmlArea = $('#area',this.chtmlElement);	//pin	

		this.chtmlzoomPlus.unbind('click');
		this.chtmlzoomPlus.bind('click', function(event){self.chtmlzoomPlus_click(event);});
		this.chtmlzoomMin.unbind('click');
		this.chtmlzoomMin.bind('click', function(event){self.chtmlzoomMin_click(event);});
		
		this.chtmlPin.unbind('mousedown'); 
		this.chtmlPin.bind('mousedown', function(event){self.chtmlPin_click(event);});
		
		this.chtmlArea.unbind('click'); 
		this.chtmlArea.bind('click', function(event){self.chtmlArea_click(event);});
				
		this.chtmlImgContent.bind('mouseup', function(event){self.chtmlImgContent_mouserelese(event)});
		this.chtmlImgContent.bind('mousedown', function(event){self.chtmlImgContent_mousedown(event)});
		
		$('#ImageContent',this.chtmlElement).bind('mousewheel', function(event,delta){self.tagImg_scrollTop(event,delta);});	
				
//		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		$('#ImageContent',this.chtmlElement).bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
		$('#ImageContent',this.chtmlElement).bind('mouseleave', function(event){self.chtmlElement_leave(event)});
		
		
		
			$('#pinimg').draggable({
			helper: "clone",
			appendTo: "body",
			zIndex: 150,
			cursorAt :{top:-1, left:-1}
			});

		this.setImagedragable();

	},
	
	
	setImagedragable : function()
	{
	var self = this;
			var dragstartX;
			var dragstartY;
			
			$('#tagImg').draggable({drag: function(event){
			
				movePinX =(parseInt(event.pageX) - parseInt(self.DragStartX));
				movePinY = (parseInt(event.pageY) - parseInt(self.DragStartY));
				self.DragStartX = event.pageX;
				self.DragStartY = event.pageY;
				
				if( self.h_htmlpinsArray.size() > 0)
				{
					$.each(self.h_htmlpinsArray.values(), function(index, value){
						var htmlpin = value;
						//htmlpin.htmlTag 
						
						var _left = parseInt($(htmlpin.htmlTag).css("left"));
						var _top = parseInt($(htmlpin.htmlTag).css("top"));
						
						if( movePinX < 0)
						{
							var left =	_left - Math.abs(movePinX);
							$(htmlpin.htmlTag).css("left", left);
						}
						else
						{
							var left =_left + Math.abs(movePinX);
							$(htmlpin.htmlTag).css("left", left)
						}
						if( movePinY < 0)
						{
							var top = _top - Math.abs(movePinY);
							$(htmlpin.htmlTag).css("top", top);
						}
						else
						{
							var top = _top + Math.abs(movePinY);
							$(htmlpin.htmlTag).css("top", top);
						}											
						});
				}
			}
			});
	},
	
	cpRedrow: function()
	{
		var self = this;
		$('#resultContent').html('');
		if(this.h_ResultsArray.size() > 0)
		{			
			$.each(this.h_ResultsArray.values(), function(index, value){
			
			var result = $('#resultContent').pinResults(value);
			$(result).unbind('resultclick');
			$(result).bind('resultclick', function(event, docTag){self.Result_click(event,docTag)});
			})		
		}
	},
	
	chtmlArea_click : function()
	{
		var self = this;
		var objjcrop;
		
		if(this.isareaSelect)
		{
		this.isareaSelect = false;
		this.setImagedragable();
		$('#tagImg').draggable( "enable" );
			
			$(this.chtmlImgContent).imgAreaSelect({remove:true});
		}
		else
		{
		this.isareaSelect = true;
		$('#tagImg').draggable( "disable" );
		
		$(this.chtmlImgContent).imgAreaSelect({        
		onSelectEnd: function (img, selection) {

			var obj = {};
			 obj.x1 = selection.x1;
             obj.y1 = selection.y1;
             obj.x2 = selection.x2;
             obj.y2 = selection.y2;
			
			var areaButton;
				if(!$('#btarea').length > 0)
				{
					$('.imgareaselect-border1').parent().after("<div id='btarea' class='btarea'>Done</div>")
				
				}	
				
				$('#btarea').unbind('click');
				$('#btarea').bind('click',{'data':obj },function(event){self.areaDone(event)});
			var parentOffset = $(self.chtmlImgContent).offset(); 
			
			btx =  parseInt(selection.x1) + parseInt(parentOffset.left);
			bty =  parseInt(selection.y1) + parseInt(parentOffset.top);
			
			$('#btarea').css('left',btx + 7);	
			$('#btarea').css('top',bty + 7);		
			}			
        });
		//this.chtmlImgContent.on('mousedown',function(event){self.chtmlImgContent_setAreaMouseDown(event)});
		
		}

	},
	
	
	areaDone: function(event)
	{
	
	 var self = this;
		//alert(event.data.data.x1);
		$(event.currentTarget).remove();
		$(this.chtmlImgContent).imgAreaSelect({remove:true});
		this.isareaSelect = false;
		$('#tagImg').draggable( "enable" );
		
			objXY1 = this.getPositionforOriginalImage(event.data.data.x1,event.data.data.y1,"A");
			objXY2 = this.getPositionforOriginalImage(event.data.data.x2,event.data.data.y2,"A");
		
			var objArea = {};
			objArea.Tag_id = guidGenerator(); 
			objArea.type = "A";
			
			objArea.IMG_width = this.currntwidth;
			objArea.IMG_height = this.currntHeight;
			objArea.IMG_left = this.currntLeft;
			objArea.IMG_top = this.currntTop;	

			
			objArea.area_x1 = objXY1.Original_x;
			objArea.area_y1 = objXY1.Original_y;
			objArea.area_x2 = objXY2.Original_x;
			objArea.area_y2 = objXY2.Original_y;
			objArea.section = "";

			
			var objImage = {};
			
			objImage.currntwidth = this.currntwidth;
			objImage.currntHeight = this.currntHeight;
			objImage.currntLeft = this.currntLeft;
			objImage.currntTop = this.currntTop;
		
			var htmlArea = $('#ImageContent').area(objArea,objImage);
			$(htmlArea).bind('scroll', function(event,delta){self.tagImg_scrollTop(event,delta)});
			$(htmlArea).bind('Tagclick', function(event,htmlArea){self.pin_pinclick(event,htmlArea)});
						
			this.h_htmlpinsArray.put(htmlArea.docTag.Tag_id, htmlArea)
			this.htmlpinsArray = this.h_htmlpinsArray.values();
			this.pin_pinclick(event,htmlArea);
		
		
		
	},
	
	chtmlImgContent_setAreaMouseDown: function(event)
	{
	//$('#data').html("X : "+event.dragDeltaX + "Y : "+ event.dragDeltaY)
	},
	
	
	Result_click: function(event,docpin)
	{
		
		var pin =	this.h_htmlpinsArray.get(docpin.Tag_id);
		
			
			this.currntwidth = docpin.IMG_width;
			this.currntHeight = docpin.IMG_height;
			this.currntLeft = docpin.IMG_left;
			this.currntTop = docpin.IMG_top;
			
			this.animateImage();
			
			if(pin.docTag.type == "P")
			{
				$('.img-droped-pin',pin.htmlTag).animate({
				"width": 20,
				"height": 20,
				"left": 5,
				"top": 5,
				//"marginLeft": distance
				},400,function(){
				
				for(i=0; i<1;i++)
				{
				
					$('.img-droped-pin',pin.htmlTag).animate({
					"width": 30,
					"height": 30,
					"left": 0,
					"top": 0,
					//"marginLeft": distance
					},200);
								$('.img-droped-pin',pin.htmlTag).animate({
					"width": 20,
					"height": 20,
					"left": 5,
					"top": 5,
					//"marginLeft": distance
					},200);
					$('.img-droped-pin',pin.htmlTag).animate({
					"width": 30,
					"height":30,
					"left": 0,
					"top": 0,
					//"marginLeft": distance
					},200);
				}
				
				});
			}else
			{
				/*width = parseInt($(pin.htmlBorderDiv).css('width'));
				height = parseInt($(pin.htmlBorderDiv).css('height'));
			
				var _width = width +100;
				var _height = height + 100;
			
				$('.areaboder',pin.htmlTag).animate({
				"width": _width,
				"height":_height,
				"left": 50,
				"top": 50,
				//"marginLeft": distance
				},400,function(){
				
				for(i=0; i<1;i++)
				{
				_width = width -100;
				_height = height- 100;
					$('.areaboder',pin.htmlTag).animate({
					"width": _width,
					"height": _height,
					"left": 0,
					"top": 0,
					//"marginLeft": distance
					},200);
					
				_width = width +100;
				_height = height + 100;
								$('.areaboder',pin.htmlTag).animate({
					"width": _width,
					"height": _height,
					"left": 50,
					"top": 50,
					//"marginLeft": distance
					},200);
					$('.areaboder',pin.htmlTag).animate({
					"width": _width,
					"height":_height,
					"left": 0,
					"top": 0,
					//"marginLeft": distance
					},200);
					
				_width = width -100;
				_height = height - 100;
				}
				
				});
			*/
			}

		
		
	},
	
	chtmlPin_click : function()
	{
		this.isPointSelect = true;
	},
	
	assignValues : function()
	{
	
		var img = new Image();
		img.src = $('#tagImg').attr('src');
		this.OriginalImage_W = img.width;
		this.OriginalImage_H = img.height;
		this.OriginalImage_R =  parseFloat(parseFloat(this.OriginalImage_H)/parseFloat(this.OriginalImage_W));
	
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
	var self = this;
			$("#tagImg").stop();

            $("#tagImg").animate({
            //"width": this.currntwidth,
            "height": this.currntHeight,
			"left": this.currntLeft,
			"top": this.currntTop,
            //"marginLeft": distance
            },400);

		if( this.h_htmlpinsArray.size() > 0)
		{
			$.each(this.h_htmlpinsArray.values(), function(index, value){
				var htmlpin = value;
				htmlpin.Image.currntwidth = self.currntwidth;
				htmlpin.Image.currntHeight = self.currntHeight;
				htmlpin.Image.currntLeft = self.currntLeft;
				htmlpin.Image.currntTop = self.currntTop;
			
				htmlpin.setWithImage();
				});
		}
	},
	
	getPositionforOriginalImage : function(_x,_y, type)
	{
			var parentOffset = $(this.chtmlImgContent).offset(); 
			var img = new Image();
			img.src = $('#tagImg').attr('src');
			this.OriginalImage_W = img.width;
			this.OriginalImage_H = img.height;
		   
		    this.assignValues();
			if(type == "P")
			{
				var relX = parseInt(_x)- parseInt(parentOffset.left);
				var relY = parseInt(_y)- parseInt(parentOffset.top);
			}
			else
			{
				var relX = parseInt(_x);
				var relY = parseInt(_y);
			}
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
			
			obj = {};
			obj.Original_x = this.point_X;
			obj.Original_y = this.point_Y;
			
		return obj;
	},
	
	chtmlImgContent_mouserelese : function(event)
	{
		var self = this;
	
		if(this.isPointSelect == true)
		{
		   $("#tagImg").stop();
		   
		   var ValforOrigin = this.getPositionforOriginalImage(event.pageX,event.pageY,"P");
		   
			var objPin = {};
			objPin.Tag_id = guidGenerator(); 
			objPin.type = "P";
			objPin.IMG_width = this.currntwidth;
			objPin.IMG_height = this.currntHeight;
			objPin.IMG_left = this.currntLeft;
			objPin.IMG_top = this.currntTop;			
			objPin.pin_x = ValforOrigin.Original_x;
			objPin.pin_y = ValforOrigin.Original_y;
			objPin.section = "";
						
			var objImage = {};
			
			objImage.currntwidth = this.currntwidth;
			objImage.currntHeight = this.currntHeight;
			objImage.currntLeft = this.currntLeft;
			objImage.currntTop = this.currntTop;
	
			var htmlpin = $('#ImageContent').pin(objPin,objImage);
			$(htmlpin).bind('scroll', function(event,delta){self.tagImg_scrollTop(event,delta)});
			$(htmlpin).bind('pinclick', function(event,htmlpin){self.pin_pinclick(event,htmlpin)});
						
			this.h_htmlpinsArray.put(htmlpin.docTag.Tag_id, htmlpin)
			this.htmlpinsArray = this.h_htmlpinsArray.values();
			this.pin_pinclick(event,htmlpin);
		}
		this.isPointSelect = false;
	},

	
	pin_pinclick : function(event,phtmlpin)
	{
		var self = this;

		$('.form').html('');
		this.htmlsectionContent = $(phtmlpin.htmlFormContent).sectionContain(this.sections,phtmlpin);
		$(this.htmlsectionContent).bind('pinDataAdd', function(event,docTag){self.pinDataAdd_click(event,docTag)})
		$(this.htmlsectionContent).bind('pindelete', function(event,docTag){self.pin_pindelete(event,docTag)});		
		
	},

	pin_pindelete : function(event,docTag)
	{
		this.h_ResultsArray.remove(docTag.Tag_id);
		this.ResultsArray = this.h_ResultsArray.values();
		this.cpRedrow();
	},
	
	pinDataAdd_click: function(event,docTag)
	{
		if(this.h_ResultsArray.containsKey(docTag.Tag_id))
		{
			this.h_ResultsArray.remove(docTag.Tag_id);
		}	
		
		this.h_ResultsArray.put(docTag.Tag_id,docTag)		
		this.ResultsArray = this.h_ResultsArray.values();
		this.cpRedrow();
		//var Htmlresult =$('#resultContent').
	},
	
	chtmlzoomPlus_click : function()
	{	
		this.assignValues();
		var previusheight = parseInt(this.currntHeight)
		this.currntHeight = parseInt(this.currntHeight)+ previusheight* 0.4;
		
		var nowwidth = this.currntHeight / this.OriginalImage_R
		
		this.currntLeft = this.currntLeft - (nowwidth - this.currntwidth)/2;		
		this.currntTop = parseInt(this.currntTop)- (previusheight * 0.2);
		this.animateImage();	
	},
	
	chtmlzoomMin_click : function()
	{
		this.assignValues();
		
		if(parseInt(this.currntHeight) > 600 )
		{
		var previusheight = parseInt(this.currntHeight)
		this.currntHeight = parseInt(this.currntHeight) - previusheight* 0.4;
		//this.currntLeft = parseInt(this.currntLeft)+ 600;
		var nowwidth = this.currntHeight / this.OriginalImage_R
		
		this.currntLeft = this.currntLeft + (this.currntwidth - nowwidth)/2;
		this.currntTop = parseInt(this.currntTop)+ (previusheight* 0.2);
		this.animateImage();
		}
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
	
	

	
	chtmlElement_mouseenter : function()
	{
		$('body').css({'overflow':'hidden'});
		$(this).trigger('elementmouseenter',[this]);
	},
	
	chtmlElement_leave : function()
	{
		$('body').css({'overflow':'auto'});
		$(this).trigger('elementmouseenter',[this]);
	}
	
	
	
	});
})(jQuery)