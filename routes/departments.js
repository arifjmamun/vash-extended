var express = require('express');
var extension = require('../helper/extension');
var router = express.Router();

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

module.exports = router;