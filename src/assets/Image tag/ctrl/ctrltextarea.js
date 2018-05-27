/**
 * ctrlTextArea.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlTextArea */
    $.fn.ctrlTextArea = function(pElement) { return new $.ctrlTextArea(this, pElement) } ;
	$.ctrlTextArea = function (e,pElement) {

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
    				
	/* EXTEND ctrlTextArea */
    $.ctrlTextArea.fn = $.ctrlTextArea.prototype = {ctrlTextArea: '0.0.1'};
	$.ctrlTextArea.fn.extend = $.ctrlTextArea.extend = $.extend;
	$.ctrlTextArea.fn.extend({
	
	
	cpSetup : function()
	{
	
		var self = this;
		this.chtmlElement.html(String.format("<div id='ctrltextbox{0}' class='af-element-content'>"+
			"<div id='Label{1}'> {2} </div>"+
			"<div id='ctrlcontent{3}' style='width:auto;'><textarea id='ctrl{4}' type='text' name='txt'></textarea></div>"+
		"</div>",
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementLable,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId));
		
		this.chtmlElementLable = $(String.format('#Label{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementTextArea = $(String.format('#ctrl{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementContent = $(String.format('#ctrltextbox{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementCtrlContent = $(String.format('#ctrlcontent{0}',this.cDocumentElement.cSElementId));
		var elementclose = $(String.format('#close{0}',this.cDocumentElement.cSElementId));
		
		
		elementclose.unbind('click');
		elementclose.bind('click', function(event){self.elementclose_click(event);});
		
		this.chtmlElementTextArea.bind('focusout', function(event) {self.chtmlElementTextArea_focusout(event)});
		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		this.chtmlElement.bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
		
		//set element lable align
		setElementAlign(this.cDocumentElement,this.chtmlElementLable,this.chtmlElementCtrlContent,this.chtmlElementContent);
				
	},
	
	cpRedrow : function()
	{
	
		this.chtmlElementTextArea.val(this.cDocumentElement.cSElementTextData);

		this.chtmlElementTextArea.removeClass();
		switch (this.cDocumentElement.cSElementSize)
		{
			 case '0':
			    this.chtmlElementTextArea.css({'width':'360px','height':'90px'});
		    break;
		    case '1':
			    this.chtmlElementTextArea.css({'width':'360px','height':'180px'});
		    break;
		    case '2':
			    this.chtmlElementTextArea.css({'width':'360px','height':'270px'});
		    break;
		    case '3':
			    this.chtmlElementTextArea.css({'width':'360px','height':'360px'});
		    break;
		    case '4':
			  this.chtmlElementTextArea.css({'width': this.cDocumentElement.cWidth});
			  this.chtmlElementTextArea.css({'height':this.cDocumentElement.cHeight});
		    break;
		    
		    default:
            this.chtmlElementTextArea.css({'width':'360px','height':'180px'});

		    break;
		
		
		    /*case '0':
			    this.chtmlElementTextArea.addClass('af-TextareaBoxSmall-st0');
		    break;
		    case '1':
			    this.chtmlElementTextArea.addClass('af-TextareaBoxMedium-st1');
		    break;
		    case '2':
			    this.chtmlElementTextArea.addClass('af-TextareaBoxLarge-st2');
		    break;
		    case '3':
			    this.chtmlElementTextArea.addClass('af-TextareaBoxLarge-st3');
		    break;
		    
		    default:
			    this.chtmlElementTextArea.addClass('af-TextareaBoxSmall-st0');
		    break;
    		
		   */
		}
		 this.cpPermission();
	},
	
		cpPermission : function()
	{
        
    
	    switch(this.cPermission)
	    {
	        case "2":        
	            this.chtmlElementTextArea.attr('disabled','disabled');  
	            this.chtmlElementTextArea.addClass('af_ctrl_disable');
	        break;
	        
	        case "3":
	            this.chtmlElementTextArea.removeAttr('disabled');
	            this.chtmlElementTextArea.removeClass('af_ctrl_disable');
	        break;
	        
	        case "1":
	            this.chtmlElement.addClass('aa-div-hide');
	            this.chtmlElementTextArea.removeAttr('disabled');
	            this.chtmlElementTextArea.removeClass('af_ctrl_disable');
	        break;
	        
	        default:
	            this.chtmlElementTextArea.attr('disabled','disabled');  
	            this.chtmlElementTextArea.addClass('af_ctrl_disable');
	        break

	        
	    }
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
	},
		chtmlElementTextArea_focusout : function(event)
	{
		if(this.cDocumentElement.cSElementTextData != this.chtmlElementTextArea.val())	
		this.cDocumentElement.cSElementTextData = this.chtmlElementTextArea.val();
	}
	
	
	});
})(jQuery)