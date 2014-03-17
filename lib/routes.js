'use strict';

module.exports = function(app)
{
	app.get('/', function(req, res) {
		// index view.
		res.render('index.ejs', {text: 'Hello World'});
	});
};
