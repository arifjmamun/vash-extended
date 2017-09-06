var express = require('express');
var extension = require('../helper/extension');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', {
    Title:"Home",
    Action: "Index"
  });
});

module.exports = router;
