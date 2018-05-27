/**
 * ctrlLabel.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlLabel */
    $.fn.ctrlLabel = function(pElement) { return new $.ctrlLabel(this, pElement) } ;
	$.ctrlLabel = function (e,pElement) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementInputctrl;
		this.chtmlElementContent;
		this.cDocumentElement = pElement;
		this.chtmlElementClose;
		this.cPermission = pElement.cSPermissionType;
		
		this.cpSetup();
		this.cpRedrow();
		
		return this;
   }
    				
	/* EXTEND ctrlLabel */
    $.ctrlLabel.fn = $.ctrlLabel.prototype = {ctrlLabel: '0.0.1'};
	$.ctrlLabel.fn.extend = $.ctrlLabel.extend = $.extend;
	$.ctrlLabel.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		this.chtmlElement.html(String.format("<div id='ctrlLabel{0}' class='af-element-content'>"+
			"<div id='Label{1}' class='af-elementlabel-st1'> {2} </div>"+
		"</div>",
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementLable));
		
		this.chtmlElementLable = $(String.format('#Label{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementContent = $(String.format('#ctrlLabel{0}',this.cDocumentElement.cSElementId));

		
		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		this.chtmlElement.bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
				
	}
	,
	
	cpRedrow : function()
	{
		 this.cpPermission();
	},
	
		cpPermission : function()
	{
        
    
	    switch(this.cPermission)
	    {
	        case "2":        
	            this.chtmlElementLable.attr('disabled','disabled');  
	            this.chtmlElementLable.addClass('af_ctrl_disable');
	        break;
	        
	        case "3":
	            this.chtmlElementLable.removeAttr('disabled');
	            this.chtmlElementLable.removeClass('af_ctrl_disable');
	        break;
	        
	        case "1":
	            this.chtmlElement.addClass('aa-div-hide');
	            this.chtmlElementLable.removeAttr('disabled');
	            this.chtmlElementLable.removeClass('af_ctrl_disable');
	        break;
	        
	        default:
	            this.chtmlElementLable.attr('disabled','disabled');  
	            this.chtmlElementLable.addClass('af_ctrl_disable');
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
	}
	
	
	
	});
})(jQuery)