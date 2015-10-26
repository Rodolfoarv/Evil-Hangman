'use strict';
var listOfWords = [];
var matchResult = false;
var numberOfTriesBeforeLosing;
var numberOfLives = 0;

function getLetter(id){
  return document.getElementById(id).innerHTML.toLowerCase().trim();
}

function compareLetters(word1,word2,letter){
  for (var i = 0; i < word1.length; i++) {
    if (word1[i] === letter){
      if(word1[i] !== word2[i]) return false;
    }
  }
  return true;
}

function getLettersPosition(word,letter,arr){
  var count = 0;
  for (var i = 0; i < word.length; i++) {
    if(word[i] === letter){
      arr[count] = i;
      count++;
    }
  }
}

function checkLetter(id,arr,lives){
  document.getElementById(id).className = "btn btn-danger btn-lg disabled"


  if (listOfWords.length == 0){
    listOfWords = arr.split(',');
    if (Math.floor((Math.random() * 10) + 1) >= 8) matchResult = true;
    numberOfLives = lives;
    console.log(matchResult);
  }
  var randomIndex = Math.floor(Math.random() * listOfWords.length) + 1;
  var randomWord = listOfWords[randomIndex];
  if (numberOfLives === 1 && matchResult === false){ //this means the hangman will win
    randomWord = listOfWords[randomWord+1];
    numberOfLives = 0;
    document.getElementById('livesLeft').innerHTML = numberOfLives;
  }

    var letter = getLetter(id);
    var auxiliaryListOfWords = [];
    var inserted = false;
    //Process to split into classes depending the number of ocurrences
    for (var i = 0; i < listOfWords.length; i++) {
      if (listOfWords[i].includes(letter)){
        for (var j = 0; j < auxiliaryListOfWords.length+1; j++) {
          if (auxiliaryListOfWords[j] === undefined){
            if (inserted == false){
              auxiliaryListOfWords[j] = [];
              auxiliaryListOfWords[j].push(listOfWords[i]);
              inserted = true;
            }
          }else{
            if (compareLetters(auxiliaryListOfWords[j][0],listOfWords[i],letter)){
              auxiliaryListOfWords[j].push(listOfWords[i]);
              inserted=true;
            }
          }
        }
        inserted = false;

      }
    }
    //Sort to get the list with the most amount of words

    auxiliaryListOfWords.sort(function(a,b){
      return b.length - a.length;
    });
    //Migrate the words to the original array and clear the auxiliary unless the word doesn't exist
    if (auxiliaryListOfWords[0] === undefined){
      numberOfLives -= 1;
      document.getElementById('livesLeft').innerHTML = numberOfLives;
    }else{
      listOfWords = auxiliaryListOfWords[0].slice(0);
      auxiliaryListOfWords.length = 0;
      console.log(listOfWords);
      //Insert the letter into the field
      var letterPositions = [];
      getLettersPosition(listOfWords[0],letter,letterPositions);
      for (var i = 0; i < letterPositions.length; i++) {
        var id = 'secret' + letterPositions[i];
        document.getElementById(id).innerHTML = letter;
      }
    }
}
