/**
 * ctrlFileUpload.js (TAGAT)
 * Built on top of the jQuery library
  */
  function on_comm_save_media_file_feedback(data) { $(_connection).trigger("on_comm_save_media_file_feedback", [jQuery.parseJSON(data)]); return false; };
  function on_comm_check_media_file_feedback(data) { $(_connection).trigger("on_comm_check_media_file_feedback", [jQuery.parseJSON(data)]); return false; };
  function on_comm_open_media_file_feedback(data) { $(_connection).trigger("on_comm_open_media_file_feedback", [jQuery.parseJSON(data)]); return false; };
  function on_comm_upload_media_file_feedback(data) { $(_connection).trigger("on_comm_upload_media_file_feedback", [jQuery.parseJSON(data)]); return false; };
  function on_comm_download_media_file_feedback(data) { $(_connection).trigger("on_comm_download_media_file_feedback", [jQuery.parseJSON(data)]); return false; };


  
(function($) {

    /* ctrlFileUpload */
    $.fn.ctrlFileUpload = function(pElement) { return new $.ctrlFileUpload(this, pElement) } ;
	$.ctrlFileUpload = function (e,pElement) {

		this.chtmlElement = $(e);
		this.chtmlElementLable;
		this.chtmlElementInputctrl;
		this.chtmlElementContent;
		this.chtmlElementCtrlContent;
		this.cDocumentElement = pElement;
		this.chtmlElementClose;
		this.chtmlBrowse;
		this.chtmlUpload;
		this.fileDialog;
		this.isLoad = true;
		this.cPermission = pElement.cSPermissionType;
		
		this.hashFiles = new Hashtable();


		this.cpSetup();
		this.cpRedrow();
		
		return this;
   }
    				
	/* EXTEND ctrlInput */
    $.ctrlFileUpload.fn = $.ctrlFileUpload.prototype = {ctrlFileUpload: '0.0.1'};
	$.ctrlFileUpload.fn.extend = $.ctrlFileUpload.extend = $.extend;
	$.ctrlFileUpload.fn.extend({
	
	
	cpSetup : function()
	{
		var self = this;
		
		if(this.cDocumentElement.cFilePath == null || this.cDocumentElement.cFilePath == undefined)
		    this.cDocumentElement.cFilePath =  new Array();
		    else
		    {
		        $.each(this.cDocumentElement.cFilePath, function(index, value){
		        self.hashFiles.put(value,hash_MediaFileList.get(value));
		        })

		    }

		
		this.chtmlElement.html(String.format("<div id='close{0}' class='aa-close aa-div-hide'></div><div id='copy{1}' class='aa-copy aa-div-hide'></div>"+
		"<div id='ctrltextbox{2}' class='af-element-content'>"+
			"<div id='Label{3}'> {4} </div>"+
			"<div id='ctrlcontent{5}' style='width:auto;'><input id='ctrl{6}' type='text' name='txt' style='float:left;'/>"+
			    '<div id="btnBrowse{7}" class="" style="background-color:#E6E6E6;width:50px;float:left; height:22px;margin:0 5px;font-size:12px;padding:5px 0 0 10px;">Browse</div><input type="file" id="myFileDialog{8}" class="aa-div-hide" accept="image/*,video/*">'+
			    "<div id='selectedFile{10}' style='float:left;clear:both;width:350px;height:auto;'></div>"+
			"</div>"+
		"</div>",
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementLable,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId,
		this.cDocumentElement.cSElementId));
		
		
		this.chtmlElementLable = $(String.format('#Label{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementInputctrl = $(String.format('#ctrl{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementContent = $(String.format('#ctrltextbox{0}',this.cDocumentElement.cSElementId));
		this.chtmlElementCtrlContent = $(String.format('#ctrlcontent{0}',this.cDocumentElement.cSElementId));

		this.chtmlBrowse = $(String.format('#btnBrowse{0}',this.cDocumentElement.cSElementId));
		this.chtmlUpload = $(String.format('#btnUpload{0}',this.cDocumentElement.cSElementId));
		this.fileDialog = $(String.format('#myFileDialog{0}',this.cDocumentElement.cSElementId));
		this.FleListContent = $(String.format('#selectedFile{0}',this.cDocumentElement.cSElementId));
		
		//set element lable align
		setElementAlign(this.cDocumentElement,this.chtmlElementLable,this.chtmlElementCtrlContent,this.chtmlElementContent);
		this.chtmlElementInputctrl.addClass('af-InputBoxSmall-st0');
		
		$(this.chtmlBrowse).unbind('click');
		$(this.chtmlBrowse).bind('click', function(event){self.chtmlBrowse_click(event);});
		
		//$(this.chtmlUpload).unbind('click');
		//$(this.chtmlUpload).bind('click', function(event){self.chtmlUpload_click(event);});
		
		//$(this.fileDialog).bind('change', function(event){self.fileDialog_select(event);});
		
		this.drowSelectedFile();

		this.cpPermission();
		
	},
	
	cpRedrow : function()
	{

	},
	
	drowSelectedFile : function()
	{
	    var self = this;
	    if(this.hashFiles.size() == 0)
	    {
	    return;
        }

           // var filedetails = {"cStrFileType": null, "cStrFileID": null, "cStrFileName": null, "cStrFileFullName": null, "cStrDateCreated": null, "cStrCreatedBy": null,}
        var filearr = new Array();
        var filearr = this.hashFiles.values();
	    self.FleListContent.html('');
	    $.each(filearr.reverse(), function(index, value){ 
            self.addFileToelement(value);
	    })
	},
	
	
	addFileToelement: function(value)
	{
	    var self = this;
	    $(_connection).unbind("onbgobject");
        $(_connection).bind("onbgobject", function(event, sign, id, data) {self.onMediaFileobj(sign, data);});
        
			self.FleListContent.append(String.format(
	        "<div id='file{0}' class='af-filecontent'><div id='fileclose{1}' class='af-file-close' value='{2}'></div>"+
	            "<div class='af-fileP-path' title='{3}'>{4}</div>"+
	            "<div id='view' class='af-file-view' value='{5}'>View</div>"+
	            "<div id='download' class='af-file-download' value='{6}'>Upload</div>"+
	            "<div class='af-fileprogres aa-div-hide' ><div class='af-filefill'></div></div>"+
	            "<div class='file-size'></div>"+
	        "</div>",
	        value.cStrFileID,
	        value.cStrFileID,
	        value.cStrFileID,
	        value.cStrFileName,
	        value.cStrFileName,
	        value.cStrFileID,
	        value.cStrFileID));
	        
	        //if(self.isLoad)
	       // {           
	        _connection.get_bgobject("010", value.cStrFileID+"_"+value.cLFileSize);
	       // }
	        //self.check_file_existence(value);

	        fileClose = $(String.format('#fileclose{0}',value.cStrFileID));
	        htmlfile  = $(String.format('#file{0}',value.cStrFileID));
	        fileClose.unbind();
	        fileClose.bind('click', function(event){self.fileClose_click(event)});
	        
	        $('.file-size',htmlfile).html(self.getSizeType(value.cLFileSize));   
	        $('#view',htmlfile).bind('click',{'id':value.cStrFileID}, function(event){self.fileViewClick(event)});
	},
	
	
			
	onMediaFileobj: function(sign, data)
    {

         var self = this;
         if (sign == "010")
         {
           var htmlfile  = $(String.format('#file{0}',data.cStrFileID));

            switch(data.cIFileAvailableStatus)
            {
                case 0:

                 $('#view',htmlfile).removeClass('af-file-enable');
                 $('#download',htmlfile).removeClass('af-file-enable');
                 $('#download',htmlfile).unbind();
                 $('#view',htmlfile).unbind();
                break;
                
                case 1:

                 $('#view',htmlfile).addClass('af-file-enable');
                 $('#download',htmlfile).addClass('af-file-enable');
                 $('#download',htmlfile).html('Upload');
                 $('#download',htmlfile).unbind();
                 $('#view',htmlfile).unbind();
                 $('#download',htmlfile).bind('click',{'id':data.cStrFileID},function(event){self.fileUploadClick(event)});
                 $('#view',htmlfile).bind('click',{'id':data.cStrFileID},function(event){self.fileViewClick(event)});

                break;
                
                case 2:

                 $('#view',htmlfile).removeClass('af-file-enable');
                 $('#download',htmlfile).addClass('af-file-enable');
                 $('#download',htmlfile).html('Download');
                 $('#download',htmlfile).unbind();
                 $('#view',htmlfile).unbind();
                 $('#download',htmlfile).bind('click',{'id':data.cStrFileID},function(event){self.fileDownloadClick(event)}); //download goes here
                break;
                
                case 3:

                 $('#view',htmlfile).addClass('af-file-enable');
                 $('#download',htmlfile).removeClass('af-file-enable');
                 $('#download',htmlfile).html('Upload');
                 $('#download',htmlfile).unbind();
                 $('#view',htmlfile).unbind();
                 $('#view',htmlfile).bind('click',{'id':data.cStrFileID},function(event){self.fileViewClick(event)});
                break;
                
                default:
                break;
            }
         }   
    },
		

	fileUploadClick : function(event)
	{
	    var _fileID = event.data.id;

        var htmlfile = $('#file'+ _fileID);
	    $('.af-fileprogres',htmlfile).removeClass('aa-div-hide');
        $('#download',htmlfile).removeClass('af-file-enable');
        $('#download',htmlfile).unbind();
        
        _fileJson =	this.hashFiles.get(_fileID);
        var jsonString = JSON.stringify(_fileJson);
    	
	    var self = this;
        $(_connection).unbind("on_comm_upload_media_file_feedback");

        $(_connection).bind("on_comm_upload_media_file_feedback", function(event, data) {
            self.on_comm_upload_media_file_feedback(data);
        });
        
        jQuery.amBusy();
        //var json = '{"sSOURSE_FILE_PATH" : "' + fileName + '", "sFILE_ID" : "' + fileId + '" }';
        var json = jsonString;
        jQuery._post2_viewl2({ _async: false,
            _data: json,
            _toaddress: _CONST_UPLOAD_MEDIA_FILE_LOCALLY,
            _feedbackfunc: 'on_comm_upload_media_file_feedback',
            _syserrorfunc: 'on_commerror'
        });
                
       $(_connection).unbind("onbuzz");     
       $(_connection).bind("onbuzz", function(event, etype, edata) {
       
           if (etype == "_MEDIA_FILES_UPLOAD_STATUS" )
           {
                self.update_stat(edata);
           }
        });    
                
      return;
	},
	
	on_comm_upload_media_file_feedback : function(edata)
	{
	    jQuery.amReady();
        
        $(_connection).unbind("on_comm_open_media_file_feedback");
        if (edata.bSUCCESS) 
        {}
	
	},
	
	 
	fileDownloadClick : function(event)
	{
	    var _fileID = event.data.id;

        var htmlfile = $('#file'+ _fileID);
	    $('.af-fileprogres',htmlfile).removeClass('aa-div-hide');
        $('#download',htmlfile).removeClass('af-file-enable');
        $('#download',htmlfile).unbind();
        
        _fileJson =	this.hashFiles.get(_fileID);
        var jsonString = JSON.stringify(_fileJson);
    	
	    var self = this;
        $(_connection).unbind("on_comm_download_media_file_feedback");

        $(_connection).bind("on_comm_download_media_file_feedback", function(event, data) {
            self.on_comm_download_media_file_feedback(data);
        });
        
        jQuery.amBusy();
        //var json = '{"sSOURSE_FILE_PATH" : "' + fileName + '", "sFILE_ID" : "' + fileId + '" }';
        var json = jsonString;
        jQuery._post2_viewl2({ _async: false,
            _data: json,
            _toaddress: _CONST_DOWNLOAD_MEDIA_FILE_LOCALLY,
            _feedbackfunc: 'on_comm_download_media_file_feedback',
            _syserrorfunc: 'on_commerror'
       });
                
       $(_connection).unbind("onbuzz");     
       $(_connection).bind("onbuzz", function(event, etype, edata) {
           
           if (etype == "_MEDIA_FILES_DOWNLOAD_STATUS" )
           {
                self.update_download_stat(edata);
           }
        });    
                
      return;
	},
	
    on_comm_download_media_file_feedback : function(edata)
	{
	    jQuery.amReady();
        $(_connection).unbind("on_comm_open_media_file_feedback");
        if (edata.bSUCCESS) 
        {}
	},

	update_download_stat : function(edata)
	{
        var self = this;
	    fileID = edata.sFILE_ID;
	    status = parseInt(edata.dVALUE);
	    if(status == 100)
        status = 110;
        _fileJson = self.hashFiles.get(fileID);
        if(_fileJson == null || _fileJson == undefined)
        {
            return;
        }
        var htmlfile = $('#file'+ fileID);
       
       $('.af-filefill',htmlfile).css("width",status+"%");
       $('.file-size',htmlfile).html(edata.sFILE_STATUS);        

	    if(status > 100)
	    {
	     $('.af-fileprogres',htmlfile).delay(2000).fadeOut(400);
	     _connection.remove_bgobject("010", _fileJson.cStrFileID+"_"+_fileJson.cLFileSize);
  
	         $('#view',htmlfile).addClass('af-file-enable');
             $('#download',htmlfile).removeClass('af-file-enable');
             $('#download',htmlfile).html('Upload');
             $('#download',htmlfile).unbind();
             $('#view',htmlfile).unbind();
             $('#view',htmlfile).bind('click',{'id':edata.sFILE_ID},function(event){self.fileViewClick(event)});
             $('.file-size',htmlfile).html(self.getSizeType(edata.dFILE_SIZE)); 
        }
	},
	
	update_stat : function(edata)
	{
        var self = this;   
	    fileID = edata.sFILE_ID;
	    status = parseInt(edata.dVALUE);
	    if(status == 100)
	    status = 110;
        _fileJson = self.hashFiles.get(fileID);
        if(_fileJson == null || _fileJson == undefined)
        {
            return;
        }
        var htmlfile = $('#file'+ _fileJson.cStrFileID);
        $('.af-filefill',htmlfile).css("width",status+"%");   
        $('.file-size',htmlfile).html(edata.sFILE_STATUS);
		if(status > 100)
		{	
		_connection.remove_bgobject("010", _fileJson.cStrFileID+"_"+_fileJson.cLFileSize);
         $('.af-fileprogres',htmlfile).delay(2000).fadeOut(400); //self.drowSelectedFile();
   
	         $('#view',htmlfile).addClass('af-file-enable');
             $('#download',htmlfile).removeClass('af-file-enable');
             $('#download',htmlfile).html('Upload');
             $('#download',htmlfile).unbind();
             $('#view',htmlfile).unbind();
             $('#view',htmlfile).bind('click',{'id':edata.sFILE_ID},function(event){self.fileViewClick(event)}); 
             $('.file-size',htmlfile).html(self.getSizeType(edata.dFILE_SIZE));  
       }
	},
	

	fileViewClick : function(event)
	{
	    var self = this;
	    var _fileID = event.data.id;
        _fileJson =	this.hashFiles.get(_fileID);


        $(_connection).unbind("on_comm_open_media_file_feedback");

        $(_connection).bind("on_comm_open_media_file_feedback", function(event, data) {
            self.on_comm_open_media_file_feedback(data);
        });

        jQuery.amBusy();
        var json = '{"sFILE_ID" : "' + _fileJson.cStrFileID + '", "sFILE_FULL_NAME" : "' + _fileJson.cStrFileFullName + '" }';
        jQuery._post2_viewl2({ _async: false,
            _data: json,
            _toaddress: _CONST_OPEN_MEDIA_FILE_LOCALLY,
            _feedbackfunc: 'on_comm_open_media_file_feedback',
            _syserrorfunc: 'on_commerror'
        });
        return;
	},
	
	
	on_comm_open_media_file_feedback : function(edata)
	{
        jQuery.amReady();
        
        $(_connection).unbind("on_comm_open_media_file_feedback");
        if (edata.bSUCCESS) {

        }
	},
	

	fileClose_click : function(event)
	{
	    $(event.currentTarget).parent().remove();
	    selectFileId = $(event.currentTarget).attr('value');
	    this.hashFiles.remove(selectFileId);
	    hash_MediaFileList.remove(selectFileId);
	    this.cDocumentElement.cFilePath = this.hashFiles.keys();
	   // this.drowSelectedFile();
	},
	
	
	cpPermission : function()
	{
	    switch(this.cPermission)
	    {
	        case "2":   
	            $('.af-file-close',this.chtmlElement).addClass('aa-div-hide');
	            $('.af-file-close',this.chtmlElement).unbind('click');
	            
	            $.each(this.hashFiles.values(), function(index, value){
	            var htmlfile = $('#file'+ value.cStrFileID);
	            
	            	if($('#download',htmlfile).html() == 'Upload')
	                {
	                    $('#download',htmlfile).removeClass('af-file-enable');
	                    $('#download',htmlfile).unbind();
	                }
	            
	            })

                this.chtmlBrowse.attr('disabled','disabled');
                this.chtmlBrowse.addClass('af_ctrl_disable');
                this.chtmlBrowse.unbind();
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
	
	
	chtmlBrowse_click : function(event)
	{
	   this.actionfuncSaveMediaFile(this.cDocumentElement.cFileType);
	},
	
/*	fileDialog_select : function(event)
	{
	    var filedetails = {"cFileID": null,"FilePath": null,'cAvailableNods':null};
	    filedetails.cFileID = guidGenerator();
	    var path = $(this.fileDialog).val();
	    
	    filedetails.FilePath = path.replace(/\\/gi,"/");
		this.actionfuncSaveMediaFile(filedetails.FilePath, filedetails.cFileID)
	    
	    this.hashFiles.put(filedetails.cFileID, filedetails)
	         	    
	},
	*/
	actionfuncSaveMediaFile : function(pFileExt)
	{
	    var self = this;
        $(_connection).unbind("on_comm_save_media_file_feedback");

        $(_connection).bind("on_comm_save_media_file_feedback", function(event, data) {
            self.on_comm_save_media_file_feedback(data);
        });
        
        jQuery.amBusy();
        //var json = '{"sSOURSE_FILE_PATH" : "' + fileName + '", "sFILE_ID" : "' + fileId + '" }';
        var json = '{"sFileExt":"' + pFileExt + '" }';
        jQuery._post2_viewl2({ _async: false,
            _data: json,
            _toaddress: _CONST_SAVE_MEDIA_FILE_LOCALLY,
            _feedbackfunc: 'on_comm_save_media_file_feedback',
            _syserrorfunc: 'on_commerror'
        });
        return;
	
	},
	
	getSizeType: function(dfilesize)
        {
             var fileSizeType;
             var roundvalue;

            if (dfilesize > 1024 * 1024 * 1024)
            {
                roundvalue = Math.round(dfilesize / (1024 * 1024 * 1024)).toFixed(1);
                fileSizeType = "GB";
            }
            else if (dfilesize > 1024 * 1024)
            {
                roundvalue = Math.round(dfilesize / (1024 * 1024)).toFixed(1);
                fileSizeType = "MB";
            }
            else if (dfilesize > 1024)
            {
                roundvalue = Math.round(dfilesize / 1024).toFixed(1);
                fileSizeType = "KB";
            }
            else
            {
                roundvalue = Math.round(dfilesize).toFixed(1);
                fileSizeType = "Byte";
            }
            return String.format("{0} {1}", roundvalue, fileSizeType);

        },
	
	
	
	on_comm_save_media_file_feedback: function(edata) {

        var self = this;
        jQuery.amReady();
        
        
        
        $(_connection).unbind("on_comm_save_media_file_feedback");
        if (edata.bSUCCESS) {
                     
            if(this.cDocumentElement.cIsMultiple != "1")
            {
                 this.cDocumentElement.cFilePath = new Array();
                 this.hashFiles = new Hashtable();
            }  
            //filedetails.cAvailableNods.push(_connection.sessionobj.sNODEID)
            
            hash_MediaFileList.put(edata.oMEDIA_FILE.cStrFileID,edata.oMEDIA_FILE);
            
            this.hashFiles.put(edata.oMEDIA_FILE.cStrFileID,edata.oMEDIA_FILE); 
            
            this.cDocumentElement.cFilePath = this.hashFiles.keys();


            this.addFileToelement(edata.oMEDIA_FILE);
            //this.isLoad = false;
           // this.drowSelectedFile();
            
        }
        
        else{
        alert(edata.sMSG);
        }
    }



	});
})(jQuery)