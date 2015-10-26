var listOfWords = [];
var matchResult = false;
var numberOfTriesBeforeLosing;

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

function checkLetter(id,arr){
  document.getElementById(id).className = "btn btn-danger btn-lg"
  if (listOfWords.length == 0){
    listOfWords = arr.split(',');
    if (Math.floor((Math.random() * 10) + 1) >= 8) matchResult = true;
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
    //Migrate the words to the original array and clear the auxiliary
    listOfWords = auxiliaryListOfWords[0].slice(0);
    auxiliaryListOfWords.length = 0;
    console.log(listOfWords);
    //Insert the letter into the field
    for (var i = 0; i < listOfWords[0].length; i++) {
      listOfWords[0][i]
    }



}




/*
console.log(document.getElementById('secret1'));
console.log(document.getElementById(id).innerHTML);
document.getElementById('secret1').innerHTML = "New text";
document.getElementById('A').style.backgroundColor = "yellow";*/
