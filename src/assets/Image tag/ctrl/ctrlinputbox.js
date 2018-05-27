/**
 * ctrlInput.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlInput */
    $.fn.ctrlInput = function(pElement) { return new $.ctrlInput(this, pElement) } ;
	$.ctrlInput = function (e,pElement) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementInputctrl;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.cDocumentElement = pElement;
		this.chtmlElementClose;
		
		this.cPermission = pElement.cSPermissionType;
		
		this.cpSetup();
		this.cpRedrow();
		
		return this;
   }
    				
	/* EXTEND ctrlInput */
    $.ctrlInput.fn = $.ctrlInput.prototype = {ctrlInput: '0.0.1'};
	$.ctrlInput.fn.extend = $.ctrlInput.extend = $.extend;
	$.ctrlInput.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		this.chtmlElement.html(String.format("<div id='ctrltextbox{0}' class='af-element-content'>"+
			"<div id='Label{1}'> {2} </div>"+
			"<div id='ctrlcontent{3}' style='width:auto;'><input id='ctrl{4}' {5} name='txt'/></div>"+
		"</div>",
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementLable,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementPassword == "1"? "type='password'" : "type='text'"));
		
		this.chtmlElementLable = $(String.format('#Label{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementInputctrl = $(String.format('#ctrl{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementContent = $(String.format('#ctrltextbox{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementCtrlContent = $(String.format('#ctrlcontent{0}',this.cDocumentElement.cSElementId));

		
		//this.chtmlElementInputctrl.bind('focusin', function(event) {self.chtmelElementInputCtrl_focusin(event)});
        this.chtmlElementInputctrl.bind('focusout', function(event) {self.chtmlElementInputctrl_focusout(event)});
		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		this.chtmlElement.bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
		
		
		//set element lable align
		setElementAlign(this.cDocumentElement,this.chtmlElementLable,this.chtmlElementCtrlContent,this.chtmlElementContent);


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
			
		//this.cpPermission();
				
	}
	,
	
	cpRedrow : function()
	{
	this.chtmlElementInputctrl.val(this.cDocumentElement.cSElementTextData);
	},
	
	

	cpPermission : function()
	{
        
    
	    switch(this.cPermission)
	    {
	        case "2":        
	            this.chtmlElementInputctrl.attr('disabled','disabled');  
	            this.chtmlElementInputctrl.addClass('af_ctrl_disable');
	        break;
	        
	        case "3":
	            this.chtmlElementInputctrl.removeAttr('disabled');
	            this.chtmlElementInputctrl.removeClass('af_ctrl_disable');
	        break;
	        
	        case "1":
	            this.chtmlElement.addClass('aa-div-hide');
	            this.chtmlElementInputctrl.removeAttr('disabled');
	            this.chtmlElementInputctrl.removeClass('af_ctrl_disable');
	        break;
	        
	        default:
	            this.chtmlElementInputctrl.attr('disabled','disabled');  
	            this.chtmlElementInputctrl.addClass('af_ctrl_disable');
	        break

	        
	    }
	},
	
	chtmlElement_click : function()
	{
		//$(this).trigger('elementselect',[this]);
	},
	chtmlElement_mouseenter : function()
	{
		//$(this).trigger('elementmouseenter',[this]);
	},
	elementclose_click : function(event)
	{
	//$(this).trigger('elementclose',[this]);
	},
	chtmlElementInputctrl_focusout : function(event)
	{
		if(this.cDocumentElement.cSElementTextData != this.chtmlElementInputctrl.val())	
		this.cDocumentElement.cSElementTextData = this.chtmlElementInputctrl.val();
	}
	
	
	
	});
})(jQuery)