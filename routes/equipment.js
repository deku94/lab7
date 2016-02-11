var models = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){
	
	models.Equipment
		.find()
		.exec(renderEquipment);

	function renderEquipment(err, eqp) {
		console.log(eqp);
		res.render('equipment', { 'equipment': eqp });
	}

};