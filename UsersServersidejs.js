var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'sharmi',
  password: 'gunathi24',
  database: 'users'
});

connection.connect(function(err) {
  if (err) {
  	throw err
  }
  console.log('You are now connected to the server / database...');
});



app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})
); 

app.get('/proj1usernames', function(req, res) {
	res.sendfile("userslist.html");
});

app.get('/proj1usernames/getusers', function(req,res) {
	console.log("check web page for user page");
	connection.query('SELECT * from userslist', function(err, rows, fields) {
	    if (err)  {
	    	console.log(err);
	    	//throw err;
		} else {
			console.log(rows);
			res.send(rows);
		}
	});
}); 

app.get('/proj1usernames/userscreate', function(req,res) {
	res.sendfile('userscreate.html');
});



app.post('/proj1usernames/savecreateuser', function(req,res) {
	console.log("req body =" + req);
	var fName = req.body.fName;
	var lName = req.body.lName;
	var title = req.body.title;
	var age = parseInt(req.body.age);
	var sex = req.body.sex;
	connection.query('INSERT INTO userslist(FirstName, LastName, Title, age, sex) values("'+fName + '","' +lName+ '","' + title + '",' + age + ',"' +sex+ '")', function(err, rows, fields) {
		console.log('INSERT INTO userslist(FirstName, LastName, Title, age, sex) values("'+fName + '","' +lName+ '","' + title + '",' + age + ',"' +sex+ '")');
	    if (err)  {
	    	console.log(err);
	    	//throw err;
		} else {
			console.log(rows);
			res.send("success");
		}
	});
});

app.get('/proj1usernames/edituser', function(req,res) {
	var id = parseInt(req.query.inp);
	console.log("below is the id user");
	var user = {};
	console.log(typeof(id) , id );

	connection.query(('SELECT * from  userslist where ID='+id), function(err,rows, fields) {
		var id = rows[0].ID;
		var fName = rows[0].FirstName;
		var lName = rows[0].LastName;
		res.render('edituser', { 
			ID: id,
			FirstName: fName,
			LastName: lName
		});
	});	
});

app.put('/proj1usernames/saveedituser', function(req,res) {
	console.log("req body =" + req);
	var id = req.body.ID;
	var title = req.body.Title;
	var age = req.body.age;
	var sex = req.body.sex;
	connection.query(('UPDATE userslist SET Title = "'+title+'", age = '+age+', sex= "'+sex+'" where ID=' +id ), function(err, rows, fields) {
		console.log('UPDATE userslist SET Title = "'+title+'" , age = '+age+', sex= "'+sex+'" where ID=' +id );	    
		if (err)  {
	    	console.log(err);
	    	//throw err;
		} else {
			console.log(rows);
			res.send("successfully edited user" +id);
		}
	});

});

app.delete('/proj1usernames/deleteuser', function(req,res) {
	var ID = req.query.inp;
	console.log(ID + 'is deleted');
	connection.query(('DELETE from userslist where ID=' +ID ), function(err, rows, fields) {
		if (err)  {
	    	console.log(err);
	    	//throw err;
		} else {
			console.log('DELETE from userslist where ID=' +ID );	    

			console.log(rows);
			res.send("successfully deleted user" +ID);
		}
	});
});

var identity=110;
var users = [
  {id:identity++, fName:'Sharmi', lName:'Sriram', title:'Librarian', age:'24', sex:'Female'},
  {id:identity++, fName:'Sriram', lName:'Venky', title:'Teacher', age:'30', sex:'Male'},
  {id:identity++, fName:'Shravan', lName:'kutty', title:'Paleontologist', age:'42', sex:'Male'},
  {id:identity++, fName:'Saakash', lName:'kutty', title:'Software Engineer', age:'33', sex:'Male'},
  {id:identity++, fName:'Shashu', lName:'baby', title:'Astranout', age:'22', sex:'Male'},
  {id:identity++, fName:'Harshad', lName:'Vasan', title:'Sports Player', age:'30', sex:'Male'},
  {id:identity++, fName:'shanthi', lName:'ammu', title:'Secretary', age:'42', sex:'Female'},
  {id:identity++, fName:'guna', lName:'appa', title:'Manager', age:'48', sex:'Male'},
  {id:identity++, fName:'dhana', lName:'appa', title:'CEO', age:'50', sex:'Male'},
  {id:identity++, fName:'lakshmi', lName:'paati', title:'chef', age:'70', sex:'Female'}
];
app.listen(8081);


function loaduser()
{
	
    var fName = ''; var lName = ''; var passw1 = ''; var passw2 = ''; var title = ''; var age = ''; var sex = '';
    var error = false;
    var incomplete = false; 
};
    

//connection.end();
