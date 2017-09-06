var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    selector:"City", 
    cities: [
      {value:1, text:"Dhaka"},
      {value:2, text:"Mymenshingh"},
      {value:3, text:"Chittagong"}
    ]
  });
});

module.exports = router;
