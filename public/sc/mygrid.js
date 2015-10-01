 function gr(params) {
    
     var $grid=$(params.el) //находим элемент крепления для грида
		, bar= params.pager //элемент крепления панели управления
        , navig= params.navigator;
     
     var cNames=Array();     
     for(i = 0; i<params.cols.length; i++){
	 	cNames[i]=params.cols[i][0];
	 }
	 cNames.push("");
	 
	 var cModels=Array();
	 for(i = 0; i<params.cols.length; i++){
        var c={}; 
     	c.name=params.cols[i][1];
     	c.index=params.cols[i][1];
     	c.width=params.cols[i][2];
     	c.editable=params.cols[i][3];
     	if(params.cols[i][4]=="select"){
     		c.formatter="select";
     		c.edittype="select";
     		c.editoptions={value:params.cols[i][5],defaultValue:params.cols[i][6]};
     		}
     	if(params.cols[i][4]=="checkbox"){
			c.formatter="checkbox";
			c.formatoptions={disabled:true};
     		c.edittype="checkbox";
     		c.editoptions={value:"t:f",defaultValue: "t"};
		}	
		if(params.cols[i][4]=="area"){
			c.edittype="textarea";
		}
		if(params.cols[i][4]=="datepicker"){
			c.editoptions=({dataInit: function (elem) {$(elem).datepicker({
                 changeMonth: true,
                 changeYear: true,
                 dateFormat: 'yy-mm-dd',
                 yearRange: '1920:2099'});}});
            c.formatter="date";
            c.formatoptions={srcformat:'Y-m-d',newformat:'Y-m-d'};
            
		}
		
      	cModels[i]=c;
	 }
	 if(!params.buts){
	 cModels.push({name: 'myac', width:45, fixed:true, sortable:false, search:false,
	 			   resize:false, formatter:'actions', 
	 			   formatoptions:{keys:true,delOptions:{reloadAfterSubmit:false}}	 				
	 			   });
    }
     
 	var _pgtext;
 	if(!params.pgtext) _pgtext=null;
 	var _rownum;
 	if(params.rowlist) _rownum=params.rowlist[0]; else _rownum=0;
 	var ras=false;
 	if (params.ras) ras=true;
 	var cai=false;
 	if (params.cai) cai=true;
 	var edcap="Змінити запис:";
 	if(params.edcap) edcap=params.edcap;
 	var addcap="Додати запис:";
 	if(params.addcap) addcap=params.addcap;
 	function returnFocusToGrid() {$(params.el).focus();}
 	
 	$grid.jqGrid({
 	   url:params.url,
 	   editurl:params.edurl,
     datatype: 'JSON',
 	   mtype: 'POST',
     postData : params.postData,
 	   colNames:cNames,
 	   colModel :cModels,
 	   pager: bar,
     rowNum:_rownum,
     height: params.height,
     width:  params.width,
     rowList:params.rowlist,
     pgbuttons: params.pgbuttons,
     pgtext: _pgtext,
 	   sortname: params.cols[0][1],
 	   sortorder: 'asc',
     scroll: false,
     scrollrows: true,
     viewrecords: params.viewrecords,
     shrinkToFit:false,
     gridview: true,
     hidegrid:false,
     caption:params.caption
 	}).navGrid(params.pager,{edit:true, add:true, del:true, search:false},
             {editCaption:edcap,closeAfterEdit: cai,closeOnEscape:true,reloadAfterSubmit: ras,width:params.width,recreateForm:true},
             {addCaption:addcap,closeAfterAdd:cai,clearAfterAdd:true,closeOnEscape:true,reloadAfterSubmit: ras,width:params.width,recreateForm:true},
             {closeOnEscape:true,reloadAfterSubmit: false},
             {multipleSearch:true,closeOnEscape:true}
     ).jqGrid('bindKeys')
             
    };