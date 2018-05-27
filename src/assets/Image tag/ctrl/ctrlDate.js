/**
 * ctrlDate.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* ctrlDate */
    $.fn.ctrlDate = function(pElement) { return new $.ctrlDate(this, pElement) } ;
	$.ctrlDate = function (e,pElement) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementDatectrl;
		this.chtmlElementTimeHH;
		this.chtmlElementTimeMM;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.calenderIcon;
		this.cDocumentElement = pElement;
		this.chtmlElementClose;
		this.datevalue;
		this.timevaluehh;
        this.timevaluemm;
		
		
		this.cPermission = pElement.cSPermissionType;
		
		this.cpSetup();
		this.cpRedrow();
		
		return this;
   }
    				
	/* EXTEND ctrlDate */
    $.ctrlDate.fn = $.ctrlDate.prototype = {ctrlDate: '0.0.1'};
	$.ctrlDate.fn.extend = $.ctrlDate.extend = $.extend;
	$.ctrlDate.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		this.chtmlElement.html(String.format("<div id='ctrltextbox{0}' class='af-element-content'>"+
			"<div id='Label{1}'> {2} </div>"+
			"<div id='ctrlcontent{3}' style='width:auto;'></div>"+
		"</div>",
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementLable,
		this.cDocumentElement.cSElementId));
		
		this.chtmlElementLable = $(String.format('#Label{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementInputctrl = $(String.format('#ctrl{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementContent = $(String.format('#ctrltextbox{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementCtrlContent = $(String.format('#ctrlcontent{0}',this.cDocumentElement.cSElementId));
		var elementclose = $(String.format('#close{0}',this.cDocumentElement.cSElementId));
		
		
		//set element lable align
		setElementAlign(this.cDocumentElement,this.chtmlElementLable,this.chtmlElementCtrlContent,this.chtmlElementContent);
		
		
		this.chtmlElementInputctrl.removeClass();
		switch (this.cDocumentElement.cSElementSize)
		{
		case '0':
			this.chtmlElementCtrlContent.html(String.format("<div class='aa-f-left'><input id='ctrl{0}' type='text' name='txt' class='af-date-input' /></div><div id='icon{1}' class=''></div>",
			this.cDocumentElement.cSElementId,
			this.cDocumentElement.cSElementId
			));
			
			this.chtmlElementDatectrl =  $(String.format('#ctrl{0}',this.cDocumentElement.cSElementId));
			this.chtmlElementDatectrl.bind('focusout', function(event) {self.chtmlElementDatectrl_focusout(event)});
            this.chtmlElementDatectrl.attr('disabled','disabled'); 
			
			$(this.chtmlElementDatectrl).datepicker({ showOn: 'button', buttonImageOnly: true,buttonImage: "../screens/inputter/css/images/elements/date.png", onSelect: function(dateText, inst) { self.chtmlElementDatectrl_focusout();}}).next(".ui-datepicker-trigger").addClass("af-imgdate-calender");
			var changeYear = $(this.chtmlElementDatectrl).datepicker( "option", "changeYear" );
            $(this.chtmlElementDatectrl).datepicker( "option", "changeYear", true );

		break;
		case '1':
			this.chtmlElementCtrlContent.html(String.format("<div class='aa-f-left'><input id='ctrl{0}' type='text' name='txt' class='af-date-input'/></div><div class='aa-f-left' style='margin-top:-3px;'><select id='datehh{1}' class='af-hh-combo'>{2}</select><select id='datemm{3}' class='af-hh-combo'>{4}</select></div>",
			this.cDocumentElement.cSElementId,
			this.cDocumentElement.cSElementId,
			this.cpPopulatetime('2'),
			this.cDocumentElement.cSElementId,
			this.cpPopulatetime('3')));
			
			this.chtmlElementDatectrl =  $(String.format('#ctrl{0}',this.cDocumentElement.cSElementId));
			this.chtmlElementTimeHH = $(String.format('#datehh{0}',this.cDocumentElement.cSElementId));
			this.chtmlElementTimeMM = $(String.format('#datemm{0}',this.cDocumentElement.cSElementId));
			this.chtmlElementDatectrl.attr('disabled','disabled'); 
			
			$(this.chtmlElementDatectrl).datepicker({ showOn: 'button', buttonImageOnly: true,buttonImage: "../screens/inputter/css/images/elements/date.png",onSelect: function(dateText, inst) { self.chtmlElementDatectrl_focusout();}}).next(".ui-datepicker-trigger").addClass("af-imgdate-calender");
			var changeYear = $(this.chtmlElementDatectrl).datepicker( "option", "changeYear" );
            $(this.chtmlElementDatectrl).datepicker( "option", "changeYear", true );
            
			this.chtmlElementDatectrl.bind('focusout', function(event) {self.chtmlElementDatectrl_focusout(event)});
			this.chtmlElementTimeHH.bind('change', function(event) {self.chtmlElementTimeHH_change(event)});
			this.chtmlElementTimeMM.bind('change', function(event) {self.chtmlElementTimeMM_change(event)});
		break;
		case '2':
			this.chtmlElementCtrlContent.html(String.format("<div class='aa-f-left'><select id='datehh{0}' class='af-hh-combo'>{1}</select><select id='datemm{2}' class='af-hh-combo'>{3}</select></div>",
			this.cDocumentElement.cSElementId,
			this.cpPopulatetime('2'),
			this.cDocumentElement.cSElementId,
			this.cpPopulatetime('3')));
			
			this.chtmlElementTimeHH = $(String.format('#datehh{0}',this.cDocumentElement.cSElementId));
			this.chtmlElementTimeMM = $(String.format('#datemm{0}',this.cDocumentElement.cSElementId));
			this.chtmlElementTimeHH.bind('change', function(event) {self.chtmlElementTimeHH_change(event)});
			this.chtmlElementTimeMM.bind('change', function(event) {self.chtmlElementTimeMM_change(event)});
			
		break;
		default:
			this.chtmlElementCtrlContent.html(String.format("<div class='aa-f-left'><input id='ctrl{0}' type='text' name='txt' class='af-date-input' /></div><div class='af-imgdate-calender'></div>",
			this.cDocumentElement.cSElementId));
			
			this.chtmlElementDatectrl =  $(String.format('#ctrl{0}',this.cDocumentElement.cSElementId));
			this.chtmlElementDatectrl.bind('focusout', function(event) {self.chtmlElementDatectrl_focusout(event)});
		break;
		}

		this.chtmlElement.bind('mousedown', function(event){self.chtmlElement_click(event)});
		this.chtmlElement.bind('mouseenter', function(event){self.chtmlElement_mouseenter(event)});		
	}
	,
	
	cpRedrow : function()
	{
	   if(this.cDocumentElement.cSElementTextData != null && this.cDocumentElement.cSElementTextData != undefined && this.cDocumentElement.cSElementTextData != "")
	   {
	   		switch (this.cDocumentElement.cSElementSize)
		    {
		    case "0":
		        this.datevalue =  this.cDocumentElement.cSElementTextData;
		        this.chtmlElementDatectrl.val(this.datevalue);
		    break;
		    case "1":
	            this.datevalue =  this.cDocumentElement.cSElementTextData.split('-')[0];
                this.timevaluehh = this.cDocumentElement.cSElementTextData.split('-')[1].split(':')[0];
                this.timevaluemm = this.cDocumentElement.cSElementTextData.split('-')[1].split(':')[1];
                this.chtmlElementDatectrl.val(this.datevalue);
                this.chtmlElementTimeHH.val(this.timevaluehh);
                this.chtmlElementTimeMM.val(this.timevaluemm);
            
		    break;
		    case "2":
                this.timevaluehh = this.cDocumentElement.cSElementTextData.split(':')[0];
                this.timevaluemm = this.cDocumentElement.cSElementTextData.split(':')[1];
                this.chtmlElementTimeHH.val(this.timevaluehh);
                this.chtmlElementTimeMM.val(this.timevaluemm);
		    break;
		    default:
		        this.datevalue =  this.cDocumentElement.cSElementTextData;
		        this.chtmlElementDatectrl.val(this.datevalue);
		    break;
		    }
       }
        this.cpPermission();
	},
	
	cpPermission : function()
	{
	    switch(this.cPermission)
	    {
	        case "2":   
	            switch (this.cDocumentElement.cSElementSize)
	            {
	                case "0":
	                    this.chtmlElementDatectrl.attr('disabled','disabled');  
	                    this.chtmlElementDatectrl.addClass('af_ctrl_disable');
	                break;
	        	    case "1": 
	        		    this.chtmlElementDatectrl.attr('disabled','disabled');  
	                    this.chtmlElementDatectrl.addClass('af_ctrl_disable');
	                    this.chtmlElementTimeHH.attr('disabled','disabled');  
	                    this.chtmlElementTimeHH.addClass('af_ctrl_disable');
                        this.chtmlElementTimeMM.attr('disabled','disabled');  
                        this.chtmlElementTimeMM.addClass('af_ctrl_disable');
	                break;
	                case "2": 
	            	    this.chtmlElementTimeHH.attr('disabled','disabled');  
	                    this.chtmlElementTimeHH.addClass('af_ctrl_disable');
                        this.chtmlElementTimeMM.attr('disabled','disabled');  
                        this.chtmlElementTimeMM.addClass('af_ctrl_disable');
	                break;
	            }
	        break;
	        
	        case "3":
	            switch (this.cDocumentElement.cSElementSize)
	            {
	                case "0":
	                    this.chtmlElementDatectrl.removeAttr('disabled','disabled');  
	                    this.chtmlElementDatectrl.removeClass('af_ctrl_disable');
	                break;
	        	    case "1": 
	        		    this.chtmlElementDatectrl.removeAttr('disabled','disabled');  
	                    this.chtmlElementDatectrl.removeClass('af_ctrl_disable');
	                    this.chtmlElementTimeHH.removeAttr('disabled','disabled');  
	                    this.chtmlElementTimeHH.removeClass('af_ctrl_disable');
                        this.chtmlElementTimeMM.removeAttr('disabled','disabled');  
                        this.chtmlElementTimeMM.removeClass('af_ctrl_disable');
	                break;
	                case "2": 
	            	    this.chtmlElementTimeHH.removeAttr('disabled','disabled');  
	                    this.chtmlElementTimeHH.removeClass('af_ctrl_disable');
                        this.chtmlElementTimeMM.removeAttr('disabled','disabled');  
                        this.chtmlElementTimeMM.removeClass('af_ctrl_disable');
	                break;
	            }
	        break;
	        
	        case "1":
                this.chtmlElement.addClass('aa-div-hide');
	        break;
	        
	        default:
	            if(this.cDocumentElement.cSElementSize != '2')
	            {
	                this.chtmlElementDatectrl.attr('disabled','disabled');  
	                this.chtmlElementDatectrl.addClass('af_ctrl_disable');
	            }
	        break
	    }
	},
	
     cpPopulatetime : function(type)
     {
	    var self = this;
	    var typearray
	    switch(type)
	    {
	        case "1":
	        typearray = datetimeHH12;
	        break;
	        case "2":        	
	        typearray = datetimeHH24;
	        break;
	        case "3":
	        typearray = datetimeMM;
	        break;
	    }
    	
	    var typearray 
	    lreturnstring = '';
	    $.each(typearray, function(index, value){	
	         lreturnstring = lreturnstring + 
             String.format("<option value='{0}'>{2}</option>",index,value);
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

	chtmlElementDatectrl_focusout : function()
	{
		if(this.datevalue != this.chtmlElementDatectrl.val())	
		{
		this.datevalue = this.chtmlElementDatectrl.val();
		this.genarate_Elementtextdata();
		}
	},
	
	
	chtmlElementTimeHH_change : function()
	{
	    if(this.timevaluehh != this.chtmlElementTimeHH.val())
	    {   	
		this.timevaluehh = this.chtmlElementTimeHH.val();
	    this.genarate_Elementtextdata();
		}
	},
	
	chtmlElementTimeMM_change : function()
	{
		if(this.timevaluemm != this.chtmlElementTimeMM.val())	
		{	
		this.timevaluemm = this.chtmlElementTimeMM.val();
		this.genarate_Elementtextdata();
		}
	},
	
	genarate_Elementtextdata : function()
	{
	
		switch (this.cDocumentElement.cSElementSize)
		{
		
		case "0":
		    this.cDocumentElement.cSElementTextData = (this.datevalue != null || this.datevalue != undefined ? this.datevalue : null);
		break;
		case "1":
		    this.cDocumentElement.cSElementTextData = String.format("{0}-{1}:{2}",
		    this.datevalue != null && this.datevalue != undefined ? this.datevalue : "",
		    (this.timevaluehh != null && this.timevaluehh != undefined) ? this.timevaluehh : "0",
		    (this.timevaluemm != null && this.timevaluemm != undefined) ? this.timevaluemm : "0");
		break;
		case "2":

		    this.cDocumentElement.cSElementTextData = String.format("{0}:{1}",
		    (this.timevaluehh != null && this.timevaluehh != undefined) ? this.timevaluehh : "0",
		    (this.timevaluemm != null && this.timevaluemm != undefined) ? this.timevaluemm : "0");
		break;
		default:
		    this.cDocumentElement.cSElementTextData = (this.datevalue != null && this.datevalue != undefined) ? this.datevalue : null;
		break;
		}	
	}
    });
})(jQuery)