$(function(){
 $('#sss').on('keyup', function(e){
   if(e.keyCode === 13) $("#searchbutton").click();
  });


 $("#searchbutton").click(function(){
 	var parameters = { search: $("#sss").val() };
 	$("#sss").val('');
 	$("#sss").attr("disabled","disabled");
 	$("#searchbutton").attr("disabled","disabled")
 	$('#employees').html('<div align="center"><img src="/img/wait.gif"/></div>');
 	$.post( '/employees',parameters, function(data) {
       $('#employees').html(data);
       $("#sss").removeAttr("disabled");
       $("#searchbutton").removeAttr("disabled");   
    });
 });
});
