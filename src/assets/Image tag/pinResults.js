/**
 * pinResults.js (TAGAT)
 * Built on top of the jQuery library
  */
(function($) {

    /* pinResults */
    $.fn.pinResults = function(pDocpin) { return new $.pinResults(this,pDocpin) } ;
	$.pinResults = function (e,pDocpin) {

		this.chtmlElement = $(e);
		this.docTag = pDocpin;
		this.htmlSecname;
		this.htmldetails;
		this.htmlResult;

		this.cpSetup();
		//this.cpRdrow();

		return this;
   }
    				
    $.pinResults.fn = $.pinResults.prototype = {pinResults: '0.0.1'};
	$.pinResults.fn.extend = $.pinResults.extend = $.extend;
	$.pinResults.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		
			this.chtmlElement.append(String.format(
			"<div id='result{0}' class='resultDiv'>"+
				"<div id='Secname' class='Secname'></div>"+
				"<div id='details' class='details'></div>"+
			"</div>",this.docTag.Tag_id));
			
			this.htmlResult = $(String.format('#result{0}',this.docTag.Tag_id));
			this.htmlSecname = $('#Secname',this.htmlResult);
			this.htmldetails = $('#details',this.htmlResult);
			
			this.htmlSecname.html(this.docTag.section.cSSectionName);
			this.htmldetails.html(this.getdetails());


			$(this.htmlResult).unbind();
			$(this.htmlResult).bind('click', function(event){self.resultClick(event)})
	},
	
	
	getdetails: function()
	{
	
	var strDetails='';
		$.each(this.docTag.section.cLElementList, function(index, value){
			strDetails = strDetails + String.format('<div class="detaillabel">{0} : </div> <div class="detailvalue">{1} ;  </div>',value.cSElementLable,value.cSElementTextData);
		})
		return strDetails;
	},
	
	resultClick: function(event)
	{
		
		$(this).trigger('resultclick',[this.docTag]);
	}

	});
})(jQuery)	