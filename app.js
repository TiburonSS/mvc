var express = require('express')
  , app = express()
  , pages = require(__dirname + '/app/controllers/pages') 

// configuration settings 
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/sc', express.static(__dirname + '/public/sc'));

var templating = require('consolidate');
app.engine('jade', templating.jade);
app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views'); 

// mount routes
app.get('/', function (req, res) { res.redirect('home') })
app.get('/home', pages.home)
app.get('/about', pages.about)

module.exports = app