var models = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){
	
	models.Environment
		.find()
		.exec(renderEnvironment);

	function renderEnvironment(err, eqp) {
		console.log(eqp);
		res.render('environment', { 'environment': eqp });
	}

};