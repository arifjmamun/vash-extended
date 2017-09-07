var express = require('express');
var extension = require('../helper/extension');
var router = express.Router();

var db = require('../db');

router.get('/', function (req, res, next) {
    res.render('departments_index', {
        Title: "Department",
        Action: "Index"
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

module.exports = router;