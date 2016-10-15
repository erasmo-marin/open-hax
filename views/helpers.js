var moment = require("moment");
var hbs = require('hbs');

var helpers = new function () {

	hbs.registerHelper('timestamp', function(text, options) {
		return moment(text).format("DD/MM/YYYY");
	});
}

module.exports = helpers;