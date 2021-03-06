var mysql = require('mysql');

var connection;
exports.startConnection = function(connectionInfo){
	connection = mysql.createConnection(connectionInfo);
	connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
    if (err) throw err;
    connection.query('USE test', function (err) {

    if (err) throw err;
    connection.query('CREATE TABLE IF NOT EXISTS users('
        + 'id INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY(id),'
        + 'username VARCHAR(30),'
        + 'password VARCHAR(30),'
        + 'message VARCHAR(100)'
        +  ')', function (err) {

    if (err) throw err;
    connection.query('INSERT IGNORE INTO users VALUES(1, "root", "asdjfl123412", "I am root. I am in control");'+
    	'INSERT IGNORE INTO users VALUES(2, "John Doe", "password", "I like to put information on insecure websites");'+
    	'INSERT IGNORE INTO users VALUES(3, "NSA", "wearesmart", "we are watching everyone haha'+
    	'...There is no way that that anyone will find out..Atleast we hope so")', function(err){
    if (err) throw err;
    connection.query('CREATE TABLE IF NOT EXISTS comments('
        + 'id INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY(id),'
        + 'username VARCHAR(30),'
        + 'content VARCHAR(100)'
        +  ')', function (err) {

    if (err) throw err;
    connection.query('INSERT IGNORE INTO comments VALUES(3, "John Doe", "Such hack skillz<br>So amaze<br><b>Wow﻿</b>");'+
    	'INSERT IGNORE INTO comments VALUES(2, "NSA", "Noobs...ever try threesome?");'+
    	'INSERT IGNORE INTO comments VALUES(1, "root", "Holy shit... He\'s in.");', function(err){

    if (err) throw err;
	});
    });
    });
	});
	});
	});
}
exports.getConnectionHandle = function(){
	return connection;
}

exports.login_validation_bad = function(user, password, callback){
	var query = "SELECT * FROM users WHERE username='"+user+"' AND password='"+password+"'";
	connection.query(query, function(err, result){
			callback(err, result);
	})
}

exports.login_validation_proper = function(user, password, callback){
	var query = "SELECT * FROM users WHERE username= ? AND password= ?"
	connection.query(query, [user, password], function(err, result){
			callback(err, result);
	})
}
exports.getUser = function(id, callback){
	var query = "SELECT * FROM users WHERE id= ?"
	connection.query(query, [id], function(err, result){
			callback(err, result);
	})
}
exports.getComments = function(callback){
	var query = "SELECT * FROM comments";
	connection.query(query,function(err, result){
			callback(err, result);
	})
}
exports.createComment = function(username, content, callback){
	var query = "INSERT INTO comments (username, content) VALUES('"+username+"','"+content+"');";
	connection.query(query,function(err, result){
			callback(err, result);
	})
}
exports.endConnection = function(){
	connection.end();
}
