/**
 * ctrlcheckbox.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlcheckbox */
    $.fn.ctrlcheckbox = function(pElement) { return new $.ctrlcheckbox(this, pElement) } ;
	$.ctrlcheckbox = function (e, pElement) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.chtmelElementCheckBoxCtrl;
		this.cDocumentElement = pElement;
		
		 this.cPermission = pElement.cSPermissionType;
		
		this.cpSetup();
		this.cpRedrow();
		
		return this;
   }
    				
	/* EXTEND ctrlcheckbox */
    $.ctrlcheckbox.fn = $.ctrlcheckbox.prototype = {ctrlcheckbox: '0.0.1'};
	$.ctrlcheckbox.fn.extend = $.ctrlcheckbox.extend = $.extend;
	$.ctrlcheckbox.fn.extend({
	
	
	cpSetup : function()
	{
	
		var self = this;
		this.chtmlElement.html(String.format("<div id='ctrlcheckbox{0}' class='af-element-content'>"+
			"<div id='Label{1}' class='af-elementlabel'> {2} </div>"+
			"<div id='ctrlcontent{3}' style='width:auto;'><input id='ctrl{4}' class='TUICheckbox' type='checkbox'/></div>"+
		"<div>",
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementLable,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId));
				
		this.chtmlElementLable = $(String.format('#Label{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementContent = $(String.format('#ctrlcheckbox{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementCtrlContent = $(String.format('#ctrlcontent{0}',this.cDocumentElement.cSElementId));
		this.chtmelElementCheckBoxCtrl = $(String.format('#ctrl{0}',this.cDocumentElement.cSElementId));

		
		//this.chtmelElementCheckBoxCtrl.bind('focusin', function(event) {self.chtmelElementCheckBoxCtrl_focusin(event)});
        this.chtmelElementCheckBoxCtrl.bind('focusout', function(event) {self.chtmelElementCheckBoxCtrl_focusout(event)});
		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		this.chtmlElement.bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
		this.chtmlElement.bind('mouseup', function(event){self.chtmlElement_mouseup(event)});
		
		//set element lable align
		setElementAlign(this.cDocumentElement,this.chtmlElementLable,this.chtmlElementCtrlContent,this.chtmlElementContent);

		this.cpPermission();
		
	},
	
	cpPermission : function()
	{
	    switch(this.cPermission)
	    {
	        case "2":        
	            this.chtmelElementCheckBoxCtrl.attr('disabled','disabled');  
	            this.chtmelElementCheckBoxCtrl.addClass('af_ctrl_disable');
	        break;
	        
	        case "3":
	            this.chtmelElementCheckBoxCtrl.removeAttr('disabled');
	            this.chtmelElementCheckBoxCtrl.removeClass('af_ctrl_disable');
	        break;
	        
	        case "1":
	            this.chtmlElement.addClass('aa-div-hide');
	            this.chtmelElementCheckBoxCtrl.removeAttr('disabled');
	            this.chtmelElementCheckBoxCtrl.removeClass('af_ctrl_disable');
	        break;
	        
	        default:
	            this.chtmelElementCheckBoxCtrl.attr('disabled','disabled');  
	            this.chtmelElementCheckBoxCtrl.addClass('af_ctrl_disable');
	        break
	    }
	},
	
		
	cpRedrow : function()
	{
		if(this.cDocumentElement.cSElementTextData == "1")
		this.chtmelElementCheckBoxCtrl.attr("checked","true");
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
	
	chtmlElement_mouseup: function()
	{
	$(this).trigger('elementmouseup',[this]);
	},
	
	chtmelElementCheckBoxCtrl_focusout : function()
	{
	 this.cDocumentElement.cSElementTextData = this.chtmelElementCheckBoxCtrl.attr("checked") == "checked" ? "1": "0";

	}
	
	
	});
})(jQuery)