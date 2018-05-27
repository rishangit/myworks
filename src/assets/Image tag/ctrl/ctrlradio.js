/**
 * ctrlradio.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlradio */
    $.fn.ctrlradio = function(pElement) { return new $.ctrlradio(this, pElement) } ;
	$.ctrlradio = function (e,pElement) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementInputctrl;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.cDocumentElement = pElement;
		this.chtmlElementClose;
        this.SubElementarray;
		
		this.cPermission = pElement.cSPermissionType;
		
		this.cpSetup();
		this.cpRedrow();
		
		return this;
   }
    				
	/* EXTEND ctrlradio */
    $.ctrlradio.fn = $.ctrlradio.prototype = {ctrlradio: '0.0.1'};
	$.ctrlradio.fn.extend = $.ctrlradio.extend = $.extend;
	$.ctrlradio.fn.extend({
	
	
	cpSetup : function()
	{
	   
		var self = this;
		this.chtmlElement.html(String.format("<div id='ctrldropdown{0}' class='af-element-content'>"+
			"<div id='Label{1}'> {2} </div>"+
			"<div id='ctrlcontent{3}' style='width:360px;float:left;'></div>"+
		"</div>",
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementLable,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId));
		
		this.chtmlElementLable = $(String.format('#Label{0}',this.cDocumentElement.cSElementId));
		
		this.chtmlElementContent = $(String.format('#ctrldropdown{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementCtrlContent = $(String.format('#ctrlcontent{0}',this.cDocumentElement.cSElementId));
		var elementclose = $(String.format('#close{0}',this.cDocumentElement.cSElementId));
		
		
		elementclose.unbind('click');
		elementclose.bind('click', function(event){self.elementclose_click(event);});
		
		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		this.chtmlElement.bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
		
		//set element lable align
		setElementAlign(this.cDocumentElement,this.chtmlElementLable,this.chtmlElementCtrlContent,this.chtmlElementContent);
		
				
	},
		
	cpRedrow : function()
	{
	    this.cpPopulateRadioOption();
	    this.radio_bind_event();
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

		switch(this.cDocumentElement.cSElementSubType)
		{
		    case '0':
    		this.SubElementarray = self.cDocumentElement.cLElementSubElement;
		    break;
		    case '1':
    		this.SubElementarray = yesnojason;
		    break;
		    case '2':
    		this.SubElementarray = yesnoUnknownjason;
		    break;
		}
		
		if(this.SubElementarray != null && this.SubElementarray != undefined)
		{
				switch(this.cDocumentElement.cSSubElementAlign)
				{
					case "0":
						$.each(this.SubElementarray, function(index, value){
						lreturnstring = lreturnstring + 
						 String.format("<div class='af-radiocontent0'><div class='af-radioinput'><input id='radio{0}' type='radio'  value='{1}' name='{2}'  class='af-radoctrl'/></div><div class='af-radiolabel0'>{3}</div></div>",
						 value.cSSubElementId,
						 value.cSSubElementId,
						 self.cDocumentElement.cSElementId,
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
						$.each(this.SubElementarray, function(index, value){
							 
							 switch(i)
							 {
							 case "0":
								$(htmlradiotable).append(String.format("<tr id='radiorow{0}{1}'></tr>",
								self.cDocumentElement.cSElementId,
								index));
								htmldatarow = $(String.format("#radiorow{0}{1}",self.cDocumentElement.cSElementId,index));
								
								$(htmldatarow).append(String.format("<td class='af-radio-subtd'><div class='af-radioinput'><input id='radio{0}' type='radio'  value='{1}' name='{2}'  class='af-radoctrl'/></div><div style='font-size:12px;margin-left:20px;'>{3}<div></td>",
								value.cSSubElementId,
								 value.cSSubElementId,
								 self.cDocumentElement.cSElementId,
								 value.cSSubElementLable));
								

							 i="1";
							 break;
							 
							 case "1":
								$(htmldatarow).append(String.format("<td class='af-radio-subtd'><div class='af-radioinput'><input id='radio{0}' type='radio'  value='{1}' name='{2}'  class='af-radoctrl'/></div><div style='font-size:12px;margin-left:20px;'>{3}</td>",
								value.cSSubElementId,
								 value.cSSubElementId,
								 self.cDocumentElement.cSElementId,
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
						$.each(this.SubElementarray, function(index, value){
							 
							 switch(i)
							 {
							 case "0":
								$(htmlradiotable).append(String.format("<tr id='radiorow{0}{1}'></tr>",
								self.cDocumentElement.cSElementId,
								index));
								htmldatarow = $(String.format("#radiorow{0}{1}",self.cDocumentElement.cSElementId,index));
								
								$(htmldatarow).append(String.format("<td class='af-radio-subtd2'><div class='af-radioinput'><input id='radio{0}' type='radio'  value='{1}' name='{2}'  class='af-radoctrl'/></div><div style='font-size:12px;margin-left:20px;'>{3}<div></td>",value.cSSubElementId,
								 value.cSSubElementId,
								 self.cDocumentElement.cSElementId,
								 value.cSSubElementLable));
								

							 i="1";
							 break;
							 case "1":
								$(htmldatarow).append(String.format("<td class='af-radio-subtd2'><div class='af-radioinput'><input id='radio{0}' type='radio'  value='{1}' name='{2}'  class='af-radoctrl'/></div><div style='font-size:12px;margin-left:20px;'>{3}</td>",value.cSSubElementId,
								 value.cSSubElementId,
								 self.cDocumentElement.cSElementId,
								 value.cSSubElementLable));
							 i="2";
							 break;
							case "2":
								$(htmldatarow).append(String.format("<td class='af-radio-subtd2'><div class='af-radioinput'><input id='radio{0}' type='radio'  value='{1}' name='{2}'  class='af-radoctrl'/></div><div style='font-size:12px;margin-left:20px;'>{3}</td>",value.cSSubElementId,
								 value.cSSubElementId,
								 self.cDocumentElement.cSElementId,
								 value.cSSubElementLable));
							 i="0";
							 break;
							 
							 }				
						});
					break;
					
					
					case "3":
					
						$.each(this.SubElementarray, function(index, value){
						lreturnstring = lreturnstring + 
						 String.format("<div class='af-radiocontent1'><div class='af-radioinput'><input id='radio{0}' type='radio'  value='{1}' name='{2}'   class='af-radoctrl'/></div><div class='af-radiolabel1'>{3}</div></div>",
						 value.cSSubElementId,
						 value.cSSubElementId,
						 self.cDocumentElement.cSElementId,
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
	 		$.each(this.SubElementarray, function(index, value){
	 		
	 		 ctrlRadio = $(String.format('#radio{0}',value.cSSubElementId),self.chtmlElement);
	 		 ctrlRadio.unbind('click', function(){self.ctrlRadio_click(event,value.cSSubElementId)});
             ctrlRadio.bind('click', function(){self.ctrlRadio_click(event,value.cSSubElementId)});
             
             if (self.cDocumentElement.cSElementTextData == value.cSSubElementId)
             {
             ctrlRadio.attr('checked','checked');
             }
			});
	 },
	
    ctrlRadio_click : function(event,id)
    {
    	if(this.cDocumentElement.cSElementTextData != id)	
		this.cDocumentElement.cSElementTextData = id;
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