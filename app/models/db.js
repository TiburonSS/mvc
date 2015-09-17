/**
 * Created by Tiburon on 16.09.2015.
 */
var argv = require('minimist')(process.argv.slice(2));
var file = argv['_'][0];

require("node-import");
if(file){
    imports("config/config_"+file);
} else {
    imports("config/config");
}
var FB = require('node-firebird');

exports.dbquery = function(sql, params, callback){
    FB.attach(fbcon, function(err, db) {
        if (err){
            throw err;
            //res.render('error',{text:"Відсутній доступ до бази даних"});//TODO
        } else {
            db.query(sql,params,function(err, result) {
                                callback(result);
                });
            db.detach();
        }
    });
};