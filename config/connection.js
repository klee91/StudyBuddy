var mysql = require('mysql');

var connection = mysql.createConnection ({
	port: 3306,
	host: "localhost",
	user: "root",
	password: "",
	database: ""
});

connection.connect(function(err){
	if(err)
	{ throw err;
	console.log("Error in connecting with: " + err.stack);
	return	}
	else{
		console.log("User connected as:" + connection.threadId);
	}
})

module.exports = connection;