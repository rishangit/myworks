/**
 * ctrlmultiselect.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlmultiselect */
    $.fn.ctrlmultiselect = function(pElement) { return new $.ctrlmultiselect(this, pElement) } ;
	$.ctrlmultiselect = function (e,pElement) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementInputctrl;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.cDocumentElement = pElement;
		this.chtmlElementClose;
		this.slectedSubElements;

		this.cPermission = pElement.cSPermissionType;
		
		this.cpSetup();
		this.cpRedrow();
		
		return this;
   }
    				
	/* EXTEND ctrlradio */
    $.ctrlmultiselect.fn = $.ctrlmultiselect.prototype = {ctrlmultiselect: '0.0.1'};
	$.ctrlmultiselect.fn.extend = $.ctrlmultiselect.extend = $.extend;
	$.ctrlmultiselect.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		this.chtmlElement.html(String.format("<div id='ctrlmultiselect{0}' class='af-element-content'>"+
			"<div id='Label{1}'> {2} </div>"+
			"<div id='ctrlcontent{3}' style='width:360px;float:left;'></div>"+
		"</div>",
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementLable,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId));
		
		this.chtmlElementLable = $(String.format('#Label{0}',this.cDocumentElement.cSElementId));
		
		this.chtmlElementContent = $(String.format('#ctrlmultiselect{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementCtrlContent = $(String.format('#ctrlcontent{0}',this.cDocumentElement.cSElementId));
		var elementclose = $(String.format('#close{0}',this.cDocumentElement.cSElementId));
		
		
		elementclose.unbind('click');
		elementclose.bind('click', function(event){self.elementclose_click(event);});
		
		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		this.chtmlElement.bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
		
		//set element lable align
		setElementAlign(this.cDocumentElement,this.chtmlElementLable,this.chtmlElementCtrlContent,this.chtmlElementContent);
				
	}
	,
	
	
	
	cpRedrow : function()
	{
		if(this.cDocumentElement.cLElementSubElement != null || this.cDocumentElement.cLElementSubElement != undefined)
		{
		    this.cpPopulateRadioOption();
		    this.radio_bind_event();
		}

		this.cpPermission();

	},
	
		
	cpPermission : function()
	{
        

	    switch(this.cPermission)
	    {
	        case "2":  
	        
	            $('input',this.chtmlElement).each(function(index, value){      
	                $(this).attr('disabled','disabled');  
	                $(this).addClass('af_ctrl_disable');
	            });
	        break;
	        
	        case "3":
	        	$('input',this.chtmlElement).each(function(index, value){      
	                $(this).removeAttr('disabled','disabled');  
	                $(this).removeClass('af_ctrl_disable');
	            });

	        break;
	        
	        case "1":
	            $('input',this.chtmlElement).each(function(index, value){      
	                $(this).removeAttr('disabled','disabled');  
	                $(this).removeClass('af_ctrl_disable');
	            });
	        
	            
	            this.chtmlElement.addClass('aa-div-hide');

	        break;
	        
	        default:
	            this.chtmlElementDatectrl.attr('disabled','disabled');  
	            this.chtmlElementDatectrl.addClass('af_ctrl_disable');
	        break

	        
	    }
	},
	
	
	cpPopulateRadioOption : function()
	 {
		var self = this;
		self.chtmlElementCtrlContent.html("");
		lreturnstring = '';

			if(this.cDocumentElement.cLElementSubElement.length != 0)
			{
				switch(this.cDocumentElement.cSSubElementAlign)
				{
					case "0":
						$.each(this.cDocumentElement.cLElementSubElement, function(index, value){
						lreturnstring = lreturnstring + 
						 String.format("<div class='af-radiocontent0'><input id='radio{0}' type='checkbox'  value='{1}' name='{2}'  style='float:left' class='af-checkInput'/><div class='af-radiolabel0'>{3}</div></div>",
						 value.cSSubElementId,
						 value.cSSubElementId,
						 value.cSElementId,
						 value.cSSubElementLable);
						})


					this.chtmlElementCtrlContent.html(lreturnstring);
					break;
					
					case "1":
					
						var i = "0";
						
						var htmlrow;
						this.chtmlElementCtrlContent.append(String.format("<table id='radiotable{0}'></table>",this.cDocumentElement.cSElementId));
						
						var htmlradiotable = $(String.format("#radiotable{0}",this.cDocumentElement.cSElementId));
						var htmldatarow;
						$.each(this.cDocumentElement.cLElementSubElement, function(index, value){
							 
							 switch(i)
							 {
							 case "0":
								$(htmlradiotable).append(String.format("<tr id='radiorow{0}{1}'></tr>",
								self.cDocumentElement.cSElementId,
								index));
								htmldatarow = $(String.format("#radiorow{0}{1}",self.cDocumentElement.cSElementId,index));
								
								$(htmldatarow).append(String.format("<td class='af-radio-subtd'><input id='radio{0}' type='checkbox'  value='{1}' name='{2}' style='float:left' class='af-checkInput'/><div style='font-size:12px;margin-left:20px;'>{3}<div></td>",value.cSSubElementId,
								 value.cSSubElementId,
								 value.cSElementId,
								 value.cSSubElementLable));
								

							 i="1";
							 break;
							 
							 case "1":
								$(htmldatarow).append(String.format("<td class='af-radio-subtd'><input id='radio{0}' type='checkbox' value='{1}' name='{2}' style='float:left' class='af-checkInput'/><div style='font-size:12px;margin-left:20px;'>{3}</td>",value.cSSubElementId,
								 value.cSSubElementId,
								 value.cSElementId,
								 value.cSSubElementLable));
							 i="0";
							 break;
							 
							 }				
						});
					break;
					
					
					case "2":
					
						var i = "0";
						
						var htmlrow;
						this.chtmlElementCtrlContent.append(String.format("<table id='radiotable{0}'></table>",this.cDocumentElement.cSElementId));
						
						var htmlradiotable = $(String.format("#radiotable{0}",this.cDocumentElement.cSElementId));
						var htmldatarow;
						$.each(this.cDocumentElement.cLElementSubElement, function(index, value){
							 
							 switch(i)
							 {
							 case "0":
								$(htmlradiotable).append(String.format("<tr id='radiorow{0}{1}'></tr>",
								self.cDocumentElement.cSElementId,
								index));
								htmldatarow = $(String.format("#radiorow{0}{1}",self.cDocumentElement.cSElementId,index));
								
								$(htmldatarow).append(String.format("<td class='af-radio-subtd2'><input id='radio{0}' type='checkbox'  value='{1}' name='{2}' style='float:left' class='af-checkInput'/><div style='font-size:12px;margin-left:20px;'>{3}<div></td>",value.cSSubElementId,
								 value.cSSubElementId,
								 value.cSElementId,
								 value.cSSubElementLable));
								

							 i="1";
							 break;
							 case "1":
								$(htmldatarow).append(String.format("<td class='af-radio-subtd2'><input id='radio{0}' type='checkbox'  value='{1}' name='{2}' style='float:left' class='af-checkInput'/><div style='font-size:12px;margin-left:20px;'>{3}</td>",value.cSSubElementId,
								 value.cSSubElementId,
								 value.cSElementId,
								 value.cSSubElementLable));
							 i="2";
							 break;
							case "2":
								$(htmldatarow).append(String.format("<td class='af-radio-subtd2'><input id='radio{0}' type='checkbox'  value='{1}' name='{2}' style='float:left' class='af-checkInput'/><div style='font-size:12px;margin-left:20px;'>{3}</td>",value.cSSubElementId,
								 value.cSSubElementId,
								 value.cSElementId,
								 value.cSSubElementLable));
							 i="0";
							 break;
							 
							 }				
						});
					break;
					
					
					case "3":
					
						$.each(this.cDocumentElement.cLElementSubElement, function(index, value){
						lreturnstring = lreturnstring + 
						 String.format("<div class='af-radiocontent1'><input id='radio{0}' type='checkbox'   value='{1}' name='{2}'  style='float:left' class='af-checkInput'/><div class='af-radiolabel1'>{3}</div></div>",
						 value.cSSubElementId,
						 value.cSSubElementId,
						 value.cSElementId,
						 value.cSSubElementLable);
						})
					this.chtmlElementCtrlContent.html(lreturnstring);
					this.chtmlElementCtrlContent.css({'width': '360px'});
					break;
				}
			}
		
		
		return lreturnstring;
		
	 },
	
		 
	 radio_bind_event : function()
	 {
	 var self = this;
	 var ctrlRadio;
	 		$.each(this.cDocumentElement.cLElementSubElement, function(index, value){
	 		var subelement = value;
	 		sid = value.cSSubElementId
	 		var ctrlCheckbox = $(String.format('#radio{0}',value.cSSubElementId));
	 		 ctrlCheckbox.unbind('click', function(event,sid){self.ctrlCheckbox_click(event,value.cSSubElementId)});
             ctrlCheckbox.bind('click', function(event,sid){self.ctrlCheckbox_click(event,value.cSSubElementId)});
            
            
            if(self.cDocumentElement.cSElementTextData != null || self.cDocumentElement.cSElementTextData != undefined)
            { 
             elementtextarray = self.cDocumentElement.cSElementTextData.split(',');
             
                 $.each(elementtextarray, function(index,value){
                    if(subelement.cSSubElementId == value && value !='')
                    {
                    ctrlCheckbox.attr('checked','true');
                    }
                 })
             }
             
             if (self.cDocumentElement.cSElementTextData == value.cSSubElementId)
             {
             ctrlCheckbox.attr('checked','true');
             }
			});
	 },
	
	
    ctrlCheckbox_click : function(event,id)
    {
	    this.slectedSubElements = "";
	    var self = this;
		$("input",this.chtmlElementCtrlContent).each(function(){
		if(this.checked == true)
			{
			strid = ($(this).attr('id').replace('radio',''));
			self.slectedSubElements = self.slectedSubElements + ','+ strid;
			}
		});
      
	   self.cDocumentElement.cSElementTextData = self.slectedSubElements;
	   
    },
	
	chtmlElement_click : function()
	{
		$(this).trigger('elementselect',[this]);
	},
	chtmlElement_mouseenter : function()
	{
		$(this).trigger('elementmouseenter',[this]);
	},
	elementclose_click : function(event)
	{
	$(this).trigger('elementclose',[this]);
	}
	
	
	});
})(jQuery)