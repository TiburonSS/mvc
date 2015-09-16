$(function(){
	$('.datapick').each(function() {
      $(this).datepicker({
      	monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Ноя", "Дек" ],
      	autoSize: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd.mm.yy',
        yearRange: '2001:9999'
    });
});

$("#saveprops").click(function(){

	var parameters = { 
					   rabota_dn: $("#rabotadn").val(),
					   rabota_dk: $("#rabotadk").val(),
					   boln_dn: $("#bolndn").val(),
					   boln_dk: $("#bolndk").val()
					};
 	
 	$.post( '/save_props',parameters, function(data) {
       alert("Дані збережено...");
     });  
});
});