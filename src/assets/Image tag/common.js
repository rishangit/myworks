 String.format =  String.prototype.format = function() {
    var i=0;
    var string = (typeof(this) == "function" && !(i++)) ? arguments[0] : this;
 
    for (; i < arguments.length; i++)
        string = string.replace(/\{\d+?\}/, arguments[i]);
 
    return string;
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}	

function clone(obj) 
{  
	var target = new obj.constructor();  
	for ( var key in target ) { delete target[key]; }  
	return $.extend( true, target, obj );  
}


            ctrlTypesLabel = "0";
            ctrlTypesInput = "1";
            ctrlTypesInputDB = "11";
            ctrlTypesDropdown = "2";
            ctrlTypesDropdownUser = "22";
            ctrlTypesDropdownCountry = "23";
            ctrlTypesDropdownEthnicity = "24";
            ctrlTypesDropdownLanguage = "25";
            ctrlTypesDropdownReligion = "26";
            ctrlTypesDropdownYesNo = "27";
            ctrlTypesDropdownGender = "28";
            ctrlTypesDropdownTitle = "29";
            ctrlTypesDateTime24 = "3";
            ctrlTypesRadio = "5";
            ctrlTypesRadioYesNo = "51";
            ctrlTypesRadioYesNoUnknown = "52";
            ctrlTypesCheckBox = "6";
            ctrlTypesDate = "7";
            ctrlTypesDataGrid = "8";
            ctrlTypesTextArea = "9";
            ctrlTypespushPrompt = "10";
            ctrlTypesRemoteSearch = "33";
            ctrlTypesEmbedHtml = "44";
            ctrlTypesMapWidget = "12";
            ctrlTypesInputDB = "11";
            ctrlTypesDropdownCountry = "23";
            ctrlTypesDropdownEthnicity = "24";
            ctrlTypesDropdownGender = "28";
            ctrlTypesDropdownLanguage = "25";
            ctrlTypesDropdownReligion = "26";
            ctrlTypesDropdownYesNo = "27";
            ctrlTypesDropdownTitle = "29";
            ctrlTypesRadioYesNo = "51";
            ctrlTypesRadioYesNoUnknown = "52";
            ctrlTypesDataGrid = "8";
            ctrlTypesBarcode = "13";
            ctrlTypesTemplateLinkElement = "15";
            ctrlTypesQRCode = "16";
            ctrlTypesMultiSelect = "17";
            ctrlTypesFileUpload = "18";
            ctrlTypesImageTag = "19";




var pinArray = {};
var section1 = eval('[{\"cSSectionId\":\"d836fb81-ee26-87a3-ee9d-365631ed964b\",\"cSSectionName\":\"New Section\",\"cSFormID\":\"898abcba-c3b9-bf41-dc9f-36b768f8703b\",\"cSFontsize\":\"12\",\"cLElementList\":[{\"cSElementId\":\"cb1dad33-12e2-254b-5334-651c3dc103e7\",\"cSElementType\":\"1\",\"cSElementLable\":\"First Name\",\"cSElementAlign\":\"1\",\"cSElementName\":null,\"cSElementTextData\":null,\"cSElementSize\":\"1\",\"cSElementPassword\":null},{\"cSElementId\":\"73bdc6ef-fb72-8510-4158-9a10920bd098\",\"cSElementType\":\"1\",\"cSElementLable\":\"Last Name\",\"cSElementAlign\":\"1\",\"cSElementName\":null,\"cSElementTextData\":null,\"cSElementSize\":\"1\",\"cSElementPassword\":null},{\"cSElementId\":\"683c0add-57a1-231b-3948-cda08749b987\",\"cSElementType\":\"1\",\"cSElementLable\":\"Address\",\"cSElementAlign\":\"1\",\"cSElementName\":null,\"cSElementTextData\":null,\"cSElementSize\":\"1\",\"cSElementPassword\":null}]}]')[0];

var section2 = eval('[{\"cSSectionId\":\"5551bcd1-23c5-0f68-a58c-b769b00217cb\",\"cSSectionName\":\"Object\",\"cSFormID\":\"05b65f1b-2e53-0d15-4be7-36e8fe21e5f1\",\"cSFontsize\":\"12\",\"cLElementList\":[{\"cSElementId\":\"feb8528c-edd9-1995-047c-9451a301c31b\",\"cSElementType\":\"1\",\"cSElementLable\":\"Location Name\",\"cSElementAlign\":\"1\",\"cSElementName\":null,\"cSElementTextData\":null,\"cSElementSize\":\"1\",\"cSElementPassword\":null},{\"cSElementId\":\"2c1e9093-2ebe-6b9a-f73d-54994a565632\",\"cSElementType\":\"1\",\"cSElementLable\":\"Description\",\"cSElementAlign\":\"1\",\"cSElementName\":null,\"cSElementTextData\":null,\"cSElementSize\":\"1\",\"cSElementPassword\":null}]}]')[0];


var section3 = eval('[{\"cSSectionId\":\"59b70133-5b77-d301-af50-7bd3f7f6d7a9\",\"cSSectionName\":\"Team Member\",\"cSFormID\":\"05b65f1b-2e53-0d15-4be7-36e8fe21e5f1\",\"cSFontsize\":\"12\",\"cLElementList\":[{\"cSElementId\":\"53bb48dd-b813-20d3-58f6-5cdf6124e99a\",\"cSElementType\":\"1\",\"cSElementLable\":\"Name\",\"cSElementAlign\":\"1\",\"cSElementName\":null,\"cSElementTextData\":null,\"cSElementSize\":\"1\",\"cSElementPassword\":null},{\"cSElementId\":\"3ba10dc7-4add-57b2-0ce9-5da660498735\",\"cSElementType\":\"1\",\"cSElementLable\":\"Responsible\",\"cSElementAlign\":\"1\",\"cSElementName\":null,\"cSElementTextData\":null,\"cSElementSize\":\"1\",\"cSElementPassword\":null}]}]')[0];

 var sec4 = eval('[{\"cSSectionId\":\"f4eb4cbc-4149-daae-08f8-add5f3553d6c\",\"cSSectionName\":\"Object\",\"cSFormID\":\"05b65f1b-2e53-0d15-4be7-36e8fe21e5f1\",\"cSFontsize\":\"12\",\"cLElementList\":[{\"cSElementId\":\"1e59cb1e-8354-5e3c-7110-852da588dedf\",\"cSElementType\":\"1\",\"cSElementLable\":\"Object Name\",\"cSElementAlign\":\"1\",\"cSElementName\":null,\"cSElementTextData\":null,\"cSElementSize\":\"1\",\"cSElementPassword\":null},{\"cSElementId\":\"b447e5fe-ccaa-0afe-72a1-aa8ee40d9b62\",\"cSElementType\":\"1\",\"cSElementLable\":\"Description\",\"cSElementAlign\":\"1\",\"cSElementName\":null,\"cSElementTextData\":null,\"cSElementSize\":\"1\",\"cSElementPassword\":null}]}]')[0];


var sections = new Array();
//sections.push(section1);
sections.push(section3);
sections.push(sec4);
//sections.push(section2);sec4


 function setElementAlign(pDocumentElement,pHtmlElementLable,pHtmlElementCtrlContent,pHtmlElementContent)
 {
       // pHtmlElementLable.html('');
       //pHtmlElementLable.html(pDocumentElement.cSElementLable);
		pHtmlElementLable.removeClass();
 		switch (pDocumentElement.cSElementAlign)
		{
		case '0':
			pHtmlElementLable.addClass('af-elementlabel-st1');
			pHtmlElementLable.removeClass('aa-table-cell');
			pHtmlElementCtrlContent.removeClass('aa-table-cell');
		break;
		case '1':
			pHtmlElementLable.addClass('af-elementlabel-st2');
			pHtmlElementLable.addClass('aa-table-cell');
			pHtmlElementCtrlContent.addClass('aa-table-cell');
			
		break;
		case '2':
			pHtmlElementLable.addClass('af-elementlabel-st3');
			pHtmlElementLable.removeClass('aa-table-cell');
			pHtmlElementCtrlContent.removeClass('aa-table-cell');
		break;
		case '3':
			pHtmlElementLable.remove();
			pHtmlElementContent.append(String.format("<div id='Label{0}' class='af-elementlabel-st4'> {1} </div>",
			pDocumentElement.cSElementId,
			pDocumentElement.cSElementLable));
			pHtmlElementLable = $(String.format('#Label{0}',pDocumentElement.cSElementId));
			pHtmlElementCtrlContent.addClass('aa-f-left');
			pHtmlElementLable.addClass('aa-table-cell');
			pHtmlElementCtrlContent.addClass('aa-table-cell');
			
		break;
		case '4':
			pHtmlElementLable.remove();
			pHtmlElementContent.append(String.format("<div id='Label{0}' class='af-elementlabel-st5'> {1} </div>",
			pDocumentElement.cSElementId,
			pDocumentElement.cSElementLable));
			pHtmlElementLable = $(String.format('#Label{0}',pDocumentElement.cSElementId));
			pHtmlElementLable.removeClass('aa-table-cell');
			pHtmlElementCtrlContent.removeClass('aa-table-cell');
		break;
		default:
			pHtmlElementLable.addClass('af-elementlabel-st1');
			pHtmlElementLable.removeClass('aa-table-cell');
			pHtmlElementCtrlContent.removeClass('aa-table-cell');
		break;
		}
 }

