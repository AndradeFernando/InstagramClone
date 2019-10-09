var express =require('express');
var bodyParser =require( 'body-parser');
var  mongodb =require( 'mongodb');
var objectId = require('mongodb').ObjectId;

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port=82;
app.listen(port);

var db = new mongodb.Db(
    'InstagramClone',
    new mongodb.Server('localhost',27017,{})

)

console.log('Http is listening on port '+ port)

app.get('/', function(req,res){
    res.send({msg:'Hi man!'})
})

//create
app.post('/api', function(req,res){
    debugger
    var dados = req.body;

    db.open(function(err,mongoclient){
        mongoclient.collection('Posts', function(err,collection){
            collection.insert(dados, function(err, records){
                if(err){
                    res.json(err)
                } else {
                    res.json(records)
                }
                mongoclient.close();
            })
        })
    })
})


//list all
app.get('/api', function(req,res){

    db.open(function(err,mongoclient){
        mongoclient.collection('Posts', function(err,collection){
            collection.find().toArray(function(err,results){
                if(err){
                    res.json(err);
                }else {
                    res.json(results);
                }
                mongoclient.close();
            })
        })
    })
})

//list 1
app.get('/api/:id', function(req,res){

    db.open(function(err,mongoclient){
        mongoclient.collection('Posts', function(err,collection){
            collection.find(objectId(req.params.id)).toArray(function(err,results){
                if(err){
                    res.json(err);
                }else {
                    res.json(results);
                }
                mongoclient.close();
            })
        })
    })
})

//update
app.put('/api/:id', function(req,res){

    db.open(function(err,mongoclient){
        mongoclient.collection('Posts', function(err,collection){
            collection.update(
                {_id:  objectId(req.params.id)},
                { $set: {titulo: req.body.titulo}},
                { },
                function(err, records){
                    if(err){
                        res.json(err);

                    } else {
                        res.json(records);
                    }
                    mongoclient.close();
                }
            )
        })
    })
})

//delete
app.delete('/api/:id', function(req,res){

    db.open(function(err,mongoclient){
        mongoclient.collection('Posts', function(err,collection){
            collection.remove({_id: objectId(req.params.id)}, function(err, records) {
                if(err){
                    res.json(err);

                } else {
                    res.json(records);
                }
                mongoclient.close();
            })
        })
    })
})



