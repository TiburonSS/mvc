$(function(){
	$("#hmb").click(function(){
		window.location.reload();
	});
	$("#propb").click(function(){
		$.get( '/props',function(data) {
         $("#contain").html(data);   
    });
	});
});