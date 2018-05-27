/**
 * ctrlDropdown.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrldropdown */
    $.fn.ctrldropdown = function(pElement) { return new $.ctrldropdown(this, pElement) } ;
	$.ctrldropdown = function (e,pElement) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementDropdown;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.cDocumentElement = pElement;
		this.chtmlElementClose;

		
		this.cPermission = pElement.cSPermissionType;
				
		this.cpSetup();
		this.cpRedrow();
		
		return this;
   }
    				
	/* EXTEND ctrldropdown */
    $.ctrldropdown.fn = $.ctrldropdown.prototype = {ctrldropdown: '0.0.1'};
	$.ctrldropdown.fn.extend = $.ctrldropdown.extend = $.extend;
	$.ctrldropdown.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		this.chtmlElement.html(String.format("<div id='ctrldropdown{0}' class='af-element-content'>"+
			"<div id='Label{1}'> {2} </div>"+
			"<div id='ctrlcontent{3}' style='width:auto;'></div>"+
		"</div>",
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementLable,
		this.cDocumentElement.cSElementId));
		
		this.chtmlElementContent = $(String.format('#ctrldropdown{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementCtrlContent = $(String.format('#ctrlcontent{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementLable = $(String.format('#Label{0}',this.cDocumentElement.cSElementId));
		
		this.chtmlElementCtrlContent.html(String.format("<select id='ctrl{0}' type='text' name='txt'>{1}</select>",
		this.cDocumentElement.cSElementId,
		this.cpPopulateDropdownOption()));
		
		//set element lable align
		setElementAlign(this.cDocumentElement,this.chtmlElementLable,this.chtmlElementCtrlContent,this.chtmlElementContent);
		
		
		this.cploadstyle();
		
		
		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		this.chtmlElement.bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});
		
		this.chtmlElementDropdown.bind('change', function(event){self.chtmlElementDropdown_chane(event)});
				
	}
	,
	
	cploadstyle : function()
	{

    this.chtmlElementDropdown = $(String.format('#ctrl{0}',this.cDocumentElement.cSElementId));

		switch (this.cDocumentElement.cSElementSize)
		{
		case '0':
			this.chtmlElementDropdown.addClass('af-InputBoxSmall-st0');
		break;
		case '1':
			this.chtmlElementDropdown.addClass('af-InputBoxMedium-st1');
		break;
		case '2':
			this.chtmlElementDropdown.addClass('af-InputBoxLarge-st2');
		break;
		default:
			this.chtmlElementDropdown.addClass('af-InputBoxMedium-st1');
		break;
		}
		this.cpPermission();
	},
	
	cpPermission : function()
	{
        
    
	    switch(this.cPermission)
	    {
	        case "2":        
	            this.chtmlElementCtrlContent.attr('disabled','disabled');  
	            this.chtmlElementCtrlContent.addClass('af_ctrl_disable');
	        break;
	        
	        case "3":
	            this.chtmlElementCtrlContent.removeAttr('disabled');
	            this.chtmlElementCtrlContent.removeClass('af_ctrl_disable');
	        break;
	        
	        case "1":
	            this.chtmlElement.addClass('aa-div-hide');
	            this.chtmlElementCtrlContent.removeAttr('disabled');
	            this.chtmlElementCtrlContent.removeClass('af_ctrl_disable');
	        break;
	        
	        default:
	            this.chtmlElementCtrlContent.attr('disabled','disabled');  
	            this.chtmlElementCtrlContent.addClass('af_ctrl_disable');
	        break

	        
	    }
	},
	
	cpRedrow : function()
	{

    //this.chtmlElementDropdown.SelectedValue = this.cDocumentElement.cSElementTextData;
		
    this.cpPopulateDropdownOption();
	},
	
	cpPopulateDropdownOption : function()
	 {
		var self = this;
		
		lreturnstring = '';
						
	        switch(this.cDocumentElement.cSElementSubType)
	        {  
    	    
		        case '0':
    		    
	    		    if(this.cDocumentElement.cLElementSubElement != null || this.cDocumentElement.cLElementSubElement != undefined)
                    {

                    lreturnstring =  self.loadoptions(self.cDocumentElement.cLElementSubElement);
                    }
                
		        break;
		        case '1':
			       lreturnstring =  self.loadoptions(countryjson);
		        break;
		        case '2':
			       lreturnstring = self.loadoptions(titlejason);
		        break;

		        case '3':
			       lreturnstring = self.loadoptions(yesnojason);
		        break;
		        case '4':
			       lreturnstring = self.loadoptions(ethnicityjson);
		        break;
		        case '5':
			       lreturnstring = self.loadoptions(religionjason);						    
		        break;
		        case '6':
			       lreturnstring = self.loadoptions(languagejson);
			        break;
		        case '7':
			       lreturnstring = self.loadoptions(genderjson);
		        break;
		    }
		
            return lreturnstring;
	 },
	 
	loadoptions : function(array)
	{
	var self = this;
	    lreturnstring = '';
		$.each(array, function(index, value){	
				 lreturnstring = lreturnstring + 
				String.format("<option value='{0}' {1} name='{2}' >{3}</option>",
				 value.cSSubElementId,
				 ( value.cSSubElementId == self.cDocumentElement.cSElementTextData ? "selected" : ""),
				 value.cSSubElementLable,
				 value.cSSubElementLable);
			});
		return lreturnstring;
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
	
	chtmlElementDropdown_chane : function()
	{
	        if(this.cDocumentElement.cSElementTextData != this.chtmlElementDropdown.val())	
	        {
	           this.cDocumentElement.cSElementTextData = this.chtmlElementDropdown.val(); 
	        }
	}

	});
})(jQuery)