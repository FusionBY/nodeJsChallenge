'use strict';

var util = require('util');
var request = require('request');

module.exports = {
	getCity: getCity,
	postCity: postCity,
};

function getCity (req, res) {
	var url = 'http://localhost:3050/api/city';
	request.get(url).pipe(res);
}

function postCity (req, res) {
	console.log(req.body);
	var uri = 'http://localhost:3050/api/city';
	request.post(uri).form(req.body).pipe(res);
}
