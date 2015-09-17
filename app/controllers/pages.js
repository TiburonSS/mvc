exports.index = function (req, res) {
  res.render('index', {
      title: 'Лікарняні'
    });
};
exports.about = function (req, res){
	res.render('about',{
		title : "About page",
		message: "This is about page"
	});
};

var fbcon = {};
fbcon.host = '127.0.0.1';
fbcon.port = '3050';
fbcon.database = 'baza';
fbcon.user = 'SYSDBA';
fbcon.password = 'masterkey';
var FB = require('node-firebird');

exports.employees = function (req,res){
	var s = req.body.search;
	FB.attach(fbcon, function(err, db) {
		if (err){
			res.render('error',{text:"Відсутній доступ до бази даних"});//TODO
		} else {
			db.query("SELECT * FROM ls WHERE (UPPER(FIO_F) LIKE '%"+s.toUpperCase()+"%') ORDER BY tabn",
				function(err, result) {
					res.render('result_employee',{
						text: "("+s+")",
						kolvo: result.count(),
						arr: result
					});
				});
			db.detach();
		}
	});
};