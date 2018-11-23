var express =require('express');
var bodyParser =require( 'body-parser');
var  mongodb =require( 'mongodb');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port=82;
app.listen(port);

console.log('Http is listening on port '+ port)

app.get('/', function(req,res){
    res.send({msg:'Hi man!'})
})

app.post('/api', function(req,res){
    debugger
    var body = req.body;
    console.log(body)
    res.send(body);
})