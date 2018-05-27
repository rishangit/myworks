/**
 * sectiondesign.js (TAGAT)
 * Built on top of the jQuery library
 */
 (function($) {

     /* loadmain */
     $.fn.sectiondesign = function(pDocumentSection) { return new $.sectiondesign(this,pDocumentSection) } ;
	 $.sectiondesign = function (e,pDocumentSection) {
			
         this.chtmelElement = $(e);
		 this.htmlsectioncanvas;
		 this.htmlelementlist;
		 this.htmlChosenLocation = null;


		 
		 this.currentselectitem;
		 this.mouseflag = 0;

		 
		 
		 this.cSelectedElementID;
		 this.cDocumentSection = pDocumentSection;
		 this.cpSetup();
		 this.cpRedrow();
		 

		
		 return this;
    }
    				
	 /* EXTEND ctrlInput */
     $.sectiondesign.fn = $.sectiondesign.prototype = {sectiondesign: '0.0.1'};
	 $.sectiondesign.fn.extend = $.sectiondesign.extend = $.extend;
	 $.sectiondesign.fn.extend({
	 
		cpSetup : function()
		{
			
			var self = this;
			
			//$('#section-header').html(String.format("<div style='font-size: {0}px;'>{1}</div>",
			//this.cDocumentSection.cSFontsize,
			//this.cDocumentSection.cSSectionName));

			
			this.chtmelElement.append(String.format("<div id='canvas{0}' class='ad-canvas'></div>",this.cDocumentSection.cSSectionId));
			
			this.htmlsectioncanvas = $(String.format('#canvas{0}',this.cDocumentSection.cSSectionId));
				
		},

		
		cpRedrow: function()
		{
		
		var self = this;
		this.htmlsectioncanvas[0].innerHTML = "";
		self.htmlelementlist = new Array()
		
		self.htmlsectioncanvas.append(String.format('<div class="header">{0}</div>',this.cDocumentSection.cSSectionName));
			$.each(this.cDocumentSection.cLElementList, function(index, value)
			{
				if(self.htmlsectioncanvas[0].innerHTML == "")
				{
					
				}
                
                
				self.htmlsectioncanvas.append(String.format("<div id='tagatelementdiv{0}' class='ad-section-element-content'></div>", value.cSElementId ));
	
				htmltab = $(String.format('#tagatelementdiv{0}', value.cSElementId));
				
			    var _htmlElement;
			    
				switch(value.cSElementType)
				{
					case ctrlTypesInput:
						_htmlElement = htmltab.ctrlInput(value);
					break;
					
					case ctrlTypesCheckBox:
						_htmlElement = htmltab.ctrlcheckbox(value);
					break;
					
					case ctrlTypesDropdown:
					    _htmlElement = htmltab.ctrldropdown(value);
					break;
					
					case ctrlTypesTextArea:
						_htmlElement= htmltab.ctrlTextArea(value);
					break;
					
					case ctrlTypesLabel:
						_htmlElement = htmltab.ctrlLabel(value);
					break;
					case ctrlTypesDate:
					    _htmlElement = htmltab.ctrlDate(value);
					break;
					
					case ctrlTypesRadio:
					    _htmlElement = htmltab.ctrlradio(value);
					break;
					
					case ctrlTypesMultiSelect:
					    _htmlElement = htmltab.ctrlmultiselect(value);
					break
					
					case ctrlTypesFileUpload:
				        _htmlElement = htmltab.ctrlFileUpload(value);
			        break;
			        
			        case ctrlTypesImageTag:
		        		_htmlElement = htmltab.ctrlImageTag(value);
			        break;
					
					default:
						_htmlElement = htmltab.ctrlInput(value);
					break;
				}
				
				self.htmlelementlist.push(_htmlElement);

			});

		}
		
	});
		
 })(jQuery);