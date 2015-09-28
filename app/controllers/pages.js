var DB = require('../models/db');
var sugar = require("sugar");
var moment = require('moment');
var async = require('async');

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

exports.props = function(req, res){
	var sql = "SELECT * FROM boln_props";
	DB.dbquery(sql,[],function(resp){
				res.render('props',{dat: resp});
			});
};

exports.save_props = function(req, res){
	var sql = "UPDATE BOLN_PROPS SET rabota_dn = ?, rabota_dk = ?, boln_dn = ?, boln_dk = ?";
	DB.dbquery(sql,[req.body.rabota_dn, req.body.rabota_dk, req.body.boln_dn, req.body.boln_dk],function(resp){
		res.send(resp);
	});
};

exports.employees = function (req,res){
	var sql = "SELECT * FROM ls WHERE (UPPER(FIO_F) LIKE '%"+req.body.search.toUpperCase()+"%') ORDER BY tabn";
	DB.dbquery(sql,[],function(resp){
		res.render('result_employee',{
			text: "("+req.body.search+")",
			kolvo: resp.count(),
			arr: resp
		});
	});
};

exports.empl = function(req, res){
var tabn = req.body.tabn.toNumber();
var out = {}; 

var tasks = [
	function (callback) {
            var sql3 = "SELECT tabn,fio_f,idkod FROM ls WHERE tabn = ?";
				DB.dbquery(sql3,[tabn],function(resp){
				callback(null, resp);
			});
                     
        },
    function (callback) {
            var sql3 = "SELECT * FROM BOLN_PROPS";
			DB.dbquery(sql3,[],function(resp){
				var rabota_dn = moment(resp[0].rabota_dn).format("DD.MM.YYYY");
				var rabota_dk = moment(resp[0].rabota_dk).format("DD.MM.YYYY");
				var boln_dn = moment(resp[0].boln_dn).format("DD.MM.YYYY");
				var boln_dk = moment(resp[0].boln_dk).format("DD.MM.YYYY");
				out.rabota_dn = rabota_dn;
				out.rabota_dk = rabota_dk;
				out.boln_dn = boln_dn;
				out.boln_dk = boln_dk;
				callback(null);
			});
                     
        },
    function (callback){
    	var sql3 = "SELECT d.*, f.naimenovanie FROM ls_rabota d, spr_rabota f WHERE d.rabota=f.rabota AND d.tabn="+tabn+" AND d.datan<='"+out.rabota_dk+"' AND d.datak>='"+out.rabota_dn+"'";
			DB.dbquery(sql3,[],function(resp){
				callback(null, resp);	
			});
    }
];

async.series(tasks, function (err, results) {
    out.pers = results[0];
    out.rabota = results[2];
    res.render("result_empl",out);
});

};