'use strict';
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
  req.session.name = req.body.name;
  req.session.wordLength = req.body.wordLength;
  req.session.numberOfLives = req.body.numberOfLives;
  req.session.wordsArray = [];
  console.log(req.session);
  res.redirect('/play');
});

router.get('/play', function(req,res){
   var fs = require('fs');
   var path = require('path');
   var file = path.join(__dirname, 'dictionary.txt');

   fs.readFile(file,function(err,words){
     if (err) throw err;
     words = words.toString().split('\n');
     var wordsArray = [];
     var name = req.session.name;
     var wordLength = req.session.wordLength;
     var numberOfLives = req.session.nombre;
     for(var i = 0; i < words.length; i++){
       var word = words[i].trim();
       if (word.length == wordLength){
         wordsArray.push(word);
       }
     }
     
     var lettersArray=['A','B','C','D','E','F','G','H','I','J','K','L','M',
                  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
     res.render('play', {title: 'Hangman!',
                         letters: lettersArray,
                         session: req.session,
                         wordsArr: wordsArray});
   });

});

module.exports = router;
