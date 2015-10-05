var express = require('express')
  , app = express()
  , pages = require(__dirname + '/app/controllers/pages');

// configuration settings 
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/sc', express.static(__dirname + '/public/sc'));

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

app.locals.moment = require('moment');


var templating = require('consolidate');
app.engine('jade', templating.jade);
app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views'); 

// mount routes
app.get('/', function (req, res) { res.redirect('index') });
app.get('/index', pages.index);
app.get('/about', pages.about);
app.post('/employees', pages.employees);
app.post('/empl', pages.empl);
app.post('/save_props', pages.save_props);
app.get('/props', pages.props);
app.get('/spr_period', pages.spr_period);
app.post('/get_spr_period_data', pages.get_spr_period_data);
app.post('/get_ls_boln', pages.get_ls_boln);
app.post('/set_ls_boln', pages.set_ls_boln);

module.exports = app;