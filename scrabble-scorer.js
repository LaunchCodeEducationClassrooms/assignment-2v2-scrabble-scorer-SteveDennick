// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question(`Let's play some scrabble!\n\nEnter a word to score: `);
};

let simpleScore = function(word){
  word = word.toUpperCase();
  let letterPoints = 0;
    for (let i = 0; i < word.length; i++){
      for (item in oldPointStructure) {
        if (oldPointStructure[item].includes(word[i])){
          letterPoints++;
        }
      }
    }
  return letterPoints;
}

let vowelBonusScore = function(word){
  word = word.toUpperCase();
  let letterPoints = 0;
    for (let i = 0; i < word.length; i++){
      if (word[i] === "A" ||word[i] === "E" ||word[i] === "I" ||word[i] === "O" ||word[i] === "U"){
        letterPoints+= 3;
      }else{
        letterPoints++;
      }
    }
  return letterPoints;
}

let scrabbleScore = function(word){
  word = word.toLowerCase();
  let score = 0;
  for (let i = 0; i < word.length; i++){
    if (word[i] in newPointStructure){
      score+= newPointStructure[word[i]];
    }
  }
  return score;
}



const scoringAlgorithms = [
  {name: "Simple Score", description: "Each letter is worth 1 point.", scoringFunction: simpleScore},
  {name: "Bonus Vowels", description: "Vowels are 3 pts, consonants are 1 pt.", scoringFunction: vowelBonusScore},
  {name: "Scrabble", description: "The tradtional scoring algorithm.", scoringFunction: scrabbleScore}
];


function scorerPrompt(userWord) {
  console.log(`Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scabble point system`)
  let scoringChoice = input.question("Enter 0, 1, or 2: ");
  return console.log(`Score for "${userWord}": ${scoringAlgorithms[scoringChoice].scoringFunction(userWord)}`);
}

function transform(obj) {
  let transformedObj = {};
  for (item in obj){
    for (i = 0; i < obj[item].length; i++) {
      transformedObj[obj[item][i].toLowerCase()] = Number(item);
    }
  }
  return transformedObj;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

