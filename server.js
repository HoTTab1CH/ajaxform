var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
//встановлення каталогу для статичного контенту
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/',function(req,res)
{
	res.sendFile(__dirname + '/index.html');
});
app.get('/list',function(req,res)
{
	res.sendFile(__dirname + '/data.json');
});
app.get('/form',function(req,res)
{
	res.sendFile(__dirname + '/form.html');
});

// app.get('/formget',function(req,res)
// {
// 	console.log(req.query);
// 	var file = require('./data.json');
// 	console.log(file);
// 	file.push(req.query);
// 	var str = JSON.stringify(file);
// 	fs.writeFileSync('data.json', str)
// 	res.send("Дані збереж");
// });
app.get('/del',function(req,res)
{
	var id = req.query.id;

	var file = require('./data.json');
	console.log(file);
	file.splice(id,1);
	res.send("Запис видалено!");
});

app.post('/formsend',function(req,res)
{
	var id = req.body.id;

	var file = require('./data.json');
	console.log(req.body);
	file.splice(id,1);
	var str = JSON.stringify(file);
	fs.writeFileSync('data.json', str);
	res.send(str);
});

app.post('/postsend',function(req,res)
{
	console.log(req.body);
	res.send(req.body.myinput);
})

app.post("/mypost",function(req,res)
{
	console.log(req.body);
	res.send("SUCCESS!");
})
app.listen(8080);
console.log('server is running!');