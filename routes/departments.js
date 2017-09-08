var express = require('express');
var extension = require('../helper/extension');
var router = express.Router();

var db = require('../db');
var objectId = require('mongodb').ObjectId;

router.get('/', function (req, res, next) {
    db.get().collection('Departments').find().toArray(function(err, result){
        res.render('departments_index', {
            Title: "Departments",
            Action: "Home",
            Departments : result
        });
    });
    
});

router.get('/add', function(req, res, next){
    var model = {
        Title: "Department",
        Action: "Add New"
    };
    res.render('departments_add', model);
});

router.post('/add', function(req, res, next){
    db.get().collection('Departments').save(req.body, function(err, result){
        if(err) return console.log(err);
        console.log('Data saved.');
        res.redirect('/departments');
    });
});

router.get('/edit/:id', function(req, res, next){
    var id = req.params.id;
    db.get().collection('Departments').findOne({"_id":objectId(id)}, function(err, result){
        console.log(result);
        if(err) return console.log(err);
        res.render('departments_edit', {
            Title: "Departments",
            Action: "Edit",
            Department : result
        });
    });
    //res.send('edit');
});

module.exports = router;