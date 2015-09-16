$(function(){
$(".btn-go-to-epml").click(function(){
		
 	 $('#content').hide();
      
 	var parameters = { tabn: $(this).attr("tabn") };
 	
 	$.post( '/empl',parameters, function(data) {
       $('#empl').html(data);
    });
 });
});

