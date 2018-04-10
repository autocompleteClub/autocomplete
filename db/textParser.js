
const fs = require('fs');
const path = require('path');

const words = {};  // key is the word, value is frequency

const bookname = 'the_hunger_games'; //mockingjay
let book = fs.readFileSync(path.join(__dirname, `./../books/${bookname}.txt`));
book = book.toString().toLowerCase();
book = book.replace(/\d/g,'');
book = book.replace(/[\n]/g,' ');
book = book.replace(/[^a-z' ]/g,'');
const wordsArr = book.split(' ').filter( word => word.length!==0);

wordsArr.forEach( (word) => {
  if(words[word]) words[word]++;
  else words[word] = 1;
})


fs.writeFileSync(`./books/${bookname}.json`, JSON.stringify(words));
