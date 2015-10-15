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

exports.spr_period = function(req, res){
		res.render('spr_period');
	};
 

exports.get_spr_period_data = function (req, res){
	var sql = "SELECT * FROM spr_period ORDER BY period";
	DB.dbquery(sql,[],function(resp){
				res.send(JSON.stringify(resp));
			});
	};

exports.set_spr_period_data = function (req, res){
	var sqlins = "INSERT INTO spr_period (period, naimenovanie, datan, datak, rkd) VALUES (?, ?, ?, ?, ?)";
	var sqldel = "DELETE FROM SPR_PERIOD WHERE PERIOD = ?";
	var sqledit = "UPDATE SPR_PERIOD SET period = ?, naimenovanie = ?, datan = ?, datak = ?, rkd = ? WHERE PERIOD = ?";
	var oper = req.body.oper;
	switch (oper){
		case "add":
		DB.dbquery(sqlins,[req.body.period,
						   req.body.naimenovanie,
						   req.body.datan,
						   req.body.datak,
						   req.body.rkd.toNumber()
						   ],function(resp){res.send(resp);}
		);
		break;
		case "del":
		DB.dbquery(sqldel,[req.body.period],function(resp){res.send(resp);}
		);
		break;
		case "edit":
		DB.dbquery(sqledit,[
						   req.body.period, 
						   req.body.naimenovanie, 
						   req.body.datan, 
						   req.body.datak, 
						   req.body.rkd.toNumber(), 
						   req.body.oldperiod],function(resp){res.send(resp);}
		);
		break;
	};
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
out.tabn = tabn;
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

exports.get_ls_boln = function(req, res){
	var sql = "SELECT * FROM ls_boln WHERE tabn = ? and databol>= ? and databol<= ? ORDER BY databol";
				DB.dbquery(sql,[req.body.tabn.toNumber(), req.body.dn, req.body.dk],function(resp){
				 res.send(JSON.stringify(resp));
			});
};

exports.set_ls_boln = function(req, res){
	var sqlins = "INSERT INTO LS_BOLN (tabn,databol,seriya,nomer,datan,datak,diagnoz) VALUES (?, ?, ?, ?, ?, ?, ?)";
	var sqldel = "DELETE FROM LS_BOLN WHERE TABN = ? AND DATABOL = ?";
	var sqledit = "UPDATE LS_BOLN SET databol = ?, seriya = ?, nomer = ?, datan = ?, datak = ?, diagnoz = ? WHERE TABN = ? AND DATABOL = ?";
	var oper = req.body.oper;
	switch (oper){
		case "add":
		DB.dbquery(sqlins,[req.body.tabn.toNumber(), 
						   req.body.databol,
						   req.body.seriya,
						   req.body.nomer,
						   req.body.datan,
						   req.body.datak,
						   req.body.diagnoz
						   ],function(resp){res.send(resp);}
		);
		break;
		case "del":
		DB.dbquery(sqldel,[req.body.tabn.toNumber(), 
						   req.body.databol],function(resp){res.send(resp);}
		);
		break;
		case "edit":
		DB.dbquery(sqledit,[
						   req.body.databol, 
						   req.body.seriya, 
						   req.body.nomer, 
						   req.body.datan, 
						   req.body.datak, 
						   req.body.diagnoz, 
						   req.body.tabn.toNumber(), 
						   req.body.olddatabol],function(resp){res.send(resp);}
		);
		break;
	};

};