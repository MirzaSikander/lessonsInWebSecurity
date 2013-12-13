var mysql = require('../models/mysqlCon');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Lesson\'s in websecurity'});
};

exports.showLesson = function(req, res){
	var type = req.params['type'];
	var lessonNum = req.params['lessonNum'];
	res.render(type+'/lesson'+lessonNum, { title: 'Lesson 1', destination: '/lessons/getResults/sql/1'});
}

exports.getResults = function(req, res){
	var type = req.params['type'];
	var lessonNum = req.params['lessonNum'];
	if(type == 'sql' && lessonNum == '1'){
		mysql.login_validation_bad(req.body.username, req.body.password, function(err, result){
			if(err)
				res.send(err.message);
			else{
				if(result.length == 1){
					res.send('Welcome '+req.body.username);
				}
				else if(result.length > 1){
					res.send('Welcome '+req.body.username+' <br> Good job! you hacked it');
				}
				else{
					res.send('Incorrect username or password');
				}
			}
		});
	}
}