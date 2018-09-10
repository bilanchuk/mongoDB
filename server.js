var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var User = require('./models/user');

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
})

app.get('/getusers',function(req,res){
	User.find(function(error,data){
		res.send(data);
	})
})

app.post('/adduser',function(req,res){
	console.log(req.body);
	var user = new User(req.body);
	user.save(function(error,data){
		console.log(data);
		res.send('New user added!!');
	});
})

app.post('/deleteuser',function(req,res){
	console.log(req.body);
	User.remove({_id:req.body.id},function(error,data){
		res.send("User was succesfully deleted!!!");
	});
})

app.post('/updateuser',function(req,res){
	console.log(req.body);
	User.update({_id:req.body.id},{name:req.body.name,age:req.body.age},function(error,data){
		res.send("User was succesfully updated!!!");
	});
})

app.listen(process.env.PORT || 8080);
console.log('Server run!');