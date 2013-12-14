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
	res.render(type+'/lesson'+lessonNum, { title: 'A lesson', destination: '/lessons/getResults/'+type+'/'+lessonNum});
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
	else if(type == 'directObj' && lessonNum == '1'){
		login(req, res);
	}
}

function login(req, res){
	mysql.login_validation_proper(req.body.username, req.body.password, function(err, result){
		if(err) res.send(err.message);	
		else if(result.length == 1){
			if(req.params['type'] == 'directObj')
				res.redirect('/directObj/messageboard/'+result[0].id);
		}
		else{
			res.send("Incorrect username or password");
		}
	})	
}

exports.showPageDirectObj = function(req, res){
	var userId = req.params['id'];
	var additionalInfo;
	if(userId == '2')
		additionalInfo = "You have been able to access your message. Now try to access other people's messages"+
			"<br>You should try to manipulate some variables associated with this page";
	else if(userId == '1')
		additionalInfo = "Great you hacked it"+
			"<br>There is one more user. Try getting that one";
	else if(userId == '3')
		additionalInfo = "Good Job"+
			"<br>Now you know that your information on the internet is not safe";
	mysql.getUser(userId, function(err, result){
		if(err || result.length == 0)		
			res.send("The user you requested does not exist");
		else
			res.render('directObj/messageBoard', {message: result[0].message, username: result[0].username, additionalInfo: additionalInfo });
	})
}