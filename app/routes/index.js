'use strict';
//https://www.terlici.com/2015/05/16/uploading-files-locally.html
//http://stackoverflow.com/questions/27785896/use-multer-in-express-route-using-meanjs

var path = process.cwd();
var multer = require('multer');
var filesize = require('filesize');

var uploading = multer({
	dest: path + '/public/upload',
	limits: {filesize: 1000000, files: 1}
});

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	
	app.post('/upload', uploading.single('aFile'), function(req, res) {
		//console.log(req.file);
		res.json({
			'filename': req.file.originalname,
			'filesize': filesize(req.file.size)
		});
	});

	
};
