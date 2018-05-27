/**
 * sectionContain.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* sectionContain */
    $.fn.sectionContain = function(psections, phtmlPin) { return new $.sectionContain(this,psections,phtmlPin) } ;
	$.sectionContain = function (e,psections, phtmlPin) {

		this.chtmlElement = $(e);
		this.sections = psections;
		this.htmlTag = phtmlPin;
		this.htmlSection = new Hashtable();
		this.htmlNext;
		this.htmlPrev;
		
		this.navigator
		this.btnOk;
		this.btncancel;
		this.btnDelete;
		this.htmlSecArea;
		this.curretsection = 0;
		this.curretsectionID;
		this.cpSetup();
		this.cpRdrow();

		return this;
   }
    				
    $.sectionContain.fn = $.sectionContain.prototype = {sectionContain: '0.0.1'};
	$.sectionContain.fn.extend = $.sectionContain.extend = $.extend;
	$.sectionContain.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		
			this.chtmlElement.html(String.format(
			'<div class="formContent"><div id="navigator" class="btnContent"><div id="PrevForm" class="btn_prev btn"><<</div><div id="NextForm" class="btn_next btn">>></div></div>'+	
			'<div id="sec_area" class="sec_area"></div>'+
			'<div class="btnContent"><div id="btndelete" class=" btndel btn" >Del</div><div class="buttonwrp"><div id="btnOk" class="btnclass btn">OK</div><div id="btnCancel" class="btnclass btn">Cancel</div></div></div>'+
			
			'</div></div>'));
		
			this.htmlSecArea = $('#sec_area',this.chtmlElement);
			this.htmlNext = $('#PrevForm',this.chtmlElement);
			this.htmlPrev = $('#NextForm',this.chtmlElement);
			this.btnOk = $('#btnOk',this.chtmlElement);
			this.btncancel = $('#btnCancel',this.chtmlElement);
			this.navigator = $('#navigator',this.chtmlElement);
			this.btnDelete = $('#btndelete',this.chtmlElement);
			
			this.htmlNext.bind('click', function(event){self.htmlNext_click(event)});
			this.htmlPrev.bind('click', function(event){self.htmlPrev_click(event)});
			this.btnOk.bind('click', function(event){self.btnOk_click(event)});
			this.btncancel.bind('click', function(event){self.btncancel_click(event)});
			this.btnDelete.bind('click', function(event){self.btnDelete_click(event)});
			
		if(this.htmlTag.docTag.section != "")
		{
			var htmlSec = $(self.htmlSecArea).sectiondesign(this.htmlTag.docTag.section);
			$(this.navigator).addClass('aa-div-hide');
		}
		else
		{
				if(this.sections != undefined && this.sections != null && this.sections.length > 0)
				{
					$.each(this.sections, function(index, value){			
						var htmlSec = $(self.htmlSecArea).sectiondesign(clone(value));
						self.htmlSection.put(value.cSSectionId,htmlSec);
					});						
				}
		}	
			
			
	},
	
	cpRdrow: function(presult)
	{
		if(this.htmlTag.docTag.section == "")
		{
			$('.ad-canvas').addClass('aa-div-hide');
			this.curretsectionID = this.sections[this.curretsection].cSSectionId
			var htmlcurrentSec = String.format('#canvas{0}',this.curretsectionID);
			$(htmlcurrentSec).removeClass('aa-div-hide');
		}
	},
	
	htmlNext_click: function(event)
	{

		if(this.curretsection < this.sections.length - 1)
		this.curretsection ++;
		else
		this.curretsection = 0;
		
		this.cpRdrow();
	},
	
	htmlPrev_click: function(event)
	{

		if(this.curretsection > 0)
		this.curretsection --;
		else
		this.curretsection = this.sections.length -1;
		
		this.cpRdrow();
	},
	btnOk_click: function(event)
	{
		//get lite jason of the section
		/*var objsec = {};
		objsec.ElementList = new Array();
		
		var docsection = this.htmlSection.get(this.curretsectionID).cDocumentSection;
		
		objsec.cSSectionId = docsection.cSSectionId
			
		$.each(docsection.cLElementList, function(index, value){
				var objElement = {};
				objElement.cSElementId = value.cSElementId;
				objElement.cSElementTextData = value.cSElementTextData;
				
			objsec.ElementList.push(objElement);	
		
		})
		this.htmlTag.docTag.section = clone(objsec);*/
		if(this.htmlTag.docTag.section == "")
		{
			var docsection = this.htmlSection.get(this.curretsectionID).cDocumentSection;
			this.htmlTag.docTag.section = docsection;
		}
		
		$(this).trigger('pinDataAdd',[this.htmlTag.docTag]);
		$('.form',this.htmlTag.htmlTag).html('');
		
	},
	
	btncancel_click: function(event)
	{
		if(this.htmlTag.docTag.section == "")
		$(this.htmlTag.htmlTag).remove();
		else
		$('.form',this.htmlTag.htmlTag).html('');
	},
	
	btnDelete_click: function()
	{
		$(this).trigger('pindelete',[this.htmlTag.docTag]);
		$(this.htmlTag.htmlTag).remove();
	}
	
	});
})(jQuery)	