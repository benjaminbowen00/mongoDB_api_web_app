const express = require('express');
const parser = require('body-parser');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));


MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {
    console.log(err);
    return;
  }
  const db = client.db("to_do_list");

  console.log('Connected to database');

  server.post('/api/tasks', function(req, res){
    db.collection('tasks').insert(req.body, function(err, result){
      if (err) {
        console.log(err);
        res.status(500);
        res.send();
      }

      console.log('saved to database')
      res.status(201);
      res.json(result.ops[0]);
    })
  })

  server.get('/api/tasks', function(req, res) {
    db.collection('tasks').find().toArray(function(err, results){

      if(err) {
        console.log(err);
        res.status(500)
        res.send();
      }

      res.json(results);
    });
  });

  server.delete('/api/tasks', function(req,res) {
    db.collection('tasks').remove({}, function(err,result) {

      if(err) {
        res.status(500);
        res.send();
      }

      res.status(204);
      res.send();
    });
  });

  server.put('/api/tasks/:id', function(req, res){
  db.collection('tasks').update({_id: ObjectID(req.params.id)}, req.body, function(err, result){

    if(err) {
      res.status(500);
      res.send();
    }

    res.status(204);
    res.send();
  });

});









  server.listen(3000, function(){
    console.log("Listening on port 3000");
  });
});
