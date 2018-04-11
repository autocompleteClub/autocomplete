const fs = require('fs');
const path = require('path');

const words = {};  // key is the word, value is frequency
const phrases = {}; // key is the phrase, value is frequency

const LEAST_PREQ_PHRASE = 5;  // LEAST_PREQ_PHRASE should be greater than LEAST_PREQ_WORD
const LEAST_PREQ_WORD = 4;


const bookname = 'the_hunger_games'; //mockingjay
let book = fs.readFileSync(path.join(__dirname, `./../books/${bookname}.txt`));
book = book.toString().toLowerCase();
book = book.replace(/\d/g,'');
book = book.replace(/[\n]/g,' ');
book = book.replace(/[^a-z' ]/g,'');
const wordsArr = book.split(' ').filter( word => word.length!==0);

console.log('number of total words:',wordsArr.length);

function phrasecount() {
  for(let i=0; i<wordsArr.length-1; i++) {
    const str = wordsArr[i] + ' ' + wordsArr[i+1];
    if (phrases[str]) phrases[str]++;
    else phrases[str] = 1;
  }

  for (let str in phrases) {
    if (phrases[str] < LEAST_PREQ_PHRASE) {
      delete phrases[str]
    }
  }

  console.log('number of unique phrases:', Object.keys(phrases).length);
  fs.writeFileSync(`./books/phrases.json`, JSON.stringify(phrases));
}

function wordcount() {
  wordsArr.forEach( (word) => {
    if(words[word]) words[word]++;
    else words[word] = 1;
  })

  for (let word in words) {
    if (words[word] < LEAST_PREQ_WORD) {
      delete words[word]
    }
  }

  console.log('number of unique word:', Object.keys(words).length);
  fs.writeFileSync(`./books/${bookname}.json`, JSON.stringify(words));
}

wordcount();
phrasecount();
