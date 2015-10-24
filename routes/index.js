
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
  var lettersArray=['A','B','C','D','E','F','G','H','I','J','K','L','M',
               'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  res.render('play', {title: 'Hangman!',
                      letters: lettersArray});
});

module.exports = router;
