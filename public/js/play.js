/*----------------------------------------------------------
 * Authors:
 *            Rodolfo Andrés Ramírez Valenzuela
 *
 *----------------------------------------------------------*/

'use strict';
var listOfWords = [];
var matchResult = false;
var numberOfTriesBeforeLosing;
var numberOfLives = 0;
var lettersMissing;
var lettersArray=['A','B','C','D','E','F','G','H','I','J','K','L','M',
             'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

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

function hideLetters(){
  for (var k = 0; k < lettersArray.length; k++) {
    document.getElementById(lettersArray[k]).className = "btn btn-lg disabled"
  }
}

function loseGame(){
  if (numberOfLives == 0){
    // The evil hangman wins, disabling buttons and displaying the word
    var randomIndex = Math.floor(Math.random() * listOfWords.length-1) + 1;
    //Get a random word from the cheating array and display as red
    var randomWord = listOfWords[randomIndex];
    for (var i = 0; i < randomWord.length; i++) {
      var id = 'secret' + i;
      if (document.getElementById(id).innerHTML.trim() === '_'){
        document.getElementById(id).innerHTML = randomWord[i];
        document.getElementById(id).style.color = 'red';
      }
    }
    document.getElementById('livesLeft').innerHTML = 'You have lost!';
    document.getElementById('livesLeft').style.fontSize = '5em';
    document.getElementById('livesLeftHeader').innerHTML = '';
    document.getElementById('livesLeftFooter').innerHTML = '';
    hideLetters();


  }
}
function checkLetter(id,arr,lives){
  document.getElementById(id).className = "btn btn-danger btn-lg disabled"
  var letter = getLetter(id);
  if (listOfWords.length == 0){
    listOfWords = arr.split(',');
    if (Math.floor((Math.random() * 10) + 1) >= 8) matchResult = true;
    numberOfLives = lives;
    lettersMissing = listOfWords[0].length;
    console.log(matchResult);
  }

  if (lettersMissing === 1 && matchResult === false){ //this means the hangman will win
    numberOfLives --
    discardLetter(letter);

    document.getElementById('livesLeft').innerHTML = numberOfLives;
    loseGame();
  }else{

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
          losegame();
        }else if(auxiliaryListOfWords[0].length < lettersMissing && matchResult === false){
          discardLetter(letter);
          numberOfLives -= 1;
          document.getElementById('livesLeft').innerHTML = numberOfLives;
          losegame();
        }else{
          listOfWords = auxiliaryListOfWords[0].slice(0);
          auxiliaryListOfWords.length = 0;
          //Insert the letter into the field
          var letterPositions = [];
          getLettersPosition(listOfWords[0],letter,letterPositions);
          for (var i = 0; i < letterPositions.length; i++) {
            var id = 'secret' + letterPositions[i];
            lettersMissing--;
            document.getElementById(id).innerHTML = letter;
            if (lettersMissing == 0){
              document.getElementById('livesLeft').innerHTML = 'You have won!';
              document.getElementById('livesLeft').style.fontSize = '5em';
              document.getElementById('livesLeftHeader').innerHTML = '';
              document.getElementById('livesLeftFooter').innerHTML = '';
              hideLetters();
            }
          }
        }
  }

}

function discardLetter(letter){
  var auxiliarList = [];
  for (var i = 0; i < listOfWords.length; i++) {
    var word = listOfWords[i].trim();
    if (word.indexOf(letter) < 0){
      auxiliarList.push(word);
    }
  }
  listOfWords = auxiliarList.slice(0);
  auxiliarList.length = 0;


}
