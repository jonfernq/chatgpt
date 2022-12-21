// flashcards_dpatterns4.js - 
// Note: this program was created by AI (ChatGPT) along with documentation below 

// an example of how you can use the iterator design pattern 
// and the state design pattern 
// to create a simple flashcard program in JavaScript:

// In this example, the flashcardDeck object uses 
// the iterator design pattern by implementing 
// the Symbol.iterator method, which returns 
// an iterator object with a next method that returns the next flashcard in the deck.

//  The flashcardDeck object also uses the state design pattern 
// by implementing methods that modify its internal state, 
// such as addFlashcard, removeFlashcard, and shuffle. 
// These methods allow the flashcard deck to change its state 
// based on user input or other external factors.

// The readline module to allow 
// the program to read input from the user and write output to the console.

// A readline interface uses readline.createInterface
// to read input from process.stdin (standard input) 
// and write output to process.stdout (standard output).

// Finally, we wrapped the iteration over the flashcards 
// in an async function and used the await keyword 
// to pause the iteration until the user hits the enter key. 

// flashcards are read from a CSV file given as a command-line parameter
// fs and csv-parser modules are added to allow us to read from and parse a CSV file.

// a check to make sure that a CSV file was provided as a command-line argument. 
//If no CSV file is provided, the program will print an error message and exit.
 
// https://github.com/icyrockcom/country-capitals
// before running needs: npm install csv-parser

const readline = require('readline');
const fs = require('fs');
const csv = require('csv-parser');

const flashcardDeck = {
  currentIndex: 0,
  flashcards: [],
  
  // Iterator
  [Symbol.iterator]() {
    let currentIndex = this.currentIndex;
    let flashcards = this.flashcards;
    return {
      next() {
        if (currentIndex < flashcards.length) {
          return { value: flashcards[currentIndex++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  },

  // State
  addFlashcard(flashcard) {
	//console.log(flashcard)   
    this.flashcards.push(flashcard);
  },
  removeFlashcard(flashcard) {
    const index = this.flashcards.indexOf(flashcard);
    if (index > -1) {
      this.flashcards.splice(index, 1);
    }
  },
  shuffle() {
    this.flashcards = shuffleArray(this.flashcards);
  }
};

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Check if a CSV file was provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Error: No CSV file provided');
  process.exit(1);
}

// Read the flashcards from the CSV file
const csvFile = process.argv[2];
//console.log(csvFile);  
fs.createReadStream(csvFile)
  .pipe(csv())
  .on('data', data => flashcardDeck.addFlashcard(data))
  .on('end', () => {
    // Create a readline interface
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Iterate through the flashcards and prompt the user to hit enter to view the next flashcard
    (async function iterateFlashcards() {
      for (const flashcard of flashcardDeck) {
        console.log(flashcard.front);
        await new Promise(resolve => rl.question('Hit enter to see the answer...\n', resolve));
        console.log(flashcard.back + '\n');
      }
      console.log('End of flashcards!');
      rl.close();
    })();
  });
