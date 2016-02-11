
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var equip = require('./routes/equip');
var environ = require('./routes/environ');
var equipment = require('./routes/equipment');
var editEquipment = require('./routes/editEquipment');
var environment = require('./routes/environment');
// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'crescendo';
var local_database_uri  = 'mongodb://<dbuser>:<dbpassword>@ds061415.mongolab.com:61415/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/equipment', equipment.view);
app.get('/environment', environment.view);
app.get('/editEquipment', editEquipment.view);
app.get('/equip/:id', equip.equipEdit);
app.post('/equip/new', equip.addProject);
app.post('/equip/:id/delete', equip.deleteProject);
app.get('/environ/:id', environ.projectInfo);
app.post('/environ/new', environ.addProject);
app.post('/environ/:id/delete', environ.deleteProject);
app.post('/register', function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	var newUser = new User();
	newUser.username = username;
	newUser.password = password;
	newUser.firstname = firstname;
	newUser.lastname = lastname;
	newUser.save(function(err, savedUser){
		if(err){console.log(err);}
		return res.status(200).send();
	})
});
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
