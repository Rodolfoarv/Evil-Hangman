
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hangman!' });
});

router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Hangman!' });
});

router.post('/info', function(req,res){
  console.log(req.body);
  res.redirect('/play');
});

router.get('/play', function(req,res){
  res.render('play', {title: 'Hangman!'});
});

module.exports = router;
