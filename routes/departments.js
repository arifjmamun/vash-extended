var express = require('express');
var extension = require('../helper/extension');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');


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
        Action: "Add New",
        Errors : []
    };
    res.render('departments_add', model);
});

router.post('/add', [
    check('Name')
        .not().isEmpty().withMessage('Name cannot be empty.')       
        .isLength({min:1, max:100}).withMessage('Name valid range is 1-100 char.'),
    check('Code')
        .not().isEmpty().withMessage('Code cannot be empty.')
        .isLength({min:1, max:5}).withMessage('Code valid range is 1-5 char.')
],function (req, res, next) {
    var collection = db.get().collection('Departments');
    var errors = validationResult(req);
    
    if(errors.isEmpty()){ 
        collection.save(req.body, function(err, result){
            if(err) throw err;
            console.log('Data saved.');
            res.redirect('/departments');
        });
    }
    else{
        console.log(errors.mapped());
        var model = {
            Title: "Department",
            Action: "Add New",
            Errors : errors.mapped() 
        };
        res.render('departments_add', model);        
    }
    console.log(req.getValidationResult());
    return;
});

router.get('/edit/:id', function(req, res, next){
    try{
        var id = objectId(req.params.id);
        db.get().collection('Departments').findOne({"_id":id}, function(err, result){
            console.log(result);
            if(err) throw err;
            res.render('departments_edit', {
                Title: "Departments",
                Action: "Edit",
                Department : result
            });
        });
    } catch(error){
        res.send('Unexpected error. Details: '+error.message)
    }
    
});

router.post('/edit', function(req, res, next){
    var collection = db.get().collection('Departments');
    try{
        var id = objectId(req.body._id);
        collection.find({"_id": id}, {$exists: true}).toArray(function(err, result) //find if a value exists
        {     
            if(result.length>0) 
            {
                collection.updateOne({"_id":id},{Name:req.body.Name, Code:req.body.Code}, function(err, res){
                    if(err) throw err;
                });
            }            
            res.redirect('/departments');            
        });
    }catch(error){
        res.send('Unexpected error. Details: '+error.message)
    }
});

router.post('/delete', function(req, res, next){
    try{
        var collection = db.get().collection('Departments');
        var id = objectId(req.body._id);
        collection.find({"_id": id}, {$exists: true}).toArray(function(err, result) //find if a value exists
        {     
            if(result.length>0) 
            {
                collection.deleteOne({"_id":id}, function(err, obj) {
                    if(err) throw err;
                });
            }            
            res.redirect('/departments');            
        });
        
    } catch(error){
        res.send('Unexpected error. Details: '+error.message)
    }
});

module.exports = router;