$(function(){
	$("#hmb").click(function(){
		window.location.reload();
	});
	$("#propb").click(function(){
		$.get( '/props',function(data) {
         $("#contain").html(data);   
    });
	});
	$("#sprperiod").click(function(){
		$.get( '/spr_period',function(data) {
         $("#contain").html(data);   
    });
	});
	$("#about").click(function(){
		$.get( '/about',function(data) {
         $("#contain").html(data);   
    });
	});
});